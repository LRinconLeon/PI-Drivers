const { Router } = require("express");
const getTeams = require("../handlers/getTeams");

const teamRouter = Router();

teamRouter.get('/', getTeams);

module.exports = teamRouter;