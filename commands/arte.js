module.exports = {
    ayuda: `Menciona al usuario que deseas "pintar".`,
    ejemplo: "arte @User#0001",
    uso : "arte (MencionUsuario)",
    permiso : "Ninguno",

    run: async (client, message, args) => {
 
const sqlite3 = require("better-sqlite3");
const db = new sqlite3('./sadbot.sqlite3');
const Weez = require('weez');
const Discord = require("discord.js");
const weez = new Weez.WeezAPI((process.env.API));

let usuario = message.mentions.members.first();
if(!usuario) usuario = message.author;
if(usuario == message.mentions.members.first()) usuario = usuario.user;
let img = await weez.arte(usuario.displayAvatarURL({format: "png"}));

var color = db.prepare(`SELECT * FROM personalizar_comandos WHERE idserver = ${message.guild.id}`).get();
if(!color || color.colorembed == null) {
  var cembed = "#7289D9";
}else{
  var cembed = color.colorembed;
};


const embed = new Discord.MessageEmbed() 
.setColor(cembed)
.attachFiles([{
  attachment: img,
  name: "arte.png"
}])
.setImage("attachment://arte.png")

await message.channel.send(embed);
  }
};
