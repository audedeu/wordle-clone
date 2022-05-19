"use strict";
var lettersPattern = /[a-z]/,
  currentGuessCount = 1,
  currentGuess = document.querySelector("#guess" + currentGuessCount),
  words = ["soupe", "sauce", "velos", "moule", "bande", "astre", "accra"],
  solutionWord = "",
  chooseWord = function () {
    var e = Math.floor(Math.random() * (words.length - 1)) + 1;
    solutionWord = words[e];
  };
chooseWord(),
  document.addEventListener("keydown", function (e) {
    var t = e.key;
    currentGuessCount < 7 &&
      (1 == t.length &&
      lettersPattern.test(e.key) &&
      currentGuess.dataset.letters.length < 5
        ? updateLetters(t)
        : "Backspace" == e.key && "" != currentGuess.dataset.letters
        ? deleteFromLetters()
        : "Enter" == e.key &&
          5 == currentGuess.dataset.letters.length &&
          submitGuess());
  });
var submitGuess = function () {
    for (
      var e = function (e) {
          setTimeout(function () {
            revealTile(e, checkLetter(e));
          }, 200 * e);
        },
        t = 0;
      t < 5;
      t++
    )
      e(t);
  },
  checkIfGuessComplete = function (e) {
    4 == e && checkWin();
  },
  jumpTiles = function () {
    for (
      var e = function (e) {
          setTimeout(function () {
            document
              .querySelector("#guess" + currentGuessCount + "Tile" + (e + 1))
              .classList.add("jump");
          }, 200 * e);
        },
        t = 0;
      t < 5;
      t++
    )
      e(t);
  },
  checkWin = function () {
    solutionWord == currentGuess.dataset.letters
      ? setTimeout(function () {
          jumpTiles();
        }, 500)
      : ((currentGuessCount += 1),
        (currentGuess = document.querySelector("#guess" + currentGuessCount)),
        7 == currentGuessCount &&
          setTimeout(function () {
            showSolution();
          }, 500));
  },
  showSolution = function () {
    alert("Better luck next time. The solution was: " + solutionWord);
  },
  updateLetters = function (e) {
    var t = currentGuess.dataset.letters + e,
      s = t.length;
    (currentGuess.dataset.letters = t), updateTiles(s, e);
  },
  updateTiles = function (e, t) {
    var s = document.querySelector("#guess" + currentGuessCount + "Tile" + e);
    (s.innerText = t), s.classList.add("has-letter");
  },
  deleteFromLetters = function () {
    var e = currentGuess.dataset.letters,
      t = e.slice(0, -1);
    (currentGuess.dataset.letters = t), deleteFromTiles(e.length);
  },
  deleteFromTiles = function (e) {
    var t = document.querySelector("#guess" + currentGuessCount + "Tile" + e);
    (t.innerText = ""), t.classList.remove("has-letter");
  },
  checkLetter = function (e) {
    var t = currentGuess.dataset.letters.charAt(e);
    return t == solutionWord.charAt(e)
      ? "correct"
      : checkLetterExists(t)
      ? "present"
      : "absent";
  },
  checkLetterExists = function (e) {
    return solutionWord.includes(e);
  },
  revealTile = function (e, t) {
    flipTile(e + 1, t), checkIfGuessComplete(e);
  },
  flipTile = function (e, t) {
    var s = document.querySelector("#guess" + currentGuessCount + "Tile" + e);
    s.classList.add("flip-in"),
      setTimeout(function () {
        s.classList.add(t);
      }, 250),
      setTimeout(function () {
        s.classList.remove("flip-in"), s.classList.add("flip-out");
      }, 250),
      setTimeout(function () {
        s.classList.remove("flip-out");
      }, 1500);
  };
