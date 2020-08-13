<template>
  <v-row>
    <v-breadcrumbs large :items="breadcrumbs">
      <template v-slot:divider>
        <v-icon>mdi-arrow-left-thick</v-icon>
      </template>
    </v-breadcrumbs>
  </v-row>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  components: {
    Logo,
    VuetifyLogo
  },
  data: () => ({
    breadcrumbs: [
      {
        text: 'داشبورد',
        disabled: true,
        href: '/'
      }
    ]
  })
}
</script>
