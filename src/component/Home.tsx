import React from 'react';
import { Link } from 'react-router-dom';
import { PlaneLanding, Calendar, Map } from 'lucide-react';

const Home: React.FC = () => {
    return (
        <div className="space-y-12">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Plan Your Next Adventure
                </h1>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                    Create detailed travel itineraries, organize your activities, and make the most of your trips.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                        <Calendar className="h-6 w-6 text-primary-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Easy Planning</h3>
                    <p className="text-gray-600">
                        Create and organize your travel itineraries with our intuitive interface.
                    </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                        <Map className="h-6 w-6 text-primary-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Destination Management</h3>
                    <p className="text-gray-600">
                        Add multiple destinations and activities to your travel plans.
                    </p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                        <PlaneLanding className="h-6 w-6 text-primary-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Trip Overview</h3>
                    <p className="text-gray-600">
                        Get a clear overview of your entire trip schedule at a glance.
                    </p>
                </div>
            </div>

            <div className="text-center">
                <Link
                    to="/create"
                    className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                    Start Planning Your Trip
                </Link>
            </div>
        </div>
    );
};

export default Home;