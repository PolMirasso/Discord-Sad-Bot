module.exports = {
    ayuda: `Te crea una invitacion del servidor.`,
    ejemplo: "invitacion",
    permiso : "CREATE_INSTANT_INVITE",

    run: async (client, message, args) => {
    const Discord = require("discord.js");
  
    const embednoper = new Discord.MessageEmbed() 
    embednoper.setColor("RED")
    embednoper.setDescription("🚫 || No tienes el permiso ``CREATE_INSTANT_INVITE`` para utilizar este comando.")      
    
    if(!message.member.hasPermission("CREATE_INSTANT_INVITE")) return message.channel.send(embednoper);      

    const embednoperbot = new Discord.MessageEmbed() 
    embednoper.setColor("RED")
    embednoper.setDescription("🚫 || No tengo el permiso ``CREATE_INSTANT_INVITE`` para utilizar este comando.")      
    

    if(!message.guild.me.hasPermission("CREATE_INSTANT_INVITE")) return message.channel.send(embednoperbot);  
  let invitacion = await message.guild.channels.cache.get(message.channel.id).createInvite({ maxAge: 0 });
 //   .then(invite =>  
 const embed1 = new Discord.MessageEmbed() 
 embed1.setColor("GREEN")
 embed1.setDescription(`<:tick:613820461675053066> || Se ha creado la invitación: ${invitacion.url}`)
      message.channel.send(embed1);
  //);
}};