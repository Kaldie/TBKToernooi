import {Template} from 'meteor/templating';
import {Meteor} from 'meteor/meteor';
import {ReactiveVar} from 'meteor/reactive-var';

import { imageCollection } from './imageCollection.js'
import './imageColumn.html'


Template.imageColumn.onCreated( function() {
    this.imageId = new ReactiveVar(0);
    Meteor.subscribe("Image", () => {

	this.image = imageCollection;	
	numberOfSponsors = this.image.find().count()

	Meteor.setInterval(() => {
	    console.warn("here!!")
	    this.imageId.set(parseInt(Math.random() * numberOfSponsors));
	    console.warn("image id: ", this.imageId.get())

	}, Meteor.settings.public.sponsorRefreshRate);
    })
})
 
				
Template.imageColumn.helpers({
    sponsorName() {
	const instance = Template.instance()
	instance.imageId.get()
	if (instance.image) {
	    return instance.image.findOne({"number":instance.imageId.get()}).sponsorName
	}
    },
    source() {
	const instance = Template.instance()	
	instance.imageId.get()
	if (instance.image) {
	    console.warn("instance.image.findOne({number:instance.imageId.get()}).source", instance.image.findOne({"number":instance.imageId.get()}).source)
	    const fullSource = instance.image.findOne({"number":instance.imageId.get()}).source
	    return fullSource.split("public")[1]
	}
    }
})
