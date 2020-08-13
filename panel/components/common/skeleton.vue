<template>
  <v-sheet
    :color="`grey ${theme.isDark ? 'darken-2' : 'lighten-4'}`"
    class="px-3 pt-3 pb-3"
  >
    <v-skeleton-loader class="mx-auto" :type="type"></v-skeleton-loader>
  </v-sheet>
</template>
<script>
export default {
  props: ['type'],
  inject: ['theme']
}
</script>

<style lang="scss"></style>
