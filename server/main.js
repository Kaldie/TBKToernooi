import { Meteor } from 'meteor/meteor';
import fs from 'fs'
import path from 'path'

import '../api/teams.js';

import  { ImageCollection } from '../api/collections/imageCollection.js'
import  { RoundsCollection } from '../api/collections/roundCollection.js'

import { Round } from '/api/Round.js';
import { Match } from '/api/Match.js'

var readSponsorImages = function() {
    try {
		var files = fs.readdirSync(Meteor.settings.sponsorDir)
    } catch(error) {
		console.log(error)
		throw "Something went wrong with loading sponsor files, please verify that \n" + Meteor.settings.sponsorDir + " exists." 
    }
    let number = 0
    ImageCollection.remove({})
    files.forEach((fileName) => {
		console.info("Insert image: " + fileName)
		ImageCollection.insert({
			"sponsorName": fileName.split("_")[0],
			"position": fileName.split("_")[1],
			"source": path.join(Meteor.settings.sponsorDir, fileName),
			"number": number
		})
		++number;
    })
    if (number === 0) {
		throw "Did not find any images. Please supply nice images in: " + Meteor.settings.sponsorDir + " ."
    }
}

var addBogusRounds = function() {
	rounds = RoundsCollection.find().fetch()
    currentLastRound = rounds.reduce((current, element) => current > element.roundNumber? current : element.roundNumber,0) || 0
    const roundAdditions = [1,2]
    roundAdditions.map((roundAddition) => {
	RoundsCollection.insert({
	    roundNumber : roundAddition + currentLastRound,
	    matches : [
		{
			id: 1,
			team1:"lala",
		    team2:"kala",
		    table: 1 + roundAddition,
			poule: "A",
			hasResults: false
		},
		{
			id: 2,
		    team1:"beta",
		    team2:"alpha",
		    table: 2 + roundAddition,
			poule: "A",
			hasResults: false
		},
		{
			id: 3,
		    team1: "Nederland",
		    team2: "Belgie",
		    table: 3 + roundAddition,
			poule: "B",
			hasResults: false
		}
	    ]
	})		
	})
}

var updateMatchResult = function() {
	const round = new Round(RoundsCollection.findOne())
	const matches = round.getMatches()
	console.log("matches", matches.length)
	if (matches.length > 0) {
		const aMatch = new Match(round.getMatches()[0])
		aMatch.setResult(10,1) 
		round.updateMatch(aMatch)
	}
	console.log("matches", round.getMatches())
}

Meteor.startup(() => {
	readSponsorImages()
	addBogusRounds()
    updateMatchResult() 
});
