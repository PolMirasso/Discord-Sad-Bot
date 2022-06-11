module.exports = {
    ayuda: "Muestra informacion del bot.",
    ejemplo: "bot-info",
    permiso : "Ninguno",

    run: async (client, message, args) => {
    const Discord = require("discord.js");
    const sqlite3 = require("better-sqlite3");
    const db = new sqlite3('./sadbot.sqlite3');      
      
  var selectprefix = db.prepare(`SELECT prefix FROM personalizar_comandos WHERE idserver = ${message.guild.id}`).get();
  
  if (!selectprefix|| !selectprefix.prefix || selectprefix.prefix == null || selectprefix.prefix == undefined) {
    var prefix = "??";
  }else{
   var prefix = selectprefix.prefix;
  };
  

  var color = db.prepare(`SELECT * FROM personalizar_comandos WHERE idserver = ${message.guild.id}`).get();
  if(!color || color.colorembed == null) {
     var cembed = "#7289D9";
  }else{
     var cembed = color.colorembed;
  };

  let embed = new Discord.MessageEmbed()
   .setTitle("Informacion de Sad Bot") 
   .setColor(cembed)
   .setDescription(`Prefijo de Sad Bot **${prefix}** \n Invitación de Sad Bot **[Click Aquí](https://discordapp.com/oauth2/authorize?client_id=731860604872294400&scope=bot&permissions=8)** \n Servidor de Soporte **[Click Aquí](https://discord.gg/S4dMupq)** \n Página Web **[Click Aquí](https://sad-bot1.glitch.me/)** \n Lista de Comandos **${prefix}ayuda**`)
   .setThumbnail(client.user.displayAvatarURL())
  message.channel.send(embed);
  }
};