module.exports = {
    ayuda: `Juega a la ruleta para apostar tu dinero.`,
    ejemplo: "ruleta rojo 70",
    run: async (client, message, args) => {
const Discord = require("discord.js")    
const megadb = require("megadb");
  let economia_act_des = new megadb.crearDB("economia_act_des")
  let economia = new megadb.crearDB("economia");
 let ruleta_db = new megadb.crearDB("ruleta_db")
  var ms = require("ms")


  const sqlite3 = require("better-sqlite3");
  const db = new sqlite3('./sadbot.sqlite3');

  let onoff = db.prepare(`SELECT * FROM activar_desactivar WHERE idserver = ${message.guild.id}`).get();

  const embedecodes = new Discord.MessageEmbed() 
  embedecodes.setColor("RED")
  embedecodes.setDescription("🚫 || La economía está desactivada en este servidor.")

    if (!onoff|| !onoff.economia || onoff.economia == null || onoff.economia == undefined) {

    if(!economia_act_des.tiene(`${message.guild.id}`)) {
      console.log("1")
      return message.channel.send(embedecodes);
      };
      let activar = await economia_act_des.obtener(`${message.guild.id}`);
      if (activar == "off") {
        console.log("2")
        economia_act_des.eliminar(message.guild.id)
        return message.channel.send(embedecodes);
      };
      if (activar == "on") {
        db.prepare(`INSERT INTO activar_desactivar(idserver, economia) VALUES(${message.guild.id}, 1)`).run()
        economia_act_des.eliminar(message.guild.id);
       };
    };
    
    if(onoff.economia == 0) return message.channel.send(embedecodes);

  let movimientousuario = args[0];
  let apuesta = args[1];

if(!movimientousuario || !apuesta){
  let embed = new Discord.MessageEmbed()
  embed.setColor("#7289D9")
  embed.setTitle("Ruleta")
  embed.setDescription("**¿Como puedo jugar a la ruleta?** \n Primero escoja un motimiento por ejemplo por color |``rojo`` / ``negro``| , a continuación introduzca un número que se encuentre en el tablero.") 

  //embed.setDescription("**¿Como puedo jugar a la ruleta?** \n Primero escoja el color |``rojo`` / ``negro``| , a continuación introduzca un número que se encuentre en el tablero.") 
  embed.setImage("https://cdn.discordapp.com/attachments/527103273048604672/696075759110062160/Sin_titulo-1.png")
 return message.channel.send(embed)
};
    
    let selectdbtiempo = db.prepare(`SELECT * FROM tiempo_economia WHERE idusuario = ${message.author.id} AND idserver= ${message.guild.id} `).get();

      if (!selectdbtiempo) {
        db.prepare(`INSERT INTO tiempo_economia(idserver, idusuario, tiempo_ruleta) VALUES(${message.guild.id},${message.author.id}, 0)`).run();       
      };

      if(selectdbtiempo){
        let a = selectdbtiempo.tiempo_ruleta
        let b = Date.now()
        if(b < a ) {  
         let tiempor;
         tiempor = ms(a-b)
         tiempor = tiempor.replace(/s/g,` Segundo/s`);
         tiempor = tiempor.replace(/m/g,` Minuto/s`);
          
       let embed = new Discord.MessageEmbed() 
          .setDescription("**Ya has apostado bastante, la mesa de apuestas ha cerrado.** \n ``Tiempo restante:`` ⏳ "+tiempor+". ⌛")
          .setColor(`RED`)
       return message.channel.send(embed);
        };
      };



const embednomoviento = new Discord.MessageEmbed() 
embednomoviento.setColor("ORANGE")
embednomoviento.setDescription(`⚠️ || Introduzca el motiviento que desea hacer.`)

const embedanoapuesta = new Discord.MessageEmbed() 
embedanoapuesta.setColor("ORANGE")
embedanoapuesta.setDescription(`⚠️ || Introduzca la cantidad de monedas que desea apostar.`)

const embed1moneda = new Discord.MessageEmbed() 
embed1moneda.setColor("ORANGE")
embed1moneda.setDescription(`⚠️ || La apuesta minima es 1 moneda.`)

const embed100moneda = new Discord.MessageEmbed() 
embed100moneda.setColor("ORANGE")
embed100moneda.setDescription(`⚠️ || La apuesta maxima son 100 monedas.`)

const embedapuestaerror = new Discord.MessageEmbed() 
embedapuestaerror.setColor("ORANGE")
embedapuestaerror.setDescription(`⚠️ || ${apuesta} no es una cantidad valida para apostar.`)


if(!movimientousuario) return message.channel.send(embednomoviento);
if(!apuesta) return message.channel.send(embedanoapuesta);
if(apuesta < 1) return message.channel.send(embed1moneda)
if(apuesta > 100) return message.channel.send(embed100moneda)

if(isNaN(apuesta)) {
  return message.channel.send(embedapuestaerror)
};


const embedmovimiento = new Discord.MessageEmbed() 
embedmovimiento.setColor("GREEN")
embedmovimiento.setDescription(`<:tick:613820461675053066> || Su movimiento es ${movimientousuario}.`)

const embedcantidad = new Discord.MessageEmbed() 
embedcantidad.setColor("GREEN")
embedcantidad.setDescription(`<:tick:613820461675053066> ||Su apuesta es ${apuesta}.`)

message.channel.send(embedmovimiento).then(msg => msg.delete({ timeout: 2000, reason: 'Mensaje de propio bot eliminado a los 5seg.' }));
message.channel.send(embedcantidad).then(msg => msg.delete({ timeout: 2000, reason: 'Mensaje de propio bot eliminado a los 5seg.' }));

const embednomonedas = new Discord.MessageEmbed() 
embednomonedas.setColor("ORANGE")
embednomonedas.setDescription(`⚠️ || No tienes esa cantidad de monedas para apostar.`)


let filas = db.prepare(`SELECT * FROM economia WHERE idusuario = ${message.author.id} AND idserver= ${message.guild.id}`).get();
    if (!filas) {

     if(!economia.tiene(`${message.guild.id}.${message.author.id}`)) {
       return message.channel.send(embednomonedas)
     }; 

      if(economia.tiene(`${message.guild.id}.${message.author.id}`)) {
       var dinerojson = await economia.obtener(`${message.guild.id}.${message.author.id}`);//.catch(err => message.channel.send("Hubo un error, inténtelo nuevamente."));
      };
    };

    if(filas){
    if(apuesta > filas.dinero) return message.channel.send(embednomonedas);
    }else if(!filas){
      dinerojson = Number(dinerojson);
    if(apuesta > dinerojson) return message.channel.send(embednomonedas);
    };

    function numeroAleatorio(min, max) {
      return Math.round(Math.random() * (max - min) + min);
    };
    
    function parImpar(num) {
      if(num % 2 == 0) {
        return "par";
      }
      else {
        return "impar";
      }
    }

    let numero = numeroAleatorio(0, 36);
    
    let coloresnombre = ["rojo","negro","verde"]
    
    let numerosrojo = [1,3,5,7,9,12,14,16,18,19,21,23,25,27,30,32,34,36];
    let numerosnegro = [2,4,6,8,11,10,13,15,17,20,22,24,26,28,29,33,31,35];

    let numeros12 = [1,2,3,4,5,6,7,8,9,10,11,12];
    let numeros22 = [13,14,15,16,17,18,19,20,21,22,23,24];
    let numeros23 = [25,26,27,28,29,30,31,32,33,34,35,36];

    let numeros118 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]
    let numeros1936 = [19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36]

    let a1st = [1,4,7,10,13,16,19,22,25,28,31,34];
    let a2nd = [2,5,8,11,14,17,20,23,26,28,32,35];
    let a3rd = [3,6,9,12,15,18,21,24,27,30,33,36];

    let color = "";
    if(numerosrojo.includes(numero)){
      color = "rojo"
    }else if(numerosnegro.includes(numero)){
      color = "negro"
    }else if(numero == 0){
      color = "verde"
    }else{

      const embederror = new Discord.MessageEmbed() 
      embederror.setColor("ORANGE")
      embederror.setDescription(`⚠️ || Ha occurido un error, Codigo de error ${numero}.`)

      return message.channel.send(embederror);
    };

    let premio = "";
    if(isNaN(movimientousuario) == false){
      if(movimientousuario == numero){
        premio = 36;
      }else{
        premio = 0;
      };
    }else if(coloresnombre.includes(movimientousuario.toLowerCase())){
      if(movimientousuario.toLowerCase() == color){
        premio = 2;
      }else{
        premio = 0;
      };
    }else if(movimientousuario.toLowerCase() == "1:2" || movimientousuario.toLowerCase() == "2:2" || movimientousuario.toLowerCase() == "3:2"){
      let opcion = "";
      if(a1st.includes(numero)) {
        opcion = "1:2";
      }else if(a2nd.includes(numero)){
        opcion = "2:2";
      }else if(a3rd.includes(numero)){
        opcion = "3:2";
      };
      if(movimientousuario == opcion){
        premio = 3;
      }else{
        premio = 0;
      };
    }else if(movimientousuario.toLowerCase() == "par" || movimientousuario.toLowerCase() == "impar"){
    
    let PINR = parImpar(numero);
    let PINU = parImpar(movimientousuario);

    if(PINR == PINU){
      premio = 2;
    }else{
      premio = 0;
    };
  }else if(movimientousuario == "1-12" || movimientousuario == "13-24" || movimientousuario == "25-36"){
    
    let opcion = "";
    if(numeros12.includes(numero)){
      opcion = "1-12";
    }else if(numeros22.includes(numero)){
      opcion = "13-24";
    }else if(numeros23.includes(numero)){
      opcion = "25-36";
    }
    if(movimientousuario == opcion){
      premio = 3;
    }else{
      premio = 0;
    };
    
  }else if (movimientousuario == "1-18" || movimientousuario == "19-36"){
    
    let opcion = "";
    if(numeros118 .includes(numero)){
      opcion = "1-18";
    }else if(numeros1936.includes(numero)){
      opcion = "19-36";
    }

    if(movimientousuario == opcion){
      premio = 2;
    }else{
      premio = 0;
    };

  }else{
    const embederror = new Discord.MessageEmbed() 
    embederror.setColor("ORANGE")
    embederror.setDescription(`⚠️ || Ha occurido un error, Codigo de error MNull1.`)

    return message.channel.send(embederror);
  };

  if(premio == 0) {
    var mensaje = `${numero} ${color} \n Has perdido ${apuesta} monedas.`
    var colorembed = "RED"
    if(filas){
     db.prepare(`UPDATE economia SET dinero = ${filas.dinero-apuesta} WHERE idusuario = ${message.author.id} AND idserver= ${message.guild.id}`).run();
    }else{
      db.prepare(`INSERT INTO economia(idserver, idusuario, dinero) VALUES(${message.guild.id},${message.author.id}, ${dinerojson-apuesta})`).run();
     await economia.eliminar(`${message.guild.id}.${message.author.id}`);
    };
  };

  if(premio > 0) {
    var mensaje = `${numero} ${color} \n Has ganado ${apuesta*premio} monedas.`
    var colorembed = "GREEN"

    if(filas){
      db.prepare(`UPDATE economia SET dinero = ${filas.dinero+apuesta*premio} WHERE idusuario = ${message.author.id} AND idserver= ${message.guild.id}`).run();
    }else{
      db.prepare(`INSERT INTO economia(idserver, idusuario, dinero) VALUES(${message.guild.id},${message.author.id}, ${dinerojson+apuesta*premio})`).run();
     await economia.eliminar(`${message.guild.id}.${message.author.id}`);
    };
  };
  
  db.prepare(`UPDATE tiempo_economia SET tiempo_ruleta = ${Date.now() + 86400000} WHERE idusuario = ${message.author.id} AND idserver= ${message.guild.id} `).run();

  const embed = new Discord.MessageEmbed()
   .setColor(colorembed)
   .setDescription(mensaje)
  return message.channel.send(embed);    
}};