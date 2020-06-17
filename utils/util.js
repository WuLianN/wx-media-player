/**
 * @description: 洗牌算法 (随机算法 -> 随机播放音乐)
 * @param {Array}
 * @return: Array
 */
export function shuffle(array) {
  for (let i = array.length - 1; i >= 0; i--) {
    let randomIndex = Math.floor(Math.random() * (i + 1))
    let itemAtIndex = array[randomIndex]
    array[randomIndex] = array[i]
    array[i] = itemAtIndex
  }
  return array
}