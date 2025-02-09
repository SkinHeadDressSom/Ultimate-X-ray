import React, { useState, useRef } from 'react';

const ZoomableImage = () => {
    const [zoom, setZoom] = useState(1);
    const [imageSrc, setImageSrc] = useState('');
    const imageRef = useRef(null);

    const zoomIn = () => {
        setZoom(prevZoom => Math.min(prevZoom + 0.1, 3));
    };

    const zoomOut = () => {
        setZoom(prevZoom => Math.max(prevZoom - 0.1, 1));
    };

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImageSrc(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <ErrorBoundary>
            <div style={{ textAlign: 'center' }}>
                <input type="file" accept="image/*" onChange={handleImageChange} />
                <button onClick={zoomIn}>Zoom In</button>
                <button onClick={zoomOut}>Zoom Out</button>
                <div style={{ overflow: 'hidden', display: 'inline-block' }}>
                    {imageSrc && (
                        <img
                            ref={imageRef}
                            src={imageSrc}
                            alt="Zoomable"
                            style={{
                                width: `${zoom * 100}%`,
                                transition: 'width 0.3s ease',
                            }}
                        />
                    )}
                </div>
            </div>
        </ErrorBoundary>
    );
};

export default ZoomableImage;
