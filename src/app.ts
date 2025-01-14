const leftBox = document.querySelector("#left")!;
const rightBox = document.querySelector("#right")!;
const addBox = document.querySelector(".add_box")!;
let boxes = document.getElementsByClassName("box");

// Handle drag event on the boxes
const handleDrag = (e: Event) =>{
    let selected = e.target;   // item that is being dragged
    rightBox.addEventListener("dragover", (e) =>{
        e.preventDefault()
        rightBox.classList.add("droppable")
    })
    rightBox.addEventListener("dragleave", (_) =>{
        rightBox.classList.remove("droppable")
    })
    rightBox.addEventListener("drop", (_) =>{
        if(selected != null){
            (selected as Element).classList.add("on-right")   // change style when the box is in the right container
            rightBox.appendChild(selected as Node)
            selected = null;
        }
        rightBox.classList.remove("droppable")
        leftBox.classList.remove("droppable")
    })
    leftBox.addEventListener("dragover", (e) =>{
        e.preventDefault()
        leftBox.classList.add("droppable")
    })
    leftBox.addEventListener("dragleave", (_) =>{
        leftBox.classList.remove("droppable")
    })
    leftBox.addEventListener("drop", (_) =>{
        if(selected != null){
            (selected as Element).classList.remove("on-right")
            addBox.insertAdjacentElement("beforebegin", selected as Element)
            selected = null;
        }
        leftBox.classList.remove("droppable")
        rightBox.classList.remove("droppable")
    })
}
// For all the boxes, add handleDrag
for(const box of boxes){
    box.addEventListener("dragstart", handleDrag)
}

// To create new boxes
addBox.addEventListener("click", () =>{
    if(boxes.length < 6){
        const newBox = document.createElement("div");
        const img = document.createElement("img");
        img.setAttribute("src", "drag-handle.png")
        img.setAttribute("draggable", "false")
        newBox.classList.add("box")
        newBox.setAttribute("draggable", "true")
        newBox.textContent = (Math.floor(Math.random() * 1000)).toString()  // random id for the boxes
        newBox.appendChild(img)
        newBox.addEventListener("dragstart", handleDrag)
        addBox.insertAdjacentElement("beforebegin", newBox)
    }else{
        return;
    }
})