const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("../models/User");

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const existing = await User.findOne({ email: "admin@admin.com" });
    if (existing) {
      console.log("Admin already exists");
      process.exit(0);
    }

    await User.create({
      name: "Super Admin",
      email: "admin@admin.com",
      password: "Admin@123",
      role: "admin",
      status: "active",
    });

    console.log("Admin user created successfully");
    process.exit(0);
  } catch (error) {
    console.error("Seed error:", error.message);
    process.exit(1);
  }
};

seedAdmin();
