//Declaration du module
var pokeApp = angular.module('pokedex', ['ngResource'])

//Configuration du module				 
pokeApp.config(['$resourceProvider', function($resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;
}]);

var pokeApiUrl = "http://pokeapi.co/"

/*Declaration d'un controleur du module*/
pokeApp.controller('ctrlPokemon', ctrlPokemon); //Associé un controleur à une fonnction

//Fonction associé à la ng-controler: va permettre d'associer un model au controleur et les différents traitements possibles
function ctrlPokemon($scope, $http, $log,sendSearch){
	//On masque pour le moment la partie résultat
	$("#pokeInfo").hide();
	//Definition d'une liste de pokemon: on récupére la base des données
	pokeApiUrlListTotal = pokeApiUrl + "api/v2/pokedex/1/"; 
	
	//Requete pour récuperer une liste de pokemon
    $http({
        method: 'GET',
        url: pokeApiUrlListTotal,
    }).then(function successCallback(response) {
			$scope.listPokemon= response.data.pokemon_entries
    });
	
	//Fonction de recherche: paramêtre item est l'id du pokemon recherché
	$scope.search = function(item) {
		//test d'affichage 
		//$log.log($scope.listPokemon[item-1]);
		//test pour tester le service de recherche de pokemon
		//var pokemon = pokeInfo.get({id:item-1});
		//console.log(pokemon);
		//Appel du service send search pour stocker dans ses variables l'id
		sendSearch.setId(item);
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
	$scope.sendSearch = sendSearch; //ATTENTION: Ne pas oublier de rajouter le service dans le scope si on veut utiliser $scope.$watch
	//On rappelle ce traitement à chaque changement de variable de sendSearch.id
	$scope.$watch('sendSearch.getId()', function() {
		if (typeof sendSearch.getId() != 'undefined'){
			//On récupere en indiquant l'id un pokemon
			var pokemon = pokeInfo.get({id:sendSearch.getId()});
			//Une fois le résultat récuperer on va enregistrer dans des variables les infos
			pokemon.$promise.then(function (result) {
				$scope.pokemon = result;
				console.log($scope.pokemon);
				$scope.id = result.id;
				$scope.name = result.name;
				$scope.moves = result.moves;
				$scope.height= result.height*10;
				$scope.weight= result.weight/10;
				$scope.baseXp= result.base_experience;
				$("#pokeInfo").show();
			}, true);
		}else{
			alert("Merci d'indiquer un pokemon");
		}
	});
}

/* Déclaration d'un service qui permet d'envoyer les infos du controler pour la recherche vers le controler pour l'affichage*/
pokeApp.factory('sendSearch', function() {
	var data= {id: 0};	
	
	data.setId = function(num){
		data.id=num;
	}
	data.getId = function (){
		return data.id;
	}
	return data;
});

/*Création d'une directive contenant tout le structure du pokedex*/
pokeApp.directive('ngPokedex', function() {
  return {
    restrict: 'A', //Comment on va utiliser la directive (A/E/C/M)
    templateUrl: 'pokedex.html' //fichier qui contient notre template html
  }
});