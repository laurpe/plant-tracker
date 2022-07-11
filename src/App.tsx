import { BrowserRouter, Routes, Route } from "react-router-dom";

import Main from "./components/Main";
import SinglePlant from "./components/SinglePlant";

const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/plants/:id" element={<SinglePlant />} />
            </Routes>
        </BrowserRouter>
    );
};

export default App;
