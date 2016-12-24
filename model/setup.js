import User from './user';
import TeamSl from './team-sl';


const      UserTeam = require('./associations/user-team');

TeamSl.Users = TeamSl.belongsToMany(User, {
  through: UserTeam, 
  foreignKey: 'id_sl'
});

User.Teams = User.belongsToMany(TeamSl, {
  through: UserTeam, 
  foreignKey: 'id_user'
});

export default {
  User : User,
  TeamSl : TeamSl
};