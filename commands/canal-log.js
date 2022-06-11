module.exports = {
    ayuda: `Elijes un canal donde te dice todo lo que passa en el servidor.`,
    ejemplo: "log #general",
    permiso : "ADMINISTRATOR",

    run: async (client, message, args) => {
const Discord = require("discord.js")
const megadb = require("megadb");
  const log = new megadb.crearDB("log")

  const sqlite3 = require("better-sqlite3");
  const db = new sqlite3('./sadbot.sqlite3');


  const embednoper = new Discord.MessageEmbed() 
  embednoper.setColor("RED")
  embednoper.setDescription("🚫 || No tienes el permiso ``ADMINISTRATOR`` para utilizar este comando.")      
  
  if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(embednoper);  
  
  let canal = message.mentions.channels.first();
  
  const embednocanal = new Discord.MessageEmbed() 
  embednocanal.setColor("ORANGE")
  embednocanal.setDescription(`⚠️ ||  Introduzca el canal donde quieres que se envien los logs.`)
  
  
  if(canal) var modo = 1;
  let modooff = args[0];
  if(!modooff) modooff = "A"
  if(!canal && modooff.toLowerCase() == "off") {
    var modo = 0;
    canal = 3;
  };
  
  if(!modo) modo = 0;
  
  if(!canal) return message.channel.send(embednocanal);
  
  let filas = db.prepare(`SELECT log FROM activar_desactivar WHERE idserver = ${message.guild.id}`).get();
  let filasdb = db.prepare(`SELECT log_canal FROM personalizar_comandos WHERE idserver = ${message.guild.id}`).get();
  
  const embed0 = new Discord.MessageEmbed() 
  embed0.setColor("GREEN")
  embed0.setDescription(`<:tick:613820461675053066> || Se ha establecido el canal de logs en ${canal}`)
  
  const embed1 = new Discord.MessageEmbed() 
  embed1.setColor("GREEN")
  embed1.setDescription(`<:tick:613820461675053066> || Se han desactivado los logs del servidor.`)
  
  if(filas){
    db.prepare(`UPDATE activar_desactivar SET log = ${modo} WHERE idserver = ${message.guild.id}`).run();
  };
  
  if(!filas){
    db.prepare(`INSERT INTO activar_desactivar(idserver, log) VALUES(${message.guild.id}, ${modo})`).run();
  };
  
  if(filasdb){
    if(canal !== 3){
      db.prepare(`UPDATE personalizar_comandos SET log_canal = ${canal.id} WHERE idserver = ${message.guild.id}`).run();
    };
  };
  
  if(!filasdb){
    if(canal !== 3){
      db.prepare(`INSERT INTO personalizar_comandos(idserver, log_canal) VALUES(${message.guild.id}, ${canal.id})`).run();
    };
  };
  
  if(canal == 3) {
    message.channel.send(embed1);
  }else{
    message.channel.send(embed0);
  };
  
}}; 