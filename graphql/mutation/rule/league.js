'use strict'

import { GraphQLNonNull, GraphQLInt, GraphQLString, GraphQLInputObjectType, GraphQLList } from 'graphql';
import LeagueType from '../../object-types/league';
import Conn from '../../../database/connection';
import League from '../../../model/league';
import LeagueConfig from '../../../model/associations/league-config';
import ConferenceType from '../../object-types/conference';
import { Division, Conference } from '../../../model/setup';

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
}