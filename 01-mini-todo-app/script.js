console.log("hello");

let submit_btn = document.querySelector("#task-btn");
let input = document.querySelector("#task-input");
let filters = document.querySelector(".filters");
let filter_btn = document.querySelector(".filter_btn");
let active = document.querySelector(".active");
let completed = document.querySelector(".completed");
let task_list = document.querySelector(".task-list");
let task_item = document.querySelector(".task-items");
let task_remaining = document.querySelector(".task-no");
let clear_all_btn = document.querySelector(".clear-all-btn");


let task;
let task_array = [];
let remaining = 0;
let new_item;
let current_filter = "all";
let active_list = [];

submit_btn.addEventListener("click", (e)=>{
    e.preventDefault();

    task = input.value;
    console.log(task);

    check_task(task);
    console.log(task_array);
});
    
function check_task(task){
    task = task.trim();
        
    if(task != ""){
        if(!(task_array.some(item=>item.task === task))){
            let new_object = {
                id: task_array.length + 1,
                task: task,
                completed: false
            }

            task_array.push(new_object);

            remaining ++;
            task_remaining.textContent = `${remaining} tasks remaining`

            add_items()
        }
    }
}



filters.firstElementChild.addEventListener("click", ()=>{
        current_filter = "all";
        add_items()
})

active.addEventListener("click", ()=>{
        current_filter = "active";
        add_items()
})

completed.addEventListener("click", ()=>{
        current_filter = "completed";
        add_items()
})


function add_items(){
    switch (current_filter) {
        case "all":
            active.classList.remove("selected")
            completed.classList.remove("selected")
            filters.firstElementChild.classList.add("selected");
            rendertasks(task_array)
            break;

        case "active":
            filters.firstElementChild.classList.remove("selected")
            filters.lastElementChild.classList.remove("selected")
            active.classList.add("selected");

            active_list = task_array.filter(item=>item.completed === false);
            rendertasks(active_list)
            break;

        case "completed":
            filters.firstElementChild.classList.remove("selected")
            active.classList.remove("selected");
            completed.classList.add("selected");

            active_list = task_array.filter(item=>item.completed === true)
            rendertasks(active_list)
            break;
    }
}



function rendertasks(array){
    task_list.replaceChildren();

    for (let i = 0; i < array.length; i++) {
        const element = array[i];

        new_item = task_item.cloneNode(true);
        new_item.querySelector("p").textContent = element.task;

        let checkbox = new_item.querySelector("input")
        checkbox.checked = element.completed;
    
        checkbox.addEventListener("change", (e)=>{
            element.completed = e.target.checked;

            remaining = task_array.filter(item=>item.completed === false).length
            task_remaining.textContent = `${remaining} tasks remaining`

            add_items()
        })


        let delete_icon = new_item.querySelector(".del-icon");
        delete_icon.addEventListener("click", ()=>{
            const index = task_array.findIndex(item=>item.id === element.id);
            if(index !== -1){
                task_array.splice(index, 1);
            }
            remaining = task_array.filter(item=>item.completed === false).length
            task_remaining.textContent = `${remaining} tasks remaining`
            
            add_items()
        })


        task_list.append(new_item);
        new_item.classList.remove("display-none");
    }
}

clear_all_btn.addEventListener("click", ()=>{
        task_array = task_array.filter(item=>item.completed === false);
        console.log(task_array);
        add_items()
})

