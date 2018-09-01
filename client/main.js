import '../imports/startup/accounts-config.js';
import './landing.js'
import './bitch.html'

Router.configure({
    layoutTemplate: 'landing'
})

Route.route('/', function() {
    this.layout('landing')
    this.render('bitch', {to: "main"});
})
