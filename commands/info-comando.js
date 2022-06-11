module.exports = {
    ayuda: `Te da informacion sobre un comando.`,
    ejemplo: "info-Comando ban",
    permiso : "Ninguno",

    run: async (client, message, args) => {
  const Discord = require("discord.js");
  const sqlite3 = require("better-sqlite3");
  const db = new sqlite3('./sadbot.sqlite3');
  
var color = db.prepare(`SELECT * FROM personalizar_comandos WHERE idserver = ${message.guild.id}`).get();
if(!color || color.colorembed == null) {
  var cembed = "#7289D9";
}else{
  var cembed = color.colorembed;
};


  var embednocomando = new Discord.MessageEmbed() 
  embednocomando.setColor("ORANGE")
  embednocomando.setDescription(`⚠️ || No se ha encontrado el comando.`)

  var selectprefix = db.prepare(`SELECT prefix FROM personalizar_comandos WHERE idserver = ${message.guild.id}`).get();
  console.log(selectprefix)
  
  if (!selectprefix|| !selectprefix.prefix || selectprefix.prefix == null || selectprefix.prefix == undefined) {
    var prefix = "??";
  }else{
   var prefix = selectprefix.prefix;
  };
  
        try { 
          
      let x = args.join(" ");
      var nocomando = new Discord.MessageEmbed() 
      nocomando.setColor("ORANGE")
      nocomando.setDescription(`⚠️ || Introduzca el comando.`)
      if(!x) return message.channel.send(nocomando)

      let ayudax = require(`../commands/${x.toLowerCase()}.js`);

      if (!ayudax) return message.channel.send(embednocomando);
    
const embed = new Discord.MessageEmbed() 
      .setTitle(`Comando ${args.join(" ")}`)
      .setColor(cembed)
      .setDescription(`**🛑 | Ayuda:** ${ayudax.ayuda} \n **🚦| Permisos:** ${ayudax.permiso}  \n **💾| Ejemplo:** ${prefix}${ayudax.ejemplo} `)
      .setFooter(client.user.tag ,client.user.avatarURL)
     return message.channel.send(embed);
  } catch (e) {
       return message.channel.send(embednocomando);
  };
  }
};


