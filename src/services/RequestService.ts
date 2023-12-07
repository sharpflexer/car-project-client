import axios, { AxiosInstance } from "axios";
import setupInterceptorsTo from "../http/Interceptors";
import SignInFields from "../components/forms/types/SignInFields";
import SignUpFields from "../components/forms/types/SignUpFields";
import { useNavigate } from "react-router-dom";


/***
 * @type {RequestService} 
 */   
class RequestService{

    instance: AxiosInstance = axios.create({
        baseURL: 'https://localhost:7191',
        withCredentials: true, // Разрешить передачу куки
      });

    constructor(){
        this.instance = setupInterceptorsTo(this.instance);
    }

    public async Login({login, password} : SignInFields){
        return await this.instance.post("/api/auth/login", 
        {
            username: login,
            password: password
        });
    }

    public async Register({email, login, password}: SignUpFields){
        return await this.instance.post("/api/auth/register", 
        {
            email: email,
            username: login,
            password: password
        });
    }

    public async Logout(toSignIn: () => void){
        const response = await this.instance.get("/api/auth/logout");
        if(response.status === 200){
            toSignIn();
        }
    }
}

const _instance = new RequestService();
export default _instance as RequestService;