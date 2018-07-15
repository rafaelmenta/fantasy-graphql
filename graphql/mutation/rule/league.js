'use strict'

import { GraphQLNonNull, GraphQLInt, GraphQLString, GraphQLInputObjectType, GraphQLList } from 'graphql';
import LeagueType from '../../object-types/league';
import Conn from '../../../database/connection';
import League from '../../../model/league';
import LeagueConfig from '../../../model/associations/league-config';
import ConferenceType from '../../object-types/conference';
import { Division, Conference } from '../../../model/setup';
import LeagueConfigType from '../../object-types/league-config';

const leagueInfoInput = new GraphQLInputObjectType({
  name: 'LeagueInfoInput',
  fields: () => ({
    id_league: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    symbol: { type: new GraphQLNonNull(GraphQLString) },
    number_of_teams: { type: new GraphQLNonNull(GraphQLInt) },
  }),
});

const divisionInfoInput = new GraphQLInputObjectType({
  name: 'DivisionInfoInput',
  fields: () => ({
    id_division: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    symbol: { type: new GraphQLNonNull(GraphQLString) },
  }),
});

const conferenceInfoInput = new GraphQLInputObjectType({
  name: 'ConferenceInfoInput',
  fields: () => ({
    id_conference: { type: new GraphQLNonNull(GraphQLInt) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    symbol: { type: new GraphQLNonNull(GraphQLString) },
    divisions: { type: new GraphQLNonNull(new GraphQLList(divisionInfoInput))},
  }),
});

const configInput = new GraphQLInputObjectType({
  name: 'ConfigInput',
  fields: () => ({
    id_config: { type: GraphQLString },
    config_value: { type: GraphQLString },
  }),
});

export const LeagueMutation = {
  saveLeague: {
    description: 'Save league information',
    type: new GraphQLList(GraphQLInt),
    args: {
      league: {type: leagueInfoInput},
    },
    resolve: (root, {league}) => League.update({
        name: league.name,
        symbol: league.symbol,
        number_of_teams: league.number_of_teams,
      },{
        where: {id_league: league.id_league},
    }),
  },
  saveConference: {
    description: 'Save conference information',
    type: new GraphQLList(GraphQLInt),
    args: {
      conference: {type: conferenceInfoInput},
    },
    resolve: (root, {conference}) => Conn.transaction(t => {
      const divisionUpdates = conference.divisions.map(division => Division.update({
        name: division.name,
        symbol: division.symbol,
      }, {
        where: {id_division: division.id_division},
        transaction: t,
      }));

      const conferenceUpdate = Conference.update({
        name: conference.name,
        symbol: conference.symbol,
      }, {
        where: {id_conference: conference.id_conference},
        transaction: t,
      });

      return Promise.all([conferenceUpdate, ...divisionUpdates]).then(results => results[0]);
    }),
  },
  saveConfigs: {
    description: 'Save league conferences',
    type: new GraphQLList(new GraphQLList(GraphQLInt)),
    args: {
      id_league: {type: GraphQLInt},
      configs: {type: new GraphQLList(configInput)}
    },
    resolve: (root, {id_league, configs}) => {
      const configUpdates = configs.map(config => LeagueConfig.update(
        {config_value: config.config_value},
        {where: {id_config: config.id_config, id_league}},
      ));

      return Promise.all(configUpdates);
    }
  },
}