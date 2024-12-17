// utils/debounce.ts

type Callback = (...args: any[]) => void;

export const debounce = (callback: Callback, delay: number): Callback => {
  let timer: ReturnType<typeof setTimeout>;
  return (...args: any[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback(...args);
    }, delay);
  };
};

