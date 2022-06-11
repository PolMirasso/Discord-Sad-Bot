module.exports = {
    ayuda: `Cambias el color de todos los embeds del bot.`,
    ejemplo: "color-embed Rojo",
    permiso : "MANAGE_MESSAGES",
    run: async (client, message, args) => {
      
  const Discord = require("discord.js");  
  const translator = require("yandex-translate-api")("trnsl.1.1.20191221T215459Z.585b18923fbb28e6.e4715c55166c0a33a5a53173619370517dfbb082");
  const sqlite3 = require("better-sqlite3");
  const db = new sqlite3('./sadbot.sqlite3');

  const embednoper = new Discord.MessageEmbed() 
  embednoper.setColor("RED")
  embednoper.setDescription("🚫 || No tienes el permiso de ``MANAGE_MESSAGES`` para utilizar este comando.");

  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(embednoper);  

  const embednc = new Discord.MessageEmbed() 
  embednc.setColor("ORANGE")
  embednc.setDescription("⚠️ || Introduzca el nombre del color o el color en hexadecimal.")  

  let color = args[0].toUpperCase();
  if(!color) return message.channel.send(embednc);

  translator.translate(color, { from: "es", to: "en"},async function(err, res) { 
  console.log(res.text[0]);

  const embed = new Discord.MessageEmbed() 
    embed.setColor(res.text[0])
    embed.setDescription("Asi quedara el color de su embed.")

    let filas = db.prepare(`SELECT colorembed FROM personalizar_comandos WHERE idserver = ${message.guild.id}`).get();
    if(filas){
      db.prepare(`UPDATE personalizar_comandos SET colorembed = '${res.text[0]}' WHERE idserver = ${message.guild.id}`).run();
       return message.channel.send(embed);
    };
  
    if(!filas){
      db.prepare(`INSERT INTO personalizar_comandos(idserver, colorembed) VALUES(${message.guild.id}, '${res.text[0]}')`).run();
       return message.channel.send(embed);
    };
  });
  }
};