const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Driver', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [1, 30] 
      }
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 30] 
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,   // Esto es para que la descripcion no este en blaco/vacio
          msg: 'Description cannot be empty'
        },
      },
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    nationality: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 30] 
      }
    },
    dob: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate:true
      }
    },
    number: {  //! checar si es mucho pedo sino eliminar xd
      type: DataTypes.STRING, // Se cambio a STRING en vez de INTERGER porque el valor predeterminado debe ser del mismo tipo que el campo
      validate: {
        isPositive(value) {
          if (value !== "\\N" && (isNaN(value) || +value <= 0)) throw new Error('The number must be positive');
        }
      },
      defaultValue: "\\N"
    },
    created: { // Este es para el front en el filtro de db o api
      type: DataTypes.BOOLEAN, 
      defaultValue: true
    },
  }, { timestamps: false });
};


