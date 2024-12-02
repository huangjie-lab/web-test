const WebSocket = require("ws");

// 创建 WebSocket 服务器，监听端口 8080
const wss = new WebSocket.Server({ port: 8180 });

// 监听客户端连接
wss.on("connection", (ws) => {
  console.log("客户端已连接");

  // 监听客户端发送的消息
  ws.on("message", (message) => {
    console.log("收到客户端消息:", message);

    // 向客户端发送回复
    ws.send(`服务器回复: ${message}`);
  });

  // 发送一条欢迎消息给客户端
  ws.send("欢迎连接 WebSocket 服务器");
});

// 打印服务器地址
console.log("WebSocket 服务器已启动: ws://localhost:8180");