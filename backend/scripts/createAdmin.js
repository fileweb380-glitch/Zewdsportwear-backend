require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('../models/Admin');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const createInitialAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB Atlas...');

    rl.question('Enter admin username: ', (username) => {
      rl.question('Enter admin email: ', (email) => {
        rl.question('Enter admin password (min 6 chars): ', async (password) => {
          try {
            const existingAdmin = await Admin.findOne({ $or: [{ username }, { email }] });
            if (existingAdmin) {
              console.log('Error: Admin with this username or email already exists.');
              process.exit(1);
            }

            const admin = await Admin.create({ username, email, password });

            console.log(`\nSuccess! Admin account created:`);
            console.log(`Username: ${admin.username}`);
            console.log(`Email: ${admin.email}`);
            process.exit(0);
          } catch (err) {
            console.error('Error creating admin:', err.message);
            process.exit(1);
          }
        });
      });
    });
  } catch (err) {
    console.error('Database connection error:', err.message);
    process.exit(1);
  }
};

createInitialAdmin();
