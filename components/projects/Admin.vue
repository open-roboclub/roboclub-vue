<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn dark fab class="cyan" v-on="on">
          <v-icon dark>
            mdi-plus
          </v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Add New Project</span>
          <v-container text-xs-center>
            <v-flex xs-12>
              <v-progress-circular
                v-if="loading"
                :size="70"
                :width="7"
                color="purple"
                indeterminate
              ></v-progress-circular>
            </v-flex>
          </v-container>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-text-field
                v-model="project.name"
                :counter="100"
                :rules="nameRules"
                label="Name*"
                required
              ></v-text-field>

              <v-text-field
                v-model="project.team"
                :rules="teamRules"
                label="Team*"
                placeholder="For example: Areeb Jamal, Haider Ali"
                required
              ></v-text-field>

              <v-btn raised class="secondary" @click="onPickFile"
                >Upload Image</v-btn
              >
              <input
                ref="fileInput"
                type="file"
                style="display: none"
                accept="image/*"
                @change="onFilePicked"
              />
              <br />
              <img :src="imageUrl" height="150" />
              <br />

              <span class="text"> Gallery images</span>
              <v-btn raised class="cyan" @click="onMultiFilePick"
                >Upload Images</v-btn
              >
              <v-progress-circular
                v-if="uploadSuccess"
                indeterminate
              ></v-progress-circular>
              <input
                ref="multiFileInput"
                type="file"
                style="display: none"
                accept="image/*"
                multiple
                @change="onMultiFilePicked"
              />

              <v-textarea
                v-model="project.description"
                :rules="descriptionRules"
                label="Description*"
                placeholder="Enter description so that others can know about this project."
                required
              ></v-textarea>

              <v-checkbox
                v-model="project.ongoing"
                label="Ongoing"
                color="secondary"
              ></v-checkbox>

              <v-text-field
                v-model="project.youtube"
                :counter="11"
                :rules="ytRules"
                label="YouTube video ID"
                placeholder="For example: RWldvqO4AIY"
              ></v-text-field>

              <v-checkbox
                v-model="addDocs"
                label="Add Documents"
                color="secondary"
              ></v-checkbox>

              <v-form v-if="addDocs">
                <v-container>
                  <v-layout>
                    <v-flex xs12 md4>
                      <v-text-field
                        v-model="project_report"
                        label="Project Report Link"
                        required
                      ></v-text-field>
                    </v-flex>

                    <v-flex xs12 md4>
                      <v-text-field
                        v-model="poster"
                        label="Poster Link"
                        required
                      ></v-text-field>
                    </v-flex>

                    <v-flex xs12 md4>
                      <v-text-field
                        v-model="presentation"
                        label="Presentation Link"
                        required
                      ></v-text-field>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-form>

              <v-btn :disabled="!valid" color="success" @click="validate">
                Validate
              </v-btn>

              <v-btn color="error" @click="reset">
                Reset Form
              </v-btn>

              <v-btn color="warning" @click="resetValidation">
                Reset Validation
              </v-btn>
            </v-form>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false"
            >Close</v-btn
          >
          <v-btn
            :disabled="uploadSuccess"
            color="blue darken-1"
            flat
            @click="saveProject"
            >Save</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
// import { file } from '@babel/types'
import firebase from '@firebase/app'
import '@firebase/storage'
export default {
  data: () => ({
    project: {
      name: '',
      team: '',
      description: '',
      youtube: '',
      id: '',
      ongoing: false,
      docs: [],
      images: []
    },
    dialog: false,
    valid: true,
    nameRules: [
      v => !!v || 'Title is required',
      v => (v && v.length <= 100) || 'Title must be less than 100 characters'
    ],
    teamRules: [v => !!v || 'Team is required'],
    imageUrl: '',
    image: null,
    descriptionRules: [v => !!v || 'Description is required'],
    ytRules: [v => (v && v.length === 11) || 'Must be equal to 11 characters'],
    loading: false,
    addDocs: false,
    project_report: '',
    presentation: '',
    poster: '',
    uploadSuccess: false
  }),
  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        this.snackbar = true
      }
    },
    reset() {
      this.$refs.form.reset()
      this.imageUrl = ''
      this.image = null
      this.project_report = ''
      this.presentation = ''
      this.poster = ''
    },
    resetValidation() {
      this.$refs.form.resetValidation()
    },
    getID(title) {
      let id = title.replace(/[^a-z\d\s]+/gi, '')
      id = id.replace(/\s+/g, '-').toLowerCase()
      return id
    },
    setDocs() {
      if (this.addDocs === false) {
        delete this.project.docs
      } else {
        if (this.project_report.length > 0) {
          this.project.docs.push({
            name: 'Project Report',
            url: this.project_report
          })
        }
        if (this.poster.length > 0) {
          this.project.docs.push({
            name: 'Poster',
            url: this.poster
          })
        }
        if (this.presentation.length > 0) {
          this.project.docs.push({
            name: 'Presentation',
            url: this.presentation
          })
        }
        if (this.project.docs.length === 0) {
          delete this.project.docs
        }
      }
    },
    onPickFile() {
      this.$refs.fileInput.click()
    },
    onMultiFilePick() {
      this.$refs.multiFileInput.click()
    },
    onFilePicked(event) {
      const files = event.target.files
      const filename = files[0].name
      if (filename.lastIndexOf('.') <= 0) {
        return alert('Please upload a valid file.')
      }
      const fileReader = new FileReader()
      fileReader.addEventListener('load', () => {
        this.imageUrl = fileReader.result
      })
      fileReader.readAsDataURL(files[0])
      this.image = files[0]
    },
    onMultiFilePicked: async function(event) {
      try {
        if (this.project.name === '') {
          alert('Please enter the name of the project first!')
        } else {
          this.uploadSuccess = true
          const ID = this.getID(this.project.name)
          const files = event.target.files
          console.log(files)
          for (let i = 0; i < files.length; i++) {
            const filename = files[i].name
            const response = await firebase
              .storage()
              .ref('galleryImages/' + ID + '-' + filename)
              .put(files[i])
            const downloadURL = await response.ref.getDownloadURL()
            this.project.images.push(downloadURL)
            this.uploadSuccess = files.length === this.project.images.length
          }
        }
      } catch (err) {
        console.log(err)
      }
    },
    saveProject: async function() {
      try {
        this.loading = true
        const filename = this.image.name
        const ext = filename.slice(filename.lastIndexOf('.'))
        this.setDocs()
        this.project.id = this.getID(this.project.name)
        const response = await this.$firebase
          .database()
          .ref('projects')
          .push(this.project)
        const key = response.key
        const storageResponse = await firebase
          .storage()
          .ref('projects/' + key + ext)
          .put(this.image)
        const downloadURL = await storageResponse.ref.getDownloadURL()
        await this.$firebase
          .database()
          .ref('projects')
          .child(key)
          .update({ image: downloadURL })
        this.loading = false
        this.dialog = false
        console.log('new project succesfully saved')
      } catch (err) {
        console.error(err)
      }
    }
  }
}
</script>
