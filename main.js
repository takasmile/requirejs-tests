require(["./ThreeOriginal", "THREE"], function (ThreeOriginal, THREE) {
    let mixer;
    let clock = new THREE.Clock();
    let meshes = [];

    function ThreeTest(containerId) {
        ThreeOriginal.call(this, containerId);
    }

    function createGeometry() {
        let geometry = new THREE.BoxBufferGeometry(10, 10, 10);
        return geometry;
    }

    function addAnimation(meshes) {
        // create a keyframe track (i.e. a timed sequence of keyframes) for each animated property
        // Note: the keyframe track type should correspond to the type of the property being animated
        // create some keyframe tracks

        const xAxis = new THREE.Vector3(1, 0, 0);
        const qInitial = new THREE.Quaternion().setFromAxisAngle(xAxis, 0);
        const qFinal = new THREE.Quaternion().setFromAxisAngle(xAxis, Math.PI);
        const quaternionKF = new THREE.QuaternionKeyframeTrack(
            ".quaternion",
            [0, 1, 2],
            [
                qInitial.x,
                qInitial.y,
                qInitial.z,
                qInitial.w,
                qFinal.x,
                qFinal.y,
                qFinal.z,
                qFinal.w,
                qInitial.x,
                qInitial.y,
                qInitial.z,
                qInitial.w,
            ]
        );

        const colorKF = new THREE.ColorKeyframeTrack(
            ".material.color",
            [0, 1, 2],
            [1, 0, 0, 0, 1, 0, 0, 0, 1],
            THREE.InterpolateDiscrete
        );
        const opacityKF = new THREE.NumberKeyframeTrack(".material.opacity", [0, 1, 2], [1, 0, 1]);

        // create clip

        const clip = new THREE.AnimationClip("default", 3, [quaternionKF, colorKF, opacityKF]);

        const animationGroup = new THREE.AnimationObjectGroup();
        meshes.forEach((d) => animationGroup.add(d));
        mixer = new THREE.AnimationMixer(animationGroup);
        const clipAction = mixer.clipAction(clip);
        clipAction.play();
    }

    ThreeTest.prototype = new ThreeOriginal("container");
    ThreeTest.prototype.initModels = function () {
        let geometry = createGeometry();
        let material = new THREE.MeshPhongMaterial({
            skinning: true,
            color: 0xff0000,
        });

        for (let i = 0; i < 5; i++) {
            for (let j = 0; j < 5; j++) {
                const mesh = new THREE.Mesh(geometry, material);

                mesh.position.x = 32 - 16 * i;
                mesh.position.y = 0;
                mesh.position.z = 32 - 16 * j;

                meshes.push(mesh);
                this.scene.add(mesh);
            }
        }

        addAnimation(meshes);
    };

    let test = new ThreeTest("container");
    test.init();

    setInterval(function () {
        let delta = clock.getDelta();
        mixer.update(delta);
    }, 10);
});
