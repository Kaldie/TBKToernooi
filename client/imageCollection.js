import {Mongo} from 'meteor/mongo'

export const imageCollection = new Mongo.Collection("Image")
console.log("image", imageCollection)
