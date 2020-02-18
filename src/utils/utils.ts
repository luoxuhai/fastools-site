/**
 * setTimeout同步
 *
 * @export
 * @param {number} time
 * @returns Promise
 */
export function setTimeoutSync(time: number) {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve('done');
    }, time);
  });
}
