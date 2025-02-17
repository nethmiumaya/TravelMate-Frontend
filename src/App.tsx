import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import LoginForm from "./pages/Login.tsx";
import SignUp from "./pages/signUp.tsx";
import RootLayout from "./component/RootLayout.tsx";


function App() {
    return (
        <Provider store={store}>
            <Router>
                <Routes>
                    <Route path="/" element={<RootLayout />}>
                        <Route index element={<LoginForm />} />
                        <Route path="signup" element={<SignUp />} />
                    </Route>
                </Routes>
            </Router>
        </Provider>
    );
}

export default App;
