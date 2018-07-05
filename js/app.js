var welcomeTimeline = anime.timeline();

welcomeTimeline
    .add({
        targets: "#content",
        width: "97vw",
        height: "95vh",
        easing: "easeInOutQuad"
    })
    .add({
        targets: ".container",
        opacity: 1,
        easing: "easeInOutQuad"
    });
