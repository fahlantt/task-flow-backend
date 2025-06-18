// models/ImportantDate.js
import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const ImportantDate = sequelize.define('ImportantDate', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  tableName: 'important_dates',
  timestamps: true,
});

export default ImportantDate;
