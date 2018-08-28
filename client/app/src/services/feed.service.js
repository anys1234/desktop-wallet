;(function () {
  'use strict'

  angular.module('phantomclient.services')
    .service('feedService', [FeedService])

  function FeedService () {
    return {
      /**
       * Fetches and parses the RSS of an URL
       */
      fetchAndParse (url) {
        const rssParser = require('rss-parser')

        return new Promise((resolve, reject) => {
          rssParser.parseURL(url, (err, parsed) => {
            err ? reject(err) : resolve(parsed)
          })
        })
      },

      /**
       * Fetches and parses the RSS of PHANTOM.io
       */
      fetchBlogEntries () {
        const rssUrl = 'https://blog.phantom.org/feed'
        return this.fetchAndParse(rssUrl).then(parsed => parsed.feed.entries)
      }
    }
  }
})()
