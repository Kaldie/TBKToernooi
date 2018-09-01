import {Template} from 'meteor/templating';
import {Meteor} from 'meteor/meteor';
import {ReactiveVar} from 'meteor/reactive-var';

import { imageCollection } from './imageCollection'
//import { Image } from 'api/Image'
import './imageColumn.html'
import './imageColumn.css'


Template.imageColumn.onCreated( function() {
    this.imageId = new ReactiveVar(0);
    Meteor.subscribe("Image", () => {
	this.image = imageCollection;	
	numberOfSponsors = this.image.find().count()	
	this.imageId.set(0)
	Meteor.setInterval(() => {
	    this.imageId.set(null)
	    this.imageId.set(parseInt(Math.random() * numberOfSponsors));
	}, Meteor.settings.public.sponsorRefreshRate);
    })
})
 

Template.imageColumn.helpers({
    sponsorName() {
	const instance = Template.instance()
	if (instance.imageId.get() === null)
	    return
	
	if (instance.image) {
	    const requestedImage = instance.image.findOne({"number":instance.imageId.get()})
	    return requestedImage.sponsorName || "unknown"
	}
    },
    source() {
	const instance = Template.instance()
	if (instance.imageId.get() === null)
	    return

	if (instance.image) {
	    const requestedImage = instance.image.findOne({"number":instance.imageId.get()})
	    const fullSource = requestedImage.source
	    return fullSource.split("public")[1]
	}
    }
})
