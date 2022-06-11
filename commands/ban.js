module.exports = {
    ayuda: "Banea del servidor al usuario mencionado, con este comando ya no podrá volver a entrar al servidor a no ser que le quites el baneo. ",
    ejemplo: "ban @User#0001",
    uso : "ban (Usuario) (Motivo)",
    permiso : "BAN_MEMBERS",

    run: async (client, message, args) => {
      
  const Discord = require("discord.js")    

  const embednoper = new Discord.MessageEmbed() 
  embednoper.setColor("RED")
  embednoper.setDescription("🚫 || No tienes el permiso ``BAN_MEMBERS`` para utilizar este comando.")

  const embednoperbot = new Discord.MessageEmbed() 
  embednoperbot.setColor("RED")
  embednoperbot.setDescription("🚫 || No tengo el permiso ``BAN_MEMBERS`` para utilizar este comando.")

  const embednomotivo = new Discord.MessageEmbed() 
  embednomotivo.setColor("ORANGE")
  embednomotivo.setDescription("⚠️ || Introduzca el motivo de baneo del usuario.")

  const embednouser = new Discord.MessageEmbed() 
  embednouser.setColor("ORANGE")
  embednouser.setDescription("⚠️ || Introduzca el nombre de usuario.")




  if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send(embednoperbot);
  if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(embednoper);  
  
  const user = message.mentions.users.first();
  if(!user) return message.channel.send(embednouser);

  let motivo = args.slice(1).join(' ');
  if(!motivo) return message.channel.send(embednomotivo);

  if (user) {
    const member = message.guild.member(user);
    if (member) {
      member.ban({  
        reason: motivo,
      }).then(() => {

        const embedban = new Discord.MessageEmbed() 
        embedban.setColor("GREEN")
        embedban.setDescription(`<:tick:613820461675053066> || El usuario ${user} ha sido baneado.`)

        message.channel.send(embedban);
      }).catch(err => {
        const embedgerarquia = new Discord.MessageEmbed() 
        embedgerarquia.setColor("ORANGE")
        embedgerarquia.setDescription("⚠️ || No he podido banear a ese usuario, compruebe la gerarquia del bot.")
        message.channel.send(embedgerarquia);
      });
    } else {
      message.reply('Ese usuario no esta aqui!');
    };
  }; 
  
}};