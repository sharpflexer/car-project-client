import { Navigate, Route, Routes } from "react-router-dom";
import Authorize from "../pages/Authorize/Authorize";

function NotAuthenticatedRoutes() {
    return (
      <Routes>
        <Route path="*" element={<Navigate to="/authorize" replace={true} />} />
        <Route path="authorize" element={<Authorize />} />
      </Routes>
    );
  }

export default NotAuthenticatedRoutes;