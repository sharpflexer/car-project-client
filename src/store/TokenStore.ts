import { makeAutoObservable, observable } from "mobx";
import AuthService from "../services/AuthService";
import SignInFields from "../types/SignInFields";
import { Role } from "../enums/Role";

class TokenStore {
     isAuth = false;
     isTechnicalWorks = false;
     role: Role = Role.None;

     constructor() {
          makeAutoObservable(this);
     }

     setAuth(isAuth: boolean, role: Role) {
          this.isAuth = isAuth;
          this.role = role;
     }

     setTechnicalWorks(isTechnicalWorks: boolean){
          this.isTechnicalWorks = isTechnicalWorks;
     }

     async checkoutRole(): Promise<void> {
          if (this.role === Role.None) {
               this.role = await AuthService.GetRole();
          }
     }

     async login({ login, password }: SignInFields): Promise<void> {
          try {
               const response = await AuthService.Login({ login, password });
               if (response.status === 200) {
                    localStorage.setItem('access_token', response.data.accessToken);
                    this.setAuth(true, response.data.roleName);
               }
          } catch (e) {
               console.log(e);
          }
     }

     async logout(toSignIn: () => void): Promise<void> {
          try {
               await AuthService.Logout(toSignIn);
               localStorage.removeItem('access_token');
               this.setAuth(false, Role.None)
          } catch (e) {
               console.log(e);
          }
     }
}

const _instance = new TokenStore();
export default _instance as TokenStore;