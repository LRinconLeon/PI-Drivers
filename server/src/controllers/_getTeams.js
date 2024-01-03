const { Team } = require("../db");
const axios = require('axios');

const _getTeams = async () => {
    try {
        const teamsDB = await Team.findAll();
        
        if(teamsDB.length > 0) return teamsDB; 
        else {
            const response = (await axios.get("http://localhost:5000/drivers")).data;

            const teamsFromAPI = response.flatMap((driver) => {
                if(driver.teams) return driver.teams.split(", ").map(team => team.trim());
                return []  //esto es para que no se ejecuten en los datos undefined.
            });

            const orderTeams = [...new Set(teamsFromAPI)].sort(); 
            // new Set hace que se cree un nuevo array de valores unicos
        
            const createdTeams = await Team.bulkCreate(
                orderTeams.map(team => ({ name: team }))
            );

            return createdTeams.map(team => team.name);
        }
    } catch(error) {
        console.error("Error en la llamada a la API: ", error);
        throw error;
    }
};

module.exports = _getTeams;

//* FLATMAP:
/* 
const teamsFromAPI = response
            .flatMap((driver) => (driver.teams || "") SI LO HACES ASI TE DEVUELVE UN "string vacio"
            .split(", ")
            .map(team => team.trim()));

- FlatMap() se utiliza comúnmente en situaciones en las que necesitas aplicar una función
de mapeo a cada elemento de un array y luego aplanar los resultados en un solo array. 
- Automáticamente omite los valores undefined.
*/