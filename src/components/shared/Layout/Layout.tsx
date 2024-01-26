import { Alert } from "antd";
import IMain from "../../../interfaces/IMain";
import Header from "../Header/Header";
import classes from "./Layout.module.css";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import SocketContext from "../../../context/SocketContext";
import { useNavigate } from "react-router-dom";

function Layout({ children }: IMain) {
    const [isAlertEnabled, setAlertEnabled] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const navigate = useNavigate();  
    const socket = useRef({} as WebSocket);

    function timeout(delay: number) {
        return new Promise( res => setTimeout(res, delay) );
    }

    useLayoutEffect(() => {
        socket.current = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL!);

        socket.current.onmessage = (event: MessageEvent) => {
            setMessage(event.data);
            setAlertEnabled(true);
            timeout(5000)
            .then(() => navigate("/technicalWork"));
        };
    }, []);

    return (
        <div>
            <Header />
            <SocketContext.Provider value={socket.current}>
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