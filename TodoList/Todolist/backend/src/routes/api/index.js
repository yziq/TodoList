import express from 'express';
import Greeting from '../../db/greeting';
import TodoItem from '../../db/todoItem';
import dayjs from 'dayjs';

const router = express.Router();

router.get('/hello', async (req, res) => {
    const greeting = await Greeting.findOne({}, null, { lean: true });
    res.json(greeting)
})

// GET /api/todos
router.get('/todos', async (req, res) => {
    const entries = await TodoItem.find({});
    res.status(200).json(entries)
})

// GET /api/todos/{id}
router.get('/todos/:id', async (req, res) => {
    const entry = await TodoItem.findById(req.params.id);
    if (entry) {
        res.status(200).json(entry);
    }
    else {
        res.sendStatus(404);
    }
})

// POST /api/todos
router.post('/todos', async (req, res) => {

    try {
        const newItem = new TodoItem({
            description: req.body.description,
            completedStatus: req.body.completedStatus,
            dueDate: dayjs(req.body.dueDate).toDate()
        })
        await newItem.save();    
        res.setHeader('Location', '/todos/' + newItem._id);
        res.status(201).json(newItem);
    } catch (err) {
        res.status(500).json(err);
    }
})

// PUT /api/todos/{id}
router.put('/todos/:id', async (req, res) => {
    const entry = await TodoItem.findById(req.params.id);
    if (entry) {
        entry.description = req.body.description;
        entry.completedStatus = req.body.completedStatus;
        entry.dueDate = dayjs(req.body.dueDate).toDate();
        await entry.save();
        res.sendStatus(204);
    }
    else {
        res.sendStatus(404);
    }

})

//DELETE /api/todos/{id}
router.delete('/todos/:id', async (req, res) => {
    const { id } = req.params;
    await TodoItem.findByIdAndDelete(id);
    res.sendStatus(204);

})



export default router;