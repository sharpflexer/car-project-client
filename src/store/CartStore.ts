import { action, makeAutoObservable } from "mobx";


export default class CartStore{
    goodsCount: number = 0;

    constructor(){
        makeAutoObservable(this);
    }

    increaseGoods = () => {
        this.goodsCount = this.goodsCount + 1;     
    }
}