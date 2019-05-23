<template>
  <div>
    <p class="text-xs-center display-3 font-weight-medium">
      Real Todo
    </p>

    <v-form>
      <v-container>
        <v-layout row wrap>
          <v-flex xs12 sm6 offset-sm3>
            <v-text-field label="search" outline name="findContent" v-model="findContent" />
          </v-flex>
        </v-layout>
      </v-container>
    </v-form>

    <v-layout row>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>

          <v-subheader>
            Your Life
          </v-subheader>

          <v-container>
            <v-layout row wrap>
              <v-flex sm10>
                <v-text-field label="todo?" outline name="inputContent" v-model="inputContent" />
              </v-flex>
              <v-flex>
                <v-btn @click="addTodo">Add</v-btn>
              </v-flex>
            </v-layout>
          </v-container>

          <v-list two-line>
            <div v-for="(todoData, index) in todoDatas">

              <v-divider></v-divider>

              <v-list-tile>
                <v-list-tile-avatar>
                  {{ index }}
                </v-list-tile-avatar>

                <v-list-tile-content>
                  <v-list-tile-title><p class="title">{{ todoData.content }}</p></v-list-tile-title>
                  <v-list-tile-sub-title>{{ todoData.created }}</v-list-tile-sub-title>
                </v-list-tile-content>
                <v-btn @click="doneTodo(todoData)">Done</v-btn>
              </v-list-tile>

            </div>

          </v-list>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import TodoRepository from '../repository/todo-repository'

export default {
  data () {
    return {
      inputContent: '',
      findContent: '',
      list: [],
    }
  },
  async asyncData({app, params, error}) {
    let snap
    try {
      snap = await TodoRepository.get()
    } catch (e) {
      console.error(e)
    }
    // let todoList
    // if (!findContent) {
    //   todoList = snap.data().list
    // } else {
    //   todoList = snap.data().list.filter(function(x, index) {
    //     if ((x.content).indexOf(this.findContent) >= 0) return true;
    //   })
    // }
    return {
      list: snap.data().list
    }
  },
  computed: {
    todoDatas () {
      let find = this.findContent
      return this.list.filter(function(x, index) {
            if ((x.content).indexOf(find) >= 0) return true;
          })
    }
  },

  methods: {
    async addTodo() {
      var d = new Date();
      var fmt = d.getFullYear()
                  + '-' + ('00' + (d.getMonth() + 1)).slice(-2)
                  + '-' + ('00' + d.getDate()).slice(-2)
                  + ' ' + ('00' + d.getHours()).slice(-2)
                  + ':' + ('00' + d.getMinutes()).slice(-2);

      this.list.push({
          content: this.inputContent,
          created: fmt,
          done: false,
      })

      let document = { "list" : this.list }
      try {
        this.inputContent = await TodoRepository.set(document)
      } catch (e) {
        console.error(e)
      }
      this.inputContent = '';
    },
    async doneTodo (todo) {
      this.list.splice(this.list.indexOf(todo), 1)

      let document = { "list" : this.list }
      try {
        this.inputContent = await TodoRepository.set(document)
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>
