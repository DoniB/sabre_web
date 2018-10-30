import Vue from 'vue'
import Comment from '@/components/comments/Comment.vue'

describe('@/components/comments/Comment.vue', () => {
  it('should render correct contents', (done) => {
    const Constructor = Vue.extend(Comment)
    const text = '1234567890'
    const username = 'User Name'
    const vm = new Constructor({propsData: {
      comment: {
        text: text,
        username: username
      }
    }}).$mount()
    expect(vm.$el.textContent).to.have.string(text)
    expect(vm.$el.textContent).to.have.string(username)
    expect(vm.comment.text).to.eq(text)
    expect(vm.comment.username).to.eq(username)
    vm.comment.username = null
    expect(done).to.be.an('function')

    Vue.nextTick(() => {
      expect(vm.$el.textContent).to.not.have.string(username)
      expect(vm.$el.textContent).to.have.string('Usuário')
      done()
    })
  })
})
