module.exports = {
    ayuda: `Canvia el prefix del bot en el servidor.`,
    ejemplo: "prefix !",
    permiso : "ADMINISTRATOR",

    run: async (client, message, args) => {
const Discord = require("discord.js");
const sqlite3 = require("better-sqlite3");
const db = new sqlite3('./sadbot.sqlite3');

  const embednoper = new Discord.MessageEmbed() 
  embednoper.setColor("RED")
  embednoper.setDescription("🚫 || No tienes el permiso ``ADMINISTRATOR`` para utilizar este comando.")    
  
if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(embednoper);

const embednotexto = new Discord.MessageEmbed() 
embednotexto.setColor("ORANGE")
embednotexto.setDescription("⚠️ || Necesitas colocar el prefix del servidor.")

if(!args[0]) return message.channel.send(embednotexto);
  

var selectprefix = db.prepare(`SELECT prefix FROM personalizar_comandos WHERE idserver = ${message.guild.id}`).get();



if(!selectprefix){
  db.prepare(`INSERT INTO personalizar_comandos(idserver, prefix) VALUES(${message.guild.id}, '${args[0]}')`).run();
};

if(selectprefix || selectprefix == null){
  db.prepare(`UPDATE personalizar_comandos SET prefix = '${args[0]}' WHERE idserver = ${message.guild.id}`).run();
};


const embed1 = new Discord.MessageEmbed() 
embed1.setColor("GREEN")
embed1.setDescription(`<:tick:613820461675053066> || Se ha establecido el prefix ${args[0]}.`)
return message.channel.send(embed1);
      
}};