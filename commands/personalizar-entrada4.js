module.exports = {
    ayuda: `Personalizas el texto de la entrada4. ({usuario} Para el usuario y {servidor} Para el nombre del servidor)`,
    ejemplo: "personalizar-entrada4 Bienvenido {usuario}",
    permiso : "ADMINISTRATOR",

    run: async (client, message, args) => {
  const Discord = require("discord.js");
  const sqlite3 = require("better-sqlite3");
  const db = new sqlite3('./sadbot.sqlite3');

  const embednoper = new Discord.MessageEmbed() 
  embednoper.setColor("RED")
  embednoper.setDescription("🚫 || No tienes el permiso ``ADMINISTRATOR`` para utilizar este comando.")    
  
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(embednoper);
  
  let texto = args.join(" "); 

  const embednotexto = new Discord.MessageEmbed() 
  embednotexto.setColor("ORANGE")
  embednotexto.setDescription("⚠️ || Introduzca el texto para la entrada.")

  if (!texto) return message.channel.send(embednotexto);

  let dbselect = db.prepare(`SELECT entrada4_texto FROM personalizar_comandos WHERE idserver = ${message.guild.id}`).get();

  if(!dbselect){
    db.prepare(`INSERT INTO personalizar_comandos(idserver, entrada4_texto) VALUES(${message.guild.id}, '${texto}')`).run();
  }else{
    db.prepare(`UPDATE personalizar_comandos SET entrada4_texto = '${texto}' WHERE idserver = ${message.guild.id}`).run();
  };
//  (" TEXT, salida3_descripcion TEXT, salida3_fondo TEXT, entrada4_texto TEXT, salida4_texto TEXT)").run();

const embed1 = new Discord.MessageEmbed() 
embed1.setColor("GREEN")
embed1.setDescription(`<:tick:613820461675053066> || Se ha modificado la entrada 4.`)
return message.channel.send(embed1);


}};