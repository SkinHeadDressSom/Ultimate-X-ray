const express = require("express");

sayHi = async (req, res) => {
  res.status(201).json({ message: "Hello, World!" });
};

module.exports = {
  sayHi,
};
