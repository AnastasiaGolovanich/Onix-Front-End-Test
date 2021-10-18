let completedTasks = document.getElementById("completed-task");
let countCompleted = completedTasks.innerText;
let countOpen = document.getElementById("open-task").innerText;
completedTasks.onclick = function () {
    if (confirm("Are you sure you want to change the number of tasks?")) {
        if(countOpen>0){
            countCompleted++;
            countOpen--;
            document.getElementById("completed-task").innerText = countCompleted;
            document.getElementById("open-task").innerText = countOpen;
        } else {
            alert("You have no open tasks.")
        }
}
}