import '../imports/startup/accounts-config.js';
import './landing.js'
import './example.html'

Router.configure({
    layoutTemplate: 'landing'
})

Router.route('/', function() {
    this.layout('landing')
    this.render('example', {to: 'main'});
})
