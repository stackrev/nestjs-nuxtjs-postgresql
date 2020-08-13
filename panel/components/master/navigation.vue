<template>
  <div>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      :mini-variant-width="60"
      :width="250"
      color="primary"
      three-line
      fixed
      app
      right
    >
      <template v-slot:prepend>
        <v-list-item two-line>
          <!-- <nuxt-link :to="`/users/`"> -->
          <v-list-item-avatar>
            <img src="/v.png" />
          </v-list-item-avatar>
          <!-- </nuxt-link> -->

          <v-list-item-content>
            <v-list-item-title
              class="mb-2 white-color"
            >{{$auth.user.name + ' ' + $auth.user.family}}</v-list-item-title>
            <v-list-item-subtitle class="white-color">{{$auth.user.mobile}}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>
      <v-list style="padding:0px">
        <v-divider></v-divider>
        <div>
          <v-list-item to="/" router exact>
            <v-list-item-action>
              <v-icon color="rgb(255, 255, 255)">mdi-apps</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title class="white-color">داشبورد</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </div>

        <!-- Dynamic Generate Menu Block -->
        <div v-for="(item, i) in items" :key="i">
          <v-list-item v-if="item.show && !item.has_items" :to="item.to" router exact>
            <v-list-item-action>
              <v-icon color="rgb(255, 255, 255)">{{ item.icon }}</v-icon>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title v-text="item.title" class="white-color" />
            </v-list-item-content>
          </v-list-item>

          <v-list-group v-else-if="item.show && item.has_items" no-action color="white">
            <template v-slot:activator>
              <v-list-item-action>
                <v-icon color="rgb(255, 255, 255)">{{ item.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title v-text="item.title" class="white-color"></v-list-item-title>
              </v-list-item-content>
            </template>

            <template v-slot:default>
              <v-list-item
                v-for="subItem in item.items"
                :key="subItem.title"
                :to="subItem.to"
                router
                exact
              >
                <v-list-item-content>
                  <v-list-item-title v-text="subItem.title" class="white-color" />
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list-group>
        </div>
        <!-- End Block -->
      </v-list>
    </v-navigation-drawer>

    <!-- App Bar -->
    <v-app-bar :clipped-left="clipped" :elevation="24" color="primary" dense fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" color="rgb(255, 255, 255)" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon
          class="icon-bar"
          color="rgb(255, 255, 255)"
        >mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-spacer />
      <v-toolbar-title v-text="title" class="white-color" />
      <v-spacer />

      <v-bottom-sheet v-model="dialog" inset>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon color="rgb(255, 255, 255)">mdi-power-standby</v-icon>
          </v-btn>
        </template>
        <v-sheet class="text-center" height="240px" color="primary">
          <v-row>
            <v-col cols="12" lg="6" md="6" sm="12">
              <div class="text-center">
                <v-icon class="mt-2" size="60" color="rgb(255, 255, 255)">mdi-power-standby</v-icon>
              </div>
              <div class="text-center mt-3 mb-3">
                <p>
                  برای خروج
                  <b>"بله"</b> را کلیک کنید
                </p>
                <p>اطلاعات خروج شما در سیستم ثبت خواهد شد!</p>
              </div>
              <div class="logout-btn mb-5">
                <v-btn class="logout-yes" color="secondary" @click="logout">بله</v-btn>
                <v-btn @click="dialog = false" color="info">الان نه!</v-btn>
              </div>
            </v-col>
            <v-col cols="12" lg="6" md="6" sm="12">
              <div class="text-center">
                <v-avatar class="mt-2" height="50" width="50">
                  <img src="/v.png" :alt="$auth.user.mobile" />
                </v-avatar>
              </div>
              <div class="text-center mt-3 mb-3">
                <h2 class="mb-4">{{$auth.user.name + ' ' + $auth.user.family}}</h2>
                <h3 class="mb-5">
                  {{$auth.user.mobile}}
                  <v-icon>mdi-cellphone-iphone</v-icon>
                </h3>
                <h4>{{$auth.user.email}}</h4>
              </div>
            </v-col>
          </v-row>
        </v-sheet>
      </v-bottom-sheet>
    </v-app-bar>
  </div>
</template>
<script>
export default {
  props: ['items'],
  data() {
    return {
      dialog: false,
      clipped: false,
      drawer: true,
      fixed: false,
      miniVariant: false,
      right: true,
      title: 'پنل مدیریت'
    }
  },
  methods: {
    async logout() {
      await this.$auth.logout()
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
.name {
  font-size: 13px !important;
}
.v-list-item__title,
.v-btn__content {
  font-size: 12px !important;
}
.logout-text {
  text-align: center;
  padding-top: 12px !important;
}
.logout-btn {
  width: 100%;
  text-align: center;
}
.logout-yes {
  font-size: initial;
  font-weight: 600 !important;
}
p,
h2,
h3,
h4,
.white-color,
.v-icon {
  color: rgb(255, 255, 255) !important;
}

.v-icon:hover {
  color: rgb(255, 255, 255) !important;
}
.v-list-item__icon,
.v-list-group__header__append-icon {
  color: rgb(255, 255, 255) !important;
}
</style>
