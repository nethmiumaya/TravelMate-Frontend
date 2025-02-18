import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { addItinerary, updateItinerary } from '../store/slices/itinerarySlice';
import { RootState, Destination, Activity } from '../types';
import { Plus, Trash2 } from 'lucide-react';

const CreateItinerary = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const existingItinerary = useSelector((state: RootState) =>
        state.itineraries.items.find(item => item.id === Number(id))
    );
    const { user } = useSelector((state: RootState) => state.auth);

    const [formData, setFormData] = useState({
        title: existingItinerary?.title || '',
        description: existingItinerary?.description || '',
        startDate: existingItinerary?.startDate ? new Date(existingItinerary.startDate).toISOString().split('T')[0] : '',
        endDate: existingItinerary?.endDate ? new Date(existingItinerary.endDate).toISOString().split('T')[0] : '',
        destinations: existingItinerary?.destinations || [],
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        const itineraryData = {
            ...formData,
            id: id ? Number(id) : uuidv4(),
            userId: user.id,
            shared: false,
            startDate: new Date(formData.startDate),
            endDate: new Date(formData.endDate),
        };

        if (id) {
            dispatch(updateItinerary(itineraryData));
        } else {
            dispatch(addItinerary(itineraryData));
        }

        navigate('/dashboard');
    };

    const addDestination = () => {
        setFormData(prev => ({
            ...prev,
            destinations: [
                ...prev.destinations,
                {
                    id: uuidv4(),
                    name: '',
                    location: '',
                    activities: [],
                },
            ],
        }));
    };

    const addActivity = (destinationIndex: number) => {
        const newDestinations = [...formData.destinations];
        newDestinations[destinationIndex].activities.push({
            id: uuidv4(),
            title: '',
            description: '',
            date: '',
            time: '',
        });
        setFormData({ ...formData, destinations: newDestinations });
    };

    const updateDestination = (index: number, data: Partial<Destination>) => {
        const newDestinations = [...formData.destinations];
        newDestinations[index] = { ...newDestinations[index], ...data };
        setFormData({ ...formData, destinations: newDestinations });
    };

    const updateActivity = (destinationIndex: number, activityIndex: number, data: Partial<Activity>) => {
        const newDestinations = [...formData.destinations];
        newDestinations[destinationIndex].activities[activityIndex] = {
            ...newDestinations[destinationIndex].activities[activityIndex],
            ...data,
        };
        setFormData({ ...formData, destinations: newDestinations });
    };

    const removeDestination = (index: number) => {
        setFormData(prev => ({
            ...prev,
            destinations: prev.destinations.filter((_, i) => i !== index),
        }));
    };

    const removeActivity = (destinationIndex: number, activityIndex: number) => {
        const newDestinations = [...formData.destinations];
        newDestinations[destinationIndex].activities = newDestinations[destinationIndex].activities
            .filter((_, i) => i !== activityIndex);
        setFormData({ ...formData, destinations: newDestinations });
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">
                {id ? 'Edit Itinerary' : 'Create New Itinerary'}
            </h1>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                            Title
                        </label>
                        <input
                            type="text"
                            id="title"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                            Description
                        </label>
                        <textarea
                            id="description"
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            rows={3}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                                Start Date
                            </label>
                            <input
                                type="date"
                                id="startDate"
                                value={formData.startDate}
                                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="endDate" className="block text-sm font-medium text-gray-700 mb-1">
                                End Date
                            </label>
                            <input
                                type="date"
                                id="endDate"
                                value={formData.endDate}
                                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                required
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="flex justify-between items-center">
                        <h2 className="text-xl font-semibold text-gray-900">Destinations</h2>
                        <button
                            type="button"
                            onClick={addDestination}
                            className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                        >
                            <Plus className="w-5 h-5" />
                            Add Destination
                        </button>
                    </div>

                    {formData.destinations.map((destination, destinationIndex) => (
                        <div key={destination.id} className="bg-white p-6 rounded-lg shadow-sm">
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-lg font-semibold text-gray-900">Destination {destinationIndex + 1}</h3>
                                <button
                                    type="button"
                                    onClick={() => removeDestination(destinationIndex)}
                                    className="text-red-600 hover:text-red-700"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor={`destination-name-${destinationIndex}`} className="block text-sm font-medium text-gray-700 mb-1">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            id={`destination-name-${destinationIndex}`}
                                            value={destination.name}
                                            onChange={(e) => updateDestination(destinationIndex, { name: e.target.value })}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor={`destination-location-${destinationIndex}`} className="block text-sm font-medium text-gray-700 mb-1">
                                            Location
                                        </label>
                                        <input
                                            type="text"
                                            id={`destination-location-${destinationIndex}`}
                                            value={destination.location}
                                            onChange={(e) => updateDestination(destinationIndex, { location: e.target.value })}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor={`destination-latitude-${destinationIndex}`} className="block text-sm font-medium text-gray-700 mb-1">
                                            Latitude
                                        </label>
                                        <input
                                            type="number"
                                            id={`destination-latitude-${destinationIndex}`}
                                            value={destination.latitude}
                                            onChange={(e) => updateDestination(destinationIndex, { latitude: parseFloat(e.target.value) })}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label htmlFor={`destination-longitude-${destinationIndex}`} className="block text-sm font-medium text-gray-700 mb-1">
                                            Longitude
                                        </label>
                                        <input
                                            type="number"
                                            id={`destination-longitude-${destinationIndex}`}
                                            value={destination.longitude}
                                            onChange={(e) => updateDestination(destinationIndex, { longitude: parseFloat(e.target.value) })}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between items-center mb-4">
                                        <h4 className="text-lg font-semibold text-gray-900">Activities</h4>
                                        <button
                                            type="button"
                                            onClick={() => addActivity(destinationIndex)}
                                            className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                                        >
                                            <Plus className="w-5 h-5" />
                                            Add Activity
                                        </button>
                                    </div>

                                    <div className="space-y-4">
                                        {destination.activities.map((activity, activityIndex) => (
                                            <div key={activity.id} className="bg-gray-50 p-4 rounded-lg">
                                                <div className="flex justify-between items-start mb-2">
                                                    <h5 className="text-md font-semibold text-gray-900">Activity {activityIndex + 1}</h5>
                                                    <button
                                                        type="button"
                                                        onClick={() => removeActivity(destinationIndex, activityIndex)}
                                                        className="text-red-600 hover:text-red-700"
                                                    >
                                                        <Trash2 className="w-5 h-5" />
                                                    </button>
                                                </div>

                                                <div className="space-y-2">
                                                    <div>
                                                        <label htmlFor={`activity-title-${destinationIndex}-${activityIndex}`} className="block text-sm font-medium text-gray-700 mb-1">
                                                            Title
                                                        </label>
                                                        <input
                                                            type="text"
                                                            id={`activity-title-${destinationIndex}-${activityIndex}`}
                                                            value={activity.title}
                                                            onChange={(e) => updateActivity(destinationIndex, activityIndex, { title: e.target.value })}
                                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                            required
                                                        />
                                                    </div>

                                                    <div>
                                                        <label htmlFor={`activity-description-${destinationIndex}-${activityIndex}`} className="block text-sm font-medium text-gray-700 mb-1">
                                                            Description
                                                        </label>
                                                        <textarea
                                                            id={`activity-description-${destinationIndex}-${activityIndex}`}
                                                            value={activity.description}
                                                            onChange={(e) => updateActivity(destinationIndex, activityIndex, { description: e.target.value })}
                                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                            rows={2}
                                                            required
                                                        />
                                                    </div>

                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div>
                                                            <label htmlFor={`activity-date-${destinationIndex}-${activityIndex}`} className="block text-sm font-medium text-gray-700 mb-1">
                                                                Date
                                                            </label>
                                                            <input
                                                                type="date"
                                                                id={`activity-date-${destinationIndex}-${activityIndex}`}
                                                                value={activity.date}
                                                                onChange={(e) => updateActivity(destinationIndex, activityIndex, { date: e.target.value })}
                                                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                                required
                                                            />
                                                        </div>

                                                        <div>
                                                            <label htmlFor={`activity-time-${destinationIndex}-${activityIndex}`} className="block text-sm font-medium text-gray-700 mb-1">
                                                                Time
                                                            </label>
                                                            <input
                                                                type="time"
                                                                id={`activity-time-${destinationIndex}-${activityIndex}`}
                                                                value={activity.time}
                                                                onChange={(e) => updateActivity(destinationIndex, activityIndex, { time: e.target.value })}
                                                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                                required
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex justify-end gap-4">
                    <button
                        type="button"
                        onClick={() => navigate('/dashboard')}
                        className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        {id ? 'Update Itinerary' : 'Create Itinerary'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateItinerary;