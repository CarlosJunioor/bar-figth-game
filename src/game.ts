import Player from './classes/player'
import { MovingDirection } from './common/enum'

export default function startGame(canvas: HTMLCanvasElement): void {
  // Canvas general configuration
  canvas.width = 80 * 16 // 1280
  canvas.height = 80 * 9 // 720

  // Your context
  const canvasContext: CanvasRenderingContext2D = canvas.getContext('2d')

  document.getElementById('song').addEventListener("click", myFunction)

  let playlist = []
  playlist[0] = './public/assets/songs/BB.mp3'
  playlist[1] = './public/assets/songs/MIEDO.mp3'
  playlist[2] = './public/assets/songs/01. Traditions - 60 Miles North.mp3'
  playlist[3] = './public/assets/songs/02 Enatizo - La alegría de vivir.mp3'
  playlist[4] = './public/assets/songs/03 Enatizo - Quisiera.mp3'
  playlist[5] = './public/assets/songs/04 Enatizo - Amigo.mp3'
  playlist[6] = './public/assets/songs/05-NO.wav'
  playlist[7] = './public/assets/songs/06 Enatizo - La ciudad del pecado.mp3'
  playlist[8] = './public/assets/songs/07 Enatizo - Las calles.mp3'
  playlist[9] = './public/assets/songs/07_Fakebook.mp3'
  playlist[10] = './public/assets/songs/08 Enatizo - Yo maté a dios.mp3'
  playlist[11] = './public/assets/songs/12 Enatizo - Derrota.mp3'
  playlist[12] = './public/assets/songs/13 Enatizo - Un día feliz.mp3'
  playlist[13] = './public/assets/songs/15-Hardcore.mp3'
  playlist[14] = './public/assets/songs/2 - War With The Newts - Ass Moustache.wav'
  playlist[15] = './public/assets/songs/BB.mp3'
  playlist[17] = './public/assets/songs/ESCORPIO N.wav'
  playlist[18] = './public/assets/songs/Generation Lost.wav'
  playlist[19] = './public/assets/songs/Grito da Rua - Fazendo Inimigos mp3.mp3'
  playlist[20] = './public/assets/songs/IDOLO SINTETICO.mp3'
  playlist[21] = './public/assets/songs/MIEDO.mp3'
  playlist[22] = './public/assets/songs/Plasmatics - Bookies Club 870 Detroit, MI 20-9-80 - 1 - Tight Black Pants.mp3'
  playlist[23] = './public/assets/songs/Plasmatics - Bookies Club 870 Detroit, MI 20-9-80 - 10 - Living Dead.mp3'
  playlist[24] = './public/assets/songs/Plasmatics - Bookies Club 870 Detroit, MI 20-9-80 - 11 - Want You Baby.mp3'
  playlist[25] = './public/assets/songs/Plasmatics - Bookies Club 870 Detroit, MI 20-9-80 - 12 - Plasma Jam.mp3'
  playlist[27] = './public/assets/songs/Plasmatics - Bookies Club 870 Detroit, MI 20-9-80 - 13 - Want You Baby (Reprise).mp3'
  playlist[28] = './public/assets/songs/Plasmatics - Bookies Club 870 Detroit, MI 20-9-80 - 14 - Sometimes I.mp3'
  playlist[29] = './public/assets/songs/Plasmatics - Bookies Club 870 Detroit, MI 20-9-80 - 15 - Headbanger.mp3'
  playlist[30] = './public/assets/songs/Plasmatics - Bookies Club 870 Detroit, MI 20-9-80 - 16 - Nothing.mp3'
  playlist[31] = './public/assets/songs/Plasmatics - Bookies Club 870 Detroit, MI 20-9-80 - 17 - Corruption.mp3'
  playlist[32] = './public/assets/songs/Plasmatics - Bookies Club 870 Detroit, MI 20-9-80 - 18 - Butcher Baby.mp3'
  playlist[33] = './public/assets/songs/Plasmatics - Bookies Club 870 Detroit, MI 20-9-80 - 2 - Hitman.mp3'
  playlist[34] = './public/assets/songs/Plasmatics - Bookies Club 870 Detroit, MI 20-9-80 - 3 - Monkey Suit.mp3'
  playlist[35] = './public/assets/songs/Plasmatics - Bookies Club 870 Detroit, MI 20-9-80 - 4 - Squirm.mp3'
  playlist[36] = './public/assets/songs/Plasmatics - Bookies Club 870 Detroit, MI 20-9-80 - 5 - Wont You.mp3'
  playlist[37] = './public/assets/songs/Plasmatics - Bookies Club 870 Detroit, MI 20-9-80 - 6 - Test Tube Babies.mp3'
  playlist[38] = './public/assets/songs/Plasmatics - Bookies Club 870 Detroit, MI 20-9-80 - 7 - Fast Food Service.mp3'
  playlist[39] = './public/assets/songs/Plasmatics - Bookies Club 870 Detroit, MI 20-9-80 - 8 - Sex Junkie.mp3'
  playlist[40] = './public/assets/songs/Plasmatics - Bookies Club 870 Detroit, MI 20-9-80 - 9 - Concrete Shoes.mp3'
  playlist[41] = './public/assets/songs/Riot In The Discoteque.mp3'

   function myFunction() {
    const audio = document.querySelector("audio")
    let i = 0;
    audio.addEventListener('ended', function () {
      i = ++i < playlist.length ? i : 0;
      console.log(i)
      audio.src = playlist[i];
      audio.play();
    })
    audio.volume= 0.1;
    audio.loop = false;
    audio.src = playlist[getRandom(i)];
    console.log(getRandom());
    audio.play();
  } 

  function getRandom() {
    return Math.floor(Math.random()*playlist.length);
  }
  // Keyboard control
  const keys = {
    a: {
      pressed: false,
    },
    s: {
      pressed: false,
    },
    d: {
      pressed: false,
    },
    w: {
      pressed: false,
    },
    l: {
      pressed: false,
      hitCount: 1,
      cantHold: true,
    },
    Space: {
      pressed: false,
    },
  }

  // Hero Creation
  const player: Player = new Player({
    position: { x: 1000, y: 150 },
    context: canvasContext,
  })

  player.onAfterAttack = () => {
    keys.l.pressed = false
    if (player.isAttacking) {
      if (keys.l.hitCount >= 3) {
        keys.l.hitCount = 1
      } else {
        keys.l.hitCount++
      }
    }
  }

  // Background
  const background = new Image()
  background.src = '/assets/background.png'

  let elapsedGameFrames: number = 0
  let afterUpdateCallback: () => void = null

  function startAnimationFrame() {
    if (!canvasContext) return
    window.requestAnimationFrame(startAnimationFrame)

    // Clear canvas before add elements
    canvasContext.clearRect(0, 0, canvas.width, canvas.height)
    canvasContext.drawImage(background, 0, 0, canvas.width, canvas.height)

    // Draw a semi-transparent backround for a better contrast
    canvasContext.fillStyle = 'rgb(255,255,255, .1)'
    canvasContext.fillRect(0, 0, canvas.width, canvas.height)
    // The game begins here
    // - Player movement
    player.stop()

    if (keys.a.pressed) {
      player.move(MovingDirection.LEFT, keys.Space.pressed)
    } else if (keys.d.pressed) {
      player.move(MovingDirection.RIGHT, keys.Space.pressed)
    } else if (keys.w.pressed) {
      player.move(MovingDirection.TOP, keys.Space.pressed)
    } else if (keys.s.pressed) {
      player.move(MovingDirection.BOTTON, keys.Space.pressed)
    } else if (keys.l.pressed) {
      player.attack(keys.l.hitCount % 3 === 0)
    }

    player.update()
    elapsedGameFrames++

    // Clear the combo after some time
    if (elapsedGameFrames % 300 === 0) {
      keys.l.hitCount = 1
    }
  }

  startAnimationFrame()

  window.addEventListener('keydown', (event: KeyboardEvent) => {
    if (keys[event.key]) keys[event.key].pressed = true
    if (keys[event.code]) keys[event.code].pressed = true
  })

  window.addEventListener('keyup', (event: KeyboardEvent) => {
    if (keys[event.key]) {
      if (!keys[event.key].cantHold) {
        keys[event.key].pressed = false
      }
    }

    if (keys[event.code]) keys[event.code].pressed = false
  })
}
