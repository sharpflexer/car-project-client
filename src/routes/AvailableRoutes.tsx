import TokenStore from "../store/TokenStore";
import DefaultRoutes from "./DefaultRoutes";
import NotAuthenticatedRoutes from "./NotAuthenticatedRoutes";
import TechnicalWorkRoutes from "./TechnicalWorkRoutes";
import { observer } from "mobx-react";

function AvailableRoutes() {
    const { isAuth, isTechnicalWork } = TokenStore;

    if (!isAuth) {
        return NotAuthenticatedRoutes();
    }

    if (isTechnicalWork) {
        return TechnicalWorkRoutes();
    }

    return DefaultRoutes();
}

export default observer(AvailableRoutes);
