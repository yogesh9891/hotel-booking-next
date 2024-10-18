// local url
// export const url = "http://localhost:3056";

// live urll

//  export const url = '/api'
export const url = "https://api.wabisabistays.com";

export const generateImageUrl = (path: string) => {
  return `${url}/uploads/${path}`;
};
