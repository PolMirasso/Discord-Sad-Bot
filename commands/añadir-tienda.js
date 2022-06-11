module.exports = {
    ayuda: "Añades un rol a la tienda.",
    ejemplo: "añadir-tienda @Azul 200",
    uso : "añadir-tienda (MencionRol) (Precio)",
    permiso : "ADMINISTRATOR",
    run: async (client, message, args) => {
          
  const Discord = require("discord.js")    
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
      if (activar == "off") return message.channel.send(embedecodes).then(economia_act_des.eliminar(message.guild.id));
      if (activar == "on") {
        db.prepare(`INSERT INTO activar_desactivar(idserver, economia) VALUES(${message.guild.id}, 1)`);
        economia_act_des.eliminar(message.guild.id);
       };
    };
    

    if(onoff.economia == 0) return message.channel.send(embedecodes);
    

    const embednoper = new Discord.MessageEmbed() 
    embednoper.setColor("RED")
    embednoper.setDescription("🚫 || No tienes el permiso de ``ADMINISTRATOR`` para utilizar este comando.")
  

  if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(embednoper);  
  let rol = message.mentions.roles.first();

  const embedrolmen = new Discord.MessageEmbed() 
  embedrolmen.setColor("ORANGE")
  embedrolmen.setDescription("⚠️ || Tienes que mencionar el rol para añadir-lo a la tienda.")

  if(!rol) return message.channel.send(embedrolmen);
  let precio = parseInt(args[1]);

  const embednoprecio = new Discord.MessageEmbed() 
  embednoprecio.setColor("ORANGE")
  embednoprecio.setDescription("⚠️ || Tienes que indicar el precio del rol.")

  if(!precio) return message.channel.send(embednoprecio);
  let addtienda = db.prepare(`SELECT * FROM tienda WHERE idserver = ${message.guild.id} AND idrol = ${rol.id}`).get();
    if(addtienda) return message.channel.send(`El rol ${rol.name} ya esta en la tienda.`);
      db.prepare(`INSERT INTO tienda (idserver, idrol, precio) VALUES('${message.guild.id}', '${rol.id}', '${precio}')`).run();

      const embedrolañadido = new Discord.MessageEmbed() 
      embedrolañadido.setColor("GREEN")
      embedrolañadido.setDescription(`<:tick:613820461675053066> || El rol **${rol.name}** se ha añadido a la tienda por ${precio} monedas.`)
        message.channel.send(embedrolañadido);
}};   