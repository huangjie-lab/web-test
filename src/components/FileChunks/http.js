const http = require('http')
const path = require('path')
const multiparty = require('multiparty')
const util = require('util')
const fse = require('fs-extra')
const UPLOAD_DIR = path.resolve(__dirname, '.', 'chunks') // 准备好地址用来存切片
const server = http.createServer((req, res) => {
    // 解决跨域
    res.setHeader('Access-Control-Allow-Origin', '*') // 允许所有的请求源来跨域
    res.setHeader('Access-Control-Allow-Headers', '*') // 允许所有的请求头来跨域 

    if (req.url === '/upload') {
        var form = new multiparty.Form();
        form.parse(req, function(err, fields, files) {
            if(err) {
                console.log(err);
                return false;
            }
            res.writeHead(200, { 'content-type': 'text/plain' });
            res.write('received upload:\n\n');
            res.end(util.inspect({ fields: fields, files: files }));
            const file = files.file[0] 
            const fileName = fields.fileName[0]
            const chunkName = fields.chunkName[0]
            if (!fse.existsSync(UPLOAD_DIR)) { // 判断目录是否存在  
                fse.mkdirsSync(UPLOAD_DIR) 
            }
        });
    }
})

server.listen(5001, () => {
    console.log('listening on port 5001');
})