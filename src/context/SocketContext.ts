import { createContext } from "react";

const SocketContext = createContext<WebSocket>({} as WebSocket);

export default SocketContext;