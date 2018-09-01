import {Mongo} from 'meteor/mongo'
import {Rounds} from '/api/RoundCollection'

export var RoundsCollection = new Mongo.Collection("Rounds", {
    transform: (doc => new Rounds(doc))
})

Meteor.publish("Rounds", function() {
    return RoundsCollection.find({})
})
