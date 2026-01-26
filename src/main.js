import "./style.css";
import * as THREE from "three";

// =============================================================================
// CONFIGURATION
// =============================================================================

const sections = [
  {
    id: "Museum",
    name: "Museum",
    scenes: [
      {
        id: "Museum-01",
        name: "Museum - View 1",
        image: "/images/ms/ms-1.jpeg",
        thumbnail: "/images/ms/ms-1.jpeg",
        hotspots: [
          {
            id: "to-Museum-02",
            target: "Museum-02",
            position: { lon: 60, lat: -10 },
            label: "Vào sảnh chính",
          },
        ],
      },
      {
        id: "Museum-02",
        name: "Museum - View 2",
        image: "/images/ms/ms-2.jpeg",
        thumbnail: "/images/ms/ms-2.jpeg",
        hotspots: [
          {
            id: "to-Museum-01",
            target: "Museum-01",
            position: { lon: 0, lat: -25 },
            label: "Trở lại lối vào",
          },
          {
            id: "to-Museum-03",
            target: "Museum-03",
            position: { lon: -125, lat: -20 },
            label: "Tới phòng trưng bày",
          },
        ],
      },
      {
        id: "Museum-03",
        name: "Museum - View 3",
        image: "/images/ms/ms-3.jpeg",
        thumbnail: "/images/ms/ms-3.jpeg",
        hotspots: [
          {
            id: "to-Museum-02",
            target: "Museum-02",
            position: { lon: 203, lat: -30 },
            label: "Quay lại sảnh chính ",
          },
          {
            id: "to-Museum-04",
            target: "Museum-04",
            position: { lon: -120, lat: -30 },
            label: "Tới phòng tranh",
          },
        ],
        poiMarkers: [
          {
            id: "poi-painting-1",
            position: { lon: -65, lat: 30 },
            title: "Gallery Collection - 1998",
            description:
              "Historical exhibition from 1998. This collection represents the golden era of abstract expressionism.",
            image: "/images/ms/ms-3.jpeg",
          },
          {
            id: "poi-painting-2",
            position: { lon: 20, lat: 30 },
            title: "Modern Art Exhibition",
            description:
              "Contemporary masterpieces from renowned artists around the world.",
            image: "/images/ms/ms-3.jpeg",
          },
          {
            id: "poi-sculpture",
            position: { lon: 100, lat: 25 },
            title: "Classical Sculpture",
            description:
              "A beautiful marble sculpture dating back to the Renaissance period.",
            image: "/images/ms/ms-3.jpeg",
          },
        ],
      },
      {
        id: "Museum-04",
        name: "Museum - View 4",
        image: "/images/ms/ms-4.jpeg",
        thumbnail: "/images/ms/ms-4.jpeg",
        hotspots: [
          {
            id: "to-Museum-03",
            target: "Museum-03",
            position: { lon: 80, lat: -25 },
            label: "Quay lại phòng trưng bày",
          },
          {
            id: "to-Museum-05",
            target: "Museum-05",
            position: { lon: -95, lat: -25 },
            label: "Tới sảnh phụ",
          },
        ],
        poiMarkers: [
          {
            id: "poi-painting-1",
            position: { lon: 233, lat: 20 },
            title: "Gallery Collection - 1998",
            description:
              "Historical exhibition from 1998. This collection represents the golden era of abstract expressionism.",
            image: "/images/ms/ms-4.jpeg",
          },
          {
            id: "poi-painting-2",
            position: { lon: 176, lat: 20 },
            title: "Gallery Collection - 1998",
            description:
              "Historical exhibition from 1998. This collection represents the golden era of abstract expressionism.",
            image: "/images/ms/ms-3.jpeg",
          },
          {
            id: "poi-painting-3",
            position: { lon: 18, lat: 20 },
            title: "Gallery Collection - 1998",
            description:
              "Historical exhibition from 1998. This collection represents the golden era of abstract expressionism.",
            image: "/images/ms/ms-3.jpeg",
          },
          {
            id: "poi-painting-4",
            position: { lon: 70, lat: 15 },
            title: "Gallery Collection - 1998",
            description:
              "Historical exhibition from 1998. This collection represents the golden era of abstract expressionism.",
            image: "/images/ms/ms-3.jpeg",
          },
        ],
      },
      {
        id: "Museum-05",
        name: "Museum - View 5",
        image: "/images/ms/ms-5.jpeg",
        thumbnail: "/images/ms/ms-5.jpeg",
        hotspots: [
          {
            id: "to-Museum-04",
            target: "Museum-04",
            position: { lon: -90, lat: -25 },
            label: "Trở lại phòng tranh",
          },
          {
            id: "to-Museum-06",
            target: "Museum-06",
            position: { lon: 95, lat: -20 },
            label: "Tới phòng hiện vật",
          },
        ],
      },
      {
        id: "Museum-06",
        name: "Museum - View 6",
        image: "/images/ms/ms-6.jpeg",
        thumbnail: "/images/ms/ms-6.jpeg",
        hotspots: [
          {
            id: "to-Museum-05",
            target: "Museum-05",
            position: { lon: 125, lat: -20 },
            label: "Trở lại sảnh",
          },
        ],
        poiMarkers: [
          {
            id: "poi-1",
            position: { lon: 220, lat: 0 },
            title: "Gallery Collection - 1998",
            description:
              "Historical exhibition from 1998. This collection represents the golden era of abstract expressionism.",
            image: "/images/ms/ms-4.jpeg",
          },
          {
            id: "poi-2",
            position: { lon: -205, lat: 0 },
            title: "Gallery Collection - 1998",
            description:
              "Historical exhibition from 1998. This collection represents the golden era of abstract expressionism.",
            image: "/images/ms/ms-4.jpeg",
          },
          {
            id: "poi-3",
            position: { lon: 320, lat: 0 },
            title: "Gallery Collection - 1998",
            description:
              "Historical exhibition from 1998. This collection represents the golden era of abstract expressionism.",
            image: "/images/ms/ms-4.jpeg",
          },
        ],
      },
    ],
  },
];

const scenes = sections.flatMap((section) => section.scenes);
const sceneMap = new Map(scenes.map((s) => [s.id, s]));

// =============================================================================
// LRU TEXTURE CACHE
// =============================================================================

class LRUTextureCache {
  constructor(maxSize, renderer) {
    this.maxSize = maxSize;
    this.renderer = renderer;
    this.cache = new Map();
    this.accessOrder = [];
  }

  has(key) {
    return this.cache.has(key);
  }

  get(key) {
    if (!this.cache.has(key)) return null;

    const idx = this.accessOrder.indexOf(key);
    if (idx > -1) {
      this.accessOrder.splice(idx, 1);
      this.accessOrder.push(key);
    }
    return this.cache.get(key);
  }

  set(key, texture) {
    if (this.cache.has(key)) {
      const idx = this.accessOrder.indexOf(key);
      if (idx > -1) this.accessOrder.splice(idx, 1);
    } else if (this.cache.size >= this.maxSize) {
      const lruKey = this.accessOrder.shift();
      const lruTexture = this.cache.get(lruKey);
      if (lruTexture) {
        lruTexture.dispose();
        this.cache.delete(lruKey);
      }
    }
    this.cache.set(key, texture);
    this.accessOrder.push(key);
  }

  uploadToGPU(texture) {
    if (this.renderer && texture) {
      this.renderer.initTexture(texture);
    }
  }
}

// =============================================================================
// SPHERICAL PROJECTION UTILITIES
// =============================================================================

const SphericalUtils = {
  lonLatToDirection(lon, lat) {
    const phi = THREE.MathUtils.degToRad(90 - lat);
    const theta = THREE.MathUtils.degToRad(lon);
    return {
      x: Math.sin(phi) * Math.cos(theta),
      y: Math.cos(phi),
      z: Math.sin(phi) * Math.sin(theta),
    };
  },

  projectToScreen(dir, camera, width, height, worldPos, projected) {
    worldPos.set(dir.x * 500, dir.y * 500, dir.z * 500);
    projected.copy(worldPos).project(camera);
    return {
      x: (projected.x * 0.5 + 0.5) * width,
      y: (-projected.y * 0.5 + 0.5) * height,
      z: projected.z,
    };
  },

  dotWithCamera(dir, camDir) {
    return camDir.x * dir.x + camDir.y * dir.y + camDir.z * dir.z;
  },
};

// =============================================================================
// PANORAMA VIEWER CLASS
// =============================================================================

class PanoramaViewer {
  constructor() {
    this.initDOMElements();
    this.initState();
    this.initPhysicsConstants();
    this.initReusableVectors();
    this.initBoundMethods();
    this.init();
    this.setupEventListeners();
    this.loadInitialScene();
  }

  initDOMElements() {
    this.container = document.getElementById("viewer-container");
    this.loadingScreen = document.getElementById("loading-screen");
  }

  initState() {
    this.currentSection = sections[0];
    this.currentSceneId = sections[0].scenes[0].id;
    this.isUserInteracting = false;
    this.autoRotate = false;
    this.activePointerId = null;

    this.lon = 0;
    this.lat = 0;
    this.fov = 75;
    this.fovMin = 30;
    this.fovMax = 100;

    this.onPointerDownLon = 0;
    this.onPointerDownLat = 0;
    this.onPointerDownX = 0;
    this.onPointerDownY = 0;

    this.velocityLon = 0;
    this.velocityLat = 0;
    this.lastPointerX = 0;
    this.lastPointerY = 0;
    this.lastPointerTime = 0;
    this.lastFrameTime = 0;

    this.hotspotElements = [];
    this.hotspotData = [];
    this.poiElements = [];
    this.poiData = [];

    this.containerWidth = window.innerWidth;
    this.containerHeight = window.innerHeight;

    this.isTransitioning = false;
    this.transitionDuration = 300;
    this.transitionStartTime = 0;
    this.pendingScene = null;
    this.pendingTexture = null;

    this.isPrewarming = false;
    this.prewarmFrames = 0;
    this.isLoading = false;
    this.hotspotsVisible = true;

    this.pinchStartDistance = 0;
    this.pinchStartFov = 75;
  }

  initPhysicsConstants() {
    this.dragSensitivityX = 0.1;
    this.dragSensitivityY = 0.06;
    this.friction = 0.003;
    this.minVelocity = 0.5;
    this.autoRotateSpeed = 3;
  }

  initReusableVectors() {
    this._target = new THREE.Vector3();
    this._camDir = new THREE.Vector3();
    this._worldPos = new THREE.Vector3();
    this._projected = new THREE.Vector3();
  }

  initBoundMethods() {
    this._onPointerDown = this.onPointerDown.bind(this);
    this._onPointerMove = this.onPointerMove.bind(this);
    this._onPointerUp = this.onPointerUp.bind(this);
    this._onWheel = this.onWheel.bind(this);
    this._onTouchStart = this.onTouchStart.bind(this);
    this._onTouchMove = this.onTouchMove.bind(this);
    this._animate = this.animate.bind(this);
  }

  init() {
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      this.fov,
      this.containerWidth / this.containerHeight,
      0.1,
      1000,
    );

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: "high-performance",
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(this.containerWidth, this.containerHeight);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.container.appendChild(this.renderer.domElement);

    this.maxAnisotropy = Math.min(
      8,
      this.renderer.capabilities.getMaxAnisotropy(),
    );

    this.textureCache = new LRUTextureCache(8, this.renderer);
    this.textureLoader = new THREE.TextureLoader();
    this.loadingPromises = new Map();

    this.createPanoramaSpheres();
    this.createHotspotContainer();
    this.setupThumbnails();
  }

  createPanoramaSpheres() {
    const geometry = new THREE.SphereGeometry(500, 60, 40);
    geometry.scale(-1, 1, 1);

    this.material = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 1,
      depthWrite: false,
      depthTest: false,
    });

    this.sphere = new THREE.Mesh(geometry, this.material);
    this.sphere.renderOrder = 0;
    this.scene.add(this.sphere);

    const geometry2 = new THREE.SphereGeometry(499, 60, 40);
    geometry2.scale(-1, 1, 1);

    this.transitionMaterial = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      depthTest: false,
    });

    this.transitionSphere = new THREE.Mesh(geometry2, this.transitionMaterial);
    this.transitionSphere.renderOrder = 1;
    this.scene.add(this.transitionSphere);
  }

  createHotspotContainer() {
    this.hotspotContainer = document.createElement("div");
    this.hotspotContainer.id = "hotspot-container";
    document.getElementById("app").appendChild(this.hotspotContainer);
  }

  // ===========================================================================
  // TEXTURE LOADING
  // ===========================================================================

  configureTexture(texture) {
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.anisotropy = this.maxAnisotropy;
    texture.generateMipmaps = false;
  }

  loadTexture(sceneId) {
    if (this.textureCache.has(sceneId)) {
      return Promise.resolve(this.textureCache.get(sceneId));
    }

    if (this.loadingPromises.has(sceneId)) {
      return this.loadingPromises.get(sceneId);
    }

    const scene = sceneMap.get(sceneId);
    if (!scene) return Promise.resolve(null);

    const loadPromise = new Promise((resolve) => {
      this.textureLoader.load(
        scene.image,
        (texture) => {
          this.configureTexture(texture);
          this.textureCache.set(sceneId, texture);
          this.textureCache.uploadToGPU(texture);
          this.loadingPromises.delete(sceneId);
          resolve(texture);
        },
        undefined,
        (error) => {
          console.error(`Failed to load ${sceneId}:`, error);
          this.loadingPromises.delete(sceneId);
          resolve(null);
        },
      );
    });

    this.loadingPromises.set(sceneId, loadPromise);
    return loadPromise;
  }

  preloadNeighbors(sceneId) {
    const scene = sceneMap.get(sceneId);
    if (!scene?.hotspots) return;

    scene.hotspots.forEach((hotspot) => {
      if (
        !this.textureCache.has(hotspot.target) &&
        !this.loadingPromises.has(hotspot.target)
      ) {
        const loadFn = () => this.loadTexture(hotspot.target);
        if ("requestIdleCallback" in window) {
          requestIdleCallback(loadFn, { timeout: 2000 });
        } else {
          setTimeout(loadFn, 100);
        }
      }
    });
  }

  async loadInitialScene() {
    this.material.opacity = 0;

    const texture = await this.loadTexture(this.currentSceneId);
    if (texture) {
      this.material.map = texture;
      this.material.color.setHex(0xffffff);
      const scene = sceneMap.get(this.currentSceneId);
      this.createHotspots(scene?.hotspots || []);
      this.createPOIMarkers(scene?.poiMarkers || []);
    }

    this.loadingScreen.classList.add("hidden");
    this.preloadNeighbors(this.currentSceneId);
    this.lastFrameTime = performance.now();
    this.fadeInInitialScene();
    requestAnimationFrame(this._animate);
  }

  fadeInInitialScene() {
    const startTime = performance.now();
    const duration = 600;

    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      this.material.opacity = eased;

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };
    requestAnimationFrame(animate);
  }

  // ===========================================================================
  // UI SETUP
  // ===========================================================================

  setupThumbnails() {
    const thumbnailsContainer = document.getElementById("thumbnails");
    thumbnailsContainer.innerHTML = "";

    this.currentSection.scenes.forEach((scene) => {
      const thumb = document.createElement("div");
      thumb.className = `thumbnail ${scene.id === this.currentSceneId ? "active" : ""}`;
      thumb.dataset.sceneId = scene.id;
      thumb.innerHTML = `
        <img src="${scene.thumbnail}" alt="${scene.name}" loading="lazy" decoding="async" />
        <div class="thumbnail-label">${scene.name}</div>
      `;
      thumb.addEventListener("click", () => this.loadScene(scene.id));
      thumbnailsContainer.appendChild(thumb);
    });
  }

  // ===========================================================================
  // SCENE LOADING
  // ===========================================================================

  async loadScene(sceneId, isInitial = false) {
    if (
      this.isTransitioning ||
      this.isPrewarming ||
      this.isLoading ||
      (sceneId === this.currentSceneId && !isInitial)
    )
      return;

    const scene = sceneMap.get(sceneId);
    if (!scene) return;

    const isCached = this.textureCache.has(sceneId);
    if (!isCached) {
      this.isLoading = true;
      this.showMiniLoader();
    }

    const texture = await this.loadTexture(sceneId);

    if (!isCached) {
      this.hideMiniLoader();
      this.isLoading = false;
    }

    if (!texture) {
      console.error(`Failed to load texture for ${sceneId}`);
      return;
    }

    this.currentSceneId = sceneId;
    document.getElementById("scene-title").textContent = scene.name;
    document.querySelectorAll(".thumbnail").forEach((thumb) => {
      thumb.classList.toggle("active", thumb.dataset.sceneId === sceneId);
    });

    this.applyTextureWithTransition(texture, scene, isInitial);
    setTimeout(() => this.preloadNeighbors(sceneId), 100);
  }

  showMiniLoader() {
    document.getElementById("scene-title").classList.add("loading");
  }

  hideMiniLoader() {
    document.getElementById("scene-title").classList.remove("loading");
  }

  applyTextureWithTransition(texture, scene, isInitial) {
    if (isInitial) {
      this.material.map = texture;
      this.material.color.setHex(0xffffff);
      this.createHotspots(scene.hotspots);
      return;
    }

    this.setHotspotsVisible(false);
    this.pendingTexture = texture;
    this.transitionMaterial.map = null;
    this.transitionMaterial.color.setHex(0x000000);
    this.transitionMaterial.opacity = 0;
    this.prewarmFrames = 2;
    this.isPrewarming = true;
    this.pendingScene = scene;
  }

  updateTransition(now) {
    if (this.isPrewarming) {
      this.prewarmFrames--;
      if (this.prewarmFrames <= 0) {
        this.isPrewarming = false;
        this.isTransitioning = true;
        this.transitionStartTime = now;
      }
      return;
    }

    if (!this.isTransitioning) return;

    const elapsed = now - this.transitionStartTime;
    const halfDuration = this.transitionDuration / 2;

    if (elapsed < halfDuration) {
      const progress = elapsed / halfDuration;
      const eased = 1 - (1 - progress) * (1 - progress);
      this.transitionMaterial.opacity = eased;
    } else if (this.pendingTexture) {
      this.material.map = this.pendingTexture;
      this.material.color.setHex(0xffffff);
      this.pendingTexture = null;

      if (this.pendingScene) {
        this.clearHotspots();
        this.createHotspots(this.pendingScene.hotspots);
        this.createPOIMarkers(this.pendingScene.poiMarkers || []);
      }

      this.finishTransitionFade(elapsed, halfDuration);
    } else {
      this.finishTransitionFade(elapsed, halfDuration);
    }
  }

  finishTransitionFade(elapsed, halfDuration) {
    const progress = (elapsed - halfDuration) / halfDuration;
    const eased = 1 - (1 - progress) * (1 - progress);
    this.transitionMaterial.opacity = 1 - eased;

    if (progress >= 1) {
      this.transitionMaterial.opacity = 0;
      this.isTransitioning = false;

      if (this.pendingScene) {
        requestAnimationFrame(() => this.setHotspotsVisible(true));
        this.pendingScene = null;
      }
    }
  }

  // ===========================================================================
  // HOTSPOTS
  // ===========================================================================

  setHotspotsVisible(visible) {
    this.hotspotsVisible = visible;
    this.hotspotContainer.classList.toggle("hotspots-hidden", !visible);
  }

  clearHotspots() {
    this.hotspotContainer.innerHTML = "";
    this.hotspotElements = [];
    this.hotspotData = [];
    this.poiElements = [];
    this.poiData = [];
  }

  createHotspots(hotspots) {
    if (!hotspots) return;

    const fragment = document.createDocumentFragment();

    hotspots.forEach((hotspot) => {
      const el = document.createElement("div");
      el.className = "hotspot floor-arrow";
      el.innerHTML = `
        <div class="hotspot-label">${hotspot.label}</div>
        <div class="arrow-wrapper">
          <div class="chevron chevron-1"></div>
          <div class="chevron chevron-2"></div>
          <div class="chevron chevron-3"></div>
        </div>
      `;

      const arrowWrapper = el.querySelector(".arrow-wrapper");

      el.addEventListener("click", (e) => {
        e.stopPropagation();
        this.loadScene(hotspot.target);
      });

      el.addEventListener("mouseenter", () => {
        this.loadTexture(hotspot.target);
      });

      fragment.appendChild(el);
      this.hotspotElements.push(el);

      const dir = SphericalUtils.lonLatToDirection(
        hotspot.position.lon,
        hotspot.position.lat,
      );

      this.hotspotData.push({
        el,
        arrowWrapper,
        lon: hotspot.position.lon,
        ...dir,
      });
    });

    this.hotspotContainer.appendChild(fragment);
  }

  updateHotspots() {
    if (this.hotspotData.length === 0 || !this.hotspotsVisible) return;

    this.camera.getWorldDirection(this._camDir);

    for (let i = 0; i < this.hotspotData.length; i++) {
      const data = this.hotspotData[i];
      const dot = SphericalUtils.dotWithCamera(data, this._camDir);

      if (dot <= 0) {
        data.el.style.opacity = "0";
        data.el.style.pointerEvents = "none";
        continue;
      }

      data.el.style.pointerEvents = "auto";

      const screen = SphericalUtils.projectToScreen(
        data,
        this.camera,
        this.containerWidth,
        this.containerHeight,
        this._worldPos,
        this._projected,
      );

      const depthScale = Math.max(0.5, Math.min(1.3, dot * 1.2));
      const deltaYaw = data.lon - this.lon;
      const opacity = Math.max(0.4, Math.min(1, dot * 1.5));

      data.el.style.transform = `translate3d(${screen.x}px, ${screen.y}px, 0) translate(-50%, -50%) scale(${depthScale})`;
      data.el.style.opacity = opacity;
      data.arrowWrapper.style.transform = `perspective(200px) rotateX(65deg) rotateZ(${deltaYaw + 180}deg)`;
    }
  }

  // ===========================================================================
  // POI MARKERS
  // ===========================================================================

  createPOIMarkers(markers) {
    if (!markers || markers.length === 0) return;

    const fragment = document.createDocumentFragment();

    markers.forEach((marker) => {
      const el = document.createElement("div");
      el.className = "poi-marker";
      el.innerHTML = `
        <div class="poi-ripple"></div>
        <div class="poi-dot"></div>
        <div class="poi-icon">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <text x="8" y="12" text-anchor="middle" fill="#333" font-size="14" font-weight="bold" font-family="Arial, sans-serif">𝔦</text>
          </svg>
        </div>
      `;

      el.addEventListener("click", (e) => {
        e.stopPropagation();
        this.openPOIModal(marker);
      });

      fragment.appendChild(el);
      this.poiElements.push(el);

      const dir = SphericalUtils.lonLatToDirection(
        marker.position.lon,
        marker.position.lat,
      );

      this.poiData.push({ el, marker, ...dir });
    });

    this.hotspotContainer.appendChild(fragment);
  }

  updatePOIMarkers() {
    if (this.poiData.length === 0 || !this.hotspotsVisible) return;

    this.camera.getWorldDirection(this._camDir);

    for (let i = 0; i < this.poiData.length; i++) {
      const data = this.poiData[i];
      const dot = SphericalUtils.dotWithCamera(data, this._camDir);

      if (dot < 0.15) {
        data.el.style.opacity = "0";
        data.el.style.pointerEvents = "none";
        continue;
      }

      const screen = SphericalUtils.projectToScreen(
        data,
        this.camera,
        this.containerWidth,
        this.containerHeight,
        this._worldPos,
        this._projected,
      );

      if (screen.z < -1 || screen.z > 1) {
        data.el.style.opacity = "0";
        data.el.style.pointerEvents = "none";
        continue;
      }

      data.el.style.pointerEvents = "auto";
      data.el.style.opacity = "1";
      data.el.style.transform = `translate3d(${Math.round(screen.x)}px, ${Math.round(screen.y)}px, 0) translate(-50%, -50%)`;
    }
  }

  openPOIModal(marker) {
    const modal = document.createElement("div");
    modal.className = "poi-modal-overlay";
    modal.innerHTML = `
      <div class="poi-modal">
        <button class="poi-modal-close">&times;</button>
        <div class="poi-modal-content">
          ${marker.image ? `<img src="${marker.image}" alt="${marker.title}" class="poi-modal-image">` : ""}
          <h2 class="poi-modal-title">${marker.title}</h2>
          <p class="poi-modal-description">${marker.description}</p>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    const closeModal = () => {
      modal.classList.add("closing");
      setTimeout(() => modal.remove(), 300);
    };

    modal
      .querySelector(".poi-modal-close")
      .addEventListener("click", closeModal);
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });

    requestAnimationFrame(() => modal.classList.add("open"));
  }

  // ===========================================================================
  // EVENT HANDLERS
  // ===========================================================================

  setupEventListeners() {
    this.container.addEventListener("pointerdown", this._onPointerDown);
    this.container.addEventListener("pointermove", this._onPointerMove);
    this.container.addEventListener("pointerup", this._onPointerUp);
    this.container.addEventListener("pointercancel", this._onPointerUp);
    this.container.addEventListener("pointerleave", this._onPointerUp);
    this.container.addEventListener("wheel", this._onWheel, { passive: false });
    this.container.addEventListener("touchstart", this._onTouchStart, {
      passive: false,
    });
    this.container.addEventListener("touchmove", this._onTouchMove, {
      passive: false,
    });

    let resizeTimeout;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => this.onResize(), 100);
    });

    document.addEventListener("fullscreenchange", () => this.onResize());

    this.setupUIControls();
  }

  setupUIControls() {
    document
      .getElementById("fullscreen-btn")
      .addEventListener("click", () => this.toggleFullscreen());
    document.getElementById("info-btn").addEventListener("click", () => {
      document.getElementById("info-panel").classList.remove("hidden");
    });
    document.getElementById("close-info").addEventListener("click", () => {
      document.getElementById("info-panel").classList.add("hidden");
    });
    document.getElementById("toggle-nav").addEventListener("click", () => {
      document.getElementById("scene-nav").classList.toggle("collapsed");
    });
    document
      .getElementById("auto-rotate-btn")
      .addEventListener("click", () => this.toggleAutoRotate());
    document
      .getElementById("zoom-in")
      .addEventListener("click", () => this.zoom(-10));
    document
      .getElementById("zoom-out")
      .addEventListener("click", () => this.zoom(10));

    const hideHints = () => {
      document.getElementById("control-hints").classList.add("hidden");
      this.container.removeEventListener("pointerdown", hideHints);
    };
    this.container.addEventListener("pointerdown", hideHints);
  }

  onPointerDown(event) {
    if (this.activePointerId !== null) return;

    this.activePointerId = event.pointerId;
    this.isUserInteracting = true;
    this.container.setPointerCapture(event.pointerId);

    this.velocityLon = 0;
    this.velocityLat = 0;

    this.onPointerDownX = event.clientX;
    this.onPointerDownY = event.clientY;
    this.onPointerDownLon = this.lon;
    this.onPointerDownLat = this.lat;

    this.lastPointerX = event.clientX;
    this.lastPointerY = event.clientY;
    this.lastPointerTime = performance.now();
  }

  onPointerMove(event) {
    if (!this.isUserInteracting || event.pointerId !== this.activePointerId)
      return;

    const now = performance.now();
    const dt = Math.max(now - this.lastPointerTime, 1);

    const movementX = event.clientX - this.onPointerDownX;
    const movementY = event.clientY - this.onPointerDownY;

    const instantVelX =
      ((event.clientX - this.lastPointerX) / dt) * 1000 * this.dragSensitivityX;
    const instantVelY =
      ((event.clientY - this.lastPointerY) / dt) * 1000 * this.dragSensitivityY;

    this.velocityLon = this.velocityLon * 0.5 + instantVelX * 0.5;
    this.velocityLat = this.velocityLat * 0.5 + instantVelY * 0.5;

    this.lon = this.onPointerDownLon - movementX * this.dragSensitivityX;
    this.lat = Math.max(
      -85,
      Math.min(85, this.onPointerDownLat + movementY * this.dragSensitivityY),
    );

    this.lastPointerX = event.clientX;
    this.lastPointerY = event.clientY;
    this.lastPointerTime = now;
  }

  onPointerUp(event) {
    if (event.pointerId !== this.activePointerId) return;

    this.isUserInteracting = false;
    this.activePointerId = null;

    try {
      this.container.releasePointerCapture(event.pointerId);
    } catch (e) {
      // Ignore
    }

    this.velocityLon = -this.velocityLon;
  }

  onWheel(event) {
    event.preventDefault();
    this.zoom(event.deltaY * 0.05);
  }

  onTouchStart(event) {
    if (event.touches.length === 2) {
      this.pinchStartDistance = this.getPinchDistance(event);
      this.pinchStartFov = this.fov;
    }
  }

  onTouchMove(event) {
    if (event.touches.length === 2) {
      event.preventDefault();
      const distance = this.getPinchDistance(event);
      const scale = this.pinchStartDistance / distance;
      this.fov = Math.max(
        this.fovMin,
        Math.min(this.fovMax, this.pinchStartFov * scale),
      );
      this.camera.fov = this.fov;
      this.camera.updateProjectionMatrix();
      this.updateZoomLevel();
    }
  }

  getPinchDistance(event) {
    const dx = event.touches[0].clientX - event.touches[1].clientX;
    const dy = event.touches[0].clientY - event.touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  }

  zoom(delta) {
    this.fov = Math.max(this.fovMin, Math.min(this.fovMax, this.fov + delta));
    this.camera.fov = this.fov;
    this.camera.updateProjectionMatrix();
    this.updateZoomLevel();
  }

  updateZoomLevel() {
    const zoomPercent = Math.round(
      ((this.fovMax - this.fov) / (this.fovMax - this.fovMin)) * 100 + 50,
    );
    document.getElementById("zoom-level").textContent = `${zoomPercent}%`;
  }

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }

  toggleAutoRotate() {
    this.autoRotate = !this.autoRotate;
    document
      .getElementById("auto-rotate-btn")
      .classList.toggle("active", this.autoRotate);
  }

  onResize() {
    this.containerWidth = window.innerWidth;
    this.containerHeight = window.innerHeight;
    this.camera.aspect = this.containerWidth / this.containerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(this.containerWidth, this.containerHeight);
  }

  // ===========================================================================
  // ANIMATION LOOP
  // ===========================================================================

  animate() {
    requestAnimationFrame(this._animate);

    const now = performance.now();
    const dt = Math.min((now - this.lastFrameTime) / 1000, 0.1);
    this.lastFrameTime = now;

    this.updateTransition(now);
    this.updatePhysics(dt);
    this.updateCamera();
    this.updateHotspots();
    this.updatePOIMarkers();

    this.renderer.render(this.scene, this.camera);
  }

  updatePhysics(dt) {
    if (this.isUserInteracting) return;

    const hasVelocity =
      Math.abs(this.velocityLon) > this.minVelocity ||
      Math.abs(this.velocityLat) > this.minVelocity;

    if (hasVelocity) {
      this.lon += this.velocityLon * dt;
      this.lat += this.velocityLat * dt;
      this.lat = Math.max(-85, Math.min(85, this.lat));

      const decay = Math.exp(-this.friction * dt * 1000);
      this.velocityLon *= decay;
      this.velocityLat *= decay;

      if (Math.abs(this.velocityLon) < this.minVelocity) this.velocityLon = 0;
      if (Math.abs(this.velocityLat) < this.minVelocity) this.velocityLat = 0;
    } else if (this.autoRotate) {
      this.lon += this.autoRotateSpeed * dt;
    }
  }

  updateCamera() {
    const phi = THREE.MathUtils.degToRad(90 - this.lat);
    const theta = THREE.MathUtils.degToRad(this.lon);

    this._target.set(
      500 * Math.sin(phi) * Math.cos(theta),
      500 * Math.cos(phi),
      500 * Math.sin(phi) * Math.sin(theta),
    );

    this.camera.lookAt(this._target);
  }
}

// =============================================================================
// STARTUP
// =============================================================================

document.addEventListener("DOMContentLoaded", () => {
  new PanoramaViewer();
});
