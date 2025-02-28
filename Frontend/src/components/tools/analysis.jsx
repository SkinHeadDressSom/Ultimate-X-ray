import React, { useState } from "react";

export default function Analysis() {
    const [analysisData, setAnalysisData] = useState("");

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg w-3/4">
                <h1 className="text-2xl font-bold mb-4">AI Diagnostic Results</h1>
                <div className="border p-4 rounded-lg text-lg" style={{ fontSize: "15px" }}>
                    {analysisData ? (
                        <p>{analysisData}</p>
                    ) : (
                        <p className="text-gray">ผลการวิเคราะห์จาก AI ... </p>
                    )}
                </div>
            </div>
        </div>
    );
}
