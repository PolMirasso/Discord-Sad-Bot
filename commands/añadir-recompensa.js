module.exports = {
    ayuda: "Añades un premio por llegar a cierto nivel.",
    ejemplo: "añadir-recompensa @Niv10 10",
    uso : "añadir-recompensa (MencionRol) (Nivel)",
    permiso : "ADMINISTRATOR",
    run: async (client, message, args) => {
      
  const Discord = require("discord.js")    
  const megadb = require("megadb");
  let niveles_act_des = new megadb.crearDB("niveles_act_des")

  const sqlite3 = require("better-sqlite3");
  const db = new sqlite3('./sadbot.sqlite3');
      
  const embednoper = new Discord.MessageEmbed() 
  embednoper.setColor("RED")
  embednoper.setDescription("🚫 || No tienes el permiso de ``ADMINISTRATOR`` para utilizar este comando.")

      if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(embednoper);

      let onoff = db.prepare(`SELECT niveles FROM activar_desactivar WHERE idserver = ${message.guild.id}`).get();
  
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
      
        let rol = message.mentions.roles.first();

        const embedrolmen = new Discord.MessageEmbed() 
        embedrolmen.setColor("ORANGE")
        embedrolmen.setDescription("⚠️ || Tienes que mencionar el rol para añadirlo al distema de recompesas.")

        if(!rol) return message.channel.send(embedrolmen);

        const embednoniv = new Discord.MessageEmbed() 
        embednoniv.setColor("ORANGE")
        embednoniv.setDescription("⚠️ || Tienes que indicar el nivel que quieras que se añada el rol.")

        if(!args[1] || isNaN(args[1])) return message.channel.send(embednoniv);
        let nivel = parseInt(args[1]);

        const embedniv1 = new Discord.MessageEmbed() 
        embedniv1.setColor("ORANGE")
        embedniv1.setDescription("⚠️ || Tienes que ingresar un nivel superior a 1.")

        if(nivel <= 1) return message.channel.send(embedniv1);
        let selecionarrol = db.prepare(`SELECT * FROM recompensas_niveles WHERE idserver = ${message.guild.id} AND idrol = ${rol.id}`).get();

        const embedselect = new Discord.MessageEmbed() 
        embedselect.setColor("ORANGE")
        embedselect.setDescription(`⚠️ || El rol ${rol.name} ya esta en en el sistema de recompensas.`)

        if(selecionarrol == undefined) {

          const embedrolañadido = new Discord.MessageEmbed() 
          embedrolañadido.setColor("GREEN")
          embedrolañadido.setDescription(`<:tick:613820461675053066> || El rol **${rol.name}** se agregara a los usuarios cuando alcancen el nivel ${nivel}.`)
              db.prepare(`INSERT INTO recompensas_niveles(idserver, idrol, nivel) VALUES(${message.guild.id}, ${rol.id}, ${nivel})`).run();
                message.channel.send(embedrolañadido);
        }else{
          return message.channel.send(embedselect);

        };
}};   