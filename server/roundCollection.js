import { Mongo } from 'meteor/mongo'
import { Round } from '/api/Round'

export var RoundsCollection = new Mongo.Collection("Rounds", {
    transform: (doc => new Round(doc))
})

Meteor.publish("Rounds", function() {
    return RoundsCollection.find({})
})
