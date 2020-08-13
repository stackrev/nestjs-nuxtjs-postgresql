import Vue from 'vue'

export default ({ app }) => {
  let can = permission => {
    let permissions = app.store.state.auth.user.permissions

    if (permissions !== []) return permissions.includes(permission)
    else return false
  }

  app.$can = can
  Vue.prototype.$can = can

  let groupBy = (xs, key) => {
    return xs.reduce((rv, x) => {
      ;(rv[x[key]] = rv[x[key]] || []).push(x)
      return rv
    }, {})
  }

  app.$groupBy = groupBy
  Vue.prototype.$groupBy = groupBy
}
