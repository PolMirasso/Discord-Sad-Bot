module.exports = {
    ayuda: `Elimina la recompensa de niveles que seleciones.`,
    ejemplo: "eliminar-recompensa @Azul",
    permiso : "ADMINISTRATOR",

    run: async (client, message, args) => {
      
  const Discord = require("discord.js"); 
  const megadb = require("megadb");
  let niveles_act_des = new megadb.crearDB("niveles_act_des")
  let recompensasniv = new megadb.crearDB("recompensasniv")
 
  const sqlite3 = require("better-sqlite3");
  const db = new sqlite3('./sadbot.sqlite3');
  
  let onoff = db.prepare(`SELECT niveles FROM activar_desactivar WHERE idserver = ${message.guild.id}`).get();

  const embedecodes = new Discord.MessageEmbed() 
  embedecodes.setColor("RED")
  embedecodes.setDescription("🚫 || El sistema de niveles está desactivado en este servidor.")

      if (!onoff|| !onoff.niveles || onoff.niveles == null || onoff.niveles == undefined) {

      if(!niveles_act_des.tiene(`${message.guild.id}`)) {
      return message.channel.send(embedecodes);
      };
      let activar = await niveles_act_des.obtener(`${message.guild.id}`);
      if (activar == "off") {
        return message.channel.send(embedecodes).then(niveles_act_des.eliminar(message.guild.id));
      };
      if (activar == "on") {
           db.prepare(`INSERT INTO activar_desactivar(idserver, niveles) VALUES(${message.guild.id}, 1)`);
           niveles_act_des.eliminar(message.guild.id);
         };
    };

  if(onoff.niveles == 0) return message.channel.send(embedecodes);
    

        const embednoper = new Discord.MessageEmbed() 
        embednoper.setColor("RED")
        embednoper.setDescription("🚫 || No tienes el permiso ``ADMINISTRATOR`` para utilizar este comando.")

        const embednorol = new Discord.MessageEmbed() 
        embednorol.setColor("ORANGE")
        embednorol.setDescription(`⚠️ || Tiene que mencionar el rol que desea eliminar de las recompensas.`) 

        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(embednoper);  
        let rol = message.mentions.roles.first();
        if(!rol) return message.channel.send(embednorol);
        let files = db.prepare(`SELECT * FROM recompensas_niveles WHERE idserver = ${message.guild.id} AND idrol = ${rol.id}`).get();
         
        const embednoroldb = new Discord.MessageEmbed() 
        embednoroldb.setColor("ORANGE")
        embednoroldb.setDescription(`⚠️ || El rol ${rol.name} no esta en las recompensas.`) 

          if(!files) return message.channel.send(embednoroldb);
    
           db.prepare(`DELETE FROM recompensas_niveles WHERE idserver = ${message.guild.id} AND idrol = ${rol.id}`).run();
              const embed = new Discord.MessageEmbed() 
              embed.setColor("GREEN")
              embed.setDescription(`<:tick:613820461675053066> || Se acaba de eliminar el rol ${rol.name} de las recompensas`)
              message.channel.send(embed);              
}};   