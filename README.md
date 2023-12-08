# ChatbotApp

Cette API permettant de créer un univers et ses personnages, afin d'avoir une discussion, en utilisant l'API de OpenAI. 

## Pré-requis
 - Language:
  
   Cette API est rédigée en NodeJs dans sa version v18.17.1 . 
  
 - Gestionnaire de dépendance:
  
  Le projet utilise npm dans sa version 9.6.7 . 

 - Moteur de base de données:
  
  Le projet utilise MySQL dans sa version 8.0.31 .


## Installation
*Instruction de mise en place du code*

  1. Cloner le dépot
  ```bash
  git clone https://github.com/damienBaehr/ApiB3.git
  ```

  2. Installer les dépendances
  Dans le terminal du projet 

  ```bash
  npm install
  ```

*Mise en place de la structure de la base de données:*

 1. Créer une base de donnée MySQL nommé "chatbotapp"
 2. Importer le fichier chatbotapp.sql dans l'onglet 'importer' de la base de donnée.

*Mise en place de l'environnement* 

  1. Créer le fichier .env.local à la racine du projet (il sera automatiquement reconnu grâce à la librairie dotenv)
  2. Créer une secret key pour la création du token
  3. Insérer les clés API :
     * [OpenAI](https://platform.openai.com/docs/quickstart?context=node)
     * [ClipDrop](https://clipdrop.co/apis/docs/text-to-image)
  4. Insérer les identifiants de la BDD MySQL

## Lancement

 1. Vérifier la disponibilité du port 3000
 2. Lancer la base de donées (depuis xampp, lancer mysql ), puis ouvrez un terminal de commande sur votre éditeur de texte
 3. Lancer l'application
    ```bash
    nodemon index.js
    ```

## Utilisation

1. Ouvrir PostMan et importer la collection de requête disponible dans le fichier que vous avez téléchargé.
2. Créer un utilisateur (User --> createUser)
3. Créer un token en renseignant le pseudonyme & mot de passe de l'utilisateur (User --> Auth)
4. Renseigner le token généré par le projet à chaque requête sur PostMan (Onglet Authorization --> Type : Bearer Token --> Copier le token)
5. Créer un univers (Universe --> createUniverse)
6. Créer un personnage. Renseignez dans le HEADER de Postman l'ID de l'univers dans la Key (X-UniversID) et dans la value (ID que vous pouvez retrouver dans la table de votre base de données.) (Characters --> createCharacter)
7. Créer la discussion avec votre personnage. Tout comme avant, dans le HEADER, renseignez X-CharacterID avec l'ID de votre personnage. (Discussion --> createConversation)
8. Créer un/des message(s) (Message --> createMessage). Renseignez l'id de la conversation dans l'url de la requête : /message/??.

# Répétez l'opération autant de fois que vous le voudrez !

## Have fun !

# J'ai bien travaillé :)