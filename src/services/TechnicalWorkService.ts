import axios, { AxiosInstance } from "axios";
import { axiosConfig } from "./instance";
import { Dayjs } from "dayjs";

class TechnicalWorkService {
    /***
    *  Экземпляр axios с необходимиыми настройками.
    */
    instance: AxiosInstance = axios.create(axiosConfig);

    async StartTechnicalWork(time: Dayjs): Promise<boolean>{
        return (await this.instance.post<Dayjs>("/api/notification/start", time))
        .status === 200;
    }
}

const _instance = new TechnicalWorkService();
export default _instance as TechnicalWorkService;