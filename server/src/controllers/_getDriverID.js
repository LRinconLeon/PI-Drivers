const axios = require("axios");
const { Driver, Team } = require("../db");

const _getDriverIDdb = async (id) => {
    const foundDriver = await Driver.findByPk(id, { include: Team });
    return foundDriver;
};

const _getDriverIDapi = async (id) => {
    try {
        return (await axios.get(`http://localhost:5000/drivers/${id}`)).data;
    } catch (error) {
        if (error.response && error.response.status === 404) return null; 
        //Asi el handler sabra que no se encontro nada en la respuesta 
        throw error; 
    }
    //! Toma en cuenta que te envia TODA la informacion, CHECA si no es mejor 
    //! llamar a allDrivers o filtrarla con este endpoint.
};

module.exports = {
    _getDriverIDdb,
    _getDriverIDapi
};

//* MANEJO DE ERRORES:
/*
En el caso específico de Axios, cuando se produce un error durante una solicitud HTTP, 
la biblioteca devuelve un objeto de error que tiene una propiedad RESPONSE que contiene 
los detalles de la respuesta HTTP.

Por lo tanto, al verificar error.response, te estás asegurando de que estás tratando con 
un error que proviene de una respuesta HTTP específica.

Dentro de error.response, normalmente encontrarás propiedades como status (código de estado 
HTTP), data (cuerpo de la respuesta), etc.
*/
