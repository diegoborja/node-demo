const logger = require("./logger.js");
logger.on("logged", (arg)=>{
    console.log(arg);
})
logger.log("bitches!!");