import { makeAutoObservable, observable, runInAction } from "mobx";
import { User } from "../types/User";
import UserService from "../services/UserService";
import { Car } from "../types/Car";


export default class UserStore {
    @observable users = observable.array<User>();

    constructor() {
        makeAutoObservable(this);
    }

    async readUsers(): Promise<void> {
        this.users.replace(await UserService.GetUsers());
        console.log(this.users);
    }

    async updateUser(user: User): Promise<void> {
        if (await UserService.UpdateUser(user)) {
            this.users.forEach((value) => value.id === user.id ? user : value);
        }
        else {
            alert("Не удалось обновить пользователя.");
        }
    }

    async deleteUser(user: User) {
        if (await UserService.DeleteUser(user)) {
            const index = this.users.findIndex(u => u.id === user.id);
            runInAction(() => this.users.splice(index, 1));
        }
        else {
            alert("Не удалось удалить пользователя.");
        }
    }
}