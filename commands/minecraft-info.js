module.exports = {
    ayuda: `Te da informacion sobre un servidor de minecraft.`,
    ejemplo: "minecraft-info mc.hypixel.net",
    permiso : "Ninguno",
    run: async (client, message, args) => {
   const Discord = require("discord.js")
   const request = require('request'); 
   const sqlite3 = require("better-sqlite3");
   const db = new sqlite3('./sadbt.sqlite3');
 
    let text = args.join(" ");

    var color = db.prepare(`SELECT * FROM personalizar_comandos WHERE idserver = ${message.guild.id}`).get();
    if(!color || color.colorembed == null) {
      var cembed = "#7289D9";
    }else{
      var cembed = color.colorembed;
    };

            
      const embednoip = new Discord.MessageEmbed() 
      embednoip.setColor("ORANGE")
      embednoip.setDescription("⚠️ || introduzca la IP del servidor.")
      
     if(!text) return message.channel.send(embednoip);
    let pingURL = `https://api.minetools.eu/ping/${text}`;  
    let icon = `https://api.minetools.eu/favicon/${text}`;
    request(pingURL, function(err, resp, body){
      if(err) return console.log(err.message);
      body = JSON.parse(body);
      if(body.error) return message.channel.send('Servidor `'+ text +'` no esta online.')
      let descReplace = /§\w/g;
      
      const embedServer = new Discord.MessageEmbed()
        .setTitle('Información del servidor '+ text)
        .setColor(cembed)
        .addField('Descripción:', body.description.replace(descReplace, ""))
        .addField('Latencia:', body.latency, true)
        .setThumbnail(icon)
        .addField('Jugadores:', body.players.online+'/'+body.players.max, true)
        .addField('Versiones:', body.version.name +' (Protocolo: '+ body.version.protocol+ ')')    
      message.channel.send(embedServer);
      
    })
  }
};