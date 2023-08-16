class Clue {
  // the clueOccupyList = startX(n), startY(n), width, height]
  //this.location = [x, maxX, y, maxY]
  constructor(clueIdx, imageSource, clueOccupyList,tileSize, clueInfo, clueDetail, clueType) {
    this.clueIdx = clueIdx
    this.imageSource = imageSource
    this.clueOccupyList = clueOccupyList
    this.tileSize = tileSize
    this.clueInfo = clueInfo
    this.clueDetail = clueDetail
    this.ifCollide = false
    this.ifActivated = false
    this.isClue = clueType
    this.location = [clueOccupyList[0]*tileSize, clueOccupyList[0]*tileSize+clueOccupyList[2]*tileSize, clueOccupyList[1]*tileSize,  clueOccupyList[1]*tileSize+clueOccupyList[3]*tileSize]
  }


  showInfo(){
     if (key_list.indexOf(" ") !== -1) {
       
        if(this.isClue === "clue"){
      let info = document.getElementById("interaction")
    info.innerHTML = this.clueInfo + "<br>Do you want to keep it?"
      
    document.getElementById('yes').style.display="block"
	document.getElementById('no').style.display="block"
        let clue = document.getElementById("clue")
    clue.innerHTML = this.clueDetail
        }

         if(this.isClue === "plain"){
      let info = document.getElementById("interaction");
    info.innerHTML = this.clueInfo 
    console.log(this.clueInfo)
}

         if(this.isClue === "chest"){
      let info = document.getElementById("interaction");
    info.innerHTML = this.clueInfo + "<br> Do you want to open it?";
    console.log(this.clueInfo)
      
    document.getElementById('fake').style.display="block";
	document.getElementById('true').style.display="block";
         
         }

       if(this.isClue === "door"){
      let info = document.getElementById("interaction");
    info.innerHTML = this.clueInfo;
      
    document.getElementById('openIt').style.display="block";
         
         }
     
     }
  }


}