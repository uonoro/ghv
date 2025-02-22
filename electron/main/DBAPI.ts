export interface IDBApi {
  [key: string]: Function;
}
export const DBAPI = {
  readTable: async () => {
    console.log("SUMSUM DB readTable");
    return new Promise((result, error) => {
      result("GOT IT ");
    });
  },
  add: async () => {
    console.log("SUMSUM DB add");
    return new Promise((result, error) => {
      result("GOT IT ");
    });
  },
  remove: async () => {
    console.log("SUMSUM DB remove");
    return new Promise((result, error) => {
      result("GOT IT ");
    });
  },
  update: () => {
    console.log("SUMSUM DB update");
    return new Promise((result, error) => {
      result("GOT IT ");
    });
  },
};
