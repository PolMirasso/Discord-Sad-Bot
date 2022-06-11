  module.exports = {
    ayuda: `Activa o desactiva la economía en el servidor.`,
    ejemplo: "economia on",
    permiso : "ADMINISTRATOR",
    run: async (client, message, args) => {
      
      const Discord = require("discord.js");
  const megadb = require("megadb");

  const sqlite3 = require("better-sqlite3");
  const db = new sqlite3('./sadbot.sqlite3');

  const embednoper = new Discord.MessageEmbed() 
  embednoper.setColor("RED")
  embednoper.setDescription("🚫 || No tienes el permiso ``ADMINISTRATOR`` para utilizar este comando.")      


  if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(embednoper);  
  let estado = args.join(" ");

  const embednoestado = new Discord.MessageEmbed() 
  embednoestado.setColor("ORANGE")
  embednoestado.setDescription(`⚠️ || Introduzca economia on para activar la economia o economia off para desactivar la economia del servidor.`)

  if(!estado) return message.channel.send(embednoestado);
  if (estado == "on") var modo = 1;
  if (estado == "off") var modo = 2;
  if(!modo) return message.channel.send(embednoestado);

let filas = db.prepare(`SELECT economia FROM activar_desactivar WHERE idserver = ${message.guild.id}`).get();

const embed0 = new Discord.MessageEmbed() 
embed0.setColor("GREEN")
embed0.setDescription(`<:tick:613820461675053066> || Se ha activado la economia del servidor.`)

const embed1 = new Discord.MessageEmbed() 
embed1.setColor("GREEN")
embed1.setDescription(`<:tick:613820461675053066> || Se ha desactivado la economia del servidor.`)

 if(modo == 2) modo = 0;
  if(filas){
    db.prepare(`UPDATE activar_desactivar SET economia = ${modo} WHERE idserver = ${message.guild.id}`).run()
      if(modo == 1) {
        message.channel.send(embed0);
      }else{
        message.channel.send(embed1);
      };
  };

  if(!filas){
    console.log("2")
    db.prepare(`INSERT INTO activar_desactivar(idserver, economia) VALUES(${message.guild.id}, ${modo})`).run();

      if(modo == 1) {
        message.channel.send(embed0);
      }else{
        message.channel.send(embed1);
      };
  };

}};