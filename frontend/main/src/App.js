import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [todo, setTodo] = useState({
    date: "",
    description: "",
    is_completed: false,
    published: "",
  });
  const [todoList, setTodoList] = useState([]);
  const [modal, setModal] = useState(false);

  function checkCompleted(isCompleted) {
    if (isCompleted) {
      return "Completed";
    }
    return "Not Completed";
  }

  useEffect(() => {
    async function getList() {
      let response = await fetch("http://127.0.0.1:8000/api/todo/");
      let serialize_response = await response.json();
      setTodoList(serialize_response);
    }
    getList();
  }, []);

  function refresh() {
    axios
      .get("http://127.0.0.1:8000/api/todo/")
      .then((response) => setTodoList(response.data));
  }

  function handleCreate(e, item) {
    e.preventDefault();
    if (item.id) {
      setTodo(item)
      setModal(true)
      axios
        .put(`http://127.0.0.1:8000/api/todo/${item.id}/`, item)
        .then(() => refresh());
    } else {
      axios.post("http://127.0.0.1:8000/api/todo/", item).then(() => refresh());
      setModal(false)
    }
  }

  function handleDelete(e, item) {
    if (item) {
      axios
        .delete(`http://127.0.0.1:8000/api/todo/${item.id}/`)
        .then(() => refresh());
    }
  }

  function trackChange(e) {
    if (e.target.type === "checkbox") {
      e.target.value = e.target.checked;
    }
    setTodo({ ...todo, [e.target.name]: e.target.value });
  }

  function inputTask(props) {
    return (
      <form method="post">
        <div className="input-div">
          <button onClick={() => setModal(false)} className="x-btn"> X </button>
          <label className="date-label"> Date </label>
          <input
            className="date-inp"
            type="text"
            value={props.date}
            name="date"
            onChange={(e) => trackChange(e)}
            placeholder="insert the date to finish this list"
          >
          </input >
          <label className="description-label"> Description </label>
          <textarea
            value={props.description}
            name="description"
            onChange={(e) => trackChange(e)}
            placeholder="write description"
            className="desc-inp"
          >
          </textarea>
          <label className="status-label"> Status </label>
          <input
            className="status-inp"
            type="checkbox"
            value={props.is_completed}
            name="is_completed"
            onChange={(e) => trackChange(e)}
          >
          </input>
          <button className="create-btn" type="submit" onClick={(e) => handleCreate(e, props)}>
            Create
          </button>
        </div>
      </form>
    );
  }

  function createItem() {
    //the purpose of this function is to refresh the todo object everytime you want to create a new item
    let item = {
      date: "",
      description: "",
      is_completed: false,
    };
    setModal(true);
    setTodo(item);
  }

  function displayList() {
    let items = todoList;
    return items.map((item) => {
      return (
        <div className="section">
          <label className="date-lbl">DATE TO BE DONE </label>
          <span key="1" className="date"> {item.date} </span>
           <label className="desc-lbl">DESCRIPTION</label>
          <span key="2" className="description"> {item.description} </span>
           <label className="status-lbl">STATUS</label>
          <span key="3" className="status"> {checkCompleted(item.is_completed)} </span>
           <label className="publish-lbl">PUBLISH DATE</label>
          <span key="4" className="published"> {item.published} </span>
          <button className="del-btn" onClick={(e) => handleDelete(e, item)}>
            Delete
          </button>
          <button className="edit-btn" onClick={(e) => handleCreate(e, item)}>
            Edit
          </button>
        </div>
      );
    });
  }
  return (
    <div className="main-div">
      {displayList()}
      <button className="add-task-btn" onClick={() => createItem()}>
        Add Task
      </button>
      {modal ? inputTask(todo) : null}
    </div>
  );
}


export default App;
