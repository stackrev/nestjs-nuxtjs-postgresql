<template>
  <v-app dark>
    <NavigationNavbar :items="menus" />

    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
import NavigationNavbar from '~/components/master/navigation'
import Menu from '~/components/master/menu'
import Footer from '~/components/master/footer'

export default {
  middleware: 'auth',
  transition: 'default',
  scrollToTop: true,
  components: {
    NavigationNavbar,
    Footer
  },
  data() {
    return {
      menus: Menu.items
    }
  },
  created() {
    this.menusPerms()
    console.clear()
  },
  methods: {
    async menusPerms() {
      this.menus.forEach(item => {
        item.show = this.$can(item.perm)
        if (item.has_items) {
          let newItems = []
          item.items.forEach(subItem => {
            if (this.$can(subItem.perm)) {
              newItems.push(subItem)
            }
          })
          item.items = newItems
        }
      })
    }
  }
}
</script>

<style lang="scss">
.page-enter-active,
.page-leave-active {
  transition-property: opacity;
  transition-timing-function: ease-in-out;
  transition-duration: 300ms;
}
.page-enter,
.page-leave-to {
  opacity: 0;
}
</style>
