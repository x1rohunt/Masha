const config = {
  type: Phaser.AUTO,
  width: 360,
  height: 640,
  backgroundColor: 0xfff0f5,
  parent: 'phaser-game',
  scene: {
    preload,
    create,
    update
  }
};

const game = new Phaser.Game(config);

let currentScene = 0;
let choices = [];
let textDisplay;
let buttons = [];

const scenesData = [
  {
    text: "Вечер. Мы вдвоём. Что делаем?",
    options: [
      { img: 'divan', text: "Остаться дома", effect: "bgWarm" },
      { img: 'street', text: "Пойти гулять", effect: "bgCool" }
    ]
  },
  {
    text: "Хочется чего-то простого.",
    options: [
      { img: 'tea', text: "Чай", effect: null },
      { img: 'chocolate', text: "Что-то сладкое", effect: null }
    ]
  },
  {
    text: "Музыка?",
    options: [
      { img: 'music_slow', text: "Спокойная", effect: null },
      { img: 'music_fun', text: "Весёлая", effect: null }
    ]
  }
];

function preload() {
  this.load.image('divan', 'assets/divan.png');
  this.load.image('street', 'assets/street.png');
  this.load.image('tea', 'assets/tea.png');
  this.load.image('chocolate', 'assets/chocolate.png');
  this.load.image('music_slow', 'assets/music_slow.png');
  this.load.image('music_fun', 'assets/music_fun.png');
}

function create() {
  showScene(this);
}

function showScene(scene) {
  // очистка предыдущих
  buttons.forEach(b => b.destroy());
  buttons = [];
  if (textDisplay) textDisplay.destroy();

  if (currentScene >= scenesData.length) {
    showFinal(scene);
    return;
  }

  const data = scenesData[currentScene];

  textDisplay = scene.add.text(180, 50, data.text, {
    font: "20px Arial",
    fill: "#000",
    wordWrap: { width: 320, useAdvancedWrap: true },
    align: "center"
  }).setOrigin(0.5);

  const startX = 90;
  const startY = 200;
  const spacing = 180;

  data.options.forEach((opt, index) => {
    const btn = scene.add.image(startX + spacing*index, startY, opt.img).setInteractive();
    btn.on('pointerdown', () => {
      applyEffect(opt.effect, scene);
      currentScene++;
      showScene(scene);
    });
    buttons.push(btn);

    const btnText = scene.add.text(btn.x, btn.y + 60, opt.text, {
      font: "16px Arial",
      fill: "#000"
    }).setOrigin(0.5);
    buttons.push(btnText);
  });
}

function applyEffect(effect, scene) {
  if (effect === "bgWarm") {
    scene.cameras.main.setBackgroundColor(0xffe4e1);
  } else if (effect === "bgCool") {
    scene.cameras.main.setBackgroundColor(0xe0ffff);
  }
}

function showFinal(scene) {
  buttons.forEach(b => b.destroy());
  if (textDisplay) textDisplay.destroy();

  scene.cameras.main.setBackgroundColor(0xfff0f5);

  const finalText = [
    "Знаешь…",
    "Дело не в выборе.",
    "А в том, что любой из них — с тобой.",
    "Я тебя люблю ❤️",
    "С 14 февраля"
  ];

  let y = 200;
  finalText.forEach((line, i) => {
    scene.time.delayedCall(i*1200, () => {
      scene.add.text(180, y, line, { font: "20px Arial", fill: "#000", align: "center" }).setOrigin(0.5);
      y += 40;
    });
  });
}

function update() {}
