import { EventDispatcher } from "../../umadash.js/events/EventDispatcher";
import SegmentedControl, { ISegmentedControlData } from "./SegmentedControl";
import Event from "../../umadash.js/events/Event";

const $ = jQuery;

export default class SegmentedView extends EventDispatcher {
  constructor($elm: JQuery) {
    super();

    this.$elm = $elm;
    this.prevIndex = -1;

    this.init();
  }

  private init(): void {
    this.$views = this.$elm.find(".SegmentedView__views").children();
    const $control: JQuery = this.$elm.find(".SegmentedControl");
    if ($control.length > 0) {
      this.control = new SegmentedControl($control);
      this.control.addEventListener(SegmentedControl.Change, (e: Event<ISegmentedControlData>) => {
        const index: number = e.getData().index;
        this.showAt(index);
      });
      this.control.changeAt(0);
    } else {
      this.showAt(0);
    }
  }

  private showAt(index: number) {
    this.$views.removeClass("show");
    const $nextView: JQuery = this.$views.eq(index);
    $nextView.addClass("show");
    this.prevIndex = index;
  }

  public resize(): void {
    if (this.control) {
      this.control.resize();
    }
  }

  private $elm: JQuery;
  private $views: JQuery;
  private control: SegmentedControl;
  private prevIndex: number;
}
