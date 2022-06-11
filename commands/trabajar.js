module.exports = {
    ayuda: `Te añade una cantidad extra de dinero.`,
    ejemplo: "trabajar",
    permiso : "Ninguno",

    run: async (client, message, args) => {
      
  const Discord = require("discord.js")    
  const megadb = require("megadb");
  let economia_act_des = new megadb.crearDB("economia_act_des")
  let economia = new megadb.crearDB("economia");
  let trabajar_db = new megadb.crearDB("trabajar_db")
  var ms = require("ms")

  let trabajar_max_min = new megadb.crearDB("trabajar_max_min")
  let trabajar_msg = new megadb.crearDB("trabajar_msg")
  let trabajar_tiempo = new megadb.crearDB("trabajar_tiempo")

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
      if (activar == "off") return message.channel.send(embedecodes).then(economia_act_des.eliminar(message.guild.id));
      if (activar == "on") {
        db.prepare(`INSERT INTO activar_desactivar(idserver, economia) VALUES(${message.guild.id}, 1)`);
        economia_act_des.eliminar(message.guild.id);
       };
    };
    

    if(onoff.economia == 0) return message.channel.send(embedecodes);
    
    let trabajarconfig = db.prepare(`SELECT * FROM personalizar_comandos WHERE idserver = ${message.guild.id}`).get();

    if (!trabajarconfig || trabajarconfig.trabajar_max == null || trabajarconfig.trabajar_max == undefined || !trabajarconfig.trabajar_max) {
      var Max = "40";
    }else{
      var Max = trabajarconfig.trabajar_max;
    };

    if (!trabajarconfig || trabajarconfig.trabajar_min == null || trabajarconfig.trabajar_min == undefined || !trabajarconfig.trabajar_min) {
      var Min = "20";
    }else{
      var Min = trabajarconfig.trabajar_min;
    };

    if (!trabajarconfig || trabajarconfig.trabajar_msg == null || trabajarconfig.trabajar_msg == undefined || !trabajarconfig.trabajar_msg) {
      var Msg = "Te han pagado {cantidad} monedas!";
    }else{
      var Msg = trabajarconfig.trabajar_msg;
    };

    if (!trabajarconfig || trabajarconfig.trabajar_tiempo == null || trabajarconfig.trabajar_tiempo == undefined || !trabajarconfig.trabajar_tiempo) {
      var tiem = "4h";
    }else{
      var tiem = trabajarconfig.trabajar_tiempo;
    };  

  Max = Number(Max);
  Min = Number(Min);
  tiem = ms(tiem);
  
  const embedmaxminerror = new Discord.MessageEmbed() 
  embedmaxminerror.setColor("ORANGE")
  embedmaxminerror.setDescription("⚠️ || Los valores de mínimo y mínimo no estan bien establecidos, cambielos des de la web del bot.")

  if(Max < Min) message.channel.send (embedmaxminerror);

          let selectdbtiempo = db.prepare(`SELECT * FROM tiempo_economia WHERE idusuario = ${message.author.id} AND idserver= ${message.guild.id} `).get();

          if (!selectdbtiempo) {
            db.prepare(`INSERT INTO tiempo_economia(idserver, idusuario, tiempo_trabajar) VALUES(${message.guild.id},${message.author.id}, 0)`).run();       
          };
    
          if(selectdbtiempo){
            let a = selectdbtiempo.tiempo_trabajar
            let b = Date.now()
            if(b < a ) {  
              let tiempor;
              tiempor = ms(a-b)
              tiempor = tiempor.replace(/s/g,` Segundo/s`);
              tiempor = tiempor.replace(/m/g,` Minuto/s`);
                     
              let embed = new Discord.MessageEmbed() 
              .setDescription("Descansa un poco de trabajar, en un rato vuelves y trabajas más. \n ``Tiempo restante:`` ⏳ "+tiempor+". ⌛")
              .setColor(`#F90303`)
           return message.channel.send(embed);
            };
          };
          
          db.prepare(`UPDATE tiempo_economia SET tiempo_trabajar = ${Date.now() + tiem} WHERE idusuario = ${message.author.id} AND idserver= ${message.guild.id}`).run();

          if(economia.tiene(`${message.guild.id}.${message.author.id}`)) {
            var dinerojson = await economia.obtener(`${message.guild.id}.${message.author.id}`);
        };
      if(!dinerojson) dinerojson = 0


            function numeroAleatorio(min, max) {
              return Math.round(Math.random() * (max - min) + min);
            };
            
            let cantidad = numeroAleatorio(Min, Max);

            let select = db.prepare(`SELECT * FROM economia WHERE idusuario = ${message.author.id} AND idserver= ${message.guild.id}`).get();

            if(select){
                  var cantidadtotal = cantidad + select.dinero;
            }else{
                var cantidadtotal = cantidad + dinerojson;
            };

            if(select){
              db.prepare(`UPDATE economia SET dinero = ${cantidadtotal} WHERE idusuario = ${message.author.id} AND idserver= ${message.guild.id}`).run();
              }else{
              db.prepare(`INSERT INTO economia(idserver, idusuario, dinero) VALUES(${message.guild.id},${message.author.id}, ${cantidadtotal})`).run();    
              await economia.eliminar(`${message.guild.id}.${message.author.id}`);
              };

                Msg = Msg.replace(/{cantidad}/g,`${cantidad}`) 
                            
                let embed = new Discord.MessageEmbed() 
                  .setTitle(`Nos ha gustado tu trabajo`)
                  .setColor(`#17FB02`)
                  .setDescription(`${Msg}`)
                return message.channel.send(embed)
  }
};