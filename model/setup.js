import User from './user';
import TeamSl from './team-sl';
import Player from './player';
import TeamNba from './team-nba';

import UserTeam from './associations/user-team';
import TeamPlayer from './associations/team-player';

TeamSl.Users = TeamSl.belongsToMany(User, {
  through: UserTeam, 
  foreignKey: 'id_sl'
});

User.Teams = User.belongsToMany(TeamSl, {
  through: UserTeam, 
  foreignKey: 'id_user'
});

TeamSl.Players = TeamSl.belongsToMany(Player, {
  through : TeamPlayer,
  foreignKey : 'id_sl',
  constraints : false
});

Player.TeamSl = Player.belongsToMany(TeamSl, {
  through : TeamPlayer,
  foreignKey : 'id_player'
});

Player.TeamNba = Player.belongsTo(TeamNba, {
  foreignKey : 'id_nba'
});

TeamNba.Players = TeamNba.hasMany(Player, {
  foreignKey : 'id_nba'
});

export {
  User,
  TeamSl,
  Player,
  TeamNba
};