angular.module('routerRoutes', ['ngRoute'])
  
  // configure our routes
  .config(function($routeProvider, $locationProvider) {
      $routeProvider
 
          // route for the home page
          .when('/', {
             templateUrl : 'pages/home.html',
             /*controller  : 'homeController',
             controllerAs: 'home'*/
         })
 
         // route for the about page
         .when('/about', {
             templateUrl : 'pages/about.html',
           /*  controller  : 'aboutController',
            controllerAs: 'about'*/
         })
 
         // route for the contact page
         .when('/contact', {
             templateUrl : 'pages/contact.html',
            /* controller  : 'contactController',
             controllerAs: 'contact'*/
         });

     // set our app up to have pretty URLS
     $locationProvider.html5Mode(true);
 });