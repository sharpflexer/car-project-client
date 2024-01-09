import { makeAutoObservable } from "mobx";
import { User } from "../types/User";
import UserService from "../services/UserService";


class UserStore {
    users: User[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    async readUsers(): Promise<void> {
        this.users = await UserService.GetUsers();
    }

    async updateUser(user: User): Promise<void> {
        const isUpdated = await UserService.UpdateUser(user);

        if (isUpdated) {
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
        const isDeleted = await UserService.DeleteUser(user);
        if (isDeleted) {
            const filteredUsers = this.users.filter((value) => value.id !== user.id);

            this.users = filteredUsers;
        }
        else {
            alert("Не удалось удалить пользователя.");
        }
    }
}

const _instance = new UserStore();
export default _instance as UserStore;