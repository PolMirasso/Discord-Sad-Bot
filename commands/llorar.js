module.exports = {
    ayuda: `Empiezas a llorar.`,
    ejemplo: "llorar",
    permiso : "Ninguno",

    run: async (client, message, args) => {
  const Discord = require("discord.js");
  const marsnpm = require("marsnpm");
  const sqlite3 = require("better-sqlite3");
  const db = new sqlite3('./sadbot.sqlite3');

let url = await marsnpm.cry()

var color = db.prepare(`SELECT * FROM personalizar_comandos WHERE idserver = ${message.guild.id}`).get();
if(!color || color.colorembed == null) {
  var cembed = "#7289D9";
}else{
  var cembed = color.colorembed;
};

let embed = new Discord.MessageEmbed() 
.setColor(cembed)
.setAuthor(`${message.author.username} esta llorando... `)
.setImage(url);
message.channel.send(embed);
}};
