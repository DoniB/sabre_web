import Vue from 'vue'
import SignUp from '@/components/SignUp.vue'

describe('SignUp.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(SignUp)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelectorAll('button div.md-button-content')[0].textContent.trim())
      .to.equal('Cadastrar')
    expect(vm.$el.querySelectorAll('input').length)
      .to.equal(4)
  })
})
