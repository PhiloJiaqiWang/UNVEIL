let tileMap = new Tileset("./assets/map.png", 17, 57, 31, 50,1)

let playerTileset = new Tileset("./assets/little_boy.png", 16, 3, 4, 45, 0)

var player = new Entity(playerTileset, 45)

let clue1 = new Clue(1, ".images/chest.png", [6, 8, 1, 1], tileMap.tileSize, "On the chest is the assertion that a forest fire broke out in countryA last Friday. If you can correctly determine the truth of this statement, you may be able to open this treasure chest! ", "", "chest")

let clue2 = new Clue(2, "./images/lostBook.png", [7, 2, 1, 1], tileMap.tileSize, "You found a clue in the books!!!", "Quality news won’t come to you — you have to actively seek it out. Diversifying keeps us out of our bubbles and exposes us to other sources of information. Spotting differences in stories — an important news literacy skill — can inform or raise questions in our minds.", "clue")

let clue3 = new Clue(3, "./images/scroll2.png", [4, 4, 1, 1], tileMap.tileSize, "You found a clue under the chair!!!", "News satire is a type of parody presented in a format typical of mainstream journalism, and called a satire because of its content.", "clue")

var clue4 = new Clue(4, "./images/rustyKey.png", [-1, -1, -1, -1], tileMap.tileSize, "You found a key in the chest!!!", "What the key is for?", "key")

var clue5 = new Clue(5, "", [5, 2, 1, 1], tileMap.tileSize, "The door is locked. Try to open it?", "", "door")

let clue6 = new Clue(6, "./images/secretNote.png", [1, 2, 1, 1], tileMap.tileSize, "Something is burning. You saved a piece of paper from the ashes.", "Sometimes the correct answer cannot solely open the chest. You need to have all the linked evidence fixed in the chest boxes. So make sure all the evidence is in your backpack!", "clue")

let clue7 = new Clue(7, "./images/scroll1.png", [3, 2, 1, 1], tileMap.tileSize, "There is a screeshot behind the shelf.", "The website's name is OBSERVAR, and the content talks about a forest fire broke out in countryA last Friday.", "clue")

let clue8 = new Clue(8, "./images/scroll1.png", [1, 8, 1, 1], tileMap.tileSize, "There is a screeshot under the pillow.", "The website's name is OBSERVER, and the content talks about a forest fire broke out in countryA last Tuesday.", "clue")

let clue9 = new Clue(9, "./images/secretNote.png", [6, 6, 1, 1], tileMap.tileSize, "You found a note under the carpet!!!", "Kovach and Rosenstiel spell out in their followup book, Blur: How to Know What’s True in the Age of Information Overload, explain two approaches to reporting: the journalism of verification and the journalism of assertion.", "clue")


player.trueClue = [clue2, clue3, clue7, clue8]

console.log(clue1.location)
var clueList = []

clueList.push(clue1)
clueList.push(clue2)
clueList.push(clue3)
clueList.push(clue4)
clueList.push(clue5)
clueList.push(clue6)
clueList.push(clue7)
clueList.push(clue8)
clueList.push(clue9)

var state = "solving"


let key_list = []

function preload() {
  tileMap.preload()
  player.preload()
}

function setup() {
  let cnv = createCanvas(500, 500);
 cnv.parent('myCanvas');
  noSmooth()
  player.addAnimation('walkLeft', [9,10,11,10], 10)
  player.addAnimation('walkUp', [0,1,2,1], 10)
  player.addAnimation('walkDown', [6,7,8,7], 10)
  player.addAnimation('walkRight', [3,4,5,4], 10)
  player.setCurrentAnimation('walkDown')
  player.setPosition({x: 100, y: 350})
  frameRate(60)
}

function draw() {
  background(0)
  tileMap.drawMap([
    [714,712,712,712,712,712,712,712,715],
   [770,887,887,887,887,887,887,887,887,770],
    [770,887,887,887,887,887,887,887,887,770],
    [770,119,119,119,119,119,119,119,119,770],     
    [770,119,119,119,119,119,119,119,119,770],
     [770,119,119,119,119,119,119,119,119,770],
     [770,119,119,119,119,119,119,119,119,770],
   
    [770,119,119,119,119,119,119,119,119,770],
    [770,119,119,119,119,119,119,119,119,770],[771,712,712,712,712,712,712,712,712,772]
  ], false)
  tileMap.drawMap([
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,751,752,752,753,-1,-1,-1],
    [-1,-1,-1,808,809,809,810,-1,-1,-1],
    [-1,-1,-1,865,866,866,867,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
   [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],
    [-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]
  ], false)
  if(state === "solving"){
  tileMap.drawMap([
    [714,712,712,712,712,712,712,712,712,715],
   [770,887,887,887,165,166,166,167,887,770],
    [770,13,887,357,359,429,430,842,422,770],
    [770,-1,-1,-1,-1,-1,-1,-1,-1,770], 
    [770,-1,-1,-1,133,133,-1,-1,-1,770],
     [770,-1,-1,135,361,362,136,-1,-1,770],
     [770,-1,-1,-1,134,134,-1,-1,-1,770],
    [770,-1,-1,-1,-1,-1,-1,-1,-1,770],
    [770,128,-1,-1,-1,-1,608,-1,-1,770],[771,712,712,712,712,712,712,712,712,772]
  ], true)}else if(state === "solved"){
    tileMap.drawMap([
    [714,712,712,712,712,712,712,712,712,715],
   [770,887,887,887,165,166,166,167,887,770],
    [770,13,887,357,359,486,487,842,422,770],
    [770,-1,-1,-1,-1,-1,-1,-1,-1,770], 
    [770,-1,-1,-1,133,133,-1,-1,-1,770],
     [770,-1,-1,135,361,362,136,-1,-1,770],
     [770,-1,-1,-1,134,134,-1,-1,-1,770],
    [770,-1,-1,-1,-1,-1,-1,-1,-1,770],
    [770,128,-1,-1,-1,-1,665,-1,-1,770],[771,712,712,712,712,712,712,712,712,772]
  ], true)
  }else if(state === "unlocked"){
    tileMap.drawMap([
    [714,712,712,712,712,712,712,712,712,715],
   [770,887,887,887,165,166,166,167,887,770],
    [770,13,887,357,359,429,430,842,422,770],
    [770,-1,-1,-1,-1,-1,-1,-1,-1,770], 
    [770,-1,-1,-1,133,133,-1,-1,-1,770],
     [770,-1,-1,135,361,362,136,-1,-1,770],
     [770,-1,-1,-1,134,134,-1,-1,-1,770],
    [770,-1,-1,-1,-1,-1,-1,-1,-1,770],
    [770,128,-1,-1,-1,-1,665,-1,-1,770],[771,712,712,712,712,712,712,712,712,772]
  ], true)
  }
  player.move(tileMap.blockList, tileMap.tileSize)
  player.ifClue(clue1)
  player.ifClue(clue2)
  player.ifClue(clue3)
  player.ifClue(clue4)
  player.ifClue(clue5)
  player.ifClue(clue6)
  player.ifClue(clue7)
  player.ifClue(clue8)
  player.ifClue(clue9)
  player.draw()

}

function keyPressed() {
  console.log('pressing')
  key_list.push(key)
}

function keyReleased() {
  key_list.splice(key_list.indexOf(key), 1)
}

function showClue(a){
  let idx = a.slice(-1)-1
  let thisClue = player.clueList[idx].clueDetail
  let clue = document.getElementById("clue")
    clue.innerHTML = thisClue
  let info = document.getElementById("interaction");
    info.innerHTML ="Do you want to throw this out of your backpack?";
   document.getElementById('throw').style.display="block";
  
}

function throwItOut(){
  let source = document.getElementById("clue").innerHTML
  let info = document.getElementById("interaction")
    info.innerHTML =""
      
      document.getElementById('throw').style.display="none"
    for (let i = 0, len = player.clueList.length; i < len; i++){
      if(player.clueList[i].clueDetail === source){
        if(player.clueList[i].isClue === "key"){
          clue.innerHTML ="It may not be a good idea to throw it out."
        }else{
          console.log(clueList[i].clueIdx)
        player.clueList.splice(i,1)
           let clue = document.getElementById("clue")
    clue.innerHTML =""
        }
      }
    }
   
}

function keepIt(a){
  if(a === "yes"){
    if(player.clueList.length === 4){
          let info = document.getElementById("interaction");
    info.innerHTML ="Your backpack is full.";
        }else{
       let info = document.getElementById("interaction");
    info.innerHTML ="";
    let source = document.getElementById("clue").innerHTML;
    for (let i = 0, len = clueList.length; i < len; i++){
      if(clueList[i].clueDetail === source){
        if(player.clueList.indexOf(clueList[i]) === -1){
        player.clueList.push(clueList[i])}
      }
    }
    
    }
  }else{
  let info = document.getElementById("interaction");
    info.innerHTML ="";
   }
  let info = document.getElementById("interaction");
    info.innerHTML ="";
       let clue = document.getElementById("clue");
    clue.innerHTML ="";
      document.getElementById('yes').style.display="none";
	document.getElementById('no').style.display="none";
}

function chestQ(a){
  let info = document.getElementById("interaction");
    info.innerHTML ="";
   document.getElementById('fake').style.display="none";
	document.getElementById('true').style.display="none";
   let clue = document.getElementById("clue")
  player.ifAllCuleHasFound()
  console.log(player.ifAllClue)
  if(a === "fake" && player.ifAllClue){
    clue.innerHTML ="That's right! You opend the chest. And you got a key."
    player.clueList = [clue4]
    state = "unlocked"
  }else{
    clue.innerHTML ="Nothing happens! Maybe the anwer is wrong or maybe there is other thing I didn't do..."
  }
}

function openIt(){
  let info = document.getElementById("interaction");
    info.innerHTML ="";
   document.getElementById('openIt').style.display="none";
   let clue = document.getElementById("clue")
  clue.innerHTML = "The door is locked. You can't open it without a key."
  for (let i = 0, len = player.clueList.length; i < len; i++){
      if(player.clueList[i].isClue === "key"){
        clue.innerHTML = "Congratulations! The door is open now!";
        state = "solved"
      }
    }
}