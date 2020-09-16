# Abdallah-Blog-With-Authentication
The app lets you display blogs and modify them as long as you're  authenticated. and for authenctication it uses `passport-local-mongoose` package which applies pbkdf2 algorithm of the node crypto library. Pbkdf2 was chosen because platform independent (in contrary to bcrypt). For every user a generated salt value is saved to make rainbow table attacks even harder.
# Buit with
- [Nodejs](https://nodejs.org/)
- [Bootstrap](https://getbootstrap.com/)
# Prerequisites
list of things you need to install to launch the app
- npm -- `npm install npm@latest -g`
- express-generator -- `npx express-generator `
# Author
- ##### Abdallha Fola
# Contact
##### Abdallah - abdofola67@gmail.com

