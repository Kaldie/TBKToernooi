Template.Match.helpers({
  hasScore(){
    return false
  },
  
  score() {
    return  Template.instance().data.getStringResult()
    }
})