import './match.html'

Template.Match.helpers({
  score() {
    return  Template.instance().data.getStringResult()
    }
})