import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var';

import './landing.html'
import './imageColumn.js'
import './landing.css'

Template.landing.onCreated( function() {
})

Template.landing.helpers({
    counter() {
	return Template.instance.counter.get();
    },
})

Template.landing.events({
    'click button'(event, instance) {
	console.log("here")
    }
})
