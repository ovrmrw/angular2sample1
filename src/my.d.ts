///////////////////////////////////////////////////
// Electronのレンダラプロセスでrequire('remote')をSystem._nodeRequire('remote')と書くため
declare interface System {
  _nodeRequire: (module: string) => any;
}

///////////////////////////////////////////////////
// jQueryプラグイン
declare interface JQuery {
  leanModal: () => void;
}

declare interface EventTarget {
  value: any;
  textContent: string;
}

declare interface Card {
  title: string;
  body: string;
}