import {Mongo} from 'meteor/mongo'
import {Image} from '/api/ImageCollection'

export var imageCollection = new Mongo.Collection("Image", {
    transform: (doc => new Image(doc))
})

Meteor.publish("Image", function() {
    if (imageCollection.count()) {
	imageCollection.insert({"kaka":"kaka", "bala": "bala"})
	console.log("here!!")
    }
    return imageCollection.find({})
})
