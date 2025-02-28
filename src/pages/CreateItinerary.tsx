import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    addItinerary,
    updateItinerary as reduxUpdateItinerary,
} from '../store/slices/itinerarySlice';
import { RootState, Destination, Activity } from '../types';
import { Plus, Trash2 } from 'lucide-react';

import {
    createItinerary,
    createDestination,
    createActivity,
    updateItinerary as serviceUpdateItinerary,
    updateDestination as serviceUpdateDestination,
    updateActivity as serviceUpdateActivity,
} from '../services/itineraryService';

// Utility function to deep clone destinations and their activities
const cloneDestinations = (destinations: Destination[] = []): Destination[] => {
    return destinations.map((destination) => ({
        ...destination,
        activities: destination.activities
            ? destination.activities.map((activity) => ({ ...activity }))
            : [],
    }));
};

const CreateItinerary = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const existingItinerary = useSelector((state: RootState) =>
        state.itineraries.items.find((item) => item.id === Number(id))
    );
    const { user } = useSelector((state: RootState) => state.auth);

    // Initialize local state with a deep clone of existing destinations, if any.
    const [formData, setFormData] = useState({
        userId: user?.id || '',
        title: existingItinerary?.title || '',
        startDate: existingItinerary?.startDate
            ? new Date(existingItinerary.startDate).toISOString().split('T')[0]
            : '',
        endDate: existingItinerary?.endDate
            ? new Date(existingItinerary.endDate).toISOString().split('T')[0]
            : '',
        destinations: existingItinerary
            ? cloneDestinations(existingItinerary.destinations)
            : [],
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        const itineraryData = {
            userId: user.id,
            title: formData.title,
            startDate: new Date(formData.startDate),
            endDate: new Date(formData.endDate),
        };

        try {
            let savedItinerary: any;

            if (id) {
                savedItinerary = await serviceUpdateItinerary(Number(id), itineraryData);
                if (!savedItinerary || !savedItinerary.id) {
                    throw new Error('Failed to update itinerary: Invalid response from server');
                }
                dispatch(reduxUpdateItinerary(savedItinerary));
            } else {
                savedItinerary = await createItinerary(itineraryData);
                dispatch(
                    addItinerary({
                        ...savedItinerary,
                        destinations: formData.destinations,
                    })
                );
            }

            for (const destination of formData.destinations) {
                let savedDestination: any;

                if (id && destination.id) {
                    savedDestination = await serviceUpdateDestination(destination.id, {
                        itineraryId: savedItinerary.id,
                        name: destination.name,
                        location: destination.location,
                        latitude: destination.latitude,
                        longitude: destination.longitude,
                    });
                } else {
                    savedDestination = await createDestination({
                        itineraryId: savedItinerary.id,
                        name: destination.name,
                        location: destination.location,
                        latitude: destination.latitude,
                        longitude: destination.longitude,
                    });
                }

                for (const activity of destination.activities) {
                    if (id && activity.id) {
                        await serviceUpdateActivity(activity.id, {
                            destinationId: savedDestination.id,
                            title: activity.title,
                            description: activity.description,
                            date: new Date(activity.date).toISOString(), // Convert date to string
                        });
                    } else {
                        await createActivity({
                            destinationId: savedDestination.id,
                            title: activity.title,
                            description: activity.description,
                            date: new Date(activity.date).toISOString(), // Convert date to string
                        });
                    }
                }
            }

            navigate('/dashboard');
        } catch (error) {
            console.error('Error saving itinerary:', error);
        }
    };

    const addDestination = () => {
        const newDestination: Destination = {
            id: Date.now(),
            itineraryId: Number(id) || 0,
            name: '',
            location: '',
            latitude: 0,
            longitude: 0,
            activities: [],
        };

        setFormData((prev) => ({
            ...prev,
            destinations: [...prev.destinations, newDestination],
        }));
    };

    const addActivity = (destinationIndex: number) => {
        const newDestinations = [...formData.destinations];
        const newActivity: Activity = {
            id: Date.now(),
            destinationId: newDestinations[destinationIndex].id,
            title: '',
            description: '',
            date: new Date().toISOString(), // Convert date to string
        };

        newDestinations[destinationIndex] = {
            ...newDestinations[destinationIndex],
            activities: [
                ...newDestinations[destinationIndex].activities,
                newActivity,
            ],
        };
        setFormData({ ...formData, destinations: newDestinations });
    };

    const updateDestination = (index: number, data: Partial<Destination>) => {
        setFormData((prevFormData) => {
            const newDestinations = [...prevFormData.destinations];
            newDestinations[index] = { ...newDestinations[index], ...data };
            return { ...prevFormData, destinations: newDestinations };
        });
    };

    const updateActivity = (
        destinationIndex: number,
        activityIndex: number,
        data: Partial<Activity>
    ) => {
        setFormData((prevFormData) => {
            const newDestinations = [...prevFormData.destinations];
            const newActivities = newDestinations[destinationIndex].activities.map((activity, idx) =>
                idx === activityIndex ? { ...activity, ...data } : activity
            );
            newDestinations[destinationIndex] = {
                ...newDestinations[destinationIndex],
                activities: newActivities,
            };
            return { ...prevFormData, destinations: newDestinations };
        });
    };

    const removeDestination = (index: number) => {
        setFormData((prev) => ({
            ...prev,
            destinations: prev.destinations.filter((_, i) => i !== index),
        }));
    };

    const removeActivity = (destinationIndex: number, activityIndex: number) => {
        const newDestinations = [...formData.destinations];
        newDestinations[destinationIndex] = {
            ...newDestinations[destinationIndex],
            activities: newDestinations[destinationIndex].activities.filter(
                (_, i) => i !== activityIndex
            ),
        };
        setFormData({ ...formData, destinations: newDestinations });
    };

    const onChange = (
        destinationIndex: number,
        activityIndex: number,
        event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = event.target;
        let newValue: any = value;

        if (name === 'date') {
            newValue = new Date(value).toISOString();
        }

        updateActivity(destinationIndex, activityIndex, { [name]: newValue });
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">
                {id ? 'Edit Itinerary' : 'Create New Itinerary'}
            </h1>

            <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-4">
                    <div>
                        <label htmlFor="userId" className="block text-sm font-medium text-gray-700 mb-1">
                            User ID
                        </label>
                        <input
                            type="text"
                            id="userId"
                            value={formData.userId}
                            onChange={(e) => setFormData({ ...formData, userId: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            required
                        />
                    </div>
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
                                <div>
                                    <label htmlFor={`destinationName-${destinationIndex}`} className="block text-sm font-medium text-gray-700 mb-1">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id={`destinationName-${destinationIndex}`}
                                        value={destination.name}
                                        onChange={(e) => updateDestination(destinationIndex, { name: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor={`destinationLocation-${destinationIndex}`} className="block text-sm font-medium text-gray-700 mb-1">
                                        Location
                                    </label>
                                    <input
                                        type="text"
                                        id={`destinationLocation-${destinationIndex}`}
                                        value={destination.location}
                                        onChange={(e) => updateDestination(destinationIndex, { location: e.target.value })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor={`destinationLatitude-${destinationIndex}`} className="block text-sm font-medium text-gray-700 mb-1">
                                        Latitude
                                    </label>
                                    <input
                                        type="number"
                                        id={`destinationLatitude-${destinationIndex}`}
                                        value={isNaN(destination.latitude) ? '' : destination.latitude}
                                        onChange={(e) => updateDestination(destinationIndex, { latitude: parseFloat(e.target.value) })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor={`destinationLongitude-${destinationIndex}`} className="block text-sm font-medium text-gray-700 mb-1">
                                        Longitude
                                    </label>
                                    <input
                                        type="number"
                                        id={`destinationLongitude-${destinationIndex}`}
                                        value={isNaN(destination.longitude) ? '' : destination.longitude}
                                        onChange={(e) => updateDestination(destinationIndex, { longitude: parseFloat(e.target.value) })}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-4 mt-6">
                                <div className="flex justify-between items-center">
                                    <h3 className="text-lg font-semibold text-gray-900">Activities</h3>
                                    <button
                                        type="button"
                                        onClick={() => addActivity(destinationIndex)}
                                        className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                                    >
                                        <Plus className="w-5 h-5" />
                                        Add Activity
                                    </button>
                                </div>

                                {destination.activities.map((activity, activityIndex) => (
                                    <div key={activity.id} className="border-l-4 border-blue-600 pl-4 py-2">
                                        <div className="flex justify-between items-start mb-4">
                                            <h4 className="text-lg font-semibold text-gray-900">Activity {activityIndex + 1}</h4>
                                            <button
                                                type="button"
                                                onClick={() => removeActivity(destinationIndex, activityIndex)}
                                                className="text-red-600 hover:text-red-700"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>

                                        <div className="space-y-4">
                                            <div>
                                                <label htmlFor={`activityTitle-${destinationIndex}-${activityIndex}`} className="block text-sm font-medium text-gray-700 mb-1">
                                                    Title
                                                </label>
                                                <input
                                                    type="text"
                                                    id={`activityTitle-${destinationIndex}-${activityIndex}`}
                                                    value={activity.title}
                                                    onChange={(e) => onChange(destinationIndex, activityIndex, e)}
                                                    name="title"
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor={`activityDescription-${destinationIndex}-${activityIndex}`} className="block text-sm font-medium text-gray-700 mb-1">
                                                    Description
                                                </label>
                                                <textarea
                                                    id={`activityDescription-${destinationIndex}-${activityIndex}`}
                                                    value={activity.description}
                                                    onChange={(e) => onChange(destinationIndex, activityIndex, e)}
                                                    name="description"
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <label htmlFor={`activityDate-${destinationIndex}-${activityIndex}`} className="block text-sm font-medium text-gray-700 mb-1">
                                                    Date
                                                </label>
                                                <input
                                                    type="date"
                                                    id={`activityDate-${destinationIndex}-${activityIndex}`}
                                                    value={new Date(activity.date).toISOString().split('T')[0]}
                                                    onChange={(e) => onChange(destinationIndex, activityIndex, e)}
                                                    name="date"
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ))}
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