import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Button, Container, Form, Row, Col, Table } from "react-bootstrap";
import { useState } from "react";
import { FaCheck, FaPlus, FaTrash } from "react-icons/fa";

const TodoList = () => {
  const [todoList, setTodoList] = useState([]);
  const [text, setText] = useState("");

  const addTodo = () => {
    setTodoList([
      ...todoList,
      {
        data: text,
        date: new Date().toLocaleString().split(",")[0],
        isCompleted: false,
      },
    ]);
    setText("");
  };

  const deleteTodo = (idx) => {
    const resopnse = window.confirm("Do you want to delete?");
    if (resopnse) {
      const newTodo = todoList.filter((todo, index) => {
        if (index === idx) {
          return false;
        } else {
          return true;
        }
      });
      setTodoList(newTodo);
    }
  };

  const toggleTodo=(idx)=>{
    const newTodo = todoList.map((todo,index)=>{
        if(index===idx){
            return{
                ...todo,
                isCompleted:!todo.isCompleted
            }
        }else{
            return todo;
        }
    });

    setTodoList(newTodo);
  };

  return (
    <Container className="mt-3 text-center">
      <h3>TodoList App</h3>
      <Row>
        <Col xs={9}>
          <Form.Control
            type="text"
            onChange={(e) => {
              setText(e.target.value);
            }}
          />
        </Col>
        <Col xs={3}>
          <Button onClick={addTodo}>
            <FaPlus />
            <label className="ms-3">Add</label>
          </Button>
        </Col>
      </Row>
      <br />
      <Row>
        <Table variant="striped">
          <thead>
            <tr>
              <th>List</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {todoList.length > 0
              ? todoList.map((todo, index) => {
                  return (
                    <tr key={index}>
                      <th style={{textDecoration:todo.isCompleted?"line-through":"none"}}>
                        {todo.data}
                      </th>
                      <th style={{textDecoration:todo.isCompleted?"line-through":"none"}}>
                        {todo.date}
                      </th>
                      <th>
                        <FaCheck
                          color="green"
                          style={{ marginRight: 4, cursor: "pointer" }}
                          onClick={()=>toggleTodo(index)}
                        />
                        ||
                        <FaTrash
                          color="red"
                          style={{ marginLeft: 4, cursor: "pointer" }}
                          onClick={() => deleteTodo(index)}
                        />
                      </th>
                    </tr>
                  );
                })
              : ""}
          </tbody>
        </Table>
      </Row>
    </Container>
  );
};

export default TodoList;
