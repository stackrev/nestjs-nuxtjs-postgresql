<template>
  <v-row>
    <v-breadcrumbs large :items="breadcrumbs">
      <template v-slot:divider>
        <v-icon>mdi-arrow-left-thick</v-icon>
      </template>
    </v-breadcrumbs>

    <v-col cols="12">
      <MaterialCard
        color="primary"
        height="60"
        :title="`مجوز های مربوط به ${role.title}`"
        text="هرگونه تغییر بدون دقت باعث اختلال در سیستم است! لطفا با دقت انتخاب کنید"
      >
        <v-card>
          <v-card-text>
            <v-row v-for="perms in permissions" :key="perms.id">
              <v-col cols="12" sm="6" md="2" v-for="item in perms" :key="item.id">
                <v-switch
                  color="primary"
                  v-model="selectedPerms"
                  :label="item.title"
                  :value="item.id"
                  class="ma-0 pa-0"
                  inset
                ></v-switch>
              </v-col>
              <v-col></v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <div style="width:100%;text-align:center">
              <v-btn
                :disabled="permissions[0] === undefined && !$can('role_permission_sync')"
                class="mb-3"
                color="primary"
                @click="syncPermission"
              >ثبت مجوزهای انتخاب شده</v-btn>
            </div>
          </v-card-actions>
        </v-card>
      </MaterialCard>
    </v-col>
  </v-row>
</template>

<script>
export default {
  head() {
    return {
      title: 'تموک | مجوزهای نقش'
    }
  },
  async validate({ app }) {
    return await app.$can('role_show')
  },
  data() {
    return {
      breadcrumbs: [
        {
          text: 'داشبورد',
          disabled: false,
          href: '/'
        },
        {
          text: 'نقش ها',
          disabled: false,
          href: '/roles'
        },
        {
          text: 'مجوز ها',
          disabled: true,
          href: '/'
        }
      ],
      id: this.$route.params.id,
      title: '',
      role: {},
      permissions: [],
      rolePerms: [],
      selectedPerms: [],
      divider: true
    }
  },
  async created() {
    await this.initialize()
    this.title =
      'مجوزهای نقش کاربری ' +
      this.role.title +
      ' را انتخاب کنید وسپس دکمه ثبت را بزنید'
  },
  methods: {
    // Get Role Data
    async initialize() {
      await this.$axios
        .get(`api/roles/${this.id}/show`)
        .then(response => {
          this.role = response.data.data.role
          this.rolePerms = this.$groupBy(
            response.data.data.role_permissions,
            'module'
          )
          this.permissions = response.data.data.permissions
            ? this.$groupBy(response.data.data.permissions, ['module'])
            : []

          this.selectedPerms = []
          response.data.data.role_permissions.forEach(perm => {
            this.selectedPerms.push(perm.id)
          })
        })
        .catch(err => {
          console.log(err)
        })
    },
    // sync permissions
    async syncPermission() {
      await this.$axios
        .post(`api/roles/${this.id}/permissions`, {
          ids: this.selectedPerms
        })
        .then(response => {
          if (response.data.success) {
            this.$toast.success(
              `بروزرسانی مجوز های نقش "${this.role.title}" با موفقیت انجام شد`
            )
            this.sync = false
          } else {
            this.$toast.error(
              `بروزرسانی مجوز های نقش "${this.role.title}" با خطا مواجه شد`
            )
          }
        })
        .catch(err => {
          if (err.response.status == 422) {
            this.$toast.error(err.response.data.message)
          } else {
            this.$toast.error(err)
          }
        })
    }
  }
}
</script>

<style lang="scss">
.v-label {
  font-size: 14px !important;
}
</style>