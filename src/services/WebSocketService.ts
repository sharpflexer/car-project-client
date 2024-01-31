import TokenStore from "../store/TokenStore";

class WebSocketService {
    webSocket: WebSocket; 
    message: string = "";
    isAlertEnabled: boolean = false;
    constructor(){
        this.webSocket = new WebSocket(process.env.REACT_APP_WEBSOCKET_URL!);

        this.webSocket.onmessage = (event: MessageEvent) => {
            this.message = event.data;
            this.isAlertEnabled = true;
            this.timeout(5000)
            .then(() => TokenStore.setTechnicalWorks(true))
        };
    }

    timeout(delay: number) {
        return new Promise( res => setTimeout(res, delay) );
    }  
}

const _instance = new WebSocketService();
export default _instance as WebSocketService;