import { Alert } from "antd";
import IMain from "../../../interfaces/IMain";
import Header from "../Header/Header";
import classes from "./Layout.module.css";
import WebSocketService from "../../../services/WebSocketService";

function Layout({ children }: IMain) {
    const { isAlertEnabled, message } = WebSocketService;
    // const [isAlertEnabled, setAlertEnabled] = useState<boolean>(false);
    // const [message, setMessage] = useState<string>(""); 

    return (
        <div>
            <Header />
            <div className={classes.content}>
                {children}
            </div>
            {isAlertEnabled ? (<Alert
                message={message}
                type="info"
                showIcon
            />) : null}
        </div>
    );
}

export default Layout;