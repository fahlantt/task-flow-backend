import { DataTypes } from 'sequelize';
import sequelize from '../db.js';
import User from './User.js';

const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dueDate: { // ✅ Ini penting!
    type: DataTypes.DATEONLY,
    allowNull: true,
  },
  is_completed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
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
  tableName: 'tasks',
  timestamps: true,
});

// Relasi
User.hasMany(Task, { foreignKey: 'userId', as: 'tasks' });
Task.belongsTo(User, { foreignKey: 'userId', as: 'user' });

export default Task;
