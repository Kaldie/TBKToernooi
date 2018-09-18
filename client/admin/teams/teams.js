import { Template } from 'meteor/templating';

import { Teams } from '../../../api/teams';

import './teams.html'

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
    },
    'click .remove-player'(event) {
      event.preventDefault();
      Meteor.call('teams.removePlayer', this._id, $(event.target).attr("playername"));
    },
    'click .admin-team-remove-team'(event) {
      event.preventDefault();
      Meteor.call('teams.remove', this._id);
    }
});