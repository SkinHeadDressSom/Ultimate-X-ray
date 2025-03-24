import React, { useState, useEffect } from "react";

const BoundingBox = () => {
    // เก็บข้อมูลรูปภาพที่อัปโหลด(ใช้ตอนทดสอบ)
    const [image, setImage] = useState(null);
    // ข้อมูลกรอบที่ตรวจพบ
    const [boxes, setBoxes] = useState([]);
    // เก็บขนาดเดิมของรูปภาพ
    const [imageSize, setImageSize] = useState({ width: 640, height: 640 });
    const [colorMap, setColorMap] = useState({}); // เก็บสีของแต่ละโรค

    // ฟังก์ชันสร้างสีโทนสว่าง
    const getRandomColor = () => {
        const r = Math.floor(Math.random() * 128) + 128; // ค่าสีแดง (128-255)
        const g = Math.floor(Math.random() * 128) + 128; // ค่าสีเขียว (128-255)
        const b = Math.floor(Math.random() * 128) + 128; // ค่าสีน้ำเงิน (128-255)
        return `rgb(${r}, ${g}, ${b})`; // คืนค่าเป็นสี RGB
    };

    // ฟังก์ชันโหลดข้อมูลจากแหล่งข้อมูลภายนอก
    const fetchData = async () => {
        try {
            // Mock data for testing with updated bounding box values
            const data = {
                detections: [
                    { class: "Aortic enlargement", confidence: 0.14215484261512756, xmin: 300, ymin: 450, xmax: 500, ymax: 500 },
                    { class: "Aortic enlargement", confidence: 0.0707837641239163, xmin: 160, ymin: 120, xmax: 390, ymax: 250 },
                    { class: "Cardiomegaly", confidence: 0.06915704160928726, xmin: 210, ymin: 310, xmax: 470, ymax: 470 },
                    { class: "Pneumonia", confidence: 0.1857349283456726, xmin: 170, ymin: 140, xmax: 400, ymax: 230 },
                    { class: "Tuberculosis", confidence: 0.0928374652862548, xmin: 300, ymin: 160, xmax: 460, ymax: 300 },
                    { class: "Pleural Effusion", confidence: 0.0785432167053223, xmin: 230, ymin: 340, xmax: 500, ymax: 500 },
                ],
            };

            // คำนวณสเกลของกรอบให้สตรงกับขนาดภาพจริง
            const scaledBoxes = data.detections.map((box) => {
                if (!colorMap[box.class]) {
                    colorMap[box.class] = getRandomColor(); // กำหนดสีโทนสว่างให้โรคที่ยังไม่มีสี
                }
                return {
                    x: (box.xmin / 640) * 100,
                    y: (box.ymin / 640) * 100,
                    width: ((box.xmax - box.xmin) / 640) * 100,
                    height: ((box.ymax - box.ymin) / 640) * 100,

                    label: `${box.class}_${box.confidence.toFixed(2)}`, // ใช้ข้อมูลโรคจาก data
                    disease: box.class, // เพิ่มข้อมูลโรค
                    confidence: box.confidence, // เพิ่มข้อมูลความมั่นใจ
                    color: colorMap[box.class], // เพิ่มสีของโรค
                };
            });

            setColorMap({ ...colorMap }); // อัปเดตสีใน state
            setBoxes(scaledBoxes);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    // ฟังก์ชันอัปโหลดรูปภาพ
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setImage(reader.result); // อัปเดตสถานะรูปภาพ
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="relative inline-block text-center">
            {/* ปุ่มอัปโหลดรูปภาพ */}
            <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="mb-4"
            />
            {image && (
                <div className="relative inline-block">
                    {/* แสดงรูปภาพที่อัปโหลด */}
                    <img src={image} alt="Uploaded X-ray" className="w-full h-auto" />
                    {/* แสดงกรอบที่ตรวจพบบนรูปภาพ */}
                    {boxes.map((box, index) => (
                        <div
                            key={index}
                            className="absolute"
                            style={{
                                border: `2px solid ${box.color}`, // ใช้สีของโรค
                                left: `${box.x}%`,
                                top: `${box.y}%`,
                                width: `${box.width}%`,
                                height: `${box.height}%`,
                            }}
                        >
                            {/* ป้ายชื่อของกรอบที่ตรวจพบ */}
                            <span className="absolute top-0 left-0 bg-white text-black text-xs px-1">
                                {box.label}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BoundingBox;

