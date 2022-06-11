module.exports = {
  ayuda: "Te dice todos los comandos del bot.",
  ejemplo: "ayuda",
  uso: "ayuda pag-(NumDePagina)",
  permiso: "Ninguno",

  run: async (client, message, args) => {
    const Discord = require("discord.js");
    const sqlite3 = require("better-sqlite3");
    const db = new sqlite3("./sadbot.sqlite3");

    let estadoeconomia = db
      .prepare(
        `SELECT economia FROM activar_desactivar WHERE idserver = ${message.guild.id}`
      )
      .get();
    let estadoautomod = db
      .prepare(
        `SELECT automod FROM activar_desactivar WHERE idserver = ${message.guild.id}`
      )
      .get();
    let estadoniveles = db
      .prepare(
        `SELECT niveles FROM activar_desactivar WHERE idserver = ${message.guild.id}`
      )
      .get();

    if (
      !estadoeconomia ||
      estadoeconomia.economia == null ||
      estadoeconomia.economia == 0
    ) {
      var modoecon = "<:134:710904299974033459>";
    } else {
      var modoecon = "<:123:710904299542020188>";
    }

    if (
      !estadoautomod ||
      estadoautomod.automod == null ||
      estadoautomod.automod == 0
    ) {
      var modomod = "<:134:710904299974033459>";
    } else {
      var modomod = "<:123:710904299542020188>";
    }

    if (
      !estadoniveles ||
      estadoniveles.niveles == null ||
      estadoniveles.niveles == 0
    ) {
      var modoniv = "<:134:710904299974033459>";
    } else {
      var modoniv = "<:123:710904299542020188>";
    }

    var color = db
      .prepare(
        `SELECT * FROM personalizar_comandos WHERE idserver = ${message.guild.id}`
      )
      .get();
    if (!color || color.colorembed == null) {
      var cembed = "#7289D9";
    } else {
      var cembed = color.colorembed;
    }

    let numpag = args[0];
    if (!numpag) {
      let embed0 = new Discord.MessageEmbed()
        .setColor(cembed)
        .setTitle("**Sad Bot**")
        .setDescription(
          "**Escribe** ``??ayuda pag-(número)`` **para ir a otra página. ** \n \n **Página 1 | " +
            modomod +
            " Moderación** \n Categoría con comandos para vetar, silenciar, auto-moderación, etc. \n **Página 2 | Diversión** \n Categoría que contiene muchos juegos divertidos y entretenidos. \n **Página 3 | Entradas - Salidas** \n Categoría para configurar el sistema de entradas y salidas. \n **Página 4 | Utilidad** \n Categoría que puede resultar de utilidad en configuración u otros eventos. \n **Página 5 | Imagenes** \n Categoría con comandos con edición de imágenes divertidos, art, memes etc. \n **Página 6 | " +
            modoniv +
            " Sistema de niveles** \n Categoría con comandos para añadir al servidor un sistema de niveles personalizable. \n **Página 7 | Videojuegos** \n Categoría útil para buscar la IP de un servidor, nombres de jugadores etc. \n **Página 8 | " +
            modoecon +
            "Economía** \n Categoría que contiene una gran variedad de comandos para impulsar la economía. "
        )
        .addField(
          "**Utiliza ``??info-comando <comando>`` para resolver tus dudas.**",
          "**Preguntas? ** \n Entra [aquí](https://sad-bot1.glitch.me/) si necesitas ayuda.",
          true
        );

      message.channel.send(embed0);
    } else if (numpag == "pag-" + 1) {
      let embed1 = new Discord.MessageEmbed()
        .setColor(cembed)
        .setTitle("**__Moderación__**")
        .setDescription(
          "**:hammer: |    Apartado de Moderación** \n `` ban | kick \n mute | unmute \n warn | warn-list \n eliminar-warn | clear`` \n \n **:hammer_pick: |    Apartado de Automoderación** " +
            modomod +
            " \n `` auto-mod | auto-mod-log \n lista-blanca | eliminar-lista-blanca``"
        );
      message.channel.send(embed1);
    } else if (numpag == "pag-" + 2) {
      let embed2 = new Discord.MessageEmbed()
        .setColor(cembed)
        .setTitle("**__Diversión__**")

        // .setDescription("``` 8ball \n moneda \n love \n meme \n di \n hack \n ruleta-rusa \n buscaminas \n akinator \n pacman \n top-pacman \n ahorcado \n top-ahorcado```  ", true)
        .setDescription(
          "**:game_die: |    Apartado de Juegos ** \n `` 8ball | ahorcado \n akinator | buscaminas \n pacman | ruleta-rusa`` \n \n **<a:diversion:618554146269823007> |    Apartado de Diversión ** \n `` love | meme \n di | hack `` \n \n **:top: |    Apartado de Top ** \n `` top-pacman | top-ahorcado`` "
        );

      message.channel.send(embed2);
    } else if (numpag == "pag-" + 3) {
      let embed3 = new Discord.MessageEmbed()
        .setColor(cembed)
        .setTitle("**__Entrada - Salida__**")
        .setDescription(
          "**:chart_with_upwards_trend: | Apartado de Entrada** \n `` entrada1 | entrada2 \n entrada3 | entrada4 \n personalizar-entrada1 \n personalizar-entrada3 \n personalizar-entrada4`` \n \n **:chart_with_downwards_trend: |    Apartado de Salida** \n \n`` salida1 | salida2 \n salida3 | salida4 \n personalizar-salida1 \n personalizar-salida3 \n personalizar-salida4``"
        );   
        message.channel.send(embed3);
    } else if (numpag == "pag-" + 4) {
      let embed4 = new Discord.MessageEmbed()
        .setColor(cembed)
        .setTitle("**__Utilidad__**")
        .setDescription(
          "**<a:utilidad:618786370382594048> | Apartado de Utilidad** \n `` afk | ascii \n avatar | bot-info \n canales | canal-log \n canal-sugerencias | color-embed \n config-nombre | contestar-sugerencia \n cowsay emoji \n encuesta | info \n info-comando | invitacion \n jumbo | prefix \n reportar-bug-bot | server-info \n sugerir | sugerir-bot \n traducir``"
        );

      message.channel.send(embed4);
    } else if (numpag == "pag-" + 5) {
      let embed5 = new Discord.MessageEmbed()
        .setColor(cembed)
        .setTitle("**__Imágenes__**")
        .setDescription(
          "**:tongue: | Apartado de Interacción** \n `` pegar | besar \n abrazar | llorar`` \n \n **:balloon: | Apartado de Diversión** \n `` trump | basura \n drake | arte \n rainbow | coche \n logro | eyes \n gru | trofeo \n cerebro | triggered \n psicopata | susto \n wallpapers``  \n \n **:horse: | Apartado de Animales** \n `` perro | gato``"
        );
      message.channel.send(embed5);
    } else if (numpag == "pag-" + 6) {
      let embed5 = new Discord.MessageEmbed()
        .setColor(cembed)
        .setTitle("**__Niveles__**")
        .setDescription(
          "**<a:niveles:618791576805572608> | Apartado de Niveles** " +
            modoniv +
            " \n `` niveles | nivel \n top-niveles | añadir-recompensa \n recompensas | set-nivel \n eliminar-recompensa | personalizar-niveles``",
          true
        );
      message.channel.send(embed5);
    } else if (numpag == "pag-" + 7) {
      let embed5 = new Discord.MessageEmbed()
        .setColor(cembed)
        .setTitle("**__Videojuegos__**")
        .setDescription(
          "**:video_game: | Apartado de Videojuegos** \n `` minecraft-info \n fortnite-stats`` ",
          true
        );
      message.channel.send(embed5);
    } else if (numpag == "pag-" + 8) {
      let embed5 = new Discord.MessageEmbed()
        .setColor(cembed)
        .setTitle("**__Economía__**")
        .setDescription(
          "**<a:economia:618554146450047009> | Apartado de Economía** " +
            modoecon +
            " \n `` economia | dinero \n trabajar | crime | daily \n dar | reclamar-daily | tienda \n añadir-tienda | eliminar-tienda | agregar-dinero \n eliminar-dinero | comprar | ruleta \n top | reiniciar-economia``"
        );
      message.channel.send(embed5);
    } else {
      let embed0 = new Discord.MessageEmbed()
        .setColor(cembed)
        .setTitle("**Sad Bot**")
        .setDescription(
          "**Escribe** ``??ayuda pag-(número)`` **para ir a otra página. ** \n "
        )
        .addField(
          "**Página 1 | Moderación**",
          "Categoría con comandos para vetar, silenciar, auto-moderación, etc."
        )
        .addField(
          "**Página 2 | Diversión**",
          "Categoría que contiene muchos juegos divertidos y entretenidos."
        )
        .addField(
          "**Página 3 | Entradas - Salidas**",
          "Categoría para configurar el sistema de entradas y salidas."
        )
        .addField(
          "**Página 4 | Utilidad**",
          "Categoría que puede resultar de utilidad en configuración u otros eventos."
        )
        .addField(
          "**Página 5 | Imagenes**",
          "Categoría con comandos con edición de imágenes divertidos, art, memes etc."
        )
        .addField(
          "**Página 6 | Sistema de niveles**",
          "Categoría con comandos para añadir al servidor un sistema de niveles personalizable."
        )
        .addField(
          "**Página 7 | Videojuegos**",
          "Categoría útil para buscar la IP de un servidor, nombres de jugadores etc."
        )
        .addField(
          "**Página 8 | Economía**",
          "Categoría que contiene una gran variedad de comandos para impulsar la economía."
        )
        .addField(
          "**Utiliza ``??info-comando <comando>`` para resolver tus dudas.**",
          "**Preguntas? ** \n Entra [aquí](https://sad-bot1.glitch.me/) si necesitas ayuda.",
          true
        );

      message.channel.send(embed0);
    }
  }
};
