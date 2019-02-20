const EventEmitter = require("events");
class _Logger extends EventEmitter{
    log(message){
        console.log(`Message: ${message}`);
        this.emit("logged", {message: message});
    }
};
module.exports = new _Logger();