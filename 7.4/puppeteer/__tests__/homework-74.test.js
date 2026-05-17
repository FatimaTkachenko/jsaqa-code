const puppeteer = require('puppeteer');

jest.setTimeout(30000);

describe('7.4 - Работа с таймаутами и хуками', () => {
  let browser;
  let page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      slowMo: 100,
    });
  });

  afterAll(async () => {
    await browser.close();
  });

  describe('Тесты для главной страницы', () => {
    beforeEach(async () => {
      page = await browser.newPage();
      await page.goto('https://qamid.tmweb.ru/client/index.php', {
        waitUntil: 'networkidle2',
      });
    });

    afterEach(async () => {
      await page.close();
    });

    test('Заголовок главной страницы содержит "ИдёмВКино"', async () => {
      const title = await page.title();
      expect(title).toContain('ИдёмВКино');
    }, 10000);
  });

  describe('Новые тесты для других страниц', () => {
    async function checkPageTitle(pageInstance, url, expectedText) {
      await pageInstance.goto(url, { waitUntil: 'networkidle2' });
      const title = await pageInstance.title();
      expect(title).toContain(expectedText);
    }

    beforeEach(async () => {
      page = await browser.newPage();
    });

    afterEach(async () => {
      await page.close();
    });

    test('Страница авторизации', async () => {
      await checkPageTitle(page, 'https://qamid.tmweb.ru/client/index.php?page=auth', 'ИдёмВКино');
    }, 10000);

    test('Страница расписания (главная)', async () => {
      await checkPageTitle(page, 'https://qamid.tmweb.ru/client/index.php', 'ИдёмВКино');
    }, 10000);

    test('404 страница', async () => {
      await page.goto('https://qamid.tmweb.ru/client/ne-sushchestvuet');
      const title = await page.title();
      expect(title).toBeDefined();
      expect(title.length).toBeGreaterThan(0);
    }, 10000);
  });
});