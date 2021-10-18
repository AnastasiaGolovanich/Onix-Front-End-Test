let images = ['assets/comment-1.jpg', 'assets/comment-2.jpg', 'assets/comment-3.jpg', 'assets/comment-4.jpg'];
let imagesInComment = document.getElementById("images-in-comment");

images.forEach(function (currentImage) {
    //add images on comment
    let newImg = document.createElement("img");
    newImg.src = currentImage;
    imagesInComment.appendChild(newImg);

    //change number in Notification
    newImg.onclick = function () {
        let index = images.indexOf(currentImage);
        let className = document.getElementById("notification");
        className.setAttribute('data-after',index);
    }
})

