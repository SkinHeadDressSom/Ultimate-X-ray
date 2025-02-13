from fastapi import FastAPI, UploadFile, File
import uvicorn
import os
import cv2
import pydicom
import numpy as np
from PIL import Image
from ultralytics import YOLO

app = FastAPI()

# Load YOLO model
model_path = "model/UltimateXray_yolov8x.pt"
model = YOLO(model_path)

# Convert DICOM to PNG and preprocess
def convert_dicom_to_png_and_resize(dicom_path):
    dicom = pydicom.dcmread(dicom_path)
    image = dicom.pixel_array
    scaled_image = ((image - np.min(image)) / (np.max(image) - np.min(image)) * 255).astype(np.uint8)
    equalized_image = cv2.equalizeHist(scaled_image)
    resized_image = Image.fromarray(equalized_image).resize((640, 640))

    temp_path = "temp_image.png"
    resized_image.save(temp_path)
    return temp_path

@app.post("/detect/")
async def detect(file: UploadFile = File(...)):
    filename = file.filename
    file_ext = filename.split(".")[-1].lower()
    temp_path = f"temp_input.{file_ext}"

    with open(temp_path, "wb") as f:
        f.write(await file.read())

    if file_ext == "dcm" or file_ext == "dicom":
        temp_path = convert_dicom_to_png_and_resize(temp_path)
    else:
        image = cv2.imread(temp_path, cv2.IMREAD_GRAYSCALE)
        if image is None:
            return {"error": "Invalid image format"}
        equalized_image = cv2.equalizeHist(image)
        resized_image = Image.fromarray(equalized_image).resize((640, 640))
        temp_path = "temp_image.png"
        resized_image.save(temp_path)

    results = model.predict(source=temp_path, conf=0.05)
    os.remove(temp_path)

    detections = [
        {
            "xmin": int(box[0]), "ymin": int(box[1]),
            "xmax": int(box[2]), "ymax": int(box[3]),
            "confidence": float(box[4]),
            "class": model.names[int(box[5])]
        }
        for box in results[0].boxes.data.cpu().numpy()
    ]

    return {"filename": filename, "detections": detections}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=3010)
