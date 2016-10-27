(function() {
    var $startUpPage = $('<div class="screen screen-start" id="start"><header><h1>Tic Tac Toe</h1><br><br><div class="playerName"><input type="text" placeholder="Please enter your name" size="30%"><br><br><a href="#" class="button">Start game</a></header></div>');
    var $playerWinPage = $('<div class="screen screen-win" id="finish"><header><h1>Tic Tac Toe</h1><p class="message"></p><a href="#" class="button">New game</a></header></div>').hide();
    var $playerDrawPage = $('<div class="screen screen-win" id="finish"><header><h1>Tic Tac Toe</h1><p class="message"></p><a href="#" class="button">New game</a></header></div>').hide();
    var inputName; // Store player name
    var player1 = $("#player1");
    var player2 = $("#player2");
    var box = $(".box");
    var boardCheck = [0, 0, 0, 0, 0, 0, 0, 0, 0]; // Mark current box when player click

    // When page loads, show up start up screen
    $(document).ready(function() {
      $("body").append($startUpPage);
      $(".board").hide();
      $("body").append($playerWinPage); // Append the win information and display when game over
      $("body").append($playerDrawPage); // Append the draw information and display when game over
    });

    // When click on button, enter game, and reset last data
    $(document).on("click", "#start .button", function(e) {
      e.preventDefault();
      $startUpPage.hide();
      inputName = $(".playerName input").val(); // Get player name
      player1.append("<i class='showName'></i>"); // Append player name to player1

      $(".showName").text(inputName); // Set player name according to input value
      $(".board").show();
    });

    // Contruct function to check current player
    var currentPlayer1 = function() {
      if($(player1).hasClass("active")) {
        return true;
      } else {
        return false;
      }
    };
    var currentPlayer2 = function() {
      if($(player2).hasClass("active")) {
        return true;
      } else {
        return false;
      }
    };

    // Construct function to check if current box is available
    var boxAvailable = function(e) {
      if(e.hasClass("box-filled-1") || e.hasClass("box-filled-2")) {
        return false;
      } else {
        return true;
      }
    };

    // Construct function to activate current box
    var activateBox = function(e) {
      if(currentPlayer1()) {
        e.addClass("box-filled-1");
      } else if(currentPlayer2() && boxAvailable(e)) {
        e.addClass("box-filled-2");
      }
    };

    // Construct function to turn player
    var turnPlayer = function($this) {
      if(currentPlayer1()) {
        player2.addClass("active");
        player1.removeClass("active");
      } else {
        player1.addClass("active");
        player2.removeClass("active");
      }
    };

    // Construct function to mark up the current clicked box
    var markUpBox = function() {
      for(var i = 0; i < box.length; i++) {
        if(box.eq(i).hasClass("box-filled-1")) {
          boardCheck[i] = "o";
        }
        if(box.eq(i).hasClass("box-filled-2")) {
          boardCheck[i] = "x";
        }
      }
    };

    // Construct function to show win screen
    var showWinScreen = function() {
      $(".board").hide();
      $playerWinPage.show();
      if(currentPlayer1()) {
        $playerWinPage.addClass("screen-win-one");
        $(".message").text(inputName + " winner");
      } else if(currentPlayer2()) {
        $playerWinPage.addClass("screen-win-two");
        $(".message").text("Winner");
      }
    };

    // Construct function to check win condition
    var playerWinCondition = function() {
      console.log(boardCheck);
      // Row check
      if(boardCheck[0] + boardCheck[1] + boardCheck[2] == "ooo" || boardCheck[3] + boardCheck[4] + boardCheck[5] == "ooo" || boardCheck[6] + boardCheck[7] + boardCheck[8] === "ooo") {
        showWinScreen();
      } else if(boardCheck[0] + boardCheck[1] + boardCheck[2] == "xxx" || boardCheck[3] + boardCheck[4] + boardCheck[5] == "xxx" || boardCheck[6] + boardCheck[7] + boardCheck[8] === "xxx") {
        showWinScreen();
        // Column check
      } else if(boardCheck[0] + boardCheck[3] + boardCheck[6] == "ooo" || boardCheck[1] + boardCheck[4] + boardCheck[7] == "ooo" || boardCheck[2] + boardCheck[5] + boardCheck[8] === "ooo") {
        showWinScreen();
      } else if(boardCheck[0] + boardCheck[3] + boardCheck[6] == "xxx" || boardCheck[1] + boardCheck[4] + boardCheck[7] == "xxx" || boardCheck[2] + boardCheck[5] + boardCheck[8] === "xxx") {
        showWinScreen();
        // Diagonal check
      } else if(boardCheck[0] + boardCheck[4] + boardCheck[8] == "ooo" || boardCheck[2] + boardCheck[4] + boardCheck[6] == "ooo") {
        showWinScreen();
      } else if(boardCheck[0] + boardCheck[4] + boardCheck[8] == "xxx" || boardCheck[2] + boardCheck[4] + boardCheck[6] == "xxx") {
        showWinScreen();
      } else if($(".box-filled-1").length + $(".box-filled-2").length === 9){
        $playerDrawPage.show();
        $playerDrawPage.addClass("screen-win-tie");
        $(".message").text("It's a draw");
        $(".board").hide();
      }
    };

    // When mouse over the box, change background according current player
    box.hover(
      // When mouse enter, display background-image
      function() {
        if(currentPlayer1() && boxAvailable($(this))) {
          $(this).css("background-image", "url(img/o.svg)");
        } else if(currentPlayer2() && boxAvailable($(this))) {
          $(this).css("background-image", "url(img/x.svg)");
        }
      },
      // When mouse leave, reset background
      function() {
        $(this).css("background", "");
      }
    );

    // When click the box, active current box per current player, check win condition and turn player
    box.click(
      function() {
        if( boxAvailable($(this))) {
          activateBox($(this));
          markUpBox();
          playerWinCondition();
          turnPlayer();
        }

      }
  );
  // When player enter game again, reset last data
  $(document).on("click", "#finish .button", function(e) {
    e.preventDefault();
    $playerWinPage.hide(); // when enter game again, hide the win page
    $playerDrawPage.hide(); // when enter game again, hide the draw page
    $(".board").show();
    box.removeClass("box-filled-1").removeClass("box-filled-2"); //when enter game again, remove all class of box
    $(".showName").text(inputName);
    player1.addClass("active"); // Add class and let player1 active at start
    player2.removeClass("active"); // Remove last added class for player2 when game over
    boardCheck = [0, 0, 0, 0, 0, 0, 0, 0, 0]; // when game over, reset this variable
  });
})(jQuery);
