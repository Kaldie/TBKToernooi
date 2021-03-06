import './landing/landing.js'
import './admin/admin.js'
import './rounds/roundOverView.js'
import '../api/both/accounts_route.js'


// Router.configure({
//     layoutTemplate: 'landing'
// })

Router.plugin('ensureSignedIn', {
    only: ['admin', '/admin/pools', "/admin/rounds", "/admin/scores", "/admin/teams"]
});

Router.route('/', function() {
    this.layout('landing')
    this.render('RoundOverView', {to: 'main'});
    },
    {
        name:"home"
    })

Router.route('/admin', function() {
    this.layout('landing');
    this.render('admin', {to: 'main'});
});

Router.route('/admin/pools', function() {
    this.layout('landing');
    this.render('pools', {to: 'main'})
});

Router.route('/admin/rounds', function() {
    this.layout('landing');
    this.render('rounds', {to: 'main'})
});

Router.route('/admin/scores', function() {
    this.layout('landing');
    this.render('scores', {to: 'main'})
});

Router.route('/admin/teams', function() {
    this.layout('landing');
    this.render('teams', {to: 'main'})
});

