module.exports = {
    ayuda: `Haces que el ususario no pueda hablar en ningun chat.`,
    ejemplo: "mute @User#0001",
    permiso : "MANAGE_CHANNELS",

    run: async (client, message, args) => {
      
const Discord = require("discord.js");

const embednoper = new Discord.MessageEmbed() 
embednoper.setColor("RED")
embednoper.setDescription("🚫 || No tienes el permiso ``MANAGE_CHANNELS`` para utilizar este comando.")

const embednoperbot = new Discord.MessageEmbed() 
embednoperbot.setColor("RED")
embednoperbot.setDescription("🚫 || No tengo el permiso ``MANAGE_CHANNELS`` para utilizar este comando.")


  if (!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send(embednoper);
  if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send(embednoperbot);  

  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));

  const embednousuario = new Discord.MessageEmbed() 
  embednousuario.setColor("ORANGE")
  embednousuario.setDescription("⚠️ || Introduzca el usuario.")

  if(!tomute) return message.channel.send(embednousuario);

  const embedmuteper = new Discord.MessageEmbed() 
  embedmuteper.setColor("ORANGE")
  embedmuteper.setDescription("⚠️ || No puedo mutear a este usuario, tiene el permiso ``MANAGE_MESSAGES``.")

  const embedmuted = new Discord.MessageEmbed() 
  embedmuted.setColor("GREEN")
  embedmuted.setDescription(`<:tick:613820461675053066> || El usuario ${tomute} ha sido muteado.`)

  const embederror = new Discord.MessageEmbed() 
  embederror.setColor("ORANGE")
  embederror.setDescription("⚠️ || No he podido silenciar al usuario mencionado, comprueba en la lista de roles que el rol ``@Muteado`` este por encima del rol que tiene el usuario mencionado.")

  if(tomute.hasPermission("MANAGE_MESSAGES")) return message.channel.send(embedmuteper);
  let x = message.guild.member("530703322882113537").roles.highest.position;

  let muterole = message.guild.roles.cache.find(m => m.name === 'Muteado');
  if(muterole){ 
      try{
      tomute.roles.add(muterole.id);
      muterole.setPosition(x-2);
      message.guild.channels.cache.forEach(async(channel)=>{
        await channel.createOverwrite(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
      return message.channel.send(embedmuted);
    }catch(e){
      console.log(e)
      return message.channel.send(embederror);
    };
  };
  if(!muterole){
    try{
      let x = message.guild.member("530703322882113537").roles.highest.position;
      muterole = await message.guild.roles.create({
        data: {
          name: 'Muteado',
          color: '#2E2C2C',
        },
      });
      await muterole.setPosition(x-2);
      tomute.roles.add(muterole.id);
      message.channel.send(embedmuted);      
      message.guild.channels.cache.forEach(async(channel)=>{
        await channel.createOverwrite(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    }catch(e){
      console.log(e)
      return message.channel.send(embederror);
    };
  };
}};