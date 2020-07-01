angular.module("meuModulo")
.controller("indexController", function($scope) {
        $scope.titulo = "Sistema com Angular JS";
        $scope.alunos = [
            {nome: "João", email: "joao@hotmail.com", nota1: 65, nota2:80, nota3: 40},
            {nome: "Pedro", email: "pedro@gmail.com", nota1: 75, nota2:80, nota3: 70},
            {nome: "Marcelo", email: "marcelo@hotmail.com", nota1: 65, nota2:90, nota3: 60},
            {nome: "Amanda", email: "amanda@gmail.com", nota1: 95, nota2:80, nota3: 100},
            {nome: "Carlos", email: "carlos@hotmail.com", nota1: 85, nota2:30, nota3: 70},
            {nome: "Marcio", email: "marcio@gmail.com", nota1: 85, nota2:80, nota3: 100}
        ];

        // Fez uma variável usando os alunos e a media dentro do forEach. 
        var  init = function(){
            $scope.alunos.forEach(function(aluno){
                aluno.media = media(aluno);
            });
            limpaForm();
        };
        //Retirou a media so Scope, agora ela é interna do JavaScript.
        //Fazendo isso, toda vez que há uma busca as medias já estã calculadas, e não há excesso desnecessário de informação.
        var contar2 = 0;
        var media = function(Aluno){
            console.log(contar2++);
            var media = (parseFloat (Aluno.nota1) + parseFloat (Aluno.nota2) + parseFloat (Aluno.nota3))/3;
            return media.toFixed(2);
        };
        //Este código pode até ficar normal, sem estar comentado, pq ele está apontando pro Scope porém não está sendo chamado pelo mesmo.

        // var contar = 0;
        // $scope.media = function(Aluno){
        //     console.log(contar++);
        //     var media = (Aluno.nota1 + Aluno.nota2 + Aluno.nota3)/3;
        //     return media.toFixed(2);
        // };
        
        var limpaForm = function(){
            $scope.Aluno = {nome: "", email: "", nota1: '', nota2: '', nota3: '', media: ''};
        };

        $scope.abreAddAluno = function(){
            $scope.editando = false;
            limpaForm();
            $('#modal1').modal('open');
        };

        $scope.addAluno = function(Aluno){
            Aluno.media = media(Aluno);
            $scope.alunos.push(Aluno);
            $('#modal1').modal('close');
            limpaForm();
        };

        $scope.editando = false;
        var alunoEditar;

        $scope.editarAluno = function(Aluno){
            $scope.editando = true;
            angular.copy(Aluno,$scope.Aluno);
             $('#modal1').modal('open');
             alunoEditar = Aluno;
        };

        $scope.salvarAluno = function(Aluno){
            alunoEditar.nome = Aluno.nome;
            alunoEditar.email = Aluno.email;
            alunoEditar.nota1 = Aluno.nota1;
            alunoEditar.nota2 = Aluno.nota2;
            alunoEditar.nota3 = Aluno.nota3;
            alunoEditar.media = media(Aluno);
            $('#modal1').modal('close');
        };

        $scope.deletarAluno = function(Aluno){
            for(var index in $scope.alunos){
                var aux = $scope.alunos[index];
                if(Aluno === aux){
                    $scope.alunos.splice(index, 1);
                }
            };
        };

        $scope.Cancelar = function(Aluno){
            limpaForm();
        };
        
        init();
    });