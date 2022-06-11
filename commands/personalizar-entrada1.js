module.exports = {
    ayuda: `Personalizas completamente la entrada 3. ({usuario} Para el usuario y {servidor} Para el nombre del servidor)`,
    ejemplo: "personalizar-entrada3 BIENVENIDO - BIENVENIDA ,{usuario},blanco,https://i.imgur.com/Hz5xag2.jpg",
    permiso : "ADMINISTRATOR",

    run: async (client, message, args) => {
  const Discord = require("discord.js");
  const sqlite3 = require("better-sqlite3");
  const db = new sqlite3('./sadbot.sqlite3');

  const embednoper = new Discord.MessageEmbed() 
  embednoper.setColor("RED")
  embednoper.setDescription("🚫 || No tienes el permiso ``ADMINISTRATOR`` para utilizar este comando.")    
  
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(embednoper);

    const embednodesc = new Discord.MessageEmbed() 
    embednodesc.setColor("ORANGE")
    embednodesc.setDescription("⚠️ || Introduzca el mensaje de entrada.")

    let texto = args.join(" ");
    if (!texto) return message.channel.send(embednodesc);

    let dbselect = db.prepare(`SELECT texto_entrada1 FROM personalizar_comandos WHERE idserver = ${message.guild.id}`).get();

    if(!dbselect){
      db.prepare(`INSERT INTO personalizar_comandos(idserver, texto_entrada1) VALUES(${message.guild.id}, '${texto}')`).run();
    }else{
      db.prepare(`UPDATE personalizar_comandos SET texto_entrada1 = '${texto}' WHERE idserver = ${message.guild.id}`).run();
    };

    const embed1 = new Discord.MessageEmbed() 
    embed1.setColor("GREEN")
    embed1.setDescription(`<:tick:613820461675053066> || Se ha modificado el mensaje de la entrada1.`)
   return message.channel.send(embed1);

}};