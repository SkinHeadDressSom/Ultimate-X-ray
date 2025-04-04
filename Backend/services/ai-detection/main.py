from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import os
import cv2
import pydicom
import numpy as np
from PIL import Image
from ultralytics import YOLO
import requests

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load YOLO model
model_path = "model/UltimateXray_yolov8x.pt"
model = YOLO(model_path)

# Convert DICOM to PNG and preprocess
def convert_dicom_to_png_and_resize(dicom_path):
    dicom = pydicom.dcmread(dicom_path)
    image = dicom.pixel_array
    original_height, original_width = image.shape
    scaled_image = ((image - np.min(image)) / (np.max(image) - np.min(image)) * 255).astype(np.uint8)
    equalized_image = cv2.equalizeHist(scaled_image)
    resized_image = Image.fromarray(equalized_image).resize((640, 640))

    temp_path = "temp_image.png"
    resized_image.save(temp_path)
    return temp_path, original_width, original_height

@app.post("/")
async def detect(file: UploadFile = File(None), url: str = Form(None)):
    if file:
        filename = file.filename
        file_ext = filename.split(".")[-1].lower()
        temp_path = f"temp_input.{file_ext}"

        with open(temp_path, "wb") as f:
            f.write(await file.read())
    elif url:
        response = requests.get(url)
        if response.status_code != 200:
            return {"error": "Failed to download file"}
        filename = url.split("/")[-1]
        file_ext = filename.split(".")[-1].lower()
        temp_path = f"temp_input.{file_ext}"

        with open(temp_path, "wb") as f:
            f.write(response.content)
    else:
        return {"error": "No file or URL provided"}

    if file_ext == "dcm" or file_ext == "dicom":
        temp_path, original_width, original_height = convert_dicom_to_png_and_resize(temp_path)
    else:
        image = cv2.imread(temp_path, cv2.IMREAD_GRAYSCALE)
        if image is None:
            return {"error": "Invalid image format"}
        original_height, original_width = image.shape
        equalized_image = cv2.equalizeHist(image)
        resized_image = Image.fromarray(equalized_image).resize((640, 640))
        temp_path = "temp_image.png"
        resized_image.save(temp_path)

    results = model.predict(source=temp_path, conf=0.4)
    os.remove(temp_path)

    scale_x = original_width / 640
    scale_y = original_height / 640

    detections = [
        {
            "xmin": int(box[0] * scale_x), "ymin": int(box[1] * scale_y),
            "xmax": int(box[2] * scale_x), "ymax": int(box[3] * scale_y),
            "confidence": round(float(box[4]), 2),
            "class": model.names[int(box[5])]
        }
        for box in results[0].boxes.data.cpu().numpy()
    ]

    return {"filename": filename, "detections": detections}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=3010)
