const $ = jQuery;
const _ = require("lodash");

export class NewsTable {
  constructor($elm: JQuery, interval: number = 5000) {
    this.$elm = $elm;
    this.interval = interval;

    this.init();
  }

  private init(): void {
    this.$cells = this.$elm.find(".NewsTableCell");
    this.$contents = this.$cells.find(".NewsTableCell__content");
    this.$arrow = this.$elm.find(".NewsTable__arrow");
    this.$img = this.$elm.find(".NewsTable__img");
    this.$tag = this.$elm.find(".NewsTable__tag");
    this.$link = this.$elm.find(".NewsTable__link");
    this.$items = this.$elm.find(".NewsTable__scroller");

    this.length = this.$cells.length;
    this.timer = -1;
    this.currentIndex = -1;
    this.arrowTop = 0;

    this.$contents.on("mouseenter", e => {
      const $target: JQuery = $(e.target);
      const index: number = parseInt($target.attr("data-index"), 10);
      this.changeAt(index);
    });

    this.$items.on(
      "scroll",
      _.debounce(e => {
        this.changeAt(this.currentIndex);
      }, 200)
    );
  }

  public start(): void {
    this.stop();

    const newsData: INewsData = this.getNewsDataFromCell(++this.currentIndex);

    this.loadImage(
      newsData.img,
      () => {
        // タイマー開始
        this.update(newsData);
        this.startTimer();
      },
      () => {
        // タイマー開始
        this.update(newsData);
        this.startTimer();
      }
    );
  }

  public stop(): void {
    this.stopTimer();
    this.cancelLoadImage();
  }

  private cancelLoadImage(): void {
    if (this.loader) {
      this.loader.src = "";
      this.loader.onload = null;
      this.loader.onerror = null;
    }
  }

  private startTimer(): void {
    this.stopTimer();
    this.timer = window.setTimeout(this.startTimerHandler, this.interval);
  }

  private stopTimer(): void {
    window.clearTimeout(this.timer);
  }

  private getNewsDataFromCell(index: number): INewsData {
    const $cell = this.$cells.eq(index);
    const src: string = $cell.attr("data-src");
    const img: string = $cell.attr("data-img");
    const category: string = $cell.attr("data-category");
    const top: number = $cell.position().top;
    return {
      src,
      img,
      category,
      top
    };
  }

  private startTimerHandler = () => {
    this.next();
  };

  private update(newsData: INewsData): void {
    this.$img.css({
      "background-image": `url(${newsData.img})`
    });

    this.$tag.text(newsData.category);

    if (newsData.src) {
      this.$link.show().attr("href", newsData.src);
    } else {
      this.$link.hide();
    }

    this.arrowTop = newsData.top;
    this.udpateArrowPosition();
  }

  private udpateArrowPosition(): void {
    const adjust: number = 10;
    this.$arrow.css({
      transform: `translate(0, ${this.arrowTop + adjust}px)`
    });
  }

  private loadImage(src: string, onComplete: () => void, onError: () => void): void {
    this.cancelLoadImage();

    const image: HTMLImageElement = new Image();
    image.onload = onComplete;
    image.onerror = onError;
    image.src = src;
    this.loader = image;
  }

  private next(): void {
    let nextIndex: number = this.currentIndex + 1;
    if (nextIndex >= this.length) {
      nextIndex = 0;
    }
    this.changeAt(nextIndex);
  }

  private changeAt(index: number): void {
    this.stopTimer();

    const newsData: INewsData = this.getNewsDataFromCell(index);
    this.currentIndex = index;

    this.loadImage(
      newsData.img,
      () => {
        this.update(newsData);
        this.startTimer();
      },
      () => {
        // 失敗した
        this.update(newsData);
        this.startTimer();
      }
    );
  }

  private loader: HTMLImageElement;
  private timer: number;
  private currentIndex: number;
  private interval: number;
  private length: number;
  private $elm: JQuery;
  private $cells: JQuery;
  private $contents: JQuery;
  private $arrow: JQuery;
  private $img: JQuery;
  private $tag: JQuery;
  private $link: JQuery;
  private $items: JQuery;

  private arrowTop: number;
}

interface INewsData {
  src: string;
  img: string;
  category: string;
  top: number;
}
