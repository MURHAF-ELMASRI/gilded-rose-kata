import { GildedRose } from "../app/gildedRose";
import { data } from "./data";

const gildedRose = new GildedRose(data);

let days: number = 2;
if (process.argv.length > 2) {
  days = +process.argv[2];
}

for (let i = 0; i < days; i++) {
  console.log("-------- day " + i + " --------");
  console.log("name, sellIn, quality");
  data.forEach((element) => {
    console.log(element.name + " " + element.sellIn + " " + element.quality);
  });
  console.log();
  gildedRose.updateQuality();
}
