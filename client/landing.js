import {Template} from 'meteor/templating';
import {ReactiveVar} from 'meteor/reactive-var';

import './landing.html'
import './landing.css'

Template.landing.oncreate( function() {
    this.counter = new ReactiveVar(0);
})

Template.landing.helpers({
    counter() {
	return Template.instance.counter.get();
    },
})

Template.landing.events({
    'click button'(event, instance) {
	instance.counter.set(instance.counter.get() + 1)
    }
})
