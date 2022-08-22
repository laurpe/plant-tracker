import { BrowserRouter, Routes, Route } from "react-router-dom";

import Main from "./components/Main";
import SinglePlant from "./components/SinglePlant";
import AddPlant from "./components/AddPlant";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import Profile from "./components/Profile";
import ScrollToTop from "./components/ScrollToTop";

import { useUser } from "./hooks/useUser";

const App = () => {
    const { user } = useUser();
    return (
        <BrowserRouter>
            <ScrollToTop>
                <Routes>
                    <Route
                        path="/"
                        element={user.token ? <Main /> : <LogIn />}
                    />
                    <Route path="/main" element={<Main />} />
                    <Route path="/add" element={<AddPlant />} />
                    <Route path="/plants/:id" element={<SinglePlant />} />
                    <Route path="/login" element={<LogIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
            </ScrollToTop>
        </BrowserRouter>
    );
};

export default App;
