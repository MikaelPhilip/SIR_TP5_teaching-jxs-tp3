var pokeApp = angular.module('pokedex', ['ngResource'])
					 .controller('ctrlPokemon', ctrlPokemon); //Associé un controleur à une function qui représente son model

pokeApp.config(['$resourceProvider', function($resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;
}]);

var pokeApiUrl = "http://pokeapi.co/"


//fonction associé à la ng-controller: va permettre d'associer un model au controleur
function ctrlPokemon($scope, $http, $log){
	//definition d'une liste de pokemon: on récupére la base des données
	pokeApiUrlListTotal = pokeApiUrl + "api/v2/pokedex/1/"; 
	
	//Requete pour récuperer une liste de pokemon
    $http({
        method: 'GET',
        url: pokeApiUrlListTotal,
    }).then(function successCallback(response) {
			$scope.listPokemon= response.data.pokemon_entries
    });
	
	  
	$scope.search = function(item) {
		$log.log($scope.listPokemon[item-1]);
	}
	
}