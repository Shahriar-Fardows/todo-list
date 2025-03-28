import { useState } from "react";
import { AppProvider, Button, Card, FormLayout, Text, TextField } from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";
import TaskLists from "./Component/TaskLists";

function App() {

  const todoList = [
    { id: 1, text: "Complete product descriptions", completed: false, dueDate: new Date() },
    { id: 2, text: "Update inventory counts", completed: false, dueDate: new Date() }
  ];

  const [todos, setTodos] = useState(todoList);
  const [newTodo, setNewTodo] = useState('');


const addTask = (e) => {
    e.preventDefault();
    const date = e.target.dueDate.value; 

    if (!newTodo || !date) return; 

    const newTask = {
      id: todos.length + 1, 
      text: newTodo,
      completed: false,
      dueDate: new Date(date), 
    };

    console.log("New Task: ", newTask); 

    setTodos([...todos, newTask]); 
    setNewTodo(''); 
    e.target.dueDate.value = '';
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <AppProvider>
        <div className="container mx-auto">
          <div className="my-6">
            <Text variant="heading3xl" as="h1">
              Task Manager
            </Text>
          </div>
          <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
            <div className="col-span-1">
              <Card>
                <div className="p-5 border-b border-gray-200">
                  <Text variant="headingMd" as="h2">Add new task</Text>
                </div>
                <form onSubmit={addTask} className="p-5">
                  <FormLayout>
                    <TextField label="Task description" value={newTodo} onChange={setNewTodo} autoComplete="off"/>
                    <div className="relative my-6">
                      <input
                        id="id-date07"
                        type="date"
                        name="dueDate"
                        className="peer relative h-10 w-full rounded border border-slate-200 px-4 text-sm text-slate-500 placeholder-transparent outline-none transition-all autofill:bg-white invalid:border-pink-500 invalid:text-pink-500 focus:border-black focus:outline-none invalid:focus:border-pink-500 focus-visible:outline-none disabled:cursor-not-allowed disabled:bg-slate-50 disabled:text-slate-400"
                      />
                      <label
                        className="absolute -top-2 left-2 z-[1] cursor-text px-2 text-xs text-slate-400 transition-all before:absolute before:left-0 before:top-0 before:z-[-1] before:block before:h-full before:w-full before:bg-white before:transition-all peer-placeholder-shown:top-2.5 peer-placeholder-shown:text-sm peer-autofill:-top-2 peer-required:after:text-pink-500 peer-required:after:content-['\00a0*'] peer-invalid:text-pink-500 peer-focus:-top-2 peer-focus:cursor-default peer-focus:text-xs peer-focus:text-black peer-invalid:peer-focus:text-pink-500 peer-disabled:cursor-not-allowed peer-disabled:text-slate-400 peer-disabled:before:bg-transparent"
                      >
                        Due Date
                      </label>
                    </div>

                    <Button submit primary>Add Task</Button>
                  </FormLayout>
                </form>
              </Card>
            </div>

            <div className="col-span-2">
              <Card>
                <TaskLists todos={todos} setTodos={setTodos} />
              </Card>
            </div>
          </div>
        </div>
      </AppProvider>
    </div>
  );
}

export default App;
