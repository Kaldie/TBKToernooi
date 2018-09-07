import { Mongo } from 'meteor/mongo'
import {Round} from '/api/Round'

export const RoundCollection = new Mongo.Collection("Rounds",{
  transform: (doc =>  new Round(doc))
})
