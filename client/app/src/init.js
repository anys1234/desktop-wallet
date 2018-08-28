;(function () {
  'use strict'

  angular.module('phantomclient.filters', [])
  angular.module('phantomclient.services', ['ngMaterial'])
  angular.module('phantomclient.directives', [])
  angular.module('phantomclient.accounts', ['ngMaterial', 'phantomclient.services', 'phantomclient.filters', 'phantomclient.addons'])
  angular.module('phantomclient.components', ['gettext', 'ngMaterial', 'phantomclient.services', 'phantomclient.accounts'])
  angular.module('phantomclient.addons', [])
  angular.module('phantomclient.constants', [])
})()
