/**
 * A simple utilitarian that return a promise which fulfilled itself given a certain time amount
 * based on the 'amount' parameter we passed in.
 * @param amount
 */
const wait = (amount = 0) =>
  new Promise((resolve) => setTimeout(resolve, amount));

export default wait;
