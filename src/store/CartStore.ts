import { action, makeAutoObservable, observable, observe } from "mobx";

export default class CartStore{
    goodsCount: number;

    constructor(){
        this.goodsCount = 0;
        makeAutoObservable(this);
    }

    increaseGoods = () => {
        this.goodsCount = this.goodsCount + 1;     
    }
}