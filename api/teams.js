import { Meteor } from 'meteor/meteor';

import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Teams = new Mongo.Collection('teams');

export const validateTeamPoules = function(teamName1, teamName2) {
    const poules = Teams.find({
        name : {$in:[teamName1, teamName2]}})
        .fetch()
        .map((element) => {return element.pouleName})
        const isValid = poules.every( (val, i, arr) => val === arr[0] )
    if (isValid) {
        return poules[0]
    } else {
        return false
    }
}

if (Meteor.isServer) {
    Meteor.publish('teams', function teamsPublication() {
        return Teams.find({});
    });
}

Meteor.methods({
    'teams.insert'(name) {
        check(name, String);
        Teams.insert({
            name,
            createdAt: new Date()
        });
    },

    'teams.remove'(teamId) {
        Teams.remove({
            _id : teamId
        })
        //TODO remove rounds were this team plays in!
    },

    'teams.addPlayer'(teamId, playername) {
        check(teamId, String);
        check(playername, String);
        const team = Teams.findOne(teamId);
        var playerArray
        if(team.playernames != null) {
            playerArray = team.playernames;
            playerArray.push(playername);
        } else {
            playerArray = [playername];
        }
        Teams.update(teamId, { $set: { playernames: playerArray } });
    },

    'teams.removePlayer'(teamId, playerName) {
        check(teamId, String);
        check(playerName, String);
        const team = Teams.findOne(teamId);
        const newPlayerNames = team.playernames.filter((aPlayerName) => playerName !== aPlayerName)
        Teams.update(teamId, { $set: {playernames: newPlayerNames}})
    },

    'teams.setPoule'(teamId, pouleName){
        check(teamId, String);
        check(pouleName, String);
        const team = Teams.findOne(teamId);
        Teams.update(teamId, { $set: {pouleName: pouleName}})
    },

    'teams.getPoules'() {
        if (Meteor.isClient) {
            import {Session} from "meteor/session"
            return Session.get('poules')
        }
        return Teams.rawCollection().distinct("pouleName", {})
    }
});