import User from './user';
import TeamSl from './team-sl';
import Player from './player';
import TeamNba from './team-nba';
import Division from './division';
import Conference from './conference';
import League from './league';

import UserTeam from './associations/user-team';
import TeamPlayer from './associations/team-player';

////////////// Team SL Relationships

TeamSl.Users = TeamSl.belongsToMany(User, {
  through: UserTeam, 
  foreignKey: 'id_sl'
});

TeamSl.Players = TeamSl.belongsToMany(Player, {
  through : TeamPlayer,
  foreignKey : 'id_sl',
  constraints : false
});

TeamSl.Division = TeamSl.belongsTo(Division, {
  foreignKey : 'id_division'
});

////////////// Division Relationships

Division.Teams = Division.hasMany(TeamSl, {
  foreignKey : 'id_division'
});

Division.Conference = Division.belongsTo(Conference, {
  foreignKey : 'id_conference'
});

////////////// Conference Relationships

Conference.Divisions = Conference.hasMany(Division, {
  foreignKey : 'id_conference'
});

Conference.Teams = function(conference) {
  return TeamSl.findAll({
    include: [{
      model :  Division,
      where: {
        'id_conference' : conference.id_conference
      }
    }]
  });
};

////////////// Conference Relationships

League.Conferences = League.hasMany(Conference, {
  foreignKey : 'id_league'
});

League.Teams = function(league) {
  return TeamSl.findAll({
    include: [{
      model : Division,
      include : [{
        model : Conference,
        where : {
          id_league : league.id_league
        }
      }]
    }]
  })
};

League.Owner = League.belongsTo(User, {
  foreignKey : 'id_owner'
});

////////////// User Relationships

User.Teams = User.belongsToMany(TeamSl, {
  through: UserTeam, 
  foreignKey: 'id_user'
});

////////////// Player Relationships

Player.TeamNba = Player.belongsTo(TeamNba, {
  foreignKey : 'id_nba'
});

Player.TeamSl = Player.belongsToMany(TeamSl, {
  through : TeamPlayer,
  foreignKey : 'id_player'
});

////////////// Team NBA Relationships

TeamNba.Players = TeamNba.hasMany(Player, {
  foreignKey : 'id_nba'
});

export {
  User,
  TeamSl,
  Player,
  TeamNba,
  Division,
  Conference,
  League
};