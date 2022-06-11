module.exports = {
    ayuda: `Acepta o denega las sugerencias en tu servidor.`,
    ejemplo: "contestar-sugerencia aceptar/denegar CodigoDeLaSugerencia",
    permiso : "ADMINISTRATOR",

    run: async (client, message, args) => {
      const sqlite3 = require("better-sqlite3");
      const db = new sqlite3('./sadbot.sqlite3');
      const Discord = require("discord.js");
      const megadb = require("megadb");
      let sugerencias_canal = new megadb.crearDB("sugerencias_canal");

      const embednoper = new Discord.MessageEmbed() 
      embednoper.setColor("RED")
      embednoper.setDescription("🚫 || No tienes el permiso ``ADMINISTRATOR`` para utilizar este comando.")
    
if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(embednoper);  

            const embednocanal = new Discord.MessageEmbed() 
    embednocanal.setColor("ORANGE")
    embednocanal.setDescription("⚠️ || Para usar este comando, un administrador tiene que definir un canal de sugerencias con ``canal-sugerencias``123.")

      
var confinamedb = db.prepare(`SELECT canalsugerencias FROM personalizar_comandos WHERE idserver = ${message.guild.id}`).get();
if(!confinamedb || confinamedb.canalsugerencias == null) {


  
  if(sugerencias_canal.tiene(`${message.guild.id}`)){
  var canal_id = await sugerencias_canal.obtener(`${message.guild.id}`);
  var canal = message.guild.channels.cache.get(canal_id);
  if(!canal) return message.channel.send(embednocanal);
  db.prepare(`INSERT INTO personalizar_comandos(idserver, canalsugerencias) VALUES(${message.guild.id}, ${canal_id})`);
  }else{
    const embednocanal2 = new Discord.MessageEmbed() 
    embednocanal2.setColor("ORANGE")
    embednocanal2.setDescription("⚠️ || Para usar este comando, un administrador tiene que definir un canal de sugerencias con ``canal-sugerencias``.")

    return message.channel.send(embednocanal2);
  }
}else{
  var canal_id = confinamedb.canalsugerencias;
  var canal = message.guild.channels.cache.get(canal_id) ;
  if(!canal) return message.channel.send(embednocanal);
};
/*
    const megadb = require("megadb");
    let sugerencias_canal = new megadb.crearDB("sugerencias_canal")
    if(!sugerencias_canal.tiene(`${message.guild.id}`)) return message.channel.send("Para usar este comando, un administrador tiene que definir un canal de sugerencias con ``canal-sugerencias``.");
    let canal_id = await sugerencias_canal.obtener(`${message.guild.id}`);
    let canal = message.guild.channels.get(canal_id) ;
    if(!canal) return message.channel.send("No se encuentra el canal de sugerencias");
 //   const suggestManager = new discordSuggest(message, canal_id, "ES")
      */

    let key = args[0];
    let estado = args[1];
    let motivo = args.slice(2).join(' ');

    const embednokey = new Discord.MessageEmbed() 
    embednokey.setColor("ORANGE")
    embednokey.setDescription("⚠️ || Introduzca el código de la sugerencia.")

    const embednoestado = new Discord.MessageEmbed() 
    embednoestado.setColor("ORANGE")
    embednoestado.setDescription("⚠️ || Introduzca el estado de la sugerencia.")

    const embednoencontrado = new Discord.MessageEmbed() 
    embednoencontrado.setColor("ORANGE")
    embednoencontrado.setDescription("⚠️ || No se encuentra ninguna sugerencia con ese código.")

    const embederrorkey = new Discord.MessageEmbed() 
    embederrorkey.setColor("ORANGE")
    embederrorkey.setDescription("⚠️ || El codigo de la sugerencia no es valido.")


    if(!key) return message.channel.send(embednokey);
    if(!estado) return message.channel.send(embednoestado);
    if(!motivo) motivo = "No especificado."
    if(estado == "aceptar") {
      message.guild.channels.cache.get(canal_id).messages.fetch({limit: 100}).then(async (msg) => {
        const filtro = await msg.filter(e => e.embeds.length > 0);
        
          const mensaje = filtro.find(x => x.embeds[0].footer.text == ("Código de la sugerencia : "+key))
        if(!mensaje) return message.channel.send(embednoencontrado);
        if (mensaje){ 
          const embed = new Discord.MessageEmbed(mensaje.embeds[0])
          .setColor('GREEN')
          .setDescription("Estado: **Aceptada**")
          .addField("Motivo",motivo)
          mensaje.edit(embed);
          
          const embed0 = new Discord.MessageEmbed() 
          embed0.setColor("GREEN")
          embed0.setDescription(`<:tick:613820461675053066> || Se ha aceptado la sugerencia.`)
        
          message.channel.send(embed0);
          
         };
        }).catch((err) => {return message.channel.send(embederrorkey)})
      
    }else if(estado == "denegar"){
      message.guild.channels.cache.get(canal_id).messages.fetch({limit: 100}).then(async (msg) => {
        const filtro = await msg.filter(e => e.embeds.length > 0);
        const mensaje = filtro.find(x => x.embeds[0].footer.text == ("Código de la sugerencia : "+key));
        if(!mensaje) return message.channel.send(embednoencontrado);
        if (mensaje){ 
          const embed = new Discord.MessageEmbed(mensaje.embeds[0])
          .setColor('RED')
          .setDescription("Estado: **Denegada**")
          .addField("Motivo",motivo)
          mensaje.edit(embed);
          
          const embed0 = new Discord.MessageEmbed() 
          embed0.setColor("GREEN")
          embed0.setDescription(`<:tick:613820461675053066> || Se ha denegado la sugerencia.`)
        
          message.channel.send(embed0);
        };
        }).catch((err) => {return message.channel.send(embederrorkey)})
    }else{
      const embederror = new Discord.MessageEmbed() 
      embederror.setColor("RED")
      embederror.setDescription("🚫 || Ha ocurrido un error comprueba que has puesto bien los datos.")
      message.channel.send(embederror);
        };
    }     
};