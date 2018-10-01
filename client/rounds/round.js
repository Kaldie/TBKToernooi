import './round.html'


Template.Round.helpers({
	getMatches() {
		return Template.instance().data.getMatches()
	},
	isInteresting() {
		return Template.instance().data.isOnGoing() || Template.instance().data.willStart()
	}
})