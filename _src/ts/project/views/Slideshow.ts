export default class Slideshow {
  private $elm: JQuery;
  private $content: JQuery;
  private $thumbs: JQuery;
  private $btns: JQuery;
  private srcs: string[];

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
    this.srcs = srcs;
    console.log(srcs);

    // 画像の数だけ、サムネイルを生成する
    let thumbs = "";
    for (let i = 0; i < this.srcs.length; i++) {
      const src: string = this.srcs[i];
      thumbs += `<button data-index="${i}" class="BtnThumb" style="background-image:url(${src})"></button>`;
      thumbs += `<button data-index="${i}" class="BtnThumb" style="background-image:url(${src})"></button>`;
      thumbs += `<button data-index="${i}" class="BtnThumb" style="background-image:url(${src})"></button>`;
      thumbs += `<button data-index="${i}" class="BtnThumb" style="background-image:url(${src})"></button>`;
      thumbs += `<button data-index="${i}" class="BtnThumb" style="background-image:url(${src})"></button>`;
      thumbs += `<button data-index="${i}" class="BtnThumb" style="background-image:url(${src})"></button>`;
      thumbs += `<button data-index="${i}" class="BtnThumb" style="background-image:url(${src})"></button>`;
      thumbs += `<button data-index="${i}" class="BtnThumb" style="background-image:url(${src})"></button>`;
      thumbs += `<button data-index="${i}" class="BtnThumb" style="background-image:url(${src})"></button>`;
      thumbs += `<button data-index="${i}" class="BtnThumb" style="background-image:url(${src})"></button>`;
      thumbs += `<button data-index="${i}" class="BtnThumb" style="background-image:url(${src})"></button>`;
      thumbs += `<button data-index="${i}" class="BtnThumb" style="background-image:url(${src})"></button>`;
      thumbs += `<button data-index="${i}" class="BtnThumb" style="background-image:url(${src})"></button>`;
      thumbs += `<button data-index="${i}" class="BtnThumb" style="background-image:url(${src})"></button>`;
      thumbs += `<button data-index="${i}" class="BtnThumb" style="background-image:url(${src})"></button>`;
      thumbs += `<button data-index="${i}" class="BtnThumb" style="background-image:url(${src})"></button>`;
    }
    this.$thumbs.html(thumbs);

    const $btns = $(".BtnThumb");
    $btns.on("click", (e) => {
      const $target = $(e.target);
      const index = parseInt($target.attr("data-index"), 10);
      this.changeAt(index);
    });
    this.$btns = $btns;

    this.changeAt(0);
  }

  private changeAt(index: number): void {
    const src = this.srcs[index];
    this.$content.css({
      backgroundImage: `url(${src})`,
    });

    const currentClassName = "current";
    this.$btns.removeClass(currentClassName);
    this.$btns.eq(index).addClass(currentClassName);
  }
}
