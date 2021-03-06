'use strict';

var cards = ["cat0.jpg", "cat7.jpg", "cat2.jpg", "cat2.jpg", "cat5.jpg", "cat1.jpg", "cat3.jpg", "cat5.jpg", "cat4.jpg", "cat3.jpg", "cat4.jpg", "cat7.jpg", "cat6.jpg", "cat0.jpg", "cat1.jpg", "cat6.jpg"];

for (var i = 0; i < cards.length; i++) {
    $("#c" + i).on(
        "click.revealCard",
        function (a) {
            return function () {
                revealCard(a)
            };
        }(i)
    );
}

var oneVisible = false;
var turnCounter = 0;
var visible_nr;
var is_blocked = false;
var unreveald = cards.length / 2;
var seconds = 0;
var timer;

function shuffle(a) {
    var j, x;
    for (var i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
}

function secToTime(seconds) {
    var hours = Math.floor(seconds / 3600);
    if (hours < 10) hours = "0" + hours;
    var minutes = Math.floor(seconds / 60) - hours * 60;
    if (minutes < 10) minutes = "0" + minutes;
    var sek = seconds - ((hours * 3600) + (minutes * 60));
    if (sek < 10) sek = "0" + sek;
    var totalTime = hours + ":" + minutes + ":" + sek;
    return totalTime;
}

shuffle(cards);


function revealCard(nr) {
    if (timer === undefined) {
        timer = setInterval(function () {
            seconds++;
            var totalTime = secToTime(seconds);
            $("#timer").html(totalTime);
        }, 1000);
    }

    if (is_blocked === true) {
        return;
    }

    var image = "url(img/" + cards[nr] + ")";
    var card = $("#c" + nr);
    var visibleCard = $("#c" + visible_nr);

    card.css("background-image", image);
    card.addClass("cardActive");
    card.off("click.revealCard");

    if (oneVisible === false) {
        oneVisible = true;
        visible_nr = nr;
    }
    else {
        if (cards[visible_nr] === cards[nr]) {
            unreveald--;
            if (unreveald === 0) {
                clearInterval(timer);
            }

            setTimeout(function () {
                card.css("opacity", 0);
                visibleCard.css("opacity", 0);
                is_blocked = false;

                if (unreveald === 0) {
                    $("#turnCounter").html(turnCounter);
                    $("#totalTime").html(secToTime(seconds));
                    $(".board").hide();
                    $(".gameOver").addClass("win").show();
                }
            }, 700);
        }

        else {
            setTimeout(function () {

                card.removeClass("cardActive");
                visibleCard.removeClass("cardActive");
                card.removeAttr('style');
                visibleCard.removeAttr('style');
                is_blocked = false;
                visibleCard.on("click.revealCard", function (a) {
                    return function () {
                        revealCard(a)
                    }
                }(visible_nr));
                $("#c" + nr).on("click.revealCard", function (a) {
                    return function () {
                        revealCard(a)
                    }
                }(nr));
            }, 900);

        }
        is_blocked = true;
        turnCounter++;
        $("#counter").html(turnCounter);
        oneVisible = false;
    }
}
