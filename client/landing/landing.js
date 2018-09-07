import { Template } from 'meteor/templating';
import { Meteor } from 'meteor/meteor';

import './landing.html'
import '../imageColumn/imageColumn.js'
import './landing.css'


Template.landing.onCreated( function() {
})

Template.landing.helpers({
    counter() {
	return Template.instance.counter.get();
    },
    year() {
        return Meteor.settings.year || 2018
    }
})

Template.landing.events({
    'click button'(event, instance) {
	console.log("here")
    }
})
