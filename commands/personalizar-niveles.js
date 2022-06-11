module.exports = {
    ayuda: ` Personalizas el texto que se envía al subir de nivel. ({usuario} Para el usuario, {nivel} Para el nivel y {servidor} Para el nombre del servidor) `,
    ejemplo: "personalizar-niveles #niveles , {usuario} ha subido a {nivel}",
    permiso : "ADMINISTRATOR",

    run: async (client, message, args) => {
  const Discord = require("discord.js")
  const megadb = require("megadb");
  let textoniveles = new megadb.crearDB("textoniveles");
  let niveles_act_des = new megadb.crearDB("niveles_act_des");
  const sqlite3 = require("better-sqlite3");
  const db = new sqlite3('./sadbot.sqlite3');

      
      if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(`No tienes permisos suficientes.`);
      
      let onoff = db.prepare(`SELECT * FROM activar_desactivar WHERE idserver = ${message.guild.id}`).get();

        
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
      
      const embednoa0 = new Discord.MessageEmbed() 
      embednoa0.setColor("ORANGE")
      embednoa0.setDescription("⚠️ || Menciona el canal donde quieres que se envie el mensaje de subir de nivel o predeterminado para poner el canal por defecto.");

      let canal = message.mentions.channels.first();
      let a0 = args[0];
      if(!a0) a0 = "a";
      if(!(a0.toLowerCase() == "predeterminado") && !(canal)) return message.channel.send(embednoa0);

      let splitmsg = args.join(" ").split(",");
      let texto1 = splitmsg[1];

      const embednotexto = new Discord.MessageEmbed() 
      embednotexto.setColor("ORANGE")
      embednotexto.setDescription("⚠️ || Introduzca el texto para los niveles.");

      if(!texto1) return message.channel.send(embednotexto); 

      let filas = db.prepare(`SELECT * FROM personalizar_comandos WHERE idserver = ${message.guild.id}`).get();

        if(filas){

        if(canal) {
          db.prepare(`UPDATE personalizar_comandos SET mensaje_niv = '${texto1}' WHERE idserver = ${message.guild.id}`).run();
          db.prepare(`UPDATE personalizar_comandos SET canal_niv = ${canal.id} WHERE idserver = ${message.guild.id}`).run();

      //    var canalniv = `UPDATE personalizar_comandos SET canal_niv = ${canal.id} WHERE idserver = ${message.guild.id}`;
          var mensaje = `Ahora cuando suvas de nivel se enviara a ${canal}.`;

            const embed = new Discord.MessageEmbed() 
            embed.setColor("GREEN")
            embed.setDescription(`<:tick:613820461675053066> || Ahora cuando suvas de nivel se enviara a ${canal}.`)
  

          return message.channel.send(embed);

        };

        if (a0.toLowerCase() == "predeterminado") { 
          db.prepare(`UPDATE personalizar_comandos SET canal_niv = ${null} WHERE idserver = ${message.guild.id}`).run();
          db.prepare(`UPDATE personalizar_comandos SET mensaje_niv = '${texto1}' WHERE idserver = ${message.guild.id}`).run();

        //  var canalniv = `UPDATE personalizar_comandos SET canal_niv = ${null} WHERE idserver = ${message.guild.id}`;
          var mensaje = "Ahora cuando suvas de nivel se enviara al canal predeterminado.";

          const embed = new Discord.MessageEmbed() 
          embed.setColor("GREEN")
          embed.setDescription(`<:tick:613820461675053066> || Ahora cuando suvas de nivel se enviara al canal predeterminado.`)

          return message.channel.send(embed);

        };

   //     db.run(`UPDATE personalizar_comandos SET mensaje_niv = '${texto1}' WHERE idserver = ${message.guild.id}`);


        };
        
        if(!filas){
          if(canal) {
            db.prepare(`INSERT INTO personalizar_comandos(idserver, canal_niv, mensaje_niv) VALUES(${message.guild.id}, ${canal.id}, "${texto1}")`).run();

//            var canalniv = `INSERT INTO personalizar_comandos(idserver, canal_niv) VALUES(${message.guild.id}, ${canal.id})`;
            const embed = new Discord.MessageEmbed() 
            embed.setColor("GREEN")
            embed.setDescription(`<:tick:613820461675053066> || Ahora cuando suvas de nivel se enviara a ${canal}.`)
  
            var mensaje = `Ahora cuando suvas de nivel se enviara a ${canal}.`;
            return message.channel.send(embed);

          };
  
          if (a0.toLowerCase() == "predeterminado") {
            db.prepare(`INSERT INTO personalizar_comandos(idserver, canal_niv, mensaje_niv) VALUES(${message.guild.id}, ${null}, "${texto1}")`).run();

            
            const embed = new Discord.MessageEmbed() 
            embed.setColor("GREEN")
            embed.setDescription(`<:tick:613820461675053066> || Ahora cuando suvas de nivel se enviara al canal predeterminado.`)
  
        //    var canalniv = `INSERT INTO personalizar_comandos(idserver, canal_niv) VALUES(${message.guild.id}, ${null})`;
            return message.channel.send(embed);

          };
          
//          db.run(`INSERT INTO personalizar_comandos(idserver, canal_niv, mensaje_niv) VALUES(${message.guild.id}, "${texto1}")`);

          };
/*
        db.run(canalniv, function(err) {
          if (err) return console.error(err.message);
          return message.channel.send(mensaje);
        }); */
   
}};