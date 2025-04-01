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
        const r = Math.floor(Math.random() * 128) + 128;
        const g = Math.floor(Math.random() * 128) + 128;
        const b = Math.floor(Math.random() * 128) + 128;
        return `rgb(${r}, ${g}, ${b})`; // คืนค่าเป็นสี RGB
    };

    // ฟังก์ชันโหลดข้อมูลจากแหล่งข้อมูลภายนอก
    const fetchData = async () => {
        try {
            // Replace this with actual data fetching logic
            const response = await fetch("API");
            const data = await response.json();

            const scaledBoxes = data.detections.map((box) => {
                if (!colorMap[box.class]) {
                    colorMap[box.class] = getRandomColor(); // กำหนดสีโทนสว่างให้โรคที่ยังไม่มีสี
                }
                return {
                    x: (box.xmin / 640) * 100,
                    y: (box.ymin / 640) * 100,
                    width: ((box.xmax - box.xmin) / 640) * 100,
                    height: ((box.ymax - box.ymin) / 640) * 100,
                    label: `${box.class}_${box.confidence.toFixed(2)}`,
                    disease: box.class,
                    confidence: box.confidence,
                    color: colorMap[box.class],
                };
            });

            setColorMap({ ...colorMap }); // อัปเดตสีใน state
            setBoxes(scaledBoxes);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="relative inline-block text-center">
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
                                border: `2px solid ${box.color}`,
                                left: `${box.x}%`,
                                top: `${box.y}%`,
                                width: `${box.width}%`,
                                height: `${box.height}%`,
                            }}
                        >
                            {/* ป้ายกรอบชื่อโรคที่ตรวจพบ */}
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

