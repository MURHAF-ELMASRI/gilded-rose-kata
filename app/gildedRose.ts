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
          if (item.quality < 50) {
            const value = item.sellIn > 0 ? 1 : 2;
            item.quality = item.quality + value;
          }
          item.sellIn = item.sellIn - 1;
          break;
        case spacialItemName.backstage:
          if (item.quality < 50) {
            if (item.sellIn > 10) {
              item.quality = item.quality + 1;
            } else if (item.sellIn <= 10 && item.sellIn > 5) {
              item.quality = item.quality + 2;
            } else if (item.sellIn <= 5 && item.sellIn > 0) {
              item.quality = item.quality + 3;
            }
          }
          if (item.sellIn <= 0) {
            item.quality = 0;
          }
          item.sellIn = item.sellIn - 1;
          break;
        case spacialItemName.sulfuras:
          break;
        default:
          if (item.quality < 50) {
            const value = item.sellIn > 0 ? -1 : -2;
            item.quality = item.quality + value;
          }
          item.sellIn = item.sellIn - 1;
      }
    }

    return this.items;
  }
}
