const options = {
    title: {
        text: '图表标题',
        subtext: '图表的简单描述',
        x: 'center'
    },
    toolbox: {
        feature: {
            saveAsImage: {
                show: true
            }
        } 
    },
    tooltip: {},
    legend: {
        bottom: 0
    },
    xAxis: {type: 'category'},  //x轴展示分类
    yAxis: {}
}

export default options;