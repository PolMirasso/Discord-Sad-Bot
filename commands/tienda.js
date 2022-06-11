module.exports = {
    ayuda: `Muestra la lista de roles que puedes comprar.`,
    ejemplo: "tienda",
    permiso : "Ninguno",
    run: async (client, message, args) => {
  const Discord = require("discord.js")    
  const megadb = require("megadb");
  let economia_act_des = new megadb.crearDB("economia_act_des")
  let tienda1 = new megadb.crearDB("tienda1")
  
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
    
  let datos = [];
  let num = 1;

  var color = db.prepare(`SELECT * FROM personalizar_comandos WHERE idserver = ${message.guild.id}`).get();
  if(!color || color.colorembed == null) {
    var cembed = "#7289D9";
  }else{
    var cembed = color.colorembed;
  };

  let files = db.prepare(`SELECT * FROM tienda WHERE idserver = ${message.guild.id} ORDER BY precio`).all();
    if (!files) {
        return message.channel.send("Este servidor no tiene ninguna tienda")
    };

  //db.all(`SELECT * FROM tienda WHERE idserver = ${message.guild.id} ORDER BY precio` , (err, files) => {
if(files){
    files.map(ls => {
      if(ls.idrol){
        let r = message.guild.roles.cache.get(ls.idrol)
        if(!r) {
          let eliminarrolborrado = `DELETE FROM tienda WHERE idserver = ${message.guild.id} AND idrol = ${ls.idrol}`;

          db.prepare(eliminarrolborrado, function(err) {
              if (err) return console.error(err.message)
          });
          
        };
        if(r){
       datos.push(`${num++}. Rol ${r} - Precio: ${ls.precio} monedas.`);
        };
      };
                  
     });
  
      let pages = ["Tienda del Servidor\n\n"+
                   datos.join('\n')
                  ]
      let page = 1;
  
      let embed = new Discord.MessageEmbed()
      .setColor(cembed)
      .setDescription(pages[page-1])  
      return message.channel.send(embed);
  }
  }    
};