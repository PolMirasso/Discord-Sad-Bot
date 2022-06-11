module.exports = {
    ayuda: `Muestra las personas con mas nivel de todo el servidor.`,
    ejemplo: "top-niveles",
    permiso : "Ninguno",

    run: async (client, message, args) => {


const Discord = require("discord.js");
const sqlite3 = require("better-sqlite3");
const db = new sqlite3('./sadbot.sqlite3');

const megadb = require("megadb");
let niveles_act_des = new megadb.crearDB("niveles_act_des");
      
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
      

let lista = db.prepare(`SELECT * FROM niveles WHERE idserver = ${message.guild.id} ORDER BY nivel DESC LIMIT 10`).all()
      
console.log(lista)
  
let datos = [];
let index = 1;
lista.map(ls => {
  let levelup = 5 * (ls.nivel ** 2) + 50 * ls.nivel + 100;
    if(message.guild.members.cache.get(ls.idusuario)){
      datos.push(index++ +". " + message.guild.members.cache.get(ls.idusuario).user.tag + ' | Nivel: **'+ls.nivel+'**, Xp: **'+ls.xp+"/"+levelup+'**');
    };               
});


var color = db.prepare(`SELECT * FROM personalizar_comandos WHERE idserver = ${message.guild.id}`).get();
if(!color || color.colorembed == null) {
  var cembed = "#7289D9";
}else{
  var cembed = color.colorembed;
};

let embed = new Discord.MessageEmbed() 
embed.setTitle('TOP Niveles')
embed.setColor(cembed)
embed.setDescription(datos.join('\n'))   	
message.channel.send(embed);
       
  }
};