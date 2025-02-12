import { useState } from "react";
import { ZoomIn, ZoomOut } from "lucide-react";

export default function Zoomer() {
    // สถานะสำหรับเก็บภาพที่อัปโหลดและขนาดของมัน
    const [image, setImage] = useState(null);
    const [imageSize, setImageSize] = useState({ width: "auto", height: "auto" });

    // ปรับระดับการซูมและตำแหน่งของภาพ
    const [scale, setScale] = useState(1);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    // ตัวจัดการการลาก
    const [dragging, setDragging] = useState(false);
    const [start, setStart] = useState({ x: 0, y: 0 });

    // ซูมเข้า
    const zoomIn = () => setScale((prev) => Math.min(prev + 0.3, 3));

    // ซูมออก
    const zoomOut = () => setScale((prev) => Math.max(prev - 0.3, 1));

    // ฟังก์ชันเริ่มลากภาพ
    const startDrag = (e) => {
        if (e.button !== 0) return; // อนุญาตให้ลากด้วยการคลิกซ้ายเท่านั้น
        setDragging(true);
        setStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    };

    // ฟังก์ชันจัดการการเคลื่อนที่ของการลาก
    const onDrag = (e) => {
        if (!dragging) return;
        requestAnimationFrame(() => {
            setPosition({ x: e.clientX - start.x, y: e.clientY - start.y });
        });
    };

    // ฟังก์ชันหยุดลาก
    const stopDrag = () => setDragging(false);

    // ฟังก์ชันจัดการการซูมด้วยสกอร์เมาส์
    const handleWheel = (e) => {
        if (e.deltaY < 0) {
            zoomIn();
        } else {
            zoomOut();
        }
    };

    return (
        <div className="flex flex-col items-center gap-4">
            {image && (
                <div
                    className="relative overflow-hidden border-2 border-gray-300 rounded-lg"
                    style={{ width: imageSize.width, height: imageSize.height }}
                    onWheel={handleWheel} // เพิ่มการจัดการการซูมด้วยสกอร์เมาส์
                >
                    {/* ฟังก์ชันการลาก */}
                    <div
                        className="w-full h-full cursor-grab"
                        onMouseDown={startDrag}
                        onMouseMove={onDrag}
                        onMouseUp={stopDrag}
                        onMouseLeave={stopDrag}
                    >
                        <img
                            src={image}
                            alt="Uploaded Preview"
                            className="object-cover transition-transform duration-300"
                            style={{
                                transform: `scale(${scale}) translate(${position.x}px, ${position.y}px)`,
                                cursor: dragging ? "grabbing" : "grab",
                                width: "100%",
                                height: "100%",
                            }}
                        />
                    </div>
                    {/* การควบคุมการซูม */}
                    <div className="absolute top-2 right-2 flex gap-2 bg-white p-1 rounded-full shadow-md">
                        <button onClick={zoomIn} className="p-1">
                            <ZoomIn className="w-5 h-5 text-gray-600" />
                        </button>
                        <button onClick={zoomOut} className="p-1">
                            <ZoomOut className="w-5 h-5 text-gray-600" />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
