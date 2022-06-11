module.exports = {
    ayuda: `Acepta o denega las sugerencias en tu servidor.`,
    ejemplo: "contestar-sugerencia aceptar/denegar CodigoDeLaSugerencia",
    permiso : "ADMINISTRATOR",

    run: async (client, message, args) => {
      const sqlite3 = require("better-sqlite3");
      const db = new sqlite3('./sadbot.sqlite3');
      const Discord = require("discord.js");

      const embednoper = new Discord.MessageEmbed() 
      embednoper.setColor("RED")
      embednoper.setDescription("🚫 || No tienes el permiso ``ADMINISTRATOR`` para utilizar este comando.")
    
if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(embednoper);  

if(message.author.id !== "445334027512315915") return 

  var canal_id = "644626968477827112"
  var canal = message.guild.channels.cache.get(canal_id);


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


    if(!key) return message.channel.send(embednokey);
    if(!estado) return message.channel.send(embednoestado);
    if(!motivo) motivo = "No especificado."
    if(estado == "aceptar") {
      message.guild.channels.cache.get(canal_id).messages.fetch({limit: 100}).then(async (msg) => {
        const filtro = await msg.filter(e => e.embeds.length > 0);
        const mensaje = filtro.find(x => x.embeds[0].footer.text == ("Código de la sugerencia : "+key));
        if(!mensaje) return message.channel.send(embednoencontrado);
        if (mensaje){ 
          const embed = new Discord.MessageEmbed(mensaje.embeds[0])
          .setColor('GREEN')
          .setDescription("Estado: **Aceptada**")
          .addField("Motivo",motivo)
          mensaje.edit(embed);
         };
        });
    }else if(estado == "denegar"){
      message.guild.channels.cache.get(canal_id).messages.fetch({limit: 100}).then(async (msg) => {
        const filtro = await msg.filter(e => e.embeds.length > 0);
        console.log(filtro.find(x => x.embeds[0]))
        const mensaje = filtro.find(x => x.embeds[0].footer.text == ("Código de la sugerencia : "+key));
        if(!mensaje) return message.channel.send(embednoencontrado);
        if (mensaje){ 
          const embed = new Discord.MessageEmbed(mensaje.embeds[0])
          .setColor('RED')
          .setDescription("Estado: **Denegada**")
          .addField("Motivo",motivo)
          mensaje.edit(embed);
         };
        });
    }else{
      const embederror = new Discord.MessageEmbed() 
      embederror.setColor("RED")
      embederror.setDescription("🚫 || Ha ocurrido un error comprueba que has puesto bien los datos.")
      message.channel.send(embederror);
        };
    }     
};