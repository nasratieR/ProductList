const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      connectTimeoutMS: 20000, 
    });
    console.log('MongoDB connecté avec succès!');
  } catch (error) {
    console.error('Erreur lors de la connexion à MongoDB :', error.message);
    process.exit(1); 
  }
};

module.exports = connectDB;
