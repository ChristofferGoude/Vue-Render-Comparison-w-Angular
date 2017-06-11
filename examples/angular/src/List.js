var app = angular.module("angularApp", []);
app.controller("appController", function($scope, $sce){
    $scope.content = "This text is <em>html capable</em> meaning you can have <a href=\"#\">all</a> sorts <b>of</b> html in here.";
    $scope.getHtml = function(html){
        return $sce.trustAsHtml(html);
    };
});


const ListItems = "";

const List = function listFunc(){
    return "test";
}

export default List
