declare var $: JQueryStatic;

export class Parent {
  initJQueryPlugins(selector: string) {
    console.log(`${selector} jquery initialized`);
    $(`${selector} .modal-trigger`).leanModal();
    return true;
  }
}