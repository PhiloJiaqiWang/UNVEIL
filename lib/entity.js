class Entity {
  constructor(tileSet, size) {
    this.tileSet = tileSet
    this.position = {}
    this.spriteAnimations = new Map()
    this.currentAnimation = ''
    this.currentAnimationIdx = 0
    this.size = size
    this.ifBlock = false
    this.timeSinceLastFrame = 0
    this.clueList = []
    this.allClue = false
    this.trueClue = []
  }

  preload() {
    this.tileSet.preload()
    this.position = createVector(0, 0)
  }

  setPosition(point) {
    this.position.x = point.x
    this.position.y = point.y
  }

  setSize(size) {
    this.size = size
  }
  
  addAnimation(name, cycle, time) {
    this.spriteAnimations.set(name, {cycle, time})
  }

  setCurrentAnimation(name) {
    this.currentAnimation = name
  }

  get topLeft() {
    return {x: this.position.x, y: this.position.y}
  }

  get bottomRight() {
    return {x: this.position.x + this.size, y: this.position.y + this.size}
  }
  
  get bottomLeft() {
    return {x: this.position.x , y: this.position.y + this.size}
  }

  get topRight() {
    return {x: this.position.x + this.size, y: this.position.y}
  }

  pointIsIn(point) {
    const topLeft = this.topLeft
    const bottomRight = this.topRight
    return point.x > topLeft.x && point.y > topLeft.y && point.x < bottomRight.x && point.y < bottomRight.y
  }

  collidesWith(entity) {
    const corners = [this.topLeft, this.topRight, this.bottomLeft, this.bottomRight]
    for (let corner of corners)
      if (entity.pointIsIn(corner))
        return true
    return false
  }

  blockPointIn(tileX, tileY, tileMaxX, tileMaxY){
    const corners = [this.topLeft, this.topRight, this.bottomLeft, this.bottomRight]
    let ifBottomRight = (this.bottomRight.x >= tileX && this.bottomRight.x <= tileMaxX && this.bottomRight.y >= tileY && this.bottomRight.y <= tileMaxY)
    let ifBottomLeft = (this.bottomLeft.x >= tileX && this.bottomLeft.x <= tileMaxX && this.bottomLeft.y >= tileY && this.bottomLeft.y <= tileMaxY)
    let ifTopRight = (this.topRight.x >= tileX && this.topRight.x <= tileMaxX && this.topRight.y >= tileY && this.topRight.y <= tileMaxY)
    let ifTopLeft = (this.topLeft.x >= tileX && this.topLeft.x <= tileMaxX && this.topLeft.y >= tileY && this.topLeft.y <= tileMaxY)
    if(this.currentAnimation === "walkUp" || this.currentAnimation === "walkDown"){
      
      if(ifBottomRight || ifBottomLeft){
      return true
    }
    }

    if(this.currentAnimation === "walkRight"){
      if(ifBottomRight){
       return true
    }
    }

    if(this.currentAnimation === "walkLeft"){
      if(ifBottomLeft){
      return true
    }
    }
    return false
  }

  cluePointIn(tileX, tileY, tileMaxX, tileMaxY){
    const corners = [this.topLeft, this.topRight, this.bottomLeft, this.bottomRight]
    let ifBottomRight = (this.bottomRight.x >= tileX && this.bottomRight.x <= tileMaxX && this.bottomRight.y >= tileY && this.bottomRight.y <= tileMaxY)
    let ifBottomLeft = (this.bottomLeft.x >= tileX && this.bottomLeft.x <= tileMaxX && this.bottomLeft.y >= tileY && this.bottomLeft.y <= tileMaxY)
    let ifTopRight = (this.topRight.x >= tileX && this.topRight.x <= tileMaxX && this.topRight.y >= tileY && this.topRight.y <= tileMaxY)
    let ifTopLeft = (this.topLeft.x >= tileX && this.topLeft.x <= tileMaxX && this.topLeft.y >= tileY && this.topLeft.y <= tileMaxY)

      
      if(ifBottomRight || ifBottomLeft || ifTopRight || ifTopLeft){
      return true
    }
    
    return false
  }

  blockMove(blockList, tileSize){
    
   for (let i = 0, len = blockList.length; i < len; i++){
  
        let blockTemp = this.blockPointIn(blockList[i][0], blockList[i][1], blockList[i][0]+tileSize, blockList[i][1]+tileSize)
     if(blockTemp){
       this.ifBlock = true
       break
     }

    }
    
  }

  ifClue(clue){
    let tileX = clue.location[0]
    let tileMaxX = clue.location[1]
    let tileY = clue.location[2]
    let tileMaxY = clue.location[3]
    let clueTemp =this.cluePointIn(tileX, tileY, tileMaxX, tileMaxY)
    if(clueTemp){
      clue.showInfo()
    }
  }
  
  move(blockList, tileSize){
    this.blockMove(blockList, tileSize)
    if (keyIsPressed) {
       let info = document.getElementById("interaction");
    info.innerHTML ="You are walking...";
       let clue = document.getElementById("clue");
    clue.innerHTML ="";
      document.getElementById('yes').style.display="none";
	document.getElementById('no').style.display="none";
       document.getElementById('fake').style.display="none";
	document.getElementById('true').style.display="none";
      document.getElementById('throw').style.display="none";
      document.getElementById('openIt').style.display="none";
        if (key_list.indexOf("w") !== -1) {
          if(this.ifBlock && this.currentAnimation === "walkUp"){
            this.ifBlock = false
          }else{
          player.setCurrentAnimation('walkUp')
          this.position.y = this.position.y-5}
        } 
        if (key_list.indexOf("s") !== -1) {
           if(this.ifBlock && this.currentAnimation === "walkDown"){
            this.ifBlock = false
          }else{
          player.setCurrentAnimation('walkDown')
         this.position.y = this.position.y+5}
        }
      if (key_list.indexOf("a") !== -1) {
         if(this.ifBlock && this.currentAnimation === "walkLeft"){
            this.ifBlock = false
          }else{
        player.setCurrentAnimation('walkLeft')
         this.position.x = this.position.x-5}
        }
      if (key_list.indexOf("d") !== -1) {
        if(this.ifBlock && this.currentAnimation === "walkRight"){
            this.ifBlock = false
          }else{
        player.setCurrentAnimation('walkRight');
         this.position.x = this.position.x+5}
        }
      if (this.position.y < 0){
      this.position.y = 0
    }
      if (this.position.y > (height-50)){
      this.position.y = height-50
    }
      if (this.position.x < 0){
      this.position.x = 0
    }
      if (this.position.x > (width-this.size)){
      this.position.x = width-this.size
    }
     
    }}

  drawClues(){
    for (let i = 0, len = 4; i < len; i++) {
      let idName = "clue" + (i+1)
       let clue = document.getElementById(idName);
    clue.src = "";
     
    }
    for (let i = 0, len = this.clueList.length; i < len; i++) {
      let clueIndex = this.clueList[i].clueIdx
      let idName = "clue" + (i+1)
       let clue = document.getElementById(idName);
    clue.src = this.clueList[i].imageSource;
     
    }
}

arrayIsIn(arr1, arr2) {
        if (arr1.length > arr2.length) {
          return false;
        }
        for (var i = 0; i < arr1.length; i++) {
          if(!arr2.includes(arr1[i])){
            return false
          }
        }
        return true;
      }

  ifAllCuleHasFound(){
    this.ifAllClue = this.arrayIsIn(this.trueClue, this.clueList)
  }
  
  draw() {
    const currentAnimationList = this.spriteAnimations.get(this.currentAnimation).cycle
    const currentSprite = currentAnimationList[this.currentAnimationIdx]
    if (this.timeSinceLastFrame <= 0) {
      this.timeSinceLastFrame = this.spriteAnimations.get(this.currentAnimation).time
      this.currentAnimationIdx = (this.currentAnimationIdx + 1) % currentAnimationList.length
    }
    this.tileSet.drawTile(currentSprite, this.position.x, this.position.y, this.size)
    this.timeSinceLastFrame--
    this.drawClues()
  }
}