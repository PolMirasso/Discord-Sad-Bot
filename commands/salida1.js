module.exports = {
    ayuda: `Elijes el canal para la salida 1.`,
    ejemplo: "salida1 #general",
    permiso : "Ninguno",

    run: async (client, message, args) => {
const Discord = require("discord.js");
const sqlite3 = require("better-sqlite3");
const db = new sqlite3('./sadbot.sqlite3');

const embednoper = new Discord.MessageEmbed() 
embednoper.setColor("RED")
embednoper.setDescription("🚫 || No tienes el permiso ``ADMINISTRATOR`` para utilizar este comando.")      

if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(embednoper);  

let canal = message.mentions.channels.first();

const embednocanal = new Discord.MessageEmbed() 
embednocanal.setColor("ORANGE")
embednocanal.setDescription(`⚠️ ||  Introduzca el canal donde quiera que se envie la salida 1.`)


if(canal) var modo = 1;
let modooff = args[0];
if(!modooff) modooff = "A"
if(!canal && modooff.toLowerCase() == "off") {
var modo = 0;
canal = 3;
};

if(!modo) modo = 0;

if(!canal) return message.channel.send(embednocanal);

let filas = db.prepare(`SELECT salida1 FROM activar_desactivar WHERE idserver = ${message.guild.id}`).get();
let filasdb = db.prepare(`SELECT canal_salida1 FROM personalizar_comandos WHERE idserver = ${message.guild.id}`).get();

const embed0 = new Discord.MessageEmbed() 
embed0.setColor("GREEN")
embed0.setDescription(`<:tick:613820461675053066> || Se ha establecido el canal de salida 1 en ${canal}`)

const embed1 = new Discord.MessageEmbed() 
embed1.setColor("GREEN")
embed1.setDescription(`<:tick:613820461675053066> || Se ha desactivado la salida 1 del servidor.`)

if(filas){
db.prepare(`UPDATE activar_desactivar SET salida1 = ${modo} WHERE idserver = ${message.guild.id}`).run();
};

if(!filas){
db.prepare(`INSERT INTO activar_desactivar(idserver, salida1) VALUES(${message.guild.id}, ${modo})`).run();
};

if(filasdb){
if(canal !== 3){
db.prepare(`UPDATE personalizar_comandos SET canal_salida1 = ${canal.id} WHERE idserver = ${message.guild.id}`).run();
};
};

if(!filasdb){
if(canal !== 3){
db.prepare(`INSERT INTO personalizar_comandos(idserver, canal_salida1) VALUES(${message.guild.id}, ${canal.id})`).run();
};
};

if(canal == 3) {
message.channel.send(embed1);
}else{
message.channel.send(embed0);
};

}};
