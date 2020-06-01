export default class GlobalHeader {
  private $elm: JQuery;
  private $btn: JQuery;
  private $nav: JQuery;

  constructor($elm: JQuery) {
    this.$elm = $elm;

    this.init();
  }

  private init(): void {
    this.$nav = this.$elm.find(".GlobalHeader__nav");

    this.$btn = this.$elm.find(".MenuBtn");
    this.$btn.on("click", () => {
      this.getIsOpened() ? this.close() : this.open();
    });
  }

  private getIsOpened(): boolean {
    return this.$btn.hasClass("close");
  }

  private open(): void {
    this.$btn.addClass("close");
    this.$nav.addClass("open");
  }

  private close(): void {
    this.$btn.removeClass("close");
    this.$nav.removeClass("open");
  }
}
