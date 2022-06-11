module.exports = {
    ayuda: `Te asusta el usuario.`,
    ejemplo: "susto @User#0001",
    permiso : "Ninguno",

    run: async (client, message, args) => {
  const Discord = require("discord.js");
  const Weez = require('weez')
  const weez = new Weez.WeezAPI((process.env.API));
  
  const sqlite3 = require("better-sqlite3");
  const db = new sqlite3('./sadbot.sqlite3');

let usuario = message.mentions.members.first();
if(!usuario) usuario = message.author;
if(usuario == message.mentions.members.first()) usuario = usuario.user;

let img = await weez.susto(usuario.displayAvatarURL({format: "png"}));

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
  name: "susto.png"
}])
.setImage("attachment://susto.png")

await message.channel.send(embed);
  }
};