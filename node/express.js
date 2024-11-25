const express  = require('express');
const User = require('./user.js')  // 路由模块
// const loggerMiddleware = require('./middleware/logger.js');  // 中间件
const app = express()  // express 是个函数
app.use(express.json());
app.use('/user',User);
// app.use(loggerMiddleware);

app.get('/', (req, res) => {
    console.log(req.query)  //get 用query 
    res.send('get')
})

app.post('/create', (req, res) => {
    console.log(req.body)  //post用body
    res.send('post')
})

app.get('/:id', (req, res) => {
    console.log(req.params)  //如果是动态参数用 params
    res.send('get id')
})

app.listen(3003, () => console.log('Listening on port 3003'))