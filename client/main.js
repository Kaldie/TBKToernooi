import '../imports/startup/accounts-config.js';
import './landing.js'
import './example.html'
<<<<<<< HEAD
import './roundOverView.js'
=======
import './admin/admin.js'
>>>>>>> 8d1fe4c95ef361697f7f32742eea94977cf1894d

Router.configure({
    layoutTemplate: 'landing'
})

Router.route('/', function() {
    this.layout('landing')
    this.render('example', {to: 'main'});
})

<<<<<<< HEAD
Router.route('/overview', function() {
    this.layout('landing')
    this.render('RoundOverView', {to: 'main'});
})
=======
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
>>>>>>> 8d1fe4c95ef361697f7f32742eea94977cf1894d
