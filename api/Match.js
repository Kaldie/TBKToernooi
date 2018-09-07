import { _ } from 'underscore'


export class Match {
  constructor(doc) {
    return _.extend(this, doc)
  }

  setResult(team1Points, team2Points) {
    check(team1Points, Number,
          team2Points, Number)

    if (team1Points < 0 || team2Points < 0) {
      throw RangeError("Points should be positive or 0")
    }

    this.hasResults = true

    this.team1Points = team1Points
    this.team2Points = team2Points
  }

  getResults() {
    if (!this.hasResults) {
      return undefined
    }
    return this
  }

  getStringResult() {
    return  this.team1Points + ' - ' + this.team2Points 
  }
}

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