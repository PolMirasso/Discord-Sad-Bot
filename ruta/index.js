const express = require('express');
const router = express.Router();
const passport = require("passport");

router.get("/", function(req, res) {
  
  let servers = req.bot.guilds.cache.size;
  let users = req.bot.users.cache.size;

    res.render("index.ejs", {
        status: (req.isAuthenticated() ? "Perfil" : "Login"),
        client: req.bot,
        user: req.user,
        usuarios: users,
        servidores: servers,
        login: (req.isAuthenticated() ? "si": "no"),
        invite: `https://discordapp.com/oauth2/authorize?client_id=${process.env.CLIENT_ID}&permissions=0&scope=bot`
    });
})




.get("/login", passport.authenticate("discord", { failureRedirect: "/" }), 
  function(req, res) {
    res.redirect("/perfil");
})
.get("/logout", async function(req, res) {
  await req.logout();
  await res.redirect("/");
});

module.exports = router;