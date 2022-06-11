module.exports = {
    ayuda: "Menciona al usuario que deseas abrazar.",
    ejemplo: "abrazar @User#0001",
    uso : "abrazar (Mencion a usuario)",
    permiso : "Ninguno",
    run: async (client, message, args) => {
  const Discord = require("discord.js");
  const got = require('got');
  const sqlite3 = require("better-sqlite3");
  const db = new sqlite3('./sadbot.sqlite3');

       let user = message.mentions.users.first(); 

       let embed2 = new Discord.MessageEmbed()
       embed2.setColor("RED")
       embed2.setDescription("Menciona al usuario que quieras abrazar.")

       let embed1 = new Discord.MessageEmbed()
       embed1.setColor("RED")
       embed1.setDescription("**Enserio te quieres abrazar a ti mismo!?  :(**.")

      
      if(!user) return message.channel.send(embed2);
      if(user.id == message.author.id) return message.channel.send(embed1);

      var color = db.prepare(`SELECT * FROM personalizar_comandos WHERE idserver = ${message.guild.id}`).get();
      if(!color || color.colorembed == null) {
        var cembed = "#7289D9";
      }else{
        var cembed = color.colorembed;
      };
      
      got("https://nekos.life/api/v2/img/hug").then(res=>{
        let embed3 = new Discord.MessageEmbed()
      .setAuthor(message.author.username, message.author.displayAvatarURL())
      .setColor(cembed)
      .setDescription(`**${message.author.username}** abrazo a **${user.username}** `)
      .setImage(JSON.parse(res.body).url);
       message.channel.send(embed3);
});
}
};