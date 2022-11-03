import { GildedRose } from "@/gildedRose";
import { Item } from "@/Item";
import { expect } from "chai";

describe("Aged Brie Item", () => {
  it("should increases in Quality the older it gets less than sellIn", () => {
    let day = 5;
    const gildedRose = new GildedRose([new Item("Aged Brie", 5, 2)]);
    for (let i = 0; i < day; i++) {
      gildedRose.updateQuality();
    }
    expect(gildedRose.items[0].quality).to.equal(7);
    expect(gildedRose.items[0].sellIn).to.equal(0);
  });

  it("should increases in Quality 2 times after sellIn passes", () => {
    let day = 10;
    const gildedRose = new GildedRose([new Item("Aged Brie", 5, 2)]);
    for (let i = 0; i < day; i++) {
      gildedRose.updateQuality();
    }
    expect(gildedRose.items[0].quality).to.equal(17);
    expect(gildedRose.items[0].sellIn).to.equal(-5);
  });

  it("should prevent quality increases greater than 50", () => {
    const gildedRose = new GildedRose([new Item("Aged Brie", 0, 0)]);
    for (let day = 0; day < 52; day++) {
      gildedRose.updateQuality();
    }
    expect(gildedRose.items[0].quality).to.equal(50);
    expect(gildedRose.items[0].sellIn).to.equal(-52);
  });
});