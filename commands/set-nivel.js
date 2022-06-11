const megadb = require("megadb");
let levels_db = new megadb.crearDB("niveles");
let niveles_act_des = new megadb.crearDB("niveles_act_des")
const sqlite3 = require("better-sqlite3");
const db = new sqlite3('./sadbot.sqlite3');
const Discord = require("discord.js");

module.exports = {
    ayuda: `Pones el nivel elejido al usuario mencionado.`,
    ejemplo: "set-nivel @User#0001 10",
    permiso : "ADMINISTRATOR",

    run: async (client, message, args) => {
    
      const embednoper = new Discord.MessageEmbed() 
      embednoper.setColor("RED")
      embednoper.setDescription("🚫 || No tienes el permiso de ``ADMINISTRATOR`` para utilizar este comando.")
    
          if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(embednoper);
    
          let onoff = db.prepare(`SELECT niveles FROM activar_desactivar WHERE idserver = ${message.guild.id}`).get();
      
          const embedecodes = new Discord.MessageEmbed() 
          embedecodes.setColor("RED")
          embedecodes.setDescription("🚫 || El sistema de niveles está desactivado en este servidor.")
    
          if (!onoff|| !onoff.niveles || onoff.niveles == null || onoff.niveles == undefined) {
    
            if(!niveles_act_des.tiene(`${message.guild.id}`)) {
            return message.channel.send(embedecodes);
            };
            let activar = await niveles_act_des.obtener(`${message.guild.id}`);
            if (activar == "off") return message.channel.send(embedecodes).then(niveles_act_des.eliminar(message.guild.id));
            if (activar == "on") {
              db.prepare(`INSERT INTO activar_desactivar(idserver, niveles) VALUES(${message.guild.id}, 1)`);
              niveles_act_des.eliminar(message.guild.id)
             };
          };
          
          if(onoff.niveles == 0) return message.channel.send(embedecodes);

        let usuario = message.mentions.members.first();
        if(!usuario) usuario = message.guild.members.cache.get(args[0]);
        if(!usuario) usuario = message.guild.members.cache.get(message.author.id);
              
        let nuevonivel = args[1];
        if(!nuevonivel) nuevonivel = args[0];

      
        const embednivel = new Discord.MessageEmbed() 
        embednivel.setColor("ORANGE")
        embednivel.setDescription(`⚠️ ||  Introduzca el nivel que desea introduzir a ese usuario.`)      

        const embed0 = new Discord.MessageEmbed() 
        embed0.setColor("GREEN")
        embed0.setDescription(`<:tick:613820461675053066> || Se ha establecido el nivel ${nuevonivel} al usuario ${usuario}`)        

        if(!nuevonivel) return message.channel.send(embednivel);
        if(isNaN(nuevonivel))  return message.channel.send(embednivel);
         let filas = db.prepare(`SELECT * FROM niveles WHERE idserver = ${message.guild.id} AND idusuario = ${usuario.id}`).get();
          if(filas && filas.nivel){
            db.prepare(`UPDATE niveles SET nivel = ${nuevonivel} WHERE idusuario = ${usuario.id} AND idserver= ${message.guild.id}`).run();
            return message.channel.send(embed0);
          }else{
            db.prepare(`INSERT INTO niveles(idserver, idusuario, xp, nivel) VALUES(${message.guild.id},${usuario.id},${0},${nuevonivel})`).run();
            return message.channel.send(embed0);
          }
          /*
          if (!filas){     
            console.log("123")
              if(levels_db.tiene(message.guild.id)) {
              var { xp, nivel } = await levels_db.obtener(`${message.guild.id}.${usuario.id}`);
              db.prepare(`INSERT INTO niveles(idserver, idusuario, xp, nivel) VALUES(${message.guild.id},${usuario.id},${xp},${nivel})`).run();
            };
            if(!levels_db.tiene(message.guild.id)) {
              db.prepare(`INSERT INTO niveles(idserver, idusuario, xp, nivel) VALUES(${message.guild.id},${usuario.id},0,${nuevonivel})`).run();
              return message.channel.send(embed0);
            };
          };        
          db.prepare(`UPDATE niveles SET nivel = ${nuevonivel} WHERE idusuario = ${message.author.id} AND idserver= ${message.guild.id}`).run();
            return message.channel.send(embed0);  */
    }
};