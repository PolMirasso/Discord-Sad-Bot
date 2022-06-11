module.exports = {
    ayuda: "Muestra el avatar del usuario.",
    ejemplo: "avatar @User#0001",
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

    let usuario = message.mentions.members.first();
    if(!usuario) usuario = message.guild.members.cache.get(args[0])
    if(!usuario) usuario = message.author;
      
    const embed = new Discord.MessageEmbed()
        .setImage(`${usuario.displayAvatarURL({format: "jpg"})}?size=2048`) 
        .setColor(cembed)
       .setDescription(`Avatar de ${usuario.username} \n [PNG](${usuario.displayAvatarURL({format: "png"})}) [JPG](${usuario.displayAvatarURL({format: "jpg"})}) [WEBP](${usuario.displayAvatarURL()})`);
    message.channel.send(embed);
    
}};