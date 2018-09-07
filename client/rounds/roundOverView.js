import { Meteor } from 'meteor/meteor'
import {RoundCollection} from './roundCollection.js'

import './roundOverView.html'
import './roundOverView.css'
import './round.js'

Template.RoundOverView.onCreated(function() {
    this.isLoaded = new ReactiveVar(false)
	Meteor.subscribe("Rounds", () => {
		this.roundCollection = RoundCollection
		this.isLoaded.set(true)
    })
})

Template.RoundOverView.helpers({
    getRounds() {
		const instance = Template.instance()
		if (instance.isLoaded.get() && instance.roundCollection) {
			return instance.roundCollection.find({}).fetch()
		}
    },
    isFirstRound(roundNumber) {
	return roundNumber === 1 ? false: true
	},
})
