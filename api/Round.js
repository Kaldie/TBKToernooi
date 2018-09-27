import { _ } from 'underscore'
import { RoundsCollection } from './collections/roundCollection'
import { validateTeamPoules } from './teams'
import { Match } from './Match'
import { Meteor } from 'meteor/meteor';


export class Round {
    constructor(doc) {
        _.extend(this, doc)

        if (this.matches) {
            this.matches = this.matches.map((element) => new Match(element))
        }
        return this
    }

    delete() {
        RoundsCollection.remove({"_id" : this._id})
    }

    getMatches() {
        return this.matches || []
    }

    getMatch(aTeamName, aSecondTeamName = undefined) {
        return this.matches.reduce((previousResult, aMatch) => {
            if ((aMatch.team1 === aTeamName ||  aMatch.team2 === aTeamName) && 
               (!aSecondTeamName || aMatch.team1 === aSecondTeamName ||  aMatch.team2 === aSecondTeamName )) {
                previousResult.push(aMatch)
            }
            return previousResult
        },[])
    }

    roundNumber() {
        return this.roundNumber || 0
    }

    addMatch(match) {
        if (!match.poule) {
            if (Meteor.isClient) {
                Meteor.subscribe("team", () => {
                    match.poule = validateTeamPoules(match.team1, match.team2) || "unknown"
                })
            } else {

            }
            match.poule = validateTeamPoules(match.team1, match.team2) || "unknown"
        }

        
        RoundsCollection.update({
            _id: this._id
        }, {
            $push: {matches: match}
        })
    }

    updateMatch(match) {
        //todo implement a proper check/defense for this function
        RoundsCollection.update({
            _id: this._id
        }, {
            $pull: {matches : {id : match.id}}
        })

        RoundsCollection.update({
            _id: this._id
        }, {
            $push: {matches: match}
        })
    }

    isOnGoing() {
        const matchesWithResult = this.matches.filter((element) => {return element.hasResult()})
        if (matchesWithResult.length === 0 || matchesWithResult.length === this.matches.length) {
            return false
        }
        return true
    }

    isFinished() {
        const matchesWithResult = this.matches.filter((element) => {return element.hasResult()})
        if (matchesWithResult.length === this.matches.length) {
            return true
        }
        return false
    }

    willStart() {
        const roundNumber = this.roundNumber
        // if it is ongoing or finish it will not start
        if (this.isOnGoing() || this.isFinished()) {
            return false
        }
        // if the round number is 1 then it has to start
        if (roundNumber === 1) {
             return true
        }
        const rounds = RoundsCollection.find({
            roundNumber : {
                $gt: roundNumber - 2, $lt: roundNumber + 2, $ne: roundNumber}},
                {sort: { roundNumber:1 }}).fetch()      

        if (rounds.length === 0) {
            return true
        }

        if (rounds.length <= 1 && rounds[0].isFinished()) {
            return true
        }

        if (rounds[0].isFinished()) {
            return true
        }
        return false
    }
}