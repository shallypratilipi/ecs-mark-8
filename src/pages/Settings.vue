<template>
    <MainLayout>
        <div class="settings-page page-wrap">
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="head-title">Settings</div>
                        <button type="button" class="sign-out btn btn-light" name="button" @click="triggerEventAndLogoutUser"><i class="material-icons">power_settings_new</i> __("user_sign_out")</button>
                        <div class="settings-menu">
                            <a href="#" v-on:click="tabchange" class="active" data-tab="profile-settings">__("menu_profile")</a>
                            <a href="#" v-on:click="tabchange" data-tab="notification-settings">__("notification_notifications")</a>
                            <a href="#" v-on:click="tabchange" data-tab="password-settings">__("seo_update_password_page")</a>
                        </div>
                        <div class="menu-contents">
                            <div class="tabs" id="profile-settings">
                                <form>
                                    <div class="form-row">
                                        <div class="form-group col-md-6 col-sm-12">
                                            <label for="pratilipi-settings-first-name">__('edit_author_first_name') *</label>
                                            <!-- <input type="text" class="form-control" id="pratilipi-settings-first-name" v-model="authorData.firstName" @input="updateFirstName" placeholder="__('edit_author_first_name')"> -->
                                            <TranslatingInput :value="authorData.firstName" placeholder="__('edit_author_first_name')" :oninput="updateFirstName"></TranslatingInput>
                                        </div>
                                        <div class="form-group col-md-6 col-sm-12">
                                            <label for="pratilipi-settings-last-name">__('edit_author_last_name')</label>
                                            <!-- <input type="text" class="form-control" id="pratilipi-settings-last-name" v-model="authorData.lastName" @input="updateLastName" placeholder="__('edit_author_last_name')"> -->
                                            <TranslatingInput :value="authorData.lastName" placeholder="__('edit_author_last_name')" :oninput="updateLastName"></TranslatingInput>
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-6 col-sm-12">
                                            <label for="pratilipi-settings-first-name-en">__('edit_author_first_name_en') *</label>
                                            <input type="text" class="form-control" id="pratilipi-settings-first-name-en" v-model="authorData.firstNameEn" placeholder="__('edit_author_first_name_en')">
                                        </div>
                                        <div class="form-group col-md-6 col-sm-12">
                                            <label for="pratilipi-settings-last-name-en">__('edit_author_last_name_en')</label>
                                            <input type="text" class="form-control" id="pratilipi-settings-last-name-en" v-model="authorData.lastNameEn" placeholder="__('edit_author_last_name_en')">
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-6 col-sm-12">
                                            <label for="pratilipi-settings-pen-name">__('edit_author_pen_name') *</label>
                                            <input type="text" class="form-control" id="pratilipi-settings-pen-name" v-model="authorData.penName" placeholder="__('edit_author_pen_name')">
                                        </div>
                                        <div class="form-group col-md-6 col-sm-12">
                                            <label for="pratilipi-settings-language">__("language_choose_language") *</label>
                                            <select class="form-control" id="pratilipi-settings-language" @input="updateLanguage">
                                                <option disabled selected>__("language_choose_language")</option>
                                                <option
                                                    :selected="eachLanguage.fullName.toUpperCase() === authorData.language"
                                                    :value="eachLanguage.fullName.toUpperCase()"
                                                    v-for="eachLanguage in constants.LANGUAGES"
                                                    :key="eachLanguage.shortName">
                                                    {{ eachLanguage.fullName.toUpperCase() }}
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-6 col-sm-12">
                                            <label for="pratilipi-settings-summary">__('edit_author_summary')</label>
                                            <textarea class="form-control" id="pratilipi-settings-summary" v-model="authorData.summary" rows="3"></textarea>
                                        </div>
                                    </div>
                                    <div class="section-title">Private Information</div>
                                    <div class="form-row">
                                        <div class="form-group col-md-6 col-sm-12">
                                            <label for="pratilipi-settings-email">__('user_email')</label>
                                            <input type="email" class="form-control" id="pratilipi-settings-email" v-model="userData.email" placeholder="__('user_email')">
                                        </div>
                                        <div class="form-group col-md-6 col-sm-12">
                                            <label for="pratilipi-settings-phone">__('user_phone')</label>
                                            <input type="tel" class="form-control" id="pratilipi-settings-phone" v-model="userData.phone" placeholder="__('user_phone')">
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-6 col-sm-12">
                                            <label for="pratilipi-settings-gender">__('gender')</label>
                                            <select class="form-control" id="pratilipi-settings-gender" @input="updateGender">
                                                <option disabled selected>__("gender")</option>
                                                <option :selected="'MALE' === authorData.gender" value="MALE">__("gender_male")</option>
                                                <option :selected="'FEMALE' === authorData.gender" value="FEMALE">__("gender_female")</option>
                                                <option :selected="'OTHER' === authorData.gender" value="OTHER">__("gender_other")</option>
                                            </select>
                                        </div>
                                        <div class="form-group col-md-6 col-sm-12">
                                            <label for="pratilipi-settings-dateOfBirth">__('author_date_of_birth')</label>
                                            <input type="date" class="form-control" id="pratilipi-settings-dateOfBirth" v-model="authorData.dateOfBirth" placeholder="__('author_date_of_birth')">
                                        </div>
                                    </div>
                                    <button type="button" class="btn update-btn" @click="updateProfileSettings">__("save_changes")</button>
                                </form>
                            </div>
                            <div class="tabs" id="notification-settings">
                                <form>
                                    <div class="form-row">
                                        <div class="form-group col-md-6 col-sm-12">
                                            <label for="pratilipi-settings-email-frequency">__('email_frequency')</label>
                                            <select class="form-control" id="pratilipi-settings-email-frequency" @input="updateEmailFrequency">
                                                <option disabled selected>__("email_frequency")</option>
                                                <option :selected="'IMMEDIATELY' === notificationSettings.emailFrequency" value="IMMEDIATELY">__("email_frequency_immediate")</option>
                                                <option :selected="'DAILY' === notificationSettings.emailFrequency" value="DAILY">__("email_frequency_daily")</option>
                                                <option :selected="'WEEKLY' === notificationSettings.emailFrequency" value="WEEKLY">__("email_frequency_weekly")</option>
                                                <option :selected="'MONTHLY' === notificationSettings.emailFrequency" value="MONTHLY">__("email_frequency_monthly")</option>
                                                <option :selected="'NEVER' === notificationSettings.emailFrequency" value="NEVER">__("email_frequency_never")</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="section-title">__("notification_group_content")</div>
                                    <div class="form-row">
                                        <div class="form-check">
                                            <input type="checkbox" v-model="notificationSettings.notificationSubscriptions.USER_PRATILIPI_REVIEW" class="form-check-input" id="notif_option_new_review">
                                            <label class="form-check-label" for="notif_option_new_review">__("option_new_review")</label>
                                        </div>
                                        <div class="form-check">
                                            <input type="checkbox"  v-model="notificationSettings.notificationSubscriptions.COMMENT_REVIEW_REVIEWER" class="form-check-input" id="notif_option_new_comment">
                                            <label class="form-check-label" for="notif_option_new_comment">__("option_new_comment")</label>
                                        </div>
                                        <div class="form-check">
                                            <input type="checkbox" v-model="notificationSettings.notificationSubscriptions.VOTE_REVIEW_REVIEWER" class="form-check-input" id="notif_option_like_review">
                                            <label class="form-check-label" for="notif_option_like_review">__("option_like_review")</label>
                                        </div>
                                        <div class="form-check">
                                            <input type="checkbox" v-model="notificationSettings.notificationSubscriptions.VOTE_COMMENT_REVIEW_COMMENTOR" class="form-check-input" id="notif_option_like_comment">
                                            <label class="form-check-label" for="notif_option_like_comment">__("option_like_comment")</label>
                                        </div>
                                    </div>

                                    <div class="section-title">__("notification_group_network")</div>
                                    <div class="form-row">
                                        <div class="form-check">
                                            <input type="checkbox" v-model="notificationSettings.notificationSubscriptions.AUTHOR_FOLLOW" class="form-check-input" id="notif_option_new_follower">
                                            <label class="form-check-label" for="notif_option_new_follower">__("option_new_follower")</label>
                                        </div>
                                        <div class="form-check">
                                            <input type="checkbox" v-model="notificationSettings.notificationSubscriptions.PRATILIPI_PUBLISHED_FOLLOWER" class="form-check-input" id="notif_option_pratilipi_published_follower">
                                            <label class="form-check-label" for="notif_option_pratilipi_published_follower">__("option_pratilipi_published_follower")</label>
                                        </div>
                                        <div class="form-check">
                                            <input type="checkbox" class="form-check-input" id="notif_option_pratilipi_updates">
                                            <label class="form-check-label" for="notif_option_pratilipi_updates">__("option_pratilipi_updates")</label>
                                        </div>
                                    </div>
                                    <button type="button" class="btn update-btn" @click="setUserPreference">__("save_changes")</button>
                                </form>
                            </div>
                            <div class="tabs" id="password-settings">
                                <form>
                                    <div class="form-row">
                                        <div class="form-group col-md-6 col-sm-12">
                                            <label for="pratilipi-settings-current-password">__('user_current_password') *</label>
                                            <input type="password" class="form-control" v-model="oldPassword" id="pratilipi-settings-current-password" placeholder="__('user_current_password')">
                                        </div>
                                    </div>
                                    <div class="form-row">
                                        <div class="form-group col-md-6 col-sm-12">
                                            <label for="pratilipi-settings-new-password">__('user_new_password') *</label>
                                            <input type="password" class="form-control" id="pratilipi-settings-new-password" placeholder="__('user_new_password')">
                                        </div>
                                        <div class="form-group col-md-6 col-sm-12">
                                            <label for="pratilipi-settings-confirm-password">__('user_confirm_password') *</label>
                                            <input type="password" class="form-control" v-model="newPassword" id="pratilipi-settings-confirm-password" placeholder="__('user_confirm_password')">
                                        </div>
                                    </div>
                                    <button type="button" class="btn update-btn" @click="triggerEventAndUpdateUserPassword({ oldPassword, newPassword })">__("save_changes")</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="spinner-overlay" v-if="getAuthorLoadingState === 'LOADING' || getAuthorUpdateState === 'LOADING'">
                <Spinner></Spinner>
            </div>
        </div>
    </MainLayout>
</template>

<script>
import MainLayout from '@/layout/main-layout.vue';
import TranslatingInput from '@/components/TranslatingInput.vue';
import Spinner from '@/components/Spinner.vue';
import constants from '@/constants';
import mixins from '@/mixins';
import { mapGetters, mapActions } from 'vuex'

export default {
    components: {
        MainLayout,
        TranslatingInput,
        Spinner
    },
    data() {
        return {
            constants,
            oldPassword: '',
            newPassword: '',
            initial_author_data: null,
            authorData: {
                firstName: null,
                lastName: null,
                firstNameEn: null,
                lastNameEn: null,
                language: null,
                summary: null,
                penName: null,
                gender: null,
                dateOfBirth: null
            },
            userData: {
                email: null,
                phone: null
            },
            notificationSettings: {
                emailFrequency: 'IMMEDIATELY',
                notificationSubscriptions: {
                    AUTHOR: true,
                    AUTHOR_FOLLOW: true,
                    COMMENT_REVIEW_REVIEWER: true,
                    EVENT: true,
                    GENERIC: true,
                    PRATILIPI: true,
                    PRATILIPI_PUBLISHED_FOLLOWER: true,
                    USER_PRATILIPI_REVIEW: true,
                    VOTE_COMMENT_REVIEW_COMMENTOR: true,
                    VOTE_REVIEW_REVIEWER: true
                }
            }
        }
    },
    mixins: [
        mixins
    ],
    computed: {
        ...mapGetters('settingspage', [
            'getAuthorData',
            'getAuthorLoadingState',
            'getAuthorUpdateState'
        ]),
        ...mapGetters([
            'getUserDetails',
            'getLogoutStatus'
        ]),
    },
    methods: {
        ...mapActions('settingspage', [
            'fetchAuthorDetails',
            'updateUserDetails',
            'updateAuthorDetails',
            'updateUserPassword'
        ]),
        ...mapActions([
            'logoutUser'
        ]),
        ...mapActions('alert', [
            'triggerAlert'
        ]),
        updateFirstName(value) {
            this.authorData.firstName = value;
        },
        updateLastName(value) {
            this.authorData.lastName = value;
        },
        tabchange(event) {
            event.preventDefault();
            var tab_id = $(event.currentTarget).attr('data-tab');
            $(".settings-menu a").removeClass("active");
            $(event.currentTarget).addClass("active");
            $(".tabs").hide();
            $("#" + tab_id).show();

            if (tab_id === 'notification-settings') {
                this.triggerAnanlyticsEvent('GOSETNGNOTIFY_SETTINGSM_SETTINGS', 'CONTROL', {
                    'USER_ID': this.getUserDetails.userId
                });
            }
            else if (tab_id === 'password-settings') {
                this.triggerAnanlyticsEvent('GOSETNGSEC_SETTINGSM_SETTINGS', 'CONTROL', {
                    'USER_ID': this.getUserDetails.userId
                });
            }
            else if (tab_id === 'profile-settings') {
                this.triggerAnanlyticsEvent('GOSETNGACC_SETTINGSM_SETTINGS', 'CONTROL', {
                    'USER_ID': this.getUserDetails.userId
                });
            }
        },
        updateLanguage(e) {
            this.authorData.language = e.target.selectedOptions[0].value;
        },
        updateEmailFrequency(e) {
            this.notificationSettings.emailFrequency = e.target.selectedOptions[0].value;
        },
        updateGender(e) {
            this.authorData.gender = e.target.selectedOptions[0].value;
        },
        updateProfileSettings() {
            this.detectChangesAndTriggerEvent();
            this.updateUserDetails(this.userData);
            this.updateAuthorDetails(this.authorData);
            // this.$router.push('login');
        },
        triggerEventAndUpdateUserPassword(data) {
            this.triggerAnanlyticsEvent('RESETPASSWORD_PASSWORD_SETNGPRI', 'CONTROL', {
                'USER_ID': this.getUserDetails.userId
            });
            this.updateUserPassword(data);
        },
        triggerEventAndLogoutUser() {
            const that = this;
            this.triggerAnanlyticsEvent('LOGOUT_SETTINGSM_SETTINGS', 'CONTROL', {
                'USER_ID': this.getUserDetails.userId
            });

            import('firebase').then((firebase) => {
                firebase.auth().signOut().then(function() {
                    console.log( 'Firebase logout success!' );

                    firebase.auth(firebase.app("FirebaseGrowth")).signOut().then(() => {
                        console.log('Firebase Growth logout success');
                        that.logoutUser();
                    }).catch((error) => {
                        console.log(error);
                        console.log('Firebase Growth logout error');
                        that.logoutUser();
                    })
                }).catch(function(error) {
                    console.log(error);
                    console.log( 'Firebase logout error!' );
                    that.logoutUser();
                });
            });
        },
        detectChangesAndTriggerEvent() {

            // For first name
            if(!this.getAuthorData.firstName && this.getAuthorData.firstName !== this.authorData.firstName) {
                this.triggerAnanlyticsEvent('NEWUSERINFO_FNAME_SETNGACC', 'CONTROL', {
                    'USER_ID': this.getUserDetails.userId
                });
            } else if(this.getAuthorData.firstName && this.getAuthorData.firstName !== this.authorData.firstName) {
                this.triggerAnanlyticsEvent('UPDATEUSERINFO_FNAME_SETNGACC', 'CONTROL', {
                    'USER_ID': this.getUserDetails.userId
                });
            }

            // For last name
            if(!this.getAuthorData.lastName && this.getAuthorData.lastName !== this.authorData.lastName) {
                this.triggerAnanlyticsEvent('NEWUSERINFO_LNAME_SETNGACC', 'CONTROL', {
                    'USER_ID': this.getUserDetails.userId
                });
            } else if(this.getAuthorData.lastName && this.getAuthorData.lastName !== this.authorData.lastName) {
                this.triggerAnanlyticsEvent('UPDATEUSERINFO_LNAME_SETNGACC', 'CONTROL', {
                    'USER_ID': this.getUserDetails.userId
                });
            }

            // For pen name
            if(!this.getAuthorData.penName && this.getAuthorData.penName !== this.authorData.penName) {
                this.triggerAnanlyticsEvent('NEWUSERINFO_PENNAME_SETNGACC', 'CONTROL', {
                    'USER_ID': this.getUserDetails.userId
                });
            } else if(this.getAuthorData.penName && this.getAuthorData.penName !== this.authorData.penName) {
                this.triggerAnanlyticsEvent('UPDATEUSERINFO_PENNAME_SETNGACC', 'CONTROL', {
                    'USER_ID': this.getUserDetails.userId
                });
            }

            // For gender
            if(!this.getAuthorData.gender && this.getAuthorData.gender !== this.authorData.gender) {
                this.triggerAnanlyticsEvent('NEWUSERINFO_GENDER_SETNGACC', 'CONTROL', {
                    'USER_ID': this.getUserDetails.userId
                });
            } else if(this.getAuthorData.gender && this.getAuthorData.gender !== this.authorData.gender) {
                this.triggerAnanlyticsEvent('UPDATEUSERINFO_GENDER_SETNGACC', 'CONTROL', {
                    'USER_ID': this.getUserDetails.userId
                });
            }

            // For first name english
            if(!this.getAuthorData.firstNameEn && this.getAuthorData.firstNameEn !== this.authorData.firstNameEn) {
                this.triggerAnanlyticsEvent('NEWUSERINFO_FNAMEENG_SETNGACC', 'CONTROL', {
                    'USER_ID': this.getUserDetails.userId
                });
            } else if(this.getAuthorData.firstNameEn && this.getAuthorData.firstNameEn !== this.authorData.firstNameEn) {
                this.triggerAnanlyticsEvent('UPDATEUSERINFO_FNAMEENG_SETNGACC', 'CONTROL', {
                    'USER_ID': this.getUserDetails.userId
                });
            }

            // For last name english
            if(!this.getAuthorData.lastNameEn && this.getAuthorData.lastNameEn !== this.authorData.lastNameEn) {
                this.triggerAnanlyticsEvent('NEWUSERINFO_LNAMEENG_SETNGACC', 'CONTROL', {
                    'USER_ID': this.getUserDetails.userId
                });
            } else if(this.getAuthorData.lastNameEn && this.getAuthorData.lastNameEn !== this.authorData.lastNameEn) {
                this.triggerAnanlyticsEvent('UPDATEUSERINFO_LNAMEENG_SETNGACC', 'CONTROL', {
                    'USER_ID': this.getUserDetails.userId
                });
            }

            // For language
            if(!this.getAuthorData.language && this.getAuthorData.language !== this.authorData.language) {
                this.triggerAnanlyticsEvent('NEWUSERINFO_CONTENTLANG_SETNGACC', 'CONTROL', {
                    'USER_ID': this.getUserDetails.userId
                });
            } else if(this.getAuthorData.language && this.getAuthorData.language !== this.authorData.language) {
                this.triggerAnanlyticsEvent('UPDATEUSERINFO_CONTENTLANG_SETNGACC', 'CONTROL', {
                    'USER_ID': this.getUserDetails.userId
                });
            }

            // For summary
            if(!this.getAuthorData.summary && this.getAuthorData.summary !== this.authorData.summary) {
                this.triggerAnanlyticsEvent('NEWUSERINFO_USERBIO_SETNGACC', 'CONTROL', {
                    'USER_ID': this.getUserDetails.userId
                });
            } else if(this.getAuthorData.summary && this.getAuthorData.summary !== this.authorData.summary) {
                this.triggerAnanlyticsEvent('UPDATEUSERINFO_USERBIO_SETNGACC', 'CONTROL', {
                    'USER_ID': this.getUserDetails.userId
                });
            }

            // For date of birth
            if(!this.getAuthorData.dateOfBirth && this.getAuthorData.dateOfBirth !== this.authorData.dateOfBirth) {
                this.triggerAnanlyticsEvent('NEWUSERINFO_DOB_SETNGACC', 'CONTROL', {
                    'USER_ID': this.getUserDetails.userId
                });
            } else if(this.getAuthorData.dateOfBirth && this.getAuthorData.dateOfBirth !== this.authorData.dateOfBirth) {
                this.triggerAnanlyticsEvent('UPDATEUSERINFO_DOB_SETNGACC', 'CONTROL', {
                    'USER_ID': this.getUserDetails.userId
                });
            }

            // For email
            if(!this.getUserDetails.email && this.getUserDetails.email !== this.userData.email) {
                this.triggerAnanlyticsEvent('NEWUSERINFO_EMAIL_SETNGACC', 'CONTROL', {
                    'USER_ID': this.getUserDetails.userId
                });
            } else if(this.getUserDetails.email && this.getUserDetails.email !== this.userData.email) {
                this.triggerAnanlyticsEvent('UPDATEUSERINFO_EMAIL_SETNGACC', 'CONTROL', {
                    'USER_ID': this.getUserDetails.userId
                });
            }

            // For phone
            if(!this.getUserDetails.phone && this.getUserDetails.phone !== this.userData.phone) {
                this.triggerAnanlyticsEvent('NEWUSERINFO_PHONE_SETNGACC', 'CONTROL', {
                    'USER_ID': this.getUserDetails.userId
                });
            } else if(this.getUserDetails.phone && this.getUserDetails.phone !== this.userData.phone) {
                this.triggerAnanlyticsEvent('UPDATEUSERINFO_PHONE_SETNGACC', 'CONTROL', {
                    'USER_ID': this.getUserDetails.userId
                });
            }
        },
        setUserPreference() {
            const that = this;
            import('firebase').then((firebase) => {
                var node = firebase.database().ref( "PREFERENCE" ).child( this.getUserDetails.userId );
                node.update({
                    "emailFrequency": that.notificationSettings[ "emailFrequency" ],
                    "notificationSubscriptions": that.notificationSettings[ "notificationSubscriptions" ],
                    "lastUpdated": firebase.database.ServerValue.TIMESTAMP
                });
            });
            this.triggerAlert({ message: '__("notification_settings_save_changes")', timer: 3000 });
        }
    },
    watch: {
        'getUserDetails.authorId'(newValue) {
            if (newValue) {
                this.fetchAuthorDetails(newValue);
            }
        },
        'getUserDetails.isGuest'(isGuest) {
            if (isGuest) {
                this.$router.push('login');
            } else {
                const that = this;
                import('firebase').then((firebase) => {
                    if (firebase.apps.length === 0) {
                        const config = {
                            apiKey: process.env.FIREBASE_API_KEY,
                            authDomain: process.env.FIREBASE_AUTH_DOMAIN,
                            databaseURL: process.env.FIREBASE_DATABASE_URL,
                            storageBucket: process.env.FIREBASE_STORAGE_BUCKET
                        };
                        firebase.initializeApp(config);
                    }
                    const that = this;
                    const userPreferencesNode = firebase.database().ref( "PREFERENCE" ).child( this.getUserDetails.userId );
                    userPreferencesNode.on( 'value', function( snapshot ) {
                        const userPreferences = snapshot.val();
                        console.log(userPreferences);
                        if(userPreferences) {
                            that.notificationSettings.emailFrequency = userPreferences.emailFrequency || "IMMEDIATELY";
                            that.notificationSettings.newsletterFrequency = userPreferences.newsletterFrequency || "DAILY";
                            if(userPreferences.notificationSubscriptions) {
                                that.notificationSettings.notificationSubscriptions = userPreferences.notificationSubscriptions;
                            }
                        }
                    });
                });
            }
        },
        'getLogoutStatus'(loggedOut) {
            if (loggedOut) {
                location.reload()
            }
        },
        'getAuthorLoadingState'(loadingState) {
            if (loadingState === 'LOADING_SUCCESS') {
                const {
                    firstName, lastName, firstNameEn, lastNameEn, language, summary, penName, gender, dateOfBirth, authorId
                } = this.getAuthorData;

                this.authorData.firstName = firstName || '';
                this.authorData.lastName = lastName || '';
                this.authorData.firstNameEn = firstNameEn || '';
                this.authorData.lastNameEn = lastNameEn || '';
                this.authorData.language = language || '';
                this.authorData.summary = summary || '';
                this.authorData.penName = penName || '';
                this.authorData.gender = gender || '';
                this.authorData.dateOfBirth = dateOfBirth || '';
                this.authorData.authorId = authorId || '';

                this.userData.email = this.getUserDetails.email;
                this.userData.phone = this.getUserDetails.phone;
            }
        },
        'getAuthorUpdateState'(loadingState) {
            if (loadingState === 'LOADING_SUCCESS') {
                const {
                    firstName, lastName, firstNameEn, lastNameEn, language, summary, penName, gender, dateOfBirth, authorId
                } = this.getAuthorData;

                this.authorData.firstName = firstName || '';
                this.authorData.lastName = lastName || '';
                this.authorData.firstNameEn = firstNameEn || '';
                this.authorData.lastNameEn = lastNameEn || '';
                this.authorData.language = language || '';
                this.authorData.summary = summary || '';
                this.authorData.penName = penName || '';
                this.authorData.gender = gender || '';
                this.authorData.dateOfBirth = dateOfBirth || '';
                this.authorData.authorId = authorId || '';

                this.userData.email = this.getUserDetails.email;
                this.userData.phone = this.getUserDetails.phone;
            }
        }
    },
    created() {
        if (this.getUserDetails.isGuest) {
            this.$router.push('login');
        }

        if (this.getUserDetails.authorId) {
            this.fetchAuthorDetails(this.getUserDetails.authorId);
        }
    },
    mounted() {
        // Hide Footer when keyboard comes
        if (this.isMobile()) {
            $(document).on('focus', 'input, textarea', function() {
                $(".footer-menu").css("height", "0")
            });
            $(document).on('blur', 'input, textarea', function() {
                $(".footer-menu").css("height", "51px")
            });
        }
        this.triggerAnanlyticsEvent('LANDED_SETTINGSM_SETTINGS', 'CONTROL', {
            'USER_ID': this.getUserDetails.userId
        });

        const that = this;
        import('firebase').then((firebase) => {
            if (firebase.apps.length === 0) {
                const config = {
                    apiKey: process.env.FIREBASE_API_KEY,
                    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
                    databaseURL: process.env.FIREBASE_DATABASE_URL,
                    storageBucket: process.env.FIREBASE_STORAGE_BUCKET
                };
                firebase.initializeApp(config);
            }
            const that = this;
            const userPreferencesNode = firebase.database().ref( "PREFERENCE" ).child( this.getUserDetails.userId );
            userPreferencesNode.on( 'value', function( snapshot ) {
                const userPreferences = snapshot.val();
                console.log(userPreferences);
                if(userPreferences) {
                    that.notificationSettings.emailFrequency = userPreferences.emailFrequency || "IMMEDIATELY";
                    that.notificationSettings.newsletterFrequency = userPreferences.newsletterFrequency || "DAILY";
                    if(userPreferences.notificationSubscriptions) {
                        that.notificationSettings.notificationSubscriptions = userPreferences.notificationSubscriptions;
                    }
                }
            });
        });
    }
}
</script>

<style lang="scss" scoped>
.settings-page {
    margin-top: 85px;
    text-align: left;
    min-height: 700px;
    @media screen and (max-width: 992px ) {
        margin-top: 65px;
    }
    .head-title {
        font-size: 18px;
        font-weight: bold;
        text-align: left;
        border-left: 3px solid #d0021b;
        padding-left: 10px;
        margin: 10px 0 0;
        float: left;
    }
    .sign-out {
        display: inline-block;
        color: #d0021b;
        float: right;
        margin-top: 10px;
        font-size: 14px;
        i {
            vertical-align: middle;
            font-size: 18px;
        }
    }
    .settings-menu {
        border-bottom: 1px solid #e9e9e9;
        padding: 8px 0 10px;
        text-align: left;
        overflow: hidden;
        width: 100%;
        overflow-x: auto;
        white-space: nowrap;
        clear: both;
        a {
            color: #555;
            font-size: 13px;
            border-bottom: 2px solid #fff;
            padding: 5px 5px 11px;
            span {
                font-size: 12px;
                font-weight: bold;
                padding: 0 2px;
                margin-right: 5px;
                display: inline-block;
                text-align: center;
            }
            &.active {
                color: #d0021b;
                border-color: #d0021b;
                span {
                    color: #d0021b;
                }
            }
            &:hover {
                text-decoration: none;
                color: #d0021b;
            }
        }
    }
    .tabs {
        margin: 20px 0;
        display: none;
        &#profile-settings {
            display: block;
        }
        label {
            font-size: 12px;
        }
        .section-title {
            font-size: 16px;
            margin: 10px 0;
            font-weight: bold;
        }
        .form-check {
            width: 100%;
            margin: 0 10px 5px 15px;
            label {
                font-size: 14px;
                vertical-align: text-bottom;
            }
        }
        .update-btn {
            background: #d0021b;
            color: #fff;
            border: 0;
            outline: none;
            font-size: 14px;
            float: right;
            margin: 10px 0;
            &:active, &:focus {
                outline: none;
                box-shadow: none;
            }
        }
    }
}
.spinner-overlay {
    position: fixed;
    top: 0;
    background: rgba(255,255,255,0.8);
    width: 100%;
    height: 100%;
    .spinner {
        top: 40%;
        position: absolute;
    }
}
</style>
