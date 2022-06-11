module.exports = {
    ayuda: `Reinicias la economia del servidor.`,
    ejemplo: "reiniciar-economia",
    run: async (client, message, args) => {
const Discord = require("discord.js")    
const megadb = require("megadb");
  let economia_act_des = new megadb.crearDB("economia_act_des")
  let economia = new megadb.crearDB("economia");
  
  const sqlite3 = require("better-sqlite3");
  const db = new sqlite3('./sadbot.sqlite3');
  
  const embednoper = new Discord.MessageEmbed() 
  embednoper.setColor("RED")
  embednoper.setDescription("🚫 || No tienes el permiso de ``ADMINISTRATOR`` para utilizar este comando.")

  const embedecodes = new Discord.MessageEmbed() 
  embedecodes.setColor("RED")
  embedecodes.setDescription("🚫 || La economía está desactivada en este servidor.")

      
      if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(embednoper);

      let onoff = db.prepare(`SELECT economia FROM activar_desactivar WHERE idserver = ${message.guild.id}`).get();

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
   
    economia.eliminar(message.guild.id);
    db.prepare(`DELETE FROM economia WHERE idserver = ${message.guild.id}`).run()
    
    const embed1 = new Discord.MessageEmbed() 
     embed1.setColor("GREEN")
     embed1.setDescription(`<:tick:613820461675053066> || Se ha reiniciado la economia del servidor.`)
    return message.channel.send(embed1)  
}};