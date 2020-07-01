var app = { };
    app.getComponente = function (nome){
      if( !app[nome]) {
        app[nome] = { $ctrl:{} };
      }
      return app[nome];
    };

  (function(){
    let compt = app.getComponente('compt');
    let $ctrlcompt = compt.$ctrl;
    $ctrlcompt.comecaJogo = function(){

$(document).ready(function(){
  //alerta de instruções
  alert("Bem vindo ao Jogo da Memoria - Joker vs1.0 - Escreva seu nome no campo 'Usuario' depois clique em 'Start/Reset'. Bom jogo!");
  var carta_virada = 0;
  var aux = null;
  var hit = 0;
  var variavelnomedousuario;
  var tentativa = 0;
  var start = new Date();
//div maior do jogo
 $('#game').css("max-width","450px");
 $('#game').css("height","450px");
 //formatando a div
for (x = 1; x < 5; x++){
 $('#game').append("<div id=a"+x+"></div>");
 $('#a'+x).css('width','400px');
 $('#a'+x).css('height','100px');
}
//pegando as imagens
var ArrayComImagens = ["1.png","2.png","3.png","4.png","5.png","6.png","7.png","8.png"];
ArrayComImagens = ArrayComImagens.concat(ArrayComImagens);
// -- START NEW GAME --
$('#button').click(function(){
  start = new Date();
  tentativa = 0;
  hit = 0;
  var finale;
  var a = 1;
  var b = 5;
  var p = 0;
  //apagar jogo anterior
  for(k = 1; k <= 16; k++ ){
    $('#carta'+k).remove();
  }
  //exclui tb dos resultados se existir
  $('#tb').html("");
  //novas divs internas (front and back das cartas)
    for (k = 1; k < 5; k++){
    for (w = a; w < b; w++){
    $('#a'+k).append("<div id=carta"+w+"></div>");
    }
    a = a +4;
    b = b +4;
  }
//volta var ao 0 - recomeca o jogo
 a = 1
 b = 5
//embaralhar
function shuffle(ArrayComImagens) {
  var currentIndex = ArrayComImagens.length, temporaryValue, randomIndex;
  //enquanto sobrar elemento
  while (0 !== currentIndex) {
    //pega um elemento
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    //e troca o shuffle pelo elemento
    temporaryValue = ArrayComImagens[currentIndex];
    ArrayComImagens[currentIndex] = ArrayComImagens[randomIndex];
    ArrayComImagens[randomIndex] = temporaryValue;
  }
  return ArrayComImagens;
}
//embaralhar as cartas
shuffle(ArrayComImagens);
//pegar a imagem background
for (i = 1; i <= 16; i++){
   $('#carta'+i).css("background-image","url(img/"+ArrayComImagens[i-1]).addClass("carta").attr("identificadorCarta", ArrayComImagens[i-1]);
}
//Setar  a frente e costa da carta 3segundos depois do botao Iniciar clicado.
setTimeout(function() {
    for (i = 1; i <= 16; i++){
    $('#carta'+i).append("<div class=front></div>");
    $('#carta'+i).append("<div class=back></div>");
  }
}, 2000);
//button e funcao pra cada carta
setTimeout(function() {
    $('.carta').flip();
    $(".carta").click(vira_carta);
}, 2010);
});
//salvar para localStorage
  function Saved(){
    variavelnomedousuario = $('#IdNomeDoUsuario').val();
    localStorage.setItem(variavelnomedousuario, tentativa + ' tentativas ' + finale + ' segundos');
  }
//virar as cartas e comparar
var vira_carta = function(event){
  if(carta_virada == 2){
    $(this).flip(false);
    console.log("Pega leve ai, aperta so uma vez!");
    return;
  }
//não pode selecionar a mesma carta
  if(this == aux){
    console.log("clicou na mesma carta");
    aux = null;
    carta_virada = 0;
    return;
  }
//comecar a if das cartas, selecionar a primeira carta
  if(!aux){
    aux = this;
    carta_virada++;
  } else {
    //verifica se as cartas são iguais
    if($(aux).attr("identificadorCarta") == $(this).attr("identificadorCarta")){
      carta_virada = 0;
      console.log("Voce Acertou!");
      hit++;
      tentativa = tentativa +1;
      $(aux).unbind("click");
      $(this).unbind("click");
      if(hit == 8){
        //verifica o tempo em segundos até o fim do jogo
        finale = start - new Date();
        finale = (Math.floor(finale/1000)*-1);
          alert("Muito bom!! voce precisou de "+tentativa+" tentativa e "+finale+" segundos para acabar.");
          Saved();
        hit = 0;
    }
    } else {
      //cartas diferentes, finaliza a var aux, e da refrexe nas cartas selecionadas
      var aux2 = aux;
      var aux3 = this;
      carta_virada++;
      //quando selecioanda e estiver errada - esperar 1,3segundos para voltar carta ao back.
      setTimeout(function(){
        $(aux2).flip(false);
        $(aux3).flip(false);
        tentativa = tentativa+1;
        carta_virada = 0;
      }, 1300)
    }
    //volta aux para null
    aux = null;
  }
}
});

    }

  })();
//chamada do compt
  app.compt.$ctrl.comecaJogo();