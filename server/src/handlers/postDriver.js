const _postDriver = require("../controllers/_postDriver");

const postDriver = async (req, res) => {
    const { forename, surname, description, image, nationality, dob, Teams } = req.body;

    try {
        if(!forename || !surname || !description || !image || !nationality || !dob) {
            return res.status(400).json({ error: 'Missing required fields' });
        } else {
            const newDriver = await _postDriver(forename, surname, description, image, nationality, dob, Teams);
            return res.status(201).json(newDriver); //201 significa Created
        };
    } catch(error) {
        if(error.message === 'This Driver already exists') return res.status(409).json({ error: error.message }); 
        else return res.status(500).json({ error: error.message });
    };
};

module.exports = postDriver;