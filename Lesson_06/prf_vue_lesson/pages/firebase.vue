<template>
  <section class="container">
    <div>
      <h2>
        Write to Firestore.
      </h2>
      <div>
        <input name="inputText" v-model="inputText" />
        <button @click="writeToFirestore">書き込み</button>
      </div>
    </div>
    <div>
      <h2>
        Read from Firestore.
      </h2>
      <div>
        <p>{{ readText }}</p>
        <button @click="readFromFirestore">読み込み</button>
      </div>
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
