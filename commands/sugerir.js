module.exports = {
    ayuda: `Te asusta el usuario.`,
    ejemplo: "sugerir usar un sistema de niveles",
    permiso : "Ninguno",
    run: async (client, message, args) => {

      const sqlite3 = require("better-sqlite3");
      const db = new sqlite3('./sadbot.sqlite3');
      const Discord = require("discord.js");
      const megadb = require("megadb");
      let sugerencias_canal = new megadb.crearDB("sugerencias_canal");

      const embednocanal = new Discord.MessageEmbed() 
      embednocanal.setColor("ORANGE")
      embednocanal.setDescription("⚠️ || El canal introducido no es valido.")
      
      
      var confinamedb = db.prepare(`SELECT canalsugerencias FROM personalizar_comandos WHERE idserver = ${message.guild.id}`).get();
      
      console.log(confinamedb)
      
      if(!confinamedb || confinamedb.canalsugerencias == null) {
      
        if(sugerencias_canal.tiene(`${message.guild.id}`)){
        let canal_id = await sugerencias_canal.obtener(`${message.guild.id}`);
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
        let canal_id = confinamedb.canalsugerencias;
        var canal = message.guild.channels.cache.get(canal_id) ;
        if(!canal) return message.channel.send(embednocanal);
      };


let msg = args.join(" ");

      const embed = new Discord.MessageEmbed() 
      .setColor("#D5BC20")
      .setTitle(`Nueva sugerencia`)
      .addField("Sugerente",message.author.tag)
      .setDescription("Estado: **Pendiente**")
      .addField("Sugerencia",msg)
      .setFooter(`Código de la sugerencia : ${Math.random().toString(36).substring(2, 15).slice(0, 6)}`)
      canal.send(embed);
      
      const embed0 = new Discord.MessageEmbed() 
      embed0.setColor("GREEN")
      embed0.setDescription(`<:tick:613820461675053066> || Se ha enviado la sugerencia.`)        
message.channel.send(embed0)
      
  }
};