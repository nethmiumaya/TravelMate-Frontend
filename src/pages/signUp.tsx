import React, { useState } from 'react';
import { User, Lock } from 'lucide-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp: React.FC = () => {
    const [credentials, setCredentials] = useState({
        name: '',
        email: '',
        newPassword: '',
    });

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/auth/signup', {
                name: credentials.name,
                email: credentials.email,
                password: credentials.newPassword,
            });

            if (response.data.success) {
                navigate('/home'); // Navigate to the home page after successful sign-up
            } else {
                throw new Error(response.data.message || 'Sign-up failed');
            }
        } catch (err) {
            // Handle sign-up error (e.g., show an error message)
        }
    };

    return (
        <div className="wrapper">
            <div className="form-box">
                <div className="register-container">
                    <header>Sign Up</header>
                    <form onSubmit={handleSubmit}>
                        <div className="input-box relative">
                            <Lock className="icon"/>
                            <input
                                type="Name"
                                placeholder="Name"
                                className="input-field pl-10"
                                value={credentials.name}
                                onChange={(e) => setCredentials({...credentials, name: e.target.value})}
                            />
                        </div>
                        <div className="input-box relative">
                            <User className="icon"/>
                            <input
                                type="email"
                                placeholder="Email"
                                className="input-field pl-10"
                                value={credentials.email}
                                onChange={(e) => setCredentials({...credentials, email: e.target.value})}
                            />
                        </div>
                        <div className="input-box relative">
                            <Lock className="icon"/>
                            <input
                                type="password"
                                placeholder="New Password"
                                className="input-field pl-10"
                                value={credentials.newPassword}
                                onChange={(e) => setCredentials({...credentials, newPassword: e.target.value})}
                            />
                        </div>

                        <button type="submit" className="submit">
                            Sign Up
                        </button>
                    </form>
                    <div className="top">
                        <span>
                            Already have an account?
                            <a href="/">Log In</a>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;