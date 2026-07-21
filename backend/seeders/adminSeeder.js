import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";

import connectDB from "../config/db.js";
import User from "../models/User.js";
import { ROLES } from "../constants/roles.js";

const seedAdmin = async () => {

    try {

        // Connect to MongoDB
        await connectDB();

        // Check if an admin already exists
        const existingAdmin = await User.findOne({
            role: ROLES.ADMIN,
        });

        if (existingAdmin) {

            console.log("⚠️ Admin already exists.");
            process.exit(0);

        }

        // Create the admin
        const admin = await User.create({

            fullName: "Super Admin",

            email: process.env.ADMIN_EMAIL,

            password: process.env.ADMIN_PASSWORD,

            role: ROLES.ADMIN,

            isVerified: true,

        });

        console.log("✅ Admin created successfully.");
        console.log(admin.email);

        process.exit(0);

    } catch (error) {

        console.error("❌ Admin seeding failed.");
        console.error(error);

        process.exit(1);

    }

};

seedAdmin();