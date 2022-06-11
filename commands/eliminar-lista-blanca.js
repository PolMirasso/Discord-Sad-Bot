module.exports = {
    ayuda: `Elimina canales de la lista blanca.`,
    ejemplo: "eliminar-lista-blanca #general",
    permiso : "ADMINISTRATOR",

    run: async (client, message, args) => {
      
const Discord = require("discord.js");  
const sqlite3 = require("better-sqlite3");
const db = new sqlite3('./sadbot.sqlite3');

const embednoper = new Discord.MessageEmbed() 
embednoper.setColor("RED")
embednoper.setDescription("🚫 || No tienes el permiso ``ADMINISTRATOR`` para utilizar este comando.")


    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(embednoper);  

   let canal = message.mentions.channels.first();

   const embednocanal = new Discord.MessageEmbed() 
   embednocanal.setColor("ORANGE")
   embednocanal.setDescription("⚠️ || Menciona el canal donde quieres que se envíen los mensajes.") 

   if(!canal) return message.channel.send(embednocanal);

let listacanal = db.prepare(`SELECT * FROM lista_blanca_automod WHERE idserver = ${message.guild.id} AND canal = ${canal.id}`).get();

const embednolistablanca = new Discord.MessageEmbed() 
embednolistablanca.setColor("ORANGE")
embednolistablanca.setDescription(`⚠️ || El canal ${canal} no esta en la lista blanca.`) 

if(!listacanal) return message.channel.send(embednolistablanca);  

db.prepare(`DELETE FROM lista_blanca_automod WHERE idserver = ${message.guild.id} AND canal = ${canal.id}`).run();

const embed = new Discord.MessageEmbed() 
embed.setColor("GREEN")
embed.setDescription(`<:tick:613820461675053066> || Se ha eliminado el canal ${canal} de la lista blanca.`) 

      message.channel.send(embed);
    
}};