"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "User", {
  enumerable: true,
  get: function get() {
    return _user["default"];
  }
});
Object.defineProperty(exports, "TeamSl", {
  enumerable: true,
  get: function get() {
    return _teamSl["default"];
  }
});
Object.defineProperty(exports, "Player", {
  enumerable: true,
  get: function get() {
    return _player["default"];
  }
});
Object.defineProperty(exports, "TeamNba", {
  enumerable: true,
  get: function get() {
    return _teamNba["default"];
  }
});
Object.defineProperty(exports, "Division", {
  enumerable: true,
  get: function get() {
    return _division["default"];
  }
});
Object.defineProperty(exports, "Conference", {
  enumerable: true,
  get: function get() {
    return _conference["default"];
  }
});
Object.defineProperty(exports, "League", {
  enumerable: true,
  get: function get() {
    return _league["default"];
  }
});
Object.defineProperty(exports, "Draft", {
  enumerable: true,
  get: function get() {
    return _draft["default"];
  }
});
Object.defineProperty(exports, "Pick", {
  enumerable: true,
  get: function get() {
    return _pick["default"];
  }
});
Object.defineProperty(exports, "Game", {
  enumerable: true,
  get: function get() {
    return _game["default"];
  }
});
Object.defineProperty(exports, "GameNba", {
  enumerable: true,
  get: function get() {
    return _gameNba["default"];
  }
});
Object.defineProperty(exports, "Round", {
  enumerable: true,
  get: function get() {
    return _round["default"];
  }
});
Object.defineProperty(exports, "Season", {
  enumerable: true,
  get: function get() {
    return _season["default"];
  }
});
Object.defineProperty(exports, "PlayerPerformance", {
  enumerable: true,
  get: function get() {
    return _playerPerformance["default"];
  }
});
Object.defineProperty(exports, "TeamPerformance", {
  enumerable: true,
  get: function get() {
    return _teamPerformance["default"];
  }
});
Object.defineProperty(exports, "PlayerTeamPerformance", {
  enumerable: true,
  get: function get() {
    return _playerTeamPerformance["default"];
  }
});
Object.defineProperty(exports, "FreeAgencyHistory", {
  enumerable: true,
  get: function get() {
    return _freeAgencyHistory["default"];
  }
});
Object.defineProperty(exports, "Trade", {
  enumerable: true,
  get: function get() {
    return _trade["default"];
  }
});
Object.defineProperty(exports, "PlayerLeagueSalary", {
  enumerable: true,
  get: function get() {
    return _playerLeagueSalary.PlayerLeagueSalary;
  }
});
Object.defineProperty(exports, "Auction", {
  enumerable: true,
  get: function get() {
    return _auction.Auction;
  }
});
Object.defineProperty(exports, "PlayerBid", {
  enumerable: true,
  get: function get() {
    return _playerBid.PlayerBid;
  }
});
Object.defineProperty(exports, "PlayerStats", {
  enumerable: true,
  get: function get() {
    return _playerStats["default"];
  }
});
Object.defineProperty(exports, "TeamStats", {
  enumerable: true,
  get: function get() {
    return _teamStats["default"];
  }
});
Object.defineProperty(exports, "UserTeam", {
  enumerable: true,
  get: function get() {
    return _userTeam["default"];
  }
});
Object.defineProperty(exports, "TeamPlayer", {
  enumerable: true,
  get: function get() {
    return _teamPlayer["default"];
  }
});
Object.defineProperty(exports, "TeamSeason", {
  enumerable: true,
  get: function get() {
    return _teamSeason["default"];
  }
});
Object.defineProperty(exports, "PlayerTrade", {
  enumerable: true,
  get: function get() {
    return _playerTrade["default"];
  }
});
Object.defineProperty(exports, "PickTrade", {
  enumerable: true,
  get: function get() {
    return _pickTrade["default"];
  }
});
Object.defineProperty(exports, "LeagueConfig", {
  enumerable: true,
  get: function get() {
    return _leagueConfig["default"];
  }
});
Object.defineProperty(exports, "Taxonomy", {
  enumerable: true,
  get: function get() {
    return _taxonomy.Taxonomy;
  }
});
Object.defineProperty(exports, "PlayerBidHistory", {
  enumerable: true,
  get: function get() {
    return _playerBidHistory.PlayerBidHistory;
  }
});

var _user = _interopRequireDefault(require("./user"));

var _teamSl = _interopRequireDefault(require("./team-sl"));

var _player = _interopRequireDefault(require("./player"));

var _teamNba = _interopRequireDefault(require("./team-nba"));

var _division = _interopRequireDefault(require("./division"));

var _conference = _interopRequireDefault(require("./conference"));

var _league = _interopRequireDefault(require("./league"));

var _draft = _interopRequireDefault(require("./draft"));

var _pick = _interopRequireDefault(require("./pick"));

var _game = _interopRequireDefault(require("./game"));

var _gameNba = _interopRequireDefault(require("./game-nba"));

var _round = _interopRequireDefault(require("./round"));

var _season = _interopRequireDefault(require("./season"));

var _playerPerformance = _interopRequireDefault(require("./player-performance"));

var _teamPerformance = _interopRequireDefault(require("./team-performance"));

var _playerTeamPerformance = _interopRequireDefault(require("./player-team-performance"));

var _freeAgencyHistory = _interopRequireDefault(require("./free-agency-history"));

var _trade = _interopRequireDefault(require("./trade"));

var _playerLeagueSalary = require("./player-league-salary");

var _auction = require("./auction");

var _playerBid = require("./player-bid");

var _playerStats = _interopRequireDefault(require("./views/player-stats"));

var _teamStats = _interopRequireDefault(require("./views/team-stats"));

var _userTeam = _interopRequireDefault(require("./associations/user-team"));

var _teamPlayer = _interopRequireDefault(require("./associations/team-player"));

var _teamSeason = _interopRequireDefault(require("./associations/team-season"));

var _playerTrade = _interopRequireDefault(require("./associations/player-trade"));

var _pickTrade = _interopRequireDefault(require("./associations/pick-trade"));

var _leagueConfig = _interopRequireDefault(require("./associations/league-config"));

var _taxonomy = require("./associations/taxonomy");

var _connection = _interopRequireDefault(require("../database/connection"));

var _tradeStatus = _interopRequireDefault(require("../graphql/object-types/enum/trade-status"));

var _playerBidHistory = require("./player-bid-history");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// @TODO extract to constant
var DEFAULT_LIMIT = 20;
var LIMIT_GAMES = 5;
var GAME_TYPE = {
  LEAGUE: 1,
  PLAYOFF: 2,
  FRIENDLY: 3
};
var DRAFT_TYPE = {
  GENERAL: 1,
  ROOKIES: 2
};
var CURRENT_SEASON = 'CURRENT'; // end todo
////////////// Team SL Relationships

_teamSl["default"].Users = _teamSl["default"].belongsToMany(_user["default"], {
  through: _userTeam["default"],
  foreignKey: 'id_sl'
});
_teamSl["default"].Players = _teamSl["default"].belongsToMany(_player["default"], {
  through: _teamPlayer["default"],
  foreignKey: 'id_sl'
});
_teamSl["default"].TeamPlayer = _teamSl["default"].hasMany(_teamPlayer["default"], {
  foreignKey: 'id_sl'
});
_teamPlayer["default"].TeamSl = _teamPlayer["default"].belongsTo(_teamSl["default"], {
  foreignKey: 'id_sl'
});
_teamSl["default"].Division = _teamSl["default"].belongsTo(_division["default"], {
  foreignKey: 'id_division'
});

_teamSl["default"].RosterSalary = function (_ref) {
  var id_sl = _ref.id_sl,
      id_league = _ref.id_league;
  return _connection["default"].query("\n    SELECT ps.*\n    FROM team_player tp\n    JOIN player_league_salary ps ON tp.id_player=ps.id_player AND ps.id_league = ".concat(id_league, "\n    WHERE tp.id_sl =").concat(id_sl, "\n  "), {
    model: _playerLeagueSalary.PlayerLeagueSalary
  });
};

_teamSl["default"].GetCurrentRecord = function (id) {
  return _teamSeason["default"].findOne({
    include: [{
      model: _season["default"],
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

_teamSl["default"].GetRecord = function (idSl, idSeason) {
  return _teamSeason["default"].findOne({
    where: {
      id_sl: idSl,
      id_season: idSeason
    }
  });
};

_teamSl["default"].Record = function (team, args) {
  if (args.id_season === CURRENT_SEASON) {
    return _teamSl["default"].GetCurrentRecord(team.id_sl);
  }

  return _teamSl["default"].GetRecord(team.id_sl, args.id_season);
};

_teamSl["default"].hasOne(_teamSeason["default"], {
  foreignKey: 'id_sl'
});

_teamSl["default"].GetCurrentStats = function (id) {
  return _teamStats["default"].findOne({
    where: {
      id_sl: id
    },
    include: [{
      model: _season["default"],
      foreignKey: 'id_season',
      where: {
        current: true
      }
    }]
  });
};

_teamSl["default"].GetStats = function (idSl, idSeason) {
  return _teamStats["default"].findOne({
    where: {
      id_sl: idSl,
      id_season: idSeason
    }
  });
};

_teamSl["default"].Stats = function (team, args) {
  if (args.id_season === CURRENT_SEASON) {
    return _teamSl["default"].GetCurrentStats(team.id_sl);
  }

  return _teamSl["default"].GetStats(team.id_sl, args.id_season);
};

_teamSl["default"].hasMany(_teamStats["default"], {
  foreignKey: 'id_sl'
});

_teamSl["default"].Records = _teamSl["default"].hasMany(_teamSeason["default"], {
  foreignKey: 'id_sl'
});

_teamSl["default"].Picks = function (team) {
  return _pick["default"].findAll({
    where: {
      id_owner: team.id_sl,
      is_used: false
    }
  });
};

_teamSl["default"].GetGames = function (_ref2) {
  var id = _ref2.id,
      type = _ref2.type,
      processed = _ref2.processed,
      order = _ref2.order,
      limit = _ref2.limit,
      season = _ref2.season;
  var seasonFilter;

  if (season) {
    seasonFilter = {
      id_season: season
    };
  }

  return _game["default"].findAll({
    where: {
      id_type: type,
      $or: [{
        home_team: id
      }, {
        away_team: id
      }]
    },
    include: {
      model: _round["default"],
      where: Object.assign({}, seasonFilter, {
        processed: processed
      })
    },
    order: [['id_round', order]],
    limit: limit
  });
};

_teamSl["default"].AllGames = function (team, args) {
  return _teamSl["default"].GetGames({
    id: team.id_sl,
    processed: [true, false],
    type: GAME_TYPE.LEAGUE,
    season: args.id_season,
    order: 'ASC'
  });
};

_teamSl["default"].PlayoffsGames = function (team, args) {
  return _teamSl["default"].GetGames({
    id: team.id_sl,
    processed: [true, false],
    type: GAME_TYPE.PLAYOFF,
    season: args.id_season,
    order: 'ASC'
  });
};

_teamSl["default"].RecentGames = function (team) {
  return _teamSl["default"].GetGames({
    id: team.id_sl,
    type: GAME_TYPE.LEAGUE,
    processed: true,
    order: 'DESC',
    limit: LIMIT_GAMES
  });
};

_teamSl["default"].NextGames = function (team) {
  return _teamSl["default"].GetGames({
    id: team.id_sl,
    type: GAME_TYPE.LEAGUE,
    processed: false,
    order: 'ASC',
    limit: LIMIT_GAMES
  });
};

_teamSl["default"].SentTrades = _teamSl["default"].hasMany(_trade["default"], {
  as: 'sent_trades',
  foreignKey: 'id_sender'
});
_teamSl["default"].ReceivedTrades = _teamSl["default"].hasMany(_trade["default"], {
  as: 'received_trades',
  foreignKey: 'id_receiver'
}); ////////////// Game NBA Relationships

_gameNba["default"].HomeTeam = _gameNba["default"].belongsTo(_teamNba["default"], {
  as: 'home',
  foreignKey: 'id_home'
});
_gameNba["default"].AwayTeam = _gameNba["default"].belongsTo(_teamNba["default"], {
  as: 'away',
  foreignKey: 'id_away'
});
_gameNba["default"].HomeRound = _gameNba["default"].belongsTo(_round["default"], {
  as: 'home_round',
  foreignKey: 'id_round_home'
});
_gameNba["default"].AwayRound = _gameNba["default"].belongsTo(_round["default"], {
  as: 'away_round',
  foreignKey: 'id_round_away'
});

_gameNba["default"].DateGames = function (root, args) {
  return _gameNba["default"].findAll({
    attributes: {
      include: [[_gameNba["default"].sequelize.fn('DATE', _gameNba["default"].sequelize.col('game_time')), 'game_date']]
    },
    having: {
      'game_date': args.date
    }
  });
};

_gameNba["default"].RangedDateGames = function (root, args) {
  return _gameNba["default"].findAll({
    attributes: {
      include: [[_gameNba["default"].sequelize.fn('DATE', _gameNba["default"].sequelize.col('game_time')), 'game_date']]
    },
    having: {
      'game_date': {
        $gte: args.start_date,
        $lte: args.end_date
      }
    }
  });
}; ////////////// Game Relationships


_game["default"].HomeTeam = _game["default"].belongsTo(_teamSl["default"], {
  as: 'home',
  foreignKey: 'home_team'
});
_game["default"].AwayTeam = _game["default"].belongsTo(_teamSl["default"], {
  as: 'away',
  foreignKey: 'away_team'
});
_game["default"].Round = _game["default"].belongsTo(_round["default"], {
  foreignKey: 'id_round'
});

_game["default"].GetPerformance = function (idSl, idRound) {
  return _teamPerformance["default"].findOne({
    where: {
      id_sl: idSl,
      id_round: idRound
    }
  });
};

_game["default"].HomePerformance = function (game, args) {
  return _game["default"].GetPerformance(game.home_team, game.id_round);
};

_game["default"].AwayPerformance = function (game, args) {
  return _game["default"].GetPerformance(game.away_team, game.id_round);
};

_game["default"].GetPlayersPerformance = function (_ref3) {
  var idRound = _ref3.idRound,
      idSl = _ref3.idSl;
  return _playerTeamPerformance["default"].findAll({
    where: {
      id_round: idRound,
      id_sl: idSl
    }
  });
};

_game["default"].HomePlayers = function (game) {
  return _game["default"].GetPlayersPerformance({
    idRound: game.id_round,
    idSl: game.home_team
  });
};

_game["default"].AwayPlayers = function (game) {
  return _game["default"].GetPlayersPerformance({
    idRound: game.id_round,
    idSl: game.away_team
  });
}; ////////////// Round Relationships


_round["default"].Games = _round["default"].hasMany(_game["default"], {
  foreignKey: 'id_round'
});
_round["default"].Season = _round["default"].belongsTo(_season["default"], {
  foreignKey: 'id_season'
}); ////////////// Season Relationships

_season["default"].Rounds = _season["default"].hasMany(_round["default"], {
  foreignKey: 'id_season'
});
_season["default"].TeamSeason = _season["default"].hasMany(_teamSeason["default"], {
  foreignKey: 'id_season'
});
_teamSeason["default"].Season = _teamSeason["default"].belongsTo(_season["default"], {
  foreignKey: 'id_season'
});

_season["default"].Current = function () {
  return _season["default"].findOne({
    where: {
      current: true
    }
  });
}; ////////////// Team Stats Relationships


_teamStats["default"].TeamSl = _teamStats["default"].belongsTo(_teamSl["default"], {
  foreignKey: 'id_sl'
});
_teamStats["default"].Season = _teamStats["default"].belongsTo(_season["default"], {
  foreignKey: 'id_season'
}); ////////////// Player Stats Relationships

_playerStats["default"].GamesPlayed = function (playerStat) {
  return _playerPerformance["default"].count({
    include: [{
      model: _round["default"],
      foreignKey: 'id_round',
      where: {
        id_season: playerStat.id_season
      }
    }],
    where: {
      id_player: playerStat.id_player,
      minutes: {
        $ne: 0
      }
    }
  });
};

_playerStats["default"].Player = _playerStats["default"].belongsTo(_player["default"], {
  foreignKey: 'id_player'
});
_playerStats["default"].Season = _playerStats["default"].belongsTo(_season["default"], {
  foreignKey: 'id_season'
}); ////////////// Player Performance Relationships

_playerPerformance["default"].Player = _playerPerformance["default"].belongsTo(_player["default"], {
  foreignKey: 'id_player'
});
_playerPerformance["default"].Round = _playerPerformance["default"].belongsTo(_round["default"], {
  foreignKey: 'id_round'
});

_playerPerformance["default"].RoundAverages = function (obj, args) {
  return _playerPerformance["default"].findAll({
    attributes: ['id_round', [_playerPerformance["default"].sequelize.fn('AVG', _playerPerformance["default"].sequelize.col('fantasy_points')), 'fantasy_points'], [_playerPerformance["default"].sequelize.fn('MAX', _playerPerformance["default"].sequelize.col('fantasy_points')), 'max_fantasy_points']],
    group: 'id_round',
    where: {
      fantasy_points: {
        $ne: 0
      }
    },
    having: {
      fantasy_points: {
        $ne: null
      }
    },
    include: {
      model: _round["default"],
      foreignKey: 'id_round',
      include: {
        model: _season["default"],
        foreignKey: 'id_season',
        where: {
          id_season: args.id_season
        }
      }
    }
  });
}; ////////////// Team Performance Relationships


_teamPerformance["default"].Team = _teamPerformance["default"].belongsTo(_teamSl["default"], {
  foreignKey: 'id_sl'
});
_teamPerformance["default"].Round = _teamPerformance["default"].belongsTo(_round["default"], {
  foreignKey: 'id_round'
}); ////////////// Player Team Performance Relationships

_playerTeamPerformance["default"].Player = _playerTeamPerformance["default"].belongsTo(_player["default"], {
  foreignKey: 'id_player'
});
_playerTeamPerformance["default"].TeamSl = _playerTeamPerformance["default"].belongsTo(_teamSl["default"], {
  foreignKey: 'id_sl'
});
_playerTeamPerformance["default"].Round = _playerTeamPerformance["default"].belongsTo(_round["default"], {
  foreignKey: 'id_round'
});
_player["default"].TeamPerformances = _player["default"].hasMany(_playerTeamPerformance["default"], {
  foreignKey: 'id_player'
});
_teamSl["default"].PlayerPerformances = _teamSl["default"].hasMany(_playerTeamPerformance["default"], {
  foreignKey: 'id_sl'
});
_round["default"].Performances = _teamSl["default"].hasMany(_playerTeamPerformance["default"], {
  foreignKey: 'id_round'
});

_playerTeamPerformance["default"].PlayerPerformance = function (playerTeam) {
  return _playerPerformance["default"].findOne({
    where: {
      id_player: playerTeam.id_player,
      id_round: playerTeam.id_round
    }
  });
}; ////////////// Division Relationships


_division["default"].Teams = _division["default"].hasMany(_teamSl["default"], {
  foreignKey: 'id_division'
});
_division["default"].Conference = _division["default"].belongsTo(_conference["default"], {
  foreignKey: 'id_conference'
}); ////////////// Conference Relationships

_conference["default"].League = _conference["default"].belongsTo(_league["default"], {
  foreignKey: 'id_league'
});
_conference["default"].Divisions = _conference["default"].hasMany(_division["default"], {
  foreignKey: 'id_conference'
});

_conference["default"].Teams = function (conference) {
  return _teamSl["default"].findAll({
    include: [{
      model: _division["default"],
      where: {
        'id_conference': conference.id_conference
      }
    }]
  });
}; ////////////// League Relationships


_league["default"].Conferences = _league["default"].hasMany(_conference["default"], {
  foreignKey: 'id_league'
});

_league["default"].Teams = function (league) {
  return _teamSl["default"].findAll({
    include: [{
      model: _division["default"],
      include: [{
        model: _conference["default"],
        where: {
          id_league: league.id_league
        }
      }]
    }]
  });
};

_league["default"].Owner = _league["default"].belongsTo(_user["default"], {
  foreignKey: 'id_owner'
});
_league["default"].Configs = _league["default"].hasMany(_leagueConfig["default"], {
  foreignKey: 'id_league',
  as: 'Configs'
});
_leagueConfig["default"].League = _leagueConfig["default"].belongsTo(_leagueConfig["default"], {
  foreignKey: 'id_league'
});

_league["default"].MostRecentDraft = function (league) {
  return _draft["default"].findOne({
    include: [{
      model: _season["default"],
      where: {
        current: true
      }
    }],
    where: {
      id_league: league.id_league
    }
  });
}; ////////////// Free Agency History Relationships


_freeAgencyHistory["default"].Player = _freeAgencyHistory["default"].belongsTo(_player["default"], {
  foreignKey: 'id_player'
});
_freeAgencyHistory["default"].TeamSl = _freeAgencyHistory["default"].belongsTo(_teamSl["default"], {
  foreignKey: 'id_sl'
});

_freeAgencyHistory["default"].ByLeague = function (league, args) {
  var id_league = league.id_league || args.id_league;
  return _freeAgencyHistory["default"].findAll({
    include: [{
      model: _teamSl["default"],
      include: [{
        model: _division["default"],
        include: [{
          model: _conference["default"],
          where: {
            id_league: id_league
          }
        }]
      }]
    }],
    order: 'event_date DESC',
    limit: args.limit || DEFAULT_LIMIT
  });
}; ////////////// Pick Relationships


_pick["default"].Draft = _pick["default"].belongsTo(_draft["default"], {
  foreignKey: 'id_draft'
});
_pick["default"].Owner = _pick["default"].belongsTo(_teamSl["default"], {
  as: 'owner',
  foreignKey: 'id_owner'
});
_pick["default"].Original = _pick["default"].belongsTo(_teamSl["default"], {
  as: 'original',
  foreignKey: 'id_sl_original'
});
_pick["default"].Trades = _pick["default"].belongsToMany(_trade["default"], {
  through: _pickTrade["default"],
  foreignKey: 'id_pick'
}); ////////////// Draft Relationships

_draft["default"].Season = _draft["default"].belongsTo(_season["default"], {
  foreignKey: 'id_season'
});
_draft["default"].League = _draft["default"].belongsTo(_league["default"], {
  foreignKey: 'id_league'
});
_draft["default"].Picks = _draft["default"].hasMany(_pick["default"], {
  foreignKey: 'id_draft'
});

_draft["default"].AvailablePlayers = function (draft) {
  if (!draft.id_league) return;
  return _connection["default"].query("\n  SELECT p.*, p.primary_position as default_primary, p.secondary_position as default_secondary\n  FROM player p\n  WHERE\n    p.retired = false AND\n    ".concat(draft.draft_type === DRAFT_TYPE.ROOKIES ? 'p.rookie = TRUE AND' : '', "\n      NOT EXISTS (\n        SELECT 1 FROM team_player tp\n        JOIN team_sl t ON t.id_sl = tp.id_sl\n        JOIN division d ON d.id_division = t.id_division\n        JOIN conference c ON c.id_conference = d.id_conference AND c.id_league=").concat(draft.id_league, "\n        WHERE p.id_player=tp.id_player\n      )"), {
    model: _player["default"]
  });
}; ////////////// User Relationships


_user["default"].UserTeams = _user["default"].hasMany(_userTeam["default"], {
  foreignKey: 'id_user'
});
_user["default"].Teams = _user["default"].belongsToMany(_teamSl["default"], {
  through: _userTeam["default"],
  foreignKey: 'id_user'
});
_teamSl["default"].UserTeams = _teamSl["default"].hasMany(_userTeam["default"], {
  foreignKey: 'id_sl'
});
_userTeam["default"].Team = _userTeam["default"].belongsTo(_teamSl["default"], {
  foreignKey: 'id_sl'
});
_userTeam["default"].User = _userTeam["default"].belongsTo(_user["default"], {
  foreignKey: 'id_user'
}); ////////////// Trade Relationships

_trade["default"].Sender = _trade["default"].belongsTo(_teamSl["default"], {
  as: 'sender',
  foreignKey: 'id_sender'
});
_trade["default"].Receiver = _trade["default"].belongsTo(_teamSl["default"], {
  as: 'receiver',
  foreignKey: 'id_receiver'
});
_trade["default"].Players = _trade["default"].belongsToMany(_player["default"], {
  through: _playerTrade["default"],
  foreignKey: 'id_player'
});
_trade["default"].Picks = _trade["default"].belongsToMany(_pick["default"], {
  through: _pickTrade["default"],
  foreignKey: 'id_pick'
});

_trade["default"].History = function (league) {
  return _connection["default"].query("\n    SELECT t.*\n    FROM trade t\n    JOIN team_sl s ON s.id_sl=t.id_sender\n    JOIN division d ON s.id_division=d.id_division\n    JOIN conference c ON d.id_conference=c.id_conference AND c.id_league = ".concat(league.id_league, "\n    WHERE t.status_trade=").concat(_tradeStatus["default"].parseValue('ACCEPTED'), "\n    ORDER BY t.last_change DESC, t.id_trade DESC\n\t \tLIMIT 0,10\n  "), {
    model: _trade["default"]
  });
}; // Note to future self:
//   In order to make queries using through models you need to define relationships (not only belongsToMany)
//   on association model with actual entities.


_playerTrade["default"].belongsTo(_player["default"], {
  foreignKey: 'id_player'
});

_playerTrade["default"].belongsTo(_trade["default"], {
  foreignKey: 'id_trade'
});

_trade["default"].hasMany(_playerTrade["default"], {
  foreignKey: 'id_trade'
});

_player["default"].hasMany(_playerTrade["default"], {
  foreignKey: 'id_player'
});

_trade["default"].TradePlayers = function (trade, isSender) {
  return _player["default"].findAll({
    include: [{
      model: _playerTrade["default"],
      foreignKey: 'id_player',
      where: {
        is_sender: isSender,
        id_trade: trade.id_trade
      }
    }]
  });
};

_trade["default"].SenderPlayers = function (trade) {
  return _trade["default"].TradePlayers(trade, true);
};

_trade["default"].ReceiverPlayers = function (trade) {
  return _trade["default"].TradePlayers(trade, false);
};

_pickTrade["default"].belongsTo(_pick["default"], {
  foreignKey: 'id_pick'
});

_trade["default"].hasMany(_pickTrade["default"], {
  foreignKey: 'id_trade'
});

_pickTrade["default"].belongsTo(_trade["default"], {
  foreignKey: 'id_trade'
});

_pick["default"].hasMany(_pickTrade["default"], {
  foreignKey: 'id_pick'
});

_trade["default"].TradePicks = function (trade, isSender) {
  return _pick["default"].findAll({
    include: [{
      model: _pickTrade["default"],
      foreignKey: 'id_pick',
      where: {
        is_sender: isSender,
        id_trade: trade.id_trade
      }
    }]
  });
};

_trade["default"].SenderPicks = function (trade) {
  return _trade["default"].TradePicks(trade, true);
};

_trade["default"].ReceiverPicks = function (trade) {
  return _trade["default"].TradePicks(trade, false);
}; ////////////// Player Relationships


_player["default"].TeamNba = _player["default"].belongsTo(_teamNba["default"], {
  foreignKey: 'id_nba'
});
_player["default"].TeamSl = _player["default"].belongsToMany(_teamSl["default"], {
  through: _teamPlayer["default"],
  foreignKey: 'id_player'
});
_player["default"].PerformancesRel = _player["default"].hasMany(_playerPerformance["default"], {
  foreignKey: 'id_player'
});

_player["default"].Performances = function (player, args) {
  var round, season;

  if (args.id_season) {
    season = {
      id_season: args.id_season
    };
  }

  if (args.id_round) {
    round = {
      id_round: args.id_round
    };
  }

  return _playerPerformance["default"].findAll({
    include: {
      model: _round["default"],
      where: season
    },
    where: Object.assign({
      id_player: player.id_player
    }, round)
  });
};

_player["default"].Stats = _player["default"].hasMany(_playerStats["default"], {
  foreignKey: 'id_player'
});
_player["default"].Trades = _player["default"].belongsToMany(_trade["default"], {
  through: _playerTrade["default"],
  foreignKey: 'id_player'
});
_player["default"].TeamPlayers = _player["default"].hasMany(_teamPlayer["default"], {
  foreignKey: 'id_player'
});
_teamPlayer["default"].Player = _teamPlayer["default"].belongsTo(_player["default"], {
  foreignKey: 'id_player'
});

_league["default"].FreeAgents = function (league) {
  if (!league.id_league) return;
  return _connection["default"].query("\n    SELECT p.*, p.primary_position as default_primary, p.secondary_position as default_secondary\n    FROM player p\n    WHERE\n       p.retired = false AND\n       NOT EXISTS (\n          SELECT 1 FROM team_player tp\n          JOIN team_sl t ON t.id_sl = tp.id_sl\n          JOIN division d ON d.id_division = t.id_division\n          JOIN conference c ON c.id_conference = d.id_conference AND c.id_league=".concat(league.id_league, "\n          WHERE p.id_player=tp.id_player\n       )"), {
    model: _player["default"]
  });
};

_player["default"].PlayerSearch = function (search, args) {
  var query = args.query;
  return _connection["default"].query("\n    SELECT *\n    FROM player\n    WHERE\n      retired=false AND (\n        LOWER(first_name) LIKE \"%".concat(query, "%\" OR\n        LOWER(last_name) LIKE \"%").concat(query, "%\" OR\n        LOWER( CONCAT( first_name,  ' ', last_name ) ) LIKE \"%").concat(query, "%\"\n      )\n    LIMIT 0,3;\n  "), {
    model: _player["default"]
  });
};

_teamSl["default"].TeamSearch = function (search, args) {
  var id = args.id_league;
  var query = args.query;
  return _connection["default"].query("\n    SELECT t.*\n    FROM team_sl t\n    JOIN division d ON t.id_division = d.id_division\n    JOIN conference c ON d.id_conference=c.id_conference\n    WHERE\n      c.id_league = ".concat(id, " AND\n      (LOWER(t.city) LIKE \"%").concat(query, "%\" OR\n      LOWER(t.nickname) LIKE \"%").concat(query, "%\")\n    LIMIT 0,3;\n  "), {
    model: _teamSl["default"]
  });
};

_player["default"].Team = function (player, args) {
  var where = {
    id_player: player.id_player
  };
  var include;
  if (!args.id_sl && !args.slug && !args.id_league) return;

  if (args.id_sl) {
    where.id_sl = args.id_sl;
  }

  var teamWhere = {};

  if (args.slug) {
    teamWhere.slug = args.slug;
  }

  if (args.id_league) {
    include = [{
      model: _teamSl["default"],
      where: teamWhere,
      foreignKey: 'id_sl',
      include: [{
        model: _division["default"],
        foreignKey: 'id_division',
        include: [{
          model: _conference["default"],
          foreignKey: 'id_conference',
          where: {
            id_league: args.id_league
          }
        }]
      }]
    }];
  }

  return _teamPlayer["default"].findOne({
    where: where,
    include: include
  });
};

_player["default"].NextGames = function (player, args) {
  return _gameNba["default"].findAll({
    where: {
      $or: {
        id_home: player.id_nba,
        id_away: player.id_nba
      },
      game_time: {
        $gte: new Date()
      }
    },
    limit: args.limit
  });
}; ////////////// Team NBA Relationships


_teamNba["default"].Players = _teamNba["default"].hasMany(_player["default"], {
  foreignKey: 'id_nba'
}); ////////////// Taxonomy Relationships

_taxonomy.Taxonomy.Team = _taxonomy.Taxonomy.belongsTo(_teamSl["default"], {
  foreignKey: 'slug'
});
_teamSl["default"].Slugs = _teamSl["default"].hasMany(_taxonomy.Taxonomy, {
  foreignKey: 'slug'
});
_taxonomy.Taxonomy.Player = _taxonomy.Taxonomy.belongsTo(_player["default"], {
  foreignKey: 'slug'
});
_player["default"].Slugs = _taxonomy.Taxonomy.hasMany(_taxonomy.Taxonomy, {
  foreignKey: 'player_slug'
}); ////////////// Player league salary Relationships

_playerLeagueSalary.PlayerLeagueSalary.Player = _playerLeagueSalary.PlayerLeagueSalary.belongsTo(_player["default"], {
  foreignKey: 'id_player'
});
_playerLeagueSalary.PlayerLeagueSalary.League = _playerLeagueSalary.PlayerLeagueSalary.belongsTo(_league["default"], {
  foreignKey: 'id_league'
});
_league["default"].PlayerSalary = _league["default"].hasMany(_playerLeagueSalary.PlayerLeagueSalary, {
  foreignKey: 'id_league'
});
_player["default"].LeagueSalary = _player["default"].hasMany(_playerLeagueSalary.PlayerLeagueSalary, {
  foreignKey: 'id_player'
});

_playerLeagueSalary.PlayerLeagueSalary.TeamPlayerSalary = function (player, args) {
  var idPlayer = player.id_player;
  var idSl = player.team_players[0].id_sl;
  return _connection["default"].query("\n    SELECT ps.*\n    FROM player_league_salary ps\n    JOIN player p ON ps.id_player=p.id_player AND p.id_player=".concat(idPlayer, "\n    JOIN team_sl t ON t.id_sl=").concat(idSl, "\n    AND ps.id_league = t.league_id\n  "), {
    model: _playerLeagueSalary.PlayerLeagueSalary
  });
}; ////////////// Auction Relationships


_auction.Auction.League = _auction.Auction.belongsTo(_league["default"], {
  foreignKey: 'id_league'
});
_league["default"].Auctions = _league["default"].hasMany(_auction.Auction, {
  foreignKey: 'id_league'
});
_auction.Auction.Bids = _auction.Auction.hasMany(_playerBid.PlayerBid, {
  foreignKey: 'id_auction'
});
_playerBid.PlayerBid.Auction = _playerBid.PlayerBid.belongsTo(_auction.Auction, {
  foreignKey: 'id_auction'
});
_playerBid.PlayerBid.Player = _playerBid.PlayerBid.belongsTo(_player["default"], {
  foreignKey: 'id_player',
  as: 'Player'
});
_player["default"].Bids = _player["default"].hasMany(_playerBid.PlayerBid, {
  foreignKey: 'id_player'
});
_playerBid.PlayerBid.Team = _playerBid.PlayerBid.belongsTo(_teamSl["default"], {
  foreignKey: 'id_sl',
  as: 'Team'
});
_playerBidHistory.PlayerBidHistory.Bid = _playerBidHistory.PlayerBidHistory.belongsTo(_playerBid.PlayerBid, {
  foreignKey: 'id_bid',
  as: 'bid'
});
_playerBidHistory.PlayerBidHistory.Team = _playerBidHistory.PlayerBidHistory.belongsTo(_teamSl["default"], {
  foreignKey: 'id_sl',
  as: 'Team'
});
_playerBidHistory.PlayerBidHistory.Player = _playerBidHistory.PlayerBidHistory.belongsTo(_player["default"], {
  foreignKey: 'id_player'
});
_playerBid.PlayerBid.History = _playerBid.PlayerBid.hasMany(_playerBidHistory.PlayerBidHistory, {
  foreignKey: 'id_bid',
  as: 'history'
});