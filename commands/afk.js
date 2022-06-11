module.exports = {
    ayuda: "Usa-lo para que la gente sepa que estas AFK y el motivo.",
    ejemplo: "afk Durmiendo 💤.",
    uso : "afk (Motivo el cual esta ausente)",
    permiso : "Ninguno",
    run: async (client, message, args) => {
  const Discord = require("discord.js");

  const sqlite3 = require("better-sqlite3");
  const db = new sqlite3('./sadbot.sqlite3');

  var color = db.prepare(`SELECT * FROM personalizar_comandos WHERE idserver = ${message.guild.id}`).get();
  if(!color || color.colorembed == null) {
    var cembed = "#7289D9";
  }else{
    var cembed = color.colorembed;
  };

 let motivo = args.join(' ') ? args.join(' ') : 'No especificado.';
 let afkmodo = db.prepare(`SELECT afk_motivo FROM user_confi WHERE idusuario = ${message.author.id}`).get();

        if(afkmodo == null || afkmodo == undefined || !afkmodo){
          db.prepare(`INSERT INTO user_confi (idusuario, afk_motivo) VALUES(${message.author.id}, '${motivo}')`).run();
        }else{
          db.prepare(`UPDATE user_confi SET afk_motivo = '${motivo}' WHERE idusuario = ${message.author.id}`).run();
        };

        let embed = new Discord.MessageEmbed()
        .setColor(cembed)
        .setDescription(`${message.author} Se ha puesto en modo AFK,por el siguiente motivo: **  ${motivo}**`)
        message.channel.send(embed).then(msg => msg.delete({ timeout: 5000, reason: 'Mensaje de propio bot eliminado a los 5seg.' }));
  }
};