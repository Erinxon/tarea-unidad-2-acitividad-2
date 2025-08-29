export const formatPretty = (c: string): string =>
  c.replace(/^(\d{3})(\d{7})(\d)$/, "$1-$2-$3");

export const validateCedula = (c: string): boolean => {
  const x = c.replace(/-/g, "").trim();
  return x.length === 11 && /^\d{11}$/.test(x) && getVerifier(x) === getLastDigit(x);
};

const getVerifier = (c: string): number => {
  const multiplicadores = [1, 2, 1, 2, 1, 2, 1, 2, 1, 2];
  let concatenated = "";
  for (let i = 0; i < 10; i++) {
    const prod = Number(c[i]) * multiplicadores[i];
    concatenated += String(prod);
  }
  const sum = [...concatenated].reduce((acc, d) => acc + parseInt(d, 10), 0);
  const nextTen = Math.ceil(sum / 10) * 10;
  return (nextTen - sum) % 10;
};

const getLastDigit = (c: string): number => parseInt(c[10]!, 10);
