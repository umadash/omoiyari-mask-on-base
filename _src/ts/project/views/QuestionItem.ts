const $ = jQuery;

export class QuestionItem {
  constructor($elm: JQuery) {
    this.$elm = $elm;

    this.init();
  }

  private init(): void {
    this.isOpened = false;
    this.$answer = this.$elm.find(".QuestionItem__answer");
    this.$state = this.$elm.find(".ExpandStateView");

    this.$elm.on("click", () => {
      if (this.getIsOpened()) {
        this.close();
      } else {
        this.open();
      }
    });

    this.resize();
  }

  public resize(): void {
    this.$answer.css({
      height: "auto"
    });
    this.answerHeight = this.$answer.outerHeight();
    this.$answer.css({
      height: 0
    });

    this.close();
  }

  private getIsOpened(): boolean {
    return this.isOpened;
  }

  public open(): void {
    this.$elm.addClass("opened");
    this.$state.addClass("close");
    this.$answer.css({
      height: this.answerHeight
    });
    this.isOpened = true;
  }

  public close(): void {
    this.$elm.removeClass("opened");
    this.$state.removeClass("close");
    this.$answer.css({
      height: 0
    });
    this.isOpened = false;
  }

  private $elm: JQuery;
  private $answer: JQuery;
  private $state: JQuery;
  private answerHeight: number;
  private isOpened: boolean;
}
