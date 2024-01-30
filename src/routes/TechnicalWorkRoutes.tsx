import { Navigate, Route, Routes } from "react-router-dom";
import TechnicalWork from "../pages/TechnicalWork/TechnicalWork";

function TechnicalWorkRoutes() {
    return (
        <Routes>
            <Route path="*" element={<Navigate to="/technicalWork" replace={true} />} />
            <Route path="technicalWork" element={<TechnicalWork />} />
        </Routes>
    );
}

export default TechnicalWorkRoutes;
