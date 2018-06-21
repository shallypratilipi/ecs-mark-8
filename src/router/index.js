import Vue    from 'vue'
import Router from 'vue-router'

import Home   from '@/pages/Home'
import SearchPageComponent from '@/pages/Search'
import LoginPageComponent from '@/pages/Login.vue'
import PratilipiPageComponent from '@/pages/Pratilipi.vue'
import AuthorPageComponent from '@/pages/Author.vue'
import DiscoveryPageComponent from '@/pages/Discovery.vue'
import ListPageComponent from '@/pages/ListPage.vue'
import WritePageComponent from '@/pages/Write.vue'
import EventsPageComponent from '@/pages/Events'
import EventPageComponent from '@/pages/Event'
import BlogsPageComponent from '@/pages/Blogs.vue'
import BlogPageComponent from '@/pages/Blog.vue'
import NotificationComponent from '@/pages/Notification.vue'
import SettingsPageComponent from '@/pages/Settings.vue'
import ReaderPageComponent from '@/pages/Reader.vue'
import InterviewsPageComponent from '@/pages/Interviews.vue'
import InterviewPageComponent from '@/pages/Interview.vue'
import NewsletterUnSubscribePageComponent from '@/pages/NewsletterUnSubscribe.vue'
import LibraryPageComponent from '@/pages/Library.vue'
import StaticComponent from '@/pages/Static.vue'
import MessagesComponent from '@/pages/Messages.vue'
import MessageUserComponent from '@/pages/MessageUser.vue'
import PasswordResetPageComponent from '@/pages/PasswordReset.vue'
import EventParticipatePageComponent from '@/pages/EventParticipate.vue'


import { getCookie } from '@/mixins/methods'

import DataAccessor from '@/utils/DataAccessor'

Vue.use(Router)


// todo try using nested Urls
// todo implement SEO
// todo enable nested urls upto /comments
// todo remove router link and replace with a common router push function
// todo checkback button press on every page
// todo use routerBeforeEach to check for logged in or restricted pages
// todo change loading states to router https://router.vuejs.org/en/advanced/data-fetching.html
// todo move all events to a common location or class wise division
// todo scroll is maintained
// todo double scroll bar in reviews modal
// todo writer modal href terms and services
// todo trending search call on every page
// todo bugs in reader decorations
// todo tinymc integration in this app
// todo create page SEO
// todo add login checks in route otherwise it will render login first then actual page

var router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
             meta: {
                'title': '__("home_page_title") | __("pratilipi")'
            },
                  beforeEnter: (to, from, next) => {
            if (to.query.email && to.query.token && to.query.passwordReset) {
                next({
                    path: '/reset-password',
                    query: {
                        email: to.query.email,
                        token: to.query.token
                    }
                });
            } else {
                next();
            }

        }
        }, {
            path: '/search',
            name: 'Search_Page',
            component: SearchPageComponent,
            meta: {
                'store': 'searchpage',
                'title': '__("seo_search_page") | __("pratilipi")'
            }
        }, {
            path: '/login',
            name: 'Login_Page',
            component: LoginPageComponent,
            meta: {
                'title': '__("seo_login_page") | __("pratilipi")',
                'store': 'login'
            }
        }, {
            path: '/signup',
            name: 'Signup_Page',
            component: LoginPageComponent,
            meta: {
                'title': '__("seo_register_page") | __("pratilipi")',
                'store': 'register'
            }
        }, {
            path: '/story/:slug_id',
            name: 'Pratilipi',
            component: PratilipiPageComponent,
            meta: {
                'store': 'pratilipipage',
                'id_prop': 'slug_id'
            }
        }, {
            path: '/user/:user_slug',
            name: 'User',
            component: AuthorPageComponent,
            meta: {
                'store': 'authorpage',
                'title': '__("seo_home_page")',
                'id_prop': 'user_slug'
            }
        }, {
            path: '/discover',
            name: 'Discovery_Page',
            component: DiscoveryPageComponent,
            meta: {
                'title': '__("seo_navigation_page") | __("pratilipi")',
                'store': 'discover'
            }
        }, {
            path: '/create',
            name: 'Write_Page',
            component: WritePageComponent,
            meta: {
                'store': 'writepage',
                'title': '__("write") | __("pratilipi")'
            }
        }, {
            path: '/event',
            name: 'Events_Page',
            component: EventsPageComponent,
            meta: {
                'store': 'eventspage',
                'title': '__("seo_events_page") | __("pratilipi")'
            }
        }, {
            path: '/event/:event_slug',
            name: 'Event_Page',
            component: EventPageComponent,
            meta: {
                'store': 'eventpage',
                'title': '__("seo_home_page")',
                'id_prop': 'event_slug'
            }
        }, {
            path: '/blog',
            name: 'Blogs_Page',
            component: BlogsPageComponent,
            meta: {
                'store': 'blogspage',
                'title': '__("seo_blog_page") | __("pratilipi")'
            }
        }, {
            path: '/blog/:blog_id',
            name: 'Blog_Page',
            component: BlogPageComponent,
            meta: {
                'store': 'blogpage',
                'title': '__("seo_home_page")',
                'id_prop': 'blog_id'
            }
        }, {
            path: '/blogpost/:blog_id',
            name: 'Blog_Page_2',
            component: BlogPageComponent,
            meta: {
                'store': 'blogpage',
                'title': '__("seo_home_page")',
                'id_prop': 'blog_id'
            }
        }, {
            path: '/read',
            name: 'Reader_Page',
            component: ReaderPageComponent,
            meta: {
                'store': 'readerpage',
                'title': '__("seo_home_page")'
            }
        }, {
            path: '/followers',
            beforeEnter: (to, from, next) => {
                next('/login');
            }
        }, {
            path: '/notifications',
            beforeEnter: (to, from, next) => {
                if(to.query.action && to.query.action === "settings" ) {
                    next('/settings?action=notification');
                } else {
                    next();
                }
            },
            name: 'Notification',
            component: NotificationComponent,
            meta: {
                'store': 'notification',
                'title': '__("seo_notifications_page") | __("pratilipi")'
            }
        }, {
            path: '/settings',
            name: 'Settings_Page',
            component: SettingsPageComponent,
            meta: {
                'title': '__("seo_home_page") | __("pratilipi")'
            }
        }, {
            path: '/author-interviews',
            name: 'Interviews_Page',
            component: InterviewsPageComponent,
            meta: {
                'store': 'interviewspage',
                'title': '__("seo_author_interview") | __("pratilipi")'
            }
        }, {
            path: '/author-interviews/:interview_id',
            name: 'Interview_Page',
            component: InterviewPageComponent,
            meta: {
                'store': 'interviewpage',
                'title': '__("seo_home_page")',
                'id_prop': 'interview_id'
            }
        }, {
            path: '/newsletter/unsubscribe',
            name: 'Newsletter',
            component: NewsletterUnSubscribePageComponent,
            meta: {
                'title': '__("seo_home_page")'
            }
        }, {
            path: '/library',
            name: 'Library_Page',
            component: LibraryPageComponent,
            meta: {
                'store': 'librarypage',
                'title': '__("seo_library_page")'
            }
        }, {
            path: '/work-with-us',
            name: 'Career_Page',
            component: StaticComponent,
            meta: {
                'title': 'Career | __("pratilipi")'
            }
        }, {
            path: '/careers',
            name: 'Career_Page_2',
            component: StaticComponent,
            meta: {
                'title': 'Career | __("pratilipi")'
            }
        }, {
            path: '/about/pratilipi',
            name: 'About_Page',
            component: StaticComponent,
            meta: {
                'title': '__("footer_about_us") | __("pratilipi")'
            }
        }, {
            path: '/about',
            name: 'About_Page_2',
            component: StaticComponent,
            meta: {
                'title': '__("footer_about_us") | __("pratilipi")'
            }
        }, {
            path: '/terms-of-service',
            name: 'Terms_Page',
            component: StaticComponent,
            meta: {
                'title': '__("footer_terms_of_service") | __("pratilipi")'
            }
        }, {
            path: '/privacy-policy',
            name: 'Privacy_Page',
            component: StaticComponent,
            meta: {
                'title': '__("footer_privacy_policy") | __("pratilipi")'
            }
        }, {
            path: '/reset-password',
            name: 'Password_Reset',
            component: PasswordResetPageComponent,
            meta: {
                'title': '__("seo_reset_password_page") | __("pratilipi")'
            }
        }, {
            path: '/forgot-password',
            name: 'Forgot_Password',
            beforeEnter: (to, from, next) => {
                next('login#forgot-pass')
            }
        }, {
            path: '/messages',
            name: 'Messages_Page',
            component: MessagesComponent,
            meta: {
                'title': '__("chat_messages") | __("pratilipi")',
                'store': 'messages'
            }
        }, {
            path: '/messages/:channel_id',
            name: 'MessageUser_Page',
            component: MessageUserComponent,
            meta: {
                'title': 'Messages | __("pratilipi")',
                'store': 'messageuser'
            }
        }, {
            path: '/event/:eventSlug/participate',
            meta: {
                'title': '__("seo_home_page")',
                'id_prop': 'eventSlug',
                'store': 'eventparticipate'
            },
            component: EventParticipatePageComponent
        }, {
            path: '/event/:eventSlug/participate/:eventPratilipiId',
            meta: {
                'title': '__("seo_home_page")',
                'id_prop': 'eventSlug',
                'store': 'eventparticipate'
            },
            component: EventParticipatePageComponent
        }, {
            path: '/:list_page_url',
            name: 'List_Page',
            component: ListPageComponent,
            meta: {
                'store': 'listpage',
                'title': '__("seo_home_page")',
                'id_prop': 'list_page_url'
            },
            beforeEnter: (to, from, next) => {
                console.log(to);

                const pathToGo = to.path;
                DataAccessor.getPageType(pathToGo, (response) => {
                    if (response.status === 200) {
                        switch (response.response.pageType) {
                            case 'PRATILIPI':
                                DataAccessor.getPratilipiById(response.response.primaryContentId, false, (data) => {
                                    if (data) {
                                        next(data.pageUrl);
                                    } else {
                                        // redirect to page not found
                                    }
                                });
                            case 'AUTHOR':
                                DataAccessor.getAuthorById(response.response.primaryContentId, false, (data) => {
                                    if (data) {
                                        next(data.pageUrl);
                                    } else {
                                        // redirect to page not found
                                    }
                                });
                            default:
                                next();
                        }
                    } else {
                        next();
                    }
                });
            }
        }, {
            path: '*',
            meta: {
                'title': '__("seo_home_page") | __("pratilipi")'
            },
            beforeEnter: (to, from, next) => {
                console.log('Going to an unknown world!');
                const pathToGo = to.path;
                DataAccessor.getPageType(pathToGo, (response) => {
                    if (response.status === 200) {
                        switch (response.response.pageType) {
                            case 'PRATILIPI':
                                DataAccessor.getPratilipiById(response.response.primaryContentId, false, (data) => {
                                    if (data) {
                                        next(data.pageUrl);
                                    } else {
                                        // redirect to page not found
                                    }
                                });
                            case 'AUTHOR':
                                DataAccessor.getAuthorById(response.response.primaryContentId, false, (data) => {
                                    if (data) {
                                        next(data.pageUrl);
                                    } else {
                                        // redirect to page not found
                                    }
                                });
                        }
                    } else {
                        // redirect to page not found
                    }
                });
            }
        }
    ],
    scrollBehavior: () => ({ y: 0 })
});



router.beforeEach((to, from, next) => {
    document.title = to.meta.title;
    console.log(ga);
    next();
});

router.afterEach((to, from)=> {
    console.log("after");
    ga('set', 'page', to.path + window.location.search);
    // ga( 'set', 'dimension1', appViewModel.user.userId() == null ? 0 : appViewModel.user.userId() );
    console.log(process.env.GA_WEBSITE + " - " +  process.env.GA_WEBSITE_MODE + " - " + process.env.GA_WEBSITE_VERSION + " + " + (to.path + window.location.search));
    ga('set', 'dimension2', process.env.GA_WEBSITE);
    ga('set', 'dimension3', process.env.GA_WEBSITE_MODE);
    ga('set', 'dimension4', process.env.GA_WEBSITE_VERSION);
    ga('send', 'pageview');
});

export default router;
