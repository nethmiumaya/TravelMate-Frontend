import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Plane } from 'lucide-react';

const Layout: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <Link to="/home" className="flex items-center">
                                <Plane className="h-8 w-8 text-primary-600"/>
                                <span className="ml-2 text-xl font-bold text-gray-900">Travel Planner</span>
                            </Link>
                            <div className="ml-10 flex items-center space-x-4">
                                <Link to="/itineraries"
                                      className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">
                                    My Itineraries
                                </Link>
                            </div>
                            <div className="ml-10 flex items-center space-x-4">
                                <Link to="/destinations" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium">
                                    My Destinations
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Outlet/>
            </main>
        </div>
    );
};

export default Layout;