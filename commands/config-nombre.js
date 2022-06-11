module.exports = {
    ayuda: `Personaliza el nombre de los usuarios que se unen la servidor.`,
    ejemplo: "config-nombre on [🛸]",
    permiso : "ADMINISTRATOR",
    run: async (client, message, args) => {

      const Discord = require("discord.js");
      const sqlite3 = require("better-sqlite3");
      const db = new sqlite3('./sadbot.sqlite3');

      const embednoper = new Discord.MessageEmbed() 
      embednoper.setColor("RED")
      embednoper.setDescription("🚫 || No tienes el permiso ``ADMINISTRATOR`` para utilizar este comando.")
    

if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(embednoper);  
let estado = args[0];
let decoracion = args.slice(1).join(" ");

const embednoestado = new Discord.MessageEmbed() 
embednoestado.setColor("ORANGE")
embednoestado.setDescription("⚠️ || Introduce el estado on/off.")

const embednodecoracion = new Discord.MessageEmbed() 
embednodecoracion.setColor("ORANGE")
embednodecoracion.setDescription("⚠️ || Introduce el emoji o el texto de nombre.")


if(!estado) return message.channel.send(embednoestado);
if (estado == "on") var modo = 1;
if (estado == "off") var modo = 2;
if(!modo) return message.channel.send(embednoestado);
if(!decoracion && modo == 1) return message.channel.send(embednodecoracion)

let filas = db.prepare(`SELECT confignombre FROM activar_desactivar WHERE idserver = ${message.guild.id}`).get();
let filasdb = db.prepare(`SELECT config_nombre FROM personalizar_comandos WHERE idserver = ${message.guild.id}`).get();

const embed0 = new Discord.MessageEmbed() 
embed0.setColor("GREEN")
embed0.setDescription(`<:tick:613820461675053066> || Se ha activado la personalización del servidor.`)

const embed1 = new Discord.MessageEmbed() 
embed1.setColor("GREEN")
embed1.setDescription(`<:tick:613820461675053066> || Se ha desactivado la personalización del servidor.`)

if(modo == 2) modo = 0;

if(filas){
db.prepare(`UPDATE activar_desactivar SET confignombre = ${modo} WHERE idserver = ${message.guild.id}`).run()
};

if(!filas){
db.prepare(`INSERT INTO activar_desactivar(idserver, confignombre) VALUES(${message.guild.id}, ${modo})`).run();
};

if(filasdb){
  db.prepare(`UPDATE personalizar_comandos SET config_nombre = '${decoracion}' WHERE idserver = ${message.guild.id}`).run();
};

if(!filasdb){
  db.prepare(`INSERT INTO personalizar_comandos(idserver, config_nombre) VALUES(${message.guild.id}, '${decoracion}')`).run();
};

if(modo == 1) {
message.channel.send(embed0);
}else{
message.channel.send(embed1);
};


}}; 