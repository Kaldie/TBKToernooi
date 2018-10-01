import { Mongo } from 'meteor/mongo'
import { Round } from '/api/Round'

export const  RoundsCollection = new Mongo.Collection("Rounds", {
    transform: (doc => new Round(doc))
})

RoundsCollection.allow({
    remove: function (userId, doc) {
        return true;
     },
     insert: function (userId, doc) {
        return true;
     },
     update: function (userId, doc) {
        return true;
     }
 }
)

RoundsCollection.addRound = function(roundNumber=undefined) {
    const roundNumbers = RoundsCollection.find({}, { "fields" : { "roundNumber" :1 }, "sort": {"roundNumber": 1}}).fetch().map((
        element) => { return element.roundNumber})
    console.warn(roundNumbers)
    if (!roundNumber) {
        roundNumber = roundNumbers.reduce((prev, current) => {
            console.warn("prev, current",prev, current)
            // check if there is a following round
            if (prev === (current -1)) {
                // if so return current and do the check again
                return current
            }
            // else return prev and we are kind of done
            return prev
        }, 0)
    }
    // we need to make a round 1 higher then the one who broke the chain
    roundNumber += 1
    RoundsCollection.insert({
        roundNumber : roundNumber})
}

if (Meteor.isServer) {
    Meteor.publish("Rounds", function () {
        return RoundsCollection.find({})
    })
}