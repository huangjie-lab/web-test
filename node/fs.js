const fs = require('fs');
const fsp = require('fs/promises');
fs.readFile('./index1.txt','utf8',(err,data) => {
    if(!err) {
        console.log(data.toString());
    }
})
let txt = fs.readFileSync('./index1.txt','utf8');
console.log(txt.toString(),'同步');

// 创建读取流，适用于读取大文件
const readStream = fs.createReadStream('./index1.txt','utf8');
readStream.on('data',(chunk) => {
    console.log(chunk,'chunk');
})
readStream.on('end',() => {
    console.log('close');
})

const writeStreamList = ['创建读取流，适用于读取大文件','创建写入流，适用于携入大文件','开启 recursive，递归创建'];
// 创建写入流，适用于携入大文件
const writeStream = fs.createWriteStream('./index1.txt');
writeStreamList.forEach(item => {
    writeStream.write(item + '\n')
})
writeStream.end()
writeStream.on('finish',()=>{
    console.log('写入完成')
})

// 开启 recursive，递归创建
fs.mkdir('path/test/ccc', { recursive: true },(err)=>{
    console.log(err);
})

fs.rm('./path/test/ccc',(err) => {

})

// 重命名
// fs.renameSync('./index1.txt','./index1.txt')

// 监听文件变化
fs.watch('./index1.txt',(event,filename)=>{
    console.log(event,filename)
})

// 写入文件
fs.writeFileSync('index1.txt', '\nvue之父\n鱿鱼须',{
    flag: 'a'
})
// 追加
fs.appendFile('index1.txt', '\nunshift创始人\n麒麟哥',()=>{
    console.log('追加完成');
})


fs.linkSync('./index1.txt', './index2.txt') //硬链接

fs.symlinkSync('./index1.txt', './index3.txt' ,"file") //软连接