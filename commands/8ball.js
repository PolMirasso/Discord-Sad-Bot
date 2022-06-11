module.exports = {
    ayuda: "Le preguntas algo y el te responde...",
    ejemplo: "8ball Ella me ama?",
    uso : "8ball (Pregunta)",
    permiso : "Ninguno",
    run: async (client, message, args) => {
    
  const sqlite3 = require("better-sqlite3");
  const db = new sqlite3('./sadbot.sqlite3');
  const Discord = require("discord.js");

  const embed = new Discord.MessageEmbed() 
  .setColor("RED")
  .setDescription("Escriba una pregunta.")

 if(args.length <= 0) return message.channel.send(embed);
    var rpts = ["La respuesta a esta pregunta ","La respuesta es la misma que la pregunta de Si el/ella te ama.","Eso es mas dificil de predecir que la √0",`No se como decirtelo sin hacerte daño, NO.`,`Te diria que si, pero soy un bot y me han programado para no mentir.`,`La respuesta no es clara, pero hay un ${Math.round(Math.random() * (100 - 1) + 1)}% de posibilidades de que esa pregunta sea correcta.`,"La respuesta es ERROR 404, búscate una novia.","**Probablemente no, pero solo soy una máquina sin sentimientos... 🤖  bip bip bip 🤖 **", "No", "Tal vez", "No sé", "¡Claro!"];   
    var random = rpts[Math.floor(Math.random() * rpts.length)];

    var color = db.prepare(`SELECT * FROM personalizar_comandos WHERE idserver = ${message.guild.id}`).get();
    if(!color || color.colorembed == null) {
      var cembed = "#7289D9";
    }else{
      var cembed = color.colorembed;
    };
 let embed2 = new Discord.MessageEmbed()
  .setColor(cembed)
  .setDescription(`La respuesta a su pregunta es **${random}**`)
 message.channel.send(embed2);
    }
};