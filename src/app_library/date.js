const dateMixin = {
  filters: {
    timePassed(input) {
      const inputDate = new Date(input)
      const today = new Date()
      const timeDiff = Math.abs(today.getTime() - inputDate.getTime())
      const diffDays = Math.round(timeDiff / (1000 * 3600 * 24))
      if (diffDays === 0) {
        return 'hoje'
      }

      if (diffDays === 1) {
        return '1 dia'
      }

      if (diffDays < 30) {
        return diffDays + ' dias'
      }

      const diffMonths = Math.round(diffDays / 30)

      if (diffMonths === 1) {
        return '1 mês'
      }

      return diffMonths + ' meses'
    }
  }
}

export default dateMixin
