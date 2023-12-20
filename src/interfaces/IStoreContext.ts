import CarStore from '../store/CarStore';
import CartStore from '../store/CartStore';
import TokenStore from '../store/TokenStore';
import UserStore from '../store/UserStore';

export interface IStoreContext {
  tokenStore: TokenStore;
  cartStore: CartStore;
  carStore: CarStore;
  userStore: UserStore;
}
