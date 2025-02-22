export const API = {
  call: async (callPath: string, data: any) => {
    return window.api.invoke("API", { callPath, data });
  },
};
