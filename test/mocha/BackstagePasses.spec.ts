import { GildedRose } from "@/gildedRose";
import { Item } from "@/Item";
import { spacialItemName } from "@/spacialItemName";
import { expect } from "chai";

describe("Backstage passes", () => {
  it("should quality should drop to zero after sellIn pass", () => {
    const day = 10;
    const gildedRose = new GildedRose([
      new Item(spacialItemName.backstage, 10, 0),
    ]);
    for (let i = 0; i < day; i++) {
      gildedRose.updateQuality();
    }
    expect(gildedRose.items[0].quality).to.equal(25);
    expect(gildedRose.items[0].sellIn).to.equal(0);
  });

  it("should quality increases by 2 if 10 <= days< 5 ", () => {
    const day = 10;
    const gildedRose = new GildedRose([
      new Item(spacialItemName.backstage, 19, 0),
    ]);
    for (let i = 0; i < day; i++) {
      gildedRose.updateQuality();
    }
    expect(gildedRose.items[0].quality).to.equal(11);
    expect(gildedRose.items[0].sellIn).to.equal(9);
  });

  it("should quality increases by 3 if 5 <= days < 0 ", () => {
    const day = 1;
    const gildedRose = new GildedRose([
      new Item(spacialItemName.backstage, 1, 0),
    ]);
    for (let i = 0; i < day; i++) {
      gildedRose.updateQuality();
    }
    expect(gildedRose.items[0].quality).to.equal(3);
    expect(gildedRose.items[0].sellIn).to.equal(0);
  });
});
