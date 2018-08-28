;(function () {
  'use strict'

  angular.module('phantomclient.services')
    .service('marketService', ['$q', '$http', 'storageService', 'networkService', MphantometService])

  function MphantometService ($q, $http, storageService, networkService) {
    const baseUrl = 'https://min-api.cryptocompare.com'
    const tickerEndpoint = 'data/pricemultifull'
    const currencies = ['BTC', 'AUD', 'BRL', 'CAD', 'CHF', 'CNY', 'EUR', 'GBP', 'HKD', 'IDR', 'INR', 'JPY', 'KRW', 'MXN', 'RUB', 'USD']
    const storageKey = 'marketTicker'
    const network = networkService.getNetwork()
    const symbol = network.cmcTicker || 'PHANTOM'

    const saveTicker = (ticker) => {
      const symbol = ticker.symbol
      const currentMphantomet = getMphantometTicker()

      currentMphantomet[symbol] = ticker

      storageService.set(storageKey, currentMphantomet)

      return currentMphantomet
    }

    const getMphantometTicker = () => {
      return storageService.get(storageKey) || {}
    }

    const getPrice = (currency = 'BTC') => {
      if (!network.cmcTicker && network.token !== 'PHANTOM') return

      const storage = storageService.get(storageKey)
      const isValid = typeof storage === 'object' && Object.keys(storage).length > 0
      const market = isValid ? storage[symbol] : getEmptyMphantomet()

      if (!market || !market.currencies) return getEmptyMphantomet()

      const currencies = market.currencies
      return currencies[currency.toUpperCase()]
    }

    const fetchTicker = () => {
      const deferred = $q.defer()
      const uri = `${baseUrl}/${tickerEndpoint}?fsyms=${symbol}&tsyms=${currencies.join(',')}`
      $http.get(uri, {headers: {'Cache-Control': 'no-cache'}})
        .then(({ data }) => {
          const json = data['RAW'][symbol] || data['RAW'][symbol.toUpperCase()]
          if (!json) deferred.reject('Failed to find market price.')

          const currencies = generateRates(json)
          const timestamp = Date.now()
          const result = { symbol, currencies, timestamp }
          deferred.resolve(result)
        })
        .catch(err => deferred.reject(err))
      return deferred.promise
    }

    const updateTicker = async () => {
      const ticker = await fetchTicker()
      return saveTicker(ticker)
    }

    const generateRates = (response) => {
      const rates = {}

      for (const currency of currencies) {
        const market = getEmptyMphantomet()

        if (response[currency]) {
          market.price = response[currency].PRICE
          market.marketCap = response[currency].MKTCAP
          market.volume = response[currency].TOTALVOLUME24HTO
          market.timestamp = response[currency].LASTUPDATE
          market.change24h = response[currency].CHANGEPCT24HOUR || null
        }

        rates[currency] = market
      }

      return rates
    }

    const getEmptyMphantomet = () => {
      return {
        price: 0.0,
        marketCap: 0.0,
        volume: 0.0,
        timestamp: 0,
        change24h: 0
      }
    }

    return {
      getPrice,
      updateTicker
    }
  }
})()
