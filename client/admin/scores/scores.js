
import {Template} from 'meteor/templating'
import {reactiveVar, ReactiveVar} from 'meteor/reactive-var'
import { RoundsCollection } from '/api/collections/roundCollection'

import './scores.html'
import './scores.css'
import '/client/rounds/round'
import '/client/rounds/match'


Template.scores.onCreated(function() {
  this.isLoadeded = new ReactiveVar(false)
  this.currentRoundNumber = new ReactiveVar(undefined)
  Meteor.subscribe("Rounds",(error) => {
    this.isLoadeded.set(true)
  })
})

Template.scores.helpers({
  roundNumbers() {
    return RoundsCollection.find({}, {fields: {"roundNumber": 1}, sort: {"roundNumber": 1}})
    .fetch()
    .map((element) => element.roundNumber);
  },

  matches() {
    const instance = Template.instance()
    const currentRoundNumber = instance.currentRoundNumber.get()
    if (instance.isLoadeded.get() && currentRoundNumber) {
      const currentRound = RoundsCollection.find({roundNumber : currentRoundNumber}).fetch()[0]
      const matches = currentRound.getMatches()
      matches.sort((left, right) => left.id - right.id)
      console.warn(matches)
      return matches
    }
    return []
  },

  getResult(match, teamNumber) {
    if (match.hasResults) {
      if (teamNumber === 1) {
        return match.team1Points
      } else if (teamNumber === 2) {
        return match.team2Points
      }
    }
  },

  currentRoundHelper() {
    return Template.instance().currentRoundNumber.get()
  }
})



Template.scores.events({
  'click .RoundNumberSelectionAction' (event, template) {
    template.currentRoundNumber.set(parseInt(event.target.text.split(" ")[1]))
  },

  'submit [id^="update-match-"]' (event, template) {
    // Prevent default browser form submit
    event.preventDefault();
    const target = event.target;

    const currentRound = RoundsCollection.find({roundNumber : template.currentRoundNumber.get()}).fetch()[0]
    const currentMatch = currentRound.getMatchById(parseInt(target.matchId.value))
    currentMatch.setResult(parseInt(target.team1Score.value), parseInt(target.team2Score.value))
    currentRound.updateMatch(currentMatch)
  }
})




