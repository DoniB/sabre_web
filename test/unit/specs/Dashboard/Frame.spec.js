import Vue from 'vue'
import Frame from '@/components/dashboard/Frame.vue'

describe('dashboard/Frame.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(Frame)
    const vm = new Constructor().$mount()
    let menus = vm.$el.querySelectorAll('.md-list-item-text')
    expect(menus[0].textContent.trim())
      .to.equal('Inicio')
    expect(menus[1].textContent.trim())
      .to.equal('Favoritos')
    expect(menus[2].textContent.trim())
      .to.equal('Minhas Receitas')
  })
})
