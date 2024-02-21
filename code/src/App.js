import TodoList from './components/TodoList';
import Textfield  from '@atlaskit/textfield';
import Button from '@atlaskit/button';
import { useCallback, useState } from 'react';
import { v4 } from "uuid";

function App() {
  const [todoList, setTodoList ]= useState([]);
  const [TextInput, setTextInput ]= useState("");

  const onTextInputChange = (e) => {
    setTextInput(e.target.value);
  };

  const onAddBtnClick = useCallback ((e) => {
    setTodoList([
      { id: v4(), name: TextInput, isCompleted: false },
      ...todoList,
    ]);

    setTextInput("");
  },
  [TextInput, todoList]
  )
  return (
    <>
      <h3>Check List created by hoangbaoochii</h3>
      <Textfield name="add-todo" placeholder='add jobs...' elemAfterInput={
        <Button isDisabled={!TextInput} appearance='primary' onClick={onAddBtnClick}>
          add
        </Button>
      }
      css={{ padding: "2px 4px 2px" }}
      value={TextInput}
      onChange={onTextInputChange}
      ></Textfield>
      <TodoList todoList={todoList}/>
    </>   
  );
}

export default App;
