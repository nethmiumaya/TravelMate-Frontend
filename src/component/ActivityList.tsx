import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Calendar, Clock } from 'lucide-react';
import type { RootState } from '../store/store';
import CreateActivity from './createActivity';

const ActivityList: React.FC = () => {
    const activities = useSelector((state: RootState) => state.activity.activities);
    const [showCreateActivity, setShowCreateActivity] = useState(false);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-900">My Activities</h1>
                <Link
                    to="/destinations/:destinationId/activities/create"
                    className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700"
                >
                    Create New Activity
                </Link>
            </div>

            {showCreateActivity ? (
                <CreateActivity />
            ) : (
                <>
                    {activities.length === 0 ? (
                        <div className="text-center py-12">
                            <Calendar className="mx-auto h-12 w-12 text-gray-400" />
                            <h3 className="mt-2 text-sm font-medium text-gray-900">No activities</h3>
                            <p className="mt-1 text-sm text-gray-500">Get started by adding a new activity.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {activities.map((activity) => (
                                <div
                                    key={activity.id}
                                    className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-200"
                                >
                                    <div className="p-6">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                                            {activity.title}
                                        </h3>
                                        <div className="flex items-center text-sm text-gray-500 mb-4">
                                            <Clock className="h-4 w-4 mr-2" />
                                            <span>{new Date(activity.date).toLocaleString()}</span>
                                        </div>
                                        <Link
                                            to={`/activities/${activity.id}`}
                                            className="text-primary-600 hover:text-primary-700 font-medium text-sm"
                                        >
                                            View Details
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default ActivityList;