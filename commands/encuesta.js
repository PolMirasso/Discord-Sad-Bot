module.exports = {
    ayuda: `Creas una encuesta para votar cosas.`,
    ejemplo: "encuesta Pongo un canal de sugerencias, Si,No",
    permiso : "ADMINISTRATOR",
    run: async (client, message, args) => {
      
const Discord = require("discord.js");
const sqlite3 = require("better-sqlite3");
const db = new sqlite3('./sadbot.sqlite3');


const embednoper = new Discord.MessageEmbed() 
embednoper.setColor("RED")
embednoper.setDescription("🚫 || No tienes el permiso ``ADMINISTRATOR`` para utilizar este comando.")

if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(embednoper);  
let splitmsg = args.join(" ").split(",");
let texto1 = splitmsg[0];
let texto2 = splitmsg[1];  
let texto3 = splitmsg[2];  

const embednotexto = new Discord.MessageEmbed() 
embednotexto.setColor("ORANGE")
embednotexto.setDescription(`⚠️ || Introduzca la pregunta.`) 

const embednotexto1 = new Discord.MessageEmbed() 
embednotexto1.setColor("ORANGE")
embednotexto1.setDescription(`⚠️ || Introduzca la primera opcion.`) 

const embednotexto2 = new Discord.MessageEmbed() 
embednotexto2.setColor("ORANGE")
embednotexto2.setDescription(`⚠️ || Introduzca la segunda opcion.`) 

if(!texto1) return message.channel.send(embednotexto);
if(!texto2) return message.channel.send(embednotexto1);
if(!texto3) return message.channel.send(embednotexto2);

var color = db.prepare(`SELECT * FROM personalizar_comandos WHERE idserver = ${message.guild.id}`).get();
if(!color || color.colorembed == null) {
  var cembed = "#7289D9";
}else{
  var cembed = color.colorembed;
};

  const embed = new Discord.MessageEmbed()
  .setAuthor(texto1)
  .addField('Opcion 1', '🔶'+ texto2+'')
  .addField('Opcion 2', '🔷'+ texto3+'')
  .setColor(cembed)
  .setTimestamp()
message.channel.send(embed).then(async m => {
           await m.react("🔶");
           await m.react("🔷");  

});
}};
