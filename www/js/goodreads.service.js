angular.module('goodreads.service', [ 'app.config' ])
  
  .factory('Goodreads', function( $http, $q, services ) {  

    var baseUrl = 'https://www.goodreads.com';

    function request( url, method, data )
    {
      method = method || 'GET';
      
      data = data || {};
      _.merge( data, { key : services.goodreads.key } );

      url = baseUrl + url;

      if ( method == 'GET' ) {
        url = url + '?' + toQueryString( data );
      }

      var request = {
        method: method,
        url: url,
        data : data || null
      };

      return $http( request );
    }

    function toQueryString(obj) 
    {
      return _.map(obj,function(v,k){
        return encodeURIComponent(k) + '=' + encodeURIComponent(v);
      }).join('&');

    };

    function getReviewCounts( isbn )
    {      
      return request ( '/book/review_counts.json', 'GET', { isbns : isbn } );
    }

    function getPageUrl( id )
    {
      return baseUrl + '/book/show/' + id;
    }

    return {                                                                                                                                                                                                              
      getReviewCounts  :  getReviewCounts,
      getPageUrl       :  getPageUrl
    }
  });