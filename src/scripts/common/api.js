const API = {
    userApi: {
        login: '1858/userLogin', //登陆

        logout: '1858/logout', //登出

        isLogin: '1858/isLogin', //判断是否登陆
        
        signin: '1858/signin' //注册
    },

    graphApi: {
        getGraphList: '1858/getGraphList', //我的图标，列表接口,
    
        delGraphItem: '1858/delGraph', //删除图表单项
    
        getGraphDetail: '1858/getGraphDetail', //获取图表详情
    
        saveGraphData: '1858/graphSave'
    },

    typeImg: {
        pie: '/typeImg/pie.png',

        bar: '/typeImg/bar.png',

        line: '/typeImg/line.png'
    }
}

export default API;