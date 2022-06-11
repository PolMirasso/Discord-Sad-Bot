module.exports = {
    ayuda: `Activas o desactivas los niveles.`,
    ejemplo: "niveles on",
    permiso : "Ninguno",

    run: async (client, message, args) => {
  const Discord = require("discord.js");
  
        const sqlite3 = require("better-sqlite3");
        const db = new sqlite3('./sadbot.sqlite3');
      
        const embednoper = new Discord.MessageEmbed() 
        embednoper.setColor("RED")
        embednoper.setDescription("🚫 || No tienes el permiso ``ADMINISTRATOR`` para utilizar este comando.")      
      
        const embednoestado = new Discord.MessageEmbed() 
        embednoestado.setColor("ORANGE")
        embednoestado.setDescription(`⚠️ || Introduzca niveles on para activar los niveles o niveles off para desactivar los niveles del servidor.`)
      
      
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(embednoper);  
        let estado = args.join(" ");
        if(!estado) return message.channel.send(embednoestado);
        if (estado == "on") var modo = 1;
        if (estado == "off") var modo = 2;
        if(!modo) return message.channel.send(embednoestado);
      
      let filas = db.prepare(`SELECT niveles FROM activar_desactivar WHERE idserver = ${message.guild.id}`).get();
      
      const embed0 = new Discord.MessageEmbed() 
      embed0.setColor("GREEN")
      embed0.setDescription(`<:tick:613820461675053066> || Se ha activado los niveles del servidor.`)
      
      const embed1 = new Discord.MessageEmbed() 
      embed1.setColor("GREEN")
      embed1.setDescription(`<:tick:613820461675053066> || Se ha desactivado los niveles del servidor.`)
      
       if(modo == 2) modo = 0;
        if(filas){
          db.prepare(`UPDATE activar_desactivar SET niveles = ${modo} WHERE idserver = ${message.guild.id}`).run()
            if(modo == 1) {
              message.channel.send(embed0);
            }else{
              message.channel.send(embed1);
            };
        };
      
        if(!filas){
          db.prepare(`INSERT INTO activar_desactivar(idserver, niveles) VALUES(${message.guild.id}, ${modo})`).run();
      
            if(modo == 1) {
              message.channel.send(embed0);
            }else{
              message.channel.send(embed1);
            };
        };
}}; 