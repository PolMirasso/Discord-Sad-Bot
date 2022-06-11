module.exports = {
    ayuda: `Muestra la lista de los mejores del ahoracado de todos los servidores.`,
    ejemplo: "top-ahorcado",
    permiso : "Ninguno",
    run: async (client, message, args) => {
const Discord = require("discord.js");  
const megadb = require("megadb");
let ahorcadostats = new megadb.crearDB("ahorcadostats");
 
const sqlite3 = require("better-sqlite3");
const db = new sqlite3('./sadbot.sqlite3');

let statsahorcadov = db.prepare(`SELECT * FROM user_confi ORDER BY victorias_ahorcado DESC LIMIT 10`).all();
let statsahorcadouser = db.prepare(`SELECT * FROM user_confi WHERE idusuario = ${message.author.id}`).get();

let index = 1;
let datos = [];
statsahorcadov.map(ls => {

   let victorias = ls.victorias_ahorcado;
   let derrotas = ls.derrotas_ahorcado;

   if(victorias == null) victorias = 0;
   if(derrotas == null) derrotas = 0;

   let prop = Math.round(victorias/derrotas * 100) / 100;
   if(prop == null) prop = 0;
   if(prop == Infinity) prop = victorias;
   if(prop == NaN) prop = 0;

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
   embed.setTitle('TOP Ahorcado')
   embed.setColor(cembed)
   embed.setDescription(datos.join('\n'))   
//   embed.setFooter(`Tus stats Victorias: ${statsahorcadouser.victorias_ahorcado} | Derrotas: ${statsahorcadouser.victorias_ahorcado}`)	
   embed.setFooter(`El último día de cada mes daré un rol de ganador de ahorcado al número 1, el rol sera en el servidor Sad Bot Server Oficial`)
   
   message.channel.send(embed);

}};