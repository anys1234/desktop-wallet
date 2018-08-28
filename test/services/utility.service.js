'use strict'

describe('utilityService', () => {
  let utilityService, PHANTOM_LAUNCH_DATE, PHANTOMTOSHI_UNIT

  beforeEach(module('phantomclient.constants'))

  beforeEach(() => {
    module('phantomclient.services')

    inject(($injector, _$rootScope_, _PHANTOM_LAUNCH_DATE_, _PHANTOMTOSHI_UNIT_) => {
      utilityService = $injector.get('utilityService')
      PHANTOM_LAUNCH_DATE = _PHANTOM_LAUNCH_DATE_
      PHANTOMTOSHI_UNIT = _PHANTOMTOSHI_UNIT_
    })
  })

  describe('phantomtoshiToPhantom', () => {
    it('undefined phantomtoshi is 0 Phantom', () => {
      const phantom = utilityService.phantomtoshiToPhantom()

      expect(phantom).to.eql(0)
    })

    it('0 phantomtoshi is 0 Phantom', () => {
      const phantom = utilityService.phantomtoshiToPhantom(0)

      expect(phantom).to.eql(0)
    })

    it('1 phantomtoshiUnit is 1 Phantom', () => {
      const phantom = utilityService.phantomtoshiToPhantom(PHANTOMTOSHI_UNIT)

      expect(phantom).to.eql(1)
    })

    it('1/2 phantomtoshiUnit is 0.5 Phantom', () => {
      const phantom = utilityService.phantomtoshiToPhantom(PHANTOMTOSHI_UNIT / 2)

      expect(phantom).to.eql(0.5)
    })

    it('1111111 part of phantomtoshiUnit is human readable amount of Phantom', () => {
      const phantom = utilityService.phantomtoshiToPhantom(PHANTOMTOSHI_UNIT / 1111111)

      expect(phantom).to.eq('0.000000900000090000009')
    })

    it('1111111 part of phantomtoshiUnit is human readable amount of Phantom, 0 decimals', () => {
      const phantom = utilityService.phantomtoshiToPhantom(PHANTOMTOSHI_UNIT / 1111111, false, 0)

      expect(phantom).to.eq('0')
    })

    it('1111111 part of phantomtoshiUnit is human readable amount of Phantom, 7 decimals', () => {
      const phantom = utilityService.phantomtoshiToPhantom(PHANTOMTOSHI_UNIT / 1111111, false, 7)

      expect(phantom).to.eq('0.0000009')
    })

    it('11111111 part of phantomtoshi is precise amount of Phantom', () => {
      const phantom = utilityService.phantomtoshiToPhantom(PHANTOMTOSHI_UNIT / 11111111, true)

      expect(phantom).to.be.within(9.00000009000000e-8, 9.00000009000002e-8)
    })

    it('11111111 part of phantomtoshi is precise amount of Phantom, 0 decimals', () => {
      const phantom = utilityService.phantomtoshiToPhantom(PHANTOMTOSHI_UNIT / 11111111, true, 0)

      expect(phantom).to.eq('0')
    })

    it('11111111 part of phantomtoshi is precise amount of Phantom, 7 decimals', () => {
      const phantom = utilityService.phantomtoshiToPhantom(PHANTOMTOSHI_UNIT / 11111111, true, 7)

      expect(phantom).to.eq('0.0000001')
    })
  })

  describe('phantomToPhantomtoshi', () => {
    it('undefined Phantom is 0 phantomtoshi', () => {
      const phantom = utilityService.phantomToPhantomtoshi()

      expect(phantom).to.eql(0)
    })

    it('0 Phantom is 0 phantomtoshi', () => {
      const phantom = utilityService.phantomToPhantomtoshi(0)

      expect(phantom).to.eql(0)
    })

    it('1 Phantom is 1 phantomtoshiUnit', () => {
      const phantom = utilityService.phantomToPhantomtoshi(1)

      expect(phantom).to.eql(PHANTOMTOSHI_UNIT)
    })

    it('0.5 Phantom is 0.5 phantomtoshiUnit', () => {
      const phantom = utilityService.phantomToPhantomtoshi(0.5)

      expect(phantom).to.eql(PHANTOMTOSHI_UNIT / 2)
    })

    it('11.11111111111 phantom is correct phantomtoshi amount', () => {
      const phantom = utilityService.phantomToPhantomtoshi(11.11111111111)

      expect(phantom).to.eq(1111111111.111)
    })

    it('11.11111111111 phantom is correct phantomtoshi amount, 0 decimals', () => {
      const phantom = utilityService.phantomToPhantomtoshi(11.11111111111, 0)

      expect(phantom).to.eq('1111111111')
    })

    it('11.11111111111 phantom is correct phantomtoshi amount, 2 decimals', () => {
      const phantom = utilityService.phantomToPhantomtoshi(11.11111111111, 2)

      expect(phantom).to.eq('1111111111.11')
    })
  })

  describe('numberStringToFixed', () => {
    it('input is not a string, returns input value', () => {
      expect(utilityService.numberStringToFixed()).to.eq()
      expect(utilityService.numberStringToFixed(null)).to.eq(null)
      expect(utilityService.numberStringToFixed(1)).to.eq(1)
      const obj = {}
      expect(utilityService.numberStringToFixed(obj)).to.eq(obj)
    })

    it('12.345, no value for decimals, returns input', () => {
      expect(utilityService.numberStringToFixed('12.345')).to.eq('12.345')
    })

    it('12.345, 0 decimals, returns 12', () => {
      expect(utilityService.numberStringToFixed('12.345', 0)).to.eq('12')
    })

    it('12.345, 2 decimals, returns 12.34', () => {
      expect(utilityService.numberStringToFixed('12.345', 2)).to.eq('12.34')
    })

    it('12.345, 4 decimals, returns 12.3450', () => {
      expect(utilityService.numberStringToFixed('12.345', 4)).to.eq('12.3450')
    })

    it('12, 2 decimals, returns 12.00', () => {
      expect(utilityService.numberStringToFixed('12', 2)).to.eq('12.00')
    })
  })

  describe('dateToPhantomStamp', () => {
    it('input ist not defined, returns null', () => {
      expect(utilityService.dateToPhantomStamp()).to.eq(null)
      expect(utilityService.dateToPhantomStamp(null)).to.eq(null)
    })

    it('input is phantom launch time, returns 0', () => {
      expect(utilityService.dateToPhantomStamp(PHANTOM_LAUNCH_DATE)).to.eq(0)
    })

    it('input is BEFORE phantom launch time, returns null', () => {
      expect(utilityService.dateToPhantomStamp(new Date(Date.UTC(2017, 2, 21, 12, 59, 59, 59)))).to.eq(null)
    })

    it('input is a utc date, returns correct timestamp', () => {
      expect(utilityService.dateToPhantomStamp(new Date(Date.UTC(2017, 10, 10, 10, 0, 0, 0)))).to.eq(20206800)
    })

    it('input is a local date, returns correct timestamp', () => {
      // since this is plus 1, this means that in UTC, it's currently 09:00, therefore the timestamphas to be 1 hour shorter than the one above
      const localDate = new Date('Fri Nov 10 2017 10:00:00 GMT+0100 (Romance Standard Time)')
      const oneHourInSeconds = 60 * 60
      expect(utilityService.dateToPhantomStamp(localDate)).to.eq(20206800 - oneHourInSeconds)
    })
  })

  describe('phantomStampToDate', () => {
    it('input ist not a number, returns null', () => {
      expect(utilityService.phantomStampToDate()).to.eq(null)
      expect(utilityService.phantomStampToDate(null)).to.eq(null)
      expect(utilityService.phantomStampToDate('abc')).to.eq(null)
      expect(utilityService.phantomStampToDate({})).to.eq(null)
    })

    it('input is 0, returns phantom launch date', () => {
      expect(utilityService.phantomStampToDate(0).getTime()).to.eq(PHANTOM_LAUNCH_DATE.getTime())
    })

    it('input is lower than 0, returns null', () => {
      expect(utilityService.phantomStampToDate(-1)).to.eq(null)
    })

    it('input is a normal timestamp, returns correct date', () => {
      expect(utilityService.phantomStampToDate(20206800).getTime()).to.eq(new Date(Date.UTC(2017, 10, 10, 10, 0, 0, 0)).getTime())
    })
  })
})
