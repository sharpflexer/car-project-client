import axios, { AxiosInstance, AxiosResponse } from "axios";
import setupInterceptorsTo from "http/Interceptors";
import SignInFields from "types/SignInFields";
import SignUpFields from "types/SignUpFields";
import { ILogin } from "interfaces/ILogin";
import { axiosConfig } from "./instance";

/***
 * Сервис для отправки запросов на сервер.
 */
class AuthService {

    /***
     *  Экземпляр axios с необходимиыми настройками.
     */
    instance: AxiosInstance = axios.create(axiosConfig);

    /***
     *  Конструктор, устанавливающий интерцепторы.
     */
    constructor() {
        this.instance = setupInterceptorsTo(this.instance);
    }

    /***
     * Выполняет асихнронный вход в аккаунт.
     */
    public async Login({ login, password }: SignInFields): Promise<AxiosResponse<ILogin, ILogin>> {
        return await this.instance.post("/api/auth/login",
            {
                username: login,
                password: password
            });
    }

    /***
     * Выполняет асихнронную регистрацию аккаунта.
     */
    public async Register({ email, login, password }: SignUpFields): Promise<void> {
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
    public async Logout(toSignIn: () => void): Promise<void> {
        const response = await this.instance.get("/api/auth/logout");
        if (response.status === 200) {
            toSignIn();
        }
    }
}

const _instance = new AuthService();
export default _instance as AuthService;