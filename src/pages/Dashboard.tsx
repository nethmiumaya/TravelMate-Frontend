import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { RootState } from '../types';
import { Calendar, MapPin, Plus } from 'lucide-react';
import {useEffect} from "react";
import {fetchItineraries} from "../store/slices/itinerarySlice.ts";

const Dashboard = () => {
    const dispatch = useDispatch();
    const { items: itineraries, loading, error } = useSelector((state: RootState) => state.itineraries);

    // 2) Dispatch fetchItineraries when the component mounts
    useEffect(() => {
        dispatch(fetchItineraries() as any);
        // ^ cast to "any" if TypeScript complains,
        //   or properly type your dispatch with ThunkDispatch<...>
    }, [dispatch]);

    // 3) Show a loading spinner or error if needed
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <p className="text-red-500 mb-4">Error: {error}</p>
                <p className="text-gray-500 mb-6">Could not load itineraries. Please try again later.</p>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">My Itineraries</h1>
                <Link
                    to="/itinerary/new"
                    className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    Create New Itinerary
                </Link>
            </div>

            {itineraries.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                    <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                    <h2 className="text-xl font-semibold text-gray-600 mb-2">No Itineraries Yet</h2>
                    <p className="text-gray-500 mb-6">Start planning your next adventure!</p>
                    <Link
                        to="/itinerary/new"
                        className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <Plus className="w-5 h-5" />
                        Create Your First Itinerary
                    </Link>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {itineraries.map((itinerary) => (
                        <div key={itinerary.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">{itinerary.title}</h3>
                                <p className="text-gray-600 mb-4">{itinerary.description}</p>
                                <div className="flex items-center gap-2 text-gray-500 mb-4">
                                    <Calendar className="w-4 h-4" />
                                    <span>{new Date(itinerary.startDate).toLocaleDateString()} - {new Date(itinerary.endDate).toLocaleDateString()}</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-500 mb-6">
                                    <MapPin className="w-4 h-4"/>
                                    {/*<span>{itinerary.destinations.length} Destinations</span>*/}
                                    <span>{itinerary.destinations?.length || 0} Destinations</span>
                                </div>
                                <div className="flex gap-2">
                                <Link
                                        to={`/itinerary/${itinerary.id}`}
                                        className="flex-1 text-center bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                                    >
                                        View Details
                                    </Link>
                                    <Link
                                        to={`/itinerary/${itinerary.id}/edit`}
                                        className="flex-1 text-center border border-blue-600 text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 transition-colors"
                                    >
                                        Edit
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Dashboard;