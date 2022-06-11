module.exports = {
    ayuda: `Te ama.`,
    ejemplo: "love @User#0001 @User#0002",
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

let users = message.mentions.users.map(m => m.username).join(' y ');
      
const embednousers = new Discord.MessageEmbed() 
embednousers.setColor("ORANGE")
embednousers.setDescription("⚠️ || **¡Mencione a uno o dos usuarios, y así podré calcular si podrían ser amigos o algo más 7w7!**")
      
      
if(!users) return message.channel.send(embednousers);    
//const random = Math.floor(Math.random() * 100);
const random = 51

let heard = "";
    if(random < 50){
        heard='💔';
      const embed = new Discord.MessageEmbed()
    .setTitle(`**${random}% |  Mejor no seáis nada. **`)
    .setDescription(heard+' **'+random+' %**'+' '+heard)
    .setColor(cembed)
     message.channel.send(embed);
    }else if(random < 80){
        heard='💝';
          const embed1 = new Discord.MessageEmbed()
    .setTitle(`**${random}% | Tal vez puedan ser más que amigos...**`)
    .setDescription(heard+' **'+random+' %**'+' '+heard)
    .setColor(cembed)
     message.channel.send(embed1);
    }else if(random < 101){
        heard='💞';
              const embed1 = new Discord.MessageEmbed()
    .setTitle(`**${random}% | Yo no digo nada, pero lo digo todo.**`)
    .setDescription(heard+' **'+random+' %**'+' '+heard)
    .setColor(cembed)
     message.channel.send(embed1);
    };

}};