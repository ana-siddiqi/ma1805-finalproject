// Key stars, images, videos and overall layout. And the main backgrounds
let galaxy, moon;
let stars=[];

let galaxydevices;

let memories=[];
let currentMemory=null; // Tracks the memory that opens as a popup
let showSecondPage=false; // Switches between the main page and the second pop up page
let backgroundmusic;
//poems for memories

// Images of devices used in the memories & floating animations
let deviceImages=[];
let floatingDevices=[];
let deviceNames=["blackberry", "camcorder","iphone4","iphone5","iphone6","ipad"];

// Animation for the title on the Second page
let titleX, titleY, titleDX, titleDY;

let poems=[
"Pixel by Pixel, my childhood slowly rebuilt itself.",
"A bittersweet reuinion. Saved and cherished forever by my grandpa's camcorder.",
"Technology did not raise me, however it has never left my side",
"The stage felt ginormous, but the moment fit perfectly inside my mother's phone.",
"A small portrait of my loved ones, captured through my father's phone",
"Eight candles, one screen"
]; 


function preload(){
  // This loads the main background as well as the moon button
  galaxy=loadImage("images/galaxy.png");
  moon=loadImage("images/moon.gif");
  galaxydevices=loadImage("images/galaxydevices.jpg");

  // Load images for memories
  memories[0]=loadImage("images/memory1.jpg");
  memories[2]=loadImage("images/memory3.jpg");
  memories[4]=loadImage("images/memory5.jpg");

  // Marks them as images not videos
  memories[0].isVideo=false;
  memories[2].isVideo=false;
  memories[4].isVideo=false;

  // Background music of a choir performance I did when I was younger to give a nostalgic atmosphere
  backgroundmusic=loadSound("xmaschoir.mp3");

  // Loads the image of the devices used in the memories
  for(let name of deviceNames){
    deviceImages.push(loadImage("images/"+name+".png"));
   
  }
}

function setup(){
  createCanvas(windowWidth, windowHeight);

  // Loads videos for memories
  memories[1]= createVideo("images/memory2.mp4");
  memories[1].hide();
  memories[1].isVideo=true;

  memories[3]= createVideo("images/memory4.mp4");
  memories[3].hide();
  memories[3].isVideo=true;

  memories[5]= createVideo("images/memory6.mp4");
  memories[5].hide();
  memories[5].isVideo=true;

  // This sets the stars into a fixed position and it links them to the memories
  stars=[
    { x: 200, y:200, emoji:"⭐", memory: memories[0]},
    { x: width -200, y: 250, emoji:"⭐", memory: memories[1]},
    {x: 300, y: height-200, emoji:"⭐", memory:memories[2]},
    {x: width-300, y: height-250, emoji:"⭐", memory:memories[3]},
    {x: width/2-200, y: height/2, emoji:"⭐", memory:memories[4]},
    {x: width/2+200, y: height/2, emoji:"⭐", memory:memories[5]},


  ];


  // Create floating devices
  for(let i=0;i<deviceImages.length;i++){
    floatingDevices.push({
      x:random(150,width-150),
      y:random(250,height-200),
      dx:random(0.4, 0.6), // Moves horizontal 
      dy: random(0.4,0.6), //Moves vertical
      size:140
     })
  }
  // The starting position for the floating title
  titleX=width/2;
  titleY=140;

//The speed of the movement of the title
titleDX=0.8;
  titleDY=0.6;
}

function draw(){
  //If the page of the moon is open
  if(showSecondPage){
    drawSecondPage();
    return;
  }
  //Background
  image(galaxy, 0,0, width,height);

  //Title on the main page
  fill(255,244,140);
  textAlign(CENTER);
  textSize(50);
  textStyle(BOLDITALIC);
  text("A Consetallation of Technology",width/2,85);
  textStyle(NORMAL);

  //Draw the star emojis
  textSize(50);
  for(let s of stars){
    text(s.emoji, s.x, s.y);
  }
  //The moon button which opens up the second page
  image(moon,width-150,10,140,140);

  //If a star is opened, a popup of a memory is also opened
  if(currentMemory !==null){
    drawPopup();
  }
}

function mousePressed(){
  //The background music stars on the first click
  if(!backgroundmusic.isPlaying()){
    backgroundmusic.loop();
  }
  //When you click off the memory, the popup closes
  if(currentMemory!==null){
    if(currentMemory.isVideo)currentMemory.stop();
    currentMemory=null;
   return;
}
//Checks to see if a star was clicked
for(let i=0;i<stars.length;i++){
let s = stars[i];
  if (dist(mouseX, mouseY, s.x+10,s.y-10)<40){
    currentMemory=s.memory;
    currentMemory.poem=poems[i];

//Playback of the videos
    if(currentMemory.isVideo){
      backgroundmusic.pause(); //When a video is playing, the background music stops
      currentMemory.play();
      currentMemory.loop();
    }
    return;
  }
}

//When the moon is clicked it opens up the second page
if(
  mouseX>width-150 && mouseX<width-10 &&
  mouseY> 10 && mouseY<150
){
  showSecondPage=true;

 }
}

function drawPopup(){
  //A dark overlay behind the popup
  fill(0,200);
  rect(0,0,width,height);

  //Show the video or image
  if(currentMemory.isVideo){
    image(currentMemory, width/2-320, height/2-180,640, 360);

  }else{
    imageMode(CENTER);
    image(currentMemory,width/2,height/2,currentMemory.width*0.4,currentMemory.height*0.4);
    imageMode(CORNER);
  }
  //Mini poem underneath memory
  fill(255,244,140);
  textAlign(CENTER);
  textSize(26);
  textStyle(ITALIC);
  text(currentMemory.poem,width/2,height-100);
  textStyle(NORMAL);

  //Closing message
  fill(255);
  textSize(16);
  text("Click anywhere to close", width/2, height-40);
}
function drawSecondPage(){
  //Background image
  image(galaxydevices,0,0,width,height);
//Floating title
  titleX+=titleDX;
  titleY+=titleDY;
//Bounce the title off the edges of the screen to create a 0 gravity effect
  if(titleX>width-140||titleX<140)titleDX*=-1;
  if(titleY>height-140||titleY<140)titleDY*=-1;

  //Title
  fill(255,244,140);
  textAlign(CENTER);
  textSize(40);
  textStyle(BOLD);
  text("Celestial Devices", titleX, titleY);
  textStyle(NORMAL);

  //Closing message
  textSize(12);
  fill(240);
  text("Click anywhere to go back",width/2,height-40);
}
//When clicked the second page closes and goes back to the home page
function mouseReleased(){
  if(showSecondPage){showSecondPage=false;
}
}
function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}