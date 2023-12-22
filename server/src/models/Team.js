const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Team',{
        id: {
            type: DataTypes.INTEGER, 
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                lent: [1, 50] // Mínimo 1, máximo 50 caracteres
            }
        }
    }, { timestamps: false }) // NO createdAt y updatedAt
};