import { GildedRose, Item } from "@/gilded-rose";
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
