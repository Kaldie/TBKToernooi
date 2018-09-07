import { _ } from 'underscore'


export class RoundResult{
    constructor(teamName1, teamName2, team1Points, team2Points) {
        this.team1 = teamName1
        this.team2 = teamName2
        if (team1Points || team2Points) {
            this.hasResults = true
        } else {
            this.hasResults = false
        }
        this.team1Points = team1Points || 0
        this.team2Points = team2Points || 0
    }
}

export class Rounds {
    constructor(doc) {
	return _.extend(doc)
    }

    setResult(resultObject) {
        check(resultObject,{
            roundNumber: int,
            team1: String,
            team2: String,
            team1Points: int,
            team2Points: int
        })
        if (team1Points < 0  || team2Points < 0) {
            throw RangeError("Points should be positive or 0")
        }
        if (team1 !== this.team1 || team2 !== this.team2) {
            throw ReferenceError("Team names do not corrispond to this round result")
        }

        this.hasResults = true

        this.team1Points = team1Points
        this.team2Points = this.team2Points   
    }

    getResults() {
        if (!this.hasResults) {
            return undefined
        }
        return this
    }
}
