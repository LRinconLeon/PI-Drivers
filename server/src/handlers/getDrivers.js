const _getDrivers = require("../controllers/_getDrivers");

const getDrivers = async (req, res) => {
    
    try {
        const { name } = req.query;

        if (name) {
            const driverByName = await _getDrivers(name);
            res.status(200).json(driverByName);
        } else {
            const allDrivers = await _getDrivers();
            res.status(200).json(allDrivers);
        }
    } catch(error){
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
};

module.exports = getDrivers;