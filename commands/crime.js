function numeroAleatorio(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

module.exports = {
    ayuda: `Hay posibilidades de que no consigas el dinero y te resten dinero de tu cuenta.`,
    ejemplo: "crime",
    permiso : "Ninguno",

    run: async (client, message, args) => {
      
  const Discord = require("discord.js");
  const megadb = require("megadb");
  let economia = new megadb.crearDB("economia");
  let economia_act_des = new megadb.crearDB("economia_act_des")
  let crime_db = new megadb.crearDB("crime_db")
  const prettyMilliseconds = require('pretty-ms');
  var ms = require("ms")

  let crime_max_min = new megadb.crearDB("crime_max_min")
  let crime_msg = new megadb.crearDB("crime_msg")
  let crime_tiempo = new megadb.crearDB("crime_tiempo")
  
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
    
    let crimeconfig = db.prepare(`SELECT * FROM personalizar_comandos WHERE idserver = ${message.guild.id}`).get();
    
    if (!crimeconfig || crimeconfig.crime_max == null || crimeconfig.crime_max == undefined || !crimeconfig.crime_max) {
      var Max = "40";
    }else{
      var Max = crimeconfig.crime_max;
    };

    if (!crimeconfig || crimeconfig.crime_min == null || crimeconfig.crime_min == undefined || !crimeconfig.crime_min) {
      var Min = "20";
    }else{
      var Min = crimeconfig.crime_min;
    };

    if (!crimeconfig || crimeconfig.crime_msgV == null || crimeconfig.crime_msgV == undefined || !crimeconfig.crime_msgV) {
      var MsgV = "Te has escapado y has robado {cantidad} monedas!";
    }else{
      var MsgV = crimeconfig.crime_msgV;
    };

    if (!crimeconfig || crimeconfig.crime_msgD == null || crimeconfig.crime_msgD == undefined || !crimeconfig.crime_msgD) {
      var MsgD = "Te han detenido y has pagado una fianza de {cantidad} monedas!";
    }else{
      var MsgD = crimeconfig.crime_msgD;
    };

    if (!crimeconfig || crimeconfig.crime_tiempo == null || crimeconfig.crime_tiempo == undefined || !crimeconfig.crime_tiempo) {
      var tiem = "4h";
    }else{
      var tiem = crimeconfig.crime_tiempo;
    };
/*
console.log("Max"+ Max)
console.log("Min"+ Min)
console.log("MsgV"+ MsgV)
console.log("MsgD"+ MsgD)
console.log("tiem"+ tiem)
*/
  Max = Number(Max);
  Min = Number(Min);
  tiem = ms(tiem);
  
  const embedmaxminerror = new Discord.MessageEmbed() 
  embedmaxminerror.setColor("ORANGE")
  embedmaxminerror.setDescription("⚠️ || Los valores de mínimo y mínimo no estan bien establecidos, cambielos des de la web del bot.")
  
  if(Max <= Min) return message.channel.send(embedmaxminerror);
  if(Max < Min) Max = 30;
  if(Max < Min) Min = 15;

    let selectdbtiempo = db.prepare(`SELECT * FROM tiempo_economia WHERE idusuario = ${message.author.id} AND idserver= ${message.guild.id} `).get();

      if (!selectdbtiempo) {
        db.prepare(`INSERT INTO tiempo_economia(idserver, idusuario, tiempo_crime) VALUES(${message.guild.id},${message.author.id}, 0)`).run();       
      };

      if(selectdbtiempo){
        let a = selectdbtiempo.tiempo_crime
        let b = Date.now()
        if(b < a ) {  
          let x = prettyMilliseconds(a-b)
  
         let embed = new Discord.MessageEmbed() 
         .setDescription("Espera un rato, aún está la policía por la zona investigando. \n ``Tiempo restante:`` ⏳ "+x+" ⌛")
      //   .setDescription("Solo puedes robar cada ⌛ "+tiempor+" ⌛ ")
         .setColor(`RED`)
      return message.channel.send(embed);
        };
      };

    db.prepare(`UPDATE tiempo_economia SET tiempo_crime = ${Date.now() + tiem} WHERE idusuario = ${message.author.id} AND idserver= ${message.guild.id}`).run();
     var crime = Math.floor(Math.random() * 2) +1;

let select = db.prepare(`SELECT * FROM economia WHERE idusuario = ${message.author.id} AND idserver= ${message.guild.id}`).get();

  if(economia.tiene(`${message.guild.id}.${message.author.id}`)) {
      var dinerojson = await economia.obtener(`${message.guild.id}.${message.author.id}`);
  };
if(!dinerojson) dinerojson = 0

var dinerocrime = numeroAleatorio(Min, Max);

if(crime === 1){  
    MsgV = MsgV.replace(/{cantidad}/g,`${dinerocrime}`); 

    let embed = new Discord.MessageEmbed() 
      .setTitle(`Te has escapado`)
      .setColor(`#17FB02`)
      .setDescription(`${MsgV}`)
    message.channel.send(embed);
 }else if(crime === 2){
    MsgD = MsgD.replace(/{cantidad}/g,`${dinerocrime}`); 

    let embed = new Discord.MessageEmbed() 
      .setTitle(`Te han pillado `)
      .setColor(`#EF1010`)
      .setDescription(`${MsgD}`)
      message.channel.send(embed);
 }else {
    MsgD = MsgD.replace(/{cantidad}/g,`${dinerocrime}`);

    let embed = new Discord.MessageEmbed() 
      .setTitle(`Te han pillado `)
      .setColor(`#EF1010`)
      .setDescription(`${MsgD}`)
    message.channel.send(embed);
      }
    

          if(select){
          if(crime === 1){
              var cantidadtotal = dinerocrime + select.dinero;
          }else{
              var cantidadtotal = select.dinero - dinerocrime;
          };
        }else{
          if(crime === 1){
            var cantidadtotal = dinerocrime + dinerojson;
        }else{
            var cantidadtotal = dinerojson - dinerocrime;
        };
        };
        console.log(cantidadtotal)

          if(select){
          db.prepare(`UPDATE economia SET dinero = ${cantidadtotal} WHERE idusuario = ${message.author.id} AND idserver= ${message.guild.id}`).run();
          }else{
          db.prepare(`INSERT INTO economia(idserver, idusuario, dinero) VALUES(${message.guild.id},${message.author.id}, ${cantidadtotal})`).run();    
          await economia.eliminar(`${message.guild.id}.${message.author.id}`);
          };
}};

