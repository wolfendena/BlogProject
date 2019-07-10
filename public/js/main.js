const taskItems = document.getElementsByTagName('li');

for (let i = 0; i < taskItems.length; i++) {
    const element = taskItems[i];
    element.addEventListener('click', function(){
        console.log(element.id)
        fetch('/tasks/' + element.id, { method: "delete" } )
        .then((res) => res.json() )
        .then((data) => location.reload() )
    }) 
}