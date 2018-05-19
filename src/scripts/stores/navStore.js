import { observable, action, computed } from 'mobx';

//路由换的时候导航样式修改
class NavStore {
    @observable curNav = "/";

    //切换导航
    @action changeNav = (newNav) => {
        this.curNav = newNav || "/";
    }
}

const navStore = new NavStore();

export default navStore;