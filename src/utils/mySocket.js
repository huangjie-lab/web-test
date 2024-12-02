// 我们将实现以下几个功能点：
// 重连
// 心跳机制
// 事件回调
// 连接状态管理
// 销毁
export class MySocket {
    constructor(url, options = {}){
        const {maxReconnectTimes,reconnectInterval,heartbeatInterval,heartbeatData} = options;
        this.url = url; 
        this.options = options;
        this.socket = null;
        this.maxReconnectTimes = maxReconnectTimes || 5;
        this.reconnectTimes = 0; // 当前重连次数
        this.reconnectInterval = reconnectInterval || 3000; // 重链间隔时间
        this.isClosed = false; // 是否已关闭
        this.isOpen = false; // 是否已打开
        this.isConnect = false;
        this.isReconnecting = false; // 是否正在链接
        this.isDestroyed = false; // 是否销毁
        this.reconnectTimer = null; // 重连定时器
        this.heartbeatTimer = null; // 心跳定时器
        this.heartbeatInterval = heartbeatInterval || 30000;
        this.heartbeatData = heartbeatData || 'ping'; // 心跳数据
        this.onMessageCallback = null; // 消息接受回调
        this.onOpenCallback = null; // 链接成功回调
        this.onCloseCallback = null;  // 链接失败回调
    }

    // 创建websocket实例
    createSocket() {
        this.socket = new WebSocket(this.url);

        this.socket.onopen = () => {
            this.isOpen = true;
            this.isConnect = true;
            this.reconnectTimes = 0; // 重连次数归零
            this.startHeartbeat();
            this.onOpenCallback && this.onOpenCallback();
        }

        this.socket.onmessage = event => {
            this.onMessageCallback && this.onMessageCallback(event.data); // 调用消息接收回调
        };

        this.socket.onclose = () => {
            this.isOpen = false;
            this.isConnect = false;
            this.reconnectTimes = 0; // 重连次数归零
            this.stopHeartbeat();
            this.onCloseCallback && this.onCloseCallback();
            if(this.isClosed && this.reconnectTimes < this.maxReconnectTimes) {
                this.reconnect(); // 尝试重连
            }
        }

        this.socket.onerror = (error) => {
            console.error('websocket 错误' , error);
            
        }
    }

    // 开始连接
    connect() {
        if(this.isDestroyed){
            return false;
        }
        this.createSocket();
    }

    reconnect() {
        if(this.isReconnecting || this.reconnectTimes >= this.maxReconnectTimes) {
            return false;
        }
        this.isReconnecting = true;
        this.reconnectTimes++; // 增加重链次数
        this.reconnectTimer = setTimeout(() => {
            console.log(`'重新连接中...'(${this.reconnectTimes})`); // 打印重新连接次数
            this.createSocket();
            this.isReconnecting = false;
        }, this.reconnectTimer);
    }

    sendMessage(data) {
        if(this.isOpen) {
            this.socket.send(data); 
        }else{
            console.error('websocket 未打开，无法发送消息');
        }
    }

    onMessage(cb) {
        this.onMessageCallback = cb; // 绑定接受消息的回调
    }

    onOpen(cb) {
        this.onOpenCallback = cb; // 绑定接受消息的回调
    }

    onClose(cb) {
        this.onCloseCallback = cb; // 绑定接受消息的回调
    }
    
    // 启动心跳机制
    startHeartbeat() {
        this.heartbeatTimer = setInterval(() => {
            if (this.isOpen) {
                this.sendMessage(this.heartbeatData); // 发送心跳数据
            }
        }, this.heartbeatInterval); // 按设定的时间间隔发送
    }

    // 停止心跳机制
    stopHeartbeat() {
        if (this.heartbeatTimer) {
            clearInterval(this.heartbeatTimer); // 清除心跳定时器
            this.heartbeatTimer = null;
        }
    }
    // 关闭连接
    close() {
        this.isClosed = true; // 设置为已关闭
        this.isOpen = false;
        this.socket.close(); // 关闭WebSocket连接
        this.stopHeartbeat(); // 停止心跳机制
        clearTimeout(this.reconnectTimer); // 清除重连定时器
    }

    // 销毁实例
    destroy() {
        this.isDestroyed = true; // 设置为已销毁
        this.close(); // 关闭连接
    }
}