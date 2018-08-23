import { Meteor } from 'meteor/meteor';
import fs from 'fs'
import path from 'path'

import {ImageCollection} from './imageCollection'

Meteor.startup(() => {
    console.warn("Meteor.settings.sponsorDir", Meteor.settings.sponsorDir)
    var files = fs.readdirSync(Meteor.settings.sponsorDir)
    ImageCollection.rawCollection().drop()
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
