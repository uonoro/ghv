export const API = {
  call: async (callPath: string, data: any) => {
    console.log("SUMSUM");
    return window.api.invoke("API", { callPath, data });
  },
};
