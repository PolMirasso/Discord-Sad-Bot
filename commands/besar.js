module.exports = {
    ayuda: "Menciona al usuario que deseas besar 7w7.",
    ejemplo: "besar @User#000",
    uso : "besar (Usuario)",
    permiso : "Ninguno",

    run: async (client, message, args) => {

  const sqlite3 = require("better-sqlite3");
  const db = new sqlite3('./sadbot.sqlite3');

  const Discord = require("discord.js");
  let user = message.mentions.users.first();

  const embednouser = new Discord.MessageEmbed() 
  embednouser.setColor("ORANGE")
  embednouser.setDescription(`⚠️ || Introduzca el usuario que desea "besar".`)

  const embeduser = new Discord.MessageEmbed() 
  embeduser.setColor("ORANGE")
  embeduser.setDescription(`⚠️ || **Enserio te quieres besar a ti mismo!?  :(**`)


  if(!user) return message.channel.send(embednouser);
  if(user.id == message.author.id)return message.channel.send(embeduser)
  const got = require('got');

  var color = db.prepare(`SELECT * FROM personalizar_comandos WHERE idserver = ${message.guild.id}`).get();
  if(!color || color.colorembed == null) {
    var cembed = "#7289D9";
  }else{
    var cembed = color.colorembed;
  };

  got('https://nekos.life/api/v2/img/kiss').then(res=>{
  const embed = new Discord.MessageEmbed()
  .setAuthor(message.author.username, message.author.displayAvatarURL())
  .setColor(cembed)
  .setDescription(`**${message.author.username}** beso a **${user.username}** `)
  .setImage(JSON.parse(res.body).url);
   message.channel.send({ embed });
});
}
}