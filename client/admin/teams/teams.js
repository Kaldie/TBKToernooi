import { Meteor } from 'meteor/meteor'
import {Session} from "meteor/session"
import { Template } from 'meteor/templating';
import { Teams } from '../../../api/teams';

import './teams.html'
import './teams.css'

Template.teams.onCreated(function teamOnCreated() {
    Meteor.subscribe('teams');
});

Template.teams.helpers({
    teams() {
        return Teams.find({});
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


const updatePouleVar = function(reactiveVar) {
    Meteor.call('teams.getPoules',(err, res) => {
        if (err) {
            console.warn(err)
        } else {
            Session.set('poules', res)
        }
    })
}

Template.team.onCreated(function() {
    updatePouleVar()
})

Template.team.helpers({
    poules() {
        return Session.get('poules') || []
        }
})

Template.team.events({
    'keydown .poule-form-control'(event) {
        if (event.keyCode === 13) {
            Meteor.call('teams.setPoule', Template.instance().data._id, event.target.value, function(err, res){
                if (err) {
                    console.warn(err)
                } else {
                    updatePouleVar()
                }
            })
        }
    },
    'click .pouleAction'(event) {
        Meteor.call('teams.setPoule', Template.instance().data._id, event.target.textContent, function(err, res){
            if (err) {
                console.warn(err)
            } else {
                updatePouleVar()
            }
        })
    }


})