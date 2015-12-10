///////////////////////////////////////////////////
// import xxx from 'xxx' の構文が書けるようにオーバーライド
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
