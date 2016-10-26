'use strict';

// export the array that is the value of authService
module.exports = ['$q', '$log', '$http', '$window', authService];

function authService($q, $log, $http, $window){
  $log.debug('init authService');

  let service = {};
  let token = null;

  // _token so it doesn't overshadow token var in parent scope
  // won't be able to call this private function from the service, just within the service
  function setToken(_token){
    $log.debug('authService.setToken()');
    if (! _token)
      return $q.reject(new Error('no token'));
    $window.localStorage.setItem('token', _token);
    token = _token;
    return $q.resolve(token);
  }

  service.getToken = function(){
    $log.debug('authService.getToken');

    // if token has already been set or retrieved from localStorage
    if (token) return $q.resolve(token);
    token = $window.localStorage.getItem('token');
    if (token) return $q.resolve(token);
    return $q.reject(new Error('token not found'));
  };

  // remove the user token to successfully log the user out
  service.logout = function(){
    $log.debug('authService.logout()');
    $window.localStorage.removeItem('token');
    token = null;
    return $q.resolve();
    // this isn't going to resolve anything because the token is gone, we just have to return a promise to have the ability to chain things
  };

  service.signup = function(user) {
    $log.debug('authService.signup()');
    let url = `${__API_URL__}/api/signup`;
    console.log('signup url', url);

    let config = {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    };

    return $http.post(url, user, config)
    .then( res => {
      $log.log('success', res.data);
      // res.data is the response body aka the token
      return setToken(res.data);
    })
    .catch(err => {
      $log.error('fail', err.message);
      return $q.reject(err);
    });
  };

  service.login = function(user){
    $log.debug('authService.login()');
    let url = `${__API_URL__}/api/login`;

    let base64 = $window.btoa(`${user.username}:${user.password}`);
    // btoa base64 encodes a string

    let config = {
      headers: {
        Accept: 'application/json',
        Authorization: `Basic ${base64}`,
      },
    };

    return $http.get(url, config)
    .then( res => {
      $log.log('success', res.data);
      return setToken(res.data);
    })
    .catch( err => {
      $log.error(err.message);
      return $q.reject(err);
    });
  };

  return service;
}
