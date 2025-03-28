import { Text, Button, Checkbox, List } from "@shopify/polaris";

const TaskLists = ({ todos, setTodos }) => {
    console.log("TaskLists: ", todos);

    const handleTaskCompletion = (id) => {
        setTodos(todos.map(task => 
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    const handleDeleteTask = (id) => {
        setTodos(todos.filter(task => task.id !== id));
    };

    return (
        <div className="p-5">
            <div className="mb-6">
                <Text variant="headingXl" as="h2" className="mb-4">
                    Your Tasks
                </Text>
                </div>
                <List  type="number">
                    {todos.map((task) => (
                        <List.Item key={task.id} className="flex justify-between items-center mb-4">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-5">
                                <Checkbox checked={task.completed} onChange={() => handleTaskCompletion(task.id)} label={task.text}/>
                                <Text variant="bodySm" color={task.completed ? 'subdued' : 'default'}>
                                    {task.dueDate.toLocaleDateString()}
                                </Text>
                                </div>
                                <Button onClick={() => handleDeleteTask(task.id)} destructive size="slim" >
                                Delete
                            </Button>
                            </div>
                            
                        </List.Item>
                    ))}
                </List>
        </div>
    );
};

export default TaskLists;
