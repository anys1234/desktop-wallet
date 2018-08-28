;(function () {
  'use strict'

  /**
   * NOTE This component uses the entire AccountController yet: it's the first
   * step to refactor the `index.html`
   */

  angular
    .module('phantomclient.components')
    .component('marketBox', {
      templateUrl: 'src/components/dashboard/market-box.html',
      bindings: {
        accountCtrl: '='
      },
      controller: MphantometController
    })

  function MphantometController (marketService, $scope) {
    this.$onInit = () => {
      this.ul = this.accountCtrl
    }
  }
})()
