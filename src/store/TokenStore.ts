import { makeAutoObservable } from "mobx";
import RequestService from "../services/AuthService";
import SignInFields from "../types/SignInFields";
import { Role } from "../enums/Role";

export default class TokenStore{
     isAuth = false;
     role: Role = Role.None;

     constructor(){
          makeAutoObservable(this);
     }

     setAuth(bool: boolean, role: Role){
          this.isAuth = bool;
          this.role = role;
     }

     async login({login, password}: SignInFields) : Promise<void>{
          try{
               const response = await RequestService.Login({login, password});
               localStorage.setItem('access_token', response.data.accessToken);
               this.setAuth(true, response.data.roleName);
          } catch(e) {
               console.log(e);
          }         
     }

     async logout(toSignIn: () => void) : Promise<void>{
          try{
               await RequestService.Logout(toSignIn);
               localStorage.removeItem('access_token');
               this.setAuth(false, Role.None)
          } catch(e) {
               console.log(e);
          }
     }
}