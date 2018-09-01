import { Meteor } from 'meteor/meteor';
import fs from 'fs'
import path from 'path'

import {ImageCollection} from './imageCollection'

Meteor.startup(() => {
    try {
	var files = fs.readdirSync(Meteor.settings.sponsorDir)
    } catch(error) {
	console.log(error)
	throw "Something went wrong with loading sponsor files, please verify that \n" + Meteor.settings.sponsorDir + " exists." 
    }
    ImageCollection.rawCollection().stats({},(error, result) => {
	if (error=== undefined) {
	    ImageCollection.rawCollection().drop()
	} else {
	    console.log("error", error)
	}
    })
    let number=0
    files.forEach((fileName) => {
	ImageCollection.insert({
	    "sponsorName": fileName.split("_")[0],
	    "position": fileName.split("_")[1],
	    "source": path.join(Meteor.settings.sponsorDir, fileName),
	    "number": number
	})
	++number;
    })
    console.warn(ImageCollection.find({}).fetch())
    for (let aFile in files) {
	console.log("File: ", aFile)
    }
});
