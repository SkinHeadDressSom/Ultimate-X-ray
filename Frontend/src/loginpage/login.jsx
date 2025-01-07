import React, { useState } from "react";
import Logo from "./logo.png";
import eyeLine from "./eye-line.svg";
import eyeOffLine from "./eye-off-line.svg";

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

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
        
        <div className="flex justify-center items-center h-screen bg-gray-300"> {/* BIG background  */}

            <div className="bg-white p-10 rounded-lg shadow-lg" style={{ width: '450px', height: '550px' }}> {/*  background  */}

                <img src={Logo} alt="Ultimate X-ray" className=" h-60 mx-auto" />
                <h2 className="text-2xl font-bold mb-5 text-center">Welcome to Ultimate X-ray</h2>
                <form onSubmit={handleSubmit}>

                    {/* ฟังก์ชั้น username  */}
                    <div className="mb-4">
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

                    {/* ฟังก์ชั้น password  */}
                    <div className="mb-4">
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
                                <img src={showPassword ? eyeOffLine : eyeLine} alt="Toggle Password Visibility" className="h-5 w-5" />
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