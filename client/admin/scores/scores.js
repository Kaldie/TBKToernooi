
import {Template} from 'meteor/templating'
import {reactiveVar, ReactiveVar} from 'meteor/reactive-var'
import { RoundsCollection } from '/api/collections/roundCollection'

import './scores.html'
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
    if (Template.instance().isLoadeded.get()) {
      console.warn("RoundsCollection.find({},{fields:{roundNumber:1}}).fetch()", RoundsCollection.find({},{fields:{roundNumber:1}}).fetch().map((element) => { return element.roundNumber}))
      return RoundsCollection.find({},{fields:{roundNumber:1}}).fetch().map((element) => { return element.roundNumber})
    } else {
      return []
    }
  },
  currentRound() {
    Template.instance().data.isOnGoing() || Template.instance().data.willStart()
  },

  matches() {
    const template = Template.instance()
    const currentSelectRoundNumber = template.currentRoundNumber.get()
    if (currentSelectRoundNumber) {
      return RoundsCollection.find({roundNumber: currentSelectRoundNumber}, {fields: {matches: 1}}).fetch()
    } else {
      return undefined
    }
  },
  values() {
    return [...Array(10).keys()]
  }
})



Template.scores.events({
  'change .RoundNumberSelectionAction' (event, template) {
    console.warn("here")
    const select = event.target
    template.currentRoundNumber.set(select.options[select.selectedIndex].value)
    console.warn("template.currentRoundNumber.get", template.currentRoundNumber())
  } 
})




