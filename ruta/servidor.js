    const express = require('express');
const router = express.Router();
const CheckAuth = require('../auth/auth');
const moment = require('moment')

/*
const megadb = require("megadb");

let welcome_db = new megadb.crearDB("bienvenidas")
let goodbye_db = new megadb.crearDB("despedidas")
let welcome_db2 = new megadb.crearDB("bienvenidas2")
let goodbye_db2 = new megadb.crearDB("despedidas2")
let welcome_db3 = new megadb.crearDB("bienvenidas3")
let goodbye_db3 = new megadb.crearDB("despedidas3")
let welcome_db4 = new megadb.crearDB("bienvenidas4")
let goodbye_db4 = new megadb.crearDB("despedidas4")   
let imagen_entrada = new megadb.crearDB("imagen_entrada")
let color_entrada = new megadb.crearDB("color_entrada")
let texto_entrada = new megadb.crearDB("texto_entrada")
let desc_entrada = new megadb.crearDB("desc_entrada")
let textosalida4 = new megadb.crearDB("textosalida4")
let textoentrada4 = new megadb.crearDB("textoentrada4")

let imagen_salida = new megadb.crearDB("imagen_salida")
let color_salida = new megadb.crearDB("color_salida")
let texto_salida = new megadb.crearDB("texto_salida")
let desc_salida = new megadb.crearDB("desc_salida")

let trabajar_max_min = new megadb.crearDB("trabajar_max_min")
let crime_max_min = new megadb.crearDB("crime_max_min")

let trabajar_msg = new megadb.crearDB("trabajar_msg")
let crime_msg = new megadb.crearDB("crime_msg")

let trabajar_tiempo = new megadb.crearDB("trabajar_tiempo")
let crime_tiempo = new megadb.crearDB("crime_tiempo")

let prefix_db = new megadb.crearDB("prefix")
let palabrasbloquear = new megadb.crearDB("palabrasbloquear")
*/


router.get('/:id', CheckAuth, async(req, res) => {
  let idserver = req.params.id;
  let datoServer = req.bot.guilds.cache.get(idserver);
  if(!datoServer) return res.redirect(`https://discordapp.com/oauth2/authorize?client_id=${process.env.CLIENT_ID}&scope=bot&permissions=-1&guild_id=${idserver}`)

  let datoServidores = req.user.guilds.filter(p => (p.permissions & 2146958591) === 2146958591);

  let comprobar = datoServidores.find(datoServidores => datoServidores.id == idserver)
  if(!comprobar) return res.redirect("/perfil")
  
  let baneados = await datoServer.fetchBans().then(bans => { return bans.size}); 
  let base = req.db;

  function mayusRegion(region = datoServer.region){
    return region.charAt(0).toUpperCase() + region.slice(1);
  };
  
let region = datoServer.region;
if (region === "brazil") region = "Brasil";
if (region === "eu-central") region = "Europa Central";
if (region === "hongkong") region = "Hong Kong";
if (region === "japan") region = "Japón";
if (region === "russia") region = "Rusia";
if (region === "singapore") region = "Singapur";
if (region === "southafrica") region = "Sudáfrica";
if (region === "sydney") region = "Sydney";
if (region === "us-central") region = "Estados Unidos-Central";
if (region === "us-east") region = "Estados Unidos-Este";
if (region === "us-south") region = "Estados Unidos-Sur";
if (region === "us-west") region = "Estados Unidos Oeste";
if (region === "eu-west") region = "Europa Occidental";
    
  res.render("server.ejs", {
      guild: datoServer, 
      status: (req.isAuthenticated() ? `${req.user.username}#${req.user.discriminator}` : "login"),
      client: req.bot,
      bans: baneados,
      reg: region,
      user: req.user,
      login: (req.isAuthenticated() ? "si" : "no"),
      avatarURL:`https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png`,
      iconURL:`https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png?size=32`
  })
})
.get('/confi-economia/:id', CheckAuth, async(req, res) => {
  
  let idserver = req.params.id;
  let datoServer = req.bot.guilds.cache.get(idserver);
  if(!datoServer) return res.redirect(`https://discordapp.com/oauth2/authorize?client_id=${process.env.CLIENT_ID}&scope=bot&permissions=-1&guild_id=${idserver}`)

  let datoServidores = req.user.guilds.filter(p => (p.permissions & 2146958591) === 2146958591);

  let comprobar = datoServidores.find(datoServidores => datoServidores.id == idserver)
  if(!comprobar) return res.redirect("/perfil")
  
  let base = req.db;

  function mayusRegion(region = datoServer.region){
    return region.charAt(0).toUpperCase() + region.slice(1);
  };

  
  const crmv = base.prepare(`SELECT crime_msgV FROM personalizar_comandos WHERE idserver = ${idserver}`).get();
  if(crmv && crmv.crime_msgV !== null) {       
    var tcrmv = crmv.crime_msgV;
  }else{
    var tcrmv = "Te has escapado y has robado {cantidad} monedas!";
  }; 
  
  const crmd = base.prepare(`SELECT crime_msgD FROM personalizar_comandos WHERE idserver = ${idserver}`).get();  
  if(crmd && crmd.crime_msgD !== null) {       
    var tcrmd = crmd.crime_msgD;
  }else{
    var tcrmd = "Te han detenido y has pagado una fianza de {cantidad} monedas!";
  }; 
  
  const cmx = base.prepare(`SELECT crime_max FROM personalizar_comandos WHERE idserver = ${idserver}`).get();
  if(cmx && cmx.crime_max !== null) {       
    var tcmx = cmx.crime_max;
  }else{
    var tcmx = 40;
  }; 
  
  const cmin = base.prepare(`SELECT crime_min FROM personalizar_comandos WHERE idserver = ${idserver}`).get();
  if(cmin && cmin.crime_min !== null) {       
    var tcmin = cmin.crime_min;
  }else{
    var tcmin = 10;
  }; 
    
  const ctiem = base.prepare(`SELECT crime_tiempo FROM personalizar_comandos WHERE idserver = ${idserver}`).get();
  if(ctiem && ctiem.crime_tiempo !== null) {       
    var tctiem = ctiem.crime_tiempo;
  }else{
    var tctiem = 4;
  }; 
  
  const tmsg = base.prepare(`SELECT trabajar_msg FROM personalizar_comandos WHERE idserver = ${idserver}`).get();
  if(tmsg && tmsg.trabajar_msg !== null) {       
    var ttmsg = tmsg.trabajar_msg;
  }else{
    var ttmsg = "Te han pagado {cantidad} monedas!";
  }; 
  
  const tmax = base.prepare(`SELECT trabajar_max FROM personalizar_comandos WHERE idserver = ${idserver}`).get();
  if(tmax && tmax.trabajar_max !== null) {       
    var ttmax = tmax.trabajar_max;
  }else{
    var ttmax = 30;
  }; 
  
  const tmin = base.prepare(`SELECT trabajar_min FROM personalizar_comandos WHERE idserver = ${idserver}`).get();
  if(tmin && tmin.trabajar_min !== null) {       
    var ttmin = tmin.trabajar_min;
  }else{
    var ttmin = 20;
  }; 
  
  const ttiem = base.prepare(`SELECT trabajar_tiempo FROM personalizar_comandos WHERE idserver = ${idserver}`).get();
  if(ttiem && ttiem.trabajar_tiempo !== null) {       
    var tttiem = ttiem.trabajar_tiempo;
  }else{
    var tttiem = 1;
  }; 
  
  const modoonoff = base.prepare(`SELECT economia FROM activar_desactivar WHERE idserver = ${idserver}`).get();
  if(modoonoff && modoonoff.economia !== null) {       
    var tmodoonoff = modoonoff.economia;
  }else{
    var tmodoonoff = 0;
  }; 
  
  if(tmodoonoff == undefined) var tmodoonoff = 0;
  
  const monahor = base.prepare(`SELECT monedas_ahorcado FROM personalizar_comandos WHERE idserver = ${idserver}`).get();
  if(monahor && monahor.monedas_ahorcado !== null) {       
    var tmonahor = monahor.monedas_ahorcado;
  }else{
    var tmonahor = 10;
  }; 
  
  const monpac = base.prepare(`SELECT monedas_pacman FROM personalizar_comandos WHERE idserver = ${idserver}`).get();
  if(monpac && monpac.monedas_pacman !== null) {       
    var tmonpac = monpac.monedas_pacman;
  }else{
    var tmonpac = 10;
  }; 

  
  
  res.render("confi-economia.ejs", {
      guild: datoServer, 
      status: (req.isAuthenticated() ? `${req.user.username}#${req.user.discriminator}` : "login"),
      client: req.bot,
      user: req.user,
      login: (req.isAuthenticated() ? "si" : "no"),
      avatarURL:`https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png`,
      iconURL:`https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png?size=32`,
      crmsg_v: tcrmv,
      crmsg_d: tcrmd,
      crmax: tcmx,
      modo: tmodoonoff,
      crmin: tcmin,
      crtiem: tctiem,
      tbmsg: ttmsg,
      tbmax: ttmax,
      tbmin: ttmin,
      tbtiem: tttiem,
      monpac: tmonpac,
      monaho: tmonahor
  })  
}) 
.get('/confi-utilidad/:id', CheckAuth, async(req, res) => {
    
  let idserver = req.params.id;
  let datoServer = req.bot.guilds.cache.get(idserver);
  if(!datoServer) return res.redirect(`https://discordapp.com/oauth2/authorize?client_id=${process.env.CLIENT_ID}&scope=bot&permissions=-1&guild_id=${idserver}`)

  let datoServidores = req.user.guilds.filter(p => (p.permissions & 2146958591) === 2146958591);
  
let comprobar = datoServidores.find(datoServidores => datoServidores.id == idserver)
if(!comprobar) return res.redirect("/perfil")
  
   let base = req.db;

  function mayusRegion(region = datoServer.region){
    return region.charAt(0).toUpperCase() + region.slice(1);
  };

  
  var selectprefix = base.prepare(`SELECT prefix FROM personalizar_comandos WHERE idserver = ${idserver}`).get();
    
  if (!selectprefix|| !selectprefix.prefix || selectprefix.prefix == null || selectprefix.prefix == undefined) {
      var prefix = "??";
  }else{
   var prefix = selectprefix.prefix;
  };


  var color = base.prepare(`SELECT * FROM personalizar_comandos WHERE idserver = ${idserver}`).get();
  if(!color || color.colorembed == null) {
    var cembed = "#7289D9";
  }else{
    var cembed = color.colorembed;
  };

  res.render("confi-utilidad.ejs", {
      guild: datoServer, 
      status: (req.isAuthenticated() ? `${req.user.username}#${req.user.discriminator}` : "login"),
      client: req.bot,
      user: req.user,
      prefixe: prefix,
      colembed: cembed,
      login: (req.isAuthenticated() ? "si" : "no"),
  });  
})





.get('/confi-niveles/:id', CheckAuth, async(req, res) => {
    
  let idserver = req.params.id;
  let datoServer = req.bot.guilds.cache.get(idserver);
  if(!datoServer) return res.redirect(`https://discordapp.com/oauth2/authorize?client_id=${process.env.CLIENT_ID}&scope=bot&permissions=-1&guild_id=${idserver}`)

  let datoServidores = req.user.guilds.filter(p => (p.permissions & 2146958591) === 2146958591);

  
  

let comprobar = datoServidores.find(datoServidores => datoServidores.id == idserver)
if(!comprobar) return res.redirect("/perfil")
  
  let baneados = await datoServer.fetchBans().then(bans => { return bans.size}); //nota quitar baneados para rendimiento
   let base = req.db;

  function mayusRegion(region = datoServer.region){
    return region.charAt(0).toUpperCase() + region.slice(1);
  };

  
  
  const tiemniv = base.prepare(`SELECT tiempo_niv FROM personalizar_comandos WHERE idserver = ${idserver}`).get();
  if(tiemniv && tiemniv.tiempo_niv !== null) {       
    var ttiemniv = tiemniv.tiempo_niv;
  }else{
    var ttiemniv = 5;
  };   
  
  const minxp = base.prepare(`SELECT min_xp_niv FROM personalizar_comandos WHERE idserver = ${idserver}`).get();
  if(minxp && minxp.min_xp_niv !== null) {       
    var tminxp = minxp.min_xp_niv;
  }else{
    var tminxp = 10;
  }; 

  const maxxp = base.prepare(`SELECT max_xp_niv FROM personalizar_comandos WHERE idserver = ${idserver}`).get();
  if(maxxp && maxxp.max_xp_niv !== null) {       
    var tmaxxp = maxxp.max_xp_niv;
  }else{
    var tmaxxp = 15;
  }; 

  const modoonoff = base.prepare(`SELECT niveles FROM activar_desactivar WHERE idserver = ${idserver}`).get();
  if(modoonoff && modoonoff.niveles !== null) {       
    var tmodoonoff = modoonoff.niveles;
  }else{
    var tmodoonoff = 0;
  }; 

  if(tmodoonoff == undefined) var tmodoonoff = 0;
  
  const mensajeniv = base.prepare(`SELECT mensaje_niv FROM personalizar_comandos WHERE idserver = ${idserver}`).get();
  if(mensajeniv && mensajeniv.mensaje_niv !== null) {       
    var tmensajeniv = mensajeniv.mensaje_niv;
  }else{
    var tmensajeniv = "{usuario} has subido a nivel {nivel}";
  }; 
  
  res.render("confi-niveles.ejs", {
      guild: datoServer, 
      status: (req.isAuthenticated() ? `${req.user.username}#${req.user.discriminator}` : "login"),
      client: req.bot,
      user: req.user,
      ttmensajeniv: tmensajeniv,
      modo: tmodoonoff,
      tiemniv: ttiemniv,
      ttminxp: tminxp,
      ttmaxxp: tmaxxp,
      login: (req.isAuthenticated() ? "si" : "no"),
  });  
})

.get('/confi-moderacion/:id', CheckAuth, async(req, res) => {
    
  let idserver = req.params.id;
  let datoServer = req.bot.guilds.cache.get(idserver);
  if(!datoServer) return res.redirect(`https://discordapp.com/oauth2/authorize?client_id=${process.env.CLIENT_ID}&scope=bot&permissions=-1&guild_id=${idserver}`)

  let datoServidores = req.user.guilds.filter(p => (p.permissions & 2146958591) === 2146958591);

let comprobar = datoServidores.find(datoServidores => datoServidores.id == idserver)
if(!comprobar) return res.redirect("/perfil")
  
  let baneados = await datoServer.fetchBans().then(bans => { return bans.size}); 
   let base = req.db;

  function mayusRegion(region = datoServer.region){
    return region.charAt(0).toUpperCase() + region.slice(1);
  };

  const admax = base.prepare(`SELECT advertencias_max FROM personalizar_comandos WHERE idserver = ${idserver}`).get();
  if(admax && admax.advertencias_max !== null) {       
    var tadmax = admax.advertencias_max;
  }else{
    var tadmax = "10";
  }; 
  
  const adflood = base.prepare(`SELECT advertencias_flood FROM personalizar_comandos WHERE idserver = ${idserver}`).get();  
  if(adflood && adflood.advertencias_flood !== null) {       
    var tadflood = adflood.advertencias_flood;
  }else{
    var tadflood = "3";
  }; 
  
  const adinf = base.prepare(`SELECT advertencias_inv FROM personalizar_comandos WHERE idserver = ${idserver}`).get();
  if(adinf && adinf.advertencias_inv !== null) {       
    var tadinf = adinf.advertencias_inv;
  }else{
    var tadinf = "5";
  }; 
  
  const admen = base.prepare(`SELECT advertencias_men FROM personalizar_comandos WHERE idserver = ${idserver}`).get();
  if(admen && admen.advertencias_men !== null) {       
    var tadmen = admen.advertencias_men;
  }else{
    var tadmen = "5";
  }; 
  
  const modoonoff = base.prepare(`SELECT automod FROM activar_desactivar WHERE idserver = ${idserver}`).get();
  if(modoonoff && modoonoff.automod !== null) {       
    var tmodoonoff = modoonoff.automod;
  }else{
    var tmodoonoff = 0;
  }; 

  if(tmodoonoff == undefined) var tmodoonoff = 0;
  
  let filas = base.prepare(`SELECT automod FROM activar_desactivar WHERE idserver = ${idserver}`).get();

  
  res.render("confi-moderacion.ejs", {
      guild: datoServer, 
      status: (req.isAuthenticated() ? `${req.user.username}#${req.user.discriminator}` : "login"),
      client: req.bot,
      user: req.user,
      modo: tmodoonoff,
      admaxw: tadmax,
      tadfloodw: tadflood,
      tadinfw: tadinf,
      tadmenw: tadmen,
      login: (req.isAuthenticated() ? "si" : "no"),
  });  
})
.get('/confi-entradas-salidas/:id', CheckAuth, async(req, res) => {
  
  let idserver = req.params.id;
  let datoServer = req.bot.guilds.cache.get(idserver);
  if(!datoServer) return res.redirect(`https://discordapp.com/oauth2/authorize?client_id=${process.env.CLIENT_ID}&scope=bot&permissions=-1&guild_id=${idserver}`)

  let datoServidores = req.user.guilds.filter(p => (p.permissions & 2146958591) === 2146958591);

let comprobar = datoServidores.find(datoServidores => datoServidores.id == idserver)
if(!comprobar) return res.redirect("/perfil")
  
  let baneados = await datoServer.fetchBans().then(bans => { return bans.size}); 
  let base = req.db;

  function mayusRegion(region = datoServer.region){
    return region.charAt(0).toUpperCase() + region.slice(1);
  };

  
   const ent1 = base.prepare(`SELECT canal_entrada1 FROM personalizar_comandos WHERE idserver = ${idserver}`).get();
  if(ent1 && ent1.canal_entrada1 !== null) {       
    var cent1 = ent1.canal_entrada1;
    cent1 = datoServer.channels.cache.get(cent1).name;
  }else{
    var cent1 = "Apagado";
  };

  const ent2 = base.prepare(`SELECT canal_entrada2 FROM personalizar_comandos WHERE idserver = ${idserver}`).get();
  if(ent2 && ent2.canal_entrada2 !== null) {       
    var cent2 = ent2.canal_entrada2;
    cent2 = datoServer.channels.cache.get(cent2).name;
  }else{
    var cent2 = "Apagado";
  };
  
  const ent3 = base.prepare(`SELECT canal_entrada3 FROM personalizar_comandos WHERE idserver = ${idserver}`).get();
  
  console.log(ent3)
  
  if(ent3 && ent3.canal_entrada3 !== null) {  
    var cent3 = ent3.canal_entrada3;
    cent3 = datoServer.channels.cache.get(cent3).name;
  }else{
    var cent3 = "Apagado";
  };
  
    const ent4 = base.prepare(`SELECT canal_entrada4 FROM personalizar_comandos WHERE idserver = ${idserver}`).get();
  if(ent4 && ent4.canal_entrada4 !== null) {  
    var cent4 = ent4.canal_entrada4;
    cent4 = datoServer.channels.cache.get(cent4).name;
  }else{
    var cent4 = "Apagado";
  };
  
  const sal1 = base.prepare(`SELECT canal_salida1 FROM personalizar_comandos WHERE idserver = ${idserver}`).get();
  if(sal1 && sal1.canal_salida1 !== null) {  
    var csal1 = sal1.canal_salida1;
    csal1 = datoServer.channels.cache.get(csal1).name;
  }else{
    var csal1 = "Apagado";
  };

  const sal2 = base.prepare(`SELECT canal_salida2 FROM personalizar_comandos WHERE idserver = ${idserver}`).get();
  if(sal2 && sal2.canal_salida2 !== null) {  
    var csal2 = sal2.canal_salida2;
    csal2 = datoServer.channels.cache.get(csal2).name;
  }else{
    var csal2 = "Apagado";
  };
  
  const sal3 = base.prepare(`SELECT canal_salida3 FROM personalizar_comandos WHERE idserver = ${idserver}`).get();
  if(sal3 && sal3.canal_salida3 !== null) {  
    var csal3 = sal3.canal_salida3;
    csal3 = datoServer.channels.cache.get(csal3).name;
  }else{
    var csal3 = "Apagado";
  };
  
  const sal4 = base.prepare(`SELECT canal_salida4 FROM personalizar_comandos WHERE idserver = ${idserver}`).get();
  if(sal4 && sal4.canal_salida4 !== null) {  
    var csal4 = sal4.canal_salida4;
    csal4 = datoServer.channels.cache.get(csal4).name;
  }else{
    var csal4 = "Apagado";
  };
  
  const edes3 = base.prepare(`SELECT entrada3_descripcion FROM personalizar_comandos WHERE idserver = ${idserver}`).get();
  if(edes3 && edes3.entrada3_descripcion !== null) {  
    var etdes3 = edes3.entrada3_descripcion;
  }else{
    var etdes3 = "{usuario}";
  };
  
  const sdes3 = base.prepare(`SELECT salida3_descripcion FROM personalizar_comandos WHERE idserver = ${idserver}`).get();
  if(sdes3 && sdes3.salida3_descripcion !== null) {  
    var stdes3 = sdes3.salida3_descripcion;
  }else{
    var stdes3 = "{usuario}";
  };

  const etit3 = base.prepare(`SELECT entrada3_titulo FROM personalizar_comandos WHERE idserver = ${idserver}`).get();
  if(etit3 && etit3.entrada3_titulo !== null) {       
    var ettit3 = etit3.entrada3_titulo;
  }else{
    var ettit3 = "BIENVENIDO - BIENVENIDA";
  };
  
  const cole3 = base.prepare(`SELECT entrada3_color FROM personalizar_comandos WHERE idserver = ${idserver}`).get();
  if(cole3 && cole3.entrada3_color !== null) {       
    var tcole3 = cole3.entrada3_color;
  }else{
    var tcole3 = "#ffffff";
  };
  
  const fent3 = base.prepare(`SELECT entrada3_fondo FROM personalizar_comandos WHERE idserver = ${idserver}`).get();
  if(fent3 && fent3.entrada3_fondo !== null) {       
    var tfent3 = fent3.entrada3_fondo;
  }else{
    var tfent3 = "https://cdn.discordapp.com/attachments/527103273048604672/527103304774189057/Entrada1.png";
  };  

  const cols3 = base.prepare(`SELECT salida3_color FROM personalizar_comandos WHERE idserver = ${idserver}`).get();
  if(cols3 && cols3.salida3_color !== null) {       
    var tcols3 = cols3.salida3_color;
  }else{
    var tcols3 = "#ffffff";
  };
  
  const tsal3 = base.prepare(`SELECT salida3_fondo FROM personalizar_comandos WHERE idserver = ${idserver}`).get();
  if(tsal3 && tsal3.salida3_fondo !== null) {       
    var tfsal3 = tsal3.salida3_fondo;
  }else{
    var tfsal3 = "https://cdn.discordapp.com/attachments/527103273048604672/527103435494129674/Salida1.png";
  }; 
  
   const sal3t = base.prepare(`SELECT salida3_titulo FROM personalizar_comandos WHERE idserver = ${idserver}`).get();
  if(sal3t && sal3t.salida3_titulo !== null) {       
    var tsal3t = sal3t.salida3_titulo;
  }else{
    var tsal3t = "SE FUE DEL SERVIDOR";
  }; 
   
  const tent4 = base.prepare(`SELECT entrada4_texto FROM personalizar_comandos WHERE idserver = ${idserver}`).get();
  if(tent4 && tent4.entrada4_texto !== null) {       
    var ttent4 = tent4.entrada4_texto;
  }else{
    var ttent4 = "Bienvenido {usuario}";
  }; 
  
  const tsal4 = base.prepare(`SELECT salida4_texto FROM personalizar_comandos WHERE idserver = ${idserver}`).get();
  if(tsal4 && tsal4.salida4_texto !== null) {    
    var ttsal4 = tsal4.salida4_texto;
  }else{
    var ttsal4 = "Se fue {usuario}";
  }; 
  
  const tent1= base.prepare(`SELECT texto_entrada1 FROM personalizar_comandos WHERE idserver = ${idserver}`).get();
  if(tent1 && tent1.texto_entrada1 !== null) {       
    var ttent1 = tent1.texto_entrada1;
  }else{
    var ttent1 = "Se ha unido al servidor.";
  }; 
  
  const tsal1 = base.prepare(`SELECT texto_salida1 FROM personalizar_comandos WHERE idserver = ${idserver}`).get();
  if(tsal1 && tsal1.texto_salida1 !== null) {       
    var ttsal1 = tsal1.texto_salida1;
  }else{
    var ttsal1 = "Ha dejado el servidor.";  
  }; 
  
  res.render("confi-entradas-salidas.ejs", {
      guild: datoServer, 
      status: (req.isAuthenticated() ? `${req.user.username}#${req.user.discriminator}` : "login"),
      client: req.bot,
      user: req.user,
      login: (req.isAuthenticated() ? "si" : "no"),
      entrada1: cent1,
      entrada2: cent2,
      entrada3: cent3,
      entrada4: cent4,
      salida1: csal1,
      salida2: csal2,
      salida3: csal3,
      salida4: csal4,
      descen3: etdes3,
      txten3: ettit3,
      clen3: tcole3,
      imen3: tfent3,
      descsa3: stdes3,
      clsa3: tcols3,
      titusa3: tsal3t,
      imsa3: tfsal3,
      te4: ttent4,
      ts4: ttsal4,  
      te1: ttent1,
      ts1: ttsal1,
      user: req.user,
      avatarURL:`https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png`,
      iconURL:`https://cdn.discordapp.com/avatars/${req.user.id}/${req.user.avatar}.png?size=32`,    
  })
})
.post('/confi-niveles/:id/confi', CheckAuth, async(req, res) => {

      let base = req.db;
      let idserver = req.params.id;

      let tiemniv = req.body.tiemnv;
      let maxxpniv = req.body.maxxp;
      let minxpniv = req.body.minxp;
      let menniv = req.body.mensniv;

                
      let percomdb = base.prepare(`SELECT * FROM personalizar_comandos WHERE idserver = ${idserver}`).get();
  
      if(tiemniv !== "5"){
        
        if(!percomdb){
          base.prepare(`INSERT INTO personalizar_comandos(idserver, tiempo_niv) VALUES(${idserver}, ${tiemniv})`).run();
          percomdb = base.prepare(`SELECT * FROM personalizar_comandos WHERE idserver = ${idserver}`).get();
        }else{
          base.prepare(`UPDATE personalizar_comandos SET tiempo_niv = ${tiemniv} WHERE idserver = ${idserver}`).run();
        };
      };
  
      if(maxxpniv !== "15"){
        if(!percomdb){
          base.prepare(`INSERT INTO personalizar_comandos(idserver, max_xp_niv) VALUES(${idserver}, ${maxxpniv})`).run();
          percomdb = base.prepare(`SELECT * FROM personalizar_comandos WHERE idserver = ${idserver}`).get();
        }else{
          base.prepare(`UPDATE personalizar_comandos SET max_xp_niv = ${maxxpniv} WHERE idserver = ${idserver}`).run();
        };
      };

      if(minxpniv !== "10"){
        if(!percomdb){
          base.prepare(`INSERT INTO personalizar_comandos(idserver, min_xp_niv) VALUES(${idserver}, ${minxpniv})`).run();
          percomdb = base.prepare(`SELECT * FROM personalizar_comandos WHERE idserver = ${idserver}`).get();
        }else{
          base.prepare(`UPDATE personalizar_comandos SET min_xp_niv = ${minxpniv} WHERE idserver = ${idserver}`).run();
        };
      };

        if(menniv !== "{usuario} has subido a nivel {nivel}"){
        if(!percomdb){
          base.prepare(`INSERT INTO personalizar_comandos(idserver, mensaje_niv) VALUES(${idserver}, '${menniv}')`).run();
          percomdb = base.prepare(`SELECT * FROM personalizar_comandos WHERE idserver = ${idserver}`).get();
        }else{
          base.prepare(`UPDATE personalizar_comandos SET mensaje_niv = '${menniv}' WHERE idserver = ${idserver}`).run();
        };
      };
  
  
      res.redirect(`/server/confi-niveles/${idserver}`); 
     
})


/*


          db.prepare(`INSERT INTO personalizar_comandos(idserver, canal_niv, mensaje_niv) VALUES(${message.guild.id}, ${iniv}, '${itext}')`).run();





  db.prepare("ALTER TABLE personalizar_comandos ADD max_xp_niv TEXT").run();
  db.prepare("ALTER TABLE personalizar_comandos ADD min_xp_niv TEXT").run();
  db.prepare("ALTER TABLE personalizar_comandos ADD tiempo_niv TEXT").run();


*/





.post('/confi-moderacion/:id/modo', CheckAuth, async(req, res) => {

      let base = req.db;
      let idserver = req.params.id;

        let modoautomod = req.body.modo;
                
        let filas = base.prepare(`SELECT automod FROM activar_desactivar WHERE idserver = ${idserver}`).get();
        
          if(filas || filas == null && filas !== undefined){
            base.prepare(`UPDATE activar_desactivar SET automod = ${modoautomod} WHERE idserver = ${idserver}`).run();  
          }else{
            base.prepare(`INSERT INTO activar_desactivar(idserver, automod) VALUES(${idserver}, ${modoautomod})`).run();
          };
 
      res.redirect(`/server/confi-moderacion/${idserver}`); 
     
})
.post('/confi-economia/:id/modo', CheckAuth, async(req, res) => {
  
        let base = req.db;
        let idserver = req.params.id;

        let modoecon = req.body.modo;
                
        let filas = base.prepare(`SELECT automod FROM activar_desactivar WHERE idserver = ${idserver}`).get();
        
          if(filas || filas == null && filas !== undefined){
            base.prepare(`UPDATE activar_desactivar SET economia = ${modoecon} WHERE idserver = ${idserver}`).run();  
          }else{
            base.prepare(`INSERT INTO activar_desactivar(idserver, economia) VALUES(${idserver}, ${modoecon})`).run();
          };
   
    res.redirect(`/server/confi-economia/${idserver}`); 

})
.post('/confi-niveles/:id/modo', CheckAuth, async(req, res) => {
  
        let base = req.db;
        let idserver = req.params.id;

        let modoniv = req.body.modo;
                
        let filas = base.prepare(`SELECT niveles FROM activar_desactivar WHERE idserver = ${idserver}`).get();

  console.log(modoniv)
  
          if(filas || filas == null && filas !== undefined){
            console.log("1234asdf")
            base.prepare(`UPDATE activar_desactivar SET niveles = ${modoniv} WHERE idserver = ${idserver}`).run();  
          }else{
            console.log("asdf1324")
            base.prepare(`INSERT INTO activar_desactivar(idserver, niveles) VALUES(${idserver}, ${modoniv})`).run();
          };
   
    res.redirect(`/server/confi-niveles/${idserver}`); 

})
.post('/confi-economia/:id/juegos', CheckAuth, async(req, res) => {

      let base = req.db;
      let idserver = req.params.id;
      let monedasahorcado = req.body.monahorcado;
      let monedaspacman = req.body.monpacman;

      let filas = base.prepare(`SELECT monedas_ahorcado FROM personalizar_comandos WHERE idserver = ${idserver}`).get();
  
      if(filas.monedas_ahorcado == null || filas.monedas_ahorcado){
        base.prepare(`UPDATE personalizar_comandos SET monedas_ahorcado = ${monedasahorcado} WHERE idserver = ${idserver}`).run();  
      }else{
        base.prepare(`INSERT INTO personalizar_comandos(idserver, monedas_ahorcado) VALUES(${idserver}, ${monedasahorcado})`).run();
      };
  
      let filas2 = base.prepare(`SELECT monedas_pacman FROM personalizar_comandos WHERE idserver = ${idserver}`).get();
  
      if(filas.monedas_pacman == null || filas.monedas_pacman){
        base.prepare(`UPDATE personalizar_comandos SET monedas_pacman = ${monedaspacman} WHERE idserver = ${idserver}`).run();  
      }else{
        base.prepare(`INSERT INTO personalizar_comandos(idserver, monedas_pacman) VALUES(${idserver}, ${monedaspacman})`).run();
      };
  
    res.redirect(`/server/confi-economia/${idserver}`); 

})

.post('/confi-moderacion/:id/confi', CheckAuth, async(req, res) => {

      let base = req.db;
      let idserver = req.params.id;
      let advmax = req.body.admax;
      let advflood = req.body.adflood;
      let advmen = req.body.admen;
      let advinv = req.body.adinv;

  
      let percomdb = base.prepare(`SELECT * FROM personalizar_comandos WHERE idserver = ${idserver}`).get();
  
      if(advmax !== "10"){
        
        if(!percomdb){
          base.prepare(`INSERT INTO personalizar_comandos(idserver, advertencias_max) VALUES(${idserver}, ${advmax})`).run();
          percomdb = base.prepare(`SELECT * FROM personalizar_comandos WHERE idserver = ${idserver}`).get();
        }else{
          base.prepare(`UPDATE personalizar_comandos SET advertencias_max = ${advmax} WHERE idserver = ${idserver}`).run();
        };
      };
  
      if(advflood !== "3"){
        if(!percomdb){
          base.prepare(`INSERT INTO personalizar_comandos(idserver, advertencias_flood) VALUES(${idserver}, ${advflood})`).run();
          percomdb = base.prepare(`SELECT * FROM personalizar_comandos WHERE idserver = ${idserver}`).get();
        }else{
          base.prepare(`UPDATE personalizar_comandos SET advertencias_flood = ${advflood} WHERE idserver = ${idserver}`).run();
        };
      };

      if(advmen !== "5"){
        if(!percomdb){
          base.prepare(`INSERT INTO personalizar_comandos(idserver, advertencias_men) VALUES(${idserver}, ${advmen})`).run();
          percomdb = base.prepare(`SELECT * FROM personalizar_comandos WHERE idserver = ${idserver}`).get();
        }else{
          base.prepare(`UPDATE personalizar_comandos SET advertencias_men = ${advmen} WHERE idserver = ${idserver}`).run();
        };
      };

        if(advinv !== "5"){
        if(!percomdb){
          base.prepare(`INSERT INTO personalizar_comandos(idserver, advertencias_inv) VALUES(${idserver}, ${advinv})`).run();
          percomdb = base.prepare(`SELECT * FROM personalizar_comandos WHERE idserver = ${idserver}`).get();
        }else{
          base.prepare(`UPDATE personalizar_comandos SET advertencias_inv = ${advinv} WHERE idserver = ${idserver}`).run();
        };
      };
      res.redirect(`/server/${idserver}`); 

})
.post('/confi-economia/:id/traba', CheckAuth, async(req, res) => {

    let base = req.db;
  
    let idserver = req.params.id;
    let tb_min = req.body.tb_min;
    let tb_max = req.body.tb_max;
    let tb_tiempo = req.body.tb_tiempo;
    let tb_msg = req.body.tb_msg;

    let percomdb = base.prepare(`SELECT * FROM personalizar_comandos WHERE idserver = ${idserver}`).get();

    if(tb_max){
      if(!percomdb){
        base.prepare(`INSERT INTO personalizar_comandos(idserver, trabajar_max) VALUES(${idserver}, ${tb_max})`).run();
        percomdb = base.prepare(`SELECT * FROM personalizar_comandos WHERE idserver = ${idserver}`).get();
      }else{
        base.prepare(`UPDATE personalizar_comandos SET trabajar_max = ${tb_max} WHERE idserver = ${idserver}`).run();
      };
    };
  
     if(tb_min){
      if(!percomdb){
        base.prepare(`INSERT INTO personalizar_comandos(idserver, trabajar_min) VALUES(${idserver}, ${tb_min})`).run();
        percomdb = base.prepare(`SELECT * FROM personalizar_comandos WHERE idserver = ${idserver}`).get();
      }else{
        base.prepare(`UPDATE personalizar_comandos SET trabajar_min = ${tb_min} WHERE idserver = ${idserver}`).run();
      };
    };
  
    if(tb_tiempo){
    if(!percomdb){
      base.prepare(`INSERT INTO personalizar_comandos(idserver, trabajar_tiempo) VALUES(${idserver}, ${tb_tiempo})`).run();
      percomdb = base.prepare(`SELECT * FROM personalizar_comandos WHERE idserver = ${idserver}`).get();
    }else{
      base.prepare(`UPDATE personalizar_comandos SET trabajar_tiempo = ${tb_tiempo} WHERE idserver = ${idserver}`).run();
    };
  };
  
  if(tb_msg){  
    if(!percomdb){
      base.prepare(`INSERT INTO personalizar_comandos(idserver, trabajar_msg) VALUES(${idserver}, '${tb_msg}')`).run();
      percomdb = base.prepare(`SELECT * FROM personalizar_comandos WHERE idserver = ${idserver}`).get();
    }else{
      base.prepare(`UPDATE personalizar_comandos SET trabajar_msg = '${tb_msg}' WHERE idserver = ${idserver}`).run();
    };
  };
  
    res.redirect(`/server/${idserver}`); 

})
.post('/confi-economia/:id/crim', CheckAuth, async(req, res) => {
      
    let idserver = req.params.id;
    let cr_min = req.body.cm_min;
    let cr_max = req.body.cm_max;
    let cr_tiempo = req.body.cm_tiempo;
    let cm_V = req.body.cm_V;
    let cm_D = req.body.cm_D;
    let base = req.db;

  
      let percomdb = base.prepare(`SELECT * FROM personalizar_comandos WHERE idserver = ${idserver}`).get();

    if(cr_max){
      if(!percomdb){
        base.prepare(`INSERT INTO personalizar_comandos(idserver, crime_max) VALUES(${idserver}, ${cr_max})`).run();
        percomdb = base.prepare(`SELECT * FROM personalizar_comandos WHERE idserver = ${idserver}`).get();
      }else{
        base.prepare(`UPDATE personalizar_comandos SET crime_max = ${cr_max} WHERE idserver = ${idserver}`).run();
      };
    };
  
     if(cr_min){
      if(!percomdb){
        base.prepare(`INSERT INTO personalizar_comandos(idserver, crime_min) VALUES(${idserver}, ${cr_min})`).run();
        percomdb = base.prepare(`SELECT * FROM personalizar_comandos WHERE idserver = ${idserver}`).get();
      }else{
        base.prepare(`UPDATE personalizar_comandos SET crime_min = ${cr_min} WHERE idserver = ${idserver}`).run();
      };
    };
  
    if(cr_tiempo){
    if(!percomdb){
      base.prepare(`INSERT INTO personalizar_comandos(idserver, crime_tiempo) VALUES(${idserver}, ${cr_tiempo})`).run();
      percomdb = base.prepare(`SELECT * FROM personalizar_comandos WHERE idserver = ${idserver}`).get();
    }else{
      base.prepare(`UPDATE personalizar_comandos SET crime_tiempo = ${cr_tiempo} WHERE idserver = ${idserver}`).run();
    };
  };
  
  if(cm_V){  
    if(!percomdb){
      base.prepare(`INSERT INTO personalizar_comandos(idserver, crime_msgV) VALUES(${idserver}, '${cm_V}')`).run();
      percomdb = base.prepare(`SELECT * FROM personalizar_comandos WHERE idserver = ${idserver}`).get();
    }else{
      base.prepare(`UPDATE personalizar_comandos SET crime_msgV = '${cm_V}' WHERE idserver = ${idserver}`).run();
    };
  };
  
  if(cm_D){  
    if(!percomdb){
      base.prepare(`INSERT INTO personalizar_comandos(idserver, crime_msgD) VALUES(${idserver}, '${cm_D}')`).run();
      percomdb = base.prepare(`SELECT * FROM personalizar_comandos WHERE idserver = ${idserver}`).get();
    }else{
      base.prepare(`UPDATE personalizar_comandos SET crime_msgD = '${cm_D}' WHERE idserver = ${idserver}`).run();
    };
  };

    res.redirect(`/server/${idserver}`); 

})

.post('/:idServer', CheckAuth, async(req, res) => {
  let idserver = req.params.idServer;
  let msg_enviar = req.body.msg_send;
  let id_channel = req.body.channel_ID;
  
  if(!id_channel || id_channel === 'no_select') return res.redirect('../error404')
  if(!msg_enviar || msg_enviar.lenght === 0) return res.redirect('../error404')
 
  const Discord = require("discord.js");
  
  const embed = new Discord.MessageEmbed() 
    .setTitle("Anuncio")
    .setColor("#7289D9")
    .setDescription(`${msg_enviar}`)
  
  await req.bot.guilds.cache.get(idserver).channels.cache.get(id_channel).send(embed);
  await res.redirect(`/server/${idserver}`);
  
  
})
.post('/:id/prefix', CheckAuth, async(req, res) => {
    let idserver = req.params.id;
    let newPrefix = req.body.newPrefix;
    
    let base = req.db;
    var selectprefix = base.prepare(`SELECT prefix FROM personalizar_comandos WHERE idserver = ${idserver}`).get();

    if(!selectprefix){
      base.prepare(`INSERT INTO personalizar_comandos(idserver, prefix) VALUES(${idserver}, '${newPrefix}')`).run();
    }else{
      base.prepare(`UPDATE personalizar_comandos SET prefix = '${newPrefix}' WHERE idserver = ${idserver}`).run();
    };
    res.redirect(`/server/${idserver}`);

})

.post('/:id/colembed', CheckAuth, async(req, res) => {
    let idserver = req.params.id;
    let colorembed = req.body.cembed;
    
    console.log(colorembed)
    let base = req.db;
  
  
    let filas = base.prepare(`SELECT colorembed FROM personalizar_comandos WHERE idserver = ${idserver}`).get();
    if(!filas){
      base.prepare(`INSERT INTO personalizar_comandos(idserver, colorembed) VALUES(${idserver}, '${colorembed}')`).run();
    }else{
      base.prepare(`UPDATE personalizar_comandos SET colorembed = '${colorembed}' WHERE idserver = ${idserver}`).run();
    };

    res.redirect(`/server/${idserver}`);

})

.post('/:id/welcome1', CheckAuth, async(req, res) => {
      
    let idserver = req.params.id;
    let id_channel = req.body.channel_ID;
    let base = req.db;
    let texto = req.body.msgen1;

    console.log(req.body)

  let filas = base.prepare(`SELECT salida1 FROM activar_desactivar WHERE idserver = ${idserver}`).get();
  let filasdb = base.prepare(`SELECT canal_salida1 FROM personalizar_comandos WHERE idserver = ${idserver}`).get();
  let dbselect = base.prepare(`SELECT texto_salida1 FROM personalizar_comandos WHERE idserver = ${idserver}`).get();
  
if(!isNaN(id_channel)){
  if(id_channel.toLowerCase() == "apagado") {
    
    if(!filas) {   
      base.prepare(`INSERT INTO activar_desactivar(idserver, salida1) VALUES(${idserver}, ${0})`).run();
    }else{
      base.prepare(`UPDATE activar_desactivar SET salida1 = ${0} WHERE idserver = ${idserver}`).run();
    };
    
  }else{
   if(!filasdb) {    
     base.prepare(`INSERT INTO personalizar_comandos(idserver, canal_salida1) VALUES(${idserver}, ${id_channel})`).run();
   }else{
     base.prepare(`UPDATE personalizar_comandos SET canal_salida1 = ${id_channel} WHERE idserver = ${idserver}`).run();
   }; 
    
   if(!filas) {     
     base.prepare(`INSERT INTO activar_desactivar(idserver, salida1) VALUES(${idserver}, ${1})`).run();
   }else{
     base.prepare(`UPDATE activar_desactivar SET salida1 = ${1} WHERE idserver = ${idserver}`).run();
   }; 
    
  };
};  

  if(!dbselect){
    base.prepare(`INSERT INTO personalizar_comandos(idserver, texto_entrada1) VALUES(${idserver}, '${texto}')`).run();
  }else{
    base.prepare(`UPDATE personalizar_comandos SET texto_entrada1 = '${texto}' WHERE idserver = ${idserver}`).run();
  };
  
  res.redirect(`/server/${idserver}`); 

})
.post('/:id/leave1', CheckAuth, async(req, res) => {
      
    let idserver = req.params.id;
    let id_channel = req.body.channel_ID;
    let base = req.db; 
    let texto = req.body.msgsalida1;

  
  console.log(req.body)
  
  let filas = base.prepare(`SELECT salida1 FROM activar_desactivar WHERE idserver = ${idserver}`).get();
  let filasdb = base.prepare(`SELECT canal_salida1 FROM personalizar_comandos WHERE idserver = ${idserver}`).get();
  let dbselect = base.prepare(`SELECT texto_salida1 FROM personalizar_comandos WHERE idserver = ${idserver}`).get();

  if(!isNaN(id_channel)){
    if(id_channel.toLowerCase() == "apagado") {

      if(!filas) {   
        base.prepare(`INSERT INTO activar_desactivar(idserver, salida1) VALUES(${idserver}, ${0})`).run();
      }else{
        base.prepare(`UPDATE activar_desactivar SET salida1 = ${0} WHERE idserver = ${idserver}`).run();
      };

    }else{
     if(!filasdb) {    
       base.prepare(`INSERT INTO personalizar_comandos(idserver, canal_salida1) VALUES(${idserver}, ${id_channel})`).run();
     }else{
       base.prepare(`UPDATE personalizar_comandos SET canal_salida1 = ${id_channel} WHERE idserver = ${idserver}`).run();
       base.prepare(`UPDATE personalizar_comandos SET canal_salida1 = ${id_channel} WHERE idserver = ${idserver}`).run();

     }; 

     if(!filas) {     
       base.prepare(`INSERT INTO activar_desactivar(idserver, salida1) VALUES(${idserver}, ${1})`).run();
     }else{
       base.prepare(`UPDATE activar_desactivar SET salida1 = ${1} WHERE idserver = ${idserver}`).run();
     }; 

    };
  };

  if(!dbselect){
    base.prepare(`INSERT INTO personalizar_comandos(idserver, texto_salida1) VALUES(${idserver}, '${texto}')`).run();
  }else{
    base.prepare(`UPDATE personalizar_comandos SET texto_salida1 = '${texto}' WHERE idserver = ${idserver}`).run();
  };
  
  res.redirect(`/server/${idserver}`); 

})

.post('/:id/welcome2', CheckAuth, async(req, res) => {
      
    let idserver = req.params.id;
    let id_channel = req.body.channel_ID;
    let base = req.db    

  let filas = base.prepare(`SELECT entrada2 FROM activar_desactivar WHERE idserver = ${idserver}`).get();
  let filasdb = base.prepare(`SELECT canal_entrada2 FROM personalizar_comandos WHERE idserver = ${idserver}`).get();
  
  if(id_channel.toLowerCase() == "apagado") {
    
    if(!filas) {     
      base.prepare(`INSERT INTO activar_desactivar(idserver, entrada2) VALUES(${idserver}, ${0})`).run();
    }else{
      base.prepare(`UPDATE activar_desactivar SET entrada2 = ${0} WHERE idserver = ${idserver}`).run();
    };
    
  }else{
    
   if(!filasdb) {   
     base.prepare(`INSERT INTO personalizar_comandos(idserver, canal_entrada2) VALUES(${idserver}, ${id_channel})`).run();
   }else{
     base.prepare(`UPDATE personalizar_comandos SET canal_entrada2 = ${id_channel} WHERE idserver = ${idserver}`).run();
   }; 
    
    if(!filas) {     
     base.prepare(`INSERT INTO activar_desactivar(idserver, entrada2) VALUES(${idserver}, ${1})`).run();
   }else{
     base.prepare(`UPDATE activar_desactivar SET entrada2 = ${1} WHERE idserver = ${idserver}`).run();
   }; 
    
  };   
  res.redirect(`/server/${idserver}`); 

})
.post('/:id/salida2', CheckAuth, async(req, res) => {
      
    let idserver = req.params.id;
    let id_channel = req.body.channel_ID;
    let base = req.db;   

  let filas = base.prepare(`SELECT salida2 FROM activar_desactivar WHERE idserver = ${idserver}`).get();
  let filasdb = base.prepare(`SELECT canal_salida2 FROM personalizar_comandos WHERE idserver = ${idserver}`).get();
  
  if(id_channel.toLowerCase() == "apagado") {
    
    if(filas && filas.salida2 ) {       
      base.prepare(`UPDATE activar_desactivar SET salida2 = ${0} WHERE idserver = ${idserver}`).run();
    }else{
      base.prepare(`INSERT INTO activar_desactivar(idserver, salida2) VALUES(${idserver}, ${0})`).run();
    };
    
  }else{
    
   if(!filasdb) {       
     base.prepare(`INSERT INTO personalizar_comandos(idserver, canal_salida2) VALUES(${idserver}, ${id_channel})`).run();
     base.prepare(`UPDATE personalizar_comandos SET canal_salida2 = ${id_channel} WHERE idserver = ${idserver}`).run();
   }else{
     base.prepare(`UPDATE personalizar_comandos SET canal_salida2 = ${id_channel} WHERE idserver = ${idserver}`).run();
   }; 
    
   if(!filas) {     
     base.prepare(`INSERT INTO activar_desactivar(idserver, salida2) VALUES(${idserver}, ${1})`).run();
   }else{
     base.prepare(`UPDATE activar_desactivar SET salida2 = ${1} WHERE idserver = ${idserver}`).run();
   }; 
    
  };       
  res.redirect(`/server/${idserver}`); 

})
.post('/:id/welcome3', CheckAuth, async(req, res) => {
      
    let idserver = req.params.id;
    let msg_welcome = req.body.msg_Welcome;
    let id_channel = req.body.channel_ID;
    let titulo = req.body.titulo_entrada;
    let desc = req.body.desc_entrada;
    let link = req.body.link_entrada;
    let color = req.body.color_entrada;
    let base = req.db;   

  
    console.log('ID CHANNEL: '+ id_channel)
    console.log('Titulo: '+ titulo)
    console.log('Desc: '+ desc)
    console.log('Link: '+ link)
    console.log('Color: '+ color)

    let filas = base.prepare(`SELECT entrada3 FROM activar_desactivar WHERE idserver = ${idserver}`).get();
    let filasdb = base.prepare(`SELECT canal_entrada3 FROM personalizar_comandos WHERE idserver = ${idserver}`).get();
    let dbselect = base.prepare(`SELECT entrada3_fondo FROM personalizar_comandos WHERE idserver = ${idserver}`).get();

    if(id_channel.toLowerCase() == "apagado") {
    
    if(!filas) {   
      base.prepare(`INSERT INTO activar_desactivar(idserver, entrada3) VALUES(${idserver}, ${0})`).run();
    }else{
      base.prepare(`UPDATE activar_desactivar SET entrada3 = ${0} WHERE idserver = ${idserver}`).run();
    };
    
  }else{
    
   if(!filasdb) {   
     base.prepare(`INSERT INTO personalizar_comandos(idserver, canal_entrada3) VALUES(${idserver}, ${id_channel})`).run();
   }else{
     base.prepare(`UPDATE personalizar_comandos SET canal_entrada3 = ${id_channel} WHERE idserver = ${idserver}`).run();
   }; 
    
   if(!filas) {    
     base.prepare(`INSERT INTO activar_desactivar(idserver, entrada3) VALUES(${idserver}, ${1})`).run();
   }else{
     base.prepare(`UPDATE activar_desactivar SET entrada3 = ${1} WHERE idserver = ${idserver}`).run();
   }; 
    
  }; 
  
  if(!dbselect){
    base.prepare(`INSERT INTO personalizar_comandos(idserver, entrada3_fondo, entrada3_color, entrada3_titulo ,entrada3_descripcion) VALUES(${idserver}, '${link}', '${color}', '${titulo}', '${desc}')`).run();
  }else{
    base.prepare(`UPDATE personalizar_comandos SET entrada3_fondo = '${link}' WHERE idserver = ${idserver}`).run();
    base.prepare(`UPDATE personalizar_comandos SET entrada3_color = '${color}' WHERE idserver = ${idserver}`).run();
    base.prepare(`UPDATE personalizar_comandos SET entrada3_titulo = '${titulo}' WHERE idserver = ${idserver}`).run();
    base.prepare(`UPDATE personalizar_comandos SET entrada3_descripcion = '${desc}' WHERE idserver = ${idserver}`).run();
  };

  
  /*
let texto = "Canal actual"  
    if(id_channel.includes(texto)) {
   console.log("a")
   }
    if(!id_channel.includes(texto)) {
   if(id_channel) {welcome_db3.establecer(`${idserver}`, `${id_channel}`)}
        console.log("b")

   }
 
//   if(id_channel) {welcome_db3.establecer(`${idserver}`, `${id_channel}`)}
    if(link) {imagen_entrada.establecer(`${idserver}.lista_links`,link)}
    if(color) {color_entrada.establecer(`${idserver}.lista_color`,color)}
    if(titulo) {texto_entrada.establecer(`${idserver}.lista_titulo`,titulo)}
    if(desc) {desc_entrada.establecer(`${idserver}.lista_desc`,desc)}
  */
    res.redirect(`/server/${idserver}`); 

})
.post('/:id/salida3', CheckAuth, async(req, res) => {
      
    let idserver = req.params.id;
    let msg_leave = req.body.msg_Leave;
    let id_channel = req.body.channel_ID;
    let titulo = req.body.titulo_salida;
    let desc = req.body.desc_salida;
    let link = req.body.link_salida;
    let color = req.body.color_salida;
    let base = req.db;   

    let filas = base.prepare(`SELECT salida3 FROM activar_desactivar WHERE idserver = ${idserver}`).get();
    let filasdb = base.prepare(`SELECT canal_salida3 FROM personalizar_comandos WHERE idserver = ${idserver}`).get();
    let dbselect = base.prepare(`SELECT salida3_fondo FROM personalizar_comandos WHERE idserver = ${idserver}`).get();

  
    if(id_channel.toLowerCase() == "apagado") {
    
    if(!filas) {
      base.prepare(`INSERT INTO activar_desactivar(idserver, salida3) VALUES(${idserver}, ${0})`).run();
    }else{
      base.prepare(`UPDATE activar_desactivar SET salida3 = ${0} WHERE idserver = ${idserver}`).run();
    };
    
  }else{
    
   if(!filasdb) {       
     base.prepare(`INSERT INTO personalizar_comandos(idserver, canal_salida3) VALUES(${idserver}, ${id_channel})`).run();
   }else{
     base.prepare(`UPDATE personalizar_comandos SET canal_salida3 = ${id_channel} WHERE idserver = ${idserver}`).run();
   }; 
    
   if(!filas) {       
     base.prepare(`INSERT INTO activar_desactivar(idserver, salida3) VALUES(${idserver}, ${1})`).run();
   }else{
     base.prepare(`UPDATE activar_desactivar SET salida3 = ${1} WHERE idserver = ${idserver}`).run();
   }; 
    
  }; 
  
  if(!dbselect){
    base.prepare(`INSERT INTO personalizar_comandos(idserver, salida3_fondo, salida3_color, salida3_titulo ,salida3_descripcion) VALUES(${idserver}, '${link}', '${color}', '${titulo}', '${desc}')`).run();
  }else{
    base.prepare(`UPDATE personalizar_comandos SET salida3_fondo = '${link}' WHERE idserver = ${idserver}`).run();
    base.prepare(`UPDATE personalizar_comandos SET salida3_color = '${color}' WHERE idserver = ${idserver}`).run();
    base.prepare(`UPDATE personalizar_comandos SET salida3_titulo = '${titulo}' WHERE idserver = ${idserver}`).run();
    base.prepare(`UPDATE personalizar_comandos SET salida3_descripcion = '${desc}' WHERE idserver = ${idserver}`).run();
  };
  
 /*
    let texto = "Canal actual"  
    if(id_channel.includes(texto)) {
   console.log("a")
   }
    if(!id_channel.includes(texto)) {
   if(id_channel) {goodbye_db3.establecer(`${idserver}`, `${id_channel}`)}
        console.log("b")

   }
    
//    if(id_channel) {goodbye_db3.establecer(`${idserver}`, `${id_channel}`)}
    if(link) {imagen_salida.establecer(`${idserver}.lista_links`,link)}
    if(color) {color_salida.establecer(`${idserver}.lista_color`,color)}
    if(titulo) {texto_salida.establecer(`${idserver}.lista_titulo`,titulo)}
    if(desc) {desc_salida.establecer(`${idserver}.lista_desc`,desc)}
   */ 
    console.log('ID CHANNEL: '+ id_channel)
    res.redirect(`/server/${idserver}`); 

})

.post('/:id/welcome4', CheckAuth, async(req, res) => {
      
    let idserver = req.params.id;
    let msg_entrada = req.body.msg_entrada;
    let id_channel = req.body.channel_ID;
    let base = req.db;   
  
  
    let dbselect = base.prepare(`SELECT entrada4_texto FROM personalizar_comandos WHERE idserver = ${idserver}`).get();
    let filas = base.prepare(`SELECT entrada4 FROM activar_desactivar WHERE idserver = ${idserver}`).get();
    let filasdb = base.prepare(`SELECT canal_entrada4 FROM personalizar_comandos WHERE idserver = ${idserver}`).get();
  
    if(!dbselect){
      base.prepare(`INSERT INTO personalizar_comandos(idserver, entrada4_texto) VALUES(${idserver}, '${msg_entrada}')`).run();
    }else{
      base.prepare(`UPDATE personalizar_comandos SET entrada4_texto = '${msg_entrada}' WHERE idserver = ${idserver}`).run();
    };

  if(id_channel.toLowerCase() == "apagado") {
    
    if(!filas) {    
      base.prepare(`INSERT INTO activar_desactivar(idserver, entrada4) VALUES(${idserver}, ${0})`).run();
    }else{
      base.prepare(`UPDATE activar_desactivar SET entrada4 = ${0} WHERE idserver = ${idserver}`).run();
    };
    
  }else{
    
   if(!filasdb) {       
     base.prepare(`INSERT INTO personalizar_comandos(idserver, canal_entrada4) VALUES(${idserver}, ${id_channel})`).run();
   }else{
     base.prepare(`UPDATE personalizar_comandos SET canal_entrada4 = ${id_channel} WHERE idserver = ${idserver}`).run(); 
   }; 
    
   if(!filas) {     
     base.prepare(`INSERT INTO activar_desactivar(idserver, entrada4) VALUES(${idserver}, ${1})`).run();
   }else{
     base.prepare(`UPDATE activar_desactivar SET entrada4 = ${1} WHERE idserver = ${idserver}`).run();
   }; 
  }; 
  
  
  
  
  /*
    let texto = "Canal actual"  
    if(id_channel.includes(texto)) {
   console.log("a")
   }
    if(!id_channel.includes(texto)) {
   if(id_channel) {welcome_db4.establecer(`${idserver}`, `${id_channel}`)}
        console.log("b")

   }  
  
//    if(id_channel) {welcome_db4.establecer(`${idserver}`, `${id_channel}`)}
    if(msg_entrada) {textoentrada4.establecer(`${idserver}.lista_links`, `${msg_entrada}`)}

    console.log('ID CHANNEL: '+ id_channel) */
    res.redirect(`/server/${idserver}`); 

})

.post('/:id/salida4', CheckAuth, async(req, res) => {
      
    let idserver = req.params.id;
    let msg_leave = req.body.msg_Leave;
    let id_channel = req.body.channel_ID;
    let base = req.db;   

    let dbselect = base.prepare(`SELECT salida4_texto FROM personalizar_comandos WHERE idserver = ${idserver}`).get();
    let filas = base.prepare(`SELECT salida4 FROM activar_desactivar WHERE idserver = ${idserver}`).get();
    let filasdb = base.prepare(`SELECT canal_salida4 FROM personalizar_comandos WHERE idserver = ${idserver}`).get();
  
    if(!dbselect){
      base.prepare(`INSERT INTO personalizar_comandos(idserver, salida4_texto) VALUES(${idserver}, '${msg_leave}')`).run();
    }else{
      base.prepare(`UPDATE personalizar_comandos SET salida4_texto = '${msg_leave}' WHERE idserver = ${idserver}`).run();
    };

  if(id_channel.toLowerCase() == "apagado") {
    
    if(filas && filas.salida4 ) {       
      base.prepare(`INSERT INTO activar_desactivar(idserver, salida4) VALUES(${idserver}, ${0})`).run();
    }else{
      base.prepare(`UPDATE activar_desactivar SET salida4 = ${0} WHERE idserver = ${idserver}`).run();
    };
    
  }else{
    
   if(!filasdb) {       
     base.prepare(`INSERT INTO personalizar_comandos(idserver, canal_salida4) VALUES(${idserver}, ${id_channel})`).run();
   }else{
     base.prepare(`UPDATE personalizar_comandos SET canal_salida4 = ${id_channel} WHERE idserver = ${idserver}`).run();
   }; 
    
   if(!filas) {       
     base.prepare(`INSERT INTO activar_desactivar(idserver, salida4) VALUES(${idserver}, ${1})`).run();
   }else{
     base.prepare(`UPDATE activar_desactivar SET salida4 = ${1} WHERE idserver = ${idserver}`).run();
   }; 
  }; 
  
/*
    let texto = "Canal actual"  
    if(id_channel.includes(texto)) {
   console.log("a")
   }
    if(!id_channel.includes(texto)) {
   if(id_channel) {goodbye_db4.establecer(`${idserver}`, `${id_channel}`)}
        console.log("b")

   }   
  
//    if(id_channel) {goodbye_db4.establecer(`${idserver}`, `${id_channel}`)}
    if(msg_leave) {textosalida4.establecer(`${idserver}.lista_links`, `${msg_leave}`)}
*/
    res.redirect(`/server/${idserver}`); 

})


/*

.post('/:id/rolauto', CheckAuth, async(req, res) => {
      
    let base = req.db;
    let idserver = req.params.id;
    let id_role = req.body.rol_ID;
    
    
    base.get("SELECT * FROM serverRolAuto WHERE idserver = ?", idserver, function (err, filas) {
      if(!filas) {
        
        let sentencia = base.prepare("INSERT INTO serverRolAuto VALUES (?, ?, ?)");
        sentencia.run(idserver, id_role, 0);
        
        res.redirect(`/server/${idserver}`);
      } else {
      
       if(!id_role) id_role = filas.idrole
       base.run(`UPDATE serverRolAuto SET idrole = '${id_role}' WHERE idserver = '${idserver}'`);
       res.redirect(`/server/${idserver}`); 
      }

      
    });
    
})

.post('/:id/interval', CheckAuth, async(req, res) => {
      
    let base = req.db;
    let idserver = req.params.id;
    let idchannel = req.body.channel_ID
    let timemsg = req.body.time_msg
    let msg = req.body.send_msg;
    let client = req.bot;
    
    base.get("SELECT * FROM serverInterval WHERE idserver = ?", idserver, function (err, filas) {
      
      if(!filas) {
        
        let sentencia = base.prepare("INSERT INTO serverInterval VALUES (?, ?, ?, ?, ?)");
        sentencia.run(idserver, idchannel, timemsg, msg, 0);

        //TAREA
      setInterval(() => {
          client.guilds.get(idserver).channels.get(idchannel).send(msg)

       }, timemsg * 60000)
        console.log('TIEMPO: '+ timemsg)    
        res.redirect(`/server/${idserver}`);
      } else {
      
       if(!idchannel) idchannel = filas.idchannel;
       if(!timemsg) timemsg = filas.time;
       if(!msg) msg = filas.msg;
        
       base.run(`UPDATE serverInterval SET idchannel = '${idchannel}', time = ${timemsg}, msg = '${msg}' WHERE idserver = '${idserver}'`);
      setInterval(() => {
          client.guilds.get(idserver).channels.get(idchannel).send(msg)

       }, timemsg * 60000)
      console.log('TIEMPO: '+ timemsg)    
      res.redirect(`/server/${idserver}`);
        
      }

      
    });
    
})
*/
module.exports = router;