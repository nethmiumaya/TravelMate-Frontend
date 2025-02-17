import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import RootLayout from "./component/RootLayout.tsx";
import Home from "./component/Home.tsx";
import ItineraryList from "./component/ItineraryList.tsx";
import ItineraryDetails from "./component/ItineraryDetails.tsx";
import CreateItinerary from "./component/createItinerary.tsx";
import LoginForm from "./pages/Login.tsx";
import SignUp from "./pages/signUp.tsx";
import Layout from "./component/Layout.tsx";
import CreateDestination from './component/createDestination.tsx';
import DestinationList from './component/DestinationList.tsx';
import CreateActivity from './component/createActivity.tsx';
import ActivityList from './component/ActivityList.tsx';
import ActivityDetails from './component/ActivityDetails.tsx';

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<RootLayout />}>
                        <Route index element={<LoginForm />} />
                        <Route path="signup" element={<SignUp />} />
                        <Route element={<Layout />}>
                            <Route path="home" element={<Home />} />
                            <Route path="itineraries" element={<ItineraryList />} />
                            <Route path="itineraries/:id" element={<ItineraryDetails />} />
                            <Route path="itineraries/:itineraryId/destinations/create" element={<CreateDestination />} />
                            <Route path="destinations" element={<DestinationList />} />
                            <Route path="create" element={<CreateItinerary />} />
                            <Route path="destinations/:destinationId/activities/create" element={<CreateActivity />} />
                            <Route path="activities" element={<ActivityList />} />
                            <Route path="activities/:id" element={<ActivityDetails />} />
                        </Route>
                    </Route>
                </Routes>
            </BrowserRouter>
        </Provider>
    );
}

export default App;