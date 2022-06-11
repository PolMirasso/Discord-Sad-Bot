module.exports = {
    ayuda: `Te dice informacion del servidor.`,
    ejemplo: "server-info",
    permiso : "Ninguno",

    run: async (client, message, args) => {
  const Discord = require("discord.js");
  const moment = require("moment");

var server = message.guild;

var hu = server.members.cache.filter(member => !member.user.bot).size
var bt = server.members.cache.filter(member => member.user.bot === true).size

var h1 = server.memberCount
let online = message.guild.members.cache.filter(member => member.user.presence.status === 'online');
let offline = message.guild.members.cache.filter(member => member.user.presence.status === 'offline');
let dnd = message.guild.members.cache.filter(member => member.user.presence.status === 'dnd');
let idle = message.guild.members.cache.filter(member => member.user.presence.status === 'idle');
let stream = message.guild.members.cache.filter(member => member.presence.game && member.presence.game.streaming).size
let rolesmap = message.guild.roles.cache.map(r => "<@&" + r.id + ">").join("|");

let emojis = message.guild.emojis.cache.map(e => "<:" + e.name + ":" + e.id + ">").join("|");  
if (!rolesmap) rolesmap = "Este servidor no tiene roles";
if (!emojis) emojis = "Este server no tiene emojis.";
if (rolesmap.length >= 1024) rolesmap = "Demasiados roles para poderlos mostrar";
if (emojis.length >= 1024) emojis = "Demasiados emojis para poderlos mostrar";
  

  const sqlite3 = require("better-sqlite3");
  const db = new sqlite3('./sadbot.sqlite3');

  var color = db.prepare(`SELECT * FROM personalizar_comandos WHERE idserver = ${message.guild.id}`).get();
  if(!color || color.colorembed == null) {
    var cembed = "#7289D9";
   }else{
    var cembed = color.colorembed;
   };

//   let canalesvoz = message.guild.channels.cache.filter(c => c.type == "VoiceChannel")  
   let canalesvoz = server.channels.cache.filter((c) => c.type === "voice").size
   let canalestexto = server.channels.cache.filter((c) => c.type === "text").size
   let canalescategoria = server.channels.cache.filter((c) => c.type === "category").size

let region = server.region
if (region === "brazil") region = "``Brasil`` 🇧🇷"
if (region === "eu-central") region = "``Europa Central`` 🇪🇺"
if (region === "hongkong") region = "``Hong Kong`` 🇭🇰"
if (region === "japan") region = "``Japón`` 🇯🇵"
if (region === "russia") region = "``Rusia`` 🇷🇺"
if (region === "singapore") region = "``Singapur`` 🇸🇬"
if (region === "southafrica") region = "``Sudáfrica`` 🇿🇦"
if (region === "sydney") region = "``Sydney`` 🇦🇺"
if (region === "us-central") region = "``Estados Unidos-Central`` 🇺🇸"
if (region === "us-east") region = "``Estados Unidos-Este`` 🇺🇸"
if (region === "us-south") region = "``Estados Unidos-Sur`` 🇺🇸"
if (region === "us-west") region = "``Estados Unidos Oeste`` 🇺🇸"
if (region === "eu-west") region = "``Europa Occidental`` 🇪🇺" 

      let serverembed = new Discord.MessageEmbed()
      .setAuthor(`Información del servidor ${message.guild.name}`)
      .setColor(cembed)
      .addField(`**Información global   **`,"Nombre del servidor ``"+message.guild.name+"`` \n ID ``"+message.guild.id+"`` \n Fecha de creación ``"+moment(message.guild.joinedAt).format("DD/MM/YYYY, HH:mm")+"`` \n Región "+region+" \n Icono del servidor [Click aqui]("+server.iconURL()+")")
      .addField(`**Información del Owner**`,"Nombre ``"+server.owner.user.tag+"`` \n ID ``"+server.owner.user.id+"``")
      .addField("**Canales**","Canales Total ``"+server.channels.cache.size+"`` \n Canales de Voz ``"+canalesvoz+"`` \n Canales de Texto ``"+canalestexto+"`` \n Categorias ``"+canalescategoria+"``" )
      .addField(`**Miembros**`,"Usuarios totales ``"+h1+"`` \n Humanos ``"+hu+"`` \n Bots ``"+bt+"``")
      .addField("Roles", "Cantidad de roles ``"+server.roles.cache.size+"`` \n Lista de roles ``"+rolesmap+"`` ")
  //.addField(`➤Roles: ${server.roles.size}`, roles)
  .addField('Status', "<:Online:556566486987309066> "+online.size  + " <:Ausente:556566487712661529> " + idle.size + " <:Ocupado:556566486932520960> "+ dnd.size +"<:Stream:556566487020732416>"+stream+" <:Offline:556566487687626767> "+ offline.size)
 // .setFooter(client.user.username, client.user.avatarURL)
    return message.channel.send(serverembed);

}};
