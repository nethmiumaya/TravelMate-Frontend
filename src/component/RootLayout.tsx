import React from 'react';
import { Outlet } from 'react-router-dom';

const RootLayout: React.FC = () => {
    return (
        <div>
            <Outlet />
        </div>
    );
};

export default RootLayout;