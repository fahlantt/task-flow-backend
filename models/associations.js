// models/associations.js
import User from './User.js';
import ImportantDate from './ImportantDate.js';
import Note from './Note.js';
import Task from './Task.js';

//Relasi notes
User.hasMany(Note, { foreignKey: 'userId', as: 'notes' });
Note.belongsTo(User, { foreignKey: 'userId', as: 'user' });

//Relasi Importantdates
User.hasMany(ImportantDate, { foreignKey: 'userId', as: 'importantDates' });
ImportantDate.belongsTo(User, { foreignKey: 'userId', as: 'user' });

//Relasi Tasks
User.hasMany(Task, { foreignKey: 'userId', as: 'tasks' });
Task.belongsTo(User, { foreignKey: 'userId', as: 'user' });
