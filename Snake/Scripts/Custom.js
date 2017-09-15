var snake = [[0, 0]];
var direcao = "";
var mx=0;
var my = 0;
var fimDeJogo = true;
var dimInterval = 500;
$(document).ready(function () {
    $("#bestScore").text(localStorage.getItem('bestScore'));
    $(document).keydown(function (t) {
        var key = t.which;
        switch (key) {
            case 38:
                direcao = "Up";
                break;
            case 40:
                direcao = "Down";
                break;
            case 37:
                direcao = "Left";
                break;
            case 39:
                direcao = "Right";
                break;
        }
    });
    var tabuleiro = "";

    tabuleiro += "<table class='tableCustom'><tbody id='tabuleiro'>";

    for (var i = 0; i < 9; i++)
    {
        tabuleiro += "<tr>"
        for (var j = 0; j < 10; j++)
        {
            tabuleiro += "<td  id=" + i + "_" + j + " ></td>";
        }
        tabuleiro+="</tr>"
    }
    tabuleiro += "</tbody></table>";
    $("#containerTabuleiro").append(tabuleiro);

    geraComida();
    setInterval(function () {
        movimentaSnake();
    }, dimInterval);
});


function geraComida() {
    //cria posições radomicas para geração da comida
     mx = parseInt(Math.random() * 10);
     my = parseInt(Math.random() * 10);

    //só permite numeros randomicos dentro do tabuleiro 
     if (mx > 8 || my > 10 || mx > 8 && my > 10) geraComida();
    //impede que a comida seja criada em cima da snake
     if ($("#tabuleiro").children("tr").children("td#" + mx + "_" + my + "").attr("class") == "colorSnake") geraComida();
     $("#tabuleiro").children("tr").children("td#" + mx + "_" + my + "").addClass("colorComida");

}


function pintaSnake(x, y) {

    if(direcao=="Right"){
        $("#tabuleiro").children("tr").children("td#" + x + "_" + y + "").addClass("colorHead");
        $("#tabuleiro").children("tr").children("td#" + x + "_" + (y - 1) + "").addClass("colorSnake");
    }
    else if (direcao == "Left") {
        $("#tabuleiro").children("tr").children("td#" + x + "_" + y + "").addClass("colorHead");
        $("#tabuleiro").children("tr").children("td#" + x + "_" + (y + 1) + "").addClass("colorSnake");
    }
    if (direcao == "Down")
    {
        $("#tabuleiro").children("tr").children("td#" + x + "_" + y + "").addClass("colorHead");
        $("#tabuleiro").children("tr").children("td#" +(x-1) + "_" + y + "").addClass("colorSnake");
    }
    else if (direcao == "Up")
    {
        $("#tabuleiro").children("tr").children("td#" + x + "_" + y + "").addClass("colorHead");
        $("#tabuleiro").children("tr").children("td#" + (x + 1) + "_" + y + "").addClass("colorSnake");
    }


    $("#scoreAtual").text(snake.length - 1);
}


function apagaSnake(x, y) {
    
    if (direcao == "Right") {
        $("#tabuleiro").children("tr").children("td#" + x + "_" + y + "").removeClass("colorHead");
        $("#tabuleiro").children("tr").children("td#" + (x - 1) + "_" + y + "").removeClass("colorSnake");

        $("#tabuleiro").children("tr").children("td#" + x + "_" + (y - 1) + "").removeClass("colorSnake");
        $("#tabuleiro").children("tr").children("td#" + x + "_" + y + "").removeClass("colorHead");
    }
    else if (direcao == "Left") {
        $("#tabuleiro").children("tr").children("td#" + x + "_" + y + "").removeClass("colorHead");
        $("#tabuleiro").children("tr").children("td#" + (x + 1) + "_" + y + "").removeClass("colorSnake");

        $("#tabuleiro").children("tr").children("td#" + x + "_" + (y + 1) + "").removeClass("colorSnake");
        $("#tabuleiro").children("tr").children("td#" + x + "_" + y + "").removeClass("colorHead");
    }

    
    if (direcao == "Down")
    {
        $("#tabuleiro").children("tr").children("td#" + x + "_" + (y - 1) + "").removeClass("colorSnake");
        $("#tabuleiro").children("tr").children("td#" + x + "_" + y + "").removeClass("colorHead");

        $("#tabuleiro").children("tr").children("td#" + x + "_" + y + "").removeClass("colorHead");
        $("#tabuleiro").children("tr").children("td#" + (x - 1) + "_" + y + "").removeClass("colorSnake");
    }
    else if (direcao=="Up") {

        $("#tabuleiro").children("tr").children("td#" + x + "_" + (y + 1) + "").removeClass("colorSnake");
        $("#tabuleiro").children("tr").children("td#" + x + "_" + y + "").removeClass("colorHead");

        $("#tabuleiro").children("tr").children("td#" + x + "_" + y + "").removeClass("colorHead");
        $("#tabuleiro").children("tr").children("td#" + (x +ç 1) + "_" + y + "").removeClass("colorSnake");
    }

}


function movimentaSnake() {

    if (fimDeJogo == true) {

            apagaSnake(snake[snake.length - 1][0], snake[snake.length - 1][1]);
            // define as posições em que a snake se move 
            if (direcao == "Right") snake[0][1]++;
            if (direcao == "Down") snake[0][0]++;
            if (direcao == "Left") snake[0][1]--;
            if (direcao == "Up") snake[0][0]--;

            if (verColisao(snake[0][0], snake[0][1])) {
                if (snake.length == 1) {
                    snake[snake.length] = [10, 10];
                    snake[snake.length] = [10, 10];
                }
                else {
        
                    snake[snake.length] = [10, 10];
                }
                geraComida();
            }
            //laço resposnavel por identificar a proxima posição a ser apagada
            for (x = snake.length-1; x > 0; x--)
            {

                snake[x][0] = snake[x - 1][0];
                snake[x][1] = snake[x - 1][1];

            }
            gameOver(snake[0][0], snake[0][1]);
            verificaPosicao();
            
            pintaSnake(snake[0][0], snake[0][1]);

    }

}
function verColisao(x, y) {
    if (mx == x && my == y) {
        $("#tabuleiro").children("tr").children("td#" + mx + "_" + my + "").removeClass("colorComida");
        dimInterval=dimInterval - 10;
        return true;
    }
    else return false;
}

function gameOver(x, y)
{
    if ($("#tabuleiro").children("tr").children("td#" + x+ "_" + y).attr("class") == $("#tabuleiro").children("tr").children("td#" + (x) + "_" +y).attr("class") && $("#tabuleiro").children("tr").children("td#" + x + "_" + y).attr("class") == "colorSnake") {

        var bestScore = localStorage.getItem('bestScore');

        if(snake.length > bestScore)
        {
            localStorage.setItem("bestScore", snake.length-1);
        }
        
        fimDeJogo = false;
        alert("Voce Perdeu");
    }
}
function verificaPosicao() {
    if (snake[0][0] > 8) {
        snake[0][0] = -1;
        snake[0][1] = snake[0][1];

        movimentaSnake();


    }
    else if (snake[0][0] < 0) {

        snake[0][0] = 9;

    }

    if (snake[0][1] >= 10) {
        snake[0][1] = -1;
        snake[0][0] = snake[0][0];
    }
    else if (snake[0][1] < 0)
    {
        snake[0][1] = 10;
    }
    
}