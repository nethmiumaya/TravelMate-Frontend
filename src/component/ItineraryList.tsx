import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Trash2, Edit, Share2 } from 'lucide-react';
import type { RootState } from '../store/store';

const ItineraryList: React.FC = () => {
    const itineraries = useSelector((state: RootState) => state.itinerary.itineraries);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">My Itineraries</h1>
                <Link
                    to="/create"
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
                >
                    Create New Itinerary
                </Link>
            </div>

            {itineraries.length === 0 ? (
                <div className="text-center py-12">
                    <Calendar className="mx-auto h-12 w-12 text-gray-400" />
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No itineraries</h3>
                    <p className="mt-1 text-sm text-gray-500">Get started by creating a new itinerary.</p>
                    <div className="mt-6">
                        <Link
                            to="/create"
                            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
                        >
                            Create New Itinerary
                        </Link>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {itineraries.map((itinerary) => (
                        <div
                            key={itinerary.id}
                            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
                        >
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                    {itinerary.title}
                                </h3>
                                <div className="flex items-center text-sm text-gray-500 mb-4">
                                    <Calendar className="h-4 w-4 mr-2" />
                                    <span>{itinerary.startDate} - {itinerary.endDate}</span>
                                </div>
                                <div className="flex items-center text-sm text-gray-500 mb-4">
                                    <MapPin className="h-4 w-4 mr-2" />
                                    <span>{itinerary.destinations.length} destinations</span>
                                </div>
                                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                    {itinerary.description}
                                </p>
                                <div className="flex justify-between items-center">
                                    <Link
                                        to={`/itineraries/${itinerary.id}`}
                                        className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                                    >
                                        View Details
                                    </Link>
                                    <div className="flex space-x-2">
                                        <button
                                            className="p-2 text-gray-400 hover:text-primary-600 transition-colors duration-200"
                                            aria-label="Edit"
                                        >
                                            <Edit className="h-4 w-4" />
                                        </button>
                                        <button
                                            className="p-2 text-gray-400 hover:text-red-600 transition-colors duration-200"
                                            aria-label="Delete"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                        <button
                                            className="p-2 text-gray-400 hover:text-primary-600 transition-colors duration-200"
                                            aria-label="Share"
                                        >
                                            <Share2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ItineraryList;