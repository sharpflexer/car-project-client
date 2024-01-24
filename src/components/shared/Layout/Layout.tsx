import { Alert } from "antd";
import IMain from "../../../interfaces/IMain";
import Header from "../Header/Header";
import classes from "./Layout.module.css";
import { useEffect, useRef, useState } from "react";
import SocketContext from "../../../context/SocketContext";
import { useNavigate } from "react-router-dom";

function Layout({ children }: IMain) {
    const [isAlertEnabled, setAlertEnabled] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const navigate = useNavigate();

    const url = "wss://localhost:7191/api/notification/ws";
    const [socket, setSocket] = useState(new WebSocket(url));

    function timeout(delay: number) {
        return new Promise( res => setTimeout(res, delay) );
    }

    useEffect(() => {
        socket.onmessage = (event: MessageEvent) => {
            setMessage(event.data);
            setAlertEnabled(true);
            timeout(5000)
            .then(() => navigate("/technicalWork"));
        };
    }, []);

    return (
        <div>
            <Header />
            <SocketContext.Provider value={socket}>
                <div className={classes.content}>
                    {children}
                </div>
            </SocketContext.Provider>
            {isAlertEnabled ? (<Alert
                message={message}
                type="info"
                showIcon
            />) : null}
        </div>
    );
}

export default Layout;