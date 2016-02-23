var pokeApp = angular.module('pokedex', ['ngResource'])
					 .controller('ctrlPokemon', ['$scope', '$log',ctrlPokemon]); //Associ� un controleur � une function qui repr�sente son model

pokeApp.config(['$resourceProvider', function($resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;
}]);

var pokeApiUrl = "http://pokeapi.co/"


//fonction associ� � la ng-controller: va permettre d'associer un model au controleur
function ctrlPokemon($scope){
	//definition d'une liste de pokemon
	var pok54 = {id:"54", nom:"Psykokwak", description:"blablabla", skills:["atk1","atk2","atk3"]}; 
	var pok1 = {id:"1", nom:"Bulbizarre", description:"blablabla", skills:["atk1","atk2","atk3"]}; 
	var pok4 = {id:"4", nom:"Salam�che", description:"blablabla", skills:["atk1","atk2","atk3"]}; 
	var pok7 = {id:"7", nom:"Carapuce", description:"blablabla", skills:["atk1","atk2","atk3"]}; 
	var pok19 = {id:"19", nom:"Rattata", description:"blablabla", skills:["atk1","atk2","atk3"]}; 
	$scope.listPokemon = [pok54,pok1,pok4,pok7,pok19];
	
	$scope.search = function() {
		$scope.message = 'Hello World!';
	}
	
}