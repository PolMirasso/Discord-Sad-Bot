module.exports = {
    ayuda: `Muestra una imagen de un perro.`,
    ejemplo: "perro",
    permiso : "Ninguno",

    run: async (client, message, args) => {
      
  const Discord = require("discord.js");
  const got = require("got");
  const sqlite3 = require("better-sqlite3");
  const db = new sqlite3('./sadbot.sqlite3');
  const fetch = require('node-fetch');

  var color = db.prepare(`SELECT * FROM personalizar_comandos WHERE idserver = ${message.guild.id}`).get();
  if(!color || color.colorembed == null) {
    var cembed = "#7289D9";
  }else{
    var cembed = color.colorembed;
  };

  fetch('https://api.thedogapi.com/v1/images/search')
  .then(res => res.json())
  .then(json => {

  const embed = new Discord.MessageEmbed() 
  .setColor(cembed)
  .setImage(json[0].url)

  message.channel.send(embed);

});
  }
};

