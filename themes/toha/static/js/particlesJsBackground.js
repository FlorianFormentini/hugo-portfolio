var config = {
    particles: {
        number: { value: 120, density: { enable: !0, value_area: 1800 } },
        color: { value: "#ffffff" },
        shape: {
            type: "circle",
            stroke: { width: 0, color: "#000000" },
            polygon: { nb_sides: 3 },
        },
        opacity: {
            value: 0.5,
            random: !1,
            anim: { enable: !1, speed: 1, opacity_min: 0.2, sync: !1 },
        },
        size: {
            value: 3,
            random: !0,
            anim: { enable: !1, speed: 20, size_min: 0.1, sync: !1 },
        },
        line_linked: {
            enable: !0,
            distance: 250,
            color: "#ffffff",
            opacity: 0.2,
            width: 1,
        },
        move: {
            enable: !0,
            speed: 1,
            direction: "none",
            random: !1,
            straight: !1,
            out_mode: "out",
            bounce: !1,
            attract: { enable: !1, rotateX: 600, rotateY: 1200 },
        },
    },
    interactivity: {
        detect_on: "window",
        events: {
            onhover: { enable: !1, mode: "grab" },
            onclick: { enable: !1, mode: "push" },
            resize: !0,
        },
        modes: {
            grab: { distance: 180, line_linked: { opacity: 1 } },
            bubble: {
                distance: 400,
                size: 40,
                duration: 2,
                opacity: 8,
                speed: 3,
            },
            repulse: { distance: 200, duration: 0.4 },
            push: { particles_nb: 4 },
            remove: { particles_nb: 2 },
        },
    },
    retina_detect: !0,
};

let clause = window.innerWidth < 768;

config.particles.number.value = clause ? 80 : 150;

particlesJS("particlesjs", config);

test = {
    particles: {
        number: { value: 120, density: { enable: !0, value_area: 1800 } },
        color: { value: "#ffffff" },
        shape: {
            type: "circle",
            stroke: { width: 0, color: "#000000" },
            polygon: { nb_sides: 3 },
        },
        opacity: {
            value: 0.5,
            random: !1,
            anim: { enable: !1, speed: 1, opacity_min: 0.2, sync: !1 },
        },
        size: {
            value: 3,
            random: !0,
            anim: { enable: !1, speed: 20, size_min: 0.1, sync: !1 },
        },
        line_linked: {
            enable: !0,
            distance: 250,
            color: "#ffffff",
            opacity: 0.2,
            width: 1,
        },
        move: {
            enable: !0,
            speed: 1,
            direction: "none",
            random: !1,
            straight: !1,
            out_mode: "out",
            bounce: !1,
            attract: { enable: !1, rotateX: 600, rotateY: 1200 },
        },
    },
    interactivity: {
        detect_on: "window",
        events: {
            onhover: { enable: !1, mode: "grab" },
            onclick: { enable: !1, mode: "push" },
            resize: !0,
        },
        modes: {
            grab: { distance: 180, line_linked: { opacity: 1 } },
            bubble: {
                distance: 400,
                size: 40,
                duration: 2,
                opacity: 8,
                speed: 3,
            },
            repulse: { distance: 200, duration: 0.4 },
            push: { particles_nb: 4 },
            remove: { particles_nb: 2 },
        },
    },
    retina_detect: !0,
};


jQuery(document).ready(function () {
    const element = document.querySelector('#particlesjs');
    element.style.background = "linear-gradient(114.9deg, rgb(34, 34, 34) 8.3%, rgb(0, 40, 60) 41.6%, rgb(0, 143, 213) 93.4%)";
});