import { GildedRose } from "@/gildedRose";
import { Item } from "@/Item";
import { spacialItemName } from "@/spacialItemName";
import { expect } from "chai";

describe("Conjured Items", () => {
  it("should quality degrades 2 time faster before sellIn passes", () => {
    const day = 5;
    const gildedRose = new GildedRose([
      new Item(spacialItemName.conjured, 5, 10),
    ]);
    for (let i = 0; i < day; i++) {
      gildedRose.updateQuality();
    }
    expect(gildedRose.items[0].quality).to.equal(0);
    expect(gildedRose.items[0].sellIn).to.equal(0);
  });

  it("should quality degrades 4 time faster after sellIn passes", () => {
    const day = 3;
    const gildedRose = new GildedRose([
      new Item(spacialItemName.conjured, 2, 10),
    ]);
    for (let i = 0; i < day; i++) {
      gildedRose.updateQuality();
    }
    expect(gildedRose.items[0].quality).to.equal(2);
    expect(gildedRose.items[0].sellIn).to.equal(-1);
  });

  it("should quality not be negative", () => {
    const day = 7;
    const gildedRose = new GildedRose([
      new Item(spacialItemName.conjured, 5, 10),
    ]);
    for (let i = 0; i < day; i++) {
      gildedRose.updateQuality();
    }
    expect(gildedRose.items[0].quality).to.equal(0);
    expect(gildedRose.items[0].sellIn).to.equal(-2);
  });
});
