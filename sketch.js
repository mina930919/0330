let colors = []; // 用於存儲每條線的顏色
let frequencies = []; // 用於存儲每條線的搖晃頻率
let positions = []; // 用於存儲每條線的隨機水平位置

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.style('position', 'absolute'); // 設置畫布為絕對定位
  canvas.style('z-index', '1'); // 設置畫布層級
  canvas.style('pointer-events', 'none'); // 禁止畫布攔截滑鼠事件
  clear(); // 確保畫布背景透明

  // 預先生成每條線的隨機顏色、頻率和水平位置
  let spacing = width / 35; // 計算每條線的基礎間距
  for (let i = 0; i < 35; i++) { // 將線條數改為 35
    colors.push(color(random(255), random(255), random(255), 100)); // 設置透明度為 100
    frequencies.push(random(0.2, 0.8)); // 為每條線生成隨機頻率因子

    // 為每條線生成隨機水平位置，允許部分線條重疊
    let basePosition = i * spacing;
    positions.push(basePosition + random(-spacing / 2, spacing / 2)); // 添加隨機偏移，允許重疊
  }
}

function draw() {
  clear(); // 清除畫布，保持透明背景

  blendMode(BLEND); // 啟用 BLEND 模式
  strokeWeight(20); // 設定線條寬度為 20
  noFill(); // 不填充形狀內部

  let time = millis() / 800; // 加快擺動速度（時間增量變大）
  for (let i = 0; i < 35; i++) { // 將線條數改為 35
    let x = positions[i]; // 使用預先生成的隨機水平位置
    let baseY = height; // 線條的底部固定在畫布底部

    // 使用預先生成的顏色
    stroke(colors[i]);

    // 使用 beginShape 和 endShape 繪製連續的線條
    beginShape();
    let currentX = x;
    let currentY = baseY;
    let frequency = frequencies[i]; // 獲取該線條的頻率因子
    for (let j = 1; j <= 30; j++) { // 增加節點數量
      let segmentLength = 10; // 減小每個節點之間的距離
      let offset = sin(time * frequency + j * 0.2) * 5; // 使用頻率因子調整振幅
      currentX += offset; // 計算當前節點的 x 座標
      currentY -= segmentLength; // 計算當前節點的 y 座標

      vertex(currentX, currentY); // 添加頂點到形狀
    }
    endShape();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}