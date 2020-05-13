const $ = jQuery;

export class TargetAnchors {
  constructor($element: JQuery) {
    this.$items = $element.children();

    this.prevIndex = -1;
  }

  public setCurrentIndex(index: number): void {
    if (this.prevIndex === index) return;

    if (this.prevIndex !== -1) {
      this.$items.eq(this.prevIndex).removeClass("current");
    }
    this.$items.eq(index).addClass("current");

    this.prevIndex = index;
  }

  private $items: JQuery;
  private prevIndex: number;
}
