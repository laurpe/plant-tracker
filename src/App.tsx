import { BrowserRouter, Routes, Route } from "react-router-dom";

import Main from "./components/Main";
import SinglePlant from "./components/SinglePlant";
import AddPlant from "./components/AddPlant";
import AddGrowingMedium from "./components/AddGrowingMedium";
import LogIn from "./components/LogIn";
import SignUp from "./components/SignUp";
import Settings from "./components/Settings";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LogIn />} />
                <Route path="/main" element={<Main />} />
                <Route path="/add" element={<AddPlant />} />
                <Route
                    path="/add-growing-medium"
                    element={<AddGrowingMedium />}
                />
                <Route path="/plants/:id" element={<SinglePlant />} />
                <Route path="/login" element={<LogIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/settings" element={<Settings />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
