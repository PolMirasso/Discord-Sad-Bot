module.exports = {
    ayuda: `Te enseña la desicion que tomarias.`,
    ejemplo: "coche @User#000",
    permiso : "Ninguno",
    run: async (client, message, args) => {
  
const sqlite3 = require("better-sqlite3");
const db = new sqlite3('./sadbot.sqlite3');
const Weez = require('weez');
const Discord = require("discord.js")
const weez = new Weez.WeezAPI((process.env.API));

let usuario = message.mentions.members.first();

const embednomen = new Discord.MessageEmbed() 
embednomen.setColor("ORANGE")
embednomen.setDescription("⚠️ || Tienes que mencionar a un usuario.")

if(!usuario) return message.channel.send(embednomen);
usuario = usuario.user;

let img = await weez.coche(message.author.displayAvatarURL({format: "png"}),usuario.displayAvatarURL({format: "png"}));

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
  name: "coche.png"
}])
.setImage("attachment://coche.png")

await message.channel.send(embed);
  }
};