module.exports = {
    ayuda: `Muestra los mejores de pacman de todos los servidores.`,
    ejemplo: "top-pacman",
    permiso : "Ninguno",

    run: async (client, message, args) => {

const Discord = require("discord.js");
const sqlite3 = require("better-sqlite3");
const db = new sqlite3('./sadbot.sqlite3');

let statsahorcadov = db.prepare(`SELECT * FROM user_confi ORDER BY victorias_pacman DESC LIMIT 10`).all();
let statsahorcadouser = db.prepare(`SELECT * FROM user_confi WHERE idusuario = ${message.author.id}`).get();

let index = 1;
let datos = [];
statsahorcadov.map(ls => {

   let victorias = ls.victorias_pacman;
   let derrotas = ls.derrotas_pacman;

   if(victorias == null) victorias = 0;
   if(derrotas == null) derrotas = 0;

   let prop = Math.round(victorias/derrotas * 100) / 100;
   if(prop == null) prop = 0;

   if(prop == Infinity) prop = victorias;

    let usuario = client.users.cache.get(ls.idusuario);
    if(!usuario){
     datos.push(index++ +". " + ls.idusuario + ' | Proporcion **'+prop+'** | Victorias: **'+victorias+'** | Derrotas: **'+derrotas+'**');      
    }else{
     datos.push(index++ +". " + client.users.cache.get(ls.idusuario).tag + ' | Proporcion **'+prop+'** | Victorias: **'+victorias+'** | Derrotas: **'+derrotas+'**');      
    }
  
   });

   var color = db.prepare(`SELECT * FROM personalizar_comandos WHERE idserver = ${message.guild.id}`).get();
   if(!color || color.colorembed == null) {
     var cembed = "#7289D9";
   }else{
     var cembed = color.colorembed;
   };
   

   let embed = new Discord.MessageEmbed()
   embed.setTitle('TOP Pacman')
   embed.setColor(cembed)
   embed.setDescription(datos.join('\n'))   	
   embed.setFooter(`Tus stats: Victorias: ${statsahorcadouser.victorias_pacman} | Derrotas: ${statsahorcadouser.derrotas_pacman}`)
   message.channel.send(embed);

}};