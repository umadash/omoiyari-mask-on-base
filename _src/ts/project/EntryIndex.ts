const $ = jQuery;
const _ = require("lodash");

import Slideshow from "../project/views/Slideshow";

export class EntryIndex {
  private slideshows: Slideshow[] = [];
  constructor() {}

  public run(): void {
    const $slideshows = $(".Slideshow");
    if ($slideshows.length > 0) {
      $slideshows.each((index: number, element: HTMLElement) => {
        const s: Slideshow = new Slideshow($(element));
        this.slideshows.push(s);
      });
    }
  }
}
