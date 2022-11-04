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
    if (item.quality > 50) {
      item.sellIn = item.sellIn - 1;
      return item;
    }
    let incrementValue = 0;
    if (item.sellIn > 10) {
      incrementValue = 1;
    }
    if (item.sellIn <= 10 && item.sellIn > 5) {
      incrementValue = 2;
    }
    if (item.sellIn <= 5 && item.sellIn > 0) {
      incrementValue = 3;
    }
    if (item.quality + incrementValue < 50) {
      item.quality = item.quality + incrementValue;
    }
    item.sellIn = item.sellIn - 1;
    return item;
  }

  sulfurasRule(item: Item) {
    return item;
  }

  conjuredRule(item: Item) {
    let value = 0;
    if (item.quality < 50 && item.quality > 0) {
      value = item.sellIn > 0 ? -2 : -4;
      value = item.quality + value < 0 ? 0 : value;
    }

    item.quality = item.quality + value;
    item.sellIn = item.sellIn - 1;
    return item;
  }

  normalItemRule(item: Item) {
    let value = 0;
    if (item.quality < 50 && item.quality > 0) {
      value = item.sellIn > 0 ? -1 : -2;
      value = item.quality + value < 0 ? 0 : value;
    }

    item.quality = item.quality + value;
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
      let newItem: Item;
      switch (item.name) {
        case spacialItemName.agedBrie: {
          newItem = this.agedBrieRule(item);
          break;
        }
        case spacialItemName.backstage: {
          newItem = this.backstageRule(item);
          break;
        }
        case spacialItemName.sulfuras: {
          newItem = this.sulfurasRule(item);
          break;
        }
        case spacialItemName.conjured: {
          newItem = this.conjuredRule(item);
          break;
        }
        default: {
          newItem = this.normalItemRule(item);
        }
      }
      item[i] = newItem;
    }

    return this.items;
  }
}
