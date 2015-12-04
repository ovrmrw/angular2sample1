export class Parent {
  initJQueryPlugins(selector: string) {
    //(async() => {
    //console.log('async start')
    //if (!flag) {
      // for (let i = 0; i < 100; i++) {
      //   if ('$' in window) {
      //     break;
      //   } else {
      //     console.log('$ not in window');
      //     await new Promise(resolve => {
      //       setTimeout(() => { resolve() }, 100);
      //     });
      //   }
      // }
      console.log(`${selector} jquery initialized`);
      $(`${selector} .modal-trigger`).leanModal();
      //flag = true;
    //}
    //console.log('async end')
    return true;
    //})();
  }
}