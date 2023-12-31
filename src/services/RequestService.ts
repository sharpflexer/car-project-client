import axios, { AxiosInstance, AxiosResponse } from "axios";
import setupInterceptorsTo from "../http/Interceptors";
import SignInFields from "../types/SignInFields";
import SignUpFields from "../types/SignUpFields";
import { ILogin } from "../interfaces/ILogin";
import { Car } from "../types/Car";
import ReadonlyCar from "../types/ReadonlyCar";


/***
 * Сервис для отправки запросов на сервер.
 */   
class RequestService{
    /***
     *  Экземпляр axios с необходимиыми настройками.
     */
    instance: AxiosInstance = axios.create({
        baseURL: 'https://localhost:7191',
        withCredentials: true, // Разрешить передачу куки
      });

      /***
       *  Конструктор, устанавливающий интерцепторы.
       */
    constructor(){
        this.instance = setupInterceptorsTo(this.instance);
    }

    /***
     * Выполняет асихнронный вход в аккаунт.
     */
    public async Login({login, password} : SignInFields) : Promise<AxiosResponse<ILogin, ILogin>>{
        return await this.instance.post("/api/auth/login", 
        {
            username: login,
            password: password
        });
    }

    /***
     * Выполняет асихнронную регистрацию аккаунта.
     */
    public async Register({email, login, password}: SignUpFields) : Promise<void>{
        return await this.instance.post("/api/register", 
        {
            email: email,
            login: login,
            password: password
        });
    }

    /***
     * Выполняет асинхронный выход из аккаунта
     */
    public async Logout(toSignIn: () => void) : Promise<void>{
        const response = await this.instance.get("/api/auth/logout");
        if(response.status === 200){
            toSignIn();
        }
    }

    public async GetCars(): Promise<ReadonlyCar[]> {
        const result = (await this.instance.get<Car[]>("/api/car/read")).data;

        return result.map<ReadonlyCar>(car => new ReadonlyCar(car));
    }
}

const _instance = new RequestService();
export default _instance as RequestService;