(function(angular) {
  'use strict';

  angular.module('esn.avatar')
    .factory('esnAvatarUrlService', esnAvatarUrlService);

  function esnAvatarUrlService($log, urlUtils) {
    return {
      generateUrl: generateUrl,
      generateForCurrentUser: generateForCurrentUser,
      generateUrlByUserEmail: generateUrlByUserEmail,
      generateUrlByUserId: generateUrlByUserId
    };

    function generateUrl(email, displayName) {
      return generateUrlByUserEmail(email) + '&objectType=email' + (displayName ? '&displayName=' + displayName : '');
    }

    function generateForCurrentUser(noCache) {
      $log.warn('DEPRECATION: The esnAvatarUrlService.generateForCurrentUser should not be used anymore, as it is not compatible with OIDC.');

      return applyTimestamp('/api/user/profile/avatar', noCache);
    }

    function generateUrlByUserEmail(email, noCache) {
      return applyTimestamp('/api/avatars?email=' + email, noCache);
    }

    function generateUrlByUserId(userId, noCache) {
      return applyTimestamp('/api/users/' + userId + '/profile/avatar', noCache);
    }

    function applyTimestamp(url, apply) {
      if (apply) {
        return urlUtils.updateUrlParameter(url, 'cb', Date.now());
      }

      return url;
    }
  }
})(angular);
