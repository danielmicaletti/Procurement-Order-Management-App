'use strict';

angular
  .module('minovateApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngStorage',
    'ngTouch',
    'picardy.fontawesome',
    'ui.bootstrap',
    'ui.router',
    'ui.utils',
    'angular-loading-bar',
    'angular-momentjs',
    'FBAngular',
    'lazyModel',
    'toastr',
    'angularBootstrapNavTree',
    'oc.lazyLoad',
    'ui.select',
    'ui.tree',
    'textAngular',
    'colorpicker.module',
    'angularFileUpload',
    'ngImgCrop',
    'datatables',
    'datatables.bootstrap',
    'datatables.colreorder',
    'datatables.colvis',
    'datatables.tabletools',
    'datatables.scroller',
    'datatables.columnfilter',
    'ui.grid',
    'ui.grid.resizeColumns',
    'ui.grid.edit',
    'ui.grid.moveColumns',
    'ngTable',
    'smart-table',
    'angular-flot',
    'angular-rickshaw',
    'easypiechart',
    'uiGmapgoogle-maps',
    'ui.calendar',
    'angular.filter',
    'ui.utils.masks',
    'authentication',
    'layout',
    'accounts',
    'orders', 
  ])
  .run(['$rootScope', '$state', '$stateParams', function($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
    $rootScope.$on('$stateChangeSuccess', function(event, toState) {

      event.targetScope.$watch('$viewContentLoaded', function () {

        angular.element('html, body, #content').animate({ scrollTop: 0 }, 200);

        setTimeout(function () {
          angular.element('#wrap').css('visibility','visible');

          if (!angular.element('.dropdown').hasClass('open')) {
            angular.element('.dropdown').find('>ul').slideUp();
          }
        }, 200);
      });
      $rootScope.containerClass = toState.containerClass;
    });
  }])
  .run(['$rootScope', '$state', 'Authentication',function($rootScope, $state, Authentication) {

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams) {
      var requireLogin = toState.data.requireLogin;
      var auth = Authentication.isAuthenticated();

      if (requireLogin && !auth) {
        event.preventDefault();
        console.log('Here in app.js');
        console.log(requireLogin);
        console.log(auth);
        console.log($state.go('core.login'));
        $state.go('core.login');
        return $rootScope;
      }
    });
  }])
  .run(['$http', function ($http){
    $http.defaults.xsrfHeaderName = 'X-CSRFToken';
    $http.defaults.xsrfCookieName = 'csrftoken';

  }])
  .config(['uiSelectConfig', function (uiSelectConfig) {
    uiSelectConfig.theme = 'bootstrap';
  }])
  .config(function ($urlMatcherFactoryProvider) {
    $urlMatcherFactoryProvider.caseInsensitive(true);
    $urlMatcherFactoryProvider.strictMode(false);
  })
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

    // $urlRouterProvider.otherwise('/app/dashboard');

    $urlRouterProvider.otherwise(function($injector) {
      var $state = $injector.get('$state');
      $state.go('app.dashboard');
    });

    $stateProvider

    .state('app', {
      abstract: true,
      url: '/app',
      templateUrl: 'static/views/tmpl/app.html',
      data: {
        requireLogin: true
      },
    })
    //dashboard
    .state('app.dashboard', {
      url: '/dashboard',
      controller: 'DashboardController',
      controllerAs: 'vm',
      templateUrl: 'static/views/dashboard.html',
      resolve: {
        plugins: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load([
            'static/scripts/vendor/datatables/datatables.bootstrap.min.css'
          ]);
        }]
      },
      data: {
        requireLogin: true
      },
    })
    // requests/orders/offers
    .state('app.orders', {
      abstract: true,
      url: '/orders',
      template: '<div ui-view></div>'
    })
    .state('app.orders.all', {
      url: '/all',
      controller: 'OrdersController',
      controllerAs: 'vm',
      templateUrl: 'static/views/orders/orders.html',
      resolve: {
        plugins: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load([
            'static/scripts/vendor/datatables/datatables.bootstrap.min.css',
            'static/scripts/vendor/datatables/Pagination/input.js',
            'static/scripts/vendor/datatables/ColumnFilter/jquery.dataTables.columnFilter.js'
          ]);
        }]
      }
      // data: {
      //   requireLogin: true
      // },
    })    
    //request
    .state('app.orders.request', {
      url: '/request/:goodId',
      controller: 'RequestController',
      controllerAs: 'vm',
      templateUrl: 'static/views/orders/new-request.html',
      resolve: {
        plugins: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load([
            'static/scripts/vendor/slider/bootstrap-slider.js',
            'static/scripts/vendor/touchspin/jquery.bootstrap-touchspin.js',
            'static/scripts/vendor/touchspin/jquery.bootstrap-touchspin.css',
            'static/scripts/vendor/filestyle/bootstrap-filestyle.min.js'
          ]);
        }]
      }
    })
    //edit request
    .state('app.orders.edit', {
      url: '/edit/:reqId',
      controller: 'EditRequestController',
      controllerAs: 'vm',
      templateUrl: 'static/views/orders/edit-request.html',
      resolve: {
        plugins: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load([
            'static/scripts/vendor/slider/bootstrap-slider.js',
            'static/scripts/vendor/touchspin/jquery.bootstrap-touchspin.js',
            'static/scripts/vendor/touchspin/jquery.bootstrap-touchspin.css',
            'static/scripts/vendor/filestyle/bootstrap-filestyle.min.js'
          ]);
        }]
      }
    })
    //add request
    .state('app.orders.add', {
      url: '/:orderId/add/:goodId',
      controller: 'AddRequestController',
      controllerAs: 'vm',
      templateUrl: 'static/views/orders/add-request.html',
      resolve: {
        plugins: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load([
            'static/scripts/vendor/slider/bootstrap-slider.js',
            'static/scripts/vendor/touchspin/jquery.bootstrap-touchspin.js',
            'static/scripts/vendor/touchspin/jquery.bootstrap-touchspin.css',
            'static/scripts/vendor/filestyle/bootstrap-filestyle.min.js'
          ]);
        }]
      }
    })
    //order
    .state('app.orders.order', {
      url: '/order/:orderId',
      controller: 'OrderController',
      controllerAs: 'vm',
      templateUrl: 'static/views/orders/order.html',
      resolve: {
        plugins: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load([
            'static/scripts/vendor/datatables/datatables.bootstrap.min.css',
            'static/scripts/vendor/datatables/Pagination/input.js',
            'static/scripts/vendor/datatables/ColumnFilter/jquery.dataTables.columnFilter.js'
          ]);
        }]
      }
    }) 
    //offer
    .state('app.orders.offer', {
      url: '/offer/:orderId',
      controller: 'OfferController',
      controllerAs: 'vm',
      templateUrl: 'static/views/orders/offer.html',
      resolve: {
        plugins: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load([
            'static/scripts/vendor/datatables/datatables.bootstrap.min.css',
            'static/scripts/vendor/datatables/Pagination/input.js',
            'static/scripts/vendor/datatables/ColumnFilter/jquery.dataTables.columnFilter.js'
          ]);
        }]
      }
    })
    //example pages
    .state('app.pages', {
      url: '/pages',
      template: '<div ui-view></div>'
    })
    //profile page
    .state('app.pages.profile', {
      url: '/profile/:username',
      controller: 'AccountSettingsController',
      controllerAs: 'vm',
      templateUrl: 'static/views/authentication-views/profile.html',
      resolve: {
        plugins: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load([
            'static/scripts/vendor/filestyle/bootstrap-filestyle.min.js'
          ]);
        }]
      }
    })
    .state('app.pages.company-profile', {
      url: '/company/:companyId',
      controller: 'CompanySettingsController',
      controllerAs: 'vm',
      templateUrl: 'static/views/authentication-views/company-profile.html',
      resolve: {
        plugins: ['$ocLazyLoad', function($ocLazyLoad) {
          return $ocLazyLoad.load([
            'static/scripts/vendor/filestyle/bootstrap-filestyle.min.js'
          ]);
        }]
      }
    })
    //mail
    .state('app.mail', {
      abstract: true,
      url: '/mail',
      controller: 'MailCtrl',
      templateUrl: 'static/views/tmpl/mail/mail.html'
    })
    //mail/inbox
    .state('app.mail.inbox', {
      url: '/inbox',
      controller: 'MailInboxCtrl',
      templateUrl: 'static/views/tmpl/mail/inbox.html'
    })
    //mail/compose
    .state('app.mail.compose', {
      url: '/compose',
      controller: 'MailComposeCtrl',
      templateUrl: 'static/views/tmpl/mail/compose.html'
    })
    //mail/single
    .state('app.mail.single', {
      url: '/single',
      controller: 'MailSingleCtrl',
      templateUrl: 'static/views/tmpl/mail/single.html'
    })
    //app core pages (errors, login,signup)
    .state('core', {
      abstract: true,
      url: '/core',
      template: '<div ui-view></div>',
      data: {
        requireLogin: false
      }
    })
    //login
    .state('core.login', {
      url: '/login',
      controller: 'LoginController',
      controllerAs: 'vm',
      templateUrl: 'static/views/authentication-views/login.html',
      // data: {
      //   requireLogin: false
      // },
    })
  }]);
  //   //ui
  //   .state('app.ui', {
  //     url: '/ui',
  //     template: '<div ui-view></div>'
  //   })
  //   //ui/typography
  //   .state('app.ui.typography', {
  //     url: '/typography',
  //     controller: 'TypographyCtrl',
  //     templateUrl: 'static/views/tmpl/ui/typography.html',
  //     resolve: {
  //       plugins: ['$ocLazyLoad', function($ocLazyLoad) {
  //         return $ocLazyLoad.load([
  //           'static/scripts/vendor/google-code-prettify/prettify.css',
  //           'static/scripts/vendor/google-code-prettify/sons-of-obsidian.css',
  //           'static/scripts/vendor/google-code-prettify/prettify.js'
  //         ]);
  //       }]
  //     }
  //   })
  //   //ui/lists
  //   .state('app.ui.lists', {
  //     url: '/lists',
  //     controller: 'ListsCtrl',
  //     templateUrl: 'static/views/tmpl/ui/lists.html'
  //   })
  //   //ui/buttons&icons
  //   .state('app.ui.buttons-icons', {
  //     url: '/buttons-icons',
  //     controller: 'ButtonsIconsCtrl',
  //     templateUrl: 'static/views/tmpl/ui/buttons-icons.html'
  //   })
  //   //ui/navs&accordions
  //   .state('app.ui.navs', {
  //     url: '/navs',
  //     controller: 'NavsCtrl',
  //     templateUrl: 'static/views/tmpl/ui/navs.html'
  //   })
  //   //ui/modals
  //   .state('app.ui.modals', {
  //     url: '/modals',
  //     controller: 'ModalsCtrl',
  //     templateUrl: 'static/views/tmpl/ui/modals.html'
  //   })
  //   //ui/tiles
  //   .state('app.ui.tiles', {
  //     url: '/tiles',
  //     controller: 'TilesCtrl',
  //     templateUrl: 'static/views/tmpl/ui/tiles.html'
  //   })
  //   //ui/portlets
  //   .state('app.ui.portlets', {
  //     url: '/portlets',
  //     controller: 'PortletsCtrl',
  //     templateUrl: 'static/views/tmpl/ui/portlets.html'
  //   })
  //   //ui/grid
  //   .state('app.ui.grid', {
  //     url: '/grid',
  //     controller: 'GridCtrl',
  //     templateUrl: 'static/views/tmpl/ui/grid.html'
  //   })
  //   //ui/widgets
  //   .state('app.ui.widgets', {
  //     url: '/widgets',
  //     controller: 'WidgetsCtrl',
  //     templateUrl: 'static/views/tmpl/ui/widgets.html'
  //   })
  //   //ui/alerts & notifications
  //   .state('app.ui.alerts', {
  //     url: '/alerts',
  //     controller: 'AlertsCtrl',
  //     templateUrl: 'static/views/tmpl/ui/alerts.html'
  //   })
  //   //ui/general
  //   .state('app.ui.general', {
  //     url: '/general',
  //     controller: 'GeneralCtrl',
  //     templateUrl: 'static/views/tmpl/ui/general.html'
  //   })
  //   //ui/tree
  //   .state('app.ui.tree', {
  //     url: '/tree',
  //     controller: 'TreeCtrl',
  //     templateUrl: 'static/views/tmpl/ui/tree.html'
  //   })
  //   //shop
  //   .state('app.shop', {
  //     url: '/shop',
  //     template: '<div ui-view></div>'
  //   })
  //   //shop/orders
  //   .state('app.shop.orders', {
  //     url: '/orders',
  //     controller: 'OrdersCtrl',
  //     templateUrl: 'static/views/tmpl/shop/orders.html',
  //     resolve: {
  //       plugins: ['$ocLazyLoad', function($ocLazyLoad) {
  //         return $ocLazyLoad.load([
  //           'static/scripts/vendor/datatables/datatables.bootstrap.min.css',
  //           'static/scripts/vendor/datatables/Pagination/input.js',
  //           'static/scripts/vendor/datatables/ColumnFilter/jquery.dataTables.columnFilter.js'
  //         ]);
  //       }]
  //     }
  //   })
  //   //shop/products
  //   .state('app.shop.products', {
  //     url: '/products',
  //     controller: 'ProductsCtrl',
  //     templateUrl: 'static/views/tmpl/shop/products.html',
  //     resolve: {
  //       plugins: ['$ocLazyLoad', function($ocLazyLoad) {
  //         return $ocLazyLoad.load([
  //           'static/scripts/vendor/datatables/datatables.bootstrap.min.css',
  //           'static/scripts/vendor/datatables/Pagination/input.js',
  //           'static/scripts/vendor/datatables/ColumnFilter/jquery.dataTables.columnFilter.js'
  //         ]);
  //       }]
  //     }
  //   })
  //   //shop/invoices
  //   .state('app.shop.invoices', {
  //     url: '/invoices',
  //     controller: 'InvoicesCtrl',
  //     templateUrl: 'static/views/tmpl/shop/invoices.html',
  //     resolve: {
  //       plugins: ['$ocLazyLoad', function($ocLazyLoad) {
  //         return $ocLazyLoad.load([
  //           'static/scripts/vendor/datatables/datatables.bootstrap.min.css',
  //           'static/scripts/vendor/datatables/Pagination/input.js',
  //           'static/scripts/vendor/datatables/ColumnFilter/jquery.dataTables.columnFilter.js'
  //         ]);
  //       }]
  //     }
  //   })
  //   //shop/single-order
  //   .state('app.shop.single-order', {
  //     url: '/single-order',
  //     controller: 'SingleOrderCtrl',
  //     templateUrl: 'static/views/tmpl/shop/single-order.html',
  //     resolve: {
  //       plugins: ['$ocLazyLoad', function($ocLazyLoad) {
  //         return $ocLazyLoad.load([
  //           'static/scripts/vendor/datatables/datatables.bootstrap.min.css',
  //           'static/scripts/vendor/datatables/Pagination/input.js',
  //           'static/scripts/vendor/datatables/ColumnFilter/jquery.dataTables.columnFilter.js'
  //         ]);
  //       }]
  //     }
  //   })
  //   //shop/single-product
  //   .state('app.shop.single-product', {
  //     url: '/single-product',
  //     controller: 'SingleProductCtrl',
  //     templateUrl: 'static/views/tmpl/shop/single-product.html',
  //     resolve: {
  //       plugins: ['$ocLazyLoad', function($ocLazyLoad) {
  //         return $ocLazyLoad.load([
  //           'static/scripts/vendor/datatables/datatables.bootstrap.min.css',
  //           'static/scripts/vendor/datatables/Pagination/input.js',
  //           'static/scripts/vendor/datatables/ColumnFilter/jquery.dataTables.columnFilter.js',
  //           'static/scripts/vendor/touchspin/jquery.bootstrap-touchspin.js',
  //           'static/scripts/vendor/touchspin/jquery.bootstrap-touchspin.css',
  //           'static/scripts/vendor/magnific/magnific-popup.css',
  //           'static/scripts/vendor/magnific/jquery.magnific-popup.min.js'
  //         ]);
  //       }]
  //     }
  //   })
  //   //shop/single-invoice
  //   .state('app.shop.single-invoice', {
  //     url: '/single-invoice',
  //     controller: 'SingleInvoiceCtrl',
  //     templateUrl: 'static/views/tmpl/shop/single-invoice.html',
  //     resolve: {
  //       plugins: ['$ocLazyLoad', function($ocLazyLoad) {
  //         return $ocLazyLoad.load([
  //           'static/scripts/vendor/datatables/datatables.bootstrap.min.css',
  //           'static/scripts/vendor/datatables/Pagination/input.js',
  //           'static/scripts/vendor/datatables/ColumnFilter/jquery.dataTables.columnFilter.js'
  //         ]);
  //       }]
  //     }
  //   })
  //   //forms
  //   .state('app.forms', {
  //     url: '/forms',
  //     template: '<div ui-view></div>'
  //   })
  //   //forms/common
  //   .state('app.forms.common', {
  //     url: '/common',
  //     controller: 'FormsCommonCtrl',
  //     templateUrl: 'static/views/tmpl/forms/common.html',
  //     resolve: {
  //       plugins: ['$ocLazyLoad', function($ocLazyLoad) {
  //         return $ocLazyLoad.load([
  //           'static/scripts/vendor/slider/bootstrap-slider.js',
  //           'static/scripts/vendor/touchspin/jquery.bootstrap-touchspin.js',
  //           'static/scripts/vendor/touchspin/jquery.bootstrap-touchspin.css',
  //           'static/scripts/vendor/filestyle/bootstrap-filestyle.min.js'
  //         ]);
  //       }]
  //     }
  //   })
  //   //forms/validate
  //   .state('app.forms.validate', {
  //     url: '/validate',
  //     controller: 'FormsValidateCtrl',
  //     templateUrl: 'static/views/tmpl/forms/validate.html'
  //   })
  //   //forms/wizard
  //   .state('app.forms.wizard', {
  //     url: '/wizard',
  //     controller: 'FormWizardCtrl',
  //     templateUrl: 'static/views/tmpl/forms/wizard.html'
  //   })
  //   //forms/upload
  //   .state('app.forms.upload', {
  //     url: '/upload',
  //     controller: 'FormUploadCtrl',
  //     templateUrl: 'static/views/tmpl/forms/upload.html',
  //     resolve: {
  //       plugins: ['$ocLazyLoad', function($ocLazyLoad) {
  //         return $ocLazyLoad.load([
  //           'static/scripts/vendor/filestyle/bootstrap-filestyle.min.js'
  //         ]);
  //       }]
  //     }
  //   })
  //   //forms/imgcrop
  //   .state('app.forms.imgcrop', {
  //     url: '/imagecrop',
  //     controller: 'FormImgCropCtrl',
  //     templateUrl: 'static/views/tmpl/forms/imgcrop.html',
  //     resolve: {
  //       plugins: ['$ocLazyLoad', function($ocLazyLoad) {
  //         return $ocLazyLoad.load([
  //           'static/scripts/vendor/filestyle/bootstrap-filestyle.min.js'
  //         ]);
  //       }]
  //     }
  //   })
  //   //tables
  //   .state('app.tables', {
  //     url: '/tables',
  //     template: '<div ui-view></div>'
  //   })
  //   //tables/bootstrap
  //   .state('app.tables.bootstrap', {
  //     url: '/bootstrap',
  //     controller: 'TablesBootstrapCtrl',
  //     templateUrl: 'static/views/tmpl/tables/bootstrap.html'
  //   })
  //   //tables/datatables
  //   .state('app.tables.datatables', {
  //     url: '/datatables',
  //     controller: 'TablesDatatablesCtrl',
  //     templateUrl: 'static/views/tmpl/tables/datatables.html',
  //     resolve: {
  //       plugins: ['$ocLazyLoad', function($ocLazyLoad) {
  //         return $ocLazyLoad.load([
  //           'static/scripts/vendor/datatables/ColReorder/css/dataTables.colReorder.min.css',
  //           'static/scripts/vendor/datatables/ColReorder/js/dataTables.colReorder.min.js',
  //           'static/scripts/vendor/datatables/Responsive/dataTables.responsive.css',
  //           'static/scripts/vendor/datatables/Responsive/dataTables.responsive.js',
  //           'static/scripts/vendor/datatables/ColVis/css/dataTables.colVis.min.css',
  //           'static/scripts/vendor/datatables/ColVis/js/dataTables.colVis.min.js',
  //           'static/scripts/vendor/datatables/TableTools/css/dataTables.tableTools.css',
  //           'static/scripts/vendor/datatables/TableTools/js/dataTables.tableTools.js',
  //           'static/scripts/vendor/datatables/datatables.bootstrap.min.css'
  //         ]);
  //       }]
  //     }
  //   })
  //   //tables/uiGrid
  //   .state('app.tables.ui-grid', {
  //     url: '/ui-grid',
  //     controller: 'TablesUiGridCtrl',
  //     templateUrl: 'static/views/tmpl/tables/ui-grid.html'
  //   })
  //   //tables/ngTable
  //   .state('app.tables.ng-table', {
  //     url: '/ng-table',
  //     controller: 'TablesNgTableCtrl',
  //     templateUrl: 'static/views/tmpl/tables/ng-table.html'
  //   })
  //   //tables/smartTable
  //   .state('app.tables.smart-table', {
  //     url: '/smart-table',
  //     controller: 'TablesSmartTableCtrl',
  //     templateUrl: 'static/views/tmpl/tables/smart-table.html'
  //   })
  //   //tables/fooTable
  //   .state('app.tables.footable', {
  //     url: '/footable',
  //     controller: 'TablesFootableCtrl',
  //     templateUrl: 'static/views/tmpl/tables/footable.html',
  //     resolve: {
  //       plugins: ['$ocLazyLoad', function($ocLazyLoad) {
  //         return $ocLazyLoad.load([
  //           'static/scripts/vendor/footable/dist/footable.all.min.js',
  //           'static/scripts/vendor/footable/css/footable.core.min.css'
  //         ]);
  //       }]
  //     }
  //   })
  //   //charts
  //   .state('app.charts', {
  //     url: '/charts',
  //     controller: 'ChartsCtrl',
  //     templateUrl: 'static/views/tmpl/charts.html',
  //     resolve: {
  //       plugins: ['$ocLazyLoad', function($ocLazyLoad) {
  //         return $ocLazyLoad.load([
  //           'static/scripts/vendor/flot/jquery.flot.resize.js',
  //           'static/scripts/vendor/flot/jquery.flot.orderBars.js',
  //           'static/scripts/vendor/flot/jquery.flot.stack.js',
  //           'static/scripts/vendor/flot/jquery.flot.pie.js',
  //           'static/scripts/vendor/gaugejs/gauge.min.js'
  //         ]);
  //       }]
  //     }
  //   })
  //   //layouts
  //   .state('app.layouts', {
  //     url: '/layouts',
  //     template: '<div ui-view></div>'
  //   })
  //   //layouts/boxed
  //   .state('app.layouts.boxed', {
  //     url: '/boxed',
  //     controller: 'BoxedlayoutCtrl',
  //     templateUrl: 'static/views/tmpl/layouts/boxed.html',
  //     containerClass: 'boxed-layout'
  //   })
  //   //layouts/fullwidth
  //   .state('app.layouts.fullwidth', {
  //     url: '/fullwidth',
  //     controller: 'FullwidthlayoutCtrl',
  //     templateUrl: 'static/views/tmpl/layouts/fullwidth.html'
  //   })
  //   //layouts/sidebar-sm
  //   .state('app.layouts.sidebar-sm', {
  //     url: '/sidebar-sm',
  //     controller: 'SidebarsmlayoutCtrl',
  //     templateUrl: 'static/views/tmpl/layouts/sidebar-sm.html',
  //     containerClass: 'sidebar-sm-forced sidebar-sm'
  //   })
  //   //layouts/sidebar-xs
  //   .state('app.layouts.sidebar-xs', {
  //     url: '/sidebar-xs',
  //     controller: 'SidebarxslayoutCtrl',
  //     templateUrl: 'static/views/tmpl/layouts/sidebar-xs.html',
  //     containerClass: 'sidebar-xs-forced sidebar-xs'
  //   })
  //   //layouts/offcanvas
  //   .state('app.layouts.offcanvas', {
  //     url: '/offcanvas',
  //     controller: 'OffcanvaslayoutCtrl',
  //     templateUrl: 'static/views/tmpl/layouts/offcanvas.html',
  //     containerClass: 'sidebar-offcanvas'
  //   })
  //   //layouts/hz-menu
  //   .state('app.layouts.hz-menu', {
  //     url: '/hz-menu',
  //     controller: 'HzmenuCtrl',
  //     templateUrl: 'static/views/tmpl/layouts/hz-menu.html',
  //     containerClass: 'hz-menu'
  //   })
  //   //layouts/rtl-layout
  //   .state('app.layouts.rtl', {
  //     url: '/rtl',
  //     controller: 'RtlCtrl',
  //     templateUrl: 'static/views/tmpl/layouts/rtl.html',
  //     containerClass: 'rtl'
  //   })
  //   //maps
  //   .state('app.maps', {
  //     url: '/maps',
  //     template: '<div ui-view></div>'
  //   })
  //   //maps/vector
  //   .state('app.maps.vector', {
  //     url: '/vector',
  //     controller: 'VectorMapCtrl',
  //     templateUrl: 'static/views/tmpl/maps/vector.html',
  //     resolve: {
  //       plugins: ['$ocLazyLoad', function($ocLazyLoad) {
  //         return $ocLazyLoad.load([
  //           'static/scripts/vendor/jqvmap/jqvmap/jquery.vmap.min.js',
  //           'static/scripts/vendor/jqvmap/jqvmap/maps/jquery.vmap.world.js',
  //           'static/scripts/vendor/jqvmap/jqvmap/maps/jquery.vmap.usa.js',
  //           'static/scripts/vendor/jqvmap/jqvmap/maps/jquery.vmap.europe.js',
  //           'static/scripts/vendor/jqvmap/jqvmap/maps/jquery.vmap.germany.js'
  //         ]);
  //       }]
  //     }
  //   })
  //   //maps/google
  //   .state('app.maps.google', {
  //     url: '/google',
  //     controller: 'GoogleMapCtrl',
  //     templateUrl: 'static/views/tmpl/maps/google.html'
  //   })
  //   //calendar
  //   .state('app.calendar', {
  //     url: '/calendar',
  //     controller: 'CalendarCtrl',
  //     templateUrl: 'static/views/tmpl/calendar.html'
  //   })
  //   //app core pages (errors, login,signup)
  //     .state('core', {
  //     abstract: true,
  //     url: '/core',
  //     template: '<div ui-view></div>'
  //   })
  //   //login
  //   .state('core.login', {
  //     url: '/login',
  //     controller: 'LoginController',
  //     controllerAs: 'vm',
  //     templateUrl: 'static/views/authentication-views/login.html'
  //   })
  //   //signup
  //   .state('core.signup', {
  //     url: '/signup',
  //     controller: 'SignupCtrl',
  //     templateUrl: 'static/views/tmpl/pages/signup.html'
  //   })
  //   //forgot password
  //   .state('core.forgotpass', {
  //     url: '/forgotpass',
  //     controller: 'ForgotPasswordCtrl',
  //     templateUrl: 'static/views/authentication-views/forgotpass.html'
  //   })
  //   //page 404
  //   .state('core.page404', {
  //     url: '/page404',
  //     templateUrl: 'static/views/authentication-views/page404.html'
  //   })
  //   //page 500
  //   .state('core.page500', {
  //     url: '/page500',
  //     templateUrl: 'static/views/authentication-views/page500.html'
  //   })
  //   //page offline
  //   .state('core.page-offline', {
  //     url: '/page-offline',
  //     templateUrl: 'static/views/authentication-views/page-offline.html'
  //   })
  //   //locked screen
  //   .state('core.locked', {
  //     url: '/locked',
  //     templateUrl: 'static/views/authentication-views/locked.html'
  //   })
  //   //example pages
  //   .state('app.pages', {
  //     url: '/pages',
  //     template: '<div ui-view></div>'
  //   })
  //   //gallery page
  //   .state('app.pages.gallery', {
  //     url: '/gallery',
  //     controller: 'GalleryCtrl',
  //     templateUrl: 'static/views/tmpl/pages/gallery.html',
  //     resolve: {
  //       plugins: ['$ocLazyLoad', function($ocLazyLoad) {
  //         return $ocLazyLoad.load([
  //           'static/scripts/vendor/mixitup/jquery.mixitup.js',
  //           'static/scripts/vendor/magnific/magnific-popup.css',
  //           'static/scripts/vendor/magnific/jquery.magnific-popup.min.js'
  //         ]);
  //       }]
  //     }
  //   })
  //   //timeline page
  //   .state('app.pages.timeline', {
  //     url: '/timeline',
  //     controller: 'TimelineCtrl',
  //     templateUrl: 'static/views/tmpl/pages/timeline.html'
  //   })
  //   //chat page
  //   .state('app.pages.chat', {
  //     url: '/chat',
  //     controller: 'ChatCtrl',
  //     templateUrl: 'static/views/tmpl/pages/chat.html'
  //   })
  //   //search results
  //   .state('app.pages.search-results', {
  //     url: '/search-results',
  //     controller: 'SearchResultsCtrl',
  //     templateUrl: 'static/views/tmpl/pages/search-results.html',
  //     resolve: {
  //       plugins: ['$ocLazyLoad', function($ocLazyLoad) {
  //         return $ocLazyLoad.load([
  //           'static/scripts/vendor/slider/bootstrap-slider.js'
  //         ]);
  //       }]
  //     }
  //   })
  //   //profile page
  //   .state('app.pages.profile', {
  //     url: '/profile/:username',
  //     controller: 'AccountSettingsController',
  //     controllerAs: 'vm',
  //     templateUrl: 'static/views/authentication-views/profile.html',
  //     resolve: {
  //       plugins: ['$ocLazyLoad', function($ocLazyLoad) {
  //         return $ocLazyLoad.load([
  //           'static/scripts/vendor/filestyle/bootstrap-filestyle.min.js'
  //         ]);
  //       }]
  //     }
  //   })
  //   .state('app.pages.company-profile', {
  //     url: '/company/:companyId',
  //     controller: 'CompanySettingsController',
  //     controllerAs: 'vm',
  //     templateUrl: 'static/views/authentication-views/company-profile.html',
  //     resolve: {
  //       plugins: ['$ocLazyLoad', function($ocLazyLoad) {
  //         return $ocLazyLoad.load([
  //           'static/scripts/vendor/filestyle/bootstrap-filestyle.min.js'
  //         ]);
  //       }]
  //     }
  //   })    
  //   //documentation
  //   .state('app.help', {
  //     url: '/help',
  //     controller: 'HelpCtrl',
  //     templateUrl: 'static/views/tmpl/help.html'
  //   });
  // }]);

