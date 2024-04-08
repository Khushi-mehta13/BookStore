import express from "express";
import crypto from "crypto"; // Import crypto for hashing

import { Admin } from "./models/Admin.js";
import './db.js';

async function hashPassword(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}

async function AdminAccount() {
    try {
        const sendincount = await Admin.countDocuments();
        if (sendincount === 0) {
            const hashedPassword = await hashPassword('adminpassword');
            const newAdmin = new Admin({
                username: 'admin',
                password: hashedPassword 
            });
            await newAdmin.save();
            console.log("Account Created");
        } else {
            console.log("Account Already exist");
        }
    } catch (err) {
        console.log("Error: " + err);
    }
}

AdminAccount();
