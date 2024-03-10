const dotenv = require("dotenv");

dotenv.config();

module.exports = {
    PORT: process.env.PORT,
    MOVIEPORT: process.env.MOVIEPORT,
    USERPORT: process.env.USERPORT
};