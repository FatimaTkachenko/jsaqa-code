let page;

describe("Github Team page tests", () => {
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("https://github.com/team");
  });

  afterEach(() => {
    page.close();
  });

  test("The h1 header content'", async () => {
    await page.waitForSelector('h1');
    const title2 = await page.title();
    expect(title2).toEqual('GitHub for teams · Build like the best teams on the planet · GitHub');
  });

  test("The first link attribute", async () => {
    const actual = await page.$eval("a", link => link.getAttribute('href') );
    expect(actual).toEqual("#start-of-content");
  });

  test("The page contains Sign in button", async () => {
    const btnSelector = ".btn-large-mktg.btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, link => link.textContent);
    expect(actual).toContain("Get started with Team")
  });
});

describe("Github About page tests", () => {
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("https://github.com/about");
  });

  afterEach(() => {
    page.close();
  });

  test("The h1 header content on About page", async () => {
    await page.waitForSelector('h1');
    const title = await page.title();
    expect(title).toEqual('About GitHub · GitHub');
  });

  test("The page contains h1 with search text", async () => {
    const h1Text = await page.$eval('h1', el => el.textContent);
    expect(h1Text).toContain("Search code, repositories, users, issues, pull requests");
  });
});

describe("Github Pricing page tests", () => {
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("https://github.com/pricing");
  });

  afterEach(() => {
    page.close();
  });

  test("The h1 header content on Pricing page", async () => {
    await page.waitForSelector('h1');
    const title = await page.title();
    expect(title).toEqual('Pricing · Plans for every developer · GitHub');
  });

  test("The page contains Start free button", async () => {
    const btnSelector = ".btn-mktg";
    await page.waitForSelector(btnSelector, {
      visible: true,
    });
    const actual = await page.$eval(btnSelector, link => link.textContent);
    expect(actual).toContain("Start free")
  });
});