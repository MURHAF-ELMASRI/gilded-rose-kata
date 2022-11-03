import { GildedRose } from "@/gildedRose";
import { Item } from "@/Item";
import { spacialItemName } from "@/spacialItemName";
import { expect } from "chai";

describe("Aged Brie Item", () => {
  it("should increases in Quality the older it gets less than sellIn", () => {
    let day = 5;
    const gildedRose = new GildedRose([new Item(spacialItemName.aged, 5, 2)]);
    for (let i = 0; i < day; i++) {
      gildedRose.updateQuality();
    }
    expect(gildedRose.items[0].quality).to.equal(7);
    expect(gildedRose.items[0].sellIn).to.equal(0);
  });

  it("should increases in Quality 2 times after sellIn passes", () => {
    let day = 10;
    const gildedRose = new GildedRose([new Item(spacialItemName.aged, 5, 2)]);
    for (let i = 0; i < day; i++) {
      gildedRose.updateQuality();
    }
    expect(gildedRose.items[0].quality).to.equal(17);
    expect(gildedRose.items[0].sellIn).to.equal(-5);
  });

  it("should prevent quality increases greater than 50", () => {
    const gildedRose = new GildedRose([new Item(spacialItemName.aged, 0, 0)]);
    const day = 52;
    for (let i = 0; i < day; i++) {
      gildedRose.updateQuality();
    }
    expect(gildedRose.items[0].quality).to.equal(50);
    expect(gildedRose.items[0].sellIn).to.equal(-52);
  });
});
