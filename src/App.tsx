import { BrowserRouter, Routes, Route } from "react-router-dom";

import Main from "./components/Main";
import SinglePlant from "./components/SinglePlant";
import AddPlant from "./components/AddPlant";
import AddGrowingMedium from "./components/AddGrowingMedium";
import LogIn from "./components/LogIn";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/add" element={<AddPlant />} />
                <Route
                    path="/add-growing-medium"
                    element={<AddGrowingMedium />}
                />
                <Route path="/plants/:id" element={<SinglePlant />} />
                <Route path="/login" element={<LogIn />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
