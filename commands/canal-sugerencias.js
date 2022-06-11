module.exports = {
    ayuda: `Selecionas el canal de sugerencias.`,
    ejemplo: "canal-sugerencias #general",
    uso : "canal-sugerencias (Canal)",
    permiso : "ADMINISTRATOR",

    run: async (client, message, args) => {

    const Discord = require("discord.js")
   const sqlite3 = require("better-sqlite3");
   const db = new sqlite3('./sadbot.sqlite3');
   
   const embednoper = new Discord.MessageEmbed() 
   embednoper.setColor("RED")
   embednoper.setDescription("🚫 || No tienes el permiso de ``ADMINISTRATOR`` para utilizar este comando.")
 
   if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(embednoper);  
   let canal = message.mentions.channels.first();
 
   const embednocanal = new Discord.MessageEmbed() 
   embednocanal.setColor("ORANGE")
   embednocanal.setDescription("⚠️ || Tienes que mencionar el canal donde quieres que se envien las sugerencias.")
 
   if(!canal) return message.channel.send(embednocanal);
 
   const embed = new Discord.MessageEmbed() 
   embed.setColor("GREEN")
   embed.setDescription(`<:tick:613820461675053066> || El canal de sugerencias acaba de ser establecido ${canal}.`)
      
   let filas = db.prepare(`SELECT * FROM personalizar_comandos WHERE idserver = ${message.guild.id}`).get();
   if(filas){
     db.prepare(`UPDATE personalizar_comandos SET canalsugerencias = '${canal.id}' WHERE idserver = ${message.guild.id}`).run();
       message.channel.send(embed);
 
   };
 
   if(!filas){
     db.prepare(`INSERT INTO personalizar_comandos(idserver, canalsugerencias) VALUES(${message.guild.id}, '${canal.id}')`).run();
       message.channel.send(embed);
   };
  }
};