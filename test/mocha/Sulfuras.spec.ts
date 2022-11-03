import { errors } from "@/errors";
import { GildedRose } from "@/gildedRose";
import { Item } from "@/Item";
import { spacialItemName } from "@/spacialItemName";
import { expect } from "chai";

describe("Sulfuras Item", () => {
  it("should quality always be 80", () => {
    let day = 5;
    const gildedRose = new GildedRose([
      new Item(spacialItemName.sulfuras, 5, 80),
    ]);
    for (let i = 0; i < day; i++) {
      gildedRose.updateQuality();
    }
    expect(gildedRose.items[0].quality).to.equal(80);
  });

  it("throw error for quality different than 80", () => {
    expect(
      () => new GildedRose([new Item(spacialItemName.sulfuras, 5, 2)])
    ).to.throw(errors.qualityError);
  });

  it("should sellIn be constant", () => {
    let day = 5;
    const gildedRose = new GildedRose([
      new Item(spacialItemName.sulfuras, 5, 80),
    ]);
    for (let i = 0; i < day; i++) {
      gildedRose.updateQuality();
    }
    expect(gildedRose.items[0].quality).to.equal(80);
    expect(gildedRose.items[0].sellIn).to.equal(5);
  });
});
