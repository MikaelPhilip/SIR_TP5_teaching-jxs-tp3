var pokeApp = angular.module('pokedex', ['ngResource'])
					 .controller('ctrlPokemon', ctrlPokemon); //Associ� un controleur � une function qui repr�sente son model

pokeApp.config(['$resourceProvider', function($resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;
}]);

var pokeApiUrl = "http://pokeapi.co/"


//fonction associ� � la ng-controller: va permettre d'associer un model au controleur
function ctrlPokemon($scope, $http, $log){
	//definition d'une liste de pokemon: on r�cup�re la base des donn�es
	pokeApiUrlListTotal = pokeApiUrl + "api/v2/pokedex/1/"; 
	
	//Requete pour r�cuperer une liste de pokemon
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