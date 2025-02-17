import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import type { RootState } from '../store/store';
import { User, Lock } from 'lucide-react';
import { loginFailure, loginStart, loginSuccess } from '../slices/loginSlice';

const LoginForm: React.FC = () => {
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
        rememberMe: false,
    });

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoading, error } = useSelector((state: RootState) => state.auth);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(loginStart());

        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', {
                email: credentials.email,
                password: credentials.password,
            });

            if (response.data.token) {
                dispatch(loginSuccess(credentials.email));
                navigate('/home'); // Navigate to the home page after successful login
            } else {
                throw new Error(response.data.message || 'Login failed');
            }
        } catch (err) {
            dispatch(loginFailure(err instanceof Error ? err.message : 'Login failed'));
        }
    };

    return (
        <div className="wrapper">
            <div className="form-box">
                <div className="login-container">
                    <header>Login</header>
                    <form onSubmit={handleSubmit}>
                        <div className="input-box relative">
                            <User className="icon" />
                            <input
                                type="email"
                                placeholder="Email"
                                className="input-field pl-10"
                                value={credentials.email}
                                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                            />
                        </div>
                        <div className="input-box relative">
                            <Lock className="icon" />
                            <input
                                type="password"
                                placeholder="Password"
                                className="input-field pl-10"
                                value={credentials.password}
                                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                            />
                        </div>
                        <div className="two-col">
                            <div className="one">
                                <input
                                    type="checkbox"
                                    checked={credentials.rememberMe}
                                    onChange={(e) => setCredentials({ ...credentials, rememberMe: e.target.checked })}
                                />
                                <label>Remember Me</label>
                            </div>
                        </div>
                        {error && (
                            <div className="text-red-300 text-sm text-center">
                                {error}
                            </div>
                        )}
                        <button type="submit" className="submit">
                            {isLoading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>
                    <div className="top">
                        <span>
                            Don't have an account?
                            <Link to="/signup">Sign Up</Link>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;