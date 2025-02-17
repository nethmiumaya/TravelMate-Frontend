import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Calendar, Clock } from 'lucide-react';
import type { RootState } from '../store/store';

const ActivityDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const activity = useSelector((state: RootState) =>
        state.activity.activities.find(a => a.id === id)
    );

    if (!activity) {
        return (
            <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-gray-900">Activity not found</h2>
                <p className="mt-2 text-gray-600">The activity you're looking for doesn't exist.</p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="border-b border-gray-200 pb-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{activity.title}</h1>
                <div className="flex items-center space-x-6 text-gray-500">
                    <div className="flex items-center">
                        <Calendar className="h-5 w-5 mr-2" />
                        <span>{new Date(activity.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center">
                        <Clock className="h-5 w-5 mr-2" />
                        <span>{new Date(activity.date).toLocaleTimeString()}</span>
                    </div>
                </div>
                <p className="mt-4 text-gray-600">{activity.description}</p>
            </div>
        </div>
    );
};

export default ActivityDetails;