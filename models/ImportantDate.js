import { DataTypes } from 'sequelize';
import sequelize from '../db.js';
import User from './User.js';

const ImportantDate = sequelize.define('ImportantDate', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: User, key: 'id' }
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

// ✅ Cukup relasi ini saja
ImportantDate.belongsTo(User, { foreignKey: 'userId', as: 'user' });

export default ImportantDate;
