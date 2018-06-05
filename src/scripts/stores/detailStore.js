import { observable, action, computed } from 'mobx';
import { graphRequest } from '../common/agent';
import defaultOption from './const/defaultOption';
import exampleData from './const/exampleData';

class DetailStore {
    @observable detailData = "[]";
    @observable options = defaultOption;
    @observable graphType = "bar"
    @observable step = 0;
    @observable errtip = '';

    @action setData = (data) => {
        this.detailData = data;
    }

    @action changeStep = step => {
        if(step > -1 && step < 3) {
            this.step = step;
        }
    }

    //修改图表类型
    @action chooseGraphType = type => {
        this.graphType = type;
    }
    
    //展示实例数据
    @action showExample = type => {
        var example = exampleData[type];
        
        this.detailData = JSON.stringify(example.data);
        this.options = Object.assign({}, this.options, example.options);
        this.graphType = example.graphType ? example.graphType : this.graphType;
    }

    //修改配置
    @action changeGraphOptions = options => {
        this.options = Object.assign({}, this.options, options);
        console.log("change options~~:", options);
    }

    @action setDetailData = data => {
        return graphRequest.getGraphDetail(data)
                .then(res => {
                    const resData = res.data;
                    return resData;
                });
    }

    //保存数据
    @action saveGraphData = data => {
        return graphRequest.saveGraphData(data)
                .then(res => {
                    const resData = res.data;
                    return resData;
                });
    }
}

const detailStore = new DetailStore();

export default detailStore;