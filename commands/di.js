module.exports = {
    ayuda: `Lo obligas a decir al bot una frase.`,
    ejemplo: "di Por que no ponen a Sad Music 😁",
    permiso : "Ninguno",
    run: async (client, message, args) => {
  const Discord = require("discord.js");
  
  const sqlite3 = require("better-sqlite3");
  const db = new sqlite3('./sadbot.sqlite3');

  message.delete();


  const embednoargs = new Discord.MessageEmbed() 
  embednoargs.setColor("ORANGE")
  embednoargs.setDescription("⚠️ || Introduzca una pregunta.")


    if(args.length <= 0) return message.channel.send(embednoargs);

    var color = db.prepare(`SELECT * FROM personalizar_comandos WHERE idserver = ${message.guild.id}`).get();
    if(!color || color.colorembed == null) {
       var cembed = "#7289D9";
    }else{
       var cembed = color.colorembed;
    };

    let embed = new Discord.MessageEmbed()
      .setDescription(`Alguien me obliga a decir : **${args.join(" ")}** `)
      .setColor(cembed)
    message.channel.send(embed);
  }
};