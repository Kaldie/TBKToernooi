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
});
