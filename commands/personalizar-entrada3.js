module.exports = {
    ayuda: `Personalizas completamente la entrada 3. ({usuario} Para el usuario y {servidor} Para el nombre del servidor)`,
    ejemplo: "personalizar-entrada3 BIENVENIDO - BIENVENIDA ,{usuario},blanco,https://i.imgur.com/Hz5xag2.jpg",
    permiso : "ADMINISTRATOR",

    run: async (client, message, args) => {
  const Discord = require("discord.js");
  const Weez = require('weez');
  const weez = new Weez.WeezAPI((process.env.API));
  const sqlite3 = require("better-sqlite3");
  const db = new sqlite3('./sadbot.sqlite3');

  const embednoper = new Discord.MessageEmbed() 
  embednoper.setColor("RED")
  embednoper.setDescription("🚫 || No tienes el permiso ``ADMINISTRATOR`` para utilizar este comando.")    
  
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send(embednoper);
  
    let splitmsg = args.join(" ").split(",");
    let textoTitulo = splitmsg[0];
    let textoDesc = splitmsg[1];
    let textoColor = splitmsg[2];
    let fondo = splitmsg[3];

    const embednotitulo = new Discord.MessageEmbed() 
    embednotitulo.setColor("ORANGE")
    embednotitulo.setDescription("⚠️ || Introduzca el titulo que desea poner.")
  
    const embednodesc = new Discord.MessageEmbed() 
    embednodesc.setColor("ORANGE")
    embednodesc.setDescription("⚠️ || Introduzca la descripcion que desea poner.")
  
    const embednocolor = new Discord.MessageEmbed() 
    embednocolor.setColor("ORANGE")
    embednocolor.setDescription("⚠️ || Tiene que introducir un color, tiene los siguientes colores disponibles, (negro/blanco/rojo/verde/azul/cyan/magenta/amarillo)")
  
    const embednofondo = new Discord.MessageEmbed() 
    embednofondo.setColor("ORANGE")
    embednofondo.setDescription("⚠️ || Tiene que introducir un link de su imagen.")

    if (!textoTitulo) return message.channel.send(embednotitulo);
    if (!textoDesc) return message.channel.send(embednodesc);
    if (!textoColor) return message.channel.send(embednocolor);
    if (!fondo) return message.channel.send(embednofondo);
    
    let textocolo = textoColor.toLowerCase();
    textocolo = textocolo.replace(/ +/g, "");
  
  switch (textocolo) {
  case "negro":
    var color = "000000";
    break;
  case "blanco":
    var color = "FFFFFF";
    break;
  case "rojo":
    var color = "FF0000";
    break;
  case "verde":
    var color = "00FF00";
    break;
  case "azul":
    var color = "0000FF";
    break;
  case "cyan":
    var color = "00FFFF";
    break;
  case "magenta":
    var color = "FF00FF";
    break;
  case "amarillo":
    var color = "FFFF00";
    break;
};

    if (!color) return message.channel.send(embednocolor);

    /*
    console.log(`Color : ${textoColor}`);
    console.log(`Titulo : ${textoTitulo}`);
    console.log(`Descripcion : ${textoDesc}`);
    console.log(`fondo : ${fondo}`);
*/

    let textoent; 
    textoent = textoTitulo.replace(/{usuario}/g,`${message.author.username}`) 
    textoent = textoent.replace(/{servidor}/g,`${message.guild.name}`) 
    let textodes; 
    textodes = textoDesc.replace(/{usuario}/g,`${message.author.username }`) 
    textodes = textodes.replace(/{servidor}/g,`${message.guild.name}`) 


    let bienvenida = new Weez.Bienvenida()
    .avatar(message.author.displayAvatarURL({format: "png"})) 
    .fondo(fondo)
    .textoColor(color)
    .textoTitulo(textoent)
    .textoDesc(textodes)
    let img = await weez.getBienvenida(bienvenida).catch(error => {

      const embederror = new Discord.MessageEmbed() 
      embederror.setColor("ORANGE")
      embederror.setDescription("⚠️ || No ha introducido una imagen de fondo correctamente.")

      return message.channel.send(embederror);
    });
    
    let dbselect = db.prepare(`SELECT entrada3_fondo FROM personalizar_comandos WHERE idserver = ${message.guild.id}`).get();

    if(!dbselect){
      db.prepare(`INSERT INTO personalizar_comandos(idserver, entrada3_fondo, entrada3_color, entrada3_titulo ,entrada3_descripcion) VALUES(${message.guild.id}, '${fondo}', '${color}', '${textoTitulo}', '${textoDesc}')`).run();
    }else{
      db.prepare(`UPDATE personalizar_comandos SET entrada3_fondo = '${fondo}' WHERE idserver = ${message.guild.id}`).run();
      db.prepare(`UPDATE personalizar_comandos SET entrada3_color = '${color}' WHERE idserver = ${message.guild.id}`).run();
      db.prepare(`UPDATE personalizar_comandos SET entrada3_titulo = '${textoTitulo}' WHERE idserver = ${message.guild.id}`).run();
      db.prepare(`UPDATE personalizar_comandos SET entrada3_descripcion = '${textoDesc}' WHERE idserver = ${message.guild.id}`).run();
    };

    const embed1 = new Discord.MessageEmbed() 
    embed1.setColor("GREEN")
    embed1.setDescription(`<:tick:613820461675053066> || Se ha modificado correctamente \n Previsualización de la entrada 3.`)
    embed1.attachFiles([{
      attachment: img,
      name: "entrada3.png"
    }])
    embed1.setImage("attachment://entrada3.png")
    
   return message.channel.send(embed1);

}};