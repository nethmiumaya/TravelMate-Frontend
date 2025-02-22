import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, Itinerary } from '../types';
import { Calendar, MapPin, Clock, Share2, Edit } from 'lucide-react';
import { fetchItineraryById } from '../store/slices/itinerarySlice';

const ItineraryDetails = () => {
    const { id } = useParams<{ id: string }>();
    const dispatch = useDispatch();
    const itinerary: Itinerary | undefined = useSelector((state: RootState) =>
        state.itineraries.items.find(item => item.id === Number(id))
    );
    useEffect(() => {
            dispatch(fetchItineraryById(Number(id)) as any);
    }, [dispatch]);

    const handleShare = () => {
        if (itinerary) {
            const shareData = {
                title: itinerary.title,
                text: `Check out this itinerary: ${itinerary.title}`,
                url: window.location.href,
            };

            if (navigator.share) {
                navigator.share(shareData)
                    .then(() => console.log('Itinerary shared successfully'))
                    .catch((error) => console.error('Error sharing itinerary:', error));
            } else {
                console.error('Web Share API is not supported in this browser.');
            }
        }
    };

console.log(itinerary);
    if (!itinerary) {
        return (
            <div className="text-center py-12">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Itinerary Not Found</h2>
                <Link to="/dashboard" className="text-blue-600 hover:underline">
                    Return to Dashboard
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-start mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{itinerary.title}</h1>
                    {itinerary.user && (
                        <p className="text-gray-600">Created by: {itinerary.user.name} ({itinerary.user.email})</p>
                    )}
                </div>
                <div className="flex gap-4">
                    <button
                        onClick={handleShare}
                        className="flex items-center gap-2 border border-blue-600 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                        <Share2 className="w-5 h-5"/>
                        Share
                    </button>
                    <Link
                        to={`/itinerary/${id}/edit`}
                        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <Edit className="w-5 h-5"/>
                        Edit
                    </Link>
                </div>
            </div>

            <div className="flex items-center gap-6 mb-8">
                <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-5 h-5"/>
                    <span>
                        {new Date(itinerary.startDate).toLocaleDateString()} -{' '}
                        {new Date(itinerary.endDate).toLocaleDateString()}
                    </span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-5 h-5" />
                    <span>{itinerary.destinations?.length || 0} Destinations</span>
                </div>
            </div>

            <div className="space-y-8">
                {itinerary.destinations?.map((destination) => (
                    <div key={destination.id} className="bg-white rounded-lg shadow-sm p-6">
                        <h2 className="text-2xl font-semibold text-gray-900 mb-2">{destination.name}</h2>
                        <p className="text-gray-600 mb-6">{destination.location}</p>
                        <p className="text-gray-600 mb-6">Latitude: {destination.latitude}, Longitude: {destination.longitude}</p>

                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Activities</h3>
                        <div className="space-y-4">
                            {destination.activities.map((activity) => (
                                <div key={activity.id} className="border-l-4 border-blue-600 pl-4 py-2">
                                    <h4 className="text-lg font-semibold text-gray-900 mb-1">{activity.title}</h4>
                                    <p className="text-gray-600 mb-2">{activity.description}</p>
                                    <div className="flex items-center gap-2 text-gray-500">
                                        <Clock className="w-4 h-4" />
                                        <span>{new Date(activity.date).toLocaleDateString()}</span>
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

export default ItineraryDetails;