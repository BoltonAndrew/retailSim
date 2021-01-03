let camera = document.querySelector("#camera");
let map = document.querySelector("#map");
let player = document.querySelector("#player");
let playerImg = document.querySelector("#playerImg");
let mapRect = map.getBoundingClientRect();

let x = 88;
let y = 30;
let directions = [];
let speed = 1;



const placeCharacter = () => {
    let pixelSize = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--pixelSize')
        );
    
    const direction = directions[0];
    if (direction) {
        if (direction === heldDirections.right) {
            if (x <= 135) {
                if (y >= 30 && y <= 205) {
                    x += speed;
                }
            }
        }
        if (direction === heldDirections.left) {
            if (x >= -8) {
                if (y >= 30 && y <= 205) {
                    if (y <= 81 && y >= 63 && x >= 88 || y <= 63 || y >= 170 && x >= 40) {
                        x -= speed;
                    } else if (y >= 81 && y <= 170 && x >= 104) {
                        x -= speed;
                    }
                }
                
            }
        }
        if (direction === heldDirections.down) {
            if (y <= 220) {
                if (y <= 62 && x <= 88 || x >= 87 && x <= 104 && y <= 80 || x >= 103 && y <= 204 || x >= 39 && y >= 170 && y <= 204 || x > 70 && x < 74 && y > 170) {
                    y += speed;
                }
            }
        }
        if (direction === heldDirections.up) {
            if (y > 9) {
                if (y < 40 && x > 86 && x < 90 || y > 170 && x < 105 || y > 30 && x > 105 || y > 30 && y < 170) {
                    y -= speed;
                }
            }
        }
        playerImg.setAttribute("facing", direction);
        console.log(x, y)
    }
    playerImg.setAttribute("walking", direction ? "true" : "false");
    let cameraLeft = innerWidth / 2 - (pixelSize * 32);
    let cameraTop = innerHeight / 2 - (pixelSize * 32);
    map.style.transform = `translate3d( ${-x*pixelSize+cameraLeft}px, ${-y*pixelSize+cameraTop}px, 0 )`;
    player.style.transform = `translate3d( ${x*pixelSize}px, ${y*pixelSize}px, 0 )`;
}

const gameLoop = () => {
    placeCharacter();
    window.requestAnimationFrame(() => {
        gameLoop();
    })
}
gameLoop();

const heldDirections = {
    up: "up",
    down: "down",
    left: "left",
    right: "right"
}

const keys = {
    38: heldDirections.up,
    37: heldDirections.left,
    39: heldDirections.right,
    40: heldDirections.down
}

document.addEventListener("keydown", (e) => {
    let dir = keys[e.which];
    if (dir && directions.indexOf(dir) === -1) {
        directions.unshift(dir)
    }
})

document.addEventListener("keyup", (e) => {
    let dir = keys[e.which];
    let index = directions.indexOf(dir);
    if (index > -1) {
        directions.splice(index, 1)
    }
});