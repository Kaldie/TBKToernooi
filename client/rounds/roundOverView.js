import { Meteor } from 'meteor/meteor'
import { RoundsCollection } from '/api/collections/roundCollection.js'

import './roundOverView.html'
import './roundOverView.css'
import './round.js'

Template.RoundOverView.onCreated(function() {
	this.isLoaded = new ReactiveVar(false)
	this.roundsCollection = RoundsCollection
	Meteor.subscribe("Rounds", () => {
		
		this.isLoaded.set(true)
    })
})

Template.RoundOverView.helpers({
    getRounds() {
		const instance = Template.instance()
		if (instance.isLoaded.get() && instance.roundsCollection) {
			return instance.roundsCollection.find({}).fetch()
		}
	},
	
    isOngoingRound(roundNumber) {
	return roundNumber === 1 ? false: true
	},
})
