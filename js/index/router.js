(function () {
    angular.module('fundApp', ['ui.router', 'index.controllers'])
        .config(function ($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('touch', {
                    url: "/touch",
                    templateUrl: "/templates/touch.html",
                    controller: 'matchCtrl'
                })
            $urlRouterProvider.otherwise('touch');
        })
})();

