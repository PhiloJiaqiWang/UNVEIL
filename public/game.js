var urlParams = new URLSearchParams(window.location.search);
var name = urlParams.get('name');

let tileMap = new Tileset("./assets/map.png", 17, 57, 31, 50, 1)

let playerTileset = new Tileset("./assets/little_boy.png", 16, 3, 4, 45, 0)


var player = new Entity(playerTileset, 45)


var level = 0

var detail = ""

var ifNew = 1

var index = ""

var state = "solving"

var clueList = []

let key_list = []

let levels = []

var hint = "(Try walking around.)"


let levelLis = []

var cnv

var events = ""


function preload() {
  tileMap.preload()
  player.preload()
  loadAllLevel(23)
  glass = loadImage('./assets/magnifying-glass.png');
}

function loadAllLevel(a) {
  for (let i = 0, len = a; i < len; i++) {
    le = loadJSON("./assets/level" + i + ".json")
    levels.push(le)
  }
}


function setup() {
  record()
  ifNew = 0
  clueList = clueListGenerate(level)
  player.drawBackpack()
  player.hint = hint
  let cnv = createCanvas(500, 500);
  cnv.parent('myCanvas');
  noSmooth()
  player.addAnimation('walkLeft', [9, 10, 11, 10], 10)
  player.addAnimation('walkUp', [0, 1, 2, 1], 10)
  player.addAnimation('walkDown', [6, 7, 8, 7], 10)
  player.addAnimation('walkRight', [3, 4, 5, 4], 10)
  player.setCurrentAnimation('walkDown')
  player.setPosition({ x: 50, y: 350 })
  player.speed = 5
  // frameRate(60)
}

function drawMap(level) {
  let map = levels[level]["mapLis"]
  for (let i = 0, len = map["basic"].length; i < len; i++) {
    tileMap.drawMap(map["basic"][i], false) // the wall and the floor
  }
  tileMap.blockList = []
  tileMap.drawMap(map[state], true)
  for (let i = 0, len = map["basic2"].length; i < len; i++) {
    tileMap.drawMap(map["basic2"][i], false) // the wall and the floor
  }
  player.move(tileMap.blockList, tileMap.tileSize)
  player.hint = levels[level]["hint"]

}

function draw() {
  background(0)
  drawMap(level)
  for (let i = 0, len = clueList.length; i < len; i++) {
    let ifCheck = player.ifClue(clueList[i])
    if(ifCheck){
      events = "checkClue"
      detail = ifCheck[1]
      index = ifCheck[0]
      record()
      detail = ""
      index = ""
    }
  }
  player.draw()
  // logAction(player.position)
  // console.log(actionLog)
}

//clues
function clueListGenerate(level) {
  player.trueClue = []
  let clueList = []
  let clues = levels[level]["clueList"]
  for (let i = 0, len = clues.length; i < len; i++) {
    let thisClue = new Clue(clues[i]["clueIdx"], clues[i]["imageSource"], clues[i]["clueOccupyList"], tileMap.tileSize, clues[i]["clueInfo"], clues[i]["clueDetail"], clues[i]["clueType"])
    clueList.push(thisClue)
    if (clues[i]["ifTrue"] == 1) {
      player.trueClue.push(thisClue)
    }
  }
  return clueList
}

function getSpecial(type) {
  let key = null
  for (let i = 0, len = clueList.length; i < len; i++) {
    if (clueList[i]["clueType"] == type) {
      key = clueList[i]
    }
  }
  return key
}

function keyPressed() {
  console.log('pressing')
  key_list.push(key)
  events = "keyPressed"
  record()
}

function keyReleased() {
  key_list.splice(key_list.indexOf(key), 1)
}

function showClue(a) {
  events = "showClue"
  record()
  let idx = a.slice(-1) - 1
  let thisClue = player.clueList[idx].clueDetail
  let clue = document.getElementById("clue")
  clue.innerHTML = thisClue
  let info = document.getElementById("interaction");
  info.innerHTML = "Do you want to throw this out of your backpack?";
  document.getElementById('throw').style.display = "block";
  document.getElementById('yes').style.display = "none";
  document.getElementById('no').style.display = "none";
}

function throwItOut() {
  events = "throwClue"
  record()
  let source = document.getElementById("clue").innerHTML
  let info = document.getElementById("interaction")
  info.innerHTML = ""

  document.getElementById('throw').style.display = "none"
  for (let i = 0, len = player.clueList.length; i < len; i++) {
    if (player.clueList[i].clueDetail === source) {
      console.log(player.clueList[i])
      if (player.clueList[i].clueType === "key") {
        clue.innerHTML = "It may not be a good idea to throw it out."
      } else {
        player.clueList.splice(i, 1)
        let clue = document.getElementById("clue")
        clue.innerHTML = ""
      }
    }
  }

}

function keepIt(a) {

  if (a === "yes") {
    events = "keepIt"
    record()
    if (player.clueList.length === player.backpack) {
      let info = document.getElementById("interaction");
      info.innerHTML = "Your backpack is full. You may consider dropping something to make room for this item.";
    } else {
      let info = document.getElementById("interaction");
      info.innerHTML = "";
      let source = document.getElementById("clue").innerHTML;
      for (let i = 0, len = clueList.length; i < len; i++) {
        if (clueList[i].clueDetail === source) {
          if (player.clueList.indexOf(clueList[i]) === -1) {
            player.clueList.push(clueList[i])
          }
        }
      }

    }
  } else {
    let info = document.getElementById("interaction");
    info.innerHTML = "";
  }
  document.getElementById('yes').style.display = "none";
  document.getElementById('no').style.display = "none";
}


document.addEventListener("keydown", function(event) {
  // Check if the pressed key is the spacebar (key code 32)
  if (event.keyCode === 32) {
    // Prevent the default behavior (scrolling)
    event.preventDefault();
  }
});

function database(a){
  let clue = document.getElementById("clue")
  clue.innerHTML = a
}

function dialogue(a, button_num){
  let clue = document.getElementById("clue")
  clue.innerHTML = a
  let next = document.getElementById("dialogue"+button_num)
  console.log(next)
  if(next){
  next.style.display = "block";}
}

// The way to go to next level
function enterIt() {
  document.getElementById('enter').style.display = "none";
  this.goIntoNext()
}

function chestQ(a) {
  events = "Chest"
  record()
  let info = document.getElementById("interaction");
  info.innerHTML = "";
  document.getElementById('A').style.display = "none";
  document.getElementById('B').style.display = "none";
  document.getElementById('C').style.display = "none";
  let clue = document.getElementById("clue")
  player.ifAllCuleHasFound()
  if (a === levels[level]["key"]["True"] && player.ifAllClue) {
    clue.innerHTML = levels[level]["key"]["Right"]
    if (level == 0) {
      player.speed = player.speed + 2
      // player.backpack = player.backpack + 2
      // player.drawBackpack()
      // console.log(player.backpack)
    }
    if (levels[level]["key"]["Type"] == "key") {
      let key = getSpecial("key")
      player.clueList = [key]
      state = "unlocked"
    } else {
      this.goIntoNext()
    }
  } else {
    clue.innerHTML = levels[level]["key"]["Wrong"]
  }
}

function goIntoNext() {
  events = "nextLevel"
  record()
  level = level + 1
  clueList = clueListGenerate(level)
  state = "solving"
  tileMap.blockList = []
  player.clueList = []
  if (levels[level]["position"]) {
    player.setPosition(levels[level]["position"])
  }
  let info = document.getElementById("interaction");
  info.innerHTML = "";
  tileMap.generateBlockList()
}

function openIt() {
  let info = document.getElementById("interaction");
  info.innerHTML = "";
  document.getElementById('openIt').style.display = "none";
  let clue = document.getElementById("clue")
  clue.innerHTML = "You can't open it at this point."
  for (let i = 0, len = player.clueList.length; i < len; i++) {
    if (player.clueList[i].clueType === "key") {
      clue.innerHTML = "Congratulations!";
      state = "solved"
      document.getElementById('enter').style.display = "block";
    }
  }
}

function unlockHallway(){
  let hallway = getSpecial("hallway")
  hallway.clueType = "opendoor"

}

function password(){
  let password = document.getElementById("pass").value
  events = "enterPassword"
  detail = password
  record()
  player.ifAllCuleHasFound()
  if (password === levels[level]["password"] && player.ifAllClue) {
    events = "chestUnlocked"
    record()
    let key = getSpecial("key")
    player.clueList = [key]
    state = "unlocked"
    unlockHallway()
    
  }else{
    let clue = document.getElementById("clue")
    clue.innerHTML = "Nothing happened. Your password is wrong or you didn't bring the right thing with you."
  }
}

function clearAll(){
  console.log("ha")
  let info = document.getElementById("interaction");
  info.innerHTML = "";
  let clue = document.getElementById("clue");
  clue.innerHTML = "";
  player.hint = "I saw the villagers went back to their houses."
  hintnum = hintnum + 1
}

function record(){
  var $name = name;
	var $x = player.position.x;
	var $y = player.position.y;
  var $time = new Date().getTime();
  var $events = events;
  var $detail = detail;
  var $index= index;
  var $level = level;
  var $ifNew = ifNew;
	var xhr = new XMLHttpRequest();
xhr.open("get", `/pro/v1?name=${$name}&x=${$x}&y=${$y}&time=${$time}&events=${$events}&detail=${$detail}&index=${$index}&level=${$level}&ifNew=${$ifNew}`, true);
xhr.send();
}
