import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
    addItinerary, // Or remove if you only want to rely on backend
    updateItinerary as reduxUpdateItinerary, // rename to avoid confusion with service
} from '../store/slices/itinerarySlice';
import { RootState, Destination, Activity } from '../types';
import { Plus, Trash2 } from 'lucide-react';

// Import your service methods
import {
    createItinerary,
    createDestination,
    createActivity,
    updateItinerary as serviceUpdateItinerary,
    updateDestination,
    updateActivity,
} from '../services/itineraryService';

const CreateItinerary = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const existingItinerary = useSelector((state: RootState) =>
        state.itineraries.items.find(item => item.id === Number(id))
    );
    const { user } = useSelector((state: RootState) => state.auth);

    const [formData, setFormData] = useState({
        userId: user?.id || '',
        title: existingItinerary?.title || '',
        startDate: existingItinerary?.startDate
            ? new Date(existingItinerary.startDate).toISOString().split('T')[0]
            : '',
        endDate: existingItinerary?.endDate
            ? new Date(existingItinerary.endDate).toISOString().split('T')[0]
            : '',
        destinations: existingItinerary?.destinations || [],
    });

    // ---------------------------------
    // Main submit handler
    // ---------------------------------
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        // Basic itinerary object
        const itineraryData = {
            userId: user.id,
            title: formData.title,
            startDate: new Date(formData.startDate),
            endDate: new Date(formData.endDate),
        };

        try {
            let savedItinerary: any;

            // 1) Create or update itinerary
            if (id) {
                // Update existing itinerary in backend
                savedItinerary = await serviceUpdateItinerary(Number(id), itineraryData);

                // Also update in Redux if desired
                dispatch(reduxUpdateItinerary({ ...itineraryData, id: Number(id) }));
            } else {
                // Create new itinerary in backend
                savedItinerary = await createItinerary(itineraryData);

                // Add to Redux store if desired
                dispatch(addItinerary({
                    ...savedItinerary,
                    destinations: formData.destinations,
                }));
            }

            // 2) Create or update destinations and activities
            //    (If your backend automatically creates them in a single request,
            //     you can skip these loops and just rely on the single itinerary endpoint)
            for (const destination of formData.destinations) {
                let savedDestination: any;

                if (id && destination.id) {
                    // If you already have a destination ID, call update
                    savedDestination = await updateDestination(destination.id, {
                        itineraryId: savedItinerary.id,
                        name: destination.name,
                        location: destination.location,
                        latitude: destination.latitude,
                        longitude: destination.longitude,
                    });
                } else {
                    // Otherwise create new
                    savedDestination = await createDestination({
                        itineraryId: savedItinerary.id,
                        name: destination.name,
                        location: destination.location,
                        latitude: destination.latitude,
                        longitude: destination.longitude,
                    });
                }

                // Now handle each activity for this destination
                for (const activity of destination.activities) {
                    if (id && activity.id) {
                        await updateActivity(activity.id, {
                            destinationId: savedDestination.id,
                            title: activity.title,
                            description: activity.description,
                            date: activity.date,
                        });
                    } else {
                        await createActivity({
                            destinationId: savedDestination.id,
                            title: activity.title,
                            description: activity.description,
                            date: activity.date,
                        });
                    }
                }
            }

            // 3) Navigate after successful save
            navigate('/dashboard');
        } catch (error) {
            console.error('Error saving itinerary:', error);
            // Handle error (show message, etc.)
        }
    };

    // ---------------------------------
    // Handlers for adding/removing destinations & activities
    // (unchanged from your original code, just keep them)
    // ---------------------------------
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

        setFormData(prev => ({
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
            date: new Date(),
        };

        newDestinations[destinationIndex].activities.push(newActivity);
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
        newDestinations[destinationIndex].activities = newDestinations[destinationIndex].activities.filter(
            (_, i) => i !== activityIndex
        );
        setFormData({ ...formData, destinations: newDestinations });
    };

    // ---------------------------------
    // JSX Markup
    // ---------------------------------
    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">
                {id ? 'Edit Itinerary' : 'Create New Itinerary'}
            </h1>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Basic Info Fields */}
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

                {/* Destinations & Activities */}
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
                                <h3 className="text-lg font-semibold text-gray-900">
                                    Destination {destinationIndex + 1}
                                </h3>
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
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Name
                                        </label>
                                        <input
                                            type="text"
                                            value={destination.name}
                                            onChange={(e) =>
                                                updateDestination(destinationIndex, { name: e.target.value })
                                            }
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Location
                                        </label>
                                        <input
                                            type="text"
                                            value={destination.location}
                                            onChange={(e) =>
                                                updateDestination(destinationIndex, { location: e.target.value })
                                            }
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Latitude
                                        </label>
                                        <input
                                            type="number"
                                            value={destination.latitude}
                                            onChange={(e) =>
                                                updateDestination(destinationIndex, {
                                                    latitude: parseFloat(e.target.value),
                                                })
                                            }
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            Longitude
                                        </label>
                                        <input
                                            type="number"
                                            value={destination.longitude}
                                            onChange={(e) =>
                                                updateDestination(destinationIndex, {
                                                    longitude: parseFloat(e.target.value),
                                                })
                                            }
                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex justify-between items-center mb-4">
                                        <h4 className="text-md font-medium text-gray-900">Activities</h4>
                                        <button
                                            type="button"
                                            onClick={() => addActivity(destinationIndex)}
                                            className="flex items-center gap-2 text-blue-600 hover:text-blue-700"
                                        >
                                            <Plus className="w-4 h-4" />
                                            Add Activity
                                        </button>
                                    </div>

                                    <div className="space-y-4">
                                        {destination.activities.map((activity, activityIndex) => (
                                            <div key={activity.id} className="bg-gray-50 p-4 rounded-md">
                                                <div className="flex justify-between items-start mb-4">
                                                    <h5 className="text-sm font-medium text-gray-900">
                                                        Activity {activityIndex + 1}
                                                    </h5>
                                                    <button
                                                        type="button"
                                                        onClick={() => removeActivity(destinationIndex, activityIndex)}
                                                        className="text-red-600 hover:text-red-700"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>

                                                <div className="space-y-4">
                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                                            Title
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={activity.title}
                                                            onChange={(e) =>
                                                                updateActivity(destinationIndex, activityIndex, {
                                                                    title: e.target.value,
                                                                })
                                                            }
                                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                            required
                                                        />
                                                    </div>

                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                                            Description
                                                        </label>
                                                        <textarea
                                                            value={activity.description}
                                                            onChange={(e) =>
                                                                updateActivity(destinationIndex, activityIndex, {
                                                                    description: e.target.value,
                                                                })
                                                            }
                                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                            rows={2}
                                                        />
                                                    </div>

                                                    <div>
                                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                                            Date
                                                        </label>
                                                        <input
                                                            type="date"
                                                            value={
                                                                activity.date instanceof Date
                                                                    ? activity.date.toISOString().split('T')[0]
                                                                    : ''
                                                            }
                                                            onChange={(e) =>
                                                                updateActivity(destinationIndex, activityIndex, {
                                                                    date: new Date(e.target.value),
                                                                })
                                                            }
                                                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                            required
                                                        />
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

                {/* Submit Buttons */}
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
