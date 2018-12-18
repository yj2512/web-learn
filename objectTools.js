import typeTools from './typeTools';

export default {
  /**
   * 对象拷贝
   * @param {any} source 源对象
   * @returns 对象
   */
  copy(source) {
    let result = {};
    for (let key in source) {
      // 时间对象, null 不做深拷贝
      if (typeTools.isDate(source[key]) || typeTools.isNull(source[key])) {
        result[key] = source[key];
      } else {
        result[key] = typeof source[key] === 'object' ? this.copy(source[key]) : source[key];
      }
    }
    return result;
  }
};
