<template>
  <v-row style="margin-right:0 !important; margin-left:0 !important;">
    <v-col cols="12" lg="3" md="3" sm="12" class="ma-0 pa-0">
      <v-card height="100%" style="padding-top:35%; padding-bottom:30%;">
        <v-card-text>
          <v-col cols="12" class="text-center" style="margin-bottom:20%">
            <h3>
              <b>ورود به داشبورد مدیریتی سیستم کاریابی</b>
            </h3>
          </v-col>

          <v-form @keydown.enter="login">
            <v-row align="center" justify="center" class="mx-9">
              <v-text-field label="نام کاربری" type="text" v-model="username" outlined></v-text-field>
            </v-row>
            <v-row align="center" justify="center" class="mx-9">
              <v-text-field label="گذرواژه" type="password" v-model="password" outlined></v-text-field>
            </v-row>
          </v-form>
          <v-col class="text-center">
            <v-btn @click="login" color="primary" :disabled="!btn">ورود</v-btn>
          </v-col>
        </v-card-text>
      </v-card>
    </v-col>

    <v-col cols="12" lg="9" md="9" sm="12" class="ma-0 pa-0">
      <v-img src="/bg-lg.jpg" style="height:100%;width:100%" transition="fade-transition" eager></v-img>
    </v-col>
  </v-row>
</template>

<script>
export default {
  layout: 'authenticate',
  head() {
    return {
      title: 'کاریابی | ورود'
    }
  },
  data() {
    return {
      btn: false,
      username: '',
      password: '',
      tkn: '',
      brow: {
        device_type: '',
        os: '',
        os_version: '',
        browser: '',
        browser_vendor: '',
        browser_version: ''
      }
    }
  },
  methods: {
    async login() {
      await this.$auth
        .loginWith('local', {
          data: {
            tkn: this.tkn,
            username: this.username,
            password: this.password,
            device_type: this.brow.device_type,
            os: this.brow.os,
            os_version: this.brow.os_version,
            browser: this.brow.browser,
            browser_vendor: this.brow.browser_vendor,
            browser_version: this.brow.browser_version
          }
        })
        .catch(err => {
          if (err.response.status == 422 || err.response.status == 403) {
            this.$toast.error(err.response.data.message)
          } else {
            this.$toast.error(err)
          }
          console.clear()
        })
      this.$router.push('/')
    },
    browser() {
      this.brow = {
        device_type: this.$ua.deviceType(),
        os: this.$ua.os(),
        os_version: this.$ua.osVersion(),
        browser: this.$ua.browser(),
        browser_vendor: this.$ua.browserVendor(),
        browser_version: this.$ua.browserVersion()
      }
    }
  },
  async created() {
    this.browser()
  },
  async mounted() {
    if (this.$auth.loggedIn) {
      this.$router.push('/')
    } else {
      this.tkn = await this.$recaptcha.execute('login')
      this.btn = true
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
