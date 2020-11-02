define(["jquery", "THREE", "OrbitControls"], function ($, THREE) {
    function ThreeOriginal(domId) {
        console.log("domId:", domId);
        // this.dom = $("#" + domId);
        this.dom = document.getElementById(domId);
        console.log("dom:", this.dom);
        this.width = this.dom.clientWidth;
        this.height = this.dom.clientHeight;

        this.renderer = {};
        this.camera = {};
        this.scene = {};
        this.light = {};
        this.controls = {};
        this.models = {};
        // this.stats = {};
    }

    ThreeOriginal.prototype = {
        constructor: ThreeOriginal,
        init() {
            this.initRenderer();
            this.initScene();
            this.initCamera();
            this.initLight();
            // this.initStats();
            this.initControls();
            this.initModels();
            this.animate();
        },
        initModels() {
            let geometry = new THREE.BoxGeometry(50, 50, 50);
            let material = new THREE.MeshLambertMaterial({
                color: 0xffff00,
                side: THREE.DoubleSide,
            });
            this.scene.add(new THREE.Mesh(geometry, material));
        },
        initRenderer() {
            this.renderer = new THREE.WebGLRenderer({
                antialias: true,
                alpha: true,
            });
            this.renderer.setPixelRatio(window.devicePixelRatio);
            this.renderer.setSize(this.width, this.height);
            this.renderer.setClearColor(0x000000, 1.0);
            this.renderer.shadowMap.enabled = true;
            this.dom.appendChild(this.renderer.domElement);
        },
        initCamera() {
            this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 1, 10000);
            this.camera.position.set(100, 100, -100);
            this.camera.lookAt({ x: 0, y: 0, z: 0 });
        },
        initScene() {
            this.scene = new THREE.Scene();
            this.scene.fog = new THREE.FogExp2(0xffffff, 0.004);
        },
        initLight() {
            this.scene.add(new THREE.AmbientLight(0xf0f0f0, true));

            let directionalLight = new THREE.DirectionalLight(0x0f0f0f, 0.8);
            this.scene.add(directionalLight);
        },
        initControls() {
            this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
            this.controls.enableDumpling = true;
            this.controls.dampingFactor = 0.5;
            this.controls.enableZoom = true;
        },
        // initStats() {
        //     console.log("Stats", Stats);
        //     this.stats = new Stats();
        //     this.dom.appendChild(this.stats.dom);
        // },

        render() {
            this.renderer.render(this.scene, this.camera);
        },
        animate() {
            // this.stats.update();
            this.controls.update();
            this.renderer.render(this.scene, this.camera);
            requestAnimationFrame(this.animate.bind(this));
        },
        onWindowResize() {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();

            renderer.setSize(window.innerWidth, window.innerHeight);
        },
    };

    return ThreeOriginal;
});
