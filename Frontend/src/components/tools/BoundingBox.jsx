import React, { useState, useEffect } from "react";

const BoundingBox = () => {
    // เก็บข้อมูลรูปภาพที่อัปโหลด(ใช้ตอนทดสอบ)
    const [image, setImage] = useState(null);
    // ข้อมูลกรอบที่ตรวจพบ
    const [boxes, setBoxes] = useState([]);
    // เก็บขนาดเดิมของรูปภาพ
    const [imageSize, setImageSize] = useState({ width: 640, height: 640 });

    // ฟังก์ชันโหลดข้อมูลจากแหล่งข้อมูลภายนอก
    const fetchData = async () => {
        try {
            const response = await fetch("/path/to/your/data.json"); // เอาไปเปลี่ยนเป็นไฟล์จริง
            const data = await response.json();

            // คำนวณสเกลของกรอบให้สตรงกับขนาดภาพจริง(ไม่มั่นใจว่าคำนวนแบบนี้จะถูกไหม)
            const scaledBoxes = data.detections.map((box) => ({
                x: (box.xmin / 640) * 100,
                y: (box.ymin / 640) * 100,
                width: ((box.xmax - box.xmin) / 640) * 100,
                height: ((box.ymax - box.ymin) / 640) * 100,

                label: `${box.class}_${box.confidence.toFixed(2)}`,

                // ${ box.class } นำค่าของ box.class(ชื่อของโรค) มาใช้ 
                // ${ box.confidence.toFixed(2) } นำค่าความมั่นใจ(confidence) ปัดเศษทศนิยมเป็น 2 ตำแหน่ง
            }));

            // แถมให้ จับผิดพลาดerror เผื่อมีปัญหาในการโหลดข้อมูล(เช่น แม่งหาไฟล์jsonไม่เจอ หรือ ต่อapiไม่ได้)
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
                            className="absolute border-2 border-yellow-400"
                            style={{
                                left: `${box.x}%`,
                                top: `${box.y}%`,
                                width: `${box.width}%`,
                                height: `${box.height}%`,
                            }}
                        >
                            {/* ป้ายชื่อของกรอบที่ตรวจพบ */}
                            <span className="absolute top-0 left-0 bg-yellow-400 text-black text-xs px-1">
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

