const Discord = require("discord.js");
const megadb = require("megadb");
let economia = new megadb.crearDB("economia");
let economia_act_des = new megadb.crearDB("economia_act_des")
let daily = new megadb.crearDB("daily");
let DBL = require("dblapi.js");
const prettyMilliseconds = require('pretty-ms');

const sqlite3 = require("better-sqlite3");
const db = new sqlite3('./sadbot.sqlite3');


module.exports = {
    ayuda: `Obtienes una cantidad de monedas por votarme en esta (página)[https://top.gg/bot/512185944451973123/vote], gracias.`,
    ejemplo: "daily",
    permiso : "Ninguno",
    run: async (client, message, args) => {
        

  let onoff = db.prepare(`SELECT economia FROM activar_desactivar WHERE idserver = ${message.guild.id}`).get();

  const embedecodes = new Discord.MessageEmbed()
  embedecodes.setColor("RED")
  embedecodes.setDescription("🚫 || La economía está desactivada en este servidor.")

  if (!onoff|| !onoff.economia || onoff.economia == null || onoff.economia == undefined) {

      if(!economia_act_des.tiene(`${message.guild.id}`)) {
      return message.channel.send(embedecodes);
      };
      let activar = await economia_act_des.obtener(`${message.guild.id}`);
      if (activar == "off") {
        return message.channel.send(embedecodes).then(economia_act_des.eliminar(message.guild.id));
      };
      if (activar == "on") {
           db.prepare(`INSERT INTO activar_desactivar(idserver, economia) VALUES(${message.guild.id}, 1)`);
           economia_act_des.eliminar(message.guild.id);
         };
    };

    if(onoff.economia == 0) return message.channel.send(embedecodes);
 
    var color = db.prepare(`SELECT * FROM personalizar_comandos WHERE idserver = ${message.guild.id}`).get();
if(!color || color.colorembed == null) {
  var cembed = "#7289D9";
}else{
  var cembed = color.colorembed;
};

let embed = new Discord.MessageEmbed()
    .setTitle("Daily")
    .setColor(cembed)
    .setDescription("Aqui tienes el link para [votar el bot](https://discordbots.org/bot/512185944451973123/vote) \n \n Una vez que votes introduzca el comando reclamar-daily. \n \n Recuerda que la pagina puede demorar en actualizar quien voto, asi que recomiendo que esperes un poco antes de ejecutar el comando.")
message.channel.send(embed);
}};