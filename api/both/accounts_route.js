import { AccountsTemplates } from 'meteor/useraccounts:core'

import './signin.html'

AccountsTemplates.configure({
  defaultLayout: 'landing',
  forbidClientAccountCreation: true,
  overrideLoginErrors: false,
});


AccountsTemplates.configureRoute('signIn',{
  name: 'login',
  path: '/login',
  template: 'signin',
  layoutTemplate: 'landing',
  redirect: '/admin',
});

AccountsTemplates.configureRoute('ensureSignedIn', {
  redirect: '/signin'
});

