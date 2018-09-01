import './admin.html'
import './pools.html'
import './rounds.html'
import './scores.html'
import './teams.html'
import './teams.js'

import { Template } from 'meteor/templating';

import { Teams } from '../../imports/api/teams.js';

Template.teams.onCreated(function teamOnCreated() {
    Meteor.subscribe('teams');
});
Template.teams.helpers({
    teams() {
        return Teams.find({});
    },
    players() {

    }
});
Template.teams.events({
    'submit .new-team'(event) {
        // Prevent default browser form submit
        event.preventDefault();
        // Get value from form element
        const target = event.target;
        const name = target.name.value;
        // Insert a task into the collection
        Meteor.call('teams.insert', name);
        // Clear form
        target.name.value = '';
    },
    'submit .new-player'(event) {
        // Prevent default browser form submit
        event.preventDefault();
        // Get value from form element
        const target = event.target;
        const teamId = target.teamId.value;
        const playername = target.playername.value;
        // Insert a task into the collection
        Meteor.call('teams.addPlayer', teamId, playername);
        // Clear form
        target.playername.value = '';
    }
});