import { errors } from "./errors";
import { Item } from "./Item";
import { spacialItemName } from "./spacialItemName";

export class GildedRose {
  items: Array<Item>;

  checkItemsAllowed(items: Array<Item>) {
    return items.every((item) => {
      if (item.quality < 0) {
        return false;
      }
      if (item.name === "Sulfuras, Hand of Ragnaros") {
        return item.quality === 80;
      }

      return true;
    });
  }
  agedBrieRule(item: Item) {
    if (item.quality < 50) {
      const value = item.sellIn > 0 ? 1 : 2;
      item.quality = item.quality + value;
    }
    item.sellIn = item.sellIn - 1;
    return item;
  }

  backstageRule(item: Item) {
    if (item.sellIn <= 0) {
      item.quality = 0;
      item.sellIn = item.sellIn - 1;
      return item;
    }
    if (item.quality < 50) {
      return item;
    }
    if (item.sellIn > 10) {
      item.quality = item.quality + 1;
    }
    if (item.sellIn <= 10 && item.sellIn > 5) {
      item.quality = item.quality + 2;
    }
    if (item.sellIn <= 5 && item.sellIn > 0) {
      item.quality = item.quality + 3;
    }

    return item;
  }

  sulfurasRule(item: Item) {
    return item;
  }

  normalItemRule(item: Item) {
    if (item.quality < 50) {
      const value = item.sellIn > 0 ? -1 : -2;
      item.quality = item.quality + value;
    }
    item.sellIn = item.sellIn - 1;
    return item;
  }

  constructor(items = [] as Array<Item>) {
    if (!this.checkItemsAllowed(items)) {
      throw new Error(errors.qualityError);
    }
    this.items = items;
  }
  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];
      switch (item.name) {
        case spacialItemName.agedBrie:
          this.agedBrieRule(item);
          break;
        case spacialItemName.backstage:
          this.backstageRule(item);
          break;
        case spacialItemName.sulfuras:
          this.sulfurasRule(item);
          break;
        default:
          this.normalItemRule(item);
      }
    }

    return this.items;
  }
}
