import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Calendar, Clock, MapPin } from 'lucide-react';
import type { RootState } from '../store/store';

const ItineraryDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const itinerary = useSelector((state: RootState) =>
        state.itinerary.itineraries.find(i => i.id === id)
    );

    if (!itinerary) {
        return (
            <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-gray-900">Itinerary not found</h2>
                <p className="mt-2 text-gray-600">The itinerary you're looking for doesn't exist.</p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="border-b border-gray-200 pb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{itinerary.title}</h1>
                <div className="flex items-center space-x-6 text-gray-500">
                    <div className="flex items-center">
                        <Calendar className="h-5 w-5 mr-2" />
                        <span>{itinerary.startDate} - {itinerary.endDate}</span>
                    </div>
                    <div className="flex items-center">
                        <MapPin className="h-5 w-5 mr-2" />
                        <span>{itinerary.destinations.length} destinations</span>
                    </div>
                </div>
                <p className="mt-4 text-gray-600">{itinerary.description}</p>
            </div>

            <div className="flex justify-end">
                <Link
                    to={`/itineraries/${itinerary.id}/destinations/create`}
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
                >
                    Add Destination
                </Link>
            </div>

            <div className="space-y-6">
                {itinerary.destinations.map((destination) => (
                    <div key={destination.id} className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">
                            {destination.name}
                        </h2>
                        <div className="flex items-center text-gray-500 mb-4">
                            <MapPin className="h-4 w-4 mr-2" />
                            <span>{destination.location}</span>
                        </div>

                        <div className="mt-6">
                            <h3 className="text-lg font-medium text-gray-900 mb-4">Activities</h3>
                            <div className="space-y-4">
                                {destination.activities.map((activity) => (
                                    <div
                                        key={activity.id}
                                        className="bg-gray-50 rounded-lg p-4"
                                    >
                                        <h4 className="font-medium text-gray-900 mb-2">
                                            {activity.title}
                                        </h4>
                                        <p className="text-gray-600 text-sm mb-2">
                                            {activity.description}
                                        </p>
                                        <div className="flex items-center text-sm text-gray-500">
                                            <Clock className="h-4 w-4 mr-2" />
                                            <span>{activity.date} at {activity.time}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ItineraryDetails;