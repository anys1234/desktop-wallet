;(function () {
  'use strict'

  /**
   * NOTE This component uses the entire AccountController yet: it's the first
   * step to refactor the `index.html`
   */

  angular
    .module('phantomclient.components')
    .component('exchangeTab', {
      templateUrl: 'src/components/account/templates/exchange-tab.html',
      bindings: {
        accountCtrl: '='
      },
      controller: ['$scope', '$sce', 'storageService', ExchangeTabController]
    })

  function ExchangeTabController ($scope, $sce, storageService) {
    this.$onInit = () => {
      this.ul = this.accountCtrl

      if (this.ul.currentTheme === 'dark') {
        this.changellyLogo = 'assets/images/images/changelly-logo-dark.png'
      } else {
        this.changellyLogo = 'assets/images/images/changelly-logo.png'
      }

      // Changelly should be accepted every time that the user loads the app or switches networks
      this.changellyEnabled = false
      this.enabledConfirmed = false

      const merchantId = 'bab9de3731aa'
      const refId = merchantId

      let from = 'BTC'
      let to = 'PHANTOM'
      let address = ''
      let amount = 0.1

      if (this.ul.network.token !== 'DPHANTOM') {
        to = this.ul.network.token

        // Use the current address to receive the PHANTOMs
        if (to === 'PHANTOM') {
          address = this.ul.selected.address
        }

        if (!this.ul.btcValueActive) {
          from = this.ul.currency.name

          // If it's not 1 of these currencies, BTC would be used
          if (['eur', 'usd'].indexOf(from) !== -1) {
            amount = 300
          }
        }
      }

      // Phantom logo colour: #ED2A2D rgb(237,42,45)
      const colour = 'ED2A2D'

      this.changellySrc = $sce.trustAsResourceUrl(`https://changelly.com/widget/v1?auth=email&from=${from}&to=${to}&merchant_id=${merchantId}&address=${address}&amount=${amount}&ref_id=${refId}&color=${colour}`)
    }
  }
})()
