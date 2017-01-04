import User from './user';
import TeamSl from './team-sl';
import Player from './player';
import TeamNba from './team-nba';
import Division from './division';
import Conference from './conference';
import League from './league';
import Draft from './draft';
import Pick from './pick';
import Game from './game';
import GameNba from './game-nba';
import Round from './round';
import Season from './season';
import PlayerPerformance from './player-performance';
import TeamPerformance from './team-performance';
import PlayerTeamPerformance from './player-team-performance';
import FreeAgencyHistory from './free-agency-history';
import Trade from './trade';

import PlayerStats from './views/player-stats';
import TeamStats from './views/team-stats';

import UserTeam from './associations/user-team';
import TeamPlayer from './associations/team-player';
import TeamSeason from './associations/team-season';
import PlayerTrade from './associations/player-trade';
import PickTrade from './associations/pick-trade';
import LeagueConfig from './associations/league-config';

// @TODO extract to config
const DEFAULT_LIMIT = 20;
// end todo

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

TeamSl.Record = TeamSl.hasOne(TeamSeason, {
  foreignKey : 'id_sl'
});

TeamSl.Records = TeamSl.hasMany(TeamSeason, {
  foreignKey : 'id_sl'
});

////////////// Game NBA Relationships

GameNba.HomeTeam = GameNba.belongsTo(TeamNba, {
  as : 'home',
  foreignKey : 'id_home'
});

GameNba.AwayTeam = GameNba.belongsTo(TeamNba, {
  as : 'away',
  foreignKey : 'id_away'
});

GameNba.HomeRound = GameNba.belongsTo(Round, {
  as : 'home_round',
  foreignKey : 'id_round_home'
});

GameNba.AwayRound = GameNba.belongsTo(Round, {
  as : 'away_round',
  foreignKey : 'id_round_away'
});

GameNba.DateGames = function(root, args) {
  return GameNba.findAll({
    attributes: {
      include: [[GameNba.sequelize.fn('DATE', GameNba.sequelize.col('game_time')), 'game_date']]
     }, having : {
      'game_date' : args.date
     }
  });
};

////////////// Game Relationships

Game.HomeTeam = Game.belongsTo(TeamSl, {
  as : 'home',
  foreignKey : 'home_team'
});

Game.AwayTeam = Game.belongsTo(TeamSl, {
  as : 'away',
  foreignKey : 'away_team'
});

Game.GetPerformance = function(idSl, idRound) {
  return TeamPerformance.findOne({
    where : {
      id_sl : idSl,
      id_round : idRound
    }
  });
}

Game.HomePerformance = function(game, args) {
  return Game.GetPerformance(game.home_team, game.id_round)
};

Game.AwayPerformance = function(game, args) {
  console.log(args);
  return Game.GetPerformance(game.away_team, game.id_round)
};

////////////// Round Relationships

Round.Games = Round.hasMany(Game, {
  foreignKey : 'id_round'
});

Round.Season = Round.belongsTo(Season, {
  foreignKey : 'id_season'
});

////////////// Season Relationships

Season.Rounds = Season.hasMany(Round, {
  foreignKey : 'id_season'
});

Season.Current = function() {
  return Season.findOne({
    where : {
      current : true
    }
  });
};

////////////// Player Stats Relationships

TeamStats.TeamSl = PlayerStats.belongsTo(TeamSl, {
  foreignKey : 'id_sl'
});

TeamStats.Season = PlayerStats.belongsTo(Season, {
  foreignKey : 'id_season'
});

////////////// Player Stats Relationships

PlayerStats.Player = PlayerStats.belongsTo(Player, {
  foreignKey : 'id_player'
});

PlayerStats.Season = PlayerStats.belongsTo(Season, {
  foreignKey : 'id_season'
});

////////////// Player Performance Relationships

PlayerPerformance.Player = PlayerPerformance.belongsTo(Player, {
  foreignKey : 'id_player'
});

PlayerPerformance.Round = PlayerPerformance.belongsTo(Round, {
  foreignKey : 'id_round'
});

////////////// Team Performance Relationships

TeamPerformance.Team = TeamPerformance.belongsTo(TeamSl, {
  foreignKey : 'id_sl'
});

TeamPerformance.Round = TeamPerformance.belongsTo(Round, {
  foreignKey : 'id_round'
});

////////////// Player Team Performance Relationships

PlayerTeamPerformance.Player = PlayerTeamPerformance.belongsTo(Player, {
  foreignKey : 'id_player'
});

PlayerTeamPerformance.TeamSl = PlayerTeamPerformance.belongsTo(TeamSl, {
  foreignKey : 'id_sl'
});

PlayerTeamPerformance.Round = PlayerTeamPerformance.belongsTo(Round, {
  foreignKey : 'id_round'
});

Player.TeamPerformances = Player.hasMany(PlayerTeamPerformance, {
  foreignKey : 'id_player'
});

TeamSl.PlayerPerformances = TeamSl.hasMany(PlayerTeamPerformance, {
  foreignKey : 'id_sl'
});

Round.Performances = TeamSl.hasMany(PlayerTeamPerformance, {
  foreignKey : 'id_round'
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

////////////// League Relationships

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

League.Configs = League.hasMany(LeagueConfig, {
  foreignKey : 'id_league'
});

////////////// Free Agency History Relationships

FreeAgencyHistory.Player = FreeAgencyHistory.belongsTo(Player, {
  foreignKey : 'id_player'
});

FreeAgencyHistory.TeamSl = FreeAgencyHistory.belongsTo(TeamSl, {
  foreignKey : 'id_sl'
});

FreeAgencyHistory.ByLeague = function(league, args) {
  const id_league = league.id_league || args.id_league;
  return FreeAgencyHistory.findAll({
    include: [{
      model: TeamSl,
      include: [{
        model: Division,
        include: [{
          model: Conference,
          where : {
            id_league : id_league
          }
        }]
      }]
    }],
    order : 'event_date DESC',
    limit : args.limit || DEFAULT_LIMIT
  })
}

////////////// Pick Relationships

Pick.Draft = Pick.belongsTo(Draft, {
  foreignKey : 'id_draft'
});

Pick.Owner = Pick.belongsTo(TeamSl, {
  as : 'owner',
  foreignKey : 'id_owner'
});

Pick.Original = Pick.belongsTo(TeamSl, {
  as : 'original',
  foreignKey : 'id_sl_original'
});

Pick.Trades = Pick.belongsToMany(Trade, {
  through : PickTrade,
  foreignKey : 'id_pick'
})

////////////// Draft Relationships

Draft.Season = Draft.belongsTo(Season, {
  foreignKey : 'id_season'
});

Draft.League = Draft.belongsTo(League, {
  foreignKey : 'id_league'
});

Draft.Picks = Draft.hasMany(Pick, {
  foreignKey : 'id_draft'
});

////////////// User Relationships

User.Teams = User.belongsToMany(TeamSl, {
  through: UserTeam,
  foreignKey: 'id_user'
});

////////////// Trade Relationships

Trade.Sender = Trade.belongsTo(TeamSl, {
  as : 'sender',
  foreignKey : 'id_sender'
});

Trade.Receiver = Trade.belongsTo(TeamSl, {
  as : 'receiver',
  foreignKey : 'id_receiver'
});

Trade.Players = Trade.belongsToMany(Player, {
  through : PlayerTrade,
  foreignKey : 'id_player'
});

Trade.Picks = Trade.belongsToMany(Pick, {
  through : PickTrade,
  foreignKey : 'id_pick'
})

// Note to future self:
//   In order to make queries using through models you need to define relationships (not only belongsToMany)
//   on association model with actual entities.

PlayerTrade.belongsTo(Player, {
  foreignKey : 'id_player'
});
Player.hasMany(PlayerTrade, {
  foreignKey : 'id_player'
});

Trade.TradePlayers = function(trade, isSender) {
  return Player.findAll({
    include : [{
      model : PlayerTrade,
      foreignKey : 'id_player',
      where : {
        is_sender : isSender,
        id_trade : trade.id_trade
      }
    }]
  });
}

Trade.SenderPlayers = function(trade) {
  return Trade.TradePlayers(trade, true)
}

Trade.ReceiverPlayers = function(trade) {
  return Trade.TradePlayers(trade, false);
}

PickTrade.belongsTo(Pick, {
  foreignKey : 'id_pick'
});
Pick.hasMany(PickTrade, {
  foreignKey : 'id_pick'
});

Trade.TradePicks = function(trade, isSender) {
  return Pick.findAll({
    include : [{
      model : PickTrade,
      foreignKey : 'id_pick',
      where : {
        is_sender : isSender,
        id_trade : trade.id_trade
      }
    }]
  });
}

Trade.SenderPicks = function(trade) {
  return Trade.TradePicks(trade, true)
}

Trade.ReceiverPicks = function(trade) {
  return Trade.TradePicks(trade, false);
}


////////////// Player Relationships

Player.TeamNba = Player.belongsTo(TeamNba, {
  foreignKey : 'id_nba'
});

Player.TeamSl = Player.belongsToMany(TeamSl, {
  through : TeamPlayer,
  foreignKey : 'id_player'
});

Player.Performances = Player.hasMany(PlayerPerformance, {
  foreignKey : 'id_player'
});

Player.Stats = Player.hasMany(PlayerStats, {
  foreignKey : 'id_player'
});

Player.Trades = Player.belongsToMany(Trade, {
  through : PlayerTrade,
  foreignKey : 'id_player',
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
  League,
  Game,
  GameNba,
  Round,
  Season,
  PlayerPerformance,
  TeamPerformance,
  PlayerTeamPerformance,
  PlayerStats,
  TeamStats,
  Draft,
  Pick,
  Trade,
  FreeAgencyHistory
};
