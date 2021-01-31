/**
 * Author: Abbott.liu
 * Date: 2021/01/11
 * Description: Handle data in complex scenarios
 */

import { Table } from './table'
import { Other }from './other'
import { Regular }from './regular'
import { Algorithm }from './algorithm'
import Format from './format'

const ObjectHelper = { // Factory Pattern
  handleTableData: (data) => {
    return Table.handleData(data)
  },
  deepClone: (data) => {
    return Other.deepClone(data)
  },
  trimStr: (data) => {
    return Regular.trimStr(data)
  },
  randomOneTen: () => {
    return Algorithm.randomOneTen()
  },
  handleChildTableData: (data) => {
    return Format.handleChildTableData(data)
  },
  /**
   * 关键字查询
   * @param data       数组 [Object, Object]
   * @param keyData    Object.key
   * @param keySearch  关键字
   */
  searchKey: (data, keyData, keySearch)=> {
    return Table.searchKey(data, keyData, keySearch)
  },
  formatDate: (date, fmt)=> {
    return Other.formatDate(date, fmt)
  },
  isArray: (date, fmt)=> {
    return Other.isArray(date, fmt)
  },
  handleTextareaValue: (str)=> {
    return Format.handleTextareaValue(str)
  },
  handleDatabaseValue: (str) => {
    return Format.handleDatabaseValue(str)
  }
}

export default ObjectHelper
