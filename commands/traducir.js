module.exports = {
    ayuda: `Traduces un texto al idioma que prefieras.`,
    ejemplo: "traducir en Me gusta Sad Bot",
    permiso : "Ninguno",

    run: async (client, message, args) => {
      
const Discord = require("discord.js")
const translator = require("yandex-translate-api")("trnsl.1.1.20191221T215459Z.585b18923fbb28e6.e4715c55166c0a33a5a53173619370517dfbb082");
  const sqlite3 = require("better-sqlite3");
const db = new sqlite3('./sadbot.sqlite3');


    var color = db.prepare(`SELECT * FROM personalizar_comandos WHERE idserver = ${message.guild.id}`).get();
    if(!color || color.colorembed == null) {
        var cembed = "#7289D9";
    }else{
        var cembed = color.colorembed;
    };

    const embed = new Discord.MessageEmbed() 
    embed.setTitle("**🔤 | __Traductor__**")
    embed.setDescription('**Necesitas ingresar el idioma usando el ``ISO 639-1``. Tenemos todos los idiomas disponibles pero, en esta lista hemos agregado los idiomas que consideramos relativamente más " importantes ".** \n \n **ℹ️ | __Información sobre ISO 639-1__** \n ``ISO 639 es un conjunto de normas internacionales que enumera códigos cortos para nombres de idiomas. La siguiente es una lista completa de códigos de dos letras ( ISO 639-1 )`` \n \n **💬 | __Idiomas__** \n \n 🇸🇦 ``ar`` Árabe \n 🇨🇳 ``zh`` Chino \n 🇳🇱 ``nl`` Holandés \n 🇬🇧 ``en`` Inglés \n 🇫🇷 ``fr`` Francés \n 🇩🇪 ``de`` Alemán \n 🇮🇹 ``it`` Italiano \n 🇯🇵 ``ja`` Japonés \n 🇰🇷 ``ko`` Coreano \n 🇵🇱 ``pl`` Polaco \n 🇵🇹 ``pt`` Portugués \n 🇷🇺 ``ru`` Ruso \n 🇪🇸 ``es`` Español \n 🇹🇷 ``tr`` Turco')
    embed.addField('**Lista de todos los idiomas e información https://en.m.wikipedia.org/wiki/List_of_ISO_639-1_codes**','**Ejemplo: ??traducir en Me gusta Sad Bot**    ')
    embed.setColor(cembed)

    if(!args[0]) return message.channel.send(embed)
    let lang = args[0]; 
    let msg = args.slice(1).join(' ');

    const embedlenght = new Discord.MessageEmbed() 
    embedlenght.setColor("ORANGE")
    embedlenght.setDescription("⚠️ || Ese texto es demasiado largo.")  

    if(msg.length > 1010) return message.channel.send(embedlenght);

    const embedidioma = new Discord.MessageEmbed() 
    embedidioma.setColor("ORANGE")
    embedidioma.setDescription("⚠️ ||Introcuzca el idioma que quiera traducir el texto.")  

    if(!lang) return message.channel.send(embedidioma);

    const embednomensaje = new Discord.MessageEmbed() 
    embednomensaje.setColor("ORANGE")
    embednomensaje.setDescription("⚠️ || Introcuzca el texto que quiera traducir.")  

    if(!msg) return message.channel.send(embednomensaje);
    translator.translate(msg, { to: lang}, function(err, res) { 

        const embederror = new Discord.MessageEmbed() 
        embederror.setColor("ORANGE")
        embederror.setDescription("⚠️ || Ocurrió un error al tratar de traducir el mensaje.")      

        if(err) return message.channel.send(embederror);
      
        const embed = new Discord.MessageEmbed() 
          .setAuthor(message.author.username, message.author.displayAvatarURL)
          .setColor("#7289D9")
          .setDescription("```"+res.text+"``` \n <:traductor:658073312114638848> "+res.lang)
        message.channel.send(embed);
     });
     return;
  }
};