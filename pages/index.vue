<template>
  <v-container>
    <v-row>
      <v-col sm="12" lg="8">
        <v-card class="mb-3">
          <v-container>
            <v-row>
              <v-col sm="12" class="text-sm-center text-center xs">
                <iframe
                  width="480"
                  height="300"
                  allowfullscreen
                  src="https://www.youtube.com/embed/3TSxPcIJCB0?rel=0&showinfo=0&theme=light"
                  loading="lazy"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col sm="12" class="text-sm-center">
                <v-card-title primary-title class="card-text">
                  AMU Roboclub is a student’s body which caters to the need of
                  electronics enthusiasts and hobbyists in creating an
                  environment which is driven by innovation and implementation.
                  Run under the able guidance and supervision of faculty
                  advisors from various branches of engineering, AMU Roboclub
                  stands as an epitome of marvel. It not only acts as a platform
                  for zealous students to hone their skills in the field of
                  Electrical, Electronics, Computers and Mechanical but also
                  prepares them for various national competitions by encouraging
                  participation.
                </v-card-title>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
        <v-card class="mb-3">
          <v-card-title class="card-text">
            In the last couple of years, students from AMU Roboclub have won
            many awards in various competitions which speak of its testimony.
            Regular Classes, Annual Workshop, Guest Lectures, Project
            Exhibition, Student Competitions etc are some of the main functions
            of the club. Robonics, the annual workshop of AMU Roboclub has
            earned a name in itself. The highlights of the club which
            differentiates it from the peers are its adherence to the
            curriculum, its student-student interaction and importantly project
            developments. More than 80 ideas have culminated into working models
            so far and the number is on the rise. The strength of the club lies
            in its Student members, it is them who has given a high repute to
            the club. The members who complete at least one project under AMU
            Roboclub are felicitated and they earn for themselves a separate
            webpage in the AMU Roboclub website which is dedicated for their
            description and achievements. AMU Roboclub alumni always attribute a
            portion of their successes to the time and effort they spent at AMU
            Roboclub which helped them become what they are today.
          </v-card-title>
        </v-card>
        <v-card color="#00796B">
          <v-container>
            <v-card-text class="pt-3">
              <div>
                <h1 class="team-header pb-2">Team Co-ordinators</h1>
              </div>
            </v-card-text>
            <div v-if="!coordinators.length" class="text-center">
              <v-progress-circular indeterminate color="white" />
            </div>
            <v-row>
              <v-card
                v-for="item in coordinators"
                :key="item['.key']"
                width="200"
                class="mx-auto"
                color="#458B74"
              >
                <v-col cols="12" class="text-center">
                  <v-avatar
                    :tile="false"
                    :size="150"
                    color="grey lighten-4 mt-3"
                  >
                    <resize-img
                      :aspect-ratio="16 / 9"
                      :src="item.profileImageUrl"
                      :alt="item.name"
                      :width="250"
                    />
                  </v-avatar>
                </v-col>
                <v-col cols="12" class="text-center">
                  <span style="color: white">{{ item.name }}</span>
                </v-col>
              </v-card>
            </v-row>
            <v-col cols="12" class="text-center">
              <br />
              <nuxt-link to="/team" class="iconLink">
                <v-icon dark x-large color="#7FFF00">
                  mdi-arrow-right-bold-circle
                </v-icon>
              </nuxt-link>
            </v-col>
          </v-container>
        </v-card>
        <v-row>
          <v-col cols="12" sm="6">
            <v-card class="mt-3 mr-3">
              <v-img
                src="https://res.cloudinary.com/amuroboclub/image/upload/v1492699176/14474306_1412485605448267_5100030826549084160_n_k7hi7c.webp"
              />
              <v-card-title primary-title>
                <div class="card-text">
                  The Zakir Husain College of Engineering & Technology with its
                  foundation stone being laid on 21st November 1938, stands
                  today as an epitome in the field of engineering and
                  technology, manifesting quality education to build
                  intellectual competitiveness. ZHCET named after a great
                  scholar of AMU and the former President of India, Dr. Zakir
                  Husain, extends its arms for hundreds of students from across
                  the country and abroad.
                </div>
              </v-card-title>
              <v-card-actions>
                <a href="http://amu.ac.in/principal.jsp?did=10147">
                  <v-btn text color="orange">KNOW MORE</v-btn>
                </a>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col cols="12" sm="6">
            <v-card class="mt-3">
              <v-img
                src="https://res.cloudinary.com/amuroboclub/image/upload/v1492699314/amu_ps6arw.webp"
              />
              <v-card-title primary-title>
                <div class="card-text">
                  Aligarh Muslim University (AMU) occupies a unique position
                  amongst universities and institutions of higher learning in
                  the country. It was established in 1920, and evolved out of
                  the Mohammedan Anglo-Oriental College (MAO College) which was
                  set up in 1877 by the great visionary and social reformer, Sir
                  Syed Ahmad Khan. Spread over 467.6 hectares in the city of
                  Aligarh, Uttar Pradesh, Aligarh Muslim University offers more
                  than 300 courses in the traditional and modern branches of
                  education. It ranks 5th among the top universities in India.
                </div>
              </v-card-title>
              <v-card-actions>
                <a href="http://www.amu.ac.in/">
                  <v-btn text color="orange">KNOW MORE</v-btn>
                </a>
              </v-card-actions>
            </v-card>
            <v-card color="#CDC8B1" class="mt-3 mb-4">
              <v-container>
                <v-row>
                  <v-col cols="2" class="text-center">
                    <v-icon left x-large color="black"> mdi-city </v-icon>
                  </v-col>
                  <v-col cols="10">
                    WS-18, <br />Mechanical Workshop Compound, <br />Zakir
                    Husain College of Engg & Tech, <br />Aligarh Muslim
                    University, Aligarh. <br />India.
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" class="text-center mt-1">
                    <a
                      class="iconLink"
                      href="//www.google.co.in/maps/place/AMU+Roboclub/@27.91423,78.07735,15z"
                      target="_blank"
                      rel="noopener"
                    >
                      <v-icon light x-large> mdi-map-legend </v-icon>
                    </a>
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
      <v-col sm="12" lg="4">
        <PageLoader v-show="!recentNews.length" />
        <v-card
          v-for="item in recentNews"
          :key="item['.key']"
          class="mb-3"
          color="#F5F5DC"
        >
          <v-container>
            <v-row style="padding-right: 10px">
              <v-col cols="1" lg="2" xl="1" style="min-width: 40px">
                <v-icon left x-large color="black"> mdi-newspaper </v-icon>
              </v-col>
              <v-col cols="11" lg="10" xl="11">
                {{ item.notice }}
                <br />
                <br />
                {{ item.date }}
              </v-col>
            </v-row>
          </v-container>
        </v-card>
        <v-card v-if="recentNews.length" color="#CDC8B1" class="mb-3">
          <v-container>
            <v-row>
              <v-col cols="12" class="text-center">
                <nuxt-link to="/news" class="iconLink">
                  <v-icon x-large> mdi-expand-all </v-icon>
                </nuxt-link>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import PageLoader from '@/components/widgets/PageLoader.vue'
import ResizeImg from '@/components/widgets/ResizeImg.vue'

export default {
  components: { PageLoader, ResizeImg },
  head() {
    return {
      title: 'Home'
    }
  },
  computed: {
    ...mapGetters('news', ['recentNews']),
    ...mapGetters('team', ['coordinators'])
  },
  created() {
    this.setRecentNewsRef()
    this.setTeamRef()
  },
  methods: {
    ...mapActions('news', ['setRecentNewsRef']),
    ...mapActions('team', ['setTeamRef'])
  }
}
</script>

<style scoped>
.card-text {
  font-size: 17px;
}
.team-header {
  color: white;
  text-align: center;
  font-size: 33px;
}
.news-item {
  font-size: 16px;
}
.iconLink {
  text-decoration: none;
}
</style>
