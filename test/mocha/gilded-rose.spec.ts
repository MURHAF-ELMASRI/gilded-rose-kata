import { GildedRose } from "@/gildedRose";
import { Item } from "@/Item";
import { expect } from "chai";

describe("common rules for all product", () => {
  it("should foo", () => {
    const gildedRose = new GildedRose([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal("foo");
  });

  it("should items be for empty collection", () => {
    const gildedRose = new GildedRose();
    const items = gildedRose.updateQuality();
    expect(items).to.deep.equal([]);
  });

  it("item has SellIn, Quality and name properties", () => {
    const gildedRose = new GildedRose([new Item("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0]).to.have.property("name");
    expect(items[0]).to.have.property("quality");
    expect(items[0]).to.have.property("sellIn");
  });
});
/**
 * new Item("+5 Dexterity Vest", 10, 20),
  new Item("Elixir of the Mongoose", 5, 7),
 */

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
});
