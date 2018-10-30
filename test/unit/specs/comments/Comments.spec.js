import Vue from 'vue'
import Comments from '@/components/comments/Comments.vue'

describe('@/components/comments/Comments.vue', done => {
  it('need to be finished')

  const mixin = {
    computed: {
      api () {
        return {
          recipes: {
            comments: {
              index () {
                return []
              }
            }
          }
        }
      }
    }
  }

  it('should render correct contents', () => {
    const Constructor = Vue.extend(Comments)
    const vm = new Constructor({propsData: {
      recipeId: 6 },
    mixins: [mixin]
    }).$mount()
    expect(vm.$el.textContent).to.have.string('Comentários')

    vm.comments.push({
      id: 1,
      text: 'this is good',
      username: 'Alan Kay'
    })

    vm.comments.push({
      id: 1,
      text: 'i like it',
      username: 'Alan Kay'
    })

    Vue.nextTick(() => {
      expect(vm.$el.textContent).to.have.string('this is good')
      expect(vm.$el.textContent).to.have.string('Alan Kay')
      done()
    })
  })
})
