const rules = {
    nickname: [{
        required: true, 
        message: '请输入昵称!'
    }],

    username: [{
        required: true, 
        message: '请输入用户名!'
    }, {
        max: 16,
        min: 6,
        message: '请输入6～16位的用户名'
    }],

    password: [{
        required: true, 
        message: '请输入密码!'
    }, {
        max: 16,
        min: 6,
        message: '请输入6～16位的密码'
    }]
}

export default rules;