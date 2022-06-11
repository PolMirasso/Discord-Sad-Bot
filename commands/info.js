    function T_convertor(ms) {      
      let años = Math.floor((ms) / (1000 * 60 * 60 * 24 * 365));
      let meses = Math.floor(((ms) % (1000 * 60 * 60 * 24 * 365)) / (1000 * 60 * 60 * 24 * 30));
      let dias = Math.floor(((ms) % (1000 * 60 * 60 * 24 * 30)) / (1000 * 60 * 60 * 24));
      let horas = Math.floor(((ms) % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let minutos = Math.floor(((ms) % (1000 * 60 * 60)) / (1000 * 60));
      let segundos = Math.floor(((ms) % (1000 * 60)) / 1000);


      let final = ""
      if(años > 0) final += años > 1 ? `${años} años, ` : `${años} año, `
      if(meses > 0) final += meses > 1 ? `${meses} meses, ` : `${meses} mes, `
      if(dias > 0) final += dias > 1 ? `${dias} dias, ` : `${dias} dia, `
      if(horas > 0) final += horas > 1 ? `${horas} horas, ` : `${horas} hora, `
      if(minutos > 0) final += minutos > 1 ? `${minutos} minutos y ` : `${minutos} minuto y `
      if(segundos > 0) final += segundos > 1 ? `${segundos} segundos.` : `${segundos} segundo.`
      return final
  }

module.exports = {
    ayuda: `Te da informacion sobre ese usuario.`,
    ejemplo: "info @User#0001",
    permiso : "Ninguno",

    run: async (client, message, args) => {
const Discord = require("discord.js");
const moment = require("moment");

const sqlite3 = require("better-sqlite3");
const db = new sqlite3('./sadbot.sqlite3');

var color = db.prepare(`SELECT * FROM personalizar_comandos WHERE idserver = ${message.guild.id}`).get();
if(!color || color.colorembed == null) {
var cembed = "#7289D9";
}else{
var cembed = color.colorembed;
};
let prefix = "??"


let userm = message.mentions.users.first()

let estados = {
  online: "",
  dnd: "No molestar",
  idle: "Ausente",
  offline: "Desconectado"
};

if(!userm){
  userm = message.author
  var users = message.author;
  let apodo = message.member.nickname != null ? "``"+ message.member.nickname  +"``" : "``Ninguno``";
  let jugandoa = message.author.presence.game != null ? "``"+message.author.presence.game.name+"``" : "``Nada``";
  let creacionddmmyyy = moment(message.author.createdTimestamp).format("DD/MM/YYYY, HH:mm");
  let creacionañodia = T_convertor(Math.floor(Date.now()) - message.author.createdTimestamp);
  let unionañodia = T_convertor(Math.floor(Date.now()) - message.member.joinedAt);
  let unionddmmyyy = moment(message.member.joinedAt).format("DD/MM/YYYY, HH:mm");
  let listaroles = message.member.roles.cache.map(roles => `\`${roles.name}\``).join(', ');
  let cantidadroles = message.member.roles.cache.size;

  const embed = new Discord.MessageEmbed()
    .setThumbnail(userm.displayAvatarURL())
    .setAuthor(`Informacion del usuario ${users.tag}`, users.displayAvatarURL())
    .addField(`**Informacion global**`,"Nombre: ``"+users.username+"`` \n Tag: ``"+users.discriminator+"`` \n ID: ``"+users.id+"`` \n Estado ``"+estados[users.presence.status]+"`` \n Avatar [Link del avatar]("+users.displayAvatarURL()+") \n Apodo "+apodo+" \n Jugando a: "+jugandoa+"")
    .addField("**Fechas**","Fecha de Creación: ``"+creacionddmmyyy+"``  \n Fecha de unión a este servidor: ``"+unionddmmyyy+"``")
    .addField(`**Lista de roles [${cantidadroles}]**`,listaroles)
    .setColor(cembed)
        
  message.channel.send({ embed });

}else{
  
  let usermencion = message.guild.members.cache.get(userm.id);

  let apodo = userm.nickname != null ? "``"+ userm.nickname  +"``" : "``Ninguno``";
  let jugandoa = message.author.presence.game != null ? "``"+userm.presence.game.name+"``" : "``Nada``";
  let creacionddmmyyy = moment(userm.createdTimestamp).format("DD/MM/YYYY, HH:mm");
  let creacionañodia = T_convertor(Math.floor(Date.now()) - userm.createdTimestamp);
  let unionañodia = T_convertor(Math.floor(Date.now()) - userm.joinedAt);
  let unionddmmyyy = moment(userm.joinedAt).format("DD/MM/YYYY, HH:mm");

let listaroles = usermencion.roles.cache.map(roles => `\`${roles.name}\``).join(', ');
let cantidadroles = usermencion.roles.cache.size;

  const embed = new Discord.MessageEmbed()
  .setThumbnail(userm.displayAvatarURL())
  .setAuthor(`Informacion del usuario ${userm.tag}`, userm.displayAvatarURL())
  .addField(`**Informacion global**`,"Nombre: ``"+userm.username+"`` \n Tag: ``"+userm.discriminator+"`` \n ID: ``"+userm.id+"`` \n Estado ``"+estados[userm.presence.status]+"``  \n Avatar [Link del avatar]("+userm  .displayAvatarURL()+") \n Apodo "+apodo+" \n Jugando a: "+jugandoa+"")
  .addField("**Fechas**","Fecha de Creación: ``"+creacionddmmyyy+"``  \n Fecha de unión a este servidor: ``"+unionddmmyyy+"``")
  .addField(`**Lista de roles [${cantidadroles}]**`,listaroles)
  .setColor(cembed)
    
  message.channel.send({ embed });

}
}};
