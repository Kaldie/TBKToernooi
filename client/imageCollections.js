import {Mongo} from 'meteor/mongo';

console.log("here2")
export var imageCollection = new Mongo.Collection("Image")
console.log("here3", imageCollection)
