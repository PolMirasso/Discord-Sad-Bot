module.exports = {
    ayuda: `Borra la cantidad de mensajes que tu elijas.`,
    ejemplo: "clear 4",
    permiso : "MANAGE_MESSAGES",
    run: async (client, message, args) => {
const Discord = require("discord.js");
const sqlite3 = require("better-sqlite3");
const db = new sqlite3('./sadbot.sqlite3');

var color = db.prepare(`SELECT * FROM personalizar_comandos WHERE idserver = ${message.guild.id}`).get();
if(!color || color.colorembed == null) {
  var cembed = "#7289D9";
}else{
  var cembed = color.colorembed;
};

const embednoper = new Discord.MessageEmbed() 
embednoper.setColor("RED")
embednoper.setDescription("🚫 || No tienes el permiso de ``MANAGE_MESSAGES`` para utilizar este comando.");

const embednoperbot = new Discord.MessageEmbed() 
embednoperbot.setColor("RED")
embednoperbot.setDescription("🚫 || No tengo el permiso de ``MANAGE_MESSAGES`` para utilizar este comando.");

if(!message.guild.me.hasPermission("MANAGE_MESSAGES")) return message.channel.send(embednoperbot);
if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(embednoper);

const embedcantidad = new Discord.MessageEmbed() 
embedcantidad.setColor("ORANGE")
embedcantidad.setDescription("⚠️ || Escribe una cifra para proceder a eliminar el contenido.")
//'📝** Escribe una cifra para proceder a eliminar el contenido.  **'
let cantidadm = parseInt(args[0]);
if(!cantidadm) return message.channel.send(embedcantidad);
  
const embed100 = new Discord.MessageEmbed() 
embed100.setColor("ORANGE")
embed100.setDescription("⚠️ || El máximo de mensajes que puedo borrar es 100, por lo tanto lo establecere automaticamente ahi.")

if(cantidadm >= 100){
    message.channel.send(embed100).then(msg => msg.delete({ timeout: 5000, reason: 'Mensaje de propio bot eliminado a los 5seg.' }));
    cantidadm = 98;
};

if(cantidadm > 98) cantidadm = 98;

var cantidadreal = cantidadm + 2;

const embedcontenido = new Discord.MessageEmbed() 
embedcontenido.setColor("GREEN")
embedcontenido.setDescription("⚙️ || Eliminando contenido...")

message.channel.send(embedcontenido).then(msg => msg.delete({ timeout: 5000, reason: 'Mensaje de propio bot eliminado a los 5seg.' }));

message.channel.messages.fetch({limit: cantidadreal}).then((mensajes) => {
    var mensajes = mensajes.filter(m => !m.pinned && !m.system)


    setTimeout(() => {
        message.channel.bulkDelete(mensajes).then(() => {

            const embedborrado = new Discord.MessageEmbed() 
            embedborrado.setColor("GREEN")
            embedborrado.setDescription(`<:tick:613820461675053066> || El contenido acaba de ser eliminado con éxito!`)
            message.channel.send(embedborrado).then(msg => msg.delete({ timeout: 5000, reason: 'Mensaje de propio bot eliminado a los 5seg.' }));
        }).catch(e => {
            switch(e.message){
                case("You can only bulk delete messages that are under 14 days old."):{
                    
                    const embederror1 = new Discord.MessageEmbed() 
                    embederror1.setColor("ORANGE")
                    embederror1.setDescription("⚠️ || Solo puedo borrar mensajes con menos de 2 semanas de antigüedad.")
                    message.channel.send(embederror1);
                };
                default:{
                    console.log("Ocurrio un error desconocido en el comando para borrar mensajes \n" + e)
                    const embederror2 = new Discord.MessageEmbed() 
                    embederror2.setColor("ORANGE")
                    embederror2.setDescription("⚠️ || El contenido no se pudo eliminar!")

                    message.channel.send(embederror2)
                }
            }
        })
    }, 3000)
})
}};