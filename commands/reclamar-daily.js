
const Discord = require("discord.js")
const megadb = require("megadb");
let economia = new megadb.crearDB("economia");
let economia_act_des = new megadb.crearDB("economia_act_des")
let daily = new megadb.crearDB("daily")
let DBL = require("dblapi.js");
const prettyMilliseconds = require('pretty-ms');
const client = new Discord.Client() 
let dbl = new DBL((process.env.dblapi), client);


const sqlite3 = require("better-sqlite3");
const db = new sqlite3('./sadbot.sqlite3');

module.exports = {
    ayuda: `Reclamas la recompensa diaria.`,
    ejemplo: "reclamar-daily",
    permiso : "Ninguno",

    run: async (client, message, args) => {

     // message.channel.send(" **Actualmente el comando ``??reclamar-daily`` esta desactivado temporalmente. ** ");
  
     let onoff = db.prepare(`SELECT * FROM activar_desactivar WHERE idserver = ${message.guild.id}`).get();

     const embedecodes = new Discord.MessageEmbed() 
     embedecodes.setColor("RED")
     embedecodes.setDescription("🚫 || La economía está desactivada en este servidor.")
   
       if (!onoff|| !onoff.economia || onoff.economia == null || onoff.economia == undefined) {
   
       if(!economia_act_des.tiene(`${message.guild.id}`)) {
         return message.channel.send(embedecodes);
         };
         let activar = await economia_act_des.obtener(`${message.guild.id}`);
         if (activar == "off") return message.channel.send(embedecodes).then(economia_act_des.eliminar(message.guild.id));
         if (activar == "on") {
           db.prepare(`INSERT INTO activar_desactivar(idserver, economia) VALUES(${message.guild.id}, 1)`);
           economia_act_des.eliminar(message.guild.id);
          };
       };
       
   
       if(onoff.economia == 0) return message.channel.send(embedecodes);

let usuario = message.author.id
  dbl.hasVoted(message.author.id).then(async voted => {
    if (voted){

    let selectdbtiempo = db.prepare(`SELECT * FROM tiempo_economia WHERE idusuario = ${message.author.id} AND idserver= ${message.guild.id} `).get();

      if (!selectdbtiempo) {
        db.prepare(`INSERT INTO tiempo_economia(idserver, idusuario, tiempo_daily) VALUES(${message.guild.id},${message.author.id}, 0)`).run();       
      };

      if(selectdbtiempo){
        let a = selectdbtiempo.tiempo_daily
        let b = Date.now()
        if(b < a ) {  
          let x = prettyMilliseconds(a-b)
          let embed = new Discord.MessageEmbed() 

          .setDescription("Solo puedes votar cada 24h.")
          .setColor(`RED`)
          .setFooter("Puedes volver a votar en "+ x +".")
       return message.channel.send(embed);
        };
      };
  
    if(economia.tiene(`${message.guild.id}.${usuario}`)) {
       var dinerojson = await economia.obtener(`${message.guild.id}.${usuario}`);
      await economia.eliminar(`${message.guild.id}.${usuario}`);
    };

    let select = db.prepare(`SELECT * FROM economia WHERE idusuario = ${message.author.id} AND idserver= ${message.guild.id}`).get();

          let ganas = Math.round(Math.random() * (40 - 20) + 20);


          if(!dinerojson) dinerojson = 0;

          if(select){
                var cantidadtotal = ganas + select.dinero;
          }else{
              var cantidadtotal = ganas + dinerojson;
          };


          if(select && select.dinero){
           db.prepare(`UPDATE economia SET dinero = ${cantidadtotal} WHERE idusuario = ${message.author.id} AND idserver= ${message.guild.id}`).run();
          }else{
           db.prepare(`INSERT INTO economia(idserver, idusuario, dinero) VALUES(${message.guild.id},${message.author.id}, ${cantidadtotal})`).run();    
          };
          db.prepare(`UPDATE tiempo_economia SET tiempo_daily = ${Date.now() + 86400000} WHERE idusuario = ${message.author.id} AND idserver= ${message.guild.id}`).run();

          let embed = new Discord.MessageEmbed() 
            .setTitle(`Has ganado ${Math.round(ganas)}`)
            .setColor(`#F5A819`)
            return message.channel.send(embed);
    }else if (!voted){
      let embed2 = new Discord.MessageEmbed() 
            .addField("No has votado al bot, reinténtalo en unos segundos o votalo","[Click aqui](https://discordbots.org/bot/512185944451973123/vote) para votar")
            .setColor(`#F5A819`)
            return message.channel.send(embed2);
   };
   }); 
}};
