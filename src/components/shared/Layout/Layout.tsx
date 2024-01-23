import { Alert } from "antd";
import IMain from "../../../interfaces/IMain";
import Header from "../Header/Header";
import classes from "./Layout.module.css";
import { useEffect, useRef, useState } from "react";

function Layout({ children }: IMain) {
    const [isAlertEnabled, setAlertEnabled] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const socket = useRef<WebSocket>();

    useEffect(() => {
        socket.current = new WebSocket('wss://localhost:7191/api/notification/ws');

        socket.current.onmessage = (event: MessageEvent) => {
            setMessage(event.data);
            setAlertEnabled(true);
        }
    }, [])
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