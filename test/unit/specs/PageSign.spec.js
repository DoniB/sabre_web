import Vue from 'vue'
import Sign from '@/components/PageSign.vue'

describe('PageSign.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Sign)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelectorAll('button div.md-button-content')[0].textContent.trim())
      .to.equal('Entrar')
  })
})
