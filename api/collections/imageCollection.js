import {Mongo} from 'meteor/mongo'
import {Image} from '/api/Image'

export const ImageCollection = new Mongo.Collection("Image", {
    transform: (doc => new Image(doc))
})

if (Meteor.isServer) {
    Meteor.publish("Image", function() {
        return ImageCollection.find({})
    })
}

