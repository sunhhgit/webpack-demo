const decorator = (target, key, descriptor) => {
  target[key] = function (...args) {
    console.log('key=>', key, this.count)
    return descriptor.value.apply(this, args)
  }
  return target[key]
}

export default class CountChange {
  count = 1;

  @decorator
  increase() {
    this.count++
  }

  add = () => {
    // this.count++
  }

  decrease = () => {
    this.count--
  }
}
