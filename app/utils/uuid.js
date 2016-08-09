export default function generateSimpleKey() {
  const base = 36;
  const digit = 10;
  
  return new String(Math.floor(Math.random() * Math.pow(base, digit)).toString(base));
}