// For more information, see https://crawlee.dev/
import {PlaywrightCrawler} from 'crawlee';
import {randomUUID} from "node:crypto";

const startUrls = ['https://crawlee.dev'];

const crawler1 = new PlaywrightCrawler({
  maxRequestsPerCrawl: 1,
  async requestHandler({request, page, enqueueLinks, log}) {
    log.info(`title: ${await page.title()}`)
    await enqueueLinks({
      transformRequestFunction: (request) => {
        request.uniqueKey = `${request.url}:${randomUUID()}`;
        log.info(`request uniqueKey: ${request.uniqueKey}`)
        return request;
      },
    });
  }
});

console.log('start crawl1')
await crawler1.run(startUrls);

const crawler2 = new PlaywrightCrawler({
  maxRequestsPerCrawl: 1,
  async requestHandler({request, page, enqueueLinks, log}) {
    log.info(`title: ${await page.title()}`)
    await enqueueLinks({
      transformRequestFunction: (request) => {
        request.uniqueKey = `${request.url}:${randomUUID()}`;
        log.info(`request uniqueKey: ${request.uniqueKey}`)
        return request;
      },
    });
  }
});

console.log('start crawl2')
await crawler2.run(startUrls);
