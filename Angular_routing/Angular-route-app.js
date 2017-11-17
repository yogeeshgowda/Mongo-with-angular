var app=angular.module('routerApp', ['ngRoute'])
  
  // create the controllers
  // this will be the controller for the ENTIRE site
  
 
  // configure our routes
  app.config(function($routeProvider/*,$locationProvider*/) {
      $routeProvider
 
          // route for the home page
          .when('/', {
             templateUrl : 'pages/home.html',
             controller  : 'homeController',
             controllerAs: 'home'
         })
 
         // route for the about page
         .when('/about', {
             templateUrl : 'pages/about.html',
             controller  : 'aboutController',
            controllerAs: 'about'
         })
 
         // route for the contact page
         .when('/contact', {
             templateUrl : 'pages/contact.html',
             controller  : 'contactController',
             controllerAs: 'contact'
         });

     // set our app up to have pretty URLS
     //$locationProvider.html5Mode(true);
 });

  app.controller('mainController', function() {
  
              var vm = this;
            
              // create a bigMessage variable to display in our view
             vm.bigMessage = 'A smooth sea never made a skilled sailor.';
           })
           
           // home page specific controller
           app.controller('homeController', function() {
           
             var vm = this;
              vm.message = 'This is the home page!';
           })
           
           // about page controller
           app.controller('aboutController', function() {
           
             var vm = this;
           
             vm.message = 'Look! I am an about page.';
           })
           
           // contact page controller
           app.controller('contactController', function() {
           
             var vm = this;
           
             vm.message = 'Contact us! JK. This is just a demo.';
           });
