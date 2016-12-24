import User from './user';
import TeamSl from './team-sl';
import UserTeam from './associations/user-team';

TeamSl.Users = TeamSl.belongsToMany(User, {
  through: UserTeam, 
  foreignKey: 'id_sl'
});

User.Teams = User.belongsToMany(TeamSl, {
  through: UserTeam, 
  foreignKey: 'id_user'
});

export {
  User,
  TeamSl
};