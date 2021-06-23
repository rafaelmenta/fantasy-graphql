'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PlayerBid = exports.Auction = exports.TeamSeason = exports.Taxonomy = exports.PickTrade = exports.PlayerTrade = exports.PlayerLeagueSalary = exports.TeamPlayer = exports.FreeAgencyHistory = exports.Trade = exports.Pick = exports.Draft = exports.TeamStats = exports.UserTeam = exports.PlayerStats = exports.PlayerTeamPerformance = exports.TeamPerformance = exports.PlayerPerformance = exports.Season = exports.Round = exports.GameNba = exports.Game = exports.League = exports.Conference = exports.Division = exports.TeamNba = exports.Player = exports.TeamSl = exports.User = undefined;

var _user = require('./user');

var _user2 = _interopRequireDefault(_user);

var _teamSl = require('./team-sl');

var _teamSl2 = _interopRequireDefault(_teamSl);

var _player = require('./player');

var _player2 = _interopRequireDefault(_player);

var _teamNba = require('./team-nba');

var _teamNba2 = _interopRequireDefault(_teamNba);

var _division = require('./division');

var _division2 = _interopRequireDefault(_division);

var _conference = require('./conference');

var _conference2 = _interopRequireDefault(_conference);

var _league = require('./league');

var _league2 = _interopRequireDefault(_league);

var _draft = require('./draft');

var _draft2 = _interopRequireDefault(_draft);

var _pick = require('./pick');

var _pick2 = _interopRequireDefault(_pick);

var _game = require('./game');

var _game2 = _interopRequireDefault(_game);

var _gameNba = require('./game-nba');

var _gameNba2 = _interopRequireDefault(_gameNba);

var _round = require('./round');

var _round2 = _interopRequireDefault(_round);

var _season = require('./season');

var _season2 = _interopRequireDefault(_season);

var _playerPerformance = require('./player-performance');

var _playerPerformance2 = _interopRequireDefault(_playerPerformance);

var _teamPerformance = require('./team-performance');

var _teamPerformance2 = _interopRequireDefault(_teamPerformance);

var _playerTeamPerformance = require('./player-team-performance');

var _playerTeamPerformance2 = _interopRequireDefault(_playerTeamPerformance);

var _freeAgencyHistory = require('./free-agency-history');

var _freeAgencyHistory2 = _interopRequireDefault(_freeAgencyHistory);

var _trade = require('./trade');

var _trade2 = _interopRequireDefault(_trade);

var _playerLeagueSalary = require('./player-league-salary');

var _auction = require('./auction');

var _playerBid = require('./player-bid');

var _playerStats = require('./views/player-stats');

var _playerStats2 = _interopRequireDefault(_playerStats);

var _teamStats = require('./views/team-stats');

var _teamStats2 = _interopRequireDefault(_teamStats);

var _userTeam = require('./associations/user-team');

var _userTeam2 = _interopRequireDefault(_userTeam);

var _teamPlayer = require('./associations/team-player');

var _teamPlayer2 = _interopRequireDefault(_teamPlayer);

var _teamSeason = require('./associations/team-season');

var _teamSeason2 = _interopRequireDefault(_teamSeason);

var _playerTrade = require('./associations/player-trade');

var _playerTrade2 = _interopRequireDefault(_playerTrade);

var _pickTrade = require('./associations/pick-trade');

var _pickTrade2 = _interopRequireDefault(_pickTrade);

var _leagueConfig = require('./associations/league-config');

var _leagueConfig2 = _interopRequireDefault(_leagueConfig);

var _taxonomy = require('./associations/taxonomy');

var _connection = require('../database/connection');

var _connection2 = _interopRequireDefault(_connection);

var _tradeStatus = require('../graphql/object-types/enum/trade-status');

var _tradeStatus2 = _interopRequireDefault(_tradeStatus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

var CURRENT_SEASON = 'CURRENT';

// end todo

////////////// Team SL Relationships

_teamSl2.default.Users = _teamSl2.default.belongsToMany(_user2.default, {
  through: _userTeam2.default,
  foreignKey: 'id_sl'
});

_teamSl2.default.Players = _teamSl2.default.belongsToMany(_player2.default, {
  through: _teamPlayer2.default,
  foreignKey: 'id_sl'
});

_teamSl2.default.TeamPlayer = _teamSl2.default.hasMany(_teamPlayer2.default, {
  foreignKey: 'id_sl'
});

_teamPlayer2.default.TeamSl = _teamPlayer2.default.belongsTo(_teamSl2.default, {
  foreignKey: 'id_sl'
});

_teamSl2.default.Division = _teamSl2.default.belongsTo(_division2.default, {
  foreignKey: 'id_division'
});

_teamSl2.default.GetCurrentRecord = function (id) {
  return _teamSeason2.default.findOne({
    include: [{
      model: _season2.default,
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

_teamSl2.default.GetRecord = function (idSl, idSeason) {
  return _teamSeason2.default.findOne({
    where: {
      id_sl: idSl,
      id_season: idSeason
    }
  });
};

_teamSl2.default.Record = function (team, args) {

  if (args.id_season === CURRENT_SEASON) {
    return _teamSl2.default.GetCurrentRecord(team.id_sl);
  }
  return _teamSl2.default.GetRecord(team.id_sl, args.id_season);
};

_teamSl2.default.hasOne(_teamSeason2.default, {
  foreignKey: 'id_sl'
});

_teamSl2.default.GetCurrentStats = function (id) {
  return _teamStats2.default.findOne({
    where: {
      id_sl: id
    },
    include: [{
      model: _season2.default,
      foreignKey: 'id_season',
      where: {
        current: true
      }
    }]
  });
};

_teamSl2.default.GetStats = function (idSl, idSeason) {
  return _teamStats2.default.findOne({
    where: {
      id_sl: idSl,
      id_season: idSeason
    }
  });
};

_teamSl2.default.Stats = function (team, args) {

  if (args.id_season === CURRENT_SEASON) {
    return _teamSl2.default.GetCurrentStats(team.id_sl);
  }
  return _teamSl2.default.GetStats(team.id_sl, args.id_season);
};

_teamSl2.default.hasMany(_teamStats2.default, {
  foreignKey: 'id_sl'
});

_teamSl2.default.Records = _teamSl2.default.hasMany(_teamSeason2.default, {
  foreignKey: 'id_sl'
});

_teamSl2.default.Picks = function (team) {
  return _pick2.default.findAll({
    where: {
      id_owner: team.id_sl,
      is_used: false
    }
  });
};

_teamSl2.default.GetGames = function (_ref) {
  var id = _ref.id,
      type = _ref.type,
      processed = _ref.processed,
      order = _ref.order,
      limit = _ref.limit,
      season = _ref.season;

  var seasonFilter = void 0;

  if (season) {
    seasonFilter = {
      id_season: season
    };
  }

  return _game2.default.findAll({
    where: {
      id_type: type,
      $or: [{ home_team: id }, { away_team: id }]
    },
    include: {
      model: _round2.default,
      where: Object.assign({}, seasonFilter, {
        processed: processed
      })
    },
    order: [['id_round', order]],
    limit: limit
  });
};

_teamSl2.default.AllGames = function (team, args) {
  return _teamSl2.default.GetGames({
    id: team.id_sl,
    processed: [true, false],
    type: GAME_TYPE.LEAGUE,
    season: args.id_season,
    order: 'ASC'
  });
};

_teamSl2.default.PlayoffsGames = function (team, args) {
  return _teamSl2.default.GetGames({
    id: team.id_sl,
    processed: [true, false],
    type: GAME_TYPE.PLAYOFF,
    season: args.id_season,
    order: 'ASC'
  });
};

_teamSl2.default.RecentGames = function (team) {
  return _teamSl2.default.GetGames({
    id: team.id_sl,
    type: GAME_TYPE.LEAGUE,
    processed: true,
    order: 'DESC',
    limit: LIMIT_GAMES
  });
};

_teamSl2.default.NextGames = function (team) {
  return _teamSl2.default.GetGames({
    id: team.id_sl,
    type: GAME_TYPE.LEAGUE,
    processed: false,
    order: 'ASC',
    limit: LIMIT_GAMES
  });
};

_teamSl2.default.SentTrades = _teamSl2.default.hasMany(_trade2.default, {
  as: 'sent_trades',
  foreignKey: 'id_sender'
});

_teamSl2.default.ReceivedTrades = _teamSl2.default.hasMany(_trade2.default, {
  as: 'received_trades',
  foreignKey: 'id_receiver'
});

////////////// Game NBA Relationships

_gameNba2.default.HomeTeam = _gameNba2.default.belongsTo(_teamNba2.default, {
  as: 'home',
  foreignKey: 'id_home'
});

_gameNba2.default.AwayTeam = _gameNba2.default.belongsTo(_teamNba2.default, {
  as: 'away',
  foreignKey: 'id_away'
});

_gameNba2.default.HomeRound = _gameNba2.default.belongsTo(_round2.default, {
  as: 'home_round',
  foreignKey: 'id_round_home'
});

_gameNba2.default.AwayRound = _gameNba2.default.belongsTo(_round2.default, {
  as: 'away_round',
  foreignKey: 'id_round_away'
});

_gameNba2.default.DateGames = function (root, args) {
  return _gameNba2.default.findAll({
    attributes: {
      include: [[_gameNba2.default.sequelize.fn('DATE', _gameNba2.default.sequelize.col('game_time')), 'game_date']]
    }, having: {
      'game_date': args.date
    }
  });
};

_gameNba2.default.RangedDateGames = function (root, args) {
  return _gameNba2.default.findAll({
    attributes: {
      include: [[_gameNba2.default.sequelize.fn('DATE', _gameNba2.default.sequelize.col('game_time')), 'game_date']]
    }, having: {
      'game_date': {
        $gte: args.start_date,
        $lte: args.end_date
      }
    }
  });
};

////////////// Game Relationships

_game2.default.HomeTeam = _game2.default.belongsTo(_teamSl2.default, {
  as: 'home',
  foreignKey: 'home_team'
});

_game2.default.AwayTeam = _game2.default.belongsTo(_teamSl2.default, {
  as: 'away',
  foreignKey: 'away_team'
});

_game2.default.Round = _game2.default.belongsTo(_round2.default, {
  foreignKey: 'id_round'
});

_game2.default.GetPerformance = function (idSl, idRound) {
  return _teamPerformance2.default.findOne({
    where: {
      id_sl: idSl,
      id_round: idRound
    }
  });
};

_game2.default.HomePerformance = function (game, args) {
  return _game2.default.GetPerformance(game.home_team, game.id_round);
};

_game2.default.AwayPerformance = function (game, args) {
  return _game2.default.GetPerformance(game.away_team, game.id_round);
};

_game2.default.GetPlayersPerformance = function (_ref2) {
  var idRound = _ref2.idRound,
      idSl = _ref2.idSl;

  return _playerTeamPerformance2.default.findAll({
    where: {
      id_round: idRound,
      id_sl: idSl
    }
  });
};

_game2.default.HomePlayers = function (game) {
  return _game2.default.GetPlayersPerformance({
    idRound: game.id_round,
    idSl: game.home_team
  });
};

_game2.default.AwayPlayers = function (game) {
  return _game2.default.GetPlayersPerformance({
    idRound: game.id_round,
    idSl: game.away_team
  });
};

////////////// Round Relationships

_round2.default.Games = _round2.default.hasMany(_game2.default, {
  foreignKey: 'id_round'
});

_round2.default.Season = _round2.default.belongsTo(_season2.default, {
  foreignKey: 'id_season'
});

////////////// Season Relationships

_season2.default.Rounds = _season2.default.hasMany(_round2.default, {
  foreignKey: 'id_season'
});

_season2.default.TeamSeason = _season2.default.hasMany(_teamSeason2.default, {
  foreignKey: 'id_season'
});

_teamSeason2.default.Season = _teamSeason2.default.belongsTo(_season2.default, {
  foreignKey: 'id_season'
});

_season2.default.Current = function () {
  return _season2.default.findOne({
    where: {
      current: true
    }
  });
};

////////////// Team Stats Relationships

_teamStats2.default.TeamSl = _teamStats2.default.belongsTo(_teamSl2.default, {
  foreignKey: 'id_sl'
});

_teamStats2.default.Season = _teamStats2.default.belongsTo(_season2.default, {
  foreignKey: 'id_season'
});

////////////// Player Stats Relationships

_playerStats2.default.GamesPlayed = function (playerStat) {
  return _playerPerformance2.default.count({
    include: [{
      model: _round2.default,
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

_playerStats2.default.Player = _playerStats2.default.belongsTo(_player2.default, {
  foreignKey: 'id_player'
});

_playerStats2.default.Season = _playerStats2.default.belongsTo(_season2.default, {
  foreignKey: 'id_season'
});

////////////// Player Performance Relationships

_playerPerformance2.default.Player = _playerPerformance2.default.belongsTo(_player2.default, {
  foreignKey: 'id_player'
});

_playerPerformance2.default.Round = _playerPerformance2.default.belongsTo(_round2.default, {
  foreignKey: 'id_round'
});

_playerPerformance2.default.RoundAverages = function (obj, args) {
  return _playerPerformance2.default.findAll({
    attributes: ['id_round', [_playerPerformance2.default.sequelize.fn('AVG', _playerPerformance2.default.sequelize.col('fantasy_points')), 'fantasy_points'], [_playerPerformance2.default.sequelize.fn('MAX', _playerPerformance2.default.sequelize.col('fantasy_points')), 'max_fantasy_points']],
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
      model: _round2.default,
      foreignKey: 'id_round',
      include: {
        model: _season2.default,
        foreignKey: 'id_season',
        where: {
          id_season: args.id_season
        }
      }
    }
  });
};

////////////// Team Performance Relationships

_teamPerformance2.default.Team = _teamPerformance2.default.belongsTo(_teamSl2.default, {
  foreignKey: 'id_sl'
});

_teamPerformance2.default.Round = _teamPerformance2.default.belongsTo(_round2.default, {
  foreignKey: 'id_round'
});

////////////// Player Team Performance Relationships

_playerTeamPerformance2.default.Player = _playerTeamPerformance2.default.belongsTo(_player2.default, {
  foreignKey: 'id_player'
});

_playerTeamPerformance2.default.TeamSl = _playerTeamPerformance2.default.belongsTo(_teamSl2.default, {
  foreignKey: 'id_sl'
});

_playerTeamPerformance2.default.Round = _playerTeamPerformance2.default.belongsTo(_round2.default, {
  foreignKey: 'id_round'
});

_player2.default.TeamPerformances = _player2.default.hasMany(_playerTeamPerformance2.default, {
  foreignKey: 'id_player'
});

_teamSl2.default.PlayerPerformances = _teamSl2.default.hasMany(_playerTeamPerformance2.default, {
  foreignKey: 'id_sl'
});

_round2.default.Performances = _teamSl2.default.hasMany(_playerTeamPerformance2.default, {
  foreignKey: 'id_round'
});

_playerTeamPerformance2.default.PlayerPerformance = function (playerTeam) {
  return _playerPerformance2.default.findOne({
    where: {
      id_player: playerTeam.id_player,
      id_round: playerTeam.id_round
    }
  });
};

////////////// Division Relationships

_division2.default.Teams = _division2.default.hasMany(_teamSl2.default, {
  foreignKey: 'id_division'
});

_division2.default.Conference = _division2.default.belongsTo(_conference2.default, {
  foreignKey: 'id_conference'
});

////////////// Conference Relationships

_conference2.default.League = _conference2.default.belongsTo(_league2.default, {
  foreignKey: 'id_league'
});

_conference2.default.Divisions = _conference2.default.hasMany(_division2.default, {
  foreignKey: 'id_conference'
});

_conference2.default.Teams = function (conference) {
  return _teamSl2.default.findAll({
    include: [{
      model: _division2.default,
      where: {
        'id_conference': conference.id_conference
      }
    }]
  });
};

////////////// League Relationships

_league2.default.Conferences = _league2.default.hasMany(_conference2.default, {
  foreignKey: 'id_league'
});

_league2.default.Teams = function (league) {
  return _teamSl2.default.findAll({
    include: [{
      model: _division2.default,
      include: [{
        model: _conference2.default,
        where: {
          id_league: league.id_league
        }
      }]
    }]
  });
};

_league2.default.Owner = _league2.default.belongsTo(_user2.default, {
  foreignKey: 'id_owner'
});

_league2.default.Configs = _league2.default.hasMany(_leagueConfig2.default, {
  foreignKey: 'id_league'
});

_league2.default.MostRecentDraft = function (league) {
  return _draft2.default.findOne({
    include: [{
      model: _season2.default,
      where: {
        current: true
      }
    }],
    where: {
      id_league: league.id_league
    }
  });
};

////////////// Free Agency History Relationships

_freeAgencyHistory2.default.Player = _freeAgencyHistory2.default.belongsTo(_player2.default, {
  foreignKey: 'id_player'
});

_freeAgencyHistory2.default.TeamSl = _freeAgencyHistory2.default.belongsTo(_teamSl2.default, {
  foreignKey: 'id_sl'
});

_freeAgencyHistory2.default.ByLeague = function (league, args) {
  var id_league = league.id_league || args.id_league;
  return _freeAgencyHistory2.default.findAll({
    include: [{
      model: _teamSl2.default,
      include: [{
        model: _division2.default,
        include: [{
          model: _conference2.default,
          where: {
            id_league: id_league
          }
        }]
      }]
    }],
    order: 'event_date DESC',
    limit: args.limit || DEFAULT_LIMIT
  });
};

////////////// Pick Relationships

_pick2.default.Draft = _pick2.default.belongsTo(_draft2.default, {
  foreignKey: 'id_draft'
});

_pick2.default.Owner = _pick2.default.belongsTo(_teamSl2.default, {
  as: 'owner',
  foreignKey: 'id_owner'
});

_pick2.default.Original = _pick2.default.belongsTo(_teamSl2.default, {
  as: 'original',
  foreignKey: 'id_sl_original'
});

_pick2.default.Trades = _pick2.default.belongsToMany(_trade2.default, {
  through: _pickTrade2.default,
  foreignKey: 'id_pick'
});

////////////// Draft Relationships

_draft2.default.Season = _draft2.default.belongsTo(_season2.default, {
  foreignKey: 'id_season'
});

_draft2.default.League = _draft2.default.belongsTo(_league2.default, {
  foreignKey: 'id_league'
});

_draft2.default.Picks = _draft2.default.hasMany(_pick2.default, {
  foreignKey: 'id_draft'
});

_draft2.default.AvailablePlayers = function (draft) {
  if (!draft.id_league) return;

  return _connection2.default.query('\n  SELECT p.*, p.primary_position as default_primary, p.secondary_position as default_secondary\n  FROM player p\n  WHERE\n    p.retired = false AND\n    ' + (draft.draft_type === DRAFT_TYPE.ROOKIES ? 'p.rookie = TRUE AND' : '') + '\n      NOT EXISTS (\n        SELECT 1 FROM team_player tp\n        JOIN team_sl t ON t.id_sl = tp.id_sl\n        JOIN division d ON d.id_division = t.id_division\n        JOIN conference c ON c.id_conference = d.id_conference AND c.id_league=' + draft.id_league + '\n        WHERE p.id_player=tp.id_player\n      )', { model: _player2.default });
};

////////////// User Relationships

_user2.default.UserTeams = _user2.default.hasMany(_userTeam2.default, {
  foreignKey: 'id_user'
});

_user2.default.Teams = _user2.default.belongsToMany(_teamSl2.default, {
  through: _userTeam2.default,
  foreignKey: 'id_user'
});

_teamSl2.default.UserTeams = _teamSl2.default.hasMany(_userTeam2.default, {
  foreignKey: 'id_sl'
});

_userTeam2.default.Team = _userTeam2.default.belongsTo(_teamSl2.default, {
  foreignKey: 'id_sl'
});

_userTeam2.default.User = _userTeam2.default.belongsTo(_user2.default, {
  foreignKey: 'id_user'
});

////////////// Trade Relationships

_trade2.default.Sender = _trade2.default.belongsTo(_teamSl2.default, {
  as: 'sender',
  foreignKey: 'id_sender'
});

_trade2.default.Receiver = _trade2.default.belongsTo(_teamSl2.default, {
  as: 'receiver',
  foreignKey: 'id_receiver'
});

_trade2.default.Players = _trade2.default.belongsToMany(_player2.default, {
  through: _playerTrade2.default,
  foreignKey: 'id_player'
});

_trade2.default.Picks = _trade2.default.belongsToMany(_pick2.default, {
  through: _pickTrade2.default,
  foreignKey: 'id_pick'
});

_trade2.default.History = function (league) {

  return _connection2.default.query('\n    SELECT t.*\n    FROM trade t\n    JOIN team_sl s ON s.id_sl=t.id_sender\n    JOIN division d ON s.id_division=d.id_division\n    JOIN conference c ON d.id_conference=c.id_conference AND c.id_league = ' + league.id_league + '\n    WHERE t.status_trade=' + _tradeStatus2.default.parseValue('ACCEPTED') + '\n    ORDER BY t.last_change DESC, t.id_trade DESC\n\t \tLIMIT 0,10\n  ', { model: _trade2.default });
};

// Note to future self:
//   In order to make queries using through models you need to define relationships (not only belongsToMany)
//   on association model with actual entities.

_playerTrade2.default.belongsTo(_player2.default, {
  foreignKey: 'id_player'
});

_playerTrade2.default.belongsTo(_trade2.default, {
  foreignKey: 'id_trade'
});

_trade2.default.hasMany(_playerTrade2.default, {
  foreignKey: 'id_trade'
});

_player2.default.hasMany(_playerTrade2.default, {
  foreignKey: 'id_player'
});

_trade2.default.TradePlayers = function (trade, isSender) {
  return _player2.default.findAll({
    include: [{
      model: _playerTrade2.default,
      foreignKey: 'id_player',
      where: {
        is_sender: isSender,
        id_trade: trade.id_trade
      }
    }]
  });
};

_trade2.default.SenderPlayers = function (trade) {
  return _trade2.default.TradePlayers(trade, true);
};

_trade2.default.ReceiverPlayers = function (trade) {
  return _trade2.default.TradePlayers(trade, false);
};

_pickTrade2.default.belongsTo(_pick2.default, {
  foreignKey: 'id_pick'
});

_trade2.default.hasMany(_pickTrade2.default, {
  foreignKey: 'id_trade'
});

_pickTrade2.default.belongsTo(_trade2.default, {
  foreignKey: 'id_trade'
});

_pick2.default.hasMany(_pickTrade2.default, {
  foreignKey: 'id_pick'
});

_trade2.default.TradePicks = function (trade, isSender) {
  return _pick2.default.findAll({
    include: [{
      model: _pickTrade2.default,
      foreignKey: 'id_pick',
      where: {
        is_sender: isSender,
        id_trade: trade.id_trade
      }
    }]
  });
};

_trade2.default.SenderPicks = function (trade) {
  return _trade2.default.TradePicks(trade, true);
};

_trade2.default.ReceiverPicks = function (trade) {
  return _trade2.default.TradePicks(trade, false);
};

////////////// Player Relationships

_player2.default.TeamNba = _player2.default.belongsTo(_teamNba2.default, {
  foreignKey: 'id_nba'
});

_player2.default.TeamSl = _player2.default.belongsToMany(_teamSl2.default, {
  through: _teamPlayer2.default,
  foreignKey: 'id_player'
});

_player2.default.PerformancesRel = _player2.default.hasMany(_playerPerformance2.default, {
  foreignKey: 'id_player'
});

_player2.default.Performances = function (player, args) {

  var round = void 0,
      season = void 0;

  if (args.id_season) {
    season = { id_season: args.id_season };
  }

  if (args.id_round) {
    round = { id_round: args.id_round };
  }

  return _playerPerformance2.default.findAll({
    include: {
      model: _round2.default,
      where: season
    },
    where: Object.assign({ id_player: player.id_player }, round)
  });
};

_player2.default.Stats = _player2.default.hasMany(_playerStats2.default, {
  foreignKey: 'id_player'
});

_player2.default.Trades = _player2.default.belongsToMany(_trade2.default, {
  through: _playerTrade2.default,
  foreignKey: 'id_player'
});

_player2.default.TeamPlayers = _player2.default.hasMany(_teamPlayer2.default, {
  foreignKey: 'id_player'
});

_teamPlayer2.default.Player = _teamPlayer2.default.belongsTo(_player2.default, {
  foreignKey: 'id_player'
});

_league2.default.FreeAgents = function (league) {
  if (!league.id_league) return;

  return _connection2.default.query('\n    SELECT p.*, p.primary_position as default_primary, p.secondary_position as default_secondary\n    FROM player p\n    WHERE\n       p.retired = false AND\n       NOT EXISTS (\n          SELECT 1 FROM team_player tp\n          JOIN team_sl t ON t.id_sl = tp.id_sl\n          JOIN division d ON d.id_division = t.id_division\n          JOIN conference c ON c.id_conference = d.id_conference AND c.id_league=' + league.id_league + '\n          WHERE p.id_player=tp.id_player\n       )', { model: _player2.default });
};

_player2.default.PlayerSearch = function (search, args) {
  var query = args.query;

  return _connection2.default.query('\n    SELECT *\n    FROM player\n    WHERE\n      retired=false AND (\n        LOWER(first_name) LIKE "%' + query + '%" OR\n        LOWER(last_name) LIKE "%' + query + '%" OR\n        LOWER( CONCAT( first_name,  \' \', last_name ) ) LIKE "%' + query + '%"\n      )\n    LIMIT 0,3;\n  ', { model: _player2.default });
};

_teamSl2.default.TeamSearch = function (search, args) {
  var id = args.id_league;
  var query = args.query;

  return _connection2.default.query('\n    SELECT t.*\n    FROM team_sl t\n    JOIN division d ON t.id_division = d.id_division\n    JOIN conference c ON d.id_conference=c.id_conference\n    WHERE\n      c.id_league = ' + id + ' AND\n      (LOWER(t.city) LIKE "%' + query + '%" OR\n      LOWER(t.nickname) LIKE "%' + query + '%")\n    LIMIT 0,3;\n  ', { model: _teamSl2.default });
};

_player2.default.Team = function (player, args) {
  var where = {
    id_player: player.id_player
  };
  var include = void 0;

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
      model: _teamSl2.default,
      where: teamWhere,
      foreignKey: 'id_sl',
      include: [{
        model: _division2.default,
        foreignKey: 'id_division',
        include: [{
          model: _conference2.default,
          foreignKey: 'id_conference',
          where: {
            id_league: args.id_league
          }
        }]
      }]
    }];
  }

  return _teamPlayer2.default.findOne({
    where: where,
    include: include
  });
};

_player2.default.NextGames = function (player, args) {
  return _gameNba2.default.findAll({
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
};

////////////// Team NBA Relationships

_teamNba2.default.Players = _teamNba2.default.hasMany(_player2.default, {
  foreignKey: 'id_nba'
});

////////////// Taxonomy Relationships

_taxonomy.Taxonomy.Team = _taxonomy.Taxonomy.belongsTo(_teamSl2.default, {
  foreignKey: 'slug'
});

_teamSl2.default.Slugs = _teamSl2.default.hasMany(_taxonomy.Taxonomy, {
  foreignKey: 'slug'
});

_taxonomy.Taxonomy.Player = _taxonomy.Taxonomy.belongsTo(_player2.default, {
  foreignKey: 'slug'
});

_player2.default.Slugs = _taxonomy.Taxonomy.hasMany(_taxonomy.Taxonomy, {
  foreignKey: 'player_slug'
});

////////////// Player league salary Relationships

_playerLeagueSalary.PlayerLeagueSalary.Player = _playerLeagueSalary.PlayerLeagueSalary.belongsTo(_player2.default, {
  foreignKey: 'id_player'
});

_playerLeagueSalary.PlayerLeagueSalary.League = _playerLeagueSalary.PlayerLeagueSalary.belongsTo(_league2.default, {
  foreignKey: 'id_league'
});

_league2.default.PlayerSalary = _league2.default.hasMany(_playerLeagueSalary.PlayerLeagueSalary, {
  foreignKey: 'id_league'
});

_player2.default.LeagueSalary = _player2.default.hasMany(_playerLeagueSalary.PlayerLeagueSalary, {
  foreignKey: 'id_player'
});

_playerLeagueSalary.PlayerLeagueSalary.TeamPlayerSalary = function (player, args) {
  var idPlayer = player.id_player;
  var idSl = player.team_players[0].id_sl;
  return _connection2.default.query('\n    SELECT ps.*\n    FROM player_league_salary ps\n    JOIN player p ON ps.id_player=p.id_player AND p.id_player=' + idPlayer + '\n    JOIN team_sl t ON t.id_sl=' + idSl + '\n    AND ps.id_league = t.league_id\n  ', { model: _playerLeagueSalary.PlayerLeagueSalary });
};

////////////// Auction Relationships

_auction.Auction.League = _auction.Auction.belongsTo(_league2.default, {
  foreignKey: 'id_league'
});

_league2.default.Auctions = _league2.default.hasMany(_auction.Auction, {
  foreignKey: 'id_league'
});

_auction.Auction.Bids = _auction.Auction.hasMany(_playerBid.PlayerBid, {
  foreignKey: 'id_auction'
});

_playerBid.PlayerBid.Auction = _playerBid.PlayerBid.belongsTo(_auction.Auction, {
  foreignKey: 'id_auction'
});

_playerBid.PlayerBid.Player = _playerBid.PlayerBid.belongsTo(_player2.default, {
  foreignKey: 'id_player'
});

_playerBid.PlayerBid.Team = _playerBid.PlayerBid.belongsTo(_teamSl2.default, {
  foreignKey: 'id_sl'
});

exports.User = _user2.default;
exports.TeamSl = _teamSl2.default;
exports.Player = _player2.default;
exports.TeamNba = _teamNba2.default;
exports.Division = _division2.default;
exports.Conference = _conference2.default;
exports.League = _league2.default;
exports.Game = _game2.default;
exports.GameNba = _gameNba2.default;
exports.Round = _round2.default;
exports.Season = _season2.default;
exports.PlayerPerformance = _playerPerformance2.default;
exports.TeamPerformance = _teamPerformance2.default;
exports.PlayerTeamPerformance = _playerTeamPerformance2.default;
exports.PlayerStats = _playerStats2.default;
exports.UserTeam = _userTeam2.default;
exports.TeamStats = _teamStats2.default;
exports.Draft = _draft2.default;
exports.Pick = _pick2.default;
exports.Trade = _trade2.default;
exports.FreeAgencyHistory = _freeAgencyHistory2.default;
exports.TeamPlayer = _teamPlayer2.default;
exports.PlayerLeagueSalary = _playerLeagueSalary.PlayerLeagueSalary;
exports.PlayerTrade = _playerTrade2.default;
exports.PickTrade = _pickTrade2.default;
exports.Taxonomy = _taxonomy.Taxonomy;
exports.TeamSeason = _teamSeason2.default;
exports.Auction = _auction.Auction;
exports.PlayerBid = _playerBid.PlayerBid;