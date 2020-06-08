const $ = jQuery;
const _ = require("lodash");

import Slideshow from "../project/views/Slideshow";
import MainSlideshow from "../project/views/MainSlideshow";
import GlobalHeader from "./views/GlobalHeader";

export class EntryIndex {
  private header: GlobalHeader;
  private mainSlideshows: MainSlideshow[] = [];
  private slideshows: Slideshow[] = [];
  constructor() {}

  public run(): void {
    this.header = new GlobalHeader($("#GlobalHeader"));

    const $mainSlideshows = $(".MainSlideshow");
    if ($mainSlideshows.length > 0) {
      $mainSlideshows.each((index: number, element: HTMLElement) => {
        const s: MainSlideshow = new MainSlideshow($(element));
        s.start();
        this.mainSlideshows.push(s);
      });
    }

    const $slideshows = $(".Slideshow");
    if ($slideshows.length > 0) {
      $slideshows.each((index: number, element: HTMLElement) => {
        const s: Slideshow = new Slideshow($(element));
        this.slideshows.push(s);
      });
    }
  }
}
