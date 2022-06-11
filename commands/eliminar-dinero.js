module.exports = {
    ayuda: `Eliminas monedas de un usuario.`,
    ejemplo: "eliminar @User#0001 200",
    permiso : "ADMINISTRATOR",

    run: async (client, message, args) => {
      
  const Discord = require("discord.js")    
  const megadb = require("megadb");
  let economia_act_des = new megadb.crearDB("economia_act_des")
  let economia = new megadb.crearDB("economia");
  
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
      if (activar == "off") {
        return message.channel.send(embedecodes).then(economia_act_des.eliminar(message.guild.id));
      };
      if (activar == "on") {
           db.prepare(`INSERT INTO activar_desactivar(idserver, economia) VALUES(${message.guild.id}, 1)`);
           economia_act_des.eliminar(message.guild.id);
         };
    };

  if(onoff.economia == 0) return message.channel.send(embedecodes);
    

  const embednoper = new Discord.MessageEmbed() 
  embednoper.setColor("RED")
  embednoper.setDescription("🚫 || No tienes el permiso ``ADMINISTRATOR`` para utilizar este comando.")


  if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(embednoper);  
  let usuario = message.mentions.members.first();
  if(!usuario) usuario = message.guild.members.cache.get(args[0]);

  const embednousuario = new Discord.MessageEmbed() 
  embednousuario.setColor("ORANGE")
  embednousuario.setDescription("⚠️ || Menciona al usuario o pon su ID.")

  if(!usuario) return message.channel.send(embednousuario);
  usuario = usuario.id;

  const embednomonedas = new Discord.MessageEmbed() 
  embednomonedas.setColor("ORANGE")
  embednomonedas.setDescription("⚠️ || Necesitas ingresar la cantidad de monedas que quieres eliminar.")
  
  if(!args[1] || isNaN(args[1])) return message.channel.send(embednomonedas);   
  let cantidad = parseInt(args[1]);

  let selectmencion = db.prepare(`SELECT * FROM economia WHERE idusuario = ${usuario} AND idserver= ${message.guild.id}`).get();

    if (!selectmencion) {

     //   if(!economia.tiene(`${message.guild.id}.${usuario}`)) {
       //   let insert = `INSERT INTO economia(idserver, idusuario, dinero) VALUES(${message.guild.id},${usuario}, 0)`;
       //   db.run(insert, function(err) {
       //       if (err) return console.error(err.message);
       //     });
     //   };
      
        if(economia.tiene(`${message.guild.id}.${usuario}`)) {
          var dinerojson = await economia.obtener(`${message.guild.id}.${usuario}`)
       //     let insert = `INSERT INTO economia(idserver, idusuario, dinero) VALUES(${message.guild.id},${usuario}, ${dinerojson})`;    
       //     db.run(insert, function(err) {
       //       if (err) return console.error(err.message)
       //     });
        await economia.eliminar(`${message.guild.id}.${usuario}`);
        };
    };

    if(selectmencion){
//      let monedassumamencion = filas.dinero - cantidad
        db.prepare(`UPDATE economia SET dinero = ${selectmencion.dinero - cantidad} WHERE idusuario = ${usuario} AND idserver= ${message.guild.id}`).run();
    }else{
      if(!dinerojson) dinerojson = 0
      db.prepare(`INSERT INTO economia(idserver, idusuario, dinero) VALUES(${message.guild.id},${usuario}, ${dinerojson - cantidad})`).run();    
    };


    let embed = new Discord.MessageEmbed()  
    .setAuthor(message.author.username +"#"+ message.author.discriminator, message.author.avatarURL)
    .setColor(`#17FB02`)
    .setDescription(`Se han eliminado ${cantidad} monedas al usuario ${message.guild.members.cache.get(usuario).user.username}!`)
    return message.channel.send(embed);
  }
};