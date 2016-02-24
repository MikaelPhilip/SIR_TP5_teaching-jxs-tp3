//Declaration du module
var pokeApp = angular.module('pokedex', ['ngResource'])

//Configuration du module				 
pokeApp.config(['$resourceProvider', function($resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;
}]);

var pokeApiUrl = "http://pokeapi.co/"

/*Declaration d'un controleur du module*/
pokeApp.controller('ctrlPokemon', ctrlPokemon); //Associé un controleur à une function qui représente son model

//Fonction associé à la ng-controler: va permettre d'associer un model au controleur
function ctrlPokemon($scope, $http, $log,sendSearch){
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
		//test d'affichage 
		//$log.log($scope.listPokemon[item-1]);
		//test pour tester le service de recherche de pokemon
		//var pokemon = pokeInfo.get({id:item-1});
		//console.log(pokemon);
		//Appel du service send search pour stocker dans ses variables
		sendSearch.id=item;
	}
}

/* Déclaration d'un service qui permet de récuperer un pokemon (on l'appellera avec "pokeInfo.get"): 
ce service lance des requete sur un lien précis*/
pokeApp.factory('pokeInfo', function($resource) {
  return $resource(pokeApiUrl+"api/v2/pokemon/:id/",{id:'@id'});
});

/*Declaration du controleur pour l'affichage d'info*/
pokeApp.controller('ctrlInfoPokemon', ctrlInfoPokemon);

//Fonction pour afficher les infos sur un pokemon (4éme parametre = service qu'il va retrouver tout seul si le nom est correct))
function ctrlInfoPokemon($scope, $http, $log, pokeInfo, sendSearch){
	//On rappel à chaque changement de variable de sendSearch.id
	$scope.$watch('sendSearch.id', function() {
		//On récupere en indiquant l'id un pokemon
		var pokemon = pokeInfo.get({id:1});
		//Une fois le résultat récuperer on va enregistrer dans des variables les infos
		pokemon.$promise.then(function (result) {
			$scope.pokemon = result;
			console.log($scope.pokemon);
			$scope.id = result.id;
			$scope.name = result.name;
			$scope.moves = result.moves;
		});
	});
}

/* Déclaration d'un service qui permet d'envoyer les infos du controler pour la recherche vers le controler pour l'affichage*/
pokeApp.factory('sendSearch', function() {
	var id=0;
	var nom;
	return id;
});

//TODO: modifier le service entre les deux controlleur pour qu'il soit correctement utilisé