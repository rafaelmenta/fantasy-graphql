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
import {PlayerLeagueSalary} from './player-league-salary';
import {Auction} from './auction';
import {PlayerBid} from './player-bid';

import PlayerStats from './views/player-stats';
import TeamStats from './views/team-stats';

import UserTeam from './associations/user-team';
import TeamPlayer from './associations/team-player';
import TeamSeason from './associations/team-season';
import PlayerTrade from './associations/player-trade';
import PickTrade from './associations/pick-trade';
import LeagueConfig from './associations/league-config';
import {Taxonomy} from './associations/taxonomy';
import Conn from '../database/connection';
import TradeStatus from '../graphql/object-types/enum/trade-status';
import { PlayerBidHistory } from './player-bid-history';

// @TODO extract to constant
const DEFAULT_LIMIT = 20;
const LIMIT_GAMES = 5;
const GAME_TYPE = {
  LEAGUE : 1,
  PLAYOFF : 2,
  FRIENDLY : 3
};

const DRAFT_TYPE = {
  GENERAL: 1,
  ROOKIES: 2,
};

const CURRENT_SEASON = 'CURRENT';

// end todo

////////////// Team SL Relationships

TeamSl.Users = TeamSl.belongsToMany(User, {
  through: UserTeam,
  foreignKey: 'id_sl'
});

TeamSl.Players = TeamSl.belongsToMany(Player, {
  through : TeamPlayer,
  foreignKey : 'id_sl',
  as: 'Players',
});

TeamSl.TeamPlayer = TeamSl.hasMany(TeamPlayer, {
  foreignKey : 'id_sl'
});

TeamPlayer.TeamSl = TeamPlayer.belongsTo(TeamSl, {
  foreignKey : 'id_sl'
});

TeamSl.Division = TeamSl.belongsTo(Division, {
  foreignKey : 'id_division'
});

TeamSl.RosterSalary = function ({id_sl, id_league}) {
  return Conn.query(`
    SELECT ps.*
    FROM team_player tp
    JOIN player_league_salary ps ON tp.id_player=ps.id_player AND ps.id_league = ${id_league}
    WHERE tp.id_sl =${id_sl}
  `, { model: PlayerLeagueSalary });
}

TeamSl.GetCurrentRecord = function(id) {
  return TeamSeason.findOne({
    include: [{
      model: Season,
      foreignKey: 'id_season',
      where: {
        current: true
      }
    }],
    where: {
      id_sl: id
    }
  });
};

TeamSl.GetRecord = function(idSl, idSeason) {
  return TeamSeason.findOne({
    where: {
      id_sl: idSl,
      id_season: idSeason
    }
  });
}

TeamSl.Record = function(team, args) {

  if (args.id_season === CURRENT_SEASON) {
    return TeamSl.GetCurrentRecord(team.id_sl)
  }
  return TeamSl.GetRecord(team.id_sl, args.id_season)

};

TeamSl.hasOne(TeamSeason, {
  foreignKey : 'id_sl'
});

TeamSl.GetCurrentStats = function(id) {
  return TeamStats.findOne({
    where: {
      id_sl : id
    },
    include: [{
      model: Season,
      foreignKey: 'id_season',
      where: {
        current: true
      }
    }]
  })
};

TeamSl.GetStats = function(idSl, idSeason) {
  return TeamStats.findOne({
    where: {
      id_sl: idSl,
      id_season: idSeason
    }
  })
};

TeamSl.Stats = function(team, args) {

  if (args.id_season === CURRENT_SEASON) {
    return TeamSl.GetCurrentStats(team.id_sl);
  }
  return TeamSl.GetStats(team.id_sl, args.id_season);
}

TeamSl.hasMany(TeamStats, {
  foreignKey : 'id_sl'
});

TeamSl.Records = TeamSl.hasMany(TeamSeason, {
  foreignKey : 'id_sl'
});

TeamSl.Picks = function(team) {
  return Pick.findAll({
    where : {
      id_owner : team.id_sl,
      is_used : false
    }
  });
};

TeamSl.GetGames = function({id, type, processed, order, limit, season}) {
  let seasonFilter;

  if (season) {
    seasonFilter = {
      id_season: season
    }
  }

  return Game.findAll({
    where : {
      id_type : type,
      $or : [{ home_team : id}, { away_team : id }]
    },
    include: {
      model : Round,
      where : Object.assign({}, seasonFilter, {
        processed : processed
      })
    },
    order : [['id_round', order]],
    limit : limit
  });
};

TeamSl.AllGames = function(team, args) {
  return TeamSl.GetGames({
    id: team.id_sl,
    processed: [true, false],
    type: GAME_TYPE.LEAGUE,
    season: args.id_season,
    order: 'ASC'
  })
};

TeamSl.PlayoffsGames = function (team, args) {
  return TeamSl.GetGames({
    id: team.id_sl,
    processed: [true, false],
    type: GAME_TYPE.PLAYOFF,
    season: args.id_season,
    order: 'ASC'
  })
};

TeamSl.RecentGames = function(team) {
  return TeamSl.GetGames({
    id : team.id_sl,
    type : GAME_TYPE.LEAGUE,
    processed : true,
    order : 'DESC',
    limit : LIMIT_GAMES
  });
};

TeamSl.NextGames = function(team) {
  return TeamSl.GetGames({
    id : team.id_sl,
    type : GAME_TYPE.LEAGUE,
    processed : false,
    order : 'ASC',
    limit : LIMIT_GAMES
  });
};

TeamSl.SentTrades = TeamSl.hasMany(Trade, {
  as: 'sent_trades',
  foreignKey: 'id_sender'
});

TeamSl.ReceivedTrades = TeamSl.hasMany(Trade, {
  as: 'received_trades',
  foreignKey: 'id_receiver'
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

GameNba.RangedDateGames = function(root, args) {
  return GameNba.findAll({
    attributes: {
      include: [[GameNba.sequelize.fn('DATE', GameNba.sequelize.col('game_time')), 'game_date']]
     }, having : {
      'game_date' : {
        $gte : args.start_date,
        $lte : args.end_date
      }
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

Game.Round = Game.belongsTo(Round, {
  foreignKey : 'id_round'
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
  return Game.GetPerformance(game.away_team, game.id_round)
};

Game.GetPlayersPerformance = function({idRound, idSl}) {
  return PlayerTeamPerformance.findAll({
    where: {
      id_round: idRound,
      id_sl: idSl
    }
  })
};

Game.HomePlayers = function(game) {
  return Game.GetPlayersPerformance({
    idRound: game.id_round,
    idSl: game.home_team
  })
};

Game.AwayPlayers = function(game) {
  return Game.GetPlayersPerformance({
    idRound: game.id_round,
    idSl: game.away_team
  })
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

Season.TeamSeason = Season.hasMany(TeamSeason, {
  foreignKey : 'id_season'
});

TeamSeason.Season = TeamSeason.belongsTo(Season, {
  foreignKey : 'id_season'
})

Season.Current = function() {
  return Season.findOne({
    where : {
      current : true
    }
  });
};

////////////// Team Stats Relationships

TeamStats.TeamSl = TeamStats.belongsTo(TeamSl, {
  foreignKey : 'id_sl'
});

TeamStats.Season = TeamStats.belongsTo(Season, {
  foreignKey : 'id_season'
});

////////////// Player Stats Relationships

PlayerStats.GamesPlayed = function(playerStat) {
  return PlayerPerformance.count({
    include: [{
      model : Round,
      foreignKey : 'id_round',
      where : {
        id_season : playerStat.id_season
      }
    }],
    where : {
      id_player : playerStat.id_player,
      minutes : {
        $ne : 0
      }
    }
  })
};

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

PlayerPerformance.RoundAverages = function(obj, args) {
  return PlayerPerformance.findAll({
    attributes: [
      'id_round',
      [PlayerPerformance.sequelize.fn('AVG', PlayerPerformance.sequelize.col('fantasy_points')), 'fantasy_points'],
      [PlayerPerformance.sequelize.fn('MAX', PlayerPerformance.sequelize.col('fantasy_points')), 'max_fantasy_points']
    ],
    group: 'id_round',
    where: {
      fantasy_points : {
        $ne : 0
      },
    },
    having: {
      fantasy_points : {
        $ne : null
      }
    },
    include: {
      model: Round,
      foreignKey: 'id_round',
      include: {
        model: Season,
        foreignKey: 'id_season',
        where: {
          id_season: args.id_season
        }
      }
    }
  });
};

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

PlayerTeamPerformance.PlayerPerformance = function(playerTeam) {
  return PlayerPerformance.findOne({
    where: {
      id_player: playerTeam.id_player,
      id_round: playerTeam.id_round
    }
  })
};

////////////// Division Relationships

Division.Teams = Division.hasMany(TeamSl, {
  foreignKey : 'id_division'
});

Division.Conference = Division.belongsTo(Conference, {
  foreignKey : 'id_conference'
});

////////////// Conference Relationships

Conference.League = Conference.belongsTo(League, {
  foreignKey : 'id_league'
});

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
  foreignKey : 'id_league',
  as: 'Configs',
});

LeagueConfig.League = LeagueConfig.belongsTo(LeagueConfig, {
  foreignKey: 'id_league',
});

League.MostRecentDraft = function(league) {
  return Draft.findOne({
    include: [{
      model: Season,
      where: {
        current: true,
      }
    }],
    where: {
      id_league: league.id_league,
    },
  });
};

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

Draft.AvailablePlayers = function(draft) {
  if (!draft.id_league) return;

  return Conn.query(`
  SELECT p.*, p.primary_position as default_primary, p.secondary_position as default_secondary
  FROM player p
  WHERE
    p.retired = false AND
    ${draft.draft_type === DRAFT_TYPE.ROOKIES ? 'p.rookie = TRUE AND' : ''}
      NOT EXISTS (
        SELECT 1 FROM team_player tp
        JOIN team_sl t ON t.id_sl = tp.id_sl
        JOIN division d ON d.id_division = t.id_division
        JOIN conference c ON c.id_conference = d.id_conference AND c.id_league=${draft.id_league}
        WHERE p.id_player=tp.id_player
      )`, { model: Player });
}

////////////// User Relationships

User.UserTeams = User.hasMany(UserTeam, {
  foreignKey: 'id_user'
});

User.Teams = User.belongsToMany(TeamSl, {
  through: UserTeam,
  foreignKey: 'id_user'
});

TeamSl.UserTeams = TeamSl.hasMany(UserTeam, {
  foreignKey: 'id_sl',
});

UserTeam.Team = UserTeam.belongsTo(TeamSl, {
  foreignKey: 'id_sl'
});

UserTeam.User = UserTeam.belongsTo(User, {
  foreignKey: 'id_user',
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

Trade.History = function (league) {

  return Conn.query(`
    SELECT t.*
    FROM trade t
    JOIN team_sl s ON s.id_sl=t.id_sender
    JOIN division d ON s.id_division=d.id_division
    JOIN conference c ON d.id_conference=c.id_conference AND c.id_league = ${league.id_league}
    WHERE t.status_trade=${TradeStatus.parseValue('ACCEPTED')}
    ORDER BY t.last_change DESC, t.id_trade DESC
	 	LIMIT 0,10
  `, { model: Trade });
}

// Note to future self:
//   In order to make queries using through models you need to define relationships (not only belongsToMany)
//   on association model with actual entities.

PlayerTrade.belongsTo(Player, {
  foreignKey : 'id_player'
});

PlayerTrade.belongsTo(Trade, {
  foreignKey: 'id_trade'
});

Trade.hasMany(PlayerTrade, {
  foreignKey: 'id_trade'
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

Trade.hasMany(PickTrade, {
  foreignKey: 'id_trade'
});

PickTrade.belongsTo(Trade, {
  foreignKey : 'id_trade'
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

Player.PerformancesRel = Player.hasMany(PlayerPerformance, {
  foreignKey : 'id_player'
});

Player.Performances = function(player, args) {

  let round, season;

  if (args.id_season) {
    season = { id_season : args.id_season };
  }

  if (args.id_round) {
    round = { id_round : args.id_round };
  }

  return PlayerPerformance.findAll({
    include: {
      model: Round,
      where: season
    },
    where: Object.assign({id_player: player.id_player}, round)
  })
}

Player.Stats = Player.hasMany(PlayerStats, {
  foreignKey : 'id_player',
});

Player.Trades = Player.belongsToMany(Trade, {
  through : PlayerTrade,
  foreignKey : 'id_player',
});

Player.TeamPlayers = Player.hasMany(TeamPlayer, {
  foreignKey : 'id_player'
});

TeamPlayer.Player = TeamPlayer.belongsTo(Player, {
  foreignKey : 'id_player'
});

League.FreeAgents = function(league) {
  if (!league.id_league) return;

  return Conn.query(`
    SELECT p.*, p.primary_position as default_primary, p.secondary_position as default_secondary
    FROM player p
    WHERE
       p.retired = false AND
       NOT EXISTS (
          SELECT 1 FROM team_player tp
          JOIN team_sl t ON t.id_sl = tp.id_sl
          JOIN division d ON d.id_division = t.id_division
          JOIN conference c ON c.id_conference = d.id_conference AND c.id_league=${league.id_league}
          WHERE p.id_player=tp.id_player
       )`, { model: Player });
}

Player.PlayerSearch = function(search, args) {
  const query = args.query;

  return Conn.query(`
    SELECT *
    FROM player
    WHERE
      retired=false AND (
        LOWER(first_name) LIKE "%${query}%" OR
        LOWER(last_name) LIKE "%${query}%" OR
        LOWER( CONCAT( first_name,  ' ', last_name ) ) LIKE "%${query}%"
      )
    LIMIT 0,3;
  `, {model: Player});
}

TeamSl.TeamSearch = function(search, args) {
  const id = args.id_league;
  const query = args.query;

  return Conn.query(`
    SELECT t.*
    FROM team_sl t
    JOIN division d ON t.id_division = d.id_division
    JOIN conference c ON d.id_conference=c.id_conference
    WHERE
      c.id_league = ${id} AND
      (LOWER(t.city) LIKE "%${query}%" OR
      LOWER(t.nickname) LIKE "%${query}%")
    LIMIT 0,3;
  `, { model: TeamSl });
}

Player.Team = function(player, args) {
  const where = {
    id_player : player.id_player
  };
  let include;

  if (!args.id_sl && !args.slug && !args.id_league) return;

  if (args.id_sl) {
    where.id_sl = args.id_sl;
  }

  let teamWhere = {};
  if (args.slug) {
    teamWhere.slug = args.slug;
  }

  if (args.id_league) {
    include = [{
      model: TeamSl,
      where: teamWhere,
      foreignKey: 'id_sl',
      include : [{
        model: Division,
        foreignKey: 'id_division',
        include: [{
          model: Conference,
          foreignKey: 'id_conference',
          where: {
            id_league: args.id_league
          }
        }]
      }]
    }];
  }

  return TeamPlayer.findOne({
    where : where,
    include : include
  })
};

Player.NextGames = function(player, args) {
  return GameNba.findAll({
    where : {
      $or : {
        id_home : player.id_nba,
        id_away : player.id_nba
      },
      game_time : {
        $gte : new Date()
      },
    },
    limit : args.limit
  })
};

////////////// Team NBA Relationships

TeamNba.Players = TeamNba.hasMany(Player, {
  foreignKey : 'id_nba'
});

////////////// Taxonomy Relationships

Taxonomy.Team = Taxonomy.belongsTo(TeamSl, {
  foreignKey: 'slug',
});

TeamSl.Slugs = TeamSl.hasMany(Taxonomy, {
  foreignKey: 'slug'
});

Taxonomy.Player = Taxonomy.belongsTo(Player, {
  foreignKey: 'slug',
});

Player.Slugs = Taxonomy.hasMany(Taxonomy, {
  foreignKey: 'player_slug',
});

////////////// Player league salary Relationships

PlayerLeagueSalary.Player = PlayerLeagueSalary.belongsTo(Player, {
  foreignKey: 'id_player',
});

PlayerLeagueSalary.League = PlayerLeagueSalary.belongsTo(League, {
  foreignKey: 'id_league',
});

League.PlayerSalary = League.hasMany(PlayerLeagueSalary, {
  foreignKey: 'id_league',
});

Player.LeagueSalary = Player.hasMany(PlayerLeagueSalary, {
  foreignKey: 'id_player',
});

PlayerLeagueSalary.TeamPlayerSalary = function (player, args) {
  const idPlayer = player.id_player;
  const idSl = player.team_players[0].id_sl;

  return Conn.query(`
    SELECT ps.*
    FROM player_league_salary ps
    JOIN player p ON ps.id_player=p.id_player AND p.id_player=${idPlayer}
    JOIN team_sl t ON t.id_sl=${idSl}
    AND ps.id_league = t.league_id
  `, { model: PlayerLeagueSalary });
}

////////////// Auction Relationships

Auction.League = Auction.belongsTo(League, {
  foreignKey: 'id_league',
});

League.Auctions = League.hasMany(Auction, {
  foreignKey: 'id_league',
});

Auction.Bids = Auction.hasMany(PlayerBid, {
  foreignKey: 'id_auction',
});

PlayerBid.Auction = PlayerBid.belongsTo(Auction, {
  foreignKey: 'id_auction',
});

PlayerBid.Player = PlayerBid.belongsTo(Player, {
  foreignKey: 'id_player',
  as: 'Player',
});

Player.Bids = Player.hasMany(PlayerBid, {
  foreignKey: 'id_player',
});

PlayerBid.Team = PlayerBid.belongsTo(TeamSl, {
  foreignKey: 'id_sl',
  as: 'Team',
});

PlayerBidHistory.Bid = PlayerBidHistory.belongsTo(PlayerBid, {
  foreignKey: 'id_bid',
  as: 'bid',
});

PlayerBidHistory.Team = PlayerBidHistory.belongsTo(TeamSl, {
  foreignKey: 'id_sl',
  as: 'Team',
})

PlayerBidHistory.Player = PlayerBidHistory.belongsTo(Player, {
  foreignKey: 'id_player',
});

PlayerBid.History = PlayerBid.hasMany(PlayerBidHistory, {
  foreignKey: 'id_bid',
  as: 'history',
});

export {
  User,
  TeamSl,
  Player,
  TeamNba,
  Division,
  Conference,
  League,
  LeagueConfig,
  Game,
  GameNba,
  Round,
  Season,
  PlayerPerformance,
  TeamPerformance,
  PlayerTeamPerformance,
  PlayerStats,
  UserTeam,
  TeamStats,
  Draft,
  Pick,
  Trade,
  FreeAgencyHistory,
  TeamPlayer,
  PlayerLeagueSalary,
  PlayerTrade,
  PickTrade,
  Taxonomy,
  TeamSeason,
  Auction,
  PlayerBid,
  PlayerBidHistory,
};
