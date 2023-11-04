const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authCtrl = {
    register: async (req, res) => {},
    login: async (req, res) => {},
    logout: async (req, res) => {},
    generateAccessToken: async (req, res) => {}
};

module.exports = authCtrl;