const express = require("express");
const app = express();

app.use(express.json());

// Import des routes
const userRoutes = require("./routes/userRoutes");
const universesRoutes = require("./routes/universesRoutes");
const discussionRoutes = require("./routes/discussionRoutes");
const characterRoutes = require("./routes/characterRoutes");
const messageRoutes = require("./routes/messageRoutes")
const verifyToken = require("./middlewares/verifyToken"); 

// Utilisation des routes
app.use(verifyToken); // middleware pour vérifier le token  A DECOMMENTER !!!!!!!!!!!
app.use("/user", userRoutes); // préfixe "/user" pour les routes des utilisateurs
app.use("/universes", universesRoutes); // préfixe "/universes" pour les routes des univers
app.use("/discussion", discussionRoutes); // préfixe "/discussion" pour les routes des discussions
app.use("/character", characterRoutes); // préfixe /character pour les routes des characters
app.use("/message", messageRoutes); // préfixe /message pour les routes des messages

app.listen(8080, () => {
  console.log("Server running on port 8080!");
});
