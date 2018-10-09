import Vue from 'vue'
import Index from '@/components/PageIndex.vue'

describe('PageIndex.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Index)
    const vm = new Constructor().$mount()
    expect(vm.$el.textContent.trim())
      .to.equal('Index Placeholder')
  })
})
