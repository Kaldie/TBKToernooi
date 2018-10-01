import { _ } from 'underscore'


export class Match {
  constructor(doc) {
    _.extend(this, doc)
    
    if (!this.hasResults) {
      this.hasResults = false
    }

    return this
  }

  setResult(team1Points, team2Points) {
    if (team1Points < 0 || team2Points < 0) {
      throw RangeError("Points should be positive or 0")
    }

    this.team1Points = team1Points
    this.team2Points = team2Points
    this.hasResults = true
  }

  hasResult() {
    return this.hasResults
  }

  getStringResult() {
    if (!this.hasResults) {
      return "Not yet finished."
    }
    else {
      return  this.team1Points + " : " + this.team2Points
    }
  }
}