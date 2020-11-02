require.config({
    baseUrl: "src",
    paths: {
        jquery: "../libs/jquery-3.5.1",
        THREE: "../libs/three.min",
        OrbitControls: "../libs/controls/OrbitControls",
        // Stats: "../libs/stats.min",
    },
    shim: {
        // THREE: {
        //     exports: "THREE",
        // },
        // orbitControls: {
        //     deps: ["THREE"],
        // },
    },
});
