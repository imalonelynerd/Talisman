(function() {
    // Add event listener
    document.addEventListener("mousemove", parallax);
    const elem = document.getElementById("parallax");
    // Magic happens here
    function parallax(e) {
        let _w = window.innerWidth/2;
        let _h = window.innerHeight/2;
        let _mouseX = e.clientX;
        let _mouseY = e.clientY;
        let _depth = `${50 - (_mouseX - _w) * 0.005}% ${50 - (_mouseY - _h) * 0.005}%`;
        let x = `${_depth}`;
        //console.log(x);
        elem.style.backgroundPosition = x;
    }

})();