module.exports = {
    ayuda: `Escriba la plataforma, PC, PSN o Xbox {Escribe en minúscula la plataforma nombrada}.`,
    ejemplo: "fortnite-stats Ninja pc",
    permiso : "Ninguno",

    run: async (client, message, args) => {
      
const Discord = require("discord.js");

const Client = require('fortnite');
const fortnite = new Client(process.env.forniteapi);
  const sqlite3 = require("better-sqlite3");
  const db = new sqlite3('./sadbot.sqlite3');

  let username = await args[0];
  let platform = await args[1];
  

  const embednouser = new Discord.MessageEmbed() 
  embednouser.setColor("ORANGE")
  embednouser.setDescription(`⚠️ || Introduze el nombre del usuario.`)
  
  const embednoplatform = new Discord.MessageEmbed() 
  embednoplatform.setColor("ORANGE")
  embednoplatform.setDescription(`⚠️ || Introduze la plataforma.`)

  if(!username) return message.channel.send(embednouser);
  if(!platform) return message.channel.send(embednoplatform);

  if (platform.toUpperCase() == "XBOX") platform = "xbl";
  if (platform.toUpperCase() == "PC") platform = "pc";
  if (platform.toUpperCase() == "PSN") platform = "psn";      
      
let data = await fortnite.user(username, platform).then(async data => {

        let solobajas = data.stats.solo.kills;
        let solowins = data.stats.solo.wins;
        let solokd = data.stats.solo.kd;
        let solomPlayed = data.stats.solo.matches;
        let solotop3 = data.stats.solo.top_3;

        let duobajas = data.stats.duo.kills;
        let duowins = data.stats.duo.wins;
        let duokd = data.stats.duo.kd;
        let duomPlayed = data.stats.duo.matches;
        let duotop3 = data.stats.duo.top_3;

        let squadbajas = data.stats.squad.kills;
        let squadwins = data.stats.squad.wins;
        let squadkd = data.stats.squad.kd;
        let squadmPlayed = data.stats.squad.matches;
        let squadtop3 = data.stats.squad.top_3;
      
        let kills = data.stats.lifetime.kills;
        let wins = data.stats.lifetime.wins;
        let kd = data.stats.lifetime.kd;
        let mPlayed = data.stats.lifetime.matches;
        let top3 = data.stats.lifetime.top_3;
        
        var color = db.prepare(`SELECT * FROM personalizar_comandos WHERE idserver = ${message.guild.id}`).get();
        if(!color || color.colorembed == null) {
          var cembed = "#7289D9";
        }else{
          var cembed = color.colorembed;
        };
             
        
        let embed = new Discord.MessageEmbed()
        .setAuthor(data.username)
        .setColor(cembed)
        .setDescription(`**Estadísticas de Fortnite de ${username}** \n \n **Solo** \n Bajas: ${solobajas} \n KD: ${solokd} \n Partidas Jugadas: ${solomPlayed} \n Victorias: ${solowins} \n Top 3: ${solotop3} \n \n **Duo** \n Bajas: ${duobajas} \n KD: ${duokd} \n Partidas Jugadas: ${duomPlayed} \n Victorias: ${duowins} \n Top 3: ${duotop3} \n \n **Escuadron:** \n Bajas: ${squadbajas} \n KD: ${squadkd} \n Partidas Jugadas: ${squadmPlayed} \n Victorias: ${squadwins} \n Top 3: ${squadtop3} \n \n **Global** \n Bajas: ${kills} \n KD: ${kd} \n Partidas Jugadas: ${mPlayed} \n Victorias: ${wins} \n Top 3: ${top3}`)
        message.channel.send(embed);
 
    }).catch(e => {
        console.log(e)

        const embederror = new Discord.MessageEmbed() 
        embederror.setColor("ORANGE")
        embederror.setDescription(`⚠️ || No se encuenta el usuario.`)      

        message.channel.send(embederror);
    });
    }
};