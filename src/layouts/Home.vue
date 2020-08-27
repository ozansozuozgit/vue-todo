<template
  >
  <v-container style="max-width: 500px">
    <v-text-field v-model="task" label="What are you working on?" solo @keydown.enter="create">
      <v-fade-transition v-slot:append>
        <v-icon v-if="task" @click="create">add_circle</v-icon>
      </v-fade-transition>
    </v-text-field>

    <h2 class="display-1 success--text pl-4">
      Tasks:&nbsp;
      <v-fade-transition leave-absolute>
        <span :key="`tasks-${tasks.length}`">{{ tasks.length }}</span>
      </v-fade-transition>
    </h2>

    <v-divider class="mt-4"></v-divider>

    <v-row class="my-1" align="center">
      <strong class="mx-4 info--text text--darken-2">Remaining: {{ remainingTasks }}</strong>

      <v-divider vertical></v-divider>

      <strong class="mx-4 success--text text--darken-2">Completed: {{ completedTasks }}</strong>

      <v-spacer></v-spacer>

      <v-progress-circular :value="progress" class="mr-2"></v-progress-circular>
    </v-row>

    <v-divider class="mb-4"></v-divider>

    <v-card v-if="tasks.length > 0">
      <v-slide-y-transition class="py-0" group tag="v-list">
        <template v-for="(task, i) in tasks">
          <v-divider v-if="i !== 0" :key="`${i}-divider`"></v-divider>

          <v-list-item :key="`${i}-${task.text}`">
            <v-list-item-action>
              <v-checkbox
                v-model="task.done"
                :color="(task.done && 'grey') || 'primary'"
                @click="update(task)"
              >
                <template v-slot:label>
                  <div
                    :class="(task.done && 'grey--text') || 'primary--text'"
                    class="ml-4"
                    v-text="task.text"
                  ></div>
                </template>
              </v-checkbox>
            </v-list-item-action>

            <v-spacer></v-spacer>
            <v-scroll-x-transition>
              <v-icon v-if="task.done" color="success">mdi-check</v-icon>
            </v-scroll-x-transition>
            <v-btn class="mx-2" fab dark small color="primary" @click="deleteTodo(task)">
              <v-icon dark>mdi-minus</v-icon>
            </v-btn>
          </v-list-item>
        </template>
      </v-slide-y-transition>
    </v-card>
  </v-container>
</template>

<script>
import db from "@/firebase/init";
import firebase from "firebase";

export default {
  name: "Home",

  data: () => ({
    tasks: [],
    task: null,
    user: null,
    doc_id: null,
  }),
  computed: {
    completedTasks() {
      return this.tasks.filter((task) => task.done).length;
    },
    progress() {
      return (this.completedTasks / this.tasks.length) * 100;
    },
    remainingTasks() {
      return this.tasks.length - this.completedTasks;
    },
  },

  methods: {
    create() {
      db.collection("users")
        .doc(this.user.email)
        .collection("todos")
        .add({ done: false, text: this.task })
        .then((doc) => {
          this.addToList(doc.id);
        });
    },
    addToList(doc_id) {
      this.tasks.push({ done: false, text: this.task, id: doc_id });
      this.task = null;
    },
    removeFromList(task_id) {
      this.tasks = this.tasks.filter((task) => {
        return task.id !== task_id;
      });
    },

    update(task) {
      db.collection("users")
        .doc(this.user.email)
        .collection(`todos`)
        .doc(task.id)
        .update({ done: task.done });
      this.tasks.sort((x, y) => x.done - y.done).reverse();
    },
    deleteTodo(task) {
      db.collection("users")
        .doc(this.user.email)
        .collection(`todos`)
        .doc(task.id)
        .delete()
        .then(() => {
          this.removeFromList(task.id);
        });
    },
    renderList() {
      db.collection("users")
        .doc(this.user.email)
        .collection("todos")
        .orderBy("done", "desc")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            this.tasks.push({
              done: doc.data().done,
              text: doc.data().text,
              id: doc.id,
            });
          });
        });
    },
  },
  mounted() {
    this.user = firebase.auth().currentUser;
    this.renderList();
  },
};
</script>
