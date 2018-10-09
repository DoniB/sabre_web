import Vue from 'vue'
import SignIn from '@/components/SignIn.vue'

describe('SignIn.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(SignIn)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelectorAll('button div.md-button-content')[0].textContent.trim())
      .to.equal('Entrar')
    expect(vm.$el.querySelectorAll('input').length)
      .to.equal(2)
  })
})
