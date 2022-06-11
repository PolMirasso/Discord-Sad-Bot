module.exports = {
    ayuda: `Ves todos los emojis del servidor.`,
    ejemplo: "emoji",
    permiso : "Ninguno",
    run: async (client, message, args) => {
      
  const Discord = require("discord.js");
  const sqlite3 = require("better-sqlite3");
  const db = new sqlite3('./sadbot.sqlite3');

 var emojiList = message.guild.emojis.cache.map(r => `${r} ID: ${r.id}`).join('\n');

 const embednoemoji = new Discord.MessageEmbed() 
 embednoemoji.setColor("ORANGE")
 embednoemoji.setDescription(`⚠️ || Este server no tiene emojis.`) 

 const embed1024 = new Discord.MessageEmbed() 
 embed1024.setColor("ORANGE")
 embed1024.setDescription(`⚠️ || El servidor tiene demasiados emojis para que los pueda mostrar.`) 

  if (!emojiList) return message.channel.send(embednoemoji);
  if (emojiList.length >= 1024) return message.channel.send(embed1024);
  
  var color = db.prepare(`SELECT * FROM personalizar_comandos WHERE idserver = ${message.guild.id}`).get();
  if(!color || color.colorembed == null) {
    var cembed = "#7289D9";
  }else{
    var cembed = color.colorembed;
  };
        let embed = new Discord.MessageEmbed()
        .setTitle("Lista de emojis")
        .setColor(cembed)
        .setDescription("\n"+emojiList)
        message.channel.send(embed);
}};