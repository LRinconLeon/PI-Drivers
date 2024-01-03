const { Router } = require("express");
const { getDrivers, getDriverID, postDriver } = require("../handlers/index");

const driverRouter = Router();

driverRouter.get('/', getDrivers);
driverRouter.get('/:id', getDriverID);
driverRouter.post('/', postDriver);

module.exports = driverRouter;