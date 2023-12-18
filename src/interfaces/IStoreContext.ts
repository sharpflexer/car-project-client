import CartStore from '../store/CartStore';
import TokenStore from '../store/TokenStore';

export interface IStoreContext {
  tokenStore: TokenStore;
  cartStore: CartStore;
}
