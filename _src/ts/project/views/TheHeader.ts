import { EventDispatcher } from "../../umadash.js/events/EventDispatcher";
import Event from "../../umadash.js/events/Event";
import Command from "../../umadash.js/commands/Command";
import CommandUtil from "../../umadash.js/commands/CommandUtil";
import Func from "../../umadash.js/commands/Func";
import Wait from "../../umadash.js/commands/Wait";

const $ = jQuery;

export default class TheHeader {
  private constructor() {
    this.$elm = $("#header");
    this.$bottom = this.$elm.find(".GlobalHeader__bottom");
    this.$menu = this.$elm.find(".GlobalHeader__menu");
    this.$nav = this.$elm.find(".GlobalHeader__nav");
    this.currentColor = "";
    this.currentNavigationItem = null;
  }

  public static getInstance(): TheHeader {
    if (!this.instance) {
      this.instance = new TheHeader();
    }
    return this.instance;
  }

  public setup(): void {
    this.items = [];
    const $items = $(".GlobalNavigationItem");
    const $navs = $(".GlobalHeaderBottomNav");

    this.$elm.on("mouseleave", () => {
      if (this.currentNavigationItem) {
        this.hideBottom();
        this.currentNavigationItem.hideNav();
        this.currentNavigationItem = null;
      }
    });

    this.$menu.on("click", () => {
      const cls: string = "close";
      if (this.$menu.hasClass(cls)) {
        this.close();
      } else {
        this.open();
      }
    });

    if ($items.length > 0) {
      $items.each((index: number, element: HTMLElement) => {
        const item: GlobalNavigationItem = new GlobalNavigationItem($(element), $navs.eq(index));
        item.addEventListener(GlobalNavigationItem.Enter, (e: Event) => {
          if (this.currentNavigationItem) {
            this.currentNavigationItem.hideNav();
          }
          this.currentNavigationItem = e.getTarget() as GlobalNavigationItem;

          const data: IGlobalNavigationItemData = e.getData();
          this.showBottom(data.color);
        });
        this.items.push(item);
      });
    }

    this.resize();
  }

  public open(): void {
    const cls: string = "close";
    this.$menu.addClass(cls);
    this.$nav.removeClass("hidden");
  }

  public close(): void {
    const cls: string = "close";
    this.$menu.removeClass(cls);
    this.$nav.addClass("hidden");
  }

  private fix(enable: boolean): void {
    if (enable) {
      this.scrollTop = window.scrollY;

      $("#Wrapper")
        .addClass("fix")
        .css({
          top: -this.scrollTop
        });
    } else {
      if (this.fixCommand) {
        this.fixCommand.interrupt();
        this.fixCommand = null;
      }

      this.fixCommand = this.getFixCommand(true);
    }
  }

  private fixCommand: Command;

  private getFixCommand(execute: boolean): Command {
    return CommandUtil.serial(
      [
        new Func(() => {
          $("#Wrapper")
            .removeClass("fix")
            .css({
              top: "unset"
            });
        }),
        new Wait(1),
        new Func(() => {
          window.scrollTo(0, this.scrollTop);
        })
      ],
      execute
    );
  }

  private showBottom(color): void {
    if (this.currentColor) {
      this.$bottom.removeClass(this.currentColor);
    }
    this.$bottom.removeClass("hidden").addClass(color);
    this.currentColor = color;
  }

  private hideBottom(): void {
    this.$bottom.addClass("hidden");
  }

  public resize(): void {
    const windowWidth: number = window.innerWidth;

    for (let i: number = 0; i < this.items.length; i++) {
      const item: GlobalNavigationItem = this.items[i];
      item.resize(windowWidth);
    }
  }

  private static instance: TheHeader;

  private $elm: JQuery;
  private $bottom: JQuery;
  private $menu: JQuery;
  private $nav: JQuery;
  private items: GlobalNavigationItem[];
  private currentNavigationItem: GlobalNavigationItem;
  private currentColor: string;
  private scrollTop: number;
}

class GlobalNavigationItem extends EventDispatcher {
  constructor($elm: JQuery, $nav: JQuery) {
    super();
    this.$elm = $elm;
    this.$nav = $nav;
    this.color = $elm.attr("data-color");
    this.$main = $elm.find(".GlobalNavigationItem__main");
    this.$links = $elm.find(".GlobalNavigationItem__links");
    this.$stateView = $elm.find(".ExpandStateView");

    this.init();
  }

  private init(): void {
    this.isOpened = false;

    this.$elm.on("mouseenter", e => {
      this.dispatchEventType<IGlobalNavigationItemData>(GlobalNavigationItem.Enter, this, { color: this.color });
      this.showNav();
      this.$elm.addClass("hover");
    });

    this.$main.on("click", () => {
      if (this.isOpened) {
        this.close();
      } else {
        this.open();
      }
    });

    this.hideNav();
  }

  public showNav(): void {
    this.$nav.css({
      opacity: 1,
      "pointer-events": "auto"
    });
  }

  public hideNav(): void {
    this.$nav.css({
      opacity: 0,
      "pointer-events": "none"
    });
    this.$elm.removeClass("hover");
  }

  public open(): void {
    this.$links.css({
      height: this.autoHeight
    });
    this.$stateView.addClass("close");

    this.isOpened = true;
  }

  public close(): void {
    this.$links.css({
      height: 0
    });
    this.$stateView.removeClass("close");

    this.isOpened = false;
  }

  public resize(windowWidth: number): void {
    if (this.resizeCommand) {
      this.resizeCommand.interrupt();
      this.resizeCommand = null;
    }
    this.resizeCommand = this.getResizeCommand(windowWidth, true);
  }

  public getResizeCommand(windowWidth: number, execute: boolean): Command {
    return CommandUtil.serial(
      [
        new Func(() => {
          this.$nav.removeClass("absolute");

          this.$links.css({
            height: "auto"
          });
          this.autoHeight = this.$links.outerHeight();
        }),
        new Wait(1),
        new Func(() => {
          this.$links.css({
            height: 0
          });

          const parentLeft: number = this.$elm.offset().left;
          const parentWidth: number = this.$elm.outerWidth();
          const childWidth: number = this.$nav.outerWidth();

          this.$nav.addClass("absolute");
          let left: number = (parentWidth - childWidth) * 0.5 + parentLeft;
          const right: number = left + childWidth;
          const padding: number = 20;

          // はみ出し処理
          if (left < 0 + padding) {
            left = 0 + padding;
          } else if (right > windowWidth - padding) {
            left -= windowWidth - padding - right;
          }

          this.$nav.css({
            left: Math.floor(left)
          });
        })
      ],
      execute
    );
  }

  public static Enter: string = "enter";
  public static Leave: string = "leave";
  private $elm: JQuery;
  private $main: JQuery;
  private $links: JQuery;
  private $nav: JQuery;
  private $stateView: JQuery;
  private color: string;
  private resizeCommand: Command;
  private autoHeight: number;
  private isOpened: boolean;
}

interface IGlobalNavigationItemData {
  color: string;
}
