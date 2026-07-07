/* =====================================================
   Happy Birthday Sriparna — Script
   ===================================================== */
(function () {
  'use strict';

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------------------------------------------
     LOADER
  --------------------------------------------------- */
  window.addEventListener('load', function () {
    var loader = document.getElementById('loader');
    setTimeout(function () {
      if (loader) loader.classList.add('hide');
    }, 900);
  });

  /* ---------------------------------------------------
     FOOTER YEAR
  --------------------------------------------------- */
  var yearEl = document.getElementById('footerYear');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------------------------------------------------
     BACKGROUND SCENE GENERATION
  --------------------------------------------------- */
  function rand(min, max) { return Math.random() * (max - min) + min; }

  function buildStars() {
    var field = document.getElementById('starsField');
    if (!field) return;
    var count = window.innerWidth < 640 ? 26 : 46;
    for (var i = 0; i < count; i++) {
      var s = document.createElement('span');
      s.className = 'star';
      s.style.left = rand(0, 100) + '%';
      s.style.top = rand(0, 65) + '%';
      s.style.animationDelay = rand(0, 3.2) + 's';
      s.style.animationDuration = rand(2.4, 4.2) + 's';
      var size = rand(2, 4);
      s.style.width = size + 'px';
      s.style.height = size + 'px';
      field.appendChild(s);
    }
  }

  function buildSparkles() {
    var field = document.getElementById('sparklesField');
    if (!field) return;
    var glyphs = ['✨', '⋆', '✦', '·'];
    var count = window.innerWidth < 640 ? 12 : 22;
    for (var i = 0; i < count; i++) {
      var s = document.createElement('span');
      s.className = 'sparkle';
      s.textContent = glyphs[Math.floor(rand(0, glyphs.length))];
      s.style.left = rand(0, 100) + '%';
      s.style.top = rand(0, 100) + '%';
      s.style.animationDelay = rand(0, 2.4) + 's';
      s.style.animationDuration = rand(1.8, 3.4) + 's';
      s.style.fontSize = rand(0.7, 1.3) + 'rem';
      field.appendChild(s);
    }
  }

  var heartsField = document.getElementById('heartsField');
  function spawnFloatyHeart() {
    if (!heartsField) return;
    var glyphs = ['💗', '💕', '💖', '💓'];
    var h = document.createElement('span');
    h.className = 'floaty-heart';
    h.textContent = glyphs[Math.floor(rand(0, glyphs.length))];
    h.style.left = rand(2, 96) + '%';
    h.style.fontSize = rand(0.9, 1.7) + 'rem';
    var dur = rand(9, 16);
    h.style.animationDuration = dur + 's';
    heartsField.appendChild(h);
    setTimeout(function () { h.remove(); }, dur * 1000 + 200);
  }

  var petalsField = document.getElementById('petalsField');
  function spawnPetal() {
    if (!petalsField) return;
    var p = document.createElement('span');
    p.className = 'petal';
    p.style.left = rand(0, 100) + '%';
    var dur = rand(10, 18);
    p.style.animationDuration = dur + 's';
    p.style.opacity = rand(0.4, 0.85);
    petalsField.appendChild(p);
    setTimeout(function () { p.remove(); }, dur * 1000 + 200);
  }

  function buildButterflies() {
    var field = document.getElementById('butterfliesField');
    if (!field) return;
    var colors = ['🦋'];
    var count = window.innerWidth < 640 ? 2 : 4;
    for (var i = 0; i < count; i++) {
      var b = document.createElement('span');
      b.className = 'butterfly';
      b.innerHTML = '<span>' + colors[0] + '</span>';
      b.style.left = rand(5, 85) + '%';
      b.style.top = rand(15, 70) + '%';
      b.style.animationDuration = rand(16, 26) + 's';
      b.style.animationDelay = rand(0, 6) + 's';
      field.appendChild(b);
    }
  }

  var balloonsField = document.getElementById('balloonsField');
  var balloonColors = [
    ['#ffc2d9', '#f2a4c3'],
    ['#e6d9f7', '#c9a8ea'],
    ['#ffe3d1', '#ffc9a0'],
    ['#ffd7e6', '#ff9dc0']
  ];
  function spawnBalloon() {
    if (!balloonsField) return;
    var b = document.createElement('span');
    b.className = 'balloon';
    var c = balloonColors[Math.floor(rand(0, balloonColors.length))];
    b.style.background = 'linear-gradient(160deg,' + c[0] + ',' + c[1] + ')';
    b.style.left = rand(4, 90) + '%';
    var dur = rand(14, 22);
    b.style.animationDuration = dur + 's';
    var scale = rand(0.7, 1.15);
    b.style.transform = 'scale(' + scale + ')';
    balloonsField.appendChild(b);
    setTimeout(function () { b.remove(); }, dur * 1000 + 200);
  }

  buildStars();
  buildSparkles();
  buildButterflies();

  if (!reduceMotion) {
    for (var i = 0; i < 6; i++) setTimeout(spawnFloatyHeart, i * 900);
    for (var j = 0; j < 5; j++) setTimeout(spawnPetal, j * 1400);
    setTimeout(spawnBalloon, 1200);

    setInterval(spawnFloatyHeart, 2600);
    setInterval(spawnPetal, 3400);
    setInterval(spawnBalloon, 6000);
  }

  /* ---------------------------------------------------
     CURSOR HEART TRAIL (desktop only, pointer:fine)
  --------------------------------------------------- */
  var isFinePointer = window.matchMedia && window.matchMedia('(pointer:fine)').matches;
  if (isFinePointer && !reduceMotion) {
    var cursorHeart = document.getElementById('cursorHeart');
    var lastTrail = 0;
    document.addEventListener('mousemove', function (e) {
      if (cursorHeart) {
        cursorHeart.style.opacity = '0.85';
        cursorHeart.style.left = e.clientX + 'px';
        cursorHeart.style.top = e.clientY + 'px';
        clearTimeout(cursorHeart._t);
        cursorHeart._t = setTimeout(function () { cursorHeart.style.opacity = '0'; }, 500);
      }
      var now = Date.now();
      if (now - lastTrail > 140) {
        lastTrail = now;
        spawnTrailHeart(e.clientX, e.clientY);
      }
    });
  }

  function spawnTrailHeart(x, y) {
    var t = document.createElement('span');
    t.textContent = '💗';
    t.style.position = 'fixed';
    t.style.left = x + 'px';
    t.style.top = y + 'px';
    t.style.fontSize = '11px';
    t.style.pointerEvents = 'none';
    t.style.zIndex = '9997';
    t.style.transform = 'translate(-50%,-50%)';
    t.style.opacity = '0.7';
    t.style.transition = 'transform 0.9s ease-out, opacity 0.9s ease-out';
    document.body.appendChild(t);
    requestAnimationFrame(function () {
      t.style.transform = 'translate(-50%, -140%) scale(0.3)';
      t.style.opacity = '0';
    });
    setTimeout(function () { t.remove(); }, 950);
  }

  /* ---------------------------------------------------
     BUTTON RIPPLE
  --------------------------------------------------- */
  function attachRipple(el) {
    el.style.position = el.style.position || 'relative';
    el.style.overflow = 'hidden';
    el.addEventListener('click', function (e) {
      var rect = el.getBoundingClientRect();
      var ripple = document.createElement('span');
      ripple.className = 'ripple';
      var size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
      el.appendChild(ripple);
      setTimeout(function () { ripple.remove(); }, 720);
    });
  }
  document.querySelectorAll('.cta-btn, .music-btn, .wish-card').forEach(attachRipple);

  /* ---------------------------------------------------
     CONFETTI (canvas based)
  --------------------------------------------------- */
  var canvas = document.getElementById('confettiCanvas');
  var ctx = canvas ? canvas.getContext('2d') : null;
  var confettiPieces = [];
  var confettiRunning = false;
  var confettiColors = ['#ffc2d9', '#f2a4c3', '#e6d9f7', '#ffe3d1', '#ffffff', '#f6d692', '#c9a8ea'];

  function resizeCanvas() {
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  function ConfettiPiece(x, y) {
    this.x = x;
    this.y = y;
    this.size = rand(6, 12);
    this.color = confettiColors[Math.floor(rand(0, confettiColors.length))];
    this.speedX = rand(-4, 4);
    this.speedY = rand(-9, -3);
    this.gravity = 0.16;
    this.rotation = rand(0, 360);
    this.rotationSpeed = rand(-8, 8);
    this.shape = Math.random() > 0.5 ? 'rect' : 'circle';
    this.life = 0;
    this.maxLife = rand(90, 150);
  }
  ConfettiPiece.prototype.update = function () {
    this.speedY += this.gravity;
    this.x += this.speedX;
    this.y += this.speedY;
    this.rotation += this.rotationSpeed;
    this.life++;
  };
  ConfettiPiece.prototype.draw = function (ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate((this.rotation * Math.PI) / 180);
    ctx.fillStyle = this.color;
    ctx.globalAlpha = Math.max(0, 1 - this.life / this.maxLife);
    if (this.shape === 'rect') {
      ctx.fillRect(-this.size / 2, -this.size / 4, this.size, this.size / 2);
    } else {
      ctx.beginPath();
      ctx.arc(0, 0, this.size / 2.4, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  };

  function launchConfetti(originX, originY, amount) {
    if (!ctx || reduceMotion) return;
    amount = amount || 140;
    originX = originX !== undefined ? originX : canvas.width / 2;
    originY = originY !== undefined ? originY : canvas.height / 2;
    for (var i = 0; i < amount; i++) {
      confettiPieces.push(new ConfettiPiece(originX + rand(-60, 60), originY + rand(-20, 20)));
    }
    if (!confettiRunning) {
      confettiRunning = true;
      requestAnimationFrame(confettiLoop);
    }
  }

  function confettiLoop() {
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = confettiPieces.length - 1; i >= 0; i--) {
      var p = confettiPieces[i];
      p.update();
      p.draw(ctx);
      if (p.life > p.maxLife || p.y > canvas.height + 40) {
        confettiPieces.splice(i, 1);
      }
    }
    if (confettiPieces.length > 0) {
      requestAnimationFrame(confettiLoop);
    } else {
      confettiRunning = false;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  /* ---------------------------------------------------
     SCROLL REVEAL for wish cards
  --------------------------------------------------- */
  var revealTargets = document.querySelectorAll('.reveal-card');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, idx) {
        if (entry.isIntersecting) {
          var delay = Array.prototype.indexOf.call(entry.target.parentNode.children, entry.target) * 90;
          setTimeout(function () {
            entry.target.classList.add('in-view');
          }, delay);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    revealTargets.forEach(function (t) { io.observe(t); });
  } else {
    revealTargets.forEach(function (t) { t.classList.add('in-view'); });
  }

  /* ---------------------------------------------------
     OPEN SURPRISE BUTTON
  --------------------------------------------------- */
  var openBtn = document.getElementById('openSurpriseBtn');
  var surpriseSection = document.getElementById('surpriseSection');
  var musicBtn = document.getElementById('musicBtn');

  if (openBtn) {
    openBtn.addEventListener('click', function () {
      var rect = openBtn.getBoundingClientRect();
      launchConfetti(rect.left + rect.width / 2, rect.top, 160);
      document.body.classList.add('magic-mode');
      buildButterflies();
      spawnBalloon();
      spawnBalloon();

      if (musicBtn) {
        musicBtn.classList.remove('hidden');
      }

      if (surpriseSection) {
        setTimeout(function () {
          surpriseSection.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
        }, 350);
      }
    });
  }

  /* ---------------------------------------------------
     BIG GIFT BOX OPEN
  --------------------------------------------------- */
  var bigGift = document.getElementById('bigGift');
  var giftHearts = document.getElementById('giftHearts');
  var messageCard = document.getElementById('messageCard');
  var surpriseHint = document.getElementById('surpriseHint');

  function buildGiftHearts() {
    if (!giftHearts) return;
    giftHearts.innerHTML = '';
    var glyphs = ['💖', '💕', '💗', '✨', '💫'];
    for (var i = 0; i < 14; i++) {
      var s = document.createElement('span');
      s.textContent = glyphs[Math.floor(rand(0, glyphs.length))];
      var angle = rand(0, 360) * (Math.PI / 180);
      var dist = rand(80, 180);
      s.style.setProperty('--tx', Math.cos(angle) * dist + 'px');
      s.style.setProperty('--ty', Math.sin(angle) * dist - 60 + 'px');
      s.style.setProperty('--tr', rand(-40, 40) + 'deg');
      s.style.animationDelay = rand(0, 0.25) + 's';
      giftHearts.appendChild(s);
    }
  }

  /* ---------------------------------------------------
     WEB AUDIO API SYNTHESIZER
  --------------------------------------------------- */
  var audioCtx = null;
  function playSynthSound(type) {
    try {
      if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }
      
      var now = audioCtx.currentTime;
      if (type === 'chime') {
        var notes = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98, 2093.00];
        notes.forEach(function (freq, index) {
          var osc = audioCtx.createOscillator();
          var gain = audioCtx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + index * 0.08);
          gain.gain.setValueAtTime(0.12, now + index * 0.08);
          gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.08 + 0.4);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start(now + index * 0.08);
          osc.stop(now + index * 0.08 + 0.45);
        });
      } else if (type === 'boing') {
        var osc = audioCtx.createOscillator();
        var gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(280, now);
        osc.frequency.exponentialRampToValueAtTime(580, now + 0.15);
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.16);
      } else if (type === 'lock') {
        var osc1 = audioCtx.createOscillator();
        var osc2 = audioCtx.createOscillator();
        var gain = audioCtx.createGain();
        osc1.type = 'triangle';
        osc1.frequency.setValueAtTime(220, now);
        osc1.frequency.setValueAtTime(110, now + 0.08);
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(223, now);
        osc2.frequency.setValueAtTime(113, now + 0.08);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
        osc1.connect(gain);
        osc2.connect(gain);
        gain.connect(audioCtx.destination);
        osc1.start(now);
        osc1.stop(now + 0.24);
        osc2.start(now);
        osc2.stop(now + 0.24);
      } else if (type === 'win') {
        var winNotes = [523.25, 659.25, 783.99, 1046.50];
        winNotes.forEach(function (freq, index) {
          var osc = audioCtx.createOscillator();
          var gain = audioCtx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + index * 0.1);
          var duration = index === 3 ? 0.7 : 0.18;
          gain.gain.setValueAtTime(0.18, now + index * 0.1);
          gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.1 + duration);
          osc.connect(gain);
          gain.connect(audioCtx.destination);
          osc.start(now + index * 0.1);
          osc.stop(now + index * 0.1 + duration + 0.05);
        });
      } else if (type === 'slice') {
        var osc = audioCtx.createOscillator();
        var gain = audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(1800, now + 0.22);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.23);
      } else if (type === 'splat') {
        var osc = audioCtx.createOscillator();
        var gain = audioCtx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.linearRampToValueAtTime(40, now + 0.15);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now);
        osc.stop(now + 0.16);
      }
    } catch (e) {
      console.warn("Audio failure:", e);
    }
  }

  /* ---------------------------------------------------
     RUPEE OPTIONS SURPRISE GAME
  --------------------------------------------------- */
  var rupeeOptionsWrap = document.getElementById('rupeeOptionsWrap');
  var rupee100 = document.getElementById('rupee100');
  var rupee200 = document.getElementById('rupee200');
  var rupee500 = document.getElementById('rupee500');
  var polaroidSurprise = document.getElementById('polaroidSurprise');
  var clickState = 0; // 0: initial, 1: shifted, 2: arrow, 3: flying next to 200
  var currentAngle = 0;
  var shiftX = 0;
  var lastEvadeTime = 0;

  function showGameToast(msg) {
    var toast = document.createElement('div');
    toast.className = 'game-toast';
    toast.textContent = msg;
    document.body.appendChild(toast);
    setTimeout(function() { toast.classList.add('show'); }, 50);
    setTimeout(function() {
      toast.classList.remove('show');
      setTimeout(function() { toast.remove(); }, 400);
    }, 4500); // Give plenty of time to read the funny messages
  }

  function handleEvade(e) {
    var now = Date.now();
    if (now - lastEvadeTime < 250) {
      if (e) { e.preventDefault(); e.stopPropagation(); }
      return;
    }
    lastEvadeTime = now;
    
    if (e) { e.preventDefault(); e.stopPropagation(); }

    if (clickState === 0) {
      // First click: shift dynamically to the right and show message
      clickState = 1;
      
      var rect = rupee500.getBoundingClientRect();
      var maxShift = window.innerWidth - rect.right - 24;
      
      // Shift right if space permits, else shift left
      shiftX = maxShift > 60 ? Math.min(120, maxShift) : -120;
      
      rupee500.style.transition = 'transform 0.4s var(--ease-spring)';
      rupee500.style.transform = 'translateX(' + shiftX + 'px)';
      
      playSynthSound('boing');
      showGameToast("please think about your friend, he is not ambani please click on 200");
      
    } else if (clickState === 1) {
      // Second click: turn into a pointing arrow and show message again
      clickState = 2;
      
      rupee500.classList.add('is-arrow');
      rupee500.classList.add('point-left'); // point left by default since we shifted right
      playSynthSound('lock');
      
      showGameToast("please think about your friend, he is not ambani please click on 200");
      
    } else if (clickState === 2) {
      // Third click: move next to rupee200 and point at it
      clickState = 3;
      
      playSynthSound('lock');
      
      var rect500 = rupee500.getBoundingClientRect();
      var wrapRect = rupeeOptionsWrap.getBoundingClientRect();
      
      var currentLeft = rect500.left - wrapRect.left;
      var currentTop = rect500.top - wrapRect.top;
      
      // Lock dimensions to prevent resizing and convert to absolute positioning
      rupee500.style.width = rupee500.offsetWidth + 'px';
      rupee500.style.height = rupee500.offsetHeight + 'px';
      
      rupee500.style.transition = 'none';
      rupee500.style.position = 'absolute';
      rupee500.style.margin = '0';
      rupee500.style.left = currentLeft + 'px';
      rupee500.style.top = currentTop + 'px';
      rupee500.style.transform = 'translateX(' + shiftX + 'px)';
      
      rupee500.offsetHeight; // Force reflow
      
      // Re-enable smooth transition for absolute fly movement
      rupee500.style.transition = 'left 0.7s cubic-bezier(0.34, 1.56, 0.64, 1), top 0.7s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)';
      
      // Clear translateX transform so left/top absolute coordinates take over
      rupee500.style.transform = 'none';
      
      var rect200 = rupee200.getBoundingClientRect();
      var targetLeft = rect200.left - wrapRect.left + rect200.width + 16;
      var targetTop = rect200.top - wrapRect.top + (rect200.height / 2) - (rupee500.offsetHeight / 2);
      
      // Responsive check: if placing it on the right overflows the screen, position it below
      if (targetLeft + rupee500.offsetWidth > window.innerWidth - 20) {
        targetLeft = rect200.left - wrapRect.left + (rect200.width / 2) - (rupee500.offsetWidth / 2);
        targetTop = rect200.top - wrapRect.top + rect200.height + 16;
        
        // Point up instead of left
        rupee500.classList.remove('point-left');
        rupee500.classList.add('point-up');
      } else {
        // Point left
        rupee500.classList.remove('point-up');
        rupee500.classList.add('point-left');
      }
      
      rupee500.style.left = targetLeft + 'px';
      rupee500.style.top = targetTop + 'px';
      
    } else {
      // ClickState is 3 (Already pointing and settled next to 200)
      rupee500.classList.add('wobble');
      playSynthSound('boing');
      showGameToast("please think about your friend, he is not ambani please click on 200");
      setTimeout(function() {
        rupee500.classList.remove('wobble');
      }, 500);
    }
  }

  if (bigGift) {
    bigGift.addEventListener('click', function () {
      if (bigGift.classList.contains('opened')) return;
      
      bigGift.classList.add('rumble-gift');
      if (surpriseSection) surpriseSection.classList.add('shake-section');
      
      playSynthSound('chime');
      
      setTimeout(function() {
        bigGift.classList.remove('rumble-gift');
        if (surpriseSection) surpriseSection.classList.remove('shake-section');
        
        bigGift.classList.add('opened');
        buildGiftHearts();

        var rect = bigGift.getBoundingClientRect();
        launchConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2, 130);

        if (surpriseHint) surpriseHint.style.display = 'none';

        setTimeout(function () {
          if (rupeeOptionsWrap) {
            rupeeOptionsWrap.style.display = 'flex';
            rupeeOptionsWrap.offsetHeight;
            rupeeOptionsWrap.classList.add('show');
          }
        }, 500);
      }, 300);
    });
  }

  if (rupee500) {
    rupee500.addEventListener('touchstart', handleEvade, { passive: false });
    rupee500.addEventListener('click', handleEvade);
  }

  if (rupee100) {
    rupee100.addEventListener('click', function() {
      rupee100.classList.add('wobble');
      playSynthSound('boing');
      showGameToast("please he is not that much gareeb he can give you a gift of 200");
      setTimeout(function() {
        rupee100.classList.remove('wobble');
      }, 500);
    });
  }

  if (rupee200) {
    rupee200.addEventListener('click', function() {
      playSynthSound('win');
      showGameToast("toke to dilm 200 abr taka chai ei jnno to fule jacchis");
      
      var rect = rupee200.getBoundingClientRect();
      launchConfetti(rect.left + rect.width / 2, rect.top, 180);
      
      if (rupeeOptionsWrap) {
        rupeeOptionsWrap.classList.remove('show');
        setTimeout(function() {
          rupeeOptionsWrap.style.display = 'none';
        }, 800);
      }
      
      if (rupee500) {
        rupee500.style.opacity = '0';
        setTimeout(function() { rupee500.remove(); }, 600);
      }
      
      if (polaroidSurprise) {
        polaroidSurprise.classList.add('show');
        var sparkInterval = setInterval(function() {
          var pRect = polaroidSurprise.getBoundingClientRect();
          launchConfetti(pRect.left + pRect.width / 2, pRect.top + pRect.height / 2, 8);
        }, 150);
        setTimeout(function() { clearInterval(sparkInterval); }, 1500);
        
        setTimeout(function() {
          polaroidSurprise.classList.add('floating');
        }, 1200);
      }
      
      setTimeout(function () {
        if (messageCard) messageCard.classList.add('show');
      }, 1500);
    });
  }

  /* ---------------------------------------------------
     TYPEWRITER LETTER
  --------------------------------------------------- */
  var letterMessage = "Happy Birthday to my favorite human to roast, Sriparna! 🎂💖\n\n" +
    "Another year older, but unfortunately, not a single bit wiser. 🧠❌\n\n" +
    "I was going to write something deeply emotional and sweet, but then I remembered how much you love drama, scrolling Reels until 4 AM, and eating enough food to sustain a small village. Seriously, how does someone so small eat so much? It's a medical mystery. 🍔🍕\n\n" +
    "Thank you for being the only person who tolerates my trash jokes, even though your own laugh sounds like a broken lawnmower. 🚜💨\n\n" +
    "On this special day, I wish you:\n" +
    "1. A faster brain response rate (please reply to messages within the same business day). 📱⏳\n" +
    "2. Unlimited food that somehow doesn't make you 'fule' (fat) anymore. 🍩🍩\n" +
    "3. The ability to act like a fully functioning adult (unlikely, but we can dream).\n\n" +
    "Jokes aside, you genuinely have the biggest, kindest heart of anyone I know. Life would be incredibly boring, quiet, and way too normal without your chaotic energy. You are my most gobbet best friend, and I wouldn't trade you for all the Ambani riches in the world. 💎💖\n\n" +
    "Enjoy your cake (try to leave some for others this time), keep smiling, and never change your gorgeous, crazy self.\n\n" +
    "Happy Birthday, Sriparna! 🥳🎈\n\n" +
    "With love (and a bit of judgment),\n" +
    "Your best friend. 💖";

  var letterText = document.getElementById('letterText');
  var letterCursor = document.getElementById('letterCursor');
  var letterSection = document.getElementById('letterSection');
  var typewriterStarted = false;

  function showDogKnifeSection() {
    var dogKnifeSection = document.getElementById('dogKnifeSection');
    if (dogKnifeSection) {
      dogKnifeSection.classList.add('show');
    }
  }

  function typeLetter() {
    if (typewriterStarted || !letterText) return;
    typewriterStarted = true;

    if (reduceMotion) {
      letterText.textContent = letterMessage;
      if (letterCursor) letterCursor.classList.add('done');
      showDogKnifeSection();
      return;
    }

    var i = 0;
    var speed = 16;
    function step() {
      if (i < letterMessage.length) {
        letterText.textContent += letterMessage.charAt(i);
        i++;
        var charDelay = speed;
        var lastChar = letterMessage.charAt(i - 1);
        if (lastChar === '.' || lastChar === '\n') charDelay = speed + 90;
        setTimeout(step, charDelay);
      } else {
        if (letterCursor) letterCursor.classList.add('done');
        showDogKnifeSection();
      }
    }
    step();
  }

  // Pick up the knife from dog's hands
  var pickKnifeBtn = document.getElementById('pickKnifeBtn');
  var cakeKnifeSvg = document.getElementById('cakeKnifeSvg');
  var cakeSection = document.getElementById('cakeSection');
  
  if (pickKnifeBtn) {
    pickKnifeBtn.addEventListener('click', function() {
      playSynthSound('slice');
      if (cakeKnifeSvg) {
        cakeKnifeSvg.classList.add('picked');
      }
      pickKnifeBtn.classList.add('picked');
      var label = pickKnifeBtn.querySelector('.cta-label');
      if (label) label.textContent = "Knife Picked Up! 🔪🎂";
      
      setTimeout(function() {
        if (cakeSection) {
          cakeSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
          showGameToast("Ready to cut the cake! 🍰");
        }
      }, 950);
    });
  }

  if ('IntersectionObserver' in window && letterSection) {
    var letterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          typeLetter();
          letterObserver.disconnect();
        }
      });
    }, { threshold: 0.35 });
    letterObserver.observe(letterSection);
  } else {
    typeLetter();
  }

  /* ---------------------------------------------------
     CAKE CANDLES
  --------------------------------------------------- */
  var candles = document.querySelectorAll('.candle');
  var cakeCongrats = document.getElementById('cakeCongrats');
  var cakeSection = document.getElementById('cakeSection');

  function checkAllBlown() {
    var allOut = true;
    candles.forEach(function (c) {
      if (c.getAttribute('data-lit') === 'true') allOut = false;
    });
    if (allOut) {
      var rect = cakeSection.getBoundingClientRect();
      launchConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2, 120);
      if (cakeCongrats) cakeCongrats.classList.add('show');
      
      setTimeout(function() {
        if (pickKnifeBtn && pickKnifeBtn.classList.contains('picked')) {
          showGameToast("Click on the cake to cut it! 🔪🎂");
        } else {
          showGameToast("Ask the dog for the knife to cut the cake! 🐕🔪");
        }
      }, 1500);
    }
  }

  function spawnSmoke(candleEl) {
    var smoke = document.createElement('span');
    smoke.className = 'candle-smoke';
    candleEl.appendChild(smoke);
    setTimeout(function () { smoke.remove(); }, 1700);
  }

  candles.forEach(function (c) {
    c.addEventListener('click', function () {
      if (c.getAttribute('data-lit') === 'false') return;
      c.setAttribute('data-lit', 'false');
      if (!reduceMotion) {
        spawnSmoke(c);
        setTimeout(function () { spawnSmoke(c); }, 350);
      }
      checkAllBlown();
    });
  });

  // Balloon Spawner
  function spawnBalloons() {
    var colors = ['#f43f5e', '#ec4899', '#d946ef', '#a855f7', '#8b5cf6', '#3b82f6', '#06b6d4', '#10b981', '#f59e0b', '#ef4444'];
    var body = document.body;
    for (var i = 0; i < 20; i++) {
      (function(idx) {
        setTimeout(function() {
          var balloon = document.createElement('div');
          balloon.className = 'floating-balloon';
          
          var color = colors[Math.floor(Math.random() * colors.length)];
          balloon.style.color = color;
          balloon.style.backgroundColor = color;
          balloon.style.left = (10 + Math.random() * 80) + 'vw';
          
          balloon.style.setProperty('--duration', (5 + Math.random() * 4) + 's');
          balloon.style.setProperty('--drift', (-60 + Math.random() * 120) + 'px');
          balloon.style.setProperty('--drift2', (-60 + Math.random() * 120) + 'px');
          
          body.appendChild(balloon);
          setTimeout(function() { balloon.remove(); }, 9000);
        }, idx * 150);
      })(i);
    }
  }

  // Egg Throwing Prank
  function throwEggs() {
    var targets = [
      { x: window.innerWidth * 0.25, y: window.innerHeight * 0.35, rot: -15, dx: -8, dy: -5 },
      { x: window.innerWidth * 0.75, y: window.innerHeight * 0.45, rot: 25, dx: 6, dy: 8 },
      { x: window.innerWidth * 0.5, y: window.innerHeight * 0.25, rot: 5, dx: -2, dy: 10 }
    ];
    
    targets.forEach(function(target, idx) {
      setTimeout(function() {
        var egg = document.createElement('div');
        egg.className = 'flying-egg';
        
        var startX = idx === 0 ? -50 : (idx === 1 ? window.innerWidth + 50 : window.innerWidth / 2);
        var startY = window.innerHeight + 50;
        
        egg.style.left = startX + 'px';
        egg.style.top = startY + 'px';
        document.body.appendChild(egg);
        
        egg.offsetHeight;
        egg.style.transition = 'left 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), top 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.6s ease';
        egg.style.left = target.x + 'px';
        egg.style.top = target.y + 'px';
        egg.style.transform = 'rotate(' + (360 + Math.random() * 360) + 'deg) scale(0.8)';
        
        setTimeout(function() {
          egg.remove();
          playSynthSound('splat');
          
          var splat = document.createElement('div');
          splat.className = 'egg-splat';
          splat.style.left = (target.x - 80) + 'px';
          splat.style.top = (target.y - 80) + 'px';
          
          var inner = document.createElement('div');
          inner.className = 'egg-splat-inner';
          
          var white = document.createElement('div');
          white.className = 'egg-white';
          white.style.setProperty('--r', target.rot + 'deg');
          
          var yolk = document.createElement('div');
          yolk.className = 'egg-yolk';
          yolk.style.setProperty('--dx', target.dx + 'px');
          yolk.style.setProperty('--dy', target.dy + 'px');
          
          inner.appendChild(white);
          inner.appendChild(yolk);
          splat.appendChild(inner);
          document.body.appendChild(splat);
          
          // Auto remove egg splat after 1.8 seconds
          setTimeout(function() {
            splat.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            splat.style.opacity = '0';
            splat.style.transform = 'scale(0.5)';
            setTimeout(function() { splat.remove(); }, 600);
          }, 1800);
        }, 600);
      }, idx * 450);
    });
  }

  // Cake Cutting Click Listener
  var cake = document.getElementById('cake');
  var isCakeCut = false;
  var cutOverlay = document.getElementById('cutOverlay');
  var closeOverlayBtn = document.getElementById('closeOverlayBtn');
  
  if (cake) {
    cake.addEventListener('click', function(e) {
      if (e.target.closest('.candle')) return;
      
      var allOut = true;
      candles.forEach(function (c) {
        if (c.getAttribute('data-lit') === 'true') allOut = false;
      });
      
      if (!allOut) {
        cake.classList.add('wobble');
        playSynthSound('boing');
        showGameToast("Blow out all the candles first! 🎂🕯️");
        setTimeout(function() { cake.classList.remove('wobble'); }, 500);
        return;
      }
      
      var hasKnife = pickKnifeBtn && pickKnifeBtn.classList.contains('picked');
      if (!hasKnife) {
        cake.classList.add('wobble');
        playSynthSound('boing');
        showGameToast("Ask the dog for the knife to cut the cake! 🐕🔪");
        setTimeout(function() { cake.classList.remove('wobble'); }, 500);
        return;
      }
      
      if (isCakeCut) {
        if (cutOverlay) cutOverlay.classList.add('show');
        return;
      }
      
      isCakeCut = true;
      cake.classList.add('is-cut');
      playSynthSound('slice');
      
      var cRect = cake.getBoundingClientRect();
      launchConfetti(cRect.left, cRect.top + 50, 80);
      launchConfetti(cRect.right, cRect.top + 50, 80);
      launchConfetti(cRect.left + cRect.width/2, cRect.top, 120);
      
      spawnBalloons();
      throwEggs();
      
      setTimeout(function() {
        if (cutOverlay) {
          cutOverlay.classList.add('show');
          playSynthSound('win');
          
          var oRect = cutOverlay.getBoundingClientRect();
          launchConfetti(oRect.left + oRect.width/2, oRect.top + oRect.height/2, 100);
        }
      }, 2200);
    });
  }

  if (closeOverlayBtn) {
    closeOverlayBtn.addEventListener('click', function() {
      if (cutOverlay) {
        cutOverlay.classList.remove('show');
      }
      
      var splats = document.querySelectorAll('.egg-splat');
      splats.forEach(function(s) {
        s.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        s.style.opacity = '0';
        s.style.transform = 'scale(0.5)';
        setTimeout(function() { s.remove(); }, 600);
      });
    });
  }

  /* ---------------------------------------------------
     MUSIC BUTTON
  --------------------------------------------------- */
  var bgMusic = document.getElementById('bgMusic');
  if (musicBtn && bgMusic) {
    musicBtn.addEventListener('click', function () {
      if (bgMusic.paused) {
        bgMusic.play().catch(function () {
          /* file may be missing until user adds an mp3; fail silently */
        });
        musicBtn.classList.add('playing');
        musicBtn.setAttribute('aria-label', 'Pause birthday music');
      } else {
        bgMusic.pause();
        musicBtn.classList.remove('playing');
        musicBtn.setAttribute('aria-label', 'Play birthday music');
      }
    });
  }

  /* ---------------------------------------------------
     TREAT DECIDER MECHANICS
  --------------------------------------------------- */
  var treatCards = document.querySelectorAll('.treat-card');
  var treatModalOverlay = document.getElementById('treatModalOverlay');
  var selectedPlaceName = document.getElementById('selectedPlaceName');
  var closeTreatModal = document.getElementById('closeTreatModal');
  var treatForm = document.getElementById('treatForm');
  var treatDateInput = document.getElementById('treatDate');
  var treatDayInput = document.getElementById('treatDay');

  if (treatCards && treatModalOverlay) {
    treatCards.forEach(function(card) {
      card.addEventListener('click', function() {
        var place = card.getAttribute('data-place');
        if (selectedPlaceName) {
          selectedPlaceName.textContent = place;
        }
        
        if (treatForm) treatForm.reset();
        if (treatDayInput) treatDayInput.value = '';
        
        playSynthSound('chime');
        treatModalOverlay.classList.add('show');
      });
    });
  }

  if (closeTreatModal && treatModalOverlay) {
    closeTreatModal.addEventListener('click', function() {
      treatModalOverlay.classList.remove('show');
    });
    
    treatModalOverlay.addEventListener('click', function(e) {
      if (e.target === treatModalOverlay) {
        treatModalOverlay.classList.remove('show');
      }
    });
  }

  if (treatDateInput && treatDayInput) {
    treatDateInput.addEventListener('change', function() {
      var dateVal = treatDateInput.value;
      if (dateVal) {
        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        var dateParts = dateVal.split('-');
        var localDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
        var dayName = days[localDate.getDay()];
        treatDayInput.value = dayName;
      } else {
        treatDayInput.value = '';
      }
    });
  }

  if (treatForm) {
    treatForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      var place = selectedPlaceName ? selectedPlaceName.textContent : "Bhuter Raja Dilo Bor";
      var date = document.getElementById('treatDate').value;
      var day = document.getElementById('treatDay').value;
      var budget = document.getElementById('treatBudget').value;
      
      var subject = encodeURIComponent("Treat Selection: Ei dina khawabe! 🍽️🎉");
      var body = encodeURIComponent(
        "Hey Abhilash!\n\n" +
        "Ei dina khawabe! 🍽️💖\n\n" +
        "Here are my birthday treat selection details:\n\n" +
        "📍 Place: " + place + "\n" +
        "📅 Date: " + date + "\n" +
        "📆 Day: " + day + "\n" +
        "💰 Budget: \u20b9" + budget + "\n\n" +
        "See you then!"
      );
      
      var mailtoLink = "mailto:abhilashroy2003@gmail.com?subject=" + subject + "&body=" + body;
      
      treatModalOverlay.classList.remove('show');
      showGameToast("Opening Mail application to send details... 💌");
      
      setTimeout(function() {
        window.location.href = mailtoLink;
      }, 800);
    });
  }

})();
