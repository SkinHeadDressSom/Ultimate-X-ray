import React, { useState } from "react";

function Login() {
    // สร้างสถานะสำหรับ username และ password
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    // ฟังก์ชันจัดการเมื่อ submit ฟอร์ม
    const handleSubmit = (e) => {
        e.preventDefault();
        if (username && password) {
            alert('Login successful');
        } else {
            alert('Please enter both username and password');
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
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
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                className="w-full p-2 border border-gray-300 rounded-md mt-1"
                                required
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                            >
                                {showPassword ? 'fa-eye-slash' : 'fa-eye'}
                            </button>
                        </div>
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md">Login</button>
                </form>
            </div>
        </div>
    );
}

export default Login;