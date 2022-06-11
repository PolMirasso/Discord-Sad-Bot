module.exports = {
    ayuda: `Te salvaras??`,
    ejemplo: "reiniciar-economia",
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

  let embed0 = new Discord.MessageEmbed()
  embed0.setColor(cembed)
  embed0.setDescription("😬  🔫 3...")

  let embed1 = new Discord.MessageEmbed()
  embed1.setColor(cembed)
  embed1.setDescription("😬  🔫 2...")

  let embed2 = new Discord.MessageEmbed()
  embed2.setColor(cembed)
  embed2.setDescription("😬  🔫 1...")

  var ruleta = [`**¡Pum! Estas muerto ${message.author} ** (__Termina el juego__)`,`😅 🔫 **Por suerte para ti ${message.author} has sobrevivido!** A quien le toca.....`,`😅 🔫 **Oh, maldita sea se ha atascado! O eso es algo bueno? **`];

  let embed3 = new Discord.MessageEmbed()
  embed3.setColor(cembed)
  embed3.setDescription(ruleta[Math.floor(Math.random () * ruleta.length)])

  message.channel.send(embed0).then(m => {
  setTimeout(function () {
   m.edit(embed1);
    setTimeout(function () {
     m.edit(embed2);
      setTimeout(function () {
      m.edit(embed3)
      }, 1000) 
    }, 1000) 
  }, 1000)
})
  
}};