;(function () {
  'use strict'

  angular.module('phantomclient.constants')
    // 1 PHANTOM has 100000000 "phantomtoshi"
    .constant('PHANTOMTOSHI_UNIT', Math.pow(10, 8))
    .constant('TRANSACTION_TYPES', {
      'SEND_PHANTOM': 0,
      'CREATE_SECOND_PASSPHRASE': 1,
      'CREATE_DELEGATE': 2,
      'VOTE': 3
    })

  angular.module('phantomclient.constants')
  // all Phantom timestamps start at 2017/3/21 13:00
    .constant('PHANTOM_LAUNCH_DATE', new Date(Date.UTC(2017, 2, 21, 13, 0, 0, 0)))
})()
