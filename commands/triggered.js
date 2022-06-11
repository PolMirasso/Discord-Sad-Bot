module.exports = {
    ayuda: `Muestra tu avatar en versión triggered.`,
    ejemplo: "triggered @User#0001",
    permiso : "Ninguno",

    run: async (client, message, args) => {
  const Discord = require("discord.js")
  const Weez = require('weez')
  const weez = new Weez.WeezAPI((process.env.API));
  const sqlite3 = require("better-sqlite3");
const db = new sqlite3('./sadbot.sqlite3');

let usuario = message.mentions.members.first();
if(!usuario) usuario = message.guild.members.cache.get(message.author.id);

let img = await weez.triggered(usuario.user.displayAvatarURL({ format: "png"}));

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
  name: "triggered.gif"
}])
.setImage("attachment://triggered.gif")

return message.channel.send(embed);
}};