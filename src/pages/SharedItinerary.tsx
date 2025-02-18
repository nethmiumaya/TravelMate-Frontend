import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../types';
import { Calendar, MapPin, Clock } from 'lucide-react';

const SharedItinerary = () => {
    const { id } = useParams<{ id: string }>();
    const itinerary = useSelector((state: RootState) =>
        state.itineraries.items.find(item => item.id === id && item.shared)
    );

    if (!itinerary) {
        return (
            <div className="text-center py-12">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Itinerary Not Found</h2>
                <p className="text-gray-600">This itinerary may not exist or is not shared.</p>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{itinerary.title}</h1>
                <p className="text-gray-600 mb-6">{itinerary.description}</p>

                <div className="flex items-center gap-6">
                    <div className="flex items-center gap-2 text-gray-600">
                        <Calendar className="w-5 h-5" />
                        <span>{new Date(itinerary.startDate).toLocaleDateString()} - {new Date(itinerary.endDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                        <MapPin className="w-5 h-5" />
                        <span>{itinerary.destinations.length} Destinations</span>
                    </div>
                </div>
            </div>

            <div className="space-y-8">
                {itinerary.destinations.map((destination) => (
                    <div key={destination.id} className="bg-white rounded-lg shadow-sm p-6">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-2">{destination.name}</h2>
                        <p className="text-gray-600 mb-6">{destination.location}</p>

                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Activities</h3>
                        <div className="space-y-4">
                            {destination.activities.map((activity) => (
                                <div key={activity.id} className="border-l-4 border-blue-600 pl-4 py-2">
                                    <h4 className="text-lg font-semibold text-gray-900 mb-1">{activity.title}</h4>
                                    <p className="text-gray-600 mb-2">{activity.description}</p>
                                    <div className="flex items-center gap-2 text-gray-500">
                                        <Clock className="w-4 h-4" />
                                        <span>{activity.date} at {activity.time}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SharedItinerary;