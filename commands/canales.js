module.exports = {
    ayuda: "Te enseña todos los canales del servidor.",
    ejemplo: "canales",
    permiso : "MANAGE_CHANNELS",
    run: async (client, message, args) => {
      
  const Discord = require("discord.js")
  const sqlite3 = require("better-sqlite3");
  const db = new sqlite3('./sadbot.sqlite3');

  var color = db.prepare(`SELECT * FROM personalizar_comandos WHERE idserver = ${message.guild.id}`).get();
  if(!color || color.colorembed == null) {
    var cembed = "#7289D9";
  }else{
    var cembed = color.colorembed;
  };
      
  const embednoper = new Discord.MessageEmbed() 
  embednoper.setColor("RED")
  embednoper.setDescription("🚫 || No tienes el permiso ``MANAGE_CHANNELS`` para utilizar este comando.")

   if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send(embednoper);  
   
   const embederror = new Discord.MessageEmbed() 
   embederror.setColor("RED")
   embederror.setDescription("🚫 || Ha ocurrido un error.")
 
    if(message.guild.channels.size <= 0) return message.channel.send(embederror);
 
    let no_categorias = new Array();
    let categorias = new Array();

    function Ordenar(canal1, canal2) {
      if(canal2.tipo == "voice" && canal1.tipo != "voice") return -1;
      return (canal1.tipo != "voice" || canal2.tipo == "voice") ? canal1.posicion - canal2.posicion : 1;
    };
 
    message.guild.channels.cache.filter(f => f.type == "category").array().map(c => categorias.push({nombre: c.name, parseID: c.id, posicion: c.position, canales: []}));
   
    message.guild.channels.cache.filter(f => f.type != "category").array().map(c => {
      if(c.parent) {
        let index = categorias.findIndex(h => h.parseID == c.parent.id);
        if(index != -1) categorias[index].canales.push({nombre: c.name, posicion: c.position, tipo: c.type});
        return;
      };
      no_categorias.push({nombre: c.name, posicion: c.position, tipo: c.type});
    });
 
 
    let img_texto = "[💬]";
    let img_categoria = "[📂]";
    let img_voz = "[🔊]";
 
    let texto = "";
 
    no_categorias.sort(Ordenar);
 
    for(var canal of no_categorias) texto += canal.tipo == "text" ? `${img_texto} ${canal.nombre}\n` : `${img_voz} ${canal.nombre}\n`;
    if(categorias.length > 0) {
      categorias.sort(Ordenar);
      for(var categoria of categorias) { 
        texto += `${img_categoria} ${categoria.nombre}\n`;
        categoria.canales.sort(Ordenar);
        for(var canal of categoria.canales) texto += canal.tipo == "text" ? `    ${img_texto} ${canal.nombre}\n` : `    ${img_voz} ${canal.nombre}\n`;  
      };
    };
 
    let embed = new Discord.MessageEmbed()
    embed.setColor(cembed)
    embed.setDescription(texto.length > 0 ? "```"+texto+"```" : "No datos.")
    embed.setTitle(`Estructura del servidor ${message.guild.name}`)
    return message.channel.send(embed);
 
  }};