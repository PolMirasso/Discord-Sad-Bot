module.exports = {
    ayuda: "Activa o desactiva el auto-mod.",
    ejemplo: "auto-mod on",
    uso : "auto-mod on / auto-mod off",
    permiso : "Administrador",

    run: async (client, message, args) => {
      
      
  const Discord = require("discord.js");
  const sqlite3 = require("better-sqlite3");
  const db = new sqlite3('./sadbot.sqlite3');
  
  const embednoper = new Discord.MessageEmbed() 
  embednoper.setColor("RED")
  embednoper.setDescription("🚫 || No tienes el permiso de ``ADMINISTRATOR`` para utilizar este comando.")

  const embednoestado = new Discord.MessageEmbed() 
  embednoestado.setColor("ORANGE")
  embednoestado.setDescription("⚠️ || Introduzca ``auto-mod on`` para activar la automoderación o ``auto-mod off`` para desactivarlo.")

  if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(embednoper);
  let estado = args.join(" ");
  if(!estado) return message.channel.send(embednoestado);
  if (estado == "on") var modo = 1;
  if (estado == "off") var modo = 2;
  if(!modo) return message.channel.send(embednoestado);

  let filas = db.prepare(`SELECT automod FROM activar_desactivar WHERE idserver = ${message.guild.id}`).get();
console.log(filas)
  const embedon = new Discord.MessageEmbed() 
  embedon.setColor("GREEN")
  embedon.setDescription(`<:tick:613820461675053066> || La automoderación ha sido activada.`)

  const embedoff = new Discord.MessageEmbed() 
  embedoff.setColor("GREEN")
  embedoff.setDescription(`<:tick:613820461675053066> || La automoderación ha sido desactivada.`)

 if(modo == 2) modo = 0;

  if(!filas){
    db.prepare(`INSERT INTO activar_desactivar(idserver, automod) VALUES(${message.guild.id}, ${modo})`).run();

      if(modo == 1) {
        return message.channel.send(embedon);
      }else{
        return message.channel.send(embedoff);
      };

  };

  if(filas.automod == null || filas.automod == 1 || filas.automod == 0){
    db.prepare(`UPDATE activar_desactivar SET automod = ${modo} WHERE idserver = ${message.guild.id}`).run();

      if(modo == 1) {
        return message.channel.send(embedon);
      }else{
        return message.channel.send(embedoff);
      };

  };

}};