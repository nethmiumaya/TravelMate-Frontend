import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../types';
import { MapPin, Calendar, Share2 } from 'lucide-react';

const Home = () => {
    const { user } = useSelector((state: RootState) => state.auth);

    return (
        <div className="max-w-6xl mx-auto">
            <div className="text-center py-16 px-4">
                <h1 className="text-5xl font-bold text-gray-900 mb-6">
                    Plan Your Next Adventure with Ease
                </h1>
                <p className="text-xl text-gray-600 mb-8">
                    Create detailed travel itineraries, manage destinations, and share your plans with friends and family.
                </p>
                {user ? (
                    <Link
                        to="/itinerary/new"
                        className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
                    >
                        Create New Itinerary
                    </Link>
                ) : (
                    <div className="space-x-4">
                        <Link
                            to="/register"
                            className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
                        >
                            Get Started
                        </Link>
                        <Link
                            to="/login"
                            className="bg-white text-blue-600 px-8 py-3 rounded-lg text-lg font-semibold border-2 border-blue-600 hover:bg-blue-50 transition-colors"
                        >
                            Log In
                        </Link>
                    </div>
                )}
            </div>

            <div className="grid md:grid-cols-3 gap-8 px-4 py-12">
                <div className="text-center p-6 bg-white rounded-xl shadow-sm">
                    <MapPin className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Multiple Destinations</h3>
                    <p className="text-gray-600">
                        Plan your trip across multiple destinations with detailed activities for each location.
                    </p>
                </div>
                <div className="text-center p-6 bg-white rounded-xl shadow-sm">
                    <Calendar className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Easy Planning</h3>
                    <p className="text-gray-600">
                        Organize your activities with an intuitive interface and flexible scheduling.
                    </p>
                </div>
                <div className="text-center p-6 bg-white rounded-xl shadow-sm">
                    <Share2 className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Share with Others</h3>
                    <p className="text-gray-600">
                        Share your itineraries with travel companions and get their input.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Home;