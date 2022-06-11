module.exports = {
    ayuda: `Pones un aviso al usuario mencionado.`,
    ejemplo: "warn @User#0001",
    permiso : "ADMINISTRATOR",

    run: async (client, message, args) => {
  const Discord = require("discord.js");


  const embednoper = new Discord.MessageEmbed() 
  embednoper.setColor("RED")
  embednoper.setDescription("🚫 || No tienes el permiso ``BAN_MEMBERS`` para utilizar este comando.")      
  

if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(embednoper);  
  
const sqlite3 = require("better-sqlite3");
const db = new sqlite3('./sadbot.sqlite3');

const embednouser = new Discord.MessageEmbed() 
embednouser.setColor("ORANGE")
embednouser.setDescription("⚠️ || Menciona al usuario al que quieras agregar warn.")

let usuario = message.mentions.members.first();
if(!usuario) usuario = message.guild.members.cache.get(args[0]);
if(!usuario) return message.channel.send(embednouser);

let admin = message.author.username

let motivo = args.slice(1).join(' ');

const embednomotivo = new Discord.MessageEmbed() 
embednomotivo.setColor("ORANGE")
embednomotivo.setDescription("⚠️ || Indique el motivo del warn.")


if(!motivo) message.channel.send(embednomotivo);

db.prepare(`INSERT INTO warns(idserver, idusuario, motivo, dia, mod) VALUES(${message.guild.id},${message.author.id}, '${motivo}', ${Date.now()}, '${admin}')`).run();    

let warnslen = db.prepare(`SELECT * FROM warns WHERE idserver = ${message.guild.id} AND idusuario = ${message.author.id}`).all();

  const embed = new Discord.MessageEmbed()
  .setTitle('Sanciones')
  .setColor("#7289D9")
  .addField("Usuario Avisado:",usuario.user.username)
  .addField("ID:", usuario.id)
  .addField("Motivo:", motivo)
  .addField("Miembro del Staff:", admin)
  .addField("Numero de warn", warnslen.length + 1)
  .addField("Información:" , `Has sido avisado en ${message.guild.name}`)
  usuario.send(embed)
return message.channel.send(embed)
  
  }
};
