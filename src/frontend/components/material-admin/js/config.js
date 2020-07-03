materialAdmin
    .config(function ($stateProvider, $urlRouterProvider){
        $urlRouterProvider.otherwise("/home");


        $stateProvider
        
            //------------------------------
            // HOME
            //------------------------------
        
            .state ('home', {
                url: '/home',
                templateUrl: 'views/home.html',
                resolve: {
                    loadPlugin: function($ocLazyLoad) {
                        return $ocLazyLoad.load ([
                            {
                                name: 'css',
                                insertBefore: '#app-level',
                                files: [
                                    'vendors/bower_components/fullcalendar/dist/fullcalendar.min.css',
                                ]
                            },
                            {
                                name: 'vendors',
                                insertBefore: '#app-level-js',
                                files: [
                                    'vendors/sparklines/jquery.sparkline.min.js',
                                    'vendors/bower_components/jquery.easy-pie-chart/dist/jquery.easypiechart.min.js',
                                    'vendors/bower_components/simpleWeather/jquery.simpleWeather.min.js'
                                ]
                            }
                        ])
                    }
                }
            })
        

            //------------------------------
            // TYPOGRAPHY
            //------------------------------
        
            .state ('typography', {
                url: '/typography',
                templateUrl: 'views/typography.html'
            })


            //------------------------------
            // WIDGETS
            //------------------------------
        
            .state ('widgets', {
                url: '/widgets',
                templateUrl: 'views/common.html'
            })

            .state ('widgets.widgets', {
                url: '/widgets',
                templateUrl: 'views/widgets.html',
                resolve: {
                    loadPlugin: function($ocLazyLoad) {
                        return $ocLazyLoad.load ([
                            {
                                name: 'css',
                                insertBefore: '#app-level',
                                files: [
                                    'vendors/bower_components/mediaelement/build/mediaelementplayer.css',
                                ]
                            },
                            {
                                name: 'vendors',
                                files: [
                                    'vendors/bower_components/mediaelement/build/mediaelement-and-player.js',
                                    'vendors/bower_components/autosize/dist/autosize.min.js'
                                ]
                            }
                        ])
                    }
                }
            })

            .state ('widgets.widget-templates', {
                url: '/widget-templates',
                templateUrl: 'views/widget-templates.html',
            })


            //------------------------------
            // TABLES
            //------------------------------
        
            .state ('tables', {
                url: '/tables',
                templateUrl: 'views/common.html'
            })
            
            .state ('tables.tables', {
                url: '/tables',
                templateUrl: 'views/tables.html'
            })
            
            .state ('tables.data-table', {
                url: '/data-table',
                templateUrl: 'views/data-table.html'
            })

        
            //------------------------------
            // FORMS
            //------------------------------
            .state ('form', {
                url: '/form',
                templateUrl: 'views/common.html'
            })

            .state ('form.basic-form-elements', {
                url: '/basic-form-elements',
                templateUrl: 'views/form-elements.html',
                resolve: {
                    loadPlugin: function($ocLazyLoad) {
                        return $ocLazyLoad.load ([
                            {
                                name: 'vendors',
                                files: [
                                    'vendors/bower_components/autosize/dist/autosize.min.js'
                                ]
                            }
                        ])
                    }
                }
            })

            .state ('form.form-components', {
                url: '/form-components',
                templateUrl: 'views/form-components.html',
                resolve: {
                    loadPlugin: function($ocLazyLoad) {
                        return $ocLazyLoad.load ([
                            {
                                name: 'css',
                                insertBefore: '#app-level',
                                files: [
                                    'vendors/bower_components/nouislider/jquery.nouislider.css',
                                    'vendors/farbtastic/farbtastic.css',
                                    'vendors/bower_components/summernote/dist/summernote.css',
                                    'vendors/bower_components/eonasdan-bootstrap-datetimepicker/build/css/bootstrap-datetimepicker.min.css',
                                    'vendors/bower_components/chosen/chosen.min.css'
                                ]
                            },
                            {
                                name: 'vendors',
                                files: [
                                    'vendors/input-mask/input-mask.min.js',
                                    'vendors/bower_components/nouislider/jquery.nouislider.min.js',
                                    'vendors/bower_components/moment/min/moment.min.js',
                                    'vendors/bower_components/eonasdan-bootstrap-datetimepicker/build/js/bootstrap-datetimepicker.min.js',
                                    'vendors/bower_components/summernote/dist/summernote.min.js',
                                    'vendors/fileinput/fileinput.min.js',
                                    'vendors/bower_components/chosen/chosen.jquery.js',
                                    'vendors/bower_components/angular-chosen-localytics/chosen.js',
                                ]
                            }
                        ])
                    }
                }
            })
        
            .state ('form.form-examples', {
                url: '/form-examples',
                templateUrl: 'views/form-examples.html'
            })
        
            .state ('form.form-validations', {
                url: '/form-validations',
                templateUrl: 'views/form-validations.html'
            })
        
            
            //------------------------------
            // USER INTERFACE
            //------------------------------
        
            .state ('user-interface', {
                url: '/user-interface',
                templateUrl: 'views/common.html'
            })
        
            .state ('user-interface.ui-bootstrap', {
                url: '/ui-bootstrap',
                templateUrl: 'views/ui-bootstrap.html'
            })

            .state ('user-interface.colors', {
                url: '/colors',
                templateUrl: 'views/colors.html'
            })

            .state ('user-interface.animations', {
                url: '/animations',
                templateUrl: 'views/animations.html'
            })
        
            .state ('user-interface.box-shadow', {
                url: '/box-shadow',
                templateUrl: 'views/box-shadow.html'
            })
        
            .state ('user-interface.buttons', {
                url: '/buttons',
                templateUrl: 'views/buttons.html'
            })
        
            .state ('user-interface.icons', {
                url: '/icons',
                templateUrl: 'views/icons.html'
            })
        
            .state ('user-interface.alerts', {
                url: '/alerts',
                templateUrl: 'views/alerts.html'
            })
        
            .state ('user-interface.notifications-dialogs', {
                url: '/notifications-dialogs',
                templateUrl: 'views/notification-dialog.html'
            })
        
            .state ('user-interface.media', {
                url: '/media',
                templateUrl: 'views/media.html',
                resolve: {
                    loadPlugin: function($ocLazyLoad) {
                        return $ocLazyLoad.load ([
                            {
                                name: 'css',
                                insertBefore: '#app-level',
                                files: [
                                    'vendors/bower_components/mediaelement/build/mediaelementplayer.css',
                                    'vendors/bower_components/lightgallery/light-gallery/css/lightGallery.css'
                                ]
                            },
                            {
                                name: 'vendors',
                                files: [
                                    'vendors/bower_components/mediaelement/build/mediaelement-and-player.js',
                                    'vendors/bower_components/lightgallery/light-gallery/js/lightGallery.min.js'
                                ]
                            }
                        ])
                    }
                }
            })
        
            .state ('user-interface.other-components', {
                url: '/other-components',
                templateUrl: 'views/other-components.html'
            })
            
        
            //------------------------------
            // CHARTS
            //------------------------------
            
            .state ('charts', {
                url: '/charts',
                templateUrl: 'views/common.html'
            })

            .state ('charts.flot-charts', {
                url: '/flot-charts',
                templateUrl: 'views/flot-charts.html',
            })

            .state ('charts.other-charts', {
                url: '/other-charts',
                templateUrl: 'views/other-charts.html',
                resolve: {
                    loadPlugin: function($ocLazyLoad) {
                        return $ocLazyLoad.load ([
                            {
                                name: 'vendors',
                                files: [
                                    'vendors/sparklines/jquery.sparkline.min.js',
                                    'vendors/bower_components/jquery.easy-pie-chart/dist/jquery.easypiechart.min.js',
                                ]
                            }
                        ])
                    }
                }
            })
        
        
            //------------------------------
            // CALENDAR
            //------------------------------
            
            .state ('calendar', {
                url: '/calendar',
                templateUrl: 'views/calendar.html',
                resolve: {
                    loadPlugin: function($ocLazyLoad) {
                        return $ocLazyLoad.load ([
                            {
                                name: 'css',
                                insertBefore: '#app-level',
                                files: [
                                    'vendors/bower_components/fullcalendar/dist/fullcalendar.min.css',
                                ]
                            },
                            {
                                name: 'vendors',
                                files: [
                                    'vendors/bower_components/moment/min/moment.min.js',
                                    'vendors/bower_components/fullcalendar/dist/fullcalendar.min.js'
                                ]
                            }
                        ])
                    }
                }
            })
        
        
            //------------------------------
            // PHOTO GALLERY
            //------------------------------
            
             .state ('photo-gallery', {
                url: '/photo-gallery',
                templateUrl: 'views/common.html',
                resolve: {
                    loadPlugin: function($ocLazyLoad) {
                        return $ocLazyLoad.load ([
                            {
                                name: 'css',
                                insertBefore: '#app-level',
                                files: [
                                    'vendors/bower_components/lightgallery/light-gallery/css/lightGallery.css'
                                ]
                            },
                            {
                                name: 'vendors',
                                files: [
                                    'vendors/bower_components/lightgallery/light-gallery/js/lightGallery.min.js'
                                ]
                            }
                        ])
                    }
                }
            })

            //Default
        
            .state ('photo-gallery.photos', {
                url: '/photos',
                templateUrl: 'views/photos.html'
            })
        
            //Timeline
    
            .state ('photo-gallery.timeline', {
                url: '/timeline',
                templateUrl: 'views/photo-timeline.html'
            })
        
        
            //------------------------------
            // GENERIC CLASSES
            //------------------------------
            
            .state ('generic-classes', {
                url: '/generic-classes',
                templateUrl: 'views/generic-classes.html'
            })
        
            
            //------------------------------
            // PAGES
            //------------------------------
            
            .state ('pages', {
                url: '/pages',
                templateUrl: 'views/common.html'
            })
            
        
            //Profile
        
            .state ('pages.profile', {
                url: '/profile',
                templateUrl: 'views/profile.html'
            })
        
            .state ('pages.profile.profile-about', {
                url: '/profile-about',
                templateUrl: 'views/profile-about.html'
            })
        
            .state ('pages.profile.profile-timeline', {
                url: '/profile-timeline',
                templateUrl: 'views/profile-timeline.html',
                resolve: {
                    loadPlugin: function($ocLazyLoad) {
                        return $ocLazyLoad.load ([
                            {
                                name: 'css',
                                insertBefore: '#app-level',
                                files: [
                                    'vendors/bower_components/lightgallery/light-gallery/css/lightGallery.css'
                                ]
                            },
                            {
                                name: 'vendors',
                                files: [
                                    'vendors/bower_components/lightgallery/light-gallery/js/lightGallery.min.js'
                                ]
                            }
                        ])
                    }
                }
            })

            .state ('pages.profile.profile-photos', {
                url: '/profile-photos',
                templateUrl: 'views/profile-photos.html',
                resolve: {
                    loadPlugin: function($ocLazyLoad) {
                        return $ocLazyLoad.load ([
                            {
                                name: 'css',
                                insertBefore: '#app-level',
                                files: [
                                    'vendors/bower_components/lightgallery/light-gallery/css/lightGallery.css'
                                ]
                            },
                            {
                                name: 'vendors',
                                files: [
                                    'vendors/bower_components/lightgallery/light-gallery/js/lightGallery.min.js'
                                ]
                            }
                        ])
                    }
                }
            })
        
            .state ('pages.profile.profile-connections', {
                url: '/profile-connections',
                templateUrl: 'views/profile-connections.html'
            })
        
        
            //-------------------------------
        
            .state ('pages.listview', {
                url: '/listview',
                templateUrl: 'views/list-view.html'
            })
        
            .state ('pages.messages', {
                url: '/messages',
                templateUrl: 'views/messages.html'
            })
        
            .state ('pages.pricing-table', {
                url: '/pricing-table',
                templateUrl: 'views/pricing-table.html'
            })
        
            .state ('pages.contacts', {
                url: '/contacts',
                templateUrl: 'views/contacts.html'
            })
        
            .state ('pages.invoice', {
                url: '/invoice',
                templateUrl: 'views/invoice.html'
            })
                                
            .state ('pages.wall', {
                url: '/wall',
                templateUrl: 'views/wall.html',
                resolve: {
                    loadPlugin: function($ocLazyLoad) {
                        return $ocLazyLoad.load ([
                            {
                                name: 'vendors',
                                insertBefore: '#app-level',
                                files: [
                                    'vendors/bower_components/autosize/dist/autosize.min.js',
                                    'vendors/bower_components/lightgallery/light-gallery/css/lightGallery.css'
                                ]
                            },
                            {
                                name: 'vendors',
                                files: [
                                    'vendors/bower_components/mediaelement/build/mediaelement-and-player.js',
                                    'vendors/bower_components/lightgallery/light-gallery/js/lightGallery.min.js'
                                ]
                            }
                        ])
                    }
                }
            })
            
            //------------------------------
            // BREADCRUMB DEMO
            //------------------------------
            .state ('breadcrumb-demo', {
                url: '/breadcrumb-demo',
                templateUrl: 'views/breadcrumb-demo.html'
            })
    });
