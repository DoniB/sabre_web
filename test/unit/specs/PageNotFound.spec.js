import Vue from 'vue'
import NotFound from '@/components/PageNotFound.vue'

describe('PageNotFound.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(NotFound)
    const vm = new Constructor().$mount()
    expect(vm.$el.textContent.trim())
      .to.equal('Página nâo encontrada')
  })
})
