import {
  action
} from 'mobx-miniprogram'

export default {
  puase: false,

  setPause: action(function(value) {
    this.pause = value
  })
}