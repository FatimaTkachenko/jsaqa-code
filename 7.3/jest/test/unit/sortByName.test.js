const { sortByName } = require("../../app.js");

describe("Books names test suit", () => {
  it("Books names should be sorted in ascending order", () => {
    expect(
      sortByName([
        "Гарри Поттер",
        "Властелин Колец",
        "Волшебник изумрудного города",
      ])
    ).toEqual([
      "Властелин Колец",
      "Волшебник изумрудного города",
      "Гарри Поттер",
    ]);
  });

  it("Names equal — order should not change", () => {
    const input = ["Иван", "Иван", "Анна"];
    const expected = ["Анна", "Иван", "Иван"];
    const result = sortByName([...input]);
    expect(result).toEqual(expected);
  });
});