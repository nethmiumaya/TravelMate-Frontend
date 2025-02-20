import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import ItineraryDetails from './pages/ItineraryDetails';
import CreateItinerary from './pages/CreateItinerary';
import Login from './pages/Login';
import Profile from './pages/Profile';
import SharedItinerary from './pages/SharedItinerary';
import { store } from './store/store';
import Navbar from './component/Navbar';
import Register from './pages/SignUp';

function App() {
    return (
        <Provider store={store}>
            <Router>
                <div className="min-h-screen bg-gray-50">
                    <Navbar />
                    <main className="container mx-auto px-4 py-8">
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/itinerary/new" element={<CreateItinerary />} />
                            <Route path="/itinerary/:id" element={<ItineraryDetails />} />
                            <Route path="/itinerary/:id/edit" element={<CreateItinerary />} />
                            <Route path="/shared/:id" element={<SharedItinerary />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                            <Route path="/profile" element={<Profile />} />
                        </Routes>
                    </main>
                </div>
            </Router>
        </Provider>
    );
}

export default App;