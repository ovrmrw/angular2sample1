declare interface System {
  _nodeRequire: (module: string) => any;
}

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

// declare module "jsonfile" {
//   var jsonfile: any;
//   export default jsonfile;
// }

declare interface JQuery {
  leanModal: () => void;
}

declare interface Card {
  name: string;
  body: string;
}