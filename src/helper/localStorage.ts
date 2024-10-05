export const KEY_STORAGE = {
  USER_VERIFICATION: "USER_VERIFICATION",
  TOKEN: "TOKEN",
  USER: "USER",
};

export const setItem = (key: string, value: any) => {
  if (value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const getItem = (key: string) => {
  const result = localStorage.getItem(key);

  if (result) {
    return JSON.parse(result);
  }
  return null;
};

export const removeItem = (key: string) => {
  if (key !== "") {
    localStorage.removeItem(key);
  }
};

export const clear = () => {
  localStorage.clear();
};
