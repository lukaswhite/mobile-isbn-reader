angular.module('starter', 
  [
    'ionic', 
    'ngCordova',    
    'goodreads.service'
  ]
)

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {      
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.factory( '_', window._ )

.factory( 'ISBN', window.ISBN )

.controller('MainCtrl', function MainCtrl($http, $ionicPlatform, $ionicPopup, $cordovaBarcodeScanner, Goodreads) {

  var vm = this;

  vm.stage = 'waiting';
  vm.book = null;

  vm.scan = function() {

    $ionicPlatform.ready(function() {
      
      $cordovaBarcodeScanner
        .scan()
        .then(function(result) {
          
          // Attempt to parse the ISBN
          var isbn = ISBN.parse( result.text );

          if ( isbn ) {

            vm.stage = 'loading';

            Goodreads.getReviewCounts( isbn.asIsbn13() ).then(function(resp){
      
              vm.book = _.find( resp.data.books, function( book ) { 
                return book.isbn13 == isbn.asIsbn13();
              });

              vm.book.formattedISBN = ISBN.hyphenate( isbn.asIsbn13() );

              vm.stage = 'waiting';

            });

          } else {

            var alertPopup = $ionicPopup.alert({
              title: 'Error',
              template: 'That doesn\'t appear to be a book!'
           });

           alertPopup.then(function(res) {
             
           });
            
          }

        }, function(error) {
          // An error occurred
          vm.scanResults = 'Error: ' + error;
        }
      );

    });

  }

  vm.viewBook = function()
  {    
    var url = Goodreads.getPageUrl( vm.book.id );
    window.open( url, '_blank' );
  }

});