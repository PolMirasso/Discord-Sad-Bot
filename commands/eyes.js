module.exports = {
    ayuda: `Te dice diferentes opciones con el tipo de ojo.`,
      ejemplo: "eyes Estudiar 14 horas , Estudiar antes del examen, Suspender por no poner el nombre",
      permiso : "Ninguno",

    run: async (client, message, args) => {
  
  const Discord = require("discord.js");
  const Weez = require('weez');
  const weez = new Weez.WeezAPI((process.env.API));
  const sqlite3 = require("better-sqlite3");
  const db = new sqlite3('./sadbot.sqlite3');
  
let splitmsg = args.join(" ").split(",");
let texto1 = splitmsg[0];
let texto2 = splitmsg[1];
let texto3 = splitmsg[2];

const embednotexto = new Discord.MessageEmbed() 
embednotexto.setColor("ORANGE")
embednotexto.setDescription(`⚠️ || Introduze los tres textos separados por "," .`)

if(!texto1 || !texto2 || !texto3) return message.channel.send(embednotexto);
let img = await weez.eyes(texto1 , texto2 , texto3);

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
  name: "eyes.png"
}])
.setImage("attachment://eyes.png")

await message.channel.send(embed);
  }
};