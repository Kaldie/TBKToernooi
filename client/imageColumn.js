import {Template} from 'meteor/templating';
import {Meteor} from 'meteor/meteor';
import {ReactiveVar} from 'meteor/reactive-var';

import { ImageCollection } from './imageCollection'
//import { Image } from 'api/Image'
import './imageColumn.html'
import './imageColumn.css'


Template.imageColumn.onCreated( function() {
    this.imageId = new ReactiveVar(0);
    Meteor.subscribe("Image", () => {
	this.image = ImageCollection;	
	numberOfSponsors = this.image.find().count()	
	Meteor.setInterval(() => {
	    this.imageId.set(null)
	    this.imageId.set(parseInt(Math.random() * numberOfSponsors));
	}, Meteor.settings.public.sponsorRefreshRate);
	this.imageId.set(0)
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
