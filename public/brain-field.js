// <brain-field>: interactive Three.js particle brain. Attributes: density (points), static ("true" disables motion).
(function () {
  if (customElements.get('brain-field')) return;
  const THREE_URL = 'https://unpkg.com/three@0.160.0/build/three.module.js';
  class BrainField extends HTMLElement {
    connectedCallback() {
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = '<style>:host{display:block;position:relative;width:100%;height:100%;min-height:200px}canvas{display:block;width:100%;height:100%}</style><canvas></canvas>';
      this.canvas = this.shadowRoot.querySelector('canvas');
      this.mouse = { x: 0, y: 0, tx: 0, ty: 0 };
      this.visible = true;
      this.reduced = matchMedia('(prefers-reduced-motion: reduce)').matches || this.getAttribute('static') === 'true';
      import(THREE_URL).then(T => { this.THREE = T; this.init(); }).catch(e => console.warn('brain-field: three failed', e));
    }
    disconnectedCallback() { cancelAnimationFrame(this.raf); this.ro && this.ro.disconnect(); this.io && this.io.disconnect(); this.renderer && this.renderer.dispose(); }
    init() {
      const THREE = this.THREE;
      const N = parseInt(this.getAttribute('density') || '7000', 10);
      const renderer = new THREE.WebGLRenderer({ canvas: this.canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
      this.renderer = renderer;
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
      camera.position.set(0, 0.15, 5.2);
      this.scene = scene; this.camera = camera;
      const group = new THREE.Group(); scene.add(group); this.group = group;

      // --- brain point cloud ---
      const pos = new Float32Array(N * 3), col = new Float32Array(N * 3), seed = new Float32Array(N);
      const cream = new THREE.Color('#F2F2E6'), sage = new THREE.Color('#9EC49A'), gold = new THREE.Color('#E0AE3F'), terra = new THREE.Color('#D8724A');
      const rnd = () => Math.random();
      const noise = (x, y, z) => Math.sin(x * 7.1 + y * 3.3) * Math.cos(y * 6.2 - z * 4.7) * Math.sin(z * 5.9 + x * 2.1);
      let i = 0;
      while (i < N) {
        const part = rnd();
        let x, y, z;
        if (part < 0.9) { // hemispheres
          const u = rnd() * 2 - 1, th = rnd() * Math.PI * 2, r = Math.cbrt(0.55 + 0.45 * rnd());
          const s = Math.sqrt(1 - u * u);
          let px = s * Math.cos(th), py = u, pz = s * Math.sin(th);
          // sulci ridges (surface wrinkles)
          const ridge = 0.06 * Math.sin(px * 9 + py * 4) * Math.sin(pz * 8 - py * 5) + 0.035 * noise(px * 2, py * 2, pz * 2);
          const rr = r * (1 + ridge);
          x = px * rr * 0.62; y = py * rr * 0.72 + 0.05 * (1 - Math.abs(px)); z = pz * rr * 0.95;
          // flatten bottom, taper front
          if (y < -0.35) y = -0.35 - (-0.35 - y) * 0.4;
          if (z > 0.55) x *= 0.92;
          const side = x < 0 ? -1 : 1;
          if (Math.abs(x) < 0.05 && y > -0.1) continue; // longitudinal fissure
          x += side * 0.06;
        } else if (part < 0.985) { // cerebellum
          const u = rnd() * 2 - 1, th = rnd() * Math.PI * 2, r = Math.cbrt(0.6 + 0.4 * rnd());
          const s = Math.sqrt(1 - u * u);
          x = s * Math.cos(th) * r * 0.34; y = u * r * 0.2 - 0.36; z = s * Math.sin(th) * r * 0.28 - 0.62;
        } else { // brainstem
          const a = rnd() * Math.PI * 2, r = 0.09 * Math.sqrt(rnd()), t = rnd();
          x = Math.cos(a) * r; z = Math.sin(a) * r - 0.25 - t * 0.2; y = -0.36 - t * 0.5;
        }
        pos[i * 3] = x; pos[i * 3 + 1] = y; pos[i * 3 + 2] = z;
        const w = rnd(), c = w < 0.62 ? cream : w < 0.86 ? sage : w < 0.96 ? gold : terra;
        col[i * 3] = c.r; col[i * 3 + 1] = c.g; col[i * 3 + 2] = c.b;
        seed[i] = rnd();
        i++;
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
      geo.setAttribute('seed', new THREE.BufferAttribute(seed, 1));
      const mat = new THREE.ShaderMaterial({
        transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
        uniforms: { uTime: { value: 0 }, uPR: { value: renderer.getPixelRatio() }, uMouse: { value: new THREE.Vector3(9, 9, 9) } },
        vertexShader: `attribute float seed; varying vec3 vColor; varying float vGlow; uniform float uTime; uniform float uPR; uniform vec3 uMouse;
          void main(){ vColor = color;
            vec3 p = position;
            // signal waves travelling through the tissue
            float wave = sin(uTime*1.4 + p.z*4.0 + p.x*2.0 + seed*6.283);
            float spark = smoothstep(0.86, 1.0, sin(uTime*0.9 + seed*40.0));
            p *= 1.0 + 0.012*sin(uTime*0.8);
            vec3 d = p - uMouse; float dist = length(d);
            float push = smoothstep(0.85, 0.0, dist); p += normalize(d + 0.0001) * push * 0.42;
            vGlow = 0.35 + 0.45*smoothstep(0.55, 1.0, wave) + spark + push*1.4;
            vec4 mv = modelViewMatrix * vec4(p, 1.0);
            gl_Position = projectionMatrix * mv;
            gl_PointSize = (1.6 + 2.2*seed + 2.5*spark + 3.0*push) * uPR * (3.2 / -mv.z); }`,
        fragmentShader: `varying vec3 vColor; varying float vGlow;
          void main(){ float d = length(gl_PointCoord - 0.5); if (d > 0.5) discard;
            float a = smoothstep(0.5, 0.05, d) * vGlow; gl_FragColor = vec4(vColor * (0.7 + vGlow*0.5), a); }`,
        vertexColors: true
      });
      this.mat = mat;
      group.add(new THREE.Points(geo, mat));

      // --- synapse lines between near neighbours ---
      const L = Math.min(900, N / 6), lp = new Float32Array(L * 6);
      let k = 0, tries = 0;
      while (k < L && tries < L * 40) {
        tries++;
        const a = (rnd() * N) | 0, b = (rnd() * N) | 0;
        const dx = pos[a * 3] - pos[b * 3], dy = pos[a * 3 + 1] - pos[b * 3 + 1], dz = pos[a * 3 + 2] - pos[b * 3 + 2];
        const d = dx * dx + dy * dy + dz * dz;
        if (d < 0.06 && d > 0.004) { lp.set([pos[a * 3], pos[a * 3 + 1], pos[a * 3 + 2], pos[b * 3], pos[b * 3 + 1], pos[b * 3 + 2]], k * 6); k++; }
      }
      const lgeo = new THREE.BufferGeometry(); lgeo.setAttribute('position', new THREE.BufferAttribute(lp.slice(0, k * 6), 3));
      group.add(new THREE.LineSegments(lgeo, new THREE.LineBasicMaterial({ color: '#AC7C18', transparent: true, opacity: 0.22, blending: THREE.AdditiveBlending, depthWrite: false })));

      // --- halo ring ---
      const ring = new THREE.Mesh(new THREE.TorusGeometry(1.55, 0.004, 8, 200), new THREE.MeshBasicMaterial({ color: '#506A4F', transparent: true, opacity: 0.55 }));
      ring.rotation.x = Math.PI / 2.4; group.add(ring); this.ring = ring;

      group.rotation.y = -0.6;
      this.resize();
      this.ro = new ResizeObserver(() => this.resize()); this.ro.observe(this);
      this.io = new IntersectionObserver(e => { this.visible = e[0].isIntersecting; if (this.visible) this.loop(); }); this.io.observe(this);
      const onMove = e => {
        const r = this.getBoundingClientRect();
        this.mouse.tx = ((e.clientX - r.left) / r.width) * 2 - 1;
        this.mouse.ty = -(((e.clientY - r.top) / r.height) * 2 - 1);
      };
      window.addEventListener('pointermove', onMove, { passive: true });
      window.addEventListener('pointerleave', () => { this.mouse.tx = 0; this.mouse.ty = 0; });
      this.t0 = performance.now();
      this.loop();
    }
    resize() {
      const w = this.clientWidth || 600, h = this.clientHeight || 500;
      this.renderer.setSize(w, h, false); this.camera.aspect = w / h; this.camera.updateProjectionMatrix();
    }
    loop() {
      cancelAnimationFrame(this.raf);
      if (!this.visible) return;
      const t = (performance.now() - this.t0) / 1000;
      const m = this.mouse; m.x += (m.tx - m.x) * 0.18; m.y += (m.ty - m.y) * 0.18;
      if (!this.reduced) {
        this.mat.uniforms.uTime.value = t;
        this.group.rotation.y = -0.6 + t * 0.12 + m.x * 0.6;
        this.group.rotation.x = -m.y * 0.4 + Math.sin(t * 0.3) * 0.05;
        this.ring.rotation.z = t * 0.08;
        // project mouse into brain-local space (approx.)
        const v = new this.THREE.Vector3(m.x * 2.1, m.y * 1.5, 0.3).applyQuaternion(this.group.quaternion.clone().invert());
        this.mat.uniforms.uMouse.value.copy(v);
      }
      this.renderer.render(this.scene, this.camera);
      this.raf = requestAnimationFrame(() => this.loop());
    }
  }
  customElements.define('brain-field', BrainField);
})();
