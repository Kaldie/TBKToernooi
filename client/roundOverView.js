import { Meteor } from 'meteor/meteor'
import {RoundCollection} from './roundCollection.js'

import './roundOverView.html'
import './roundOverView.css'

Template.RoundOverView.onCreated(function() {
    this.isLoaded = new ReactiveVar(false)
    Meteor.subscribe("Rounds", () => {
	console.log("lala")
	this.round = RoundCollection
	this.isLoaded.set(true)
    })
})

Template.RoundOverView.helpers({
    rounds() {
	console.log("running rounds helper")
	const instance = Template.instance()
	console.log("instance.round", instance.round)
	if (instance.isLoaded.get() && instance.round) {
	    return instance.round.find({}).fetch()
	}
    },
    isFirstRound(roundNumber) {
	return roundNumber === 0 ? false: true
    },
})
	
