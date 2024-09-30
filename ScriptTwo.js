gsap.registerPlugin(ScrollTrigger);


const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
    lerp: 0.02
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
    },
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});


ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

ScrollTrigger.refresh();

function load(){
    const timeline = gsap.timeline();
    timeline.to(".animate",{
        delay: 8,
        duration: 1.5,
        opacity: 0,
        ease: "power4.out"
    }, 'loader');
    timeline.to(".product",{
        delay: 8,
        duration: .5,
        opacity: 0,
        ease: "power4.out"
    },'loader');
    timeline.to(".rock",{
        delay: 8,
        duration: 1.5,
        opacity: 0,
        ease: "power4.out"
    },'loader');
    timeline.to(".animation",{
        delay: 0,
        duration: 2,
        y: "-100%",
        ease: "power4.out",
        onComplete: ()=>{
            document.querySelector('.banner').style.display = 'none'
            firstPageAnimation();
            document.body.classList.remove('no-scroll');
        }

    });
   }

   function firstPageAnimation() {
    gsap.to('.HeroContainer', {
        duration: 1,
        opacity: 1,
        ease: "power4.out",
    });

    gsap.to('.Hero_btn', {
        y: 0,
        ease: "power4.out",
        duration: 2,
        delay: 1
    });

    gsap.to('#drawing', {
        delay: 2,
        duration: 1,
        opacity: 1,
        display: 'block',
        ease: "power4.out",
        onComplete: () => {
            // nonePointer() // Enable pointer events
            document.querySelector('#drawing').style.pointerEvents = 'auto';
        }
    });

    gsap.to('#H_Video', {
        delay: 2,
        duration: 1,
        opacity: 1,
        display: 'block',
        ease: "power4.out"
    });
}


document.addEventListener('DOMContentLoaded', () => {

    


    document.body.classList.add('no-scroll');
    document.querySelector('#drawing').style.pointerEvents = 'none'; // Disable pointer events initially



    document.querySelectorAll('.container a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
    
            // Get the target element
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
    
            // Use Locomotive Scroll's scrollTo method
            locoScroll.scrollTo(targetElement);
    
            gsap.to('.nav-container',{
                autoAlpha:0
            })
            navBtn.classList.remove('active');
            tl.reverse();
    
        });
    });




    // Cursor Follower
    let cursor = document.querySelector('.cursor'),
        mouseX = 0,
        mouseY = 0,
        pageOne = document.querySelector('#page1'),
        navbar = document.querySelector('.NewNavbar'),
        pageTwo = document.querySelector('.pages'),
        cursorScale = document.querySelectorAll('.cursor-scale'),
        cursorScale_lg = document.querySelectorAll('.cursor-scale-lg'),
        pageFour = document.querySelector('.section4');
    // console.log(pageFour);

    gsap.to({}, 0.016, {
        repeat: -1,

        onRepeat: function () {
            gsap.set(cursor, {
                left: mouseX,
                top: mouseY,
                ease: "power2.out",
            })

        }
    });

    navbar.addEventListener('mouseenter', () => {
        gsap.to('.cursor h5', {
            opacity: 0,
            display: 'none',

        })
        gsap.to(cursor, {
            opacity: 1,
            width: '2vw',
            height: '2vw'
        })
    })
    navbar.addEventListener('mouseleave', () => {
        gsap.to('.cursor h5', {
            opacity: 1,
            display: 'block',

        })
        gsap.to(cursor, {
            width: '5vw',
            height: '5vw'
        })
    })

    function text(id){
        if(id === 2){
               document.querySelector('.cursor h5').textContent = "CLICK"
        }else{
               document.querySelector('.cursor h5').textContent = "SCRATCH"
        }
    }
    function Notext(){
         document.querySelector('.cursor h5').textContent = ""
    }
    window.addEventListener('mousemove', function (e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    })


    pageOne.addEventListener('mousemove', ()=>{
        gsap.to(cursor,{
            opacity:1,
            width:'7vw',
            height:'7vw',
            onComplete: ()=>{
                let id =1;
               text(id);
            }
        })
    })
    pageOne.addEventListener('mouseenter', ()=>{
        gsap.to(cursor,{
            opacity:1,
            width:'7vw',
            height:'7vw',
            onComplete: ()=>{
               text();
            }
        })
    })
    pageOne.addEventListener('mouseleave', ()=>{
        gsap.to('.cursor h5',{
            opacity:0,
            onComplete:()=>{
                gsap.to(cursor,{
                    delay:0,
                     opacity:1,
                     width:'2vw',
                     height:'2vw',
                    onComplete: ()=>{
                     Notext()
                    }
                 })
            }
        })
       
    })

        cursorScale.forEach(link => {
            link.addEventListener('mouseleave', () => {
                cursor.classList.remove('grow');
                gsap.to(cursor, {
                    width:'2vw',
                    height:'2vw'
                })
            })

            link.addEventListener('mouseenter', () => {
                cursor.classList.add('grow');
                gsap.to(cursor, {
                    width:'2vw ',
                    height:'2vw'
                })
            })
        })
        cursorScale_lg.forEach(link => {
            link.addEventListener('mouseleave', () => {
                cursor.classList.remove('grow-lg');
            })

            link.addEventListener('mouseenter', () => {
                cursor.classList.add('grow-lg');

            })
        })

        // function newTxt (){
        //     // document.querySelector('.cursor h5').textContent = "CLICK";
        // }

            pageFour.addEventListener('mouseenter', () => {
            gsap.to(cursor, {
                // scale: 1, 
                // opacity:1,
                width: '7vw',
                height: '7vw',
                duration: .5,
                onComplete:()=>{
                    let id =2;
                    text(id)
                }
            })
        })

        pageFour.addEventListener('mouseleave', ()=>{
            gsap.to(cursor, {
                // scale: 1, 
                // opacity:1,
                width: '2vw',
                height: '2vw',
                duration: .5,
                onComplete:()=>{
                    Notext()
                }
            })
        })

      



    // Loader
  

   

    






    const navBtn = document.querySelector('.menu-btn');
    let navOverlay = document.querySelector('.OverlayNavbar');
    let isNavOpen = false;

    let ovanimation = document.querySelector('.ovanimation');

    

    const tl = gsap.timeline({ paused: true, reversed: true });


    function display(){
        let txt = document.querySelectorAll('.text')
     
       txt.forEach(text => {
         text.style.display = 'none'
       })
     }
    const animateOpenNav = () => {
        tl.to(ovanimation, {
            zIndex: 1000000,

        }, 'c')
        tl.to(navOverlay, {
            y: 0,
            duration: 2,
            onComplete: ()=>{
                 tl.to('.block', {
            y:'0%',
            duration:1,
            stagger:.2,
            // onComplete: ()=>{
            //   display();
            // }
            
          }, 'nav')
        .to('.wrappeR .balls',{
                  y:'0%',
                  duration:1,
                  delay:1,
                  opacity:1,
                  rotation:360
              },'nav')
        .to('.foo', {
            y:0,
            duration:2,
            opacity:1,
            display:'blokc',
            stagger:.2,
          },'nav')

            }

        },'c')
       
       
       
    };


    const toggleNav = () => {
        navBtn.classList.add('active');
        isNavOpen = !isNavOpen;
        if (isNavOpen) {
            tl.play();
            // scroll.stop();
            // navContainer.style.visibility = 'visible';
            // navContainer.style.opacity = 1;
        } else {

            tl.reverse();
            navBtn.classList.remove('active');
        

           
            // scroll.start();
            // navContainer.style.visibility = 'hidden';
            // navContainer.style.opacity = 0;
        }
    };

    navBtn.addEventListener('click', toggleNav);
    // Initialize the animation
    animateOpenNav();


    // Navbar Animation
    let elements = document.querySelectorAll('.text');

    elements.forEach((element) => {
        let innerText = element.innerText;
        element.innerHTML = "";

        let textContainer = document.createElement('div');
        textContainer.classList.add('block');

        for (let letter of innerText) {
            let span = document.createElement('span');
            span.innerText = letter.trim() === "" ? "\xa0" : letter;

            span.classList.add('letter');
            textContainer.appendChild(span);

        }
        element.appendChild(textContainer);
        element.appendChild(textContainer.cloneNode(true));
    });

    elements.forEach((e) => {
        e.addEventListener('mouseover', () => {
            e.classList.remove('play')
        })
    })

    //

    function animateNavbar(e){
        let wrapper = document.querySelectorAll('.wrappeR .balls');
        wrapper.forEach((balls)=>{
            let x = balls.getBoundingClientRect().left + balls.clientWidth / 2;
            let y = balls.getBoundingClientRect().top + balls.clientHeight / 2;
    
            let radian = Math.atan2(e.pageX - x , e.pageY - y);
            let rotate = radian * (180 / Math.PI ) * -1 + 270;
            balls.style.transform = `rotate(${rotate}deg)`;
        })
    }
    let oknav =document.querySelector('.wrap')
  

    oknav.addEventListener('mousemove', animateNavbar);






    // Home Canvas

     //Canvas Animation First Page 
     const canva = document.querySelector('#drawing');
     const ctx = canva.getContext('2d');
 
     canva.width = window.innerWidth;
     canva.height = window.innerHeight;
 
     ctx.fillStyle = 'black';
     ctx.fillRect(0, 0, canva.width, canva.height);
 
     ctx.globalCompositeOperation = "destination-out";
 
 
 
 
     function drawBlob(x, y, size) {
         ctx.beginPath();
         ctx.arc(x, y, size, 0, Math.PI * 2);
         ctx.fill();
 
 
 
     }
 
 
     function animate(e) {
         const page1 = document.getElementById('page1');
         const rect = page1.getBoundingClientRect();
 
         if (e.clientX >= rect.left && e.clientX <= rect.right && e.clientY >= rect.top && e.clientY <= rect.bottom) {
             const x = e.clientX;
             const y = e.clientY;
 
             for (let i = 0; i < 30; i++) {
                 const size = Math.random() * 80;
                 drawBlob(x, y, size);
             }
         }
     }
 
     document.querySelector('#drawing').addEventListener('mousemove', animate);


// About 
     // Register GSAP plugins
    gsap.registerPlugin(ScrollTrigger);

    // Initialize GSAP ScrollTrigger
    var tlABT = gsap.timeline({
        scrollTrigger: {
            trigger: ".pages",
            scroller: '#main',
            start: "top top",
            end: "bottom -30%", // End after the animations are complete
            scrub: 2, // Adjust this value to slow down the scroll animation
            pin: true,
            pinSpacing: true
        }
    });

    tlABT.to(".pages img", {
        duration: 4,
        top: 0,
        width: "100%",
        height: '100vh',
        marginTop: '0vw',
        onComplete: () => { }
    }, 'anim')
        .to('.pages h1:nth-child(1)', {
            y: '-100%',
            duration: 1,
            opacity:0,

            ease: "power1.inOut"
        }, "anim")
        .to('.pages h1:nth-child(2)', {
            x: '-15%',
            duration: 4,
            ease: "power1.inOut"
        }, "anim")
        .to('.pages h1:nth-child(3)', {
            x: '15%',
            duration: 4,
            ease: "slow(0.7, 0.7, false)"
        }, "anim")
        .to('.pages .ov', {
            top: '0%',
            delay: 0,
            duration: 1,
            ease: "power1.inOut"
        })
        .to('.pages .ABT_p p', {
            transform: 'translateY(0)',
            delay: 0,
            duration: .5,
            ease: "power1.inOut"
        }, 'together')
        .to('.AbtPrime', {
            opacity: 1,
            duration: 1,
            ease: "power1.inOut"
        }, 'together')
        ;
        

    //Hiten Section 4





    const sliderContent = [
        "Meta  Moon",
        "STRAWBERRY BANANA",
        "CHERRY FREEZE",
        "L E M O N A D E",
        "STRAWBERRY WATERMELON",
        "I C E P O P"
    ];

    const ImgColor = [

        'linear-gradient(to bottom,#000, #585656,  #fff )',
        'linear-gradient(to bottom,#D870A1, #E8D427 )',
        'linear-gradient(to bottom,#49C6E4, #DB2146)',
        'linear-gradient(to bottom, #666, #FFD700 )',
        'linear-gradient(to bottom, #666, #C77FBE )',
        'linear-gradient(to bottom, #E2786F, #fff, #2196F3 )'


        // 'linear-gradient(to bottom, #333, #8B9467, #ccc )',
        // 'linear-gradient(to bottom, #FFC67D, #8BC34A )',
        // 'linear-gradient(to bottom, #34A85A, #E2553F)',
        // 'linear-gradient(to bottom, #666, #FFD700 )',
        // 'linear-gradient(to bottom, #666, #C77FBE )',
        // 'linear-gradient(to bottom, #E2786F, #fff, #2196F3 )'
    ]

    const slider = document.querySelector(".slider");
    let sectionFour = document.querySelector('.section4')
    let activeSlide = 0;

    slider.addEventListener("click", function () {
        
        const currentSlide = slider.querySelector(".slide:not(.existing)");
        // const sliderTheme = activeSlide % 2 ? "dark" : "light";
        activeSlide = (activeSlide + 1) % sliderContent.length;


        if (currentSlide) {
            const existingImgs = currentSlide.querySelectorAll("img");
            gsap.to(existingImgs, {
                top: "0%",
                duration: 1.5,
                ease: "power4.inOut"
            });

            currentSlide.classList.add("exiting");
        }

        const newSlide = document.createElement("div");
        newSlide.classList.add("slide");
        newSlide.style.background = `${ImgColor[activeSlide]}`
        // newSlide.classList.add(sliderTheme);
        newSlide.style.clipPath = "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)";

        const newSlideImg1 = document.createElement("div");
        newSlideImg1.className = "slide-img slide-img-1";
        const img1 = document.createElement("img");
        // console.log(activeSlide);
        img1.src = `./Assets/Images/slider-${activeSlide + 1}-1.png`;
        img1.style.top = "100%";
        newSlideImg1.appendChild(img1);
        newSlide.appendChild(newSlideImg1);

        const newSlideContent = document.createElement("div");
        newSlideContent.classList.add("slide-content");
        if (activeSlide === 4) {
            newSlideContent.innerHTML = `<h1 class="h1Banana" style="transform:scale(1.1) scaleY(2);">${sliderContent[activeSlide]}</h1>`;
        }
        else {
            newSlideContent.innerHTML = `<h1 style="transform:scale(1.1) scaleY(2);">${sliderContent[activeSlide]}</h1>`;
        }
        newSlide.appendChild(newSlideContent);

        
        const newSlideHeading = document.createElement("div");
        newSlideHeading.classList.add("sliderHeading");
       
            newSlideHeading.innerHTML = `<h1>PRIME STICKS</h1>`;
        
        newSlide.appendChild(newSlideHeading);

     

        const newSlideImg2 = document.createElement("div");
        newSlideImg2.className = "slide-img slide-img-2";
        const img2 = document.createElement("img");
        img2.src = `./Assets/Images/slider-${activeSlide + 1}-2.png`;
        img2.style.top = "100%";
        newSlideImg2.appendChild(img2);
        newSlide.appendChild(newSlideImg2);

        slider.appendChild(newSlide);

        // const newSlideFoot = document.createElement("div");
        // newSlideFoot.classList.add("sliderfoot");
       
        //     newSlideFoot.innerHTML = `<h2>Buy Now</h2>`;
        
        // newSlide.appendChild(newSlideFoot);

        gsap.to(newSlide, {
            clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
            duration: 1.5,
            ease: "power4.inOut",
            onStart: () => {
                gsap.to([img1, img2], {
                    top: "50%",
                    duration: 1.5,
                    ease: "power4.inOut"
                });
            },
            onComplete: () => {
                removeExtraSlide(slider);
            }
        });

        // gsap.to(".slide-content h1", {
        //   scale: 1,
        //   duration: 1.5,
        //   ease: "power4.inOut"
        // });

        function removeExtraSlide(container) {
            while (container.children.length > 5) {
                container.removeChild(container.firstChild);
            }
        }





    });


// Matter js Section 5


let Imagediv = document.querySelector('.Image');
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const ImageCanvas = document.querySelector('.imgCanvas');

let engine;
let itemsImage = [];
let boundaries = [];
let lastMouseX = -1;
let lastMouseY = -1;

function setup() {
    let p5Canvas = createCanvas(window.innerWidth, window.innerHeight);
    p5Canvas.parent(ImageCanvas);
    engine = Engine.create();
    engine.world.gravity.y = 0;

    addBoundaries();

    addItem();
}

function addItem(){
     // Remove existing items
     itemsImage.forEach(item => {
        World.remove(engine.world, item.body);
        item.div.remove();
    });

 itemsImage = [];
    if (window.innerWidth < 600) {
        for (let i = 0; i < 7; i++) {
            let x = random(100, width - 100);
            let y = random(100, height - 100);
            itemsImage.push(new Item(x, y, `./Assets/Images/Img${i + 1}.webp`));
        }
    } else {
        for (let i = 0; i < 13; i++) {
            let x = random(100, width - 100);
            let y = random(100, height - 100);
            itemsImage.push(new Item(x, y, `./Assets/Images/Img${i + 1}.webp`));
        }
    }
}

function addBoundaries() {
    const thickness = 50;
    boundaries = [
        Bodies.rectangle(width / 2, -thickness / 2, width, thickness, { isStatic: true }),
        Bodies.rectangle(width / 2, height + thickness / 2, width, thickness, { isStatic: true }),
        Bodies.rectangle(-thickness / 2, height / 2, thickness, height, { isStatic: true }),
        Bodies.rectangle(width + thickness / 2, height / 2, thickness, height, { isStatic: true })
    ];
    World.add(engine.world, boundaries);
}

function removeBoundaries() {
    World.remove(engine.world, boundaries);
}

function draw() {
    background("black");
    Engine.update(engine);
    itemsImage.forEach((item) => item.update());
}

class Item {
    constructor(x, y, imagePath) {
        let options = {
            frictionAir: 0.075,
            restitution: 0.25,
            density: 0.002,
            angle: Math.random() * Math.PI * 2
        };

        this.body = Bodies.rectangle(x, y, 100, 200, options);
        World.add(engine.world, this.body);

        this.div = document.createElement('div');
        this.div.className = "item";
        this.div.style.left = `${this.body.position.x - 50}px`;
        this.div.style.top = `${this.body.position.y - 100}px`;
        const img = document.createElement("img");
        img.src = imagePath;
        this.div.appendChild(img);
        Imagediv.appendChild(this.div);
    }

    update() {
        this.div.style.left = `${this.body.position.x - 50}px`;
        this.div.style.top = `${this.body.position.y - 100}px`;
        this.div.style.transform = `rotate(${this.body.angle}rad)`;
    }
}

function mouseMoved() {
    if (dist(mouseX, mouseY, lastMouseX, lastMouseY) > 10) {
        lastMouseX = mouseX;
        lastMouseY = mouseY;

        itemsImage.forEach((item) => {
            if (dist(mouseX, mouseY, item.body.position.x, item.body.position.y) < 150) {
                let forceMagnitude = 3;
                Body.applyForce(
                    item.body,
                    { x: item.body.position.x, y: item.body.position.y },
                    { x: random(-forceMagnitude, forceMagnitude), y: random(-forceMagnitude, forceMagnitude) }
                );
            }
        });
    }
}

function windowResized() {
    resizeCanvas(window.innerWidth, window.innerHeight);
    removeBoundaries();
    addBoundaries();
    addItem();
    itemsImage.forEach((item) => {
        Body.setPosition(item.body, {
            x: random(100, width - 100),
            y: random(100, height - 100)
        });
    });
}

window.addEventListener('resize', windowResized);

window.setup = setup;
window.draw = draw;
window.mouseMoved = mouseMoved;
window.windowResized = windowResized;

 

 // Frame Animation 

 function frameAnimation() {
    const frameCanvas = document.querySelector('.frame');
    const Context = frameCanvas.getContext('2d');

    frameCanvas.width = window.innerWidth;
    frameCanvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        frameCanvas.width = window.innerWidth;
        frameCanvas.height = window.innerHeight;

        render();
    })


    function files(index) {
        let data = `./Assets/Video/Frames/0001.jpg
./Assets/Video/Frames/0002.jpg
./Assets/Video/Frames/0003.jpg
./Assets/Video/Frames/0004.jpg
./Assets/Video/Frames/0005.jpg
./Assets/Video/Frames/0006.jpg
./Assets/Video/Frames/0007.jpg
./Assets/Video/Frames/0008.jpg
./Assets/Video/Frames/0009.jpg
./Assets/Video/Frames/0010.jpg
./Assets/Video/Frames/0011.jpg
./Assets/Video/Frames/0012.jpg
./Assets/Video/Frames/0013.jpg
./Assets/Video/Frames/0014.jpg
./Assets/Video/Frames/0015.jpg
./Assets/Video/Frames/0016.jpg
./Assets/Video/Frames/0017.jpg
./Assets/Video/Frames/0018.jpg
./Assets/Video/Frames/0019.jpg
./Assets/Video/Frames/0020.jpg
./Assets/Video/Frames/0021.jpg
./Assets/Video/Frames/0022.jpg
./Assets/Video/Frames/0023.jpg
./Assets/Video/Frames/0024.jpg
./Assets/Video/Frames/0025.jpg
./Assets/Video/Frames/0026.jpg
./Assets/Video/Frames/0027.jpg
./Assets/Video/Frames/0028.jpg
./Assets/Video/Frames/0029.jpg
./Assets/Video/Frames/0030.jpg
./Assets/Video/Frames/0031.jpg
./Assets/Video/Frames/0032.jpg
./Assets/Video/Frames/0033.jpg
./Assets/Video/Frames/0034.jpg
./Assets/Video/Frames/0035.jpg
./Assets/Video/Frames/0036.jpg
./Assets/Video/Frames/0037.jpg
./Assets/Video/Frames/0038.jpg
./Assets/Video/Frames/0039.jpg
./Assets/Video/Frames/0040.jpg
./Assets/Video/Frames/0041.jpg
./Assets/Video/Frames/0042.jpg
./Assets/Video/Frames/0043.jpg
./Assets/Video/Frames/0044.jpg
./Assets/Video/Frames/0045.jpg
./Assets/Video/Frames/0046.jpg
./Assets/Video/Frames/0047.jpg
./Assets/Video/Frames/0048.jpg
./Assets/Video/Frames/0049.jpg
./Assets/Video/Frames/0050.jpg
./Assets/Video/Frames/0051.jpg
./Assets/Video/Frames/0052.jpg
./Assets/Video/Frames/0053.jpg
./Assets/Video/Frames/0054.jpg
./Assets/Video/Frames/0055.jpg
./Assets/Video/Frames/0056.jpg
./Assets/Video/Frames/0057.jpg
./Assets/Video/Frames/0058.jpg
./Assets/Video/Frames/0059.jpg
./Assets/Video/Frames/0060.jpg
./Assets/Video/Frames/0061.jpg
./Assets/Video/Frames/0062.jpg
./Assets/Video/Frames/0063.jpg
./Assets/Video/Frames/0064.jpg
./Assets/Video/Frames/0065.jpg
./Assets/Video/Frames/0066.jpg
./Assets/Video/Frames/0067.jpg
./Assets/Video/Frames/0068.jpg
./Assets/Video/Frames/0069.jpg
./Assets/Video/Frames/0070.jpg
./Assets/Video/Frames/0071.jpg
./Assets/Video/Frames/0072.jpg
./Assets/Video/Frames/0073.jpg
./Assets/Video/Frames/0074.jpg
./Assets/Video/Frames/0075.jpg
./Assets/Video/Frames/0076.jpg
./Assets/Video/Frames/0077.jpg
./Assets/Video/Frames/0078.jpg
./Assets/Video/Frames/0079.jpg
./Assets/Video/Frames/0080.jpg
./Assets/Video/Frames/0081.jpg
./Assets/Video/Frames/0082.jpg
./Assets/Video/Frames/0083.jpg
./Assets/Video/Frames/0084.jpg
./Assets/Video/Frames/0085.jpg
./Assets/Video/Frames/0086.jpg
./Assets/Video/Frames/0087.jpg
./Assets/Video/Frames/0088.jpg
./Assets/Video/Frames/0089.jpg
./Assets/Video/Frames/0090.jpg
./Assets/Video/Frames/0091.jpg
./Assets/Video/Frames/0092.jpg
./Assets/Video/Frames/0093.jpg
./Assets/Video/Frames/0094.jpg
./Assets/Video/Frames/0095.jpg
./Assets/Video/Frames/0096.jpg
./Assets/Video/Frames/0097.jpg
./Assets/Video/Frames/0098.jpg
./Assets/Video/Frames/0099.jpg
./Assets/Video/Frames/0100.jpg
./Assets/Video/Frames/0101.jpg
./Assets/Video/Frames/0102.jpg
./Assets/Video/Frames/0103.jpg
./Assets/Video/Frames/0104.jpg
./Assets/Video/Frames/0105.jpg
./Assets/Video/Frames/0106.jpg
./Assets/Video/Frames/0107.jpg
./Assets/Video/Frames/0108.jpg
./Assets/Video/Frames/0109.jpg
./Assets/Video/Frames/0110.jpg
./Assets/Video/Frames/0111.jpg
./Assets/Video/Frames/0112.jpg
./Assets/Video/Frames/0113.jpg
./Assets/Video/Frames/0114.jpg
./Assets/Video/Frames/0115.jpg
./Assets/Video/Frames/0116.jpg
./Assets/Video/Frames/0117.jpg
./Assets/Video/Frames/0118.jpg
./Assets/Video/Frames/0119.jpg
./Assets/Video/Frames/0120.jpg
./Assets/Video/Frames/0121.jpg
./Assets/Video/Frames/0122.jpg
./Assets/Video/Frames/0123.jpg
./Assets/Video/Frames/0124.jpg
./Assets/Video/Frames/0125.jpg
./Assets/Video/Frames/0126.jpg
./Assets/Video/Frames/0127.jpg
./Assets/Video/Frames/0128.jpg
./Assets/Video/Frames/0129.jpg
./Assets/Video/Frames/0130.jpg
./Assets/Video/Frames/0131.jpg
./Assets/Video/Frames/0132.jpg
./Assets/Video/Frames/0133.jpg
./Assets/Video/Frames/0134.jpg
./Assets/Video/Frames/0135.jpg
./Assets/Video/Frames/0136.jpg
./Assets/Video/Frames/0137.jpg
./Assets/Video/Frames/0138.jpg
./Assets/Video/Frames/0139.jpg
./Assets/Video/Frames/0140.jpg
./Assets/Video/Frames/0141.jpg
./Assets/Video/Frames/0142.jpg
./Assets/Video/Frames/0143.jpg
./Assets/Video/Frames/0144.jpg
./Assets/Video/Frames/0145.jpg
./Assets/Video/Frames/0146.jpg
./Assets/Video/Frames/0147.jpg
./Assets/Video/Frames/0148.jpg
./Assets/Video/Frames/0149.jpg
./Assets/Video/Frames/0150.jpg
./Assets/Video/Frames/0151.jpg
./Assets/Video/Frames/0152.jpg
./Assets/Video/Frames/0153.jpg
./Assets/Video/Frames/0154.jpg
./Assets/Video/Frames/0155.jpg
./Assets/Video/Frames/0156.jpg
./Assets/Video/Frames/0157.jpg
./Assets/Video/Frames/0158.jpg
./Assets/Video/Frames/0159.jpg
./Assets/Video/Frames/0160.jpg
./Assets/Video/Frames/0161.jpg
./Assets/Video/Frames/0162.jpg
./Assets/Video/Frames/0163.jpg
./Assets/Video/Frames/0164.jpg
./Assets/Video/Frames/0165.jpg
./Assets/Video/Frames/0166.jpg
./Assets/Video/Frames/0167.jpg
./Assets/Video/Frames/0168.jpg
./Assets/Video/Frames/0169.jpg
./Assets/Video/Frames/0170.jpg
./Assets/Video/Frames/0171.jpg
./Assets/Video/Frames/0172.jpg
./Assets/Video/Frames/0173.jpg
./Assets/Video/Frames/0174.jpg
./Assets/Video/Frames/0175.jpg
./Assets/Video/Frames/0176.jpg
./Assets/Video/Frames/0177.jpg
./Assets/Video/Frames/0178.jpg
./Assets/Video/Frames/0179.jpg
./Assets/Video/Frames/0180.jpg
./Assets/Video/Frames/0181.jpg
./Assets/Video/Frames/0182.jpg
./Assets/Video/Frames/0183.jpg
./Assets/Video/Frames/0184.jpg
./Assets/Video/Frames/0185.jpg
./Assets/Video/Frames/0186.jpg
./Assets/Video/Frames/0187.jpg
./Assets/Video/Frames/0188.jpg
./Assets/Video/Frames/0189.jpg
./Assets/Video/Frames/0190.jpg
./Assets/Video/Frames/0191.jpg
./Assets/Video/Frames/0192.jpg
./Assets/Video/Frames/0193.jpg
./Assets/Video/Frames/0194.jpg
./Assets/Video/Frames/0195.jpg
./Assets/Video/Frames/0196.jpg
./Assets/Video/Frames/0197.jpg
./Assets/Video/Frames/0198.jpg
./Assets/Video/Frames/0199.jpg
./Assets/Video/Frames/0200.jpg
./Assets/Video/Frames/0201.jpg
./Assets/Video/Frames/0202.jpg
./Assets/Video/Frames/0203.jpg
./Assets/Video/Frames/0204.jpg
./Assets/Video/Frames/0205.jpg
./Assets/Video/Frames/0206.jpg
./Assets/Video/Frames/0207.jpg
./Assets/Video/Frames/0208.jpg
./Assets/Video/Frames/0209.jpg
./Assets/Video/Frames/0210.jpg
./Assets/Video/Frames/0211.jpg
./Assets/Video/Frames/0212.jpg
./Assets/Video/Frames/0213.jpg
./Assets/Video/Frames/0214.jpg
./Assets/Video/Frames/0215.jpg
./Assets/Video/Frames/0216.jpg
./Assets/Video/Frames/0217.jpg
./Assets/Video/Frames/0218.jpg
./Assets/Video/Frames/0219.jpg
./Assets/Video/Frames/0220.jpg
./Assets/Video/Frames/0221.jpg
./Assets/Video/Frames/0222.jpg
./Assets/Video/Frames/0223.jpg
./Assets/Video/Frames/0224.jpg
./Assets/Video/Frames/0225.jpg
./Assets/Video/Frames/0226.jpg
./Assets/Video/Frames/0227.jpg
./Assets/Video/Frames/0228.jpg
./Assets/Video/Frames/0229.jpg
./Assets/Video/Frames/0230.jpg
./Assets/Video/Frames/0231.jpg
./Assets/Video/Frames/0232.jpg
./Assets/Video/Frames/0233.jpg
./Assets/Video/Frames/0234.jpg
./Assets/Video/Frames/0235.jpg
./Assets/Video/Frames/0236.jpg
./Assets/Video/Frames/0237.jpg
./Assets/Video/Frames/0238.jpg
./Assets/Video/Frames/0239.jpg
./Assets/Video/Frames/0240.jpg
./Assets/Video/Frames/0241.jpg
./Assets/Video/Frames/0242.jpg
./Assets/Video/Frames/0243.jpg
./Assets/Video/Frames/0244.jpg
./Assets/Video/Frames/0245.jpg
./Assets/Video/Frames/0246.jpg
./Assets/Video/Frames/0247.jpg
./Assets/Video/Frames/0248.jpg
./Assets/Video/Frames/0249.jpg
./Assets/Video/Frames/0250.jpg
./Assets/Video/Frames/0251.jpg
./Assets/Video/Frames/0252.jpg
./Assets/Video/Frames/0253.jpg
./Assets/Video/Frames/0254.jpg
./Assets/Video/Frames/0255.jpg
./Assets/Video/Frames/0256.jpg
./Assets/Video/Frames/0257.jpg
./Assets/Video/Frames/0258.jpg
./Assets/Video/Frames/0259.jpg
./Assets/Video/Frames/0260.jpg
./Assets/Video/Frames/0261.jpg
./Assets/Video/Frames/0262.jpg
./Assets/Video/Frames/0263.jpg
./Assets/Video/Frames/0264.jpg
./Assets/Video/Frames/0265.jpg
./Assets/Video/Frames/0266.jpg
./Assets/Video/Frames/0267.jpg
./Assets/Video/Frames/0268.jpg
./Assets/Video/Frames/0269.jpg
./Assets/Video/Frames/0270.jpg
./Assets/Video/Frames/0271.jpg
./Assets/Video/Frames/0272.jpg
./Assets/Video/Frames/0273.jpg
./Assets/Video/Frames/0274.jpg
./Assets/Video/Frames/0275.jpg
./Assets/Video/Frames/0276.jpg
./Assets/Video/Frames/0277.jpg
./Assets/Video/Frames/0278.jpg
./Assets/Video/Frames/0279.jpg
./Assets/Video/Frames/0280.jpg
./Assets/Video/Frames/0281.jpg
./Assets/Video/Frames/0282.jpg
./Assets/Video/Frames/0283.jpg
./Assets/Video/Frames/0284.jpg
./Assets/Video/Frames/0285.jpg
./Assets/Video/Frames/0286.jpg
./Assets/Video/Frames/0287.jpg
./Assets/Video/Frames/0288.jpg
./Assets/Video/Frames/0289.jpg
./Assets/Video/Frames/0290.jpg
./Assets/Video/Frames/0291.jpg
./Assets/Video/Frames/0292.jpg
./Assets/Video/Frames/0293.jpg
./Assets/Video/Frames/0294.jpg
./Assets/Video/Frames/0295.jpg
./Assets/Video/Frames/0296.jpg
./Assets/Video/Frames/0297.jpg
./Assets/Video/Frames/0298.jpg
./Assets/Video/Frames/0299.jpg
./Assets/Video/Frames/0300.jpg
./Assets/Video/Frames/0301.jpg
./Assets/Video/Frames/0302.jpg
./Assets/Video/Frames/0303.jpg
./Assets/Video/Frames/0304.jpg
./Assets/Video/Frames/0305.jpg
./Assets/Video/Frames/0306.jpg
./Assets/Video/Frames/0307.jpg
./Assets/Video/Frames/0308.jpg
./Assets/Video/Frames/0309.jpg
./Assets/Video/Frames/0310.jpg
./Assets/Video/Frames/0311.jpg
./Assets/Video/Frames/0312.jpg
./Assets/Video/Frames/0313.jpg
./Assets/Video/Frames/0314.jpg
./Assets/Video/Frames/0315.jpg
./Assets/Video/Frames/0316.jpg
./Assets/Video/Frames/0317.jpg
./Assets/Video/Frames/0318.jpg
./Assets/Video/Frames/0319.jpg
./Assets/Video/Frames/0320.jpg
./Assets/Video/Frames/0321.jpg
./Assets/Video/Frames/0322.jpg
./Assets/Video/Frames/0323.jpg
./Assets/Video/Frames/0324.jpg
./Assets/Video/Frames/0325.jpg
./Assets/Video/Frames/0326.jpg
./Assets/Video/Frames/0327.jpg
./Assets/Video/Frames/0328.jpg
./Assets/Video/Frames/0329.jpg
./Assets/Video/Frames/0330.jpg
./Assets/Video/Frames/0331.jpg
./Assets/Video/Frames/0332.jpg
./Assets/Video/Frames/0333.jpg
./Assets/Video/Frames/0334.jpg
./Assets/Video/Frames/0335.jpg
./Assets/Video/Frames/0336.jpg
./Assets/Video/Frames/0337.jpg
./Assets/Video/Frames/0338.jpg
./Assets/Video/Frames/0339.jpg
./Assets/Video/Frames/0340.jpg
./Assets/Video/Frames/0341.jpg
./Assets/Video/Frames/0342.jpg
./Assets/Video/Frames/0343.jpg
./Assets/Video/Frames/0344.jpg
./Assets/Video/Frames/0345.jpg
./Assets/Video/Frames/0346.jpg
./Assets/Video/Frames/0347.jpg
./Assets/Video/Frames/0348.jpg
./Assets/Video/Frames/0349.jpg
./Assets/Video/Frames/0350.jpg
./Assets/Video/Frames/0351.jpg
./Assets/Video/Frames/0352.jpg
./Assets/Video/Frames/0353.jpg
./Assets/Video/Frames/0354.jpg
./Assets/Video/Frames/0355.jpg
./Assets/Video/Frames/0356.jpg
./Assets/Video/Frames/0357.jpg
./Assets/Video/Frames/0358.jpg`

        return data.split('\n')[index];
    }

    const frameCount = 358;

    const images = [];

    const imageSequence = {
        frame: 0
    }

    for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = files(i);
        images.push(img);
    }

    function scaleImg(img, cttxt) {
        let canv = cttxt.canvas;
        let hRatio = canv.width / img.width;
        let vRatio = canv.height / img.height;

        let Ratio = Math.max(hRatio, vRatio);

        let centerShift_x = (canv.width - img.width * Ratio) / 2;
        let centerShift_y = (canv.height - img.height * Ratio) / 2;

        cttxt.clearRect(0, 0, canv.width, canv.height);

        cttxt.drawImage(img, 0, 0, img.width, img.height, centerShift_x, centerShift_y, img.width * Ratio, img.height * Ratio);
    }


    function render() {
        scaleImg(images[imageSequence.frame], Context);
    }

    images[0].onload = render;

    function paraTospan() {
        let para = document.querySelector('.lastDiv h1');

        let htmlString = "";
        let pArr = para.textContent.split("");
        // console.log(pArr);
        for (let i = 0; i < pArr.length; i++) {
            htmlString += `<span>${pArr[i]}</span>`;
        }

        para.innerHTML = htmlString
    }

    paraTospan()

    let Tl = gsap.timeline({
        scrollTrigger: {
            // markers: true,
            trigger: '.page2',
            scroller:'#main',
            start: "55% 10%",
            end: '85% 10%',
            scrub: true,
            // pin: true
        }
    });
    let Tl2 = gsap.timeline({
        scrollTrigger: {
            // markers: true,       
            trigger: '.page2',
            scroller:'#main',
            start: "80% 0%",
            end: 'bottom 0%',
            scrub: true,
            // pin: true
        }
    });


    Tl2.to(".lastDiv h1 span", {
        y: "-10%",
        opacity: 1,
        duration: 2,
        stagger: .1,
        ease: "slow(0.7,0.7,false)",
    })


    Tl.fromTo(".oneleft h1", { y: '200%' }, { y: '0%', duration: 1.5, ease: 'power1.out' }, 0)
        .fromTo(".oneright h1", { y: '200%' }, { y: '0%', duration: 1.5, ease: 'power1.out' }, 0)
        .to(".oneleft h1", { y: '-200%', duration: 1, ease: 'power1.in' }, "+=1")
        .to(".oneright h1", { y: '-200%', duration: 1, ease: 'power1.in' }, "-=1");

    gsap.to(imageSequence, {
        frame: frameCount - 1,
        snap: 'frame',
        ease: "none",
        scrollTrigger: {
            // markers: true,
            scrub: true,
            scroller:'#main',
            trigger: ".page2 canvas",
            start: "top 0% ",
            end: "bottom 0%",

        },
        onUpdate: render,
    });

    gsap.to(".page2 canvas", {
        scrollTrigger: {
            scrub: 2,
            trigger: ".page2",
            start: "bottom 0%",
            ease: "none",
            scroller:'#main',
            // pin:true

        }
    })


    ScrollTrigger.create({
        trigger: ".page2",
        pin: true,
        start: "bottom 100%",
        scroller:'#main',
    })


}


frameAnimation();

 
// // footer Background
// const blocksContainer = document.querySelector('.blocks');
// const blockSize = 50;
// const screenWidth = window.innerWidth;
// const screenHeight = window.innerHeight;
// const numCols = Math.ceil(screenWidth / blockSize);
// const numRows = Math.ceil(screenHeight / blockSize);
// const numBlocks = numCols * numRows;

// function createBlocks() {
//     for (let i = 0; i < numBlocks; i++) {
//         const block = document.createElement("div");
//         block.classList.add("newBlock");
//         block.dataset.index = i;
//         block.addEventListener('mousemove', highlightNeighbour);
//         blocksContainer.appendChild(block);
//     }
// }

// function highlightNeighbour() {
//     const index = parseInt(this.dataset.index);
//     const neighbour = [
//         index - 1,
//         index + 1,
//         index - numCols,
//         index + numCols,
//         index - numCols - 1,
//         index - numCols + 1,
//         index + numCols - 1,
//         index + numCols + 1,
//     ].filter((i) => i >= 0 && i < numBlocks && Math.abs((i % numCols) - (index % numCols)) <= 1);

//     this.classList.add("highlight");
//     setTimeout(() => {
//         this.classList.remove("highlight");
//     }, 500);

//     shuffleArray(neighbour).slice(0, 1).forEach((nIndex) => {
//         const neighbor = blocksContainer.children[nIndex];
//         if (neighbor) {
//             neighbor.classList.add("highlight");
//             setTimeout(() => {
//                 neighbor.classList.remove("highlight");
//             }, 500);
//         }
//     });
// }

// function shuffleArray(array) {
//     for (let i = array.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [array[i], array[j]] = [array[j], array[i]];
//     }
//     return array;
// }

// createBlocks();


// footer Background
const blocksContainer = document.querySelector('.blocks');
const blockSize = 50;
const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;
const numCols = Math.ceil(screenWidth / blockSize);
const numRows = Math.ceil(screenHeight / blockSize);
const numBlocks = numCols * numRows;

function createBlocks() {
    for (let i = 0; i < numBlocks; i++) {
        const block = document.createElement("div");
        block.classList.add("newBlock");
        block.dataset.index = i;
        block.addEventListener('mousemove', highlightNeighbour);
        blocksContainer.appendChild(block);
    }
}

function highlightNeighbour() {
    const index = parseInt(this.dataset.index);
    const neighbour = [
        index - 1,
        index + 1,
        index - numCols,
        index + numCols,
        index - numCols - 1,
        index - numCols + 1,
        index + numCols - 1,
        index + numCols + 1,
    ].filter((i) => i >= 0 && i < numBlocks && Math.abs((i % numCols) - (index % numCols)) <= 1);

    this.classList.add("highlight");
    setTimeout(() => {
        this.classList.remove("highlight");
    }, 500);

    shuffleArray(neighbour).slice(0, 1).forEach((nIndex) => {
        const neighbor = blocksContainer.children[nIndex];
        if (neighbor) {
            neighbor.classList.add("highlight");
            setTimeout(() => {
                neighbor.classList.remove("highlight");
            }, 500);
        }
    });
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

createBlocks();

 
})