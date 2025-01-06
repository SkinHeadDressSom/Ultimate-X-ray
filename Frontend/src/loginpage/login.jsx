import React, { useState } from "react";

function Login() {
    // สร้างสถานะสำหรับ username และ password
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // ฟังก์ชันจัดการเมื่อ submit ฟอร์ม
    const handleSubmit = (e) => {
        e.preventDefault();
        if (username && password) {
            alert('Login successful');
        } else {
            alert('Please enter both username and password');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-80">
                <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="username" className="block text-sm font-semibold text-gray-700">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                            className="w-full p-2 border border-gray-300 rounded-md mt-1"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-semibold text-gray-700">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                            className="w-full p-2 border border-gray-300 rounded-md mt-1"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
                    >
                        Log In
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;