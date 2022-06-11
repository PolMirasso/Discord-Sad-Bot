module.exports = {
    ayuda: `Te enseña fondos de pantalla, por si quieres canviar.`,
    ejemplo: "wallpapers",
    permiso : "Ninguno",

    run: async (client, message, args) => {
const Discord = require("discord.js")
let wallpaper = Math.floor(Math.random() * 2) +1;

const sqlite3 = require("better-sqlite3");
const db = new sqlite3('./sadbot.sqlite3');
  

var color = db.prepare(`SELECT * FROM personalizar_comandos WHERE idserver = ${message.guild.id}`).get();
if(!color || color.colorembed == null) {
var cembed = "#7289D9";
}else{
var cembed = color.colorembed;
};

if(wallpaper === 1){
let w = ["https://cdn.discordapp.com/attachments/610534407396392984/613414805859991565/Supreme-9902f9e3-5199-4367-9b3b-545eaa7a833f.jpg","https://cdn.discordapp.com/attachments/610534407396392984/613803866424737913/Galaxy_-3ce56dcc-d349-4c2c-be22-521284e8ef68.jpg","https://cdn.discordapp.com/attachments/610534407396392984/613818241109983304/JPEG_20190130_165932.jpg","https://cdn.discordapp.com/attachments/610534407396392984/613818241567031319/JPEG_20181120_113251.jpg","https://cdn.discordapp.com/attachments/610534407396392984/613818241567031331/JPEG_20190305_103223.jpg","https://cdn.discordapp.com/attachments/610534407396392984/613818243488022722/JPEG_20181222_170913.jpg","https://cdn.discordapp.com/attachments/610534407396392984/613818243483828234/JPEG_20181119_212452.jpg","https://cdn.discordapp.com/attachments/610534407396392984/613818242682847241/JPEG_20190223_121257.jpg"]
 let imagen = w[Math.floor(Math.random() * w.length)]
 message.channel.send(new Discord.MessageEmbed().setColor("#7289D9").setImage(imagen))
}else if(wallpaper === 2){
const randomPuppy = require('random-puppy');
var buscar = ['wallpaper', 'wallpapers']
var random = buscar[Math.floor(Math.random() * buscar.length)];
randomPuppy(random).then(url => {
const puppy = new Discord.MessageEmbed()
.setImage(url)
.setColor(cembed)
message.channel.send(puppy)  
    });
    };
  }
};