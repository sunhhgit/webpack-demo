import CountChange from "./es6";

const instance = new CountChange()

function test(content) {
  document.querySelector('#app').innerHTML = content
}

test(`Just a webpackDemo ${instance.count}`)
instance.increase()
setTimeout(() => {
  test(instance.count)
}, 3000)
