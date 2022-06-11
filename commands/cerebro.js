module.exports = {
    ayuda: `T.`,
    ejemplo: "cerebro Hacer memes en paint,Hacer memes en Gimp,Hacer memes en Photoshop,Hacer memes en disocrd",
    permiso : "Ninguno",
    run: async (client, message, args) => {
  const Discord = require("discord.js");
  const sqlite3 = require("better-sqlite3");
  const db = new sqlite3('./sadbot.sqlite3');
  const Weez = require('weez')
  const weez = new Weez.WeezAPI((process.env.API));
  
  var color = db.prepare(`SELECT * FROM personalizar_comandos WHERE idserver = ${message.guild.id}`).get();
  if(!color || color.colorembed == null) {
    var cembed = "#7289D9";
  }else{
    var cembed = color.colorembed;
  };

let splitmsg = args.join(" ").split(",");
let texto1 = splitmsg[0];
let texto2 = splitmsg[1];
let texto3 = splitmsg[2];
let texto4 = splitmsg[3];

const embednotexto = new Discord.MessageEmbed() 
embednotexto.setColor("ORANGE")
embednotexto.setDescription("⚠️ || Tienes que escribir todos los apartados Ejemplo : ``cerebro w , x , y , z``.")

if(!texto1 || !texto2 || !texto3 || !texto4) return message.channel.send(embednotexto);

let img = await weez.cerebro(texto1, texto2, texto3, texto4)

const embed = new Discord.MessageEmbed() 
.setColor(cembed)
.attachFiles([{
  attachment: img,
  name: "cerebro.png"
}])
.setImage("attachment://cerebro.png")

return message.channel.send(embed);
}}