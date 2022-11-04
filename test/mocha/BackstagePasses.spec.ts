import { GildedRose } from "@/gildedRose";
import { Item } from "@/Item";
import { spacialItemName } from "@/spacialItemName";
import { expect } from "chai";

describe("Backstage passes", () => {
  it("should quality should drop to zero after sellIn pass", () => {
    const day = 11;
    const gildedRose = new GildedRose([
      new Item(spacialItemName.backstage, 10, 0),
    ]);
    for (let i = 0; i < day; i++) {
      gildedRose.updateQuality();
    }
    expect(gildedRose.items[0].quality).to.equal(0);
    expect(gildedRose.items[0].sellIn).to.equal(-1);
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

  it("should quality not exceed 50 ", () => {
    const day = 3;
    const gildedRose = new GildedRose([
      new Item(spacialItemName.backstage, 5, 50),
    ]);
    for (let i = 0; i < day; i++) {
      gildedRose.updateQuality();
    }
    expect(gildedRose.items[0].quality).to.equal(50);
    expect(gildedRose.items[0].sellIn).to.equal(2);
  });

  it("should quality increase by 1 if days > 10", () => {
    const day = 1;
    const gildedRose = new GildedRose([
      new Item("Backstage passes to a TAFKAL80ETC concert", 11, 1),
    ]);
    for (let i = 0; i < day; i++) {
      gildedRose.updateQuality();
    }
    expect(gildedRose.items[0].quality).to.equal(2);
    expect(gildedRose.items[0].sellIn).to.equal(10);
  });
});
