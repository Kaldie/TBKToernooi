import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Teams = new Mongo.Collection('teams');

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
    }
});