module.exports = {
    ayuda: `Ves la cantidad de dinero que tienes.`,
    ejemplo: "dinero @User#0001",
    permiso : "Ninguno",
    run: async (client, message, args) => {
      
  const Discord = require("discord.js");
  const megadb = require("megadb");
  let economia_act_des = new megadb.crearDB("economia_act_des")
  let economia = new megadb.crearDB("economia");
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
    
    let usuario = message.mentions.members.first();
    if(!usuario) usuario = message.guild.members.cache.get(args[0])
    if(!usuario) usuario = message.author;

    let select = db.prepare(`SELECT * FROM economia WHERE idusuario = ${usuario.id} AND idserver= ${message.guild.id} `).get();
    var color = db.prepare(`SELECT * FROM personalizar_comandos WHERE idserver = ${message.guild.id}`).get();
    if(!color || color.colorembed == null) {
      var cembed = "#7289D9";
    }else{
      var cembed = color.colorembed;
    };

        if (!select) {

            if(economia.tiene(`${message.guild.id}.${usuario.id}`)) {
                var dinerojson = await economia.obtener(`${message.guild.id}.${usuario.id}`).catch(err => message.channel.send("Hubo un error, inténtelo nuevamente."));
                db.prepare(`INSERT INTO economia(idserver, idusuario, dinero) VALUES(${message.guild.id},${usuario.id}, ${dinerojson})`).run(); 
                await economia.eliminar(`${message.guild.id}.${usuario.id}`);
            };

 
 
        if(!dinerojson) dinerojson = 0
        
            const embed = new Discord.MessageEmbed()
            .setColor(cembed)
            .setDescription(`**${usuario.username}** tiene ${dinerojson} monedas!`)
          return message.channel.send(embed);    
        };

        if (select) {
        if(usuario == message.mentions.members.first()) usuario = usuario.user
        if(usuario == message.guild.members.cache.get(args[0])) usuario = usuario.user

        const embed = new Discord.MessageEmbed()
          .setColor(cembed)
          .setDescription(`**${usuario.username}** tiene ${select.dinero} monedas!`)
        return message.channel.send(embed);    
        };
}};