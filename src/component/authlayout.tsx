import React from 'react';
import { Outlet } from 'react-router-dom';
import { ShieldCheck } from 'lucide-react';

const AuthLayout: React.FC = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="flex justify-center mb-8">
                    <div className="bg-indigo-600 p-3 rounded-full">
                        <ShieldCheck className="w-8 h-8 text-white" />
                    </div>
                </div>
                <Outlet />
            </div>
        </div>
    );
};

export default AuthLayout;