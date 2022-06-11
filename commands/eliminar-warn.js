module.exports = {
    ayuda: `elimina un warn de un usuario.`,
    ejemplo: "eliminar-warn @User#0001",
    permiso : "ADMINISTRATOR",

    run: async (client, message, args) => {
      
   const sqlite3 = require("better-sqlite3");
   const db = new sqlite3('./sadbot.sqlite3');

  const Discord = require("discord.js");

  const embednoper = new Discord.MessageEmbed() 
  embednoper.setColor("RED")
  embednoper.setDescription("🚫 || No tienes el permiso ``BAN_MEMBERS`` para utilizar este comando.")
  
  if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(embednoper);  
  let usuario = message.mentions.members.first();

  const embednousuario = new Discord.MessageEmbed() 
  embednousuario.setColor("ORANGE")
  embednousuario.setDescription(`⚠️ || Menciona al usuario al que quieras eliminar el warn.`) 

  if(!usuario) return message.channel.send(embednousuario);

  let warnn = args.slice(1).join(' ');

  const embednowarn = new Discord.MessageEmbed() 
  embednowarn.setColor("ORANGE")
  embednowarn.setDescription(`⚠️ || Indique el numero del warn.`) 

  if(!warnn) return message.channel.send(embednowarn);
  let warnna = warnn - 1;

  let warnsd = db.prepare(`SELECT * FROM warns WHERE idserver = ${message.guild.id} AND idusuario = ${message.author.id}`).all();

  if(warnsd[warnna]){

  db.prepare(`DELETE FROM warns WHERE idserver = ${message.guild.id} AND idusuario = ${message.author.id} AND motivo = '${warnsd[warnna].motivo}' AND dia = ${warnsd[warnna].dia} AND mod = '${warnsd[warnna].mod}'`).run();
 
  const embed = new Discord.MessageEmbed() 
  embed.setColor("GREEN")
  embed.setDescription(`<:tick:613820461675053066> || Se ha eliminado el warn numero ${warnna} de ${usuario.username}.`) 
  return message.channel.send(embed);
  }else{
    const embednorol = new Discord.MessageEmbed() 
    embednorol.setColor("ORANGE")
    embednorol.setDescription(`⚠️ || No se ha encontrado el warn numero ${warnna + 1}`) 
  
    return message.channel.send(embednorol);  
  };
}};