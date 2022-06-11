const Discord = require("discord.js");
const megadb = require("megadb");
let listablanca = new megadb.crearDB("listablanca")
const sqlite3 = require("better-sqlite3");
const db = new sqlite3('./sadbot.sqlite3');

module.exports = {
    ayuda: `Pones un canal al que no afecta la automod.`,
    ejemplo: "lista-blanca #general",
    permiso : "ADMINISTRATOR",

    
    run: async (client, message, args) => {
      
      const embednoper = new Discord.MessageEmbed() 
      embednoper.setColor("RED")
      embednoper.setDescription("🚫 || No tienes el permiso ``ADMINISTRATOR`` para utilizar este comando.")    

      const embednocanal = new Discord.MessageEmbed() 
      embednocanal.setColor("ORANGE")
      embednocanal.setDescription("⚠️ || Menciona el canal donde quieres que el spam/flood no sea detectado.")
    
      const embedlistacanal = new Discord.MessageEmbed() 
      embedlistacanal.setColor("ORANGE")
      embedlistacanal.setDescription("⚠️ || Ese canal ya esta en la lista blanca.")
    

  if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(embednoper);  
  let canal = message.mentions.channels.first();
  if(!canal) return message.channel.send(embednocanal);

  let listacanal = db.prepare(`SELECT * FROM lista_blanca_automod WHERE idserver = ${message.guild.id} AND canal = ${canal.id}`).get();

  if(listacanal) return message.channel.send(embedlistacanal);

  if(!listacanal){ 
  db.prepare(`INSERT INTO lista_blanca_automod(idserver, canal) VALUES(${message.guild.id}, ${canal.id})`).run();
  const embedlisblanca = new Discord.MessageEmbed() 
  embedlisblanca.setColor("GREEN")
  embedlisblanca.setDescription(`<:tick:613820461675053066> || Se ha añadido el canal ${canal} a la lista blanca.`)

  message.channel.send(embedlisblanca);
  };
}};