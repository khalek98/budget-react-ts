export function removeLeadingZeros(num: number | string) {
  let stringNumber: string = "";

  if (typeof num === "number") {
    stringNumber = num.toString();
  } else if (typeof num === "string") {
    stringNumber = num;
  }

  for (var i = 0; i < stringNumber.length; i++) {
    if (stringNumber.charAt(i) != "0") {
      // return the remaining string
      let res = stringNumber.substring(i);
      return res;
    }
  }
  return "0";
}
