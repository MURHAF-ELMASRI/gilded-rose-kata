import { GildedRose } from "@/gildedRose";
import { Item } from "@/Item";
import { spacialItemName } from "@/spacialItemName";
import { expect } from "chai";

describe("Conjured Items", () => {
  it("should quality degrades 2 time faster", () => {
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
});
