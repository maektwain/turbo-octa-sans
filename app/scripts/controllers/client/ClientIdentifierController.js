(function (module) {
    mifosX.controllers = _.extend(module, {
        ClientIdentifierController: function (scope, routeParams,location, resourceFactory, dateFilter) {
            scope.clientId = routeParams.clientId;
            scope.formData = {};


            scope.documenttypes = [];
            resourceFactory.clientIdenfierTemplateResource.get({clientId: routeParams.clientId}, function (data) {
                scope.documenttypes = data.allowedDocumentTypes;
                scope.formData.documentTypeId = data.allowedDocumentTypes[0].id;
            });

            scope.prooftypes = [];
            resourceFactory.clientIdenfierTemplateResource.get({clientId: routeParams.clientId}, function (data){
              scope.prooftypes = data.allowedProofTypes;
              scope.formData.proofTypeId = data.allowedProofTypes[0].id;

            });
            scope.submit = function () {
              this.formData.locale = scope.optlang.code;
              this.formData.dateFormat = scope.df;
              this.formData.validity = dateFilter(scope.formData.validity, scope.df);
                resourceFactory.clientIdenfierResource.save({clientId: scope.clientId}, this.formData, function (data) {
                    location.path('/viewclient/' + data.clientId);
                });
            };

        }
    });
    mifosX.ng.application.controller('ClientIdentifierController', ['$scope', '$routeParams', '$location', 'ResourceFactory', 'dateFilter', mifosX.controllers.ClientIdentifierController]).run(function ($log) {
        $log.info("ClientIdentifierController initialized");
    });
}(mifosX.controllers || {}));
