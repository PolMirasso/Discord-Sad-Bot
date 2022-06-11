module.exports = {
    ayuda: `Das cierta cantidad de monedas a otro usuario.`,
    ejemplo: "dar @User#0001 200",
    permiso : "Ninguno",
    run: async (client, message, args) => {
      
  const Discord = require("discord.js");
  const megadb = require("megadb");
  let economia = new megadb.crearDB("economia");
  let economia_act_des = new megadb.crearDB("economia_act_des");

  const sqlite3 = require("better-sqlite3");
  const db = new sqlite3('./sadbot.sqlite3');
    
  let onoff = db.prepare(`SELECT economia FROM activar_desactivar WHERE idserver = ${message.guild.id}`).get();

  const embedecodes = new Discord.MessageEmbed()
  embedecodes.setColor("RED")
  embedecodes.setDescription("🚫 || La economía está desactivada en este servidor.")

    if (!onoff || onoff.economia == null || onoff.economia == undefined) {

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
 

  let usuario = message.mentions.members.first();
  if(!usuario) usuario = message.guild.members.cache.get(args[0]);

  const embeduser = new Discord.MessageEmbed() 
  embeduser.setColor("ORANGE")
  embeduser.setDescription("⚠️ || No te puedes dar dinero a ti.")

  if (usuario == message.author.id) return message.channel.send(embeduser);

  const embednousuario = new Discord.MessageEmbed() 
  embednousuario.setColor("ORANGE")
  embednousuario.setDescription("⚠️ || Menciona al usuario o pon su ID.")

  if(!usuario) return message.channel.send(embednousuario);
  usuario = usuario.id;

  const embednomonedas = new Discord.MessageEmbed() 
  embednomonedas.setColor("ORANGE")
  embednomonedas.setDescription("⚠️ || Necesitas ingresar la cantidad de monedas.")


  if(!args[1] || isNaN(args[1])) return message.channel.send(embednomonedas);
  let cantidad = parseInt(args[1]);

  const embedmonedasneg = new Discord.MessageEmbed() 
  embedmonedasneg.setColor("ORANGE")
  embedmonedasneg.setDescription("⚠️ || La cantidad minima que puedes dar es 1 moneda.")

  if(cantidad < 1) return message.channel.send(embedmonedasneg);

  let select = db.prepare(`SELECT * FROM economia WHERE idusuario = ${message.author.id} AND idserver= ${message.guild.id} `).get();
  let selectmencion = db.prepare(`SELECT * FROM economia WHERE idusuario = ${usuario} AND idserver= ${message.guild.id} `).get();


  if (!selectmencion || selectmencion.idusuario == null || selectmencion.idusuario == undefined) {

/*
      if(!economia.tiene(`${message.guild.id}.${usuario}`)) {
        let insert = `INSERT INTO economia(idserver, idusuario, dinero) VALUES(${message.guild.id},${usuario}, 0)`;    
        db.run(insert, function(err) {
            if (err) return console.error(err.message);
           });           
      };
    */
      if(economia.tiene(`${message.guild.id}.${usuario}`)) {
         var dinerojson = await economia.obtener(`${message.guild.id}.${usuario}`)

//          let insert = `INSERT INTO economia(idserver, idusuario, dinero) VALUES(${message.guild.id},${usuario}, ${dinerojson})`;    
  //        db.run(insert, function(err) {
    //        if (err) return console.error(err.message)
      //    });
      economia.eliminar(`${message.guild.id}.${usuario}`);
      };
    };
    
    const embednomonedasuser = new Discord.MessageEmbed() 
    embednomonedasuser.setColor("ORANGE")
    embednomonedasuser.setDescription("⚠️ || Usted no tiene monedas suficientes.")
  
    
      if (!select || select.idusuario == null || select.idusuario == undefined) {

      if(!economia.tiene(`${message.guild.id}.${message.author.id}`)) {
        return message.channel.send(embednomonedasuser);
      };
    
      if(economia.tiene(`${message.guild.id}.${message.author.id}`)) {
         var dinerojson = await economia.obtener(`${message.guild.id}.${message.author.id}`);
    //      db.prepare(`INSERT INTO economia(idserver, idusuario, dinero) VALUES(${message.guild.id},${message.author.id}, ${dinerojson})`).run();    
        await economia.eliminar(`${message.guild.id}.${message.author.id}`);
      };
    };
  if(cantidad > select.dinero) return message.channel.send(embednomonedasuser);
 // let monedasrestaruser = filasuser.dinero - cantidad
 db.prepare(`UPDATE economia SET dinero = ${select.dinero - cantidad} WHERE idusuario = ${message.author.id} AND idserver= ${message.guild.id}`).run();
  if(selectmencion){
    db.prepare(`UPDATE economia SET dinero = ${selectmencion.dinero + cantidad} WHERE idusuario = ${usuario} AND idserver= ${message.guild.id}`).run();;
  }else if(!selectmencion){
    if(!dinerojson) dinerojson = 0;
    db.prepare(`INSERT INTO economia(idserver, idusuario, dinero) VALUES(${message.guild.id},${usuario}, ${cantidad + dinerojson})`).run();    
    };
     let embed = new Discord.MessageEmbed() 
     .setTitle(`Transferencia completada!`)
     .setColor(`#17FB02`)
     .setDescription(`Acabas de añadir ${cantidad} monedas al usuario ${message.guild.members.cache.get(usuario).user.username}!`)
     return message.channel.send(embed);   
  }
};