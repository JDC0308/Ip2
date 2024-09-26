<template>
    <v-container>
      <div class="fighter-management">
        <v-btn color="green darken-2" @click="showAddFighterDialog = true">
          Add New Fighter
        </v-btn>
  
      </div>
  
      <!-- Add Fighter Dialog -->
      <v-dialog v-model="showAddFighterDialog" max-width="600px">
          <v-card>
            <v-card-title class="headline">Add New UFC Fighter</v-card-title>
            <v-card-text>
              <v-form ref="addForm" v-model="valid">
                <v-text-field
                  label="Name"
                  v-model="newFighter.name"
                  :rules="[v => !!v || 'Name is required']"
                  color="green darken-2"
                ></v-text-field>
                <v-text-field
                  label="Weight Class"
                  v-model="newFighter.weight_class"
                  :rules="[v => !!v || 'Weight class is required']"
                  color="green darken-2"
                ></v-text-field>
                <v-text-field
                  label="Wins"
                  v-model="newFighter.wins"
                  type="number"
                  :rules="[v => v >= 0 || 'Wins must be 0 or more']"
                  color="green darken-2"
                ></v-text-field>
                <v-text-field
                  label="Losses"
                  v-model="newFighter.losses"
                  type="number"
                  :rules="[v => v >= 0 || 'Losses must be 0 or more']"
                  color="green darken-2"
                ></v-text-field>
                <v-text-field
                  label="Draws"
                  v-model="newFighter.draws"
                  type="number"
                  :rules="[v => v >= 0 || 'Draws must be 0 or more']"
                  color="green darken-2"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-btn color="green darken-2" @click="addFighter" :disabled="!valid">Save</v-btn>
              <v-btn color="red darken-2" @click="showAddFighterDialog = false">Cancel</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
  
      <!-- Edit Fighter Dialog -->
      <v-dialog v-model="showEditFighterDialog" max-width="500px">
        <v-card>
          <v-card-title class="headline">Edit Fighter</v-card-title>
          <v-card-text>
            <v-form ref="editForm" v-model="valid">
              <v-text-field label="Name" v-model="editedFighter.name" :rules="[v => !!v || 'Name is required']"></v-text-field>
              <v-text-field label="Weight Class" v-model="editedFighter.weight_class" :rules="[v => !!v || 'Weight class is required']"></v-text-field>
              <v-text-field label="Wins" v-model="editedFighter.wins" type="number" :rules="[v => v >= 0 || 'Wins must be 0 or more']"></v-text-field>
              <v-text-field label="Losses" v-model="editedFighter.losses" type="number" :rules="[v => v >= 0 || 'Losses must be 0 or more']"></v-text-field>
              <v-text-field label="Draws" v-model="editedFighter.draws" type="number" :rules="[v => v >= 0 || 'Draws must be 0 or more']"></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn color="red" dark @click="updateFighter" :disabled="!valid">Save</v-btn>
            <v-btn @click="showEditFighterDialog = false">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  
        <!-- Fighter Table -->
        <v-data-table :headers="headers" :items="fighters" class="elevation-2 fighter-table" v-if="!loading">
          <template v-slot:item.actions="{ item }">
            <v-btn icon @click="openEditDialog(item)">
              <v-icon color="blue darken-2">mdi-pencil</v-icon>
            </v-btn>
            <v-btn icon @click="deleteFighter(item.id)">
              <v-icon color="red darken-2">mdi-delete</v-icon>
            </v-btn>
          </template>
        </v-data-table>
  
      <v-progress-circular v-if="loading" indeterminate color="red"></v-progress-circular>
    </v-container>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        showAddFighterDialog: false,
        showEditFighterDialog: false,
        fighters: [],
        newFighter: {
          name: '',
          weight_class: '',
          wins: 0,
          losses: 0,
          draws: 0
        },
        editedFighter: {
      name: '',
      weight_class: '',
      wins: 0,
      losses: 0,
      draws: 0,
    },
        headers: [
          { text: 'Name', value: 'name' },
          { text: 'Weight Class', value: 'weight_class' },
          { text: 'Wins', value: 'wins' },
          { text: 'Losses', value: 'losses' },
          { text: 'Draws', value: 'draws' },
          { text: 'Actions', value: 'actions', sortable: false }
        ],
        loading: false,
        valid: false,
      };
    },
    created() {
      this.fetchFighters();
    },
    methods: {
      async fetchFighters() {
        this.loading = true;
        try {
          const response = await axios.get('http://localhost:3001/fighters');
          this.fighters = response.data;
        } catch (error) {
          console.error(error);
          alert('Failed to load fighters');
        } finally {
          this.loading = false;
        }
      },
      addFighter() {
    if (this.$refs.addForm.validate()) {
      axios.post('http://localhost:3001/fighters', this.newFighter)
        .then(() => {
          this.fetchFighters();
          this.showAddFighterDialog = false;
          this.newFighter = { name: '', weight_class: '', wins: 0, losses: 0, draws: 0 };
        })
        .catch(error => {
          console.error(error);
          alert('Failed to add fighter');
        });
    }
  },
  
  openEditDialog(fighter) {
    if (fighter) {
      this.editedFighter = { ...fighter }; // Clone the fighter object
      this.showEditFighterDialog = true;
    } else {
      console.error('No fighter selected for editing');
    }
  },
  updateFighter() {
    if (this.$refs.editForm.validate() && this.editedFighter) {
      axios
        .put(`http://localhost:3001/fighters/${this.editedFighter.id}`, this.editedFighter)
        .then(() => {
          this.fetchFighters();
          this.showEditFighterDialog = false;
          this.editedFighter = null; 
          location.reload();
        })
        .catch((error) => {
          console.error(error);
          alert('Failed to update fighter');
        });
    }
  },

  
      deleteFighter(id) {
        axios.delete(`http://localhost:3001/fighters/${id}`)
          .then(() => {
            this.fetchFighters();
          })
          .catch(error => {
            console.error(error);
            alert('Failed to delete fighter');
          });
      }
    }
  };
  </script>
  
  <style scoped>
  .fighter-management {
    background: #1e1e1e;
    padding: 20px;
    border-radius: 10px;
    color: #fff;
  }
  
  .fighter-table {
    margin-top: 20px;
  }
  
  .v-btn {
    margin-bottom: 20px;
  }
  
  .v-card-title {
    background: #333;
    color: #fff;
  }
  
  .v-card-actions {
    display: flex;
    justify-content: space-between;
  }
  
  .v-icon {
    cursor: pointer;
  }
  </style>