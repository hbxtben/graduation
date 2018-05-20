import { observable, action, computed } from 'mobx';
import { graphRequest } from '../common/agent';

class GraphStore {
    @observable list = [];
    @observable curPage = 1;
    @observable dataSize = 0;
    @observable errorTip = '';

    // 分页跳页
    @action changePage = (page) => {
        this.curPage = page; //分页组件中的数字大一
    }

    //获取图标列表
    @action getList = (data) => {
        const getGraphList = graphRequest.getGraphList;

        getGraphList(data)
        .then(res => {
            const resData = res.data;
            if(resData && resData.ret) {
                const { dataSize, list } = resData.data;

                this.list = list;
                this.dataSize = dataSize;               
            } else {
                throw Error("server error");
            }
        })
        .catch(err => {
            this.errorTip = "服务器错误，请稍后刷新页面";
        })
    }

    @action delList = (data) => {
        const delGraphItem = graphRequest.delGraphItem;

        return delGraphItem(data)
                .then(res => {
                    const resData = res.data;
                    return resData;
                })
    }
}

var graphStore = new GraphStore();
export default graphStore;