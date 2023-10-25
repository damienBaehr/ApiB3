class User {
    constructor(id, pseudo, password, email) {
      this._id = id; // Utilisation du préfixe _ pour indiquer que ce sont des propriétés privées
      this._pseudo = pseudo;
      this._password = password;
      this._email = email;
    }

    static fromMap(map){
      let user = new User(map.name);
      user._id = map.id;
      user._pseudo = map.pseudo;
      user._password = map.password;
      user._email = map.email;

      return user;
    }

    toMap(){
      return {
          id: this._id,
          pseudo: this._pseudo,
          email: this._emailw
      }
    }
}
module.exports = User;