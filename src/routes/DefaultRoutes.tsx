import { Routes, Route, Navigate } from "react-router-dom";
import Admin from "../pages/Admin/Admin";
import Authorize from "../pages/Authorize/Authorize";
import Catalog from "../pages/Catalog/Catalog";

function DefaultRoutes() {
    return (
        <Routes>
            <Route path="*" element={<Navigate to="/catalog" replace={true} />} />
            <Route path="authorize" element={<Authorize />} />
            <Route path="catalog" element={<Catalog />} />
            <Route path="admin" element={<Admin />} />
        </Routes>
    );
}

export default DefaultRoutes;