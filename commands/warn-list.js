module.exports = {
    ayuda: `Te muestra todos los avisos que tiene el usuario mencionado.`,
    ejemplo: "warn-list @User#0001",
    permiso : "ADMINISTRATOR",

    run: async (client, message, args) => {
  const Discord = require("discord.js");
  const prettyMilliseconds = require('pretty-ms');
  const sqlite3 = require("better-sqlite3");
const db = new sqlite3('./sadbot.sqlite3');
    
if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("No tienes los permisos necesarios.");  
  
let usuario = message.mentions.members.first();
if(!usuario) usuario = message.guild.members.cache.get(args[0])
if(!usuario) usuario = message.author;

const embednouser = new Discord.MessageEmbed() 
embednouser.setColor("ORANGE")
embednouser.setDescription("⚠️ || Menciona al usuario al que quieras ver los warns.")

if(!usuario) return message.channel.send(embednouser);

let lista_warns = [];
let warnsd = db.prepare(`SELECT * FROM warns WHERE idserver = ${message.guild.id} AND idusuario = ${usuario.id}`).all();
let index = 1;

for(var key in warnsd) {
  lista_warns.push(`${index++} Razon: ${warnsd[key].motivo} **|** Admin: ${warnsd[key].mod}. **|** Hace ${prettyMilliseconds(Date.now()-warnsd[key].dia)}`);
}; 

lista_warns.sort();
  
var color = db.prepare(`SELECT * FROM personalizar_comandos WHERE idserver = ${message.guild.id}`).get();
if(!color || color.colorembed == null) {
var cembed = "#7289D9";
}else{
var cembed = color.colorembed;
};

let embed = new Discord.MessageEmbed() 
  .setTitle(`Warns de ${usuario.user.username}`)
  .setColor(cembed)
  .setDescription(`${lista_warns.join(`\n \n`)}`)
return message.channel.send(embed); 
}};