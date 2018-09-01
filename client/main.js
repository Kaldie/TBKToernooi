import '../imports/startup/accounts-config.js';
import './landing.js'
import './example.html'
import './roundOverView.js'

Router.configure({
    layoutTemplate: 'landing'
})

Router.route('/', function() {
    this.layout('landing')
    this.render('example', {to: 'main'});
})

Router.route('/overview', function() {
    this.layout('landing')
    this.render('RoundOverView', {to: 'main'});
})
