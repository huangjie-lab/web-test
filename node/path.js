const path = require('path');
const filePath = '/home/user/docs/file.txt';
console.log(path.basename(filePath)); //file.txt
console.log(path.extname(filePath)); //.txt
console.log(path.dirname(filePath));  ///home/user/docs

const joinPath = path.join('/node', './index.js')
console.log(joinPath); // /node/index.js

// 拼接后的完整路径
const resolvePath = path.resolve('node', './index.js')
console.log(resolvePath); ///Users/cm/Documents/react/react-project-init/my-app/node/node/index.js

// 获取当前工作目录的完整路径
const currentPath = path.resolve();
console.log(currentPath); // /Users/cm/Documents/react/react-project-init/my-app/node

console.log('当前文件所在目录的绝对路径是：',__dirname); // /Users/cm/Documents/react/react-project-init/my-app/node

const joinPath1 = path.join(__dirname,'../package.json');
console.log(joinPath1); // /Users/cm/Documents/react/react-project-init/my-app/package.json
