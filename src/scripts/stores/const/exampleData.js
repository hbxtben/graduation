const example = {
    single: {
        data: [
            ['浏览器', '市场份额'],
            ['Chrome', 42.8],
            ['FireFox', 37.2],
            ['IE', 21.3],
            ['Safari', 12],
            ['opera', 6.2],
            ['others', 4.2]
        ],
        options: {
            title: {
                text: '浏览器市场份额',
                subtext: '展示了2018年浏览器的市场份额，数据纯属虚构，仅作为展示用例',
                x: 'center'
            }
        },
        graphType: 'pie'
    },
    more: {
        data: [
            ['产品', '奶粉', '茶叶', '咖啡'],
            ['2014', 56, 104, 53],
            ['2015', 63.4, 78, 62],
            ['2016', 62.2, 82.4, 68],
            ['2017', 71.1, 68.9, 64],
            ['2018', 80.2, 88, 61]
        ],
        options: {
            title: {
                text: '三种产品的价格变化',
                subtext: '奶粉，茶叶和咖啡在5年内的价格变动，数据纯属虚构，仅作为展示用例',
                x: 'center'
            }
        },
        graphType: 'bar'
    }
}

export default example;