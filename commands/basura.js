module.exports = {
    ayuda: "Te dice lo que es el ususario.",
    ejemplo: "basura @User#000",
    uso : "ban (Usuario)",
    permiso : "Ninguno",

    run: async (client, message, args) => {
      

const sqlite3 = require("better-sqlite3");
const db = new sqlite3('./sadbot.sqlite3');
const Weez = require('weez');
const Discord = require("discord.js")
const weez = new Weez.WeezAPI((process.env.API));

let usuario = message.mentions.members.first();
if(!usuario) usuario = message.author;
if(usuario == message.mentions.members.first()) usuario = usuario.user;

let img = await weez.basura(usuario.displayAvatarURL({format: "png"}));

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
  name: "basura.png"
}])
.setImage("attachment://basura.png")

await message.channel.send(embed);
  }
};