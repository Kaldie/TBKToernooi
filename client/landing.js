import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var';

import './landing.html'
import './imageColumn.js'
import './landing.css'
import { Meteor } from 'meteor/meteor';

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
