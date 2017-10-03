var selectedNodes = [0,0,0,0,0,0,0,0];
var isSolved = false;

$(document).ready(function () {

    $("#main > .circle").on("click", function(){
        // Passes changeToSelected the numbered ID for the div clicked on
        if (isSolved === false) {
            changeToSelected($(this).attr("id"));
        }
    });

    $(".solveButton").on("click", function(){
        if (isSolved === false) {
            solveBoard();
        }
    });

    $(".resetButton").on("click", function(){
        resetBoard();
    });
});
var counter = 0;
var nodesToSolve = [0,0,0,0,0,0,0,0];
function solveBoard() {

    for (var i = 0; i <= selectedNodes.length; i++) {
        if (selectedNodes[i] === 1) {
            counter += 1;
        }
    }
    // Base case, if the board is already solved
    if (counter === 8) {
        alert("The board is already solved!");
    }
    // If only one circle is selected
    if(counter === 1){
        for (var i = 0; i <= selectedNodes.length; i++) {
            if (selectedNodes[i] === 1) {
                console.log(i-1);
                // Solves the circle to the direct left position
                if (i - 1 < 0) {
                    nodesToSolve[i + 7] = 1;
                // else (i-1) is > 0
                } else {
                    nodesToSolve[i-1] = 1;
                }
                // Solves the circle to the direct right position
                if (i + 1 > 7) {
                    nodesToSolve[(i + 1) - 8] = 1;
                } else {
                    nodesToSolve[i + 1] = 1;
                }
                // Solves the circle directly opposite of i
                if (i + 4 > 7) {
                    nodesToSolve[(i + 4)] = 1;
                }
                if (i - 4 < 0) {
                    nodesToSolve[(i - 4) + 8] = 1;
                } else {
                    nodesToSolve[(i - 4)] = 1;
                }
            }
        }
        highlightNodesToSolve(nodesToSolve);
    }

    if (counter === 2) {
        for (var i = 0; i < selectedNodes.length; i++) {
            // if the first and last nodes are adjacent and selected
            if (i === 0 && selectedNodes[0] == 1 && selectedNodes[7] === 1) {
                alert("Illegal board state.");
            }
            // if any two adjacent nodes are adjacent and selected
            if (selectedNodes[i] === 1 && selectedNodes[i+1] === 1) {
                alert("Illegal board state.");
            }
            // if any two nodes are opposite and selected
            if (i + 4 <= 7) {
                if (selectedNodes[i] === 1 && selectedNodes[i+4] === 1) {
                    alert("Illegal board state.");
                }
            }
            // if any nodes are 3 apart and selected
            if (selectedNodes[i] === 1 && selectedNodes[i+3] === 1) {
                if (selectedNodes[i] === 1 && selectedNodes[(i + 3)] === 1) {
                    alert("Illegal board state.");
                }
            }
            // if any nodes are 3 apart and the following node would be greater than 7
            if (i + 3 > 7) {
                if (selectedNodes[i] === 1 && selectedNodes[(i + 3) - 8] === 1) {
                    alert("Illegal board state.");
                }
            }
            // if any two nodes are 2 spots apart and selected
            if (i + 2 <= 7) {
                if (selectedNodes[i] === 1 && selectedNodes[i + 2] === 1) {
                    nodesToSolve[i - 3] = 2;
                }
            }
            if (selectedNodes[i] === 1 && selectedNodes[(i + 2) - 8] === 1) {
                nodesToSolve[i - 3] = 2;
            }
            // if the selected node is 7 check position 1 and 7
            if (i + 2 === 9){
                if (selectedNodes[7] === 1 && selectedNodes[1] === 1) {
                    nodesToSolve[4] = 2;
                }
            }
            if (i - 3 < 0) {
                if (selectedNodes[i] === 1 && selectedNodes[i + 2] === 1) {
                    nodesToSolve[(i-3) + 8] = 2;
                }
            }
        }
        for (var i = 0; i <= nodesToSolve.length; i++) {
            if (nodesToSolve[i] === 2) {
                console.log(i-1);
                // Solves the circle to the direct left position
                if (i - 1 < 0) {
                    nodesToSolve[i + 7] = 1;
                // else (i-1) is > 0
                } else {
                    nodesToSolve[i-1] = 1;
                }
                // Solves the circle to the direct right position
                if (i + 1 > 7) {
                    nodesToSolve[(i + 1) - 8] = 1;
                } else {
                    nodesToSolve[i + 1] = 1;
                }
                // Solves the circle directly opposite of i
                if (i + 4 > 7) {
                    nodesToSolve[(i + 4)] = 1;
                }
                if (i - 4 < 0) {
                    nodesToSolve[(i - 4) + 8] = 1;
                } else {
                    nodesToSolve[(i - 4)] = 1;
                }
            }
        }
        highlightNodesToSolve(nodesToSolve);
    }
}

function highlightNodesToSolve(list){
    for (var i = 0; i <= list.length; i++) {
        if (list[i] === 1) {
            $("#" + i).css({"backgroundColor":"green"});
        }
        if (list[i] === 2) {
            $("#" + i).css({"backgroundColor":"Orange"});
        }
    }
}

function resetBoard() {
    for (var i = 0; i <= selectedNodes.length; i++) {
        $("#" + i).css({"backgroundColor":"white"});
    }
    counter = 0;
    nodesToSolve = [0,0,0,0,0,0,0,0];
    selectedNodes = [0,0,0,0,0,0,0,0];
}

function changeToSelected(i) {
    // If the div that was clicked on has a value of 0, set it to 1 and switch color to black
    if (selectedNodes[i] === 0) {
        selectedNodes[i] = 1;
        $("#" + i).css({"backgroundColor":"black"});
    // else set the value back to 0, switch the color back to white
    } else {
        selectedNodes[i] = 0;
        $("#" + i).css({"backgroundColor":"white"});
    }
}

var theta = [];
function setup(n, r, id) {
    var main = document.getElementById(id);
    var mainHeight = parseInt(window.getComputedStyle(main).height.slice(0, -2));
    var circleArray = [];
    for (var i = 0; i < n; i++) {
        var circle = document.createElement("div");
        circle.className = "circle";
        circle.id = i;
        circleArray.push(circle);
        // Positioning the circles
        circleArray[i].style.position = "absolute";
        circleArray[i].style.backgroundColor = "white";
        circleArray[i].posx = Math.round(r * (Math.cos(theta[i]))) + "px";
        circleArray[i].posy = Math.round(r * (Math.sin(theta[i]))) + "px";
        // Moving the circles vertically
        circleArray[i].style.top = ((mainHeight / 2) - parseInt(circleArray[i].posy.slice(0, -2))) + "px";
        // Moving the circles horizontally
        circleArray[i].style.left = ((mainHeight/ 2 ) + parseInt(circleArray[i].posx.slice(0, -2))) + "px";
        // Push the divs to main
        main.appendChild(circleArray[i]);
    }
}

function generate(n, r, id) {
    var frags = 360 / n;
    for (var i = 0; i <= n; i++) {
        theta.push((frags / 180) * i * Math.PI);
    }
    setup(n, r, id);
}
generate(8, 200, "main");
