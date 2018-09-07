import { Meteor } from 'meteor/meteor'

import './round.html'
import './match.html'


Template.Round.helpers({
	getMatches() {
		return Template.instance().data.getMatches()
	}
})