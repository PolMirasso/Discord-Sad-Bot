var Jimp = require('jimp');
const megadb = require("megadb");
let levels_db = new megadb.crearDB("niveles");

let niveles_act_des = new megadb.crearDB("niveles_act_des");
const Discord = require("discord.js");
const sqlite3 = require("better-sqlite3");
const db = new sqlite3('./sadbot.sqlite3');
    
module.exports = {
    ayuda: `Recives el nivel del usuario.`,
    ejemplo: "nivel @User#0001",
    permiso : "Ninguno",

    run: async (client, message, args) => {
   


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
      

let x = message.mentions.members.first();
if(!x) x = message.guild.members.cache.get(args[0]);
if(!x) x = message.guild.members.cache.get(message.author.id);

 let filas = db.prepare(`SELECT * FROM niveles WHERE idserver = ${message.guild.id} AND idusuario = ${x.id}`).get()
  if (!filas){      
      if(levels_db.tiene(message.guild.id)) {
      var { xp, nivel } = await levels_db.obtener(`${message.guild.id}.${x.id}`);
      db.prepare(`INSERT INTO niveles(idserver, idusuario, xp, nivel) VALUES(${message.guild.id},${x.id},${xp},${nivel})`).run();
      }else{
        var xp = 1;
        var nivel = 1;
      };
  };
  if(filas){
    var xp = filas.xp;
    var nivel = filas.nivel;
  };
let levelup = 5* (nivel **2) +50 * nivel + 100;
let porcen = xp*100/levelup;
porcen = Math.round(porcen);
if (porcen == 100) porcen = 99;
if (porcen == 0) porcen = 1;

let letrasusuario = x.user.username.length;

let fuentenombre;
if(letrasusuario <= 12) fuentenombre = "https://raw.githubusercontent.com/PolM174/Sad-Bot/master/Roboto-Light/Roboto-Lightx32.fnt";
if(letrasusuario >= 13 && letrasusuario <= 15) fuentenombre = "https://raw.githubusercontent.com/PolM174/Sad-Bot/master/Roboto-Light/Roboto-Lightx30.fnt"; 
if(letrasusuario >= 16 && letrasusuario <= 18) fuentenombre = "https://raw.githubusercontent.com/PolM174/Sad-Bot/master/Roboto-Light/Roboto-Lightx28.fnt";
if(letrasusuario >= 19 && letrasusuario <= 21) fuentenombre = "https://raw.githubusercontent.com/PolM174/Sad-Bot/master/Roboto-Light/Roboto-Lightx26.fnt";
if(letrasusuario >= 22 && letrasusuario <= 24) fuentenombre = "https://raw.githubusercontent.com/PolM174/Sad-Bot/master/Roboto-Light/Roboto-Lightx24.fnt";
if(letrasusuario >= 25 && letrasusuario <= 27) fuentenombre = "https://raw.githubusercontent.com/PolM174/Sad-Bot/master/Roboto-Light/Roboto-Lightx22.fnt"; 
if(letrasusuario >= 28 && letrasusuario <= 30) fuentenombre = "https://raw.githubusercontent.com/PolM174/Sad-Bot/master/Roboto-Light/Roboto-Lightx20.fnt";
if(letrasusuario >= 31 && letrasusuario <= 35) fuentenombre = "https://raw.githubusercontent.com/PolM174/Sad-Bot/master/Roboto-Light/Roboto-Lightx18.fnt";

let fondo = "https://i.imgur.com/NXf99Lm.png";
let circulo = "https://i.imgur.com/nERMKDf.png";
let porcentaje = `https://cdn.glitch.com/19e0338f-c3b4-48fc-a34e-7537222643e5%2F1%20(${Math.round(porcen)}).png?v=1586542667228`;

//let porcentaje = "https://cdn.glitch.com/19e0338f-c3b4-48fc-a34e-7537222643e5%2F1%20(1).png?v=1586542667228"

let fuente2 = "https://raw.githubusercontent.com/PolM174/Sad-Bot/master/Roboto-Light/Roboto-Lightx32.fnt";
let readfondo = await Jimp.read(fondo);
let readavatar = await Jimp.read(x.user.displayAvatarURL({format: "png"}));
let readcirculo = await Jimp.read(circulo);
let readporcentaje = await Jimp.read(porcentaje);

readporcentaje.resize(185 ,185);  
readcirculo.resize(185 ,185);
readavatar.resize(185 ,185).mask(readcirculo, 0 ,0);
readfondo.composite(readporcentaje, 550, 49);
readfondo.composite(readavatar, 39, 49);

let readfuentenombre = await Jimp.loadFont(fuentenombre);
let readfuenteniv = await Jimp.loadFont(fuente2);

readfondo.print(readfuentenombre, 254, 67.25, x.user.username);
readfondo.print(readfuenteniv, 252, 124.84, `XP : ${xp}/${levelup}`);
readfondo.print(readfuenteniv, 249, 190.25, `Nivel : ${nivel}`);

readfondo
.getBuffer(Jimp.MIME_JPEG,async function(err, buffer) {
  if (err) return console.log(err);

  var color = db.prepare(`SELECT * FROM personalizar_comandos WHERE idserver = ${message.guild.id}`).get();
  if(!color || color.colorembed == null) {
    var cembed = "#7289D9";
  }else{
    var cembed = color.colorembed;
  };

 const embed = new Discord.MessageEmbed() 
 .setColor(cembed)
 .attachFiles([{
   attachment: buffer,
   name: "nivel.png"
 }])
 .setImage("attachment://nivel.png")
 
message.channel.send(embed);
   })
  }
};