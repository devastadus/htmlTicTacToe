var red = [];
var green = [];
var blank = ["tl","tc","tr","ml","mc","mr","bl","bc","br"];
var tr,tc,tl,mr,mc,ml,br,bc,bl;
var topTile;
var resetButton;
var endOfGame = false;

window.onload=function(){
    tl = document.getElementById("tl");
    tc = document.getElementById("tc");
    tr = document.getElementById("tr");
    ml = document.getElementById("ml");
    mc = document.getElementById("mc");
    mr = document.getElementById("mr");
    bl = document.getElementById("bl");
    bc = document.getElementById("bc");
    br = document.getElementById("br");
    topTile = document.getElementById("title");
    resetButton = document.getElementById("reset");
    resetButton.style.visibility='hidden';
}

function reset(){
    red = [];
    green = [];
    blank = ["tl","tc","tr","ml","mc","mr","bl","bc","br"];
    tl.style.backgroundColor = '';
    tc.style.backgroundColor = '';
    tr.style.backgroundColor = '';
    ml.style.backgroundColor = '';
    mc.style.backgroundColor = '';
    mr.style.backgroundColor = '';
    bl.style.backgroundColor = '';
    bc.style.backgroundColor = '';
    br.style.backgroundColor = '';
    topTile.textContent = "Tick Tac Toe";
    resetButton.style.visibility='hidden';
    endOfGame = false;
}

function ticTacToe(currentElement){
    console.log(currentElement.id);

    if(currentElement.style.backgroundColor != 'green' && endOfGame == false){


        //set red
        currentElement.style.backgroundColor = 'red';
        var index = blank.indexOf(currentElement.id);
        clearIndex(blank,index);
        red.push(currentElement.id);

        endOfGame = checkForWin();

        //set green
        if(!endOfGame){
            var index = Math.floor((Math.random()*blank.length));
            var ele = blank[index];
            if(ele){
                green.push(ele);
                clearIndex(blank,index);
                document.getElementById(ele).style.backgroundColor = "green";
            }
            endOfGame = checkForWin();
        }
    }
}

function checkForStaleMate(){


}

function checkForWin(){

    var endOfGame = false;

    //matches center
    if(mc.style.backgroundColor === 'green' || mc.style.backgroundColor === 'red'){
        if(trippleMatch(tc.style.backgroundColor,mc.style.backgroundColor,bc.style.backgroundColor) || //mid vertical
            trippleMatch(mr.style.backgroundColor, mc.style.backgroundColor, ml.style.backgroundColor)|| // mid horizontal
            trippleMatch(tr.style.backgroundColor, mc.style.backgroundColor, bl.style.backgroundColor)|| // right diagonal
            trippleMatch(tl.style.backgroundColor, mc.style.backgroundColor, br.style.backgroundColor)){ // left diagonal
            endOfGame = whoWon(mc.style.backgroundColor);
        }
    }
    //matches uppper right
    if(tr.style.backgroundColor === 'green' || tr.style.backgroundColor === 'red'){
        if(trippleMatch(tr.style.backgroundColor, tc.style.backgroundColor, tl.style.backgroundColor)|| // upper horizontal
            trippleMatch(tr.style.backgroundColor, mr.style.backgroundColor, br.style.backgroundColor)) {// upper vertical
            endOfGame = whoWon(tr.style.backgroundColor);
        }
    }


    //matches lower left
    if(bl.style.backgroundColor === 'green' || bl.style.backgroundColor === 'red'){
        if (trippleMatch(bl.style.backgroundColor, bc.style.backgroundColor, br.style.backgroundColor) || // lower horizontal
            trippleMatch(bl.style.backgroundColor, ml.style.backgroundColor, tl.style.backgroundColor)) { // lower verticle
            endOfGame = whoWon(bl.style.backgroundColor);
        }
    }

    //check For Stale mate
    if(blank.length == 0){
        topTile.textContent = "StaleMate";
        resetButton.style.visibility='visible';
        endOfGame = true;
    }

    return endOfGame;
}

function whoWon(color){
    if(color == 'green')
        topTile.textContent = "You Lose";
    if(color == 'red')
        topTile.textContent = "You Win";
    resetButton.style.visibility='visible';
    return true;

}

function trippleMatch(a,b,c){
    if(a==b&&b==c)
        return true;
    else
        return false;
}

function clearIndex(array,index){
    if(index >-1)
        array.splice(index,1);
}