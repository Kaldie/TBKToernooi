import { Meteor } from 'meteor/meteor'

//Template.round.onCreated( function(

Template.round.Helpers({
    name() {
	if (Template.instance().name) {
	    return Template.instance().name
	}
    },
})
	


