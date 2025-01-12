import React, { useState } from "react";
import Logo from "./logo.png";
import { ReactComponent as EyeIcon } from "./eye-line.svg";
import { ReactComponent as EyeOffIcon } from "./eye-off-line.svg";
import { ReactComponent as LoginIcon } from "./login-box-line.svg";

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username === "admin" && password === "password") {
            setError('');
        } else {
            setError('Invalid username or password');
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-300 p-4"> {/* BIG background  */}

            <div className="bg-white p-10 rounded-lg shadow-lg w-full max-w-md"> {/*  background  */}

                <img src={Logo} alt="Ultimate X-ray" className="h-40 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-5 text-center">Welcome to Ultimate X-ray</h2>
                <form onSubmit={handleSubmit}>

                    {/* Username */}
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

                    {/* Password */}
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
                                {showPassword ? <EyeOffIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                            </button>
                        </div>
                    </div>
                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

                    {/* ปุ่ม login */}
                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md flex items-center justify-center">
                        <LoginIcon className="h-5 w-5 mr-2" />
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;