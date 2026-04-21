let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.goto("https://github.com/team");
});

describe("Github page tests", () => {
  afterEach(async () => {
    await page.close();
  });

  // ЗАДАЧА 1: Per-test таймауты (✅ РАБОТАЕТ!)
  test("The h1 header content", async () => {
    await page.setDefaultTimeout(15000);
    const firstLink = await page.$("header div div a");
    await firstLink.click();
    await page.waitForSelector('h1');
    const title2 = await page.title();
    expect(title2).toContain('GitHub');
  }, 30000);

  test("The first link attribute", async () => {
    await page.setDefaultTimeout(10000);
    const actual = await page.$eval("a", link => link.getAttribute('href'));
    expect(actual).toEqual("#start-of-content");
  }, 20000);

  test("The page contains Sign in button", async () => {
    await page.setDefaultTimeout(15000);
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, { visible: true });
    const actual = await page.$eval(btnSelector, link => link.textContent);
    expect(actual).toContain("Get started");
  }, 30000);
});

// ЗАДАЧА 2: НОВЫЕ ТЕСТЫ (СВОИ хуки ВНУТРИ describe!)
describe("Github другие страницы", () => {
  let newPage;

  beforeEach(async () => {
    newPage = await browser.newPage();
  });

  afterEach(async () => {
    await newPage.close();
  });

  test("Pricing page title", async () => {
    await newPage.setDefaultTimeout(15000);
    await newPage.goto("https://github.com/pricing", { waitUntil: 'domcontentloaded' });
    await newPage.waitForTimeout(2000);  // Пауза для загрузки
    const title = await newPage.title();
    expect(title).toContain('Pricing');
  }, 40000);

  test("Features page title", async () => {
    await newPage.setDefaultTimeout(15000);
    await newPage.goto("https://github.com/features", { waitUntil: 'domcontentloaded' });
    await newPage.waitForTimeout(2000);
    const title = await newPage.title();
    expect(title).toContain('GitHub');
  }, 40000);

  test("About page title", async () => {
    await newPage.setDefaultTimeout(15000);
    await newPage.goto("https://github.com/about", { waitUntil: 'domcontentloaded' });
    await newPage.waitForTimeout(2000);
    const title = await newPage.title();
    expect(title).toContain('GitHub');
  }, 40000);
});