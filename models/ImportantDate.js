import { DataTypes } from 'sequelize';
import User from './User.js';

const ImportantDate = sequelize.define('ImportantDate', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  date: {
    type: DataTypes.DATEONLY, // hanya tanggal tanpa waktu
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
      model: User, // model yang dirujuk
      key: 'id',
    },
    onDelete: 'CASCADE', // kalau user dihapus, data juga ikut terhapus
  }
}, {
  tableName: 'important_dates',
  timestamps: true,
});

// Definisikan relasi
User.hasMany(ImportantDate, { foreignKey: 'userId', as: 'importantDates' });
ImportantDate.belongsTo(User, { foreignKey: 'userId', as: 'user' });

export default ImportantDate;
