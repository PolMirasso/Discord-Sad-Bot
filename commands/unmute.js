module.exports = {
    ayuda: `Desmutea al usuario selecionado.`,
    ejemplo: "unmute @User#0001",
    permiso : "Ninguno",
    run: async (client, message, args) => {

      
const Discord = require("discord.js");
const embednoper = new Discord.MessageEmbed() 
embednoper.setColor("RED")
embednoper.setDescription("🚫 || No tienes el permiso ``MANAGE_CHANNELS`` para utilizar este comando.")

const embednoperbot = new Discord.MessageEmbed() 
embednoperbot.setColor("RED")
embednoperbot.setDescription("🚫 || No tengo el permiso ``MANAGE_CHANNELS`` para utilizar este comando.")
  
      
    if (!message.guild.me.hasPermission("MANAGE_ROLES")) return message.channel.send(embednoperbot);
    if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send(embednoper);  
    let miembro = message.mentions.members.first();
    let role = message.guild.roles.find(r => r.name == "Muteado");
      
    const embednorol = new Discord.MessageEmbed() 
    embednorol.setColor("ORANGE")
    embednorol.setDescription("⚠️ || El rol muteado no existe.")
      
    if(!role) return message.channel.send(embednorol);
      
    
  const embedmuted = new Discord.MessageEmbed() 
  embedmuted.setColor("GREEN")
  embedmuted.setDescription(`<:tick:613820461675053066> || El usuario ${miembro} ha sido desmuteado.`)

      
    miembro.removeRole(role.id).then( () => {
      message.channel.send(embedmuted);
    }).catch(error => {
      
      const embederror = new Discord.MessageEmbed() 
      embederror.setColor("ORANGE")
      embederror.setDescription("⚠️ || Ha ocurrido un error.")

      return message.channel.send(embederror);
    });
 
  }
};