import React, { useState } from 'react';
import { User, Lock } from 'lucide-react';

const SignUp: React.FC = () => {
    const [credentials, setCredentials] = useState({
        name: '',
        email: '',
        newPassword: '',

    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
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