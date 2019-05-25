<template>
  <section class="container">
    <div>
      <p class="title font-weight-medium">Write to Firestore.</p>
      <v-layout row wrap>
        <v-flex sm5>
          <v-text-field label="入力" outline name="inputText" v-model="inputText" />
        </v-flex>
        <v-flex>
          <v-btn large @click="writeToFirestore">書き込み</v-btn>
        </v-flex>
      </v-layout>
    </div>
    <div>
      <p class="title font-weight-medium">Read from Firestore.</p>
      <v-layout row wrap>
        <v-flex sm5>
          <p class="display-3 font-weight-medium">{{ readText }}</p>
        </v-flex>
        <v-flex>
          <v-btn large @click="readFromFirestore">読み込み</v-btn>
        </v-flex>
      </v-layout>
    </div>
  </section>
</template>
<script>
  import {fireDb} from '~/plugins/firebase.js'
  export default {
    data() {
      return {
        inputText: '',
        readText: ''
      }
    },
    methods: {
      async writeToFirestore() {
        const ref = fireDb.collection("test").doc("test")
        const document = {
          text: this.inputText
        }
        try {
          await ref.set(document)
        } catch (e) {
          console.error(e)
        }
      },
      async readFromFirestore() {
        const ref = fireDb.collection("test").doc("test")
        let snap
        try {
          snap = await ref.get()
        } catch (e) {
          console.error(e)
        }
        this.readText = snap.data().text
      }
    }
  }
</script>
