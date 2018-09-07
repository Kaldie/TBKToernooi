import { _ } from 'underscore'

export class Round {
    constructor(doc) {
        return _.extend(this, doc)
    }

    getMatches() {
        return  this.matches
    }

    getMatch(aTeamName, aSecondTeamName = undefined) {
        return this.matches
    }  
}
