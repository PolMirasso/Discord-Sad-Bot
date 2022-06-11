module.exports = {
    ayuda: `Ves todas las recompensas que puedes obtener y a que nivel.`,
    ejemplo: "recompensas",
    permiso : "Ninguno",
    run: async (client, message, args) => {
  const Discord = require("discord.js");
  const megadb = require("megadb");
let niveles_act_des = new megadb.crearDB("niveles_act_des")
  let recompensasniv = new megadb.crearDB("recompensasniv")
  const sqlite3 = require("better-sqlite3");
  const db = new sqlite3('./sadbot.sqlite3');
  
      
  const embednoper = new Discord.MessageEmbed() 
  embednoper.setColor("RED")
  embednoper.setDescription("🚫 || No tienes el permiso de ``ADMINISTRATOR`` para utilizar este comando.")

      if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(embednoper);

      let onoff = db.prepare(`SELECT * FROM activar_desactivar WHERE idserver = ${message.guild.id}`).get();
  
      const embedecodes = new Discord.MessageEmbed() 
      embedecodes.setColor("RED")
      embedecodes.setDescription("🚫 || El sistema de niveles está desactivado en este servidor.")

      if (!onoff|| !onoff.niveles || onoff.niveles == null || onoff.niveles == undefined) {

        if(!niveles_act_des.tiene(`${message.guild.id}`)) {
        return message.channel.send(embedecodes);
        };
        let activar = await niveles_act_des.obtener(`${message.guild.id}`);
        if (activar == "off") return message.channel.send(embedecodes).then(niveles_act_des.eliminar(message.guild.id));
        if (activar == "on") {
          db.prepare(`INSERT INTO activar_desactivar(idserver, niveles) VALUES(${message.guild.id}, 1)`);
          niveles_act_des.eliminar(message.guild.id)
         };
      };
      
      if(onoff.niveles == 0) return message.channel.send(embedecodes);
      
        let datos = [];
        let num = 1;
    
        let files = db.prepare(`SELECT * FROM recompensas_niveles WHERE idserver = ${message.guild.id} ORDER BY nivel`).all()
    
          files.map(ls => { 
            if(ls.idrol){
              let r = message.guild.roles.cache.get(ls.idrol)
              if(!r) {
                db.prepare(`DELETE FROM recompensas_niveles WHERE idserver = ${message.guild.id} AND idrol = ${ls.idrol}`).run();
              };
              if(r){
            datos.push(`${num++}. Rol ${r} - Nivel ${ls.nivel}`);
              };
            };
                        
          });
        
            let pages = ["Lista de premios\n\n"+
                        datos.join('\n')
                        ]
            let page = 1;
        
            let embed = new Discord.MessageEmbed()
            .setColor("#7289D9")
            .setDescription(pages[page-1])  
            return message.channel.send(embed);
}};