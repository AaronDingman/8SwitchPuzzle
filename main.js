function SwitchPuzzle(n) {
    this.solved = false;
    this.n = n || 8;
    this.selectedNodes = new Array(this.n).fill(0);
    this.nodesToSolve = new Array(this.n).fill(0);
}

SwitchPuzzle.prototype.init = function(elementId) {
    var main = document.getElementById(elementId);
    main.innerHTML = ""; // reset the element in use

    var theta = [];
    var r = 200; // not sure what the meaning of this is
    var frags = 360 / this.n;
    for (var i = 0; i <= this.n; i++) {
        theta.push((frags / 180) * i * Math.PI);
    }
    var mainHeight = parseInt(window.getComputedStyle(main).height.slice(0, -2));
    var circleArray = [];
    for (let i = 0; i < this.n; i++) {
        var circle = document.createElement("div");
        circle.className = "circle";
        circle.id = i;

        circleArray.push(circle);
        // Positioning the circles
        circleArray[i].style.position = "absolute";
        circleArray[i].posx = Math.round(r * (Math.cos(theta[i]))) + "px";
        circleArray[i].posy = Math.round(r * (Math.sin(theta[i]))) + "px";
        // Moving the circles vertically
        circleArray[i].style.top = ((mainHeight / 2) - parseInt(circleArray[i].posy.slice(0, -2))) + "px";
        // Moving the circles horizontally
        circleArray[i].style.left = ((mainHeight/ 2 ) + parseInt(circleArray[i].posx.slice(0, -2))) + "px";
        // Push the divs to main
        main.appendChild(circleArray[i]);
        var self = this;
        circleArray[i].onclick = function() {
            if (!self.solved) {
                if (this.classList.contains("selected")) {
                    this.classList.remove("selected");
                    self.selectedNodes[i] = 0;
                } else {
                    this.classList.add("selected");
                    self.selectedNodes[i] = 1;
                }
            }
        };
    }
};
// circular index
SwitchPuzzle.prototype.index = function(i) {
    return (i < 0) ? i + this.n : i % this.n;
};
// Utility for our convenience
Array.prototype.sum = function() {
    return this.reduce(function(a, b) { return a + b; });
};
SwitchPuzzle.prototype.solve = function() {
    var count = this.selectedNodes.sum();

    if (count === 1) {
        for (var i = 0; i < this.selectedNodes.length; i++) {
            if (this.selectedNodes[i] === 1) {
                this.nodesToSolve[this.index(i - 1)] = 1;
                this.nodesToSolve[this.index(i + 1)] = 1;
                this.nodesToSolve[this.index(i + 4)] = 1;
            }
        }
    } else if (count === 2) {
        var first = null;
        for (var i = 0; i < this.selectedNodes.length; i++) {
            if (this.selectedNodes[i] === 1) {
                // solvable when circles are 2 spaces apart
                if (first === null) {
                    first = i;
                } else {
                    if (i - first == 2 || i - first == (this.n - 2)) {
                        // edge case where we have to wrap around
                        if (i - first !== 2) first = i;
                        this.nodesToSolve[this.index(first + 1)] = 1;
                        this.nodesToSolve[this.index(first + 4)] = 1;
                        this.nodesToSolve[this.index(first + 5)] = 2;
                        this.nodesToSolve[this.index(first + 6)] = 1;
                    } else {
                        alert("Illegal Board State");
                    }
                    break;
                }
            }
        }
    }
    this.highlightNodesToSolve(this.nodesToSolve);
    this.solved = true;
};


SwitchPuzzle.prototype.highlightNodesToSolve = function(list) {
    for (var i = 0; i <= list.length; i++) {
        if (list[i] === 1) {
            $("#" + i).addClass("solve1");
        }
        if (list[i] === 2) {
            $("#" + i).addClass("solve2");
        }
    }
};

function resetBoard() {
    puzzle = new SwitchPuzzle();
    puzzle.init("main");
}

$(document).ready(function () {
    $("#solve").on("click", function(){
        if (!puzzle.solved) {
            puzzle.solve();
        }
    });

    $("#reset").on("click", function(){
        resetBoard();
    });
    resetBoard();
});
