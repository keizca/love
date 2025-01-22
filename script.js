var c = document.getElementById('alx');
var b = document.body;
var a = c.getContext('2d');

var e = [];
var h = [];
var WIDTH = c.width = window.innerWidth; // Responsif terhadap ukuran layar
var HEIGHT = c.height = window.innerHeight; // Responsif terhadap ukuran layar
var v = 4 + 2; // Mengurangi jumlah partikel lebih banyak
var R = Math.random;
var C = Math.cos;
var Y = 6.3;

for (var i = 0; i < Y; i += 0.2) 
  h.push([WIDTH / 2 + 210 * Math.pow(Math.sin(i), 3), 
    HEIGHT / 2 + 13 * -(15 * C(i) - 5 * C(2 * i) - 2 * C(3 * i) - C(4 * i))]);

for (var i = 0; i < Y; i += 0.4) 
  h.push([WIDTH / 2 + 150 * Math.pow(Math.sin(i), 3), 
    HEIGHT / 2 + 9 * -(15 * C(i) - 5 * C(2 * i) - 2 * C(3 * i) - C(4 * i))]);

for (var i = 0; i < Y; i += 0.8) 
  h.push([WIDTH / 2 + 90 * Math.pow(Math.sin(i), 3), 
    HEIGHT / 2 + 5 * -(15 * C(i) - 5 * C(2 * i) - 2 * C(3 * i) - C(4 * i))]);

for (var i = 0; i < v;) {
  var x = R() * WIDTH;
  var y = R() * HEIGHT;
  var H = 80 * (i / v) + Math.random() * 100;
  var S = 40 * R() + 60;
  var B = 60 * R() + 20;
  var f = [];
  for (var k = 0; k < v;) {
    f[k++] = {
      x: x,
      y: y,
      X: 0,
      Y: 0,
      R: 0.05 - k / v, // Ukuran partikel lebih kecil
      S: 0.5 + R(), // Kecepatan lebih kecil
      q: ~~(R() * v),
      D: 2 * (i % 2) - 1,
      F: 0.2 * R() + 0.7,
      f: "hsla(0, 10.50%, 53.10%, 0.60)" // Mengubah warna menjadi merah
    };
  }
  e[i++] = f;
}

function path(d) {
  a.fillStyle = d.f;
  a.beginPath();
  a.arc(d.x, d.y, d.R, 0, Y, 1);
  a.closePath();
  a.fill();
}

// Responsif dengan event resize
window.addEventListener('resize', function() {
  WIDTH = c.width = window.innerWidth;
  HEIGHT = c.height = window.innerHeight;
});

function animate() {
  a.fillStyle = "rgba(0,0,0,.2)";
  a.fillRect(0, 0, WIDTH, HEIGHT);
  for (var i = v; i--;) {
    var f = e[i];
    var u = f[0];
    var q = h[u.q];
    var D = u.x - q[0];
    var E = u.y - q[1];
    var G = Math.sqrt(D * D + E * E);
    if (10 > G) {
      if (0.95 < R()) {
        u.q = ~~(R() * v);
      } else {
        if (0.99 < R()) {
          u.D *= -1;
        }
        u.q += u.D;
        u.q %= v;
        if (0 > u.q) {
          u.q += v;
        }
      }
    }
    u.X += -D / G * u.S;
    u.Y += -E / G * u.S;
    u.x += u.X;
    u.y += u.Y;
    path(u);
    u.X *= u.F;
    u.Y *= u.F;
    for (var k = 0; k < v - 1;) {
      var T = f[k], N = f[++k];
      N.x -= 0.7 * (N.x - T.x);
      N.y -= 0.7 * (N.y - T.y);
      path(N);
    }
  }
  requestAnimationFrame(animate); // Gantikan setInterval dengan requestAnimationFrame
}

// Memulai animasi
animate();
