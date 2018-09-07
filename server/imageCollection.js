import {Mongo} from 'meteor/mongo'
import {Image} from '/api/ImageCollection'

export var ImageCollection = new Mongo.Collection("Image", {
    transform: (doc => new Image(doc))
})

Meteor.publish("Image", function() {
    return ImageCollection.find({})
})

