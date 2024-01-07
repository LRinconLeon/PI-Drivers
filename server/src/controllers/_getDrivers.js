const axios = require("axios");
const { Driver, Team } = require("../db");

const defaultImage = "https://i.pinimg.com/564x/b6/b7/c4/b6b7c4d143a708eb4bbc9f589015fe05.jpg";
let drivers = [];

const _getDrivers = async (name) => {
    const driversDB = await Driver.findAll({
        include: {
            model: Team,
            attributes: ["name"],
            through: {
                attributes: [], //es para no incluir ningún atributo a la tabla intermedia
            },
        }
    });

    const response = (await axios.get("http://localhost:5000/drivers")).data;
    const driversAPI = response.map((driver) => ({
        id: driver.id,
        forename: driver.name.forename,
        surname: driver.name.surname,
        description: driver.description,
        image: driver.image.url || defaultImage,
        nationality: driver.nationality,
        dob: driver.dob,
        Teams: (driver.teams ? driver.teams.split(",") : ["Unknown"]).map((team) => ({ //se separa (split(", ")) para que en el front lo juntes con join(", ")
            "name": team, //aqui el team de la API me devolvera [{"name": " Mercedes"}] para q sea igual que el team del driver de la bdd
        })),  // o si es undefined sera unknown
        number: driver.number,
        createDB: false,
    }));
    // Teams: driver.teams?.split(",").map((team) => ({ //se separa para que en el front lo juntes con join(", ")
    //         "name": team
    //     })), //aqui el team de la API me devolvera [{"name": " Mercedes"}] para q sea igual que el team del driver de la bdd
        

    drivers = [...driversDB, ...driversAPI];

    if(name) {
        const driverName = drivers.filter((driver) => 
            driver.forename.toLowerCase().includes(name.toLowerCase()) ||
            driver.surname.toLowerCase().includes(name.toLowerCase())
        );
        return driverName;
    };
    
    return drivers;
};

module.exports = _getDrivers;