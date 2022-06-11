module.exports = {
    ayuda: `"Hackeas" a un usuario.`,
    ejemplo: "hack @User#0001",
    permiso : "Ninguno",

    run: async (client, message, args) => {
      
  const Discord = require("discord.js");
  const sqlite3 = require("better-sqlite3");
  const db = new sqlite3('./sadbot.sqlite3');
  
  let contraseña = ["Casi Crack","Me gusta Vegetta","dinosaurios123","perroarrbolpiano","contraseña","123456","VIVA WILIREX","me gusta la pizza de piña","contraseñasegura123"]
 let contrarandom = contraseña[Math.floor(Math.random() * contraseña.length)]
let usuario = message.mentions.users.first();

const embednouser = new Discord.MessageEmbed() 
embednouser.setColor("ORANGE")
embednouser.setDescription(`⚠️ || A quien hackeo ?`)

if (!usuario) return message.channel.send(embednouser);

var color = db.prepare(`SELECT * FROM personalizar_comandos WHERE idserver = ${message.guild.id}`).get();
if(!color || color.colorembed == null) {
  var cembed = "#7289D9";
}else{
  var cembed = color.colorembed;
};

const embed1 = new Discord.MessageEmbed() 
embed1.setColor(cembed)
embed1.setDescription(`Hackeando a ${usuario.username}.`)

const embed2 = new Discord.MessageEmbed() 
embed2.setColor(cembed)
embed2.setDescription(`Obteniendo Correo.`)

const embed3 = new Discord.MessageEmbed() 
embed3.setColor(cembed)
embed3.setDescription(`Obteniendo Correo..`)

const embed4 = new Discord.MessageEmbed() 
embed4.setColor(cembed)
embed4.setDescription(`Obteniendo Correo...`)

const embed5 = new Discord.MessageEmbed() 
embed5.setColor(cembed)
embed5.setDescription(`${usuario.username.toLowerCase()}**@*^il.com`)

const embed6 = new Discord.MessageEmbed() 
embed6.setColor(cembed)
embed6.setDescription(`Obteniendo Contraseña.`)

const embed7 = new Discord.MessageEmbed() 
embed7.setColor(cembed)
embed7.setDescription(`Obteniendo Contraseña..`)

const embed8 = new Discord.MessageEmbed() 
embed8.setColor(cembed)
embed8.setDescription(`Obteniendo Contraseña...`)

const embed9 = new Discord.MessageEmbed() 
embed9.setColor(cembed)
embed9.setDescription(`Contraseña encriptada encontrada *&R$%f$rt5D*`)

const embed10 = new Discord.MessageEmbed() 
embed10.setColor(cembed)
embed10.setDescription(`Desencriptado!`)

const embed11 = new Discord.MessageEmbed() 
embed11.setColor(cembed)
embed11.setDescription(`Datos de ${usuario.username} \n Correo : || ${usuario.username.toLowerCase()}@gmail.com || \n Contraseña : || ${contrarandom} ||`)


message.channel.send(embed1).then(m => {
  setTimeout(function () {
   m.edit(embed2);
    setTimeout(function () {
     m.edit(embed3);
      setTimeout(function () {
       m.edit(embed4);
        setTimeout(function () {
         m.edit(embed5);
          setTimeout(function () {
           m.edit(embed6);
            setTimeout(function () {
             m.edit(embed7);
              setTimeout(function () {
               m.edit(embed8);
                setTimeout(function () {
                 m.edit(embed9);
                  setTimeout(function () {
                   m.edit(embed10);
                    setTimeout(function () {
                     m.edit(embed11);
                    }, 1000);
                   }, 1000);
                  }, 1000);
                 }, 1000);
                }, 1000);
               }, 1000);
              }, 1000);
             }, 1000);
            }, 1000);
           }, 1000);
});
  
}};