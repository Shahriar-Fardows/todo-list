import { useCallback, useState } from "react";
import { AppProvider, Button, Card, DatePicker, FormLayout, Text, TextField } from "@shopify/polaris";
import "@shopify/polaris/build/esm/styles.css";
import TaskLists from "./Component/TaskLists";

function App() {

  const todoList = [
    { id: 1, text: "Complete product descriptions", completed: false, dueDate: new Date() },
    { id: 2, text: "Update inventory counts", completed: false, dueDate: new Date() }
  ];

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];


  const [todos, setTodos] = useState(todoList);
  const [newTodo, setNewTodo] = useState('');
  const [selectedDates, setSelectedDates] = useState(new Date());
  const [{ month, year }, setDate] = useState({ month: 1, year: 2018 });

  const handleMonthChange = useCallback(
    (month, year) => setDate({ month, year }),
    [],
  );

  const addTask = (e) => {
    e.preventDefault();

    if (!newTodo || !selectedDates) return;

    const newTask = {
      id: todos.length + 1,
      text: newTodo,
      completed: false,
      dueDate: selectedDates.start,
    };

    console.log("New Task: ", newTask);

    setTodos([...todos, newTask]);
    setNewTodo('');
    setSelectedDates(new Date());
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <AppProvider>
        <div className="container mx-auto">
          <div className="my-6">
            <Text variant="heading2xl" as="h1">
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
                    <TextField label="Task description" multiline={4} value={newTodo} onChange={setNewTodo} autoComplete="off" />
                    <Text variant="headingXs" as="h6">Select Due Date  </Text>
                    <DatePicker
                      month={month}
                      year={year}
                      onChange={setSelectedDates}
                      onMonthChange={handleMonthChange}
                      selected={selectedDates}
                    />
                    <Text variant="headingMd" as="h2">Selected Month: {monthNames[month]} {year}</Text>

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
