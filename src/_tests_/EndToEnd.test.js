import puppeteer from 'puppeteer';

describe('show/hide event details', () => {
  let browser;
  let page;
  beforeAll(async () => {
    browser = await puppeteer.launch({
      //headless: false,
      //slowMo: 250, // slow down by 250 ms,
      //timeout: 0, // removes any puppeteer/browser timeout limitations (this isn't the same as the timeout of jest)
    });
    page = await browser.newPage();
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.event');
  });

  afterAll(() => {
    browser.close();
  });

  test('An event element is collapsed by default', async () => {
    const eventDetails = await page.$('.event .description'); //className on your element, page.$ method for selecting an element on the page
    expect(eventDetails).toBeNull();
  });

  test('User can expand an event to see details', async () => {
    await page.click('.event .details-btn');

    const eventDetails = await page.$('.event .description');
    expect(eventDetails).toBeDefined();
  });

  test('User can collapse an event to hide details', async () => {
    await page.click('.event .details-btn');
    const eventDetails = await page.$('.event .description');
    expect(eventDetails).toBeNull();
  });
});

describe('Filter events by city', () => {
  let browser;
  let page;
  let eventListItems;
  beforeAll(async () => {
    browser = await puppeteer.launch({
      //headless: false,
      //slowMo: 250, // slow down by 250 ms,
      //timeout: 0, // removes any puppeteer/browser timeout limitations (this isn't the same as the timeout of jest)
    });
    page = await browser.newPage();
    await page.goto('http://localhost:3000/');
    await page.waitForSelector('.event');
    eventListItems = await page.$$('.event');
  });

  afterAll(() => {
    browser.close();
  });

  test('When user hasn’t searched for a city, show upcoming events from all cities', async () => {
    expect(eventListItems).toHaveLength(32);
  });

  test('User should see a list of suggestions when they search for a city', async () => {
    await page.type('.city', 'Berlin');
    const suggestionListItems = await page.$$('.suggestions li');
    expect(suggestionListItems).toHaveLength(2);
  });

  test('User can select a city from the suggested list', async () => {
    await page.click('.suggestions li:first-child');
    const eventListItems = await page.$$('.event');
    expect(eventListItems).toHaveLength(18);
  });
});
