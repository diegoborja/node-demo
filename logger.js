const EventEmitter = require("events");
let _url = "https://wwww.google.com";
class _Logger extends EventEmitter{
    log(message){
        console.log(`${_url}/${message}`);
        this.emit("logged", {message: message});
    }
};
module.exports = new _Logger();