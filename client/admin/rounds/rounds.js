import { Template } from 'meteor/templating';

import { RoundsCollection } from '/api/collections/roundCollection'
import {Teams} from '/api/teams'

import './rounds.html'
import './rounds.css'
import '/client/rounds/match'


Template.rounds.onCreated(function teamOnCreated() {
    Meteor.subscribe('Rounds');
    Meteor.subscribe('teams')
});

Template.rounds.helpers({
    rounds() {
        return RoundsCollection.find({}, {sort: {"roundNumber": 1}});
    },
});

Template.rounds.events({
    'click .admin-remove-round'(event) {
        // Prevent default browser form submit
        event.preventDefault();
        // Get value from form element
        this.delete()
    },

    'click #addRoundButton'(event) {
        console.log("here")
        event.preventDefault();
        RoundsCollection.addRound()
    }

});

Template.round.onCreated(function() {
    this.teamName1 = new ReactiveVar(undefined)
    this.teamName2 = new ReactiveVar(undefined)
})

Template.round.helpers({
    areValidTeams() {
        const instance = Template.instance()
        if (instance.teamName1.get() && instance.teamName2.get()) {
            return true
        }
        return false
    },

    validTeams() {
        const instance = Template.instance()
        if (instance.teamName1.get() || instance.teamName2.get()) {
            const poules = Teams.find({name : {
                $in:[instance.teamName1.get(), instance.teamName2.get()]
            }}).fetch()
            .map((element) => {return element.pouleName})
            return Teams.find({pouleName : {$in : poules}}).fetch().map((element) => { return element.name })
        }
        return Teams.find({}).fetch().map((element) => { return element.name })
    },

    tableNumbers() {
        let tableNumbers = []
        for (var i=1; i < 11; ++i) {
            tableNumbers.push(Number(i))
        }
        const usedTables = Template.instance().data.getMatches().map((element) => {return Number(element.table)})
        tableNumbers = tableNumbers.filter((value) => $.inArray(value, usedTables)=== -1 )
        return tableNumbers
    }

})

const validateMatch =  function(match) {
    console.log(match)
    if (match.team1 === "disabled") {
        return false
    }

    if (match.team2 === "disabled") {
        return false
    }

    if (match.table === "disabled") {
        return false
    }
    return true
}

Template.round.events({
    'submit [id^="new-match-"]'(event, template) {
        // Prevent default browser form submit
        event.preventDefault();
        // Get value from form element
        const target = event.target;

        const aMatch = {team1 : target.team1Name.value,
                        team2 : target.team2Name.value,
                        table : target.tableNumber.value,
                        hasResults: false}

        if (!validateMatch(aMatch)) {
            return
        }

        this.addMatch(aMatch)

        $("select").toArray().map((element) => {
            element.value = "disabled"
        })

        template.teamName1.set(undefined)
        template.teamName2.set(undefined)
    },

    'change .teamSelect'(event, template) {
        const select = event.target
        if (event.target.name === "team1Name") {
            template.teamName1.set(select.options[select.selectedIndex].value)
            console.warn(template.teamName1.get())
        }
        if (event.target.name === "team2Name") {
            template.teamName2.set(select.options[select.selectedIndex].value)
            console.warn(template.teamName2.get())
        }
       
    }
})