import View from "../../umadash.js/views/View";
import Command from "../../umadash.js/commands/Command";
import JqueryUtil from "../../umadash.js/jquery/utils/JqueryUtil";

const $ = jQuery;

export class ScrollIndicator extends View<JQuery> {
  constructor($elm: JQuery) {
    super($elm);
  }

  protected impGetShowCommand(): Command {
    return JqueryUtil.fadeIn(this.getView(), 300);
  }

  protected impGetHideCommand(): Command {
    return JqueryUtil.fadeOut(this.getView(), 300);
  }
}
