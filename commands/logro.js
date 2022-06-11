
  function numeroAleatorio(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }

module.exports = {
    ayuda: `Obtienes un logro.`,
    ejemplo: "logro Sad Mode",
    permiso : "Ninguno",

    run: async (client, message, args) => {
      const Discord = require("discord.js");
      var achievement = args.join("%20");
      
      const embednoargs = new Discord.MessageEmbed() 
      embednoargs.setColor("ORANGE")
      embednoargs.setDescription("⚠️ || Introduzca el texto de su logro.")
      
      if(!achievement) return message.channel.send(embednoargs);
      let numero = numeroAleatorio(1,39);
      
      const sqlite3 = require("better-sqlite3");
      const db = new sqlite3('./sadbot.sqlite3');
    
        var color = db.prepare(`SELECT * FROM personalizar_comandos WHERE idserver = ${message.guild.id}`).get();
        if(!color || color.colorembed == null) {
          var cembed = "#7289D9";
         }else{
          var cembed = color.colorembed;
         };
      
        let embed = new Discord.MessageEmbed()
          .setTitle(`${message.author.username} acaba de conseguir un nuevo logro.`)
          .setColor(cembed)
          .setImage(`https://minecraftskinstealer.com/achievement/${numero}/Achievement+Get%21/${achievement}`)
        message.channel.send(embed);
      
  }
};