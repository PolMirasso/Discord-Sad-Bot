const { getUser } = require("./utils/get.js");

async function y(){
let test = await getUser("445334027512315915");
console.log(test);
}
y();