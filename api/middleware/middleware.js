const bcrypt = require('bcrypt');

const isValidPassword = (password) => {
    // Check if the password contains only letters and numbers
    const alphanumericRegex = /^[a-zA-Z0-9]+$/;
    return alphanumericRegex.test(password);
};

const hashPassword = async (plainTextPassword) => {
    try {
        // Validate the password
        if (!isValidPassword(plainTextPassword)) {
            throw new Error("Password must contain only letters and numbers.");
        }

        // Generate a salt
        const saltRounds = 10; // You can adjust the number of salt rounds for more security
        const salt = await bcrypt.genSalt(saltRounds);

        // Hash the password
        const hashedPassword = await bcrypt.hash(plainTextPassword, salt);

        return hashedPassword;
    } catch (error) {
        console.error("Error hashing password:", error);
        throw error;
    }
};

const comparePasswords = async (plainTextPassword, hashedPassword) => {
    try {
        const match = await bcrypt.compare(plainTextPassword, hashedPassword);
        return match; // Returns true if the passwords match, false otherwise
    } catch (error) {
        console.error("Error comparing passwords:", error);
        throw error;
    }
};

const accessToken = (email, password) => {
    // Kunci rahasia untuk menandatangani token
    const secretKey = 'your_secret_key';

    // Data yang ingin disertakan dalam payload
    const payload = {
        email: email, // ID pengguna
        password: password // Nama pengguna
    };

    // Opsi token
    const options = {
        expiresIn: '1d' // Token kedaluwarsa dalam 1 hari
    };

    // Membuat token
    const token = jwt.sign(payload, secretKey, options);

    return token;
}

module.exports = { hashPassword, comparePasswords, accessToken };
