let nav = document.getElementById("footer-nav");
let active = nav.getElementsByTagName("LI");
let isClicked = true;
let index = 2;

for (let i = 0; i < active.length; i++) {
    active[i].onclick = function () {
        if (isClicked) {
            removeBorder(index);
        }
        active[i].classList.add('active');

        index = i;
        isClicked = true;
    }

    function removeBorder(index) {
        active[index].classList.remove('active')
        isClicked = false;
    }
}