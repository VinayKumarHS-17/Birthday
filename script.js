"use strict";

/* ==========================================================
   ULTIMATE BIRTHDAY SURPRISE
   SCRIPT.JS
   PART 1
========================================================== */

/* ==========================================================
   DOM ELEMENTS
========================================================== */

const screens = [...document.querySelectorAll(".screen")];

const progressBar =
document.getElementById("progressBar");

let currentScreen = 0;

/* ==========================================================
   AUDIO
========================================================== */

const sounds = {

    background:
    document.getElementById("backgroundMusic"),

    birthday:
    document.getElementById("birthdaySong"),

    click:
    document.getElementById("buttonClickSound"),

    catch:
    document.getElementById("catchSound"),

    balloon:
    document.getElementById("balloonPopSound"),

    cake:
    document.getElementById("cakeCutSound"),

    sparkle:
    document.getElementById("sparkleSound"),

    confetti:
    document.getElementById("confettiSound"),

    firework:
    document.getElementById("fireworkSound"),

    success:
    document.getElementById("successSound")

};

/* ==========================================================
   GAME STATUS
========================================================== */

const game = {

    foodFinished:false,

    balloonFinished:false,

    candleFinished:false,

    cakeFinished:false,

    memoryIndex:0,

    loveIndex:0,

    sparkCount:0

};

/* ==========================================================
   INITIALIZE
========================================================== */

document.addEventListener(

    "DOMContentLoaded",

    initializeApp

);

/* ==========================================================
   APP
========================================================== */

function initializeApp(){

    setupScreens();

    setupButtons();

    updateProgress();

    loadingScreen();

    enableMusic();

}

/* ==========================================================
   LOADING
========================================================== */

function loadingScreen(){

    setTimeout(()=>{

        goToScreen(1);

    },5000);

}

/* ==========================================================
   SCREEN SETUP
========================================================== */

function setupScreens(){

    screens.forEach(screen=>{

        screen.classList.remove("active");

    });

    screens[0].classList.add("active");

}

/* ==========================================================
   CHANGE SCREEN
========================================================== */

function goToScreen(index){

    if(index < 0) return;

    if(index >= screens.length) return;

    screens.forEach(screen=>{

        screen.classList.remove("active");

    });

    currentScreen = index;
    // Resume background music after leaving microphone screen
   if (
       index !== 4 &&
       sounds.background &&
       sounds.background.paused
   ) {
       sounds.background.play().catch(() => {});
   }

    screens[index].classList.add("active");

    updateProgress();

    playSound("click");

    screenEvents(index);

    // Start countdown ONLY when Wish screen opens
    if(screens[index].id === "screen-wish"){

        startWishCountdown();

    }


}

/* ==========================================================
   NEXT
========================================================== */

function nextScreen(){

    goToScreen(currentScreen+1);

}

/* ==========================================================
   PREVIOUS
========================================================== */

function previousScreen(){

    goToScreen(currentScreen-1);

}

/* ==========================================================
   PROGRESS
========================================================== */

function updateProgress(){

    if(!progressBar) return;

    const percent=

    ((currentScreen+1)/screens.length)*100;

    progressBar.style.width=

    percent+"%";

}


/* ==========================================================
   BUTTONS
========================================================== */

function setupButtons(){

    bindButton("welcomeBtn",nextScreen);

    bindButton("foodNextBtn",nextScreen);

    bindButton("balloonNextBtn",nextScreen);

    bindButton("candleNextBtn",nextScreen);

    bindButton("cakeNextBtn",nextScreen);

    bindButton("roseNextBtn",nextScreen);

    bindButton("loveNextBtn",nextScreen);

    bindButton("memoryNextBtn",nextScreen);

    bindButton("letterNextBtn",nextScreen);

    bindButton("giftNextBtn",nextScreen);

    bindButton("wishNextBtn",nextScreen);

    bindButton("sparklerNextBtn",nextScreen);


    bindButton("foodBackBtn", previousScreen);

    bindButton("balloonBackBtn", previousScreen);

    bindButton("candleBackBtn", previousScreen);

    bindButton("cakeBackBtn", previousScreen);

    bindButton("roseBackBtn", previousScreen);

    bindButton("loveBackBtn", previousScreen);

    bindButton("memoryBackBtn", previousScreen);

    bindButton("letterBackBtn", previousScreen);

    bindButton("giftBackBtn", previousScreen);

    bindButton("wishBackBtn", previousScreen);

    bindButton("sparklerBackBtn", previousScreen);


    bindButton("restartBtn",()=>{

        location.reload();

    });

    setupGiftBox();

    setupMemoryButtons();

    setupMusicButton();

}

/* ==========================================================
   BUTTON HELPER
========================================================== */

function bindButton(id,callback){

    const btn=document.getElementById(id);

    if(!btn) return;

    btn.addEventListener("click",()=>{

        playSound("click");

        callback();

    });

}

/* ==========================================================
   AUDIO
========================================================== */

function playSound(name){

    const audio=sounds[name];

    if(!audio) return;

    audio.pause();

    audio.currentTime=0;

    audio.play().catch(()=>{});

}

/* ==========================================================
   BACKGROUND MUSIC
========================================================== */

function setupMusicButton() {
    const btn = document.getElementById("musicToggle");
    const audio = document.getElementById("backgroundMusic"); // 🔥 fix

    if (!btn || !audio) return;

    audio.loop = true;
    audio.volume = 0.4;

    let playing = false;
    let unlocked = false;

    btn.innerHTML = "🔇";

    btn.addEventListener("click", async (e) => {
        e.stopPropagation();

        try {
            if (!unlocked) {
                unlocked = true;
                await audio.play();
                playing = true;
                btn.innerHTML = "🎵";
                return;
            }

            if (audio.paused) {
                await audio.play();
                playing = true;
                btn.innerHTML = "🎵";
            } else {
                audio.pause();
                playing = false;
                btn.innerHTML = "🔇";
            }
        } catch (err) {
            console.log("play blocked:", err);
        }
    });
}


/* ==========================================================
   SCREEN EVENTS
========================================================== */

function screenEvents(index){

    switch(index){

        case 2:

            startFoodGame();

            break;

        case 3:

            startBalloonGame();

            break;

        case 4:
            // Pause background music for microphone
             if (sounds.background && !sounds.background.paused) {
                 sounds.background.pause();
             }
            initializeMicrophone();

            break;

        case 5:

            startCakeGame();

            break;

        case 6:
            startRosePetals();      // ADD
            break;

        case 7:

            startLoveMessages();
            startFloatingHearts(); 

            break;

        case 8:

            startMemoryGallery();

            break;


        case 10:

            startWishCountdown();

            break;

        case 11:

            startSparkler();

            break;

        case 12:

            startFireworks();
           // Stop background music
             if (sounds.background) {
                 sounds.background.pause();
                 sounds.background.currentTime = 0;
             }
         
             // Play birthday song
             if (sounds.birthday) {
                 sounds.birthday.currentTime = 0;
                 sounds.birthday.play().catch(() => {});
             }
            startFireworks();
            startFinalCelebration(); // ADD
            
            break;

    }

}

/* ==========================================================
   LOVE MESSAGES
========================================================== */

function startLoveMessages(){

    const messages=[

        ...document.querySelectorAll(".loveMessage")

    ];

    if(!messages.length) return;

    messages.forEach(m=>m.classList.remove("active"));

    game.loveIndex=0;

    messages[0].classList.add("active");

    clearInterval(window.loveInterval);

    window.loveInterval=setInterval(()=>{

        messages[game.loveIndex].classList.remove("active");

        game.loveIndex++;

        if(game.loveIndex>=messages.length){

            game.loveIndex=0;

        }

        messages[game.loveIndex].classList.add("active");

    },2200);

}

/* ==========================================================
   MEMORY BUTTONS
========================================================== */

function setupMemoryButtons(){

    const images=[

        ...document.querySelectorAll("#memoryGallery img")

    ];

    if(!images.length) return;

    const prev=document.getElementById("prevMemoryBtn");

    const next=document.getElementById("nextMemoryBtn");

    images.forEach((img,i)=>{

        if(i!==0){

            img.style.display="none";

        }

    });

    if(prev){

        prev.addEventListener("click",()=>{

            images[game.memoryIndex].style.display="none";

            game.memoryIndex--;

            if(game.memoryIndex<0){

                game.memoryIndex=images.length-1;

            }

            images[game.memoryIndex].style.display="block";

        });

    }

    if(next){

        next.addEventListener("click",()=>{

            images[game.memoryIndex].style.display="none";

            game.memoryIndex++;

            if(game.memoryIndex>=images.length){

                game.memoryIndex=0;

            }

            images[game.memoryIndex].style.display="block";

        });

    }

}


/* ==========================================================
   GIFT BOX
========================================================== */

function setupGiftBox(){

    const gift=document.getElementById("giftBox");

    if(!gift) return;

    gift.onclick=function(){

        if(gift.classList.contains("open"))
            return;

        gift.classList.add("open");

        playSound("success");

        const msg=document.getElementById("giftMessage");

        msg.innerHTML=`
        🎉 Happy Birthday ❤️<br>
        Wishing you endless happiness,<br>
        love and lots of smiles 💖
        `;

        createGiftSparkles();

    };

}


function createGiftSparkles(){

    const container = document.getElementById("giftSparkles");

    if(!container) return;

    // Prevent creating duplicates
    if(container.children.length > 0) return;

    const emojis = ["✨","⭐","💖","🎉","🌟","💝","🎈"];

    for(let i=0;i<60;i++){

        const s = document.createElement("div");

        s.className = "giftSparkle";

        s.innerHTML = emojis[Math.floor(Math.random()*emojis.length)];

        s.style.left = Math.random()*100 + "%";

        s.style.top = (70 + Math.random()*30) + "%";

        s.style.fontSize = (18 + Math.random()*28) + "px";

        s.style.animationDuration = (4 + Math.random()*4) + "s";

        s.style.animationDelay = (Math.random()*4) + "s";

        container.appendChild(s);

    }

}



/* ==========================================================
   WISH COUNTDOWN
========================================================== */

let wishTimer;

function startWishCountdown(){

    clearInterval(wishTimer);

    const countdown = document.getElementById("wishCountdown");

    if(!countdown) return;

    // Reset UI
    document.getElementById("wishStars").innerHTML = "";
    document.getElementById("wishNextBtn").style.display = "none";

    let count = 10;

    countdown.style.display = "block";
    countdown.innerHTML = count;

    wishTimer = setInterval(()=>{

        count--;

        if(count > 0){

            countdown.innerHTML = count;

        }
        else{

            clearInterval(wishTimer);

            countdown.style.display = "none";

            showWishCelebration();

            playSound("success");

            document.getElementById("wishNextBtn").style.display = "inline-block";

        }

    },1300);

}



function showWishCelebration(){

    const container = document.getElementById("wishStars");

    container.innerHTML = "";

    const emojis = [
        "✨","⭐","🌟","💖","❤️","💕", "💝","🎉","🎊","🎈","🥳"
    ];

    // Create lots of floating emojis
    for(let i=0;i<120;i++){

        const e = document.createElement("div");

        e.className = "wishEmoji";

        e.innerHTML = emojis[Math.floor(Math.random()*emojis.length)];

        e.style.left = Math.random()*100 + "%";

        e.style.top = (70 + Math.random()*30) + "%";

        e.style.fontSize = (20 + Math.random()*35) + "px";

        e.style.animationDuration = (4 + Math.random()*5) + "s";

        e.style.animationDelay = (Math.random()*2) + "s";

        container.appendChild(e);

    }

    
    // Beautiful responsive message
    const message = document.createElement("div");

    message.id = "wishFinalMessage";

    message.innerHTML = `
        <div class="wishMessageBox">

            <div class="wishTitle">
                ✨ Your Dreams Will Come True ✨
            </div>

            <div class="wishLine">
                💖 Believe in Yourself 💖
            </div>

            <div class="wishLine">
                🌸 Keep Smiling Always 🌸
            </div>

            <div class="wishLine">
                ❤️ Happy Birthday ❤️
            </div>

        </div>
    `;

    container.appendChild(message);

}


/* ==========================================================
   FOOD CATCH GAME
========================================================== */

const foodArea = document.getElementById("foodGameArea");
const basket = document.getElementById("basket");
const scoreText = document.getElementById("foodScore");

let score = 0;
let spawnFood;

const foods = [

"🍕","🍔","🍟","🌭","🍩",

"🍪","🍫","🍉","🍎","🍓",

"🍇","🍒","🍰","🧁"

];

function startFoodGame(){

    score = 0;

    scoreText.innerHTML = score;

    document.getElementById("foodResult").style.display="none";

    document.getElementById("foodNextBtn").style.display="none";

    clearInterval(spawnFood);

    document.querySelectorAll(".foodItem").forEach(f=>f.remove());

    spawnFood = setInterval(createFood,500);

}

/* ========================= */

function createFood(){

    const food = document.createElement("div");

    food.className="foodItem";

    food.innerHTML=

    foods[Math.floor(Math.random()*foods.length)];

    food.style.left=

    Math.random()*

    (foodArea.clientWidth-40)+"px";

    foodArea.appendChild(food);

    let topPos=-50;

    const speed=

    2+Math.random()*3;

    const move=setInterval(()=>{

        topPos+=speed;

        food.style.top=topPos+"px";

        if(hit(food,basket)){

            clearInterval(move);

            food.remove();

            score++;

            scoreText.innerHTML=score;

            if(score>=27){

                finishFoodGame();

            }

            return;

        }

        if(topPos>

        foodArea.clientHeight){

            clearInterval(move);

            food.remove();

        }

    },20);

}

/* ========================= */

function hit(a,b){

    const r1=a.getBoundingClientRect();

    const r2=b.getBoundingClientRect();

    return !(

        r1.right<r2.left ||

        r1.left>r2.right ||

        r1.bottom<r2.top ||

        r1.top>r2.bottom

    );

}

/* ========================= */

function finishFoodGame(){

    clearInterval(spawnFood);

    document.querySelectorAll(".foodItem").forEach(f=>f.remove());

    const result = document.getElementById("foodResult");

    result.innerHTML = `
        <div class="foodResultBox">

            <div class="foodResultEmoji">🎉</div>

            <div class="foodResultTitle">
                Congratulations
            </div>

            <div class="foodResultScore">
                <h3>You scored</h3>
                <b>${score}/27</b>
            </div>

        </div>
    `;

    result.style.display = "flex";

    document.getElementById("foodNextBtn").style.display = "inline-block";

}

/* ========================= */
/* Basket Movement */
/* ========================= */

foodArea.addEventListener("mousemove",moveBasket);

foodArea.addEventListener("touchmove",moveBasket);

function moveBasket(e){

    let x;

    const rect=

    foodArea.getBoundingClientRect();

    if(e.touches){

        x=e.touches[0].clientX-rect.left;

    }

    else{

        x=e.clientX-rect.left;

    }

    x=Math.max(30,

    Math.min(

    x,

    rect.width-30

    ));

    basket.style.left=x+"px";

}



/* ==========================================================
   BASKET CONTROL
========================================================== */

if(foodArea && basket){

    foodArea.addEventListener("mousemove",(e)=>{

        const rect = foodArea.getBoundingClientRect();

        let x = e.clientX - rect.left;

        x = Math.max(40,
            Math.min(x, rect.width-40));

        basket.style.left = x + "px";

    });

    foodArea.addEventListener("touchmove",(e)=>{

        const rect = foodArea.getBoundingClientRect();

        let x = e.touches[0].clientX - rect.left;

        x = Math.max(40,
            Math.min(x, rect.width-40));

        basket.style.left = x + "px";

    });

}

/* ==========================================================
   BALLOON GAME
========================================================== */

const balloonArea =
document.getElementById("balloonGameArea");

const balloonScore =
document.getElementById("balloonScore");

const balloonRemaining =
document.getElementById("balloonRemaining");

let popped = 0;

let created = 0;

let balloonInterval = null;

const balloonColors = [

    "red",

    "blue",

    "green",

    "yellow",

    "purple",

];

function startBalloonGame(){

    if(game.balloonFinished) return;

    game.balloonFinished = true;

    popped = 0;

    created = 0;

    if(balloonScore)

        balloonScore.textContent = "0";

    if(balloonRemaining)

        balloonRemaining.textContent = "∞";

    clearInterval(balloonInterval);

    balloonInterval =

    setInterval(createBalloon,700);

}

/* ==========================================================
   CREATE BALLOON
========================================================== */

function createBalloon(){

    if(created>=99999){

        clearInterval(balloonInterval);

        return;

    }

    created++;

    if(balloonRemaining){

        balloonRemaining.textContent=

        99999-created;

    }

    const balloon=

    document.createElement("div");

    balloon.className=

    "balloon "+

    balloonColors[

    Math.floor(

    Math.random()*balloonColors.length)];

    balloon.style.left=

    Math.random()*

    (balloonArea.clientWidth-80)+"px";

    balloon.style.animationDuration=

    (5+Math.random()*3)+"s";

    balloon.onclick=()=>{

        balloon.classList.add("pop");

        playSound("balloon");

        popped++;

        if(balloonScore){

            balloonScore.textContent=popped;

        }

        setTimeout(()=>{

            balloon.remove();

        },500);

    };

    balloonArea.appendChild(balloon);

    balloon.addEventListener(

        "animationend",

        ()=>{

            balloon.remove();

        }

    );

}



/* ==========================================================
   CANDLE GAME (MICROPHONE)
========================================================== */

/* ==========================================================
   MICROPHONE VARIABLES
========================================================== */

let audioContext = null;
let analyser = null;
let microphone = null;
let microphoneStream = null;

let micStarted = false;
let animationId = null;
let fallbackTimer = null;



function initializeMicrophone(){

    const btn = document.getElementById("startMicBtn");

    if(!btn) return;

    btn.onclick = startMicrophone;

}

async function startMicrophone(){

    if(micStarted) return;

    micStarted = true;

    const flames = document.querySelectorAll(".flame");

    flames.forEach(f=>{

        f.style.opacity="1";
        f.style.transform="translateX(-50%) scale(1)";

    });

    document.getElementById("blowMeter").style.width="0%";

    document.getElementById("microphoneStatus").innerHTML=

    "🎤 Blow into your microphone...";

    document.getElementById("startMicBtn").disabled=true;

    try{

        microphoneStream=

        await navigator.mediaDevices.getUserMedia({

            audio:{

                echoCancellation:false,

                noiseSuppression:false,

                autoGainControl:false

            }

        });

        audioContext=

        new(window.AudioContext||

        window.webkitAudioContext)();

        analyser=

        audioContext.createAnalyser();

        analyser.fftSize=1024;

        analyser.smoothingTimeConstant=.15;

        microphone=

        audioContext.createMediaStreamSource(

            microphoneStream

        );

        microphone.connect(analyser);

        detectBlow();

        fallbackTimer=setTimeout(()=>{

            if(game.candleFinished) return;

            document.getElementById(

                "microphoneStatus"

            ).innerHTML=

            "💨 Can't detect blowing?<br>Click below.";

            const btn=

            document.createElement("button");

            btn.className="mainButton";

            btn.innerHTML="💨 Blow Candle";

            btn.onclick=blowSuccess;

            document

            .getElementById(

                "microphoneStatus"

            )

            .appendChild(document.createElement("br"));

            document

            .getElementById(

                "microphoneStatus"

            )

            .appendChild(btn);

        },10000);

    }

    catch(e){

        micStarted=false;

        document.getElementById(

            "microphoneStatus"

        ).innerHTML=

        "❌ Microphone Permission Denied";

    }

}


function detectBlow(){

    const data = new Uint8Array(analyser.frequencyBinCount);

    const meter=

    document.getElementById("blowMeter");

    const status=

    document.getElementById("microphoneStatus");

    const isMobile=

    /Android|iPhone|iPad|iPod/i

    .test(navigator.userAgent);

    const threshold=

    isMobile?18:10;

    function update(){

        analyser.getByteTimeDomainData(data);

        let sum=0;

        for(let i=0;i<data.length;i++){

            const value=

            (data[i]-128)/128;

            sum+=value*value;

        }

        const volume=

        Math.sqrt(sum/data.length)*100;

        meter.style.width=

        Math.min(volume*3,100)+"%";

        status.innerHTML=

        "🎤 Blow into microphone<br>" +

        "Mic Level : " +

        volume.toFixed(1);

        if(volume>threshold){

            blowSuccess();

            return;

        }

        animationId=

        requestAnimationFrame(update);

    }

    update();

}


function blowSuccess(){

    if(game.candleFinished) return;

    game.candleFinished=true;

    clearTimeout(fallbackTimer);

    cancelAnimationFrame(animationId);

    playSound("success");

    document

    .querySelectorAll(".flame")

    .forEach(flame=>{

        flame.style.transition=

        ".8s";

        flame.style.opacity="0";

        flame.style.transform=

        "translateX(-50%) scale(0)";

    });

    document

    .getElementById(

        "microphoneStatus"

    )

    .innerHTML=

    "🎉 Wonderful! Make A Wish ✨";

    document

    .getElementById(

        "candleNextBtn"

    )

    .style.display="inline-block";

    if(microphoneStream){

        microphoneStream

        .getTracks()

        .forEach(track=>track.stop());

    }

    if(audioContext){

        audioContext.close();

    }

    

    micStarted=false;


    

}


/* ==========================================================
   CAKE CUTTING
========================================================== */

function startCakeGame(){

    const knife =

    document.getElementById("knife");

    const cake =

    document.getElementById("cakeImage");

    if(!knife || !cake) return;

    let dragging = false;

    knife.addEventListener("mousedown",()=>{

        dragging=true;

    });

    document.addEventListener("mouseup",()=>{

        dragging=false;

    });

    document.addEventListener("mousemove",e=>{

        if(!dragging) return;

        knife.style.left=e.clientX-40+"px";

        knife.style.top=e.clientY-40+"px";

        checkCakeCut();

    });

    knife.addEventListener("touchstart",()=>{

        dragging=true;

    });

    document.addEventListener("touchend",()=>{

        dragging=false;

    });

    document.addEventListener("touchmove",e=>{

        if(!dragging) return;

        knife.style.left=

        e.touches[0].clientX-40+"px";

        knife.style.top=

        e.touches[0].clientY-40+"px";

        checkCakeCut();

    });

}

function checkCakeCut(){

    if(game.cakeFinished) return;

    const knife =
    document.getElementById("knife");

    const cake =
    document.getElementById("cakeImage");

    const knifeRect =
    knife.getBoundingClientRect();

    const cakeRect =
    cake.getBoundingClientRect();

    if(

        knifeRect.right > cakeRect.left &&
        knifeRect.left < cakeRect.right &&
        knifeRect.bottom > cakeRect.top &&
        knifeRect.top < cakeRect.bottom

    ){

        game.cakeFinished = true;

        playSound("cake");

        document
        .getElementById("cakeCuttingArea")
        .classList.add("cakeCut");

        document
        .getElementById("cakeInstruction")
        .innerHTML =
        "🎉 Cake Cut Successfully!";

        createCakeSparkles();

        document
        .getElementById("cakeNextBtn")
        .style.display="inline-block";

    }

}

/* ==========================================================
   ROSE PETALS
========================================================== */

function startRosePetals(){

    const container=

    document.getElementById(

    "rosePetalContainer");

    if(!container) return;

    setInterval(()=>{

        const petal=

        document.createElement("div");

        petal.className="rosePetal";

        petal.innerHTML="🌹";

        petal.style.left=

        Math.random()*100+"%";

        petal.style.animationDuration=

        4+Math.random()*4+"s";

        container.appendChild(petal);

        setTimeout(()=>{

            petal.remove();

        },8000);

    },400);

}

/* ==========================================================
   FLOATING HEARTS
========================================================== */

function startFloatingHearts(){

    const container=

    document.getElementById(

    "loveHeartContainer");

    if(!container) return;

    setInterval(()=>{

        const heart=

        document.createElement("div");

        heart.className="floatingHeart";

        heart.innerHTML="❤️";

        heart.style.left=

        Math.random()*100+"%";

        heart.style.fontSize=

        20+Math.random()*25+"px";

        heart.style.animationDuration=

        6+Math.random()*4+"s";

        container.appendChild(heart);

        setTimeout(()=>{

            heart.remove();

        },10000);

    },500);

}


/* ==========================================================
   MEMORY GALLERY
========================================================== */

/* ==========================================
   MEMORY CARD FLIP
========================================== */

function startMemoryGallery(){

    game.memoryIndex = 0;

    const cards = document.querySelectorAll(".memoryCard");

    cards.forEach(card=>{

        card.classList.remove("flip");

        card.classList.remove("opened");

        if(card.flipTimer){

            clearTimeout(card.flipTimer);

        }

    });

}

document.addEventListener("DOMContentLoaded",()=>{

    const cards=document.querySelectorAll(".memoryCard");

    cards.forEach(card=>{

        card.addEventListener("click",()=>{

            // Ignore if already open
            if(card.classList.contains("flip"))
                return;

            // Flip card
            card.classList.add("flip");

            // Remove previous timer if any
            if(card.flipTimer){

                clearTimeout(card.flipTimer);

            }

            // Flip back after 10 seconds
            card.flipTimer=setTimeout(()=>{

                card.classList.remove("flip");

            },5000);

        });

    });

});

/* ==========================================================
   SPARKLER
========================================================== */

function startSparkler(){

    const canvas = document.getElementById("sparkCanvas");

    if(!canvas) return;

    const ctx = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];

    const colors = [
        "#FFD700",
        "#FFF176",
        "#FF4081",
        "#FFFFFF",
        "#00E5FF",
        "#FF9800"
    ];

    function createSpark(x,y){

        for(let i=0;i<25;i++){

            particles.push({

                x:x,
                y:y,

                dx:(Math.random()-0.5)*10,
                dy:(Math.random()-0.5)*10,

                radius:2+Math.random()*4,

                color:colors[Math.floor(Math.random()*colors.length)],

                life:70,

                alpha:1

            });

        }

    }

    function animate(){

        ctx.clearRect(0,0,canvas.width,canvas.height);

        for(let i=particles.length-1;i>=0;i--){

            const p=particles[i];

            p.x+=p.dx;

            p.y+=p.dy;

            p.dy+=0.05;

            p.life--;

            p.alpha=p.life/70;

            ctx.save();

            ctx.globalAlpha=p.alpha;

            ctx.beginPath();

            ctx.arc(p.x,p.y,p.radius,0,Math.PI*2);

            ctx.fillStyle=p.color;

            ctx.shadowBlur=20;

            ctx.shadowColor=p.color;

            ctx.fill();

            ctx.restore();

            if(p.life<=0){

                particles.splice(i,1);

            }

        }

        requestAnimationFrame(animate);

    }

    animate();

    let mouseDown=false;

    window.addEventListener("mousedown",()=>mouseDown=true);
    window.addEventListener("mouseup",()=>mouseDown=false);

    window.addEventListener("mousemove",(e)=>{

        createSpark(e.clientX,e.clientY);

    });

    window.addEventListener(
    "touchmove",
    (e)=>{
        createSpark(
            e.touches[0].clientX,
            e.touches[0].clientY
        );
    },
        { passive: true }
    );

}



const canvas = document.getElementById("sparkCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas(){

    canvas.width = window.innerWidth;

    canvas.height = window.innerHeight;

}

resizeCanvas();

window.addEventListener("resize", resizeCanvas);




function createCakeSparkles(){

    const container =
    document.getElementById("cakeSparkles");

    for(let i=0;i<40;i++){

        const s=document.createElement("div");

        s.className="spark";

        s.style.left=Math.random()*100+"%";

        s.style.top=Math.random()*100+"%";

        s.style.animationDelay=

        Math.random()+"s";

        container.appendChild(s);

        setTimeout(()=>{

            s.remove();

        },2000);

    }

}

/* ==========================================================
   FIREWORKS
========================================================== */

function startFireworks(){

    const canvas=

    document.getElementById(

    "fireworksCanvas");

    if(!canvas) return;

    const ctx=

    canvas.getContext("2d");

    canvas.width=

    window.innerWidth;

    canvas.height=

    window.innerHeight;

    const fireworks=[];

    function launch(){

        fireworks.push({

            x:Math.random()*canvas.width,

            y:canvas.height,

            target:

            Math.random()*300+80,

            color:

            `hsl(${Math.random()*360},100%,60%)`,

            exploded:false,

            particles:[]

        });

    }

    function animate(){

        ctx.clearRect(

            0,

            0,

            canvas.width,

            canvas.height

        );

        fireworks.forEach(f=>{

            if(!f.exploded){

                f.y-=5;

                ctx.beginPath();

                ctx.arc(

                    f.x,

                    f.y,

                    4,

                    0,

                    Math.PI*2

                );

                ctx.fillStyle=f.color;

                ctx.fill();

                if(f.y<=f.target){

                    f.exploded=true;

                    playSound("firework");

                    for(let i=0;i<40;i++){

                        f.particles.push({

                            x:f.x,

                            y:f.y,

                            dx:(Math.random()-0.5)*8,

                            dy:(Math.random()-0.5)*8,

                            life:60

                        });

                    }

                }

            }

            else{

                f.particles.forEach(p=>{

                    p.x+=p.dx;

                    p.y+=p.dy;

                    p.life--;

                    ctx.beginPath();

                    ctx.arc(

                        p.x,

                        p.y,

                        2,

                        0,

                        Math.PI*2

                    );

                    ctx.fillStyle=f.color;

                    ctx.fill();

                });

            }

        });

        requestAnimationFrame(animate);

    }

    animate();

    setInterval(launch,700);

}

/* ==========================================================
   CONFETTI
========================================================== */

function startConfetti(){

    const container=

    document.getElementById(

    "confettiContainer");

    if(!container) return;

    setInterval(()=>{

        const c=

        document.createElement("div");

        c.className="confetti";

        c.style.left=

        Math.random()*100+"%";

        c.style.background=

        `hsl(${Math.random()*360},100%,60%)`;

        c.style.animationDuration=

        3+Math.random()*3+"s";

        container.appendChild(c);

        setTimeout(()=>{

            c.remove();

        },6000);

    },120);

}

/* ==========================================================
   WINDOW RESIZE
========================================================== */

window.addEventListener(

    "resize",

    ()=>{

        const fire=

        document.getElementById(

        "fireworksCanvas");

        if(fire){

            fire.width=

            window.innerWidth;

            fire.height=

            window.innerHeight;

        }

    }

);



/* ==========================================================
   FLOATING STARS
========================================================== */

function startFloatingStars(){

    const container=

    document.getElementById(

    "floatingStarsFinal"

    ) ||

    document.getElementById(

    "floatingStars"

    );

    if(!container) return;

    setInterval(()=>{

        const star=

        document.createElement("div");

        star.className="star";

        star.innerHTML="⭐";

        star.style.left=

        Math.random()*100+"%";

        star.style.top=

        Math.random()*100+"%";

        star.style.fontSize=

        (15+Math.random()*20)+"px";

        container.appendChild(star);

        setTimeout(()=>{

            star.remove();

        },4000);

    },300);

}

/* ==========================================================
   FINAL HEARTS
========================================================== */

function startFinalHearts(){

    const container=

    document.getElementById(

    "floatingHeartContainerFinal"

    );

    if(!container) return;

    setInterval(()=>{

        const heart=

        document.createElement("div");

        heart.className="floatingHeart";

        heart.innerHTML="❤️";

        heart.style.left=

        Math.random()*100+"%";

        heart.style.fontSize=

        (20+Math.random()*25)+"px";

        container.appendChild(heart);

        setTimeout(()=>{

            heart.remove();

        },8000);

    },400);

}

/* ==========================================================
   FIREWORK SCREEN EFFECTS
========================================================== */

function startFinalCelebration(){

    startConfetti();

    startFloatingStars();

    startFinalHearts();

   

}



/* ==========================================================
   REPLAY
========================================================== */

const replay =

document.getElementById(

"restartBtn"

);

if(replay){

    replay.addEventListener(

        "click",

        ()=>{

            location.reload();

        }

    );

}

/* ==========================================================
   KEYBOARD SUPPORT
========================================================== */

document.addEventListener(

    "keydown",

    e=>{

        if(e.key==="ArrowRight"){

            nextScreen();

        }

        if(e.key==="ArrowLeft"){

            previousScreen();

        }

    }

);

/* ==========================================================
   PREVENT IMAGE DRAG
========================================================== */

document.querySelectorAll("img")

.forEach(img=>{

    img.draggable=false;

});

/* ==========================================================
   WINDOW LOAD
========================================================== */

window.onload=()=>{

    updateProgress();

};

/* ==========================================================
   END
========================================================== */

console.log(

"🎉 Ultimate Birthday Surprise Loaded Successfully ❤️"

);



/*=================================================
Name slice
=================================================*/ 

const textElement = document.getElementById("slice-text");
const text = "✨ Feona Sanofer 🎈";
let index = 0;

function sliceText() {
    if (index < text.length) {
        textElement.textContent += text[index];
        index++;
        setTimeout(sliceText, 350); 
    } else {
        setTimeout(() => {
            textElement.textContent = ""; 
            index = 0; 
            sliceText(); 
        }, 1100); 
    }
}

sliceText()



// floating particles
function createFloatingStars(){

    const container = document.getElementById("globalStars");

    if(!container) return;

    const particles = [

        "✨",
        "💖",
        "✨",
        "✨"

    ];

    for(let i=0;i<90;i++){

        const star = document.createElement("div");

        star.className = "star";

        star.innerHTML =
        particles[Math.floor(Math.random()*particles.length)];

        star.style.left = Math.random()*100 + "%";

        star.style.top = Math.random()*100 + "%";

        star.style.fontSize =
        (14 + Math.random()*24) + "px";

        container.appendChild(star);

        // Random movement
        star.animate(

        [

            {
                transform:"translate(0px,0px) rotate(0deg)"
            },

            {

                transform:
                `translate(${(Math.random()-0.5)*2500}px,
                ${(Math.random()-0.5)*2500}px)
                rotate(${Math.random()*1080}deg)`

            }

        ],

        {

            duration:12000 + Math.random()*12000,

            iterations:Infinity,

            easing:"linear"

        });

    }

}




const birthdayWishes=[

"🎂 Happy Birthday! 🎂",

"💖 Wishing you endless happiness 💖",

"🎉 Have an amazing year ahead 🎉",

"🌸 Stay blessed forever 🌸",

"💝 May success follow you always 💝",

"🎈 Smile every single day 🎈",

"❤️ Wishing you good health ❤️",

"🥳 Enjoy your special day 🥳",

"🌹 Keep shining 🌹",

"💖 Lots of love to you 💖",

"💖 Happiness forever 💖",

"🎉 Celebrate every moment 🌟",

"🌟 Stay awesome 🌟",

"💝 May joy surround you 💝",

"🌈 Wishing endless smiles 🌈",

"❤️ Stay positive ❤️",

"🎂 Eat lots of cake 🎂",

"🎁 Best wishes always 🎁",

"🌹 Stay beautiful 🌹",

"✨ May luck find you ✨",

"💖 Dream big 💖",

"🎉 Keep smiling 🎉",

"🌸 Shine brighter everyday 🌸",

"🎂 Another beautiful year 🎂",

"💝 Love and laughter always 💝",

"🌟 Have a magical birthday 🌟",

"❤️ Stay happy forever ❤️",

"🎁 Best Birthday Wishes 🎁"

];


let birthdayWishInterval;

function startBirthdayWishes(){

    clearInterval(birthdayWishInterval);

    const container=document.getElementById("floatingBirthdayWishes");

    birthdayWishInterval=setInterval(()=>{

        const wish=document.createElement("div");

        wish.className="birthdayWish";

        wish.innerHTML=

        birthdayWishes[

        Math.floor(Math.random()*birthdayWishes.length)

        ];

        wish.style.left=

        Math.random()*80+"%";

        wish.style.animationDuration=

        (8+Math.random()*6)+"s";

        container.appendChild(wish);

        setTimeout(()=>{

            wish.remove();

        },15000);

    },1300);

}


document.addEventListener("DOMContentLoaded",()=>{

    createFloatingStars();

    startBirthdayWishes();

});



