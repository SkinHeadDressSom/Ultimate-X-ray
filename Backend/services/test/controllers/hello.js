const express = require("express");

const sayHi = async (req, res) => {
  res.status(200).json({ message: "Hello, World!" });
};

module.exports = {
  sayHi,
};
