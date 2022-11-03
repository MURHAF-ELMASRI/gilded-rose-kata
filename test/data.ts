import { Item } from "@/Item";

export const data = [
  //normal Item
  new Item("+5 Dexterity Vest", 10, 20),
  new Item("Elixir of the Mongoose", 5, 7),
  //aged Brie item
  new Item("Aged Brie", 2, 0),
  //Sulfuras Brie item
  new Item("Sulfuras, Hand of Ragnaros", 0, 80),
  new Item("Sulfuras, Hand of Ragnaros", -1, 80),
  //Backstage Item
  new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
  new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
  new Item("Backstage passes to a TAFKAL80ETC concert", 5, 49),
  //conjured
  new Item("Conjured Mana Cake", 3, 6),
];
