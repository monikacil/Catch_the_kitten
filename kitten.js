var cards = ["cat0.jpg","cat7.jpg", "cat2.jpg", "cat2.jpg","cat5.jpg", "cat1.jpg", "cat3.jpg","cat5.jpg", "cat4.jpg", "cat3.jpg", "cat4.jpg", "cat7.jpg", "cat6.jpg", "cat0.jpg", "cat1.jpg", "cat6.jpg"];

$("#c0").on("click.revealCard", function() {revealCard(0)})
$("#c1").on("click.revealCard", function() {revealCard(1)})
$("#c2").on("click.revealCard", function() {revealCard(2)})
$("#c3").on("click.revealCard", function() {revealCard(3)})
$("#c4").on("click.revealCard", function() {revealCard(4)})
$("#c5").on("click.revealCard", function() {revealCard(5)})
$("#c6").on("click.revealCard", function() {revealCard(6)})
$("#c7").on("click.revealCard", function() {revealCard(7)})
$("#c8").on("click.revealCard", function() {revealCard(8)})
$("#c9").on("click.revealCard", function() {revealCard(9)})
$("#c10").on("click.revealCard", function() {revealCard(10)})
$("#c11").on("click.revealCard", function() {revealCard(11)})
$("#c12").on("click.revealCard", function() {revealCard(12)})
$("#c13").on("click.revealCard", function() {revealCard(13)})
$("#c14").on("click.revealCard", function() {revealCard(14)})
$("#c15").on("click.revealCard", function() {revealCard(15)})

var oneVisible = false;
var turnCounter = 0;
var visible_nr;
var is_blocked = false;
var unreveald = 8;

function shuffle(a)
{
    var j, x, i;
    for (i = a.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
}


function timer()
{
  var time = 0;

  document.getElementById("timer").innerHTML = time;

  setTimeout(timer,1000);
}

shuffle(cards);


function revealCard(nr)
{
  if(is_blocked == true)
  {
    return;
  }

  var image = "url(img/"+cards[nr]+")";

  $("#c"+nr).css("background-image", image);
  $("#c"+nr).addClass("cardActive");
  $("#c"+nr).removeClass("card");

  if(oneVisible == false)
  {
    oneVisible = true;
    visible_nr = nr;
  }
  else
  {
    if(cards[visible_nr] == cards[nr])
    {
      $("#c"+nr).off("click.revealCard");
      $("#c"+visible_nr).off("click.revealCard");
      unreveald--;

      setTimeout(function()
      {
        $("#c"+nr).css("opacity", 0);
        $("#c"+visible_nr).css("opacity", 0);
        is_blocked = false;

        if(unreveald == 0)
        {
          $(".board").html("Congrats!</br> You win in "+turnCounter+' turns!</br></br><span class="reset" onclick = "location.reload()">Try again!</span>');
          $(".board").addClass("win");
        }
      },1000);


    }
    else
    {
      setTimeout(function()
      {
        $("#c"+nr).addClass("card");
        $("#c"+nr).removeClass("cardActive");
        $("#c"+visible_nr).addClass("card");
        $("#c"+visible_nr).removeClass("cardActive");
        $("#c"+nr).css("background-image", "url('img/main.jpg')");
        $("#c"+visible_nr).css("background-image", "url('img/main.jpg')");
        is_blocked = false;
      }, 1000);

    }
    is_blocked = true;
    turnCounter++;
    $(".score").html("Turn counter: "+turnCounter);
    oneVisible = false;
  }
}
