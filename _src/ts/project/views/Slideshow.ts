export default class Slideshow {
  private $elm: JQuery;
  private $content: JQuery;
  private $thumbs: JQuery;

  constructor($elm: JQuery) {
    this.$elm = $elm;

    this.init();
  }

  private init(): void {
    // GET DOM
    this.$content = this.$elm.find(".Slideshow__content");
    this.$thumbs = this.$elm.find(".Slideshow__thumbs");

    // 画像のURLが入っている
    const srcs: string[] = this.$elm
      .attr("data-srcs")
      .split(",")
      .filter((value: string) => {
        return !!value;
      });
    console.log(srcs);
  }
}
