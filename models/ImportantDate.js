import { DataTypes } from 'sequelize';
import sequelize from '../db.js'; // ✅ WAJIB: koneksi Sequelize
import User from './User.js';

const ImportantDate = sequelize.define('ImportantDate', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
}, {
  tableName: 'important_dates',
  timestamps: true,
});

// 🔗 Relasi antar tabel
User.hasMany(ImportantDate, { foreignKey: 'userId', as: 'importantDates' });
ImportantDate.belongsTo(User, { foreignKey: 'userId', as: 'user' });

export default ImportantDate;
