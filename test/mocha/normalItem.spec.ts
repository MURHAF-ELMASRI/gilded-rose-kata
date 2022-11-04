import { errors } from "@/errors";
import { GildedRose } from "@/gildedRose";
import { Item } from "@/Item";
import { expect } from "chai";

describe("Normal Items", () => {
  it("quality should decrease 2 times faster after sellIn pass", () => {
    const gildedRose = new GildedRose([new Item("+5 Dexterity Vest", 10, 20)]);
    for (let i = 0; i < 11; i++) {
      gildedRose.updateQuality();
    }
    expect(gildedRose.items[0].quality).to.equal(8);
    expect(gildedRose.items[0].sellIn).to.equal(-1);
  });

  it("quality should decrease by 1 before sellIn pass", () => {
    const gildedRose = new GildedRose([new Item("+5 Dexterity Vest", 10, 20)]);
    for (let i = 0; i < 5; i++) {
      gildedRose.updateQuality();
    }
    expect(gildedRose.items[0].quality).to.equal(15);
    expect(gildedRose.items[0].sellIn).to.equal(5);
  });

  it("The Quality of an item is never negative", () => {
    expect(
      () => new GildedRose([new Item("+5 Dexterity Vest", 10, -20)])
    ).to.throw(errors.qualityError);
  });

  it("quality should not be negative", () => {
    const day = 10;
    const gildedRose = new GildedRose([new Item("+5 Dexterity Vest", 10, 8)]);
    for (let i = 0; i < day; i++) {
      gildedRose.updateQuality();
    }
    expect(gildedRose.items[0].quality).to.equal(0);
    expect(gildedRose.items[0].sellIn).to.equal(0);
  });
});
