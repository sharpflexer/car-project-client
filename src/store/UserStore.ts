import { makeAutoObservable } from "mobx";
import { User } from "../types/User";
import UserService from "../services/UserService";


export default class UserStore {
    users: User[] = []; 

    constructor() {
        makeAutoObservable(this);
    }

    async readUsers(): Promise<void> {
        this.users =  await UserService.GetUsers();
        console.log(this.users);
    }

    async updateUser(user: User): Promise<void> {
        if (await UserService.UpdateUser(user)) {
            const index = this.users.findIndex(u => u.id === user.id);
            const updatedUsers = this.users.filter((value) => value.id !== user.id);
            updatedUsers.splice(index, 0, user);
            this.users = updatedUsers;
        }
        else {
            alert("Не удалось обновить пользователя.");
        }
    }
    
    async deleteUser(user: User) {
        if (await UserService.DeleteUser(user)) {
            const filteredUsers = this.users.filter((value) => value.id !== user.id);
            this.users = filteredUsers;
        }
        else {
            alert("Не удалось удалить пользователя.");
        }
    }
}