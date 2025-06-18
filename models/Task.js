// models/Task.js
import { DataTypes } from 'sequelize';
import sequelize from '../db.js';
import User from './User.js';

const Task = sequelize.define('Task', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  status: { type: DataTypes.STRING, allowNull: false, defaultValue: 'pending' },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: User, key: 'id' },
    onDelete: 'CASCADE',
  },
}, {
  tableName: 'tasks',
  timestamps: true,
});

export default Task;
