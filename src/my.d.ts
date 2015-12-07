///////////////////////////////////////////////////
// import xxx from 'xxx' の構文が書けるように拡張
declare module "lodash" {
  export default _;
}

declare module 'moment' {
  export default moment;
}

declare module "numeral" {
  export default numeral;
}

declare module "prominence" {
  var prominence: any;
  export default prominence;
}

// Expressはexpress.d.tsの最後を直接書き換える。

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
}

declare interface Card {
  title: string;
  body: string;
}