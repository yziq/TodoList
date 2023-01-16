import mongoose from 'mongoose';
import Greeting from './db/greeting';
import TodoItem from './db/todoItem';

main();

async function main() {
    await mongoose.connect('mongodb://localhost:27017/cs732-se750-quiz-2022', {
        useNewUrlParser: true
    });
    console.log('Connected to database!');
    console.log();

    await clearDatabase();
    console.log();

    await addData();
    console.log();

    // Disconnect when complete
    await mongoose.disconnect();
    console.log('Disconnected from database!');
}

async function clearDatabase() {
    const response = await TodoItem.deleteMany({});
    console.log(`Cleared database (removed ${response.deletedCount} items).`);
}

async function addData() {
    var d1 = new Date()
    const todoItem = new TodoItem({ 
        description: "Todo item1",
        completedStatus: "true",
        dueDate: d1 });

    await todoItem.save();

    console.log(`TodoItem '${todoItem.description}' added to database (_id = ${todoItem._id})`);

    const todoItem2 = new TodoItem({ 
        description: "Todo item2",
        completedStatus: "true",
        dueDate: d1 });

    await todoItem2.save();

    console.log(`TodoItem '${todoItem2.description}' added to database (_id = ${todoItem2._id})`);

}