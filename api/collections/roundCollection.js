import { Mongo } from 'meteor/mongo'
import { Round } from '/api/Round'

export const  RoundsCollection = new Mongo.Collection("Rounds", {
    transform: (doc => new Round(doc))
})

if (Meteor.isServer) {
    Meteor.publish("Rounds", function () {
        return RoundsCollection.find({})
    })
}