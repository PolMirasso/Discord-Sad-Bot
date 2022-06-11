module.exports = {
    ayuda: `Menciona al usuario que deseas "pegar".`,
    ejemplo: "pegar @User#0001",
    permiso : "Ninguno",

    run: async (client, message, args) => {
  const Discord = require("discord.js")
  const x = require('nekos.life');
  const sqlite3 = require("better-sqlite3");
const db = new sqlite3('./sadbot.sqlite3');
 
  var color = db.prepare(`SELECT * FROM personalizar_comandos WHERE idserver = ${message.guild.id}`).get();
if(!color || color.colorembed == null) {
  var cembed = "#7289D9";
}else{
  var cembed = color.colorembed;
};

const embednouser = new Discord.MessageEmbed() 
embednouser.setColor("ORANGE")
embednouser.setDescription("⚠️ || Tienes que mencionar a un usuario.")

      
  const neko = new x();
 let user = message.mentions.users.first();
if(!user) return message.channel.send(embednouser);
 let link = await neko.sfw.slap().then(links => {
  const embed = new Discord.MessageEmbed()
   .setColor(cembed)
   .setDescription(`**${message.author.username}** pego a **${user.username}** `)
   .setImage(links.url)
message.channel.send(embed)
})
  }
}