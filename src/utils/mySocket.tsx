type ReSocketOptions = {
    maxReconnectTimes?: number; // 最大重连次数
    reconnectInterval?: number; // 重连间隔时间（毫秒）
    heartbeatInterval?: number; // 心跳间隔时间（毫秒）
    heartbeatData?: string; // 心跳数据
  };
  
export class ReSocket {
private url: string;
private socket: WebSocket | null = null;
private maxReconnectTimes: number;
private reconnectTimes: number = 0;
private reconnectInterval: number;
private isClosed: boolean = false;
private isOpen: boolean = false;
private isConnect: boolean = false;
private isReconnecting: boolean = false;
private isDestroyed: boolean = false;
private reconnectTimer: NodeJS.Timeout | null = null;
private heartbeatTimer: NodeJS.Timeout | null = null;
private heartbeatInterval: number;
private heartbeatData: string;
private onMessageCallback: ((message: string) => void) | null = null;
private onOpenCallback: (() => void) | null = null;
private onCloseCallback: (() => void) | null = null;

constructor(url: string, options: ReSocketOptions = {}) {
    this.url = url;
    this.maxReconnectTimes = options.maxReconnectTimes || 5;
    this.reconnectInterval = options.reconnectInterval || 3000;
    this.heartbeatInterval = options.heartbeatInterval || 30000;
    this.heartbeatData = options.heartbeatData || 'ping';
}

private createSocket(): void {
    this.socket = new WebSocket(this.url);

    this.socket.onopen = () => {
    this.isOpen = true;
    this.isConnect = true;
    this.reconnectTimes = 0;
    this.startHeartbeat();
    if (this.onOpenCallback) this.onOpenCallback();
    };

    this.socket.onmessage = (event: MessageEvent) => {
    if (this.onMessageCallback) this.onMessageCallback(event.data);
    };

    this.socket.onclose = () => {
    this.isOpen = false;
    this.isConnect = false;
    this.stopHeartbeat();
    if (this.onCloseCallback) this.onCloseCallback();
    if (!this.isClosed && this.reconnectTimes < this.maxReconnectTimes) {
        this.reconnect();
    }
    };

    this.socket.onerror = (error: Event) => {
    console.error("WebSocket 错误: ", error);
    };
}

public connect(): void {
    if (this.isDestroyed) return;
    this.createSocket();
}

private reconnect(): void {
    if (this.isReconnecting || this.reconnectTimes >= this.maxReconnectTimes) return;

    this.isReconnecting = true;
    this.reconnectTimes++;

    this.reconnectTimer = setTimeout(() => {
    console.log(`正在重连... (${this.reconnectTimes})`);
    this.createSocket();
    this.isReconnecting = false;
    }, this.reconnectInterval);
}

public send(data: string): void {
    if (this.isOpen && this.socket) {
    this.socket.send(data);
    } else {
    console.error("WebSocket 未打开，无法发送消息。");
    }
}

public onMessage(callback: (message: string) => void): void {
    this.onMessageCallback = callback;
}

public onOpen(callback: () => void): void {
    this.onOpenCallback = callback;
}

public onClose(callback: () => void): void {
    this.onCloseCallback = callback;
}

private startHeartbeat(): void {
    this.heartbeatTimer = setInterval(() => {
    if (this.isOpen && this.socket) {
        this.send(this.heartbeatData);
    }
    }, this.heartbeatInterval);
}

private stopHeartbeat(): void {
    if (this.heartbeatTimer) {
    clearInterval(this.heartbeatTimer);
    this.heartbeatTimer = null;
    }
}

public close(): void {
    this.isClosed = true;
    this.isOpen = false;
    if (this.socket) {
    this.socket.close();
    }
    this.stopHeartbeat();
    if (this.reconnectTimer) {
    clearTimeout(this.reconnectTimer);
    }
}

public destroy(): void {
    this.isDestroyed = true;
    this.close();
}
}
  
  