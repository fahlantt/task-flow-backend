import User from './User.js';
import ImportantDate from './ImportantDate.js';
import Note from './Note.js';

// Relasi User - ImportantDate
User.hasMany(ImportantDate, { foreignKey: 'userId', as: 'importantDates' });
ImportantDate.belongsTo(User, { foreignKey: 'userId', as: 'user' });

// Relasi User - Note
User.hasMany(Note, { foreignKey: 'userId', as: 'notes' });
Note.belongsTo(User, { foreignKey: 'userId', as: 'user' });
