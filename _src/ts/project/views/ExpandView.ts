const $ = jQuery;

export default class ExpandView {
  constructor($elm: JQuery) {
    this.$elm = $elm;

    this.init();
  }

  private init(): void {
    this.isOpened = false;
    this.$view = this.$elm.find(".ExpandView__view");
    this.$btn = this.$elm.find(".ExpandView__btn");

    this.$btn.on("click", () => {
      if (this.isOpened) {
        this.close();
      } else {
        this.open();
      }
    });

    this.resize();
  }

  public resize(): void {
    this.$view.css({
      height: "auto"
    });
    this.height = this.$view.outerHeight();
    this.$view.css({
      height: 0
    });

    this.close();
  }

  private getIsOpened(): boolean {
    return this.isOpened;
  }

  public open(): void {
    this.$elm.addClass("opened");
    this.$btn.addClass("close").text(this.$btn.attr("data-close"));

    this.$view.css({
      height: this.height
    });
    this.isOpened = true;
  }

  public close(): void {
    this.$elm.removeClass("opened");
    this.$btn.removeClass("close").text(this.$btn.attr("data-default"));
    this.$view.css({
      height: 0
    });
    this.isOpened = false;
  }

  private $elm: JQuery;
  private $view: JQuery;
  private $btn: JQuery;
  private height: number;
  private isOpened: boolean;
}
