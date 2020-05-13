import { EventDispatcher } from "../../umadash.js/events/EventDispatcher";

const $ = jQuery;

export default class SegmentedControl extends EventDispatcher {
  constructor($elm: JQuery) {
    super();

    this.$elm = $elm;

    this.init();
  }

  private init(): void {
    this.$tab = this.$elm.find(".SegmentedControl__tab");

    this.$btns = this.$elm.find(".SegmentedControl__items").children();

    this.$btns.on("click", e => {
      const $target: JQuery = $(e.currentTarget);
      const index: number = parseInt($target.attr("data-index"), 10);
      this.changeAt(index);
    });

    this.currentIndex = -1;
  }

  public changeAt(index: number): void {
    if (this.currentIndex === index) return;

    this.moveAt(index);
    this.dispatchEventType<ISegmentedControlData>(SegmentedControl.Change, this, { index });
    this.currentIndex = index;
  }

  public resize(): void {
    this.moveAt(this.currentIndex);
  }

  private moveAt(index: number): void {
    const $target: JQuery = this.$btns.eq(index);
    const width: number = $target.outerWidth();
    const left: number = $target.position().left;

    this.$btns.removeClass("current");
    $target.addClass("current");

    this.$tab.css({
      width,
      transform: `translate(${left}px, 0)`
    });
  }

  private $elm: JQuery;
  private $tab: JQuery;
  private $btns: JQuery;
  private currentIndex: number;
  public static Change: string = "change";
}

export interface ISegmentedControlData {
  index: number;
}
