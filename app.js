const Button = document.getElementById("button");
const TodoList = document.getElementById("todo-list");
const TodoFilter = document.getElementById("todo-filter");
const TodoInput = document.getElementById("todo-input");
//Todo Elemanlarini sehifeye yazdirma
const CreateItem = (TodoText) =>{
    const Item = document.createElement('div');
    Item.classList.add('todo-item','todo');
    const ItemLi = document.createElement('li');
    ItemLi.innerHTML = TodoText;
    const ItemRemove = document.createElement('i');
    ItemRemove.classList.add('fas','fa-trash-alt');
    ItemRemove.setAttribute('onclick','removeTodo(this)');
    Item.appendChild(ItemLi);
    Item.appendChild(ItemRemove);
    TodoList.appendChild(Item);
};
//Todo elemanlarini LocalStorageden alma
const getTodosStorage = () =>{
    const storage = JSON.parse(localStorage.getItem('todos'));
    return (storage) ? storage : [];
}

const todos = getTodosStorage();

//todo Arrayini Create item fonksiyonuna gondermek
const getTodos = () =>
    todos.forEach(todo => {
        CreateItem(todo);
});

//Todo elemanlarini Sayfadan kaldirmak icin function
const removeTodo = (e) => {
    const todo = e.parentNode.childNodes[0].innerHTML;
    removeTodoStorage(todo);
    e.parentNode.remove()
}

//Todo elemanlarini storageden kaldirmak icin function
const removeTodoStorage = (todo) =>{
    const index = todos.indexOf(todo);
    if(index > -1){
        todos.splice(index,1);
        localStorage.setItem('todos',JSON.stringify(todos))
    }
}

//todo elemanlarini storage'e kaydetme
const saveTodos = (todo) =>{
    todos.push(todo);
    localStorage.setItem('todos',JSON.stringify(todos))
    CreateItem(todo);
}

Button.addEventListener('click',()=>{
    const input = TodoInput.value;
    TodoInput.value = "";
    if(input) saveTodos(input);
});


window.addEventListener('load',getTodos());



