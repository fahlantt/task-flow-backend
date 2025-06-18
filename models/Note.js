import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

const Note = sequelize.define('Note', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    onDelete: 'CASCADE',
  },
}, {
  tableName: 'notes',
  timestamps: true,
});

export default Note;
