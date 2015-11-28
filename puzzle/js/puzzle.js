var blank = {
    x: 3,
    y: 3
}
var onGame = false;
var blocks = $(".block");
var time = 0;
var step = 0;

function start() {
    var start = $("#start");
    var picContainer = $(".pic:first");
    var count = 0;
    var ldir = 1;//  record previous step
    var button = $("button:first");
    $("#timer").text("Time: 0s");
    time = 0;
    $("#step").text("Step: 0");
    step = 0;
    button.text("Shuffling");
    button.attr("id", "shuffleButton");
    $("#_win").attr("id", "win");
    window.shuffleTimer = setInterval(function() {
        /*
          move the blank block to shuffle the $(".block").
        */
        if (count == 500) {
            var start = $("button:first");
            start.text("Quit");
            start.attr("id", "quit");
            window.timer = setInterval(function() {
                $("#timer").text("Time: " + ++time + "s");
            }, 1000);
            clearInterval(window.shuffleTimer);
        }
        count++;
        var direction;
        var moveX = [1, 0, 0, -1], moveY = [0, 1, -1, 0];
        while (1) {//  determine the direction
            direction = _.random(3);
            //  eliminate overflow and redoing
            if (moveX[direction] + blank.x < 4 && moveX[direction] + blank.x >= 0 &&
                moveY[direction] + blank.y < 4 && moveY[direction] + blank.y >= 0 && 3 - direction != ldir) {
                ldir = direction;
                break;
            }
        }
        $(".block").each(function(i) {
            if ($(".block")[i].posi.x == blank.x + moveX[direction] &&
                $(".block")[i].posi.y == blank.y + moveY[direction]) {
                $(".block")[i].posi.x = blank.x;
                $(".block")[i].posi.y = blank.y;
                blank.x += moveX[direction];
                blank.y += moveY[direction];
                $(this).css({
                    "left": 25 * $(".block")[i].posi.x + "%",
                    "top": 25 * $(".block")[i].posi.y + "%"
                });
            }
        });
    }, 5);
    onGame = true;
}

function quit() {
    if ($("button:first").attr("id") == "quit") {
        $("button:first").html("Sure?");
        $("button:first").attr("id", "ensure");
    }
    else if ($("button:first").attr("id") == "ensure") {
        onGame = false;
        $("button:first").html("Start");
        $("button:first").attr("id", "start");
        clearInterval(window.timer);
        $(".block").each(function(i) {
            $(this).css({
                "left": 25 * $(".block")[i].initPosi.x + "%",
                "top": 25 * $(".block")[i].initPosi.y + "%"
            });
            $(".block")[i].posi.x = $(".block")[i].initPosi.x;
            $(".block")[i].posi.y = $(".block")[i].initPosi.y;
        });
        blank.x = 3;
        blank.y = 3;
    }
}

function button() {
    if (this.id == "shuffleButton") {
        return;
    }
    if (onGame) {
        quit();
    } else {
        start();
    }
}

function move() {
    var posi = this.posi;
    var move = false;
    var win = true;
    if (onGame) {
        var start = $("button:first");
        if (start.attr("id") == "ensure") {
            start.text("Quit");
            start.attr("id", "quit");
        }
        if (posi.y == blank.y) {
            if (posi.x + 1 == blank.x) {
                posi.x++;
                blank.x--;
                move = true;
            }
            else if (posi.x - 1 == blank.x) {
                posi.x--;
                blank.x++;
                move = true;
            }
        }
        else if (posi.x == blank.x) {
            if (posi.y + 1 == blank.y) {
                posi.y++;
                blank.y--;
                move = true;
            }
            else if (posi.y - 1 == blank.y) {
                posi.y--;
                blank.y++;
                move = true;
            }
        }
        if (move) {
            $("#step").text("Step: " + ++step);
            $(this).css({
                "left": 25 * posi.x + "%",
                "top": 25 * posi.y + "%"
            });
            $(".block").each(function(i) {
                if ($(".block")[i].posi.x != $(".block")[i].initPosi.x || $(".block")[i].posi.y != $(".block")[i].initPosi.y) {
                    win = false;
                }
            });
            if (win) {
                clearInterval(window.timer);
                $(".pic:first").addClass("blur");
                $("#win").attr("id", "_win");
                $("button:first").text("Restart");
                $("button:first").attr("id", "restart");
                onGame = false;
            }
        }
    }
}

$(function() {
    $(".block").click(move);
    $("button:first").click(button);
})
