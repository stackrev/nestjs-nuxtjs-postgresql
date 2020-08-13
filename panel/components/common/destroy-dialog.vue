<template>
  <v-dialog v-model="destroy" max-width="400" persistent transition>
    <v-card color="primary">
      <div class="text-center">
        <v-icon class="mt-4" size="90" color="white">mdi-delete-empty</v-icon>
      </div>
      <v-card-text
        class="destroy-text"
        style="color: white;"
      >هرگونه حذف بی مورد باعث اختلال درسیستم میشود. آیا برای حذف اطمینان دارید؟</v-card-text>
      <v-card-actions>
        <div class="destroy-btn mb-5">
          <v-btn class="destroy-yes" color="error" @click="deleteItem">بله</v-btn>
          <v-btn @click="close">خیر!</v-btn>
        </div>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['destroy'],
  methods: {
    deleteItem() {
      this.$emit('destroyItem')
    },
    close() {
      this.$emit('closeDestroyDialog')
    }
  }
}
</script>

<style lang="scss">
</style>