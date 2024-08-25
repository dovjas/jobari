const admin = require('firebase-admin');
const serviceAccount = require('../config/serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://jobari-default-rtdb.europe-west1.firebasedatabase.app/"
});

module.exports = admin;