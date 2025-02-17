import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addDestination } from '../slices/destinationSlice';

const CreateDestination: React.FC = () => {
    const { itineraryId } = useParams<{ itineraryId: string }>();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [name, setName] = useState('Paris');
    const [location, setLocation] = useState('France');
    const [latitude, setLatitude] = useState(48.8566);
    const [longitude, setLongitude] = useState(2.3522);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const newDestination = {
            id: crypto.randomUUID(),
            itineraryId: parseInt(itineraryId!),
            name,
            location,
            latitude,
            longitude,
        };

        dispatch(addDestination(newDestination));
        navigate('/destinations'); // Navigate to the destination list page after creation
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h1 className="text-2xl font-bold text-gray-900 mb-8">Add New Destination</h1>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    />
                </div>

                <div>
                    <label htmlFor="location" className="block text-sm font-medium text-gray-700">
                        Location
                    </label>
                    <input
                        type="text"
                        id="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                    />
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                    <div>
                        <label htmlFor="latitude" className="block text-sm font-medium text-gray-700">
                            Latitude
                        </label>
                        <input
                            type="number"
                            id="latitude"
                            value={latitude}
                            onChange={(e) => setLatitude(parseFloat(e.target.value))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="longitude" className="block text-sm font-medium text-gray-700">
                            Longitude
                        </label>
                        <input
                            type="number"
                            id="longitude"
                            value={longitude}
                            onChange={(e) => setLongitude(parseFloat(e.target.value))}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
                        />
                    </div>
                </div>

                <div className="flex justify-end space-x-4">
                    <button
                        type="button"
                        onClick={() => navigate('/destinations')}
                        className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                        Add Destination
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateDestination;