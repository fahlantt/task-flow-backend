import User from './User.js';
import ImportantDate from './ImportantDate.js';

User.hasMany(ImportantDate, { foreignKey: 'userId', as: 'importantDates' });
ImportantDate.belongsTo(User, { foreignKey: 'userId', as: 'user' });
