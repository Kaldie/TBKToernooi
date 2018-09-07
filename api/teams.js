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
    'teams.addPlayer'(teamId, playername) {
        check(teamId, String);
        check(playername, String);
        const team = Teams.findOne(teamId);
        if(team.playernames != null) {
            var playerArray = team.playernames;
            playerArray.push(playername);
        }
        else var playerArray = [playername];
        Teams.update(teamId, { $set: { playernames: playerArray } });
    },
});