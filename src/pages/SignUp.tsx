import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../store/slices/authSlice';
import { UserPlus } from 'lucide-react';

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false); // Add loading state

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true); // Start loading

        try {
            const response = await fetch('http://localhost:5000/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                setError(data.message || 'Something went wrong');
                setIsLoading(false); // Stop loading on error
                return;
            }

            // Check if user object exists in the response
            if (!data.user) {
                setError('User data is missing in the response');
                setIsLoading(false); // Stop loading on error
                return;
            }

            // Store user data in Redux store
            dispatch(setUser({
                id: data.user.id,
                name: data.user.name,
                email: data.user.email,
                password: data.user.password,
                createdAt: data.user.createdAt, // Store as string
                itineraries: data.user.itineraries || [],
            }));

            // Navigate to the dashboard
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
            setError('Internal Server Error');
            setIsLoading(false); // Stop loading on error
        }
    };

    return (
        <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
                <UserPlus className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                <h1 className="text-3xl font-bold text-gray-900">Create Account</h1>
                <p className="text-gray-600 mt-2">Join us to start planning your adventures</p>
            </div>
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-sm">
                <div className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Full Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
                    {error && <p className="text-red-600">{error}</p>}
                    <button
                        type="submit"
                        disabled={isLoading} // Disable button while loading
                        className={`w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors ${
                            isLoading ? 'opacity-50 cursor-not-allowed' : ''
                        }`}
                    >
                        {isLoading ? 'Creating Account...' : 'Create Account'}
                    </button>
                </div>
            </form>
            <p className="text-center mt-6 text-gray-600">
                Already have an account?{' '}
                <Link to="/login" className="text-blue-600 hover:underline">
                    Sign in
                </Link>
            </p>
        </div>
    );
};

export default Register;