# Blog-With-Authentication
The app lets you display blogs and modify them as long as you're  authenticated. and for authenctication it uses `passport-local-mongoose` package which applies pbkdf2 algorithm of the node crypto library. Pbkdf2 was chosen because platform independent (in contrary to bcrypt). For every user a generated salt value is saved to make rainbow table attacks even harder.
# Built with
- [Nodejs](https://nodejs.org/)
- [Bootstrap](https://getbootstrap.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud)
# Prerequisites
list of things you need to install to launch the app
- npm -- `npm install npm@latest -g`
- express-generator -- `npx express-generator `
- mongo shell --
   + for linux: https://downloads.mongodb.org/linux/mongodb-shell-linux-x86_64-ubuntu1804-4.4.1.tgz
   + windows: https://downloads.mongodb.org/windows/mongodb-shell-windows-x86_64-4.4.1.zip
   + macOS: Install via Homebrew `brew install mongodb/brew/mongodb-community-shell`
# Author
- ##### Abdallha Fola
# Contact
##### Abdallah - abdofola67@gmail.com

