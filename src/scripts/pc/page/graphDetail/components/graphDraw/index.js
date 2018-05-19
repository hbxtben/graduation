import React, { Component } from 'react';
import { message } from 'antd';
import echarts from 'echarts/lib/echarts';

// 图表的动态引入
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
import 'echarts/lib/chart/pie';

// 引入组件
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/toolbox';
import 'echarts/lib/component/legend';

import { toJS } from 'mobx';

let graphWrapCache = null;

let myEchart = null;

//绘图
export const graphDraw = ({ detailData, options, graphType, graphWrap }) => {
    let data = [];

    try {
        data = JSON.parse(toJS(detailData)); //数据
    } catch(e) {
        message.error("输入数据不合法", 2);
        
        return;
    }

    //动态添加series
    const getSeries = () => {
        let result = [];

        if(data.length > 0) {
            const nums = data[0].length - 1;

            for(var seriesNum = 0 ; seriesNum < nums ; seriesNum++) {
                result.push({type: graphType});
            }
        }

        return result;
    }

    myEchart = echarts.init(graphWrap);
    const graphOptions = {
        ...toJS(options),
        dataset: {
            source: data
        },
        series: getSeries(),
    }

    console.log("draw echarts data", JSON.stringify(data));

    //第二个参数代表新数据不与之前的数据合并
    myEchart.setOption(graphOptions, true);
}

export const getGraphImg = () => {
    if(!myEchart) {
        return "";
    } else {
        return myEchart.getDataURL({
            type: 'jpeg'
        });
    }
}