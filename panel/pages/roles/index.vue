<template>
  <v-row>
    <v-breadcrumbs large :items="breadcrumbs">
      <template v-slot:divider>
        <v-icon>mdi-arrow-left-thick</v-icon>
      </template>
    </v-breadcrumbs>
    <v-col cols="12">
      <v-card>
        <v-card-title>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="جستجو ..."
            single-line
            hide-details
            @change="searchDessert"
          ></v-text-field>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-btn v-if="$can('role_store')" @click.stop="dialog = true" color="info" class="mt-5">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <Skeleton v-if="loading" type="table" />
          <v-data-table
            v-else
            :headers="headers"
            :items="desserts"
            :loading="loading"
            hide-default-footer
          >
            <!-- ############################################################################################ -->
            <template v-slot:no-data>
              <v-btn color="primary" @click="initialize" small>
                <v-icon>mdi-refresh</v-icon>تازه سازی
              </v-btn>
            </template>
            <template v-slot:item.delete_able="{ item }">
              <v-chip
                v-if="item.delete_able"
                class="ma-2 small-font"
                dark
                text-color="white"
                label
              >بله</v-chip>
              <v-chip v-else class="ma-2 small-font" text-color="black" label>خیر</v-chip>
            </template>
            <template v-slot:item.created_at="{ item }">
              <v-chip class="ma-2 small-font" text-color="black" label>
                {{
                item.created_at | moment('h:mm jYYYY/MM/DD')
                }}
              </v-chip>
            </template>
            <template v-slot:item.action="{ item }">
              <nuxt-link :to="'/roles/' + item.id">
                <v-icon
                  dense
                  size="26"
                  v-if="$can('role_show')"
                  class="ml-2"
                >mdi-alpha-p-box-outline</v-icon>
              </nuxt-link>
              <v-icon
                dense
                size="26"
                v-if="$can('role_update')"
                class="ml-2"
                @click="editItem(item)"
              >mdi-circle-edit-outline</v-icon>
              <v-icon
                dense
                size="26"
                v-if="$can('role_delete')"
                @click.stop="deleteAction(item)"
              >mdi-delete-alert-outline</v-icon>
            </template>
            <template v-slot:footer>
              <br />
              <v-toolbar flat>
                <div class="flex-grow-1">
                  <v-pagination
                    v-model="pagination.page"
                    :length="pagination.last_page"
                    :next-icon="$vuetify.icons.next"
                    :prev-icon="$vuetify.icons.prev"
                    :total-visible="pagination.visible"
                    :value="pagination.current"
                    @input="onPageChange"
                  ></v-pagination>
                </div>
              </v-toolbar>
            </template>
            <!-- ############################################################################################ -->
          </v-data-table>
        </v-card-text>
      </v-card>
    </v-col>

    <v-dialog v-model="dialog" max-width="900px" persistent transition>
      <v-card>
        <v-card-text>
          <v-container>
            <v-row class="mt-5">
              <v-col cols="12" class="text-center">
                <p class="mdl-title">{{ formTitle }}</p>
              </v-col>
              <v-col cols="12" sm="4" md="4">
                <v-text-field
                  v-model="editedItem.name"
                  label="نام یکتا"
                  :error="hasErrorField('name')"
                  :error-messages="getErrorMessage('name')"
                  outlined
                  clearable
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="4" md="4">
                <v-text-field
                  v-model="editedItem.title"
                  label="عنوان"
                  :error="hasErrorField('title')"
                  :error-messages="getErrorMessage('title')"
                  outlined
                  clearable
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="4" md="4">
                <v-text-field
                  v-model="editedItem.priority"
                  label="اولویت"
                  :error="hasErrorField('priority')"
                  :error-messages="getErrorMessage('priority')"
                  outlined
                  clearable
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="12" md="12">
                <v-text-field
                  v-model="editedItem.description"
                  label="توضیح"
                  :error="hasErrorField('description')"
                  :error-messages="getErrorMessage('description')"
                  outlined
                  clearable
                ></v-text-field>
              </v-col>
              <v-col cols="12" class="text-left">
                <v-spacer></v-spacer>
                <v-btn @click="close">
                  <v-icon left size="33">mdi-close</v-icon>بیخیال
                </v-btn>
                <v-btn color="primary" class="mr-3" @click="save">
                  <v-icon left size="33">mdi-check</v-icon>ثبت
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
    </v-dialog>

    <DestroyDialog
      :destroy="destroy"
      @destroyItem="deleteItem"
      @closeDestroyDialog="destroy = false"
    />
  </v-row>
</template>

<script>
export default {
  async validate({ app }) {
    return await app.$can('role_list')
  },
  head() {
    return {
      title: 'کاریابی | نقش ها'
    }
  },
  data: () => ({
    breadcrumbs: [
      {
        text: 'داشبورد',
        disabled: false,
        href: '/'
      },
      {
        text: 'نقش ها',
        disabled: true,
        href: '/roles'
      }
    ],
    destroy: false,
    sync: false,
    loading: true,
    dialog: false,
    search: '',
    pagination: {
      current: 1,
      page: 1,
      limit: 20,
      last_page: undefined,
      visible: 5
    },
    headers: [
      { text: 'نام یکتا', value: 'name' },
      { text: 'عنوان', value: 'title' },
      { text: 'اولویت', value: 'priority' },
      { text: 'قابل حذف', value: 'delete_able' },
      { text: 'تاریخ ایجاد', value: 'created_at' },
      { text: 'عملیات', value: 'action', align: 'center', sortable: false }
    ],
    desserts: [],
    errors: [],
    editedIndex: -1,
    editedItem: {},
    itemDestroy: {},
    defaultItem: {
      id: 0,
      name: '',
      title: '',
      priority: '6',
      description: ''
    }
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? 'نقش کاربری جدید' : 'ویرایش نقش کاربری'
    }
  },

  watch: {
    dialog(val) {
      val || this.close()
    }
  },

  async created() {
    await this.initialize()
  },

  methods: {
    async initialize() {
      this.loading = true
      await this.$axios
        .get(
          `api/roles?page=${this.pagination.current}&limit=${this.pagination.limit}&search=${this.search}`
        )
        .then(response => {
          this.pagination.last_page = response.data.data.page_count
          this.desserts = response.data.data.items
        })
        .catch(err => console.log(err))
      this.loading = false
    },
    async onPageChange(perPage) {
      if (this.pagination.current != perPage) {
        this.pagination.current = perPage
        await this.initialize()
      }
    },
    async searchDessert() {
      this.search = this.search.trim()
      if (this.search) {
        await this.initialize()
      }
    },
    editItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.errors = {}
      this.dialog = true
    },
    deleteAction(item) {
      this.itemDestroy = item
      this.destroy = true
    },
    async deleteItem() {
      this.destroy = false
      await this.$axios
        .delete(`api/roles/${this.itemDestroy.id}`)
        .then(response => {
          if (response.data.success) {
            this.$toast.info('حذف نقش با موفقیت انجام شد')
            this.$delete(this.desserts, this.desserts.indexOf(this.itemDestroy))
          } else {
            this.$toast.error('حذف نقش با خطا مواجه شد')
          }
        })
        .catch(err => {
          if (err.response.status == 406) {
            this.$toast.error(err.response.data.message)
          } else {
            this.$toast.error(err)
          }
        })
    },
    close() {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },
    async save() {
      this.errors = []
      // update item
      if (this.editedIndex > -1) {
        await this.update()

        // new item
      } else {
        await this.store()
      }
    },
    hasErrorField(field) {
      if (this.errors[0] != undefined) {
        return this.errors.filter(e => e.field === field).length > 0
      } else {
        return false
      }
    },
    getErrorMessage(field) {
      if (this.errors[0] != undefined) {
        if (this.errors.filter(e => e.field === field).length > 0) {
          return this.errors.filter(e => e.field === field)[0].message
        }
      }
    },
    async store() {
      await this.$axios
        .post(`api/roles`, this.editedItem)
        .then(response => {
          if (response.data.success) {
            this.$toast.success('نقش با موفقیت ثبت شد')
            this.desserts.push(response.data.data.role)
            this.close()
          } else {
            this.$toast.error('ثبت نقش با خطا مواجه شد')
          }
        })
        .catch(err => {
          if (err.response.status == 422) {
            this.errors = err.response.data.errors
            this.$toast.error(err.response.data.message)
          } else {
            this.$toast.error(err)
          }
          console.clear()
        })
    },
    async update() {
      let id = this.desserts[this.editedIndex].id
      let item = this.editedItem
      await this.$axios
        .patch(`api/roles/${id}`, item)
        .then(response => {
          if (response.data.success) {
            this.$toast.success('بروزرسانی نقش با موفقیت انجام شد')
            this.$set(this.desserts, this.editedIndex, response.data.data.role)
            this.close()
          } else {
            this.$toast.error('بروزرسانی نقش با خطا مواجه شد')
          }
        })
        .catch(err => {
          if (err.response.status == 422) {
            this.errors = err.response.data.errors
            this.$toast.error(err.response.data.message)
          } else {
            this.$toast.error(err)
          }
        })
    }
  }
}
</script>

<style lang="scss"></style>
