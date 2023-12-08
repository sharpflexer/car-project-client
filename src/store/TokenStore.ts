import { makeAutoObservable } from "mobx";
import RequestService from "../services/RequestService";
import SignInFields from "../components/forms/types/SignInFields";

export default class TokenStore{
     isAuth = false;

     constructor(){
          makeAutoObservable(this);
     }

     setAuth(bool: boolean){
          this.isAuth = bool;
     }

     async login({login, password}: SignInFields) : Promise<void>{
          try{
               const response = await RequestService.Login({login, password});
               localStorage.setItem('access_token', response.data);
               this.setAuth(true)
          } catch(e) {
               console.log(e);
          }
     }

     async logout(toSignIn: () => void) : Promise<void>{
          try{
               await RequestService.Logout(toSignIn);
               localStorage.removeItem('access_token');
               this.setAuth(false)
          } catch(e) {
               console.log(e);
          }
     }
}