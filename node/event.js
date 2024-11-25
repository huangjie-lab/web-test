const EventEmitter = require('events');
const event = new EventEmitter();
event.on('msg' , data => console.log(data));
event.emit('msg','xmxmxmxmx') //派发事件