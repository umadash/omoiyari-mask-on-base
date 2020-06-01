const $ = jQuery;
const _ = require("lodash");

import Slideshow from "../project/views/Slideshow";
import GlobalHeader from "./views/GlobalHeader";

export class EntryIndex {
  private header: GlobalHeader;
  private slideshows: Slideshow[] = [];
  constructor() {}

  public run(): void {
    this.header = new GlobalHeader($("#GlobalHeader"));

    const $slideshows = $(".Slideshow");
    if ($slideshows.length > 0) {
      $slideshows.each((index: number, element: HTMLElement) => {
        const s: Slideshow = new Slideshow($(element));
        this.slideshows.push(s);
      });
    }
  }
}
