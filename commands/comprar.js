module.exports = {
    ayuda: `Compras un rol de la tienda, procura no poner @ al escribir el nombre del rol.`,
    ejemplo: "comprar Azul",
    permiso : "Ninguno",
    run: async (client, message, args) => {
      
  const Discord = require("discord.js")    
  const megadb = require("megadb");
  let economia_act_des = new megadb.crearDB("economia_act_des")
  let tienda1 = new megadb.crearDB("tienda1")
  let economia = new megadb.crearDB("economia");

  const sqlite3 = require("better-sqlite3");
  const db = new sqlite3('./sadbot.sqlite3');
      
  let onoff = db.prepare(`SELECT * FROM activar_desactivar WHERE idserver = ${message.guild.id}`).get();

  const embedecodes = new Discord.MessageEmbed() 
  embedecodes.setColor("RED")
  embedecodes.setDescription("🚫 || La economía está desactivada en este servidor.")

   if (!onoff|| !onoff.economia || onoff.economia == null || onoff.economia == undefined) {

    if(!economia_act_des.tiene(`${message.guild.id}`)) {
      return message.channel.send(embedecodes);
      };
      let activar = await economia_act_des.obtener(`${message.guild.id}`);
      if (activar == "off") return message.channel.send(embedecodes).then(economia_act_des.eliminar(message.guild.id));
      if (activar == "on") {
        db.prepare(`INSERT INTO activar_desactivar(idserver, economia) VALUES(${message.guild.id}, 1)`);
        economia_act_des.eliminar(message.guild.id);
       };
    };

    if(onoff){
      if(onoff.economia == 0) return message.channel.send(embedecodes);
    };


    const embednoargs = new Discord.MessageEmbed() 
    embednoargs.setColor("ORANGE")
    embednoargs.setDescription("⚠️ || Introduzca el numero de linea del rol o el nombre del rol.")
    
  if(!args.join(" ")) return message.channel.send(embednoargs); 



  let rolidmap = [];

  let obtenertienda = db.prepare(`SELECT * FROM tienda WHERE idserver = ${message.guild.id} ORDER BY precio`).all();

    if (!obtenertienda) { 
      if(!tienda1.tiene(`${message.guild.id}`)) {

        
    const embednoargs = new Discord.MessageEmbed() 
    embednoargs.setColor("ORANGE")
    embednoargs.setDescription("⚠️ || Este servidor no tiene tienda.")
    

        return message.channel.send("Este servidor no tiene ninguna tienda")
      };
      if(tienda1.tiene(`${message.guild.id}`)) {
        let roles = await tienda1.obtener(`${message.guild.id}`)
        for(var key in roles) {
          let r = message.guild.roles.get(key)
          if(!r) {
            tienda1.eliminar(`${message.guild.id}.${key}`);
            continue
          };
          rolidmap.push(r.id);
          db.prepare(`INSERT INTO tienda(idserver, idrol, precio) VALUES(${message.guild.id}, ${key}, ${roles[key]})`).run();
            tienda1.eliminar(`${message.guild.id}.${key}`);
          
        };
      };
    };

    obtenertienda.map(ls => {
      if(ls.idrol){
        let r = message.guild.roles.cache.get(ls.idrol);
        if(!r) {
          db.prepare(`DELETE FROM tienda WHERE idserver = ${message.guild.id} AND idrol = ${ls.idrol}`);          
        };
        if(r){
          rolidmap.push(r.id);
        };
      };
     });

     if(isNaN(args[0]) == true) {
      var num = args.join(" ")
      var idrol = message.guild.roles.cache.find(r => r.name == num);

      const embednorolexiste = new Discord.MessageEmbed() 
      embednorolexiste.setColor("ORANGE")
      embednorolexiste.setDescription(`⚠️ || El rol ${num} no existe, escriba el nombre del rol o el número de la línea.`)
  
      if(!idrol) return message.channel.send(embednorolexiste);    

      const embednoroltienda = new Discord.MessageEmbed() 
      embednoroltienda.setColor("ORANGE")
      embednoroltienda.setDescription(`⚠️ || El rol ${idrol.name} no esta en la tienda.`)
  

      if(rolidmap.includes(idrol.id) == false) return message.channel.send(embednoroltienda);
       idrol = idrol.id;    
      } else if(isNaN(args[0]) == false) {
        num = args[0];
        num = num-1;
        if(num > 10 || num == 10) {
           var idrol = rolidmap[num];     
         }else{
        var idrol = rolidmap[num];
        }    
      
        const embednorolid = new Discord.MessageEmbed() 
        embednorolid.setColor("ORANGE")
        embednorolid.setDescription(`⚠️ || El rol con el número de línea ${num + 1} no existe, escriba el nombre del rol o el número de la línea.`)
    
     if(!idrol) return message.channel.send(embednorolid);
     idrol = idrol.toString().replace(/<@&/g,``)
     idrol = idrol.replace(/>/g,``)      
    } else {
          
      const embednorol = new Discord.MessageEmbed() 
      embednorol.setColor("ORANGE")
      embednorol.setDescription(`⚠️ || Escriva el nombre del rol o el numero de linea.`)
  
      return message.channel.send(embednorol);
    };
    let nombre_rol = message.guild.roles.cache.find(x => x.id == idrol);
    
    let preciodb = db.prepare(`SELECT * FROM tienda WHERE idserver = ${message.guild.id} AND idrol = ${idrol}`).get();
      let precio = preciodb.precio;

    let economiausuario = db.prepare(`SELECT * FROM economia WHERE idusuario = ${message.author.id} AND idserver= ${message.guild.id}`).get();
    
    let embednodinero = new Discord.MessageEmbed()
    embednodinero.setColor("ORANGE")
    embednodinero.setDescription("⚠️ || No tienes suficientes monedas para comprar este rol.")
  
    if (economiausuario == null || economiausuario == undefined || !economiausuario) {
      if(economia.tiene(`${message.guild.id}.${message.author.id}`)) {
        var dinerojson = await economia.obtener(`${message.guild.id}.${message.author.id}`);
        var coantidaddinerofinal = dinerojson - precio;
      await economia.eliminar(`${message.guild.id}.${message.author.id}`);
      }else{
      return message.channel.send(embednodinero);
      };
    }else{
      if(precio > economiausuario.dinero) return message.channel.send(embednodinero);
      var coantidaddinerofinal = economiausuario.dinero - precio;
    };
    
        db.prepare(`UPDATE economia SET dinero = ${coantidaddinerofinal} WHERE idserver= ${message.guild.id} AND idusuario = ${message.author.id}`).run();

        const embedrolañadido = new Discord.MessageEmbed() 
        embedrolañadido.setColor("GREEN")
        embedrolañadido.setDescription(`<:tick:613820461675053066> || Acabas de comprar el rol **${nombre_rol.name}** por ${precio} monedas!`)

          message.member.roles.add(nombre_rol.id).then(() => {
            return message.channel.send(embedrolañadido)
          }).catch(error => {
             
            const embederror = new Discord.MessageEmbed() 
            embederror.setColor("ORANGE")
            embederror.setDescription("⚠️ || Ha ocurrido un error de gerarquia al tratar de assignar el rol.")
            message.channel.send(embederror);
          });
}};