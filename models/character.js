class Character {
  constructor(id, name, description, imgPathUrl, id_user) {
    this._id = id;
    this._name = name;
    this._description = description;
    this._imgPathUrl = imgPathUrl;
    this._id_user = id_user;
  }
  
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

  // Getter pour le nom
  get name() {
    return this._name;
  }

  // Setter pour le nom
  set name(newName) {
    this._name = newName;
  }

  // Getter pour la description
  get description() {
    return this._description;
  }

  // Setter pour la description
  set description(newDescription) {
    this._description = newDescription;
  }

  // Getter pour l'URL de l'image
  get imgPathUrl() {
    return this._imgPathUrl;
  }

  // Setter pour l'URL de l'image
  set imgPathUrl(newImgPathUrl) {
    this._imgPathUrl = newImgPathUrl;
  }

  // Getter pour l'ID de l'utilisateur
  get id_user() {
    return this._id_user;
  }

  // Setter pour l'ID de l'utilisateur
  set id_user(newIdUser) {
    this._id_user = newIdUser;
  }    
}
module.exports = Character;