import { GildedRose } from "@/gildedRose";
import { Item } from "@/Item";
import { expect } from "chai";

describe("Backstage passes", () => {
  it("should quality be zero after sellIn passes", () => {
    const day = 11;
    const gildedRose = new GildedRose([new Item("+5 Dexterity Vest", 10, 20)]);
    for (let i = 0; i < day; i++) {
      gildedRose.updateQuality();
    }
    expect(gildedRose.items[0].quality).to.equal(8);
    expect(gildedRose.items[0].sellIn).to.equal(-1);
  });
});
