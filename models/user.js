class User {
    constructor(id, pseudo, password, email) {
      this._id = id; // Utilisation du préfixe _ pour indiquer que ce sont des propriétés privées
      this._pseudo = pseudo;
      this._password = password;
      this._email = email;
    }
  
    // Getter pour l'ID
    get id() {
      return this._id;
    }
  
    // Setter pour l'ID
    set id(newId) {
      this._id = newId;
    }
  
    // Getter pour le pseudo
    get pseudo() {
      return this._pseudo;
    }
  
    // Setter pour le pseudo
    set pseudo(newPseudo) {
      this._pseudo = newPseudo;
    }
  
    // Getter pour le mot de passe (Password)
    get password() {
      return this._password;
    }
  
    // Setter pour le mot de passe (Password)
    set password(newPassword) {
      this._password = newPassword;
    }
  
    // Getter pour l'e-mail
    get email() {
      return this._email;
    }
  
    // Setter pour l'e-mail
    set email(newEmail) {
      this._email = newEmail;
    }
  }
module.exports = User;