module.exports = {
    ayuda: `Elimina un rol de la tienda.`,
    ejemplo: "eliminar-tienda @Azul",
    permiso : "ADMINISTRATOR",

    run: async (client, message, args) => {
      
  const Discord = require("discord.js");
  const megadb = require("megadb");
  let economia_act_des = new megadb.crearDB("economia_act_des")
  
  const sqlite3 = require("better-sqlite3");
  const db = new sqlite3('./sadbot.sqlite3');
    
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
 
    const embednoper = new Discord.MessageEmbed() 
    embednoper.setColor("RED")
    embednoper.setDescription("🚫 || No tienes el permiso ``ADMINISTRATOR`` para utilizar este comando.")

  if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(embednoper);  
  let rol = message.mentions.roles.first();

  const embednorol = new Discord.MessageEmbed() 
  embednorol.setColor("ORANGE")
  embednorol.setDescription(`⚠️ || Tiene que mencionar el rol que desea eliminar de las recompensas.`) 

  if(!rol) return message.channel.send(embednorol);  
  let files = db.prepare(`SELECT * FROM tienda WHERE idserver = ${message.guild.id} AND idrol = ${rol.id}`).get();
    
  const embednoroldb = new Discord.MessageEmbed() 
  embednoroldb.setColor("ORANGE")
  embednoroldb.setDescription(`⚠️ || El rol ${rol.name} no esta en la tienda.`) 

    if(!files) return message.channel.send(embednoroldb);

      db.prepare(`DELETE FROM tienda WHERE idserver = ${message.guild.id} AND idrol = ${rol.id}`).run();

      const embed = new Discord.MessageEmbed() 
      embed.setColor("GREEN")
      embed.setDescription(`<:tick:613820461675053066> || Se acaba de eliminar el rol ${rol.name} de la tienda.`) 
  
        message.channel.send(embed);
}};