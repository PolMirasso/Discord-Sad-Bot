module.exports = {
    ayuda: `Te dice lo que es bueno.`,
    ejemplo: "drake @User#0001",
    permiso : "Ninguno",

    run: async (client, message, args) => {
      
  const Discord = require("discord.js")
  const Weez = require('weez');
  const weez = new Weez.WeezAPI((process.env.API));
  const sqlite3 = require("better-sqlite3");
  const db = new sqlite3('./sadbot.sqlite3');

  let usuario = message.mentions.members.first();
  
  const embednomen = new Discord.MessageEmbed() 
  embednomen.setColor("ORANGE")
  embednomen.setDescription("⚠️ || Tienes que mencionar a un usuario.")
  
  if(!usuario) return message.channel.send(embednomen);
  usuario = usuario.user;
  
  let img = await weez.drake(message.author.displayAvatarURL({format: "png"}),usuario.displayAvatarURL({format: "png"}));
  
  var color = db.prepare(`SELECT * FROM personalizar_comandos WHERE idserver = ${message.guild.id}`).get();
  if(!color || color.colorembed == null) {
    var cembed = "#7289D9";
  }else{
    var cembed = color.colorembed;
  };
  
  const embed = new Discord.MessageEmbed() 
  .setColor(cembed)
  .attachFiles([{
    attachment: img,
    name: "drake.png"
  }])
  .setImage("attachment://drake.png")
  
  await message.channel.send(embed);
    }
  };