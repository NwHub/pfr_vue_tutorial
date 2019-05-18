<template>
  <div>
    <v-container grid-list-xl>
      <v-layout row justify-center>
        <v-flex xs3>
          <v-card dark color="primary">
            <!-- 名前を合わせる -->
            <v-card-text>Nomal {{ counter }}</v-card-text>
            <!-- 名前を合わせる -->
          </v-card>
        </v-flex>
        <v-flex xs3>
          <v-card color="primary">
            <!-- 名前を合わせる -->
            <v-card-text>PlusOne {{ counterPlusOne }}</v-card-text>
            <!-- 名前を合わせる -->
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import {mapState, mapGetters} from 'vuex'

export default {
  computed: {
    // 名前が同じなら、さらに省略できる
    ...mapState(['counter']),
    ...mapGetters(['counterPlusOne'])

    // ...mapState({
    //   nomal: 'counter'
    // }),
    // ...mapGetters({
    //   plusOne: 'counterPlusOne'
    // })

    // nomal () {
    //   return this.$store.state.counter
    // },
    // plusOne () {
    //   return this.$store.getters.counterPlusOne
    // }
  }
}
</script>
