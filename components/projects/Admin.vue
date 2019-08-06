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
                label="Team"
                placeholder="For example: Areeb Jamal, Haider Ali"
                required
              ></v-text-field>

              <span class="text">The single dedicated image:</span>
              <v-btn raised class="cyan" @click="onPickFile"
                >Upload Featured Image</v-btn
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
              <br />

              <span class="text">Can be more than one:</span>
              <v-btn raised class="cyan" @click="onMultiFilePick"
                >Upload Gallery Images</v-btn
              >
              <v-progress-circular
                v-if="uploadRemaining"
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

              <v-btn color="orange" @click="reset">
                Reset Form
              </v-btn>
            </v-form>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false + reset()"
            >Close</v-btn
          >
          <v-btn
            :disabled="uploadRemaining"
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
    imageUrl: '',
    image: null,
    descriptionRules: [v => !!v || 'Description is required'],
    loading: false,
    addDocs: false,
    project_report: '',
    presentation: '',
    poster: '',
    uploadRemaining: false,
    galleryImages: []
  }),
  methods: {
    nonValid() {
      if (this.project.name === '' || this.project.description === '') {
        return true
      } else {
        return false
      }
    },
    reset() {
      this.$refs.form.reset()
      this.imageUrl = ''
      this.image = null
      this.project_report = ''
      this.presentation = ''
      this.poster = ''
      this.uploadRemaining = false
      this.galleryImages = []
      this.project.ongoing = false
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
    async onMultiFilePicked(event) {
      try {
        if (this.project.name === '') {
          alert('Please enter the name of the project first!')
        } else {
          this.uploadRemaining = true
          const ID = this.getID(this.project.name)
          const files = event.target.files
          console.log(files)
          for (let i = 0; i < files.length; i++) {
            const filename = files[i].name
            const response = await firebase
              .storage()
              .ref('projects/' + ID + '/' + filename)
              .put(files[i])
            const downloadURL = await response.ref.getDownloadURL()
            this.galleryImages.push(downloadURL)
            this.uploadRemaining = !(files.length === this.galleryImages.length)
            if (this.uploadRemaining === false) {
              break
            }
          }
        }
      } catch (err) {
        console.log(err)
      }
    },
    async saveProject() {
      try {
        if (this.nonValid()) {
          alert('Entered details are invalid. Please try again.')
          return
        }
        this.loading = true
        if (this.project.youtube.length <= 0) {
          delete this.project.youtube
        }
        if (this.project.team.length <= 0) {
          delete this.project.team
        }
        const defaultURL =
          'https://res.cloudinary.com/amuroboclub/image/upload/old/robo.jpg'
        this.setDocs()
        this.project.id = this.getID(this.project.name)
        if (this.galleryImages.length > 0) {
          this.project.images = this.galleryImages
        } else {
          delete this.project.images
        }
        const response = await this.$firebase
          .database()
          .ref('projects')
          .push(this.project)
        const key = response.key
        if (this.imageUrl.length > 0) {
          const filename = this.image.name
          const ext = filename.slice(filename.lastIndexOf('.'))
          const storageResponse = await firebase
            .storage()
            .ref('projects/' + this.project.id + '/' + key + ext)
            .put(this.image)
          const downloadURL = await storageResponse.ref.getDownloadURL()
          await this.$firebase
            .database()
            .ref('projects')
            .child(key)
            .update({ image: downloadURL })
        } else {
          await this.$firebase
            .database()
            .ref('projects')
            .child(key)
            .update({ image: defaultURL })
        }
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
