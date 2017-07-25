<template>
    <v-container>
        <v-layout row wrap>
            <v-flex xs12 sm10 md8 lg6 offset-sm1 offset-md2 offset-lg3>
                <v-card class="info">
                    <v-container fluid>
                        <v-layout row>
                            <v-flex xs5 sm4 md3>
                                <v-card-media
                                    src="https://thenypost.files.wordpress.com/2017/04/new-york.jpg?quality=90&strip=all&w=1200"
                                    height="130px">
                                </v-card-media>
                            </v-flex>
                            <v-flex xs7 sm8 md9>
                                <v-card-title primary-title>
                                    <div>
                                        <h5 class="white--text mb-0">My Meetup</h5>
                                        <div>7th July 2017</div>
                                    </div>
                                </v-card-title>
                                <v-card-actions>
                                    <v-btn flat to="/meetups/2">
                                        <v-icon left light>arrow_forward</v-icon>
                                        View Meetup
                                    </v-btn>
                                </v-card-actions>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>
