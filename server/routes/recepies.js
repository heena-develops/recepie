import express from 'express';
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

let recepies = [];
// all routes here are starting with /recepies

router.get('/', (req, res) => {
    res.send(recepies);
});

router.post('/', (req, res) => {

    const recepie = req.body;

    const createdReceipe = {...recepie, id:uuidv4()}
    recepies.push(createdReceipe);

    res.json(createdReceipe);
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const foundRecepie = recepies.find((recepie) => recepie.id === id );
    res.send(foundRecepie);
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const recepieToDelete = recepies.find((recepie) => recepie.id === id );
    recepies = recepies.filter((recepie) => recepie.id !== id);
    res.json(recepieToDelete);
});

router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const recepieToEdit = recepies.find((recepie) => recepie.id === id );

    const { title, ingredient, steps } = req.body;
    const recepie = recepies.find((recepie) => recepie.id === id)
   
    if(title) recepie.title = title;
    if(ingredient) recepie.ingredient = ingredient;
    if(steps) recepie.steps = steps;


    res.json(recepieToEdit);
});
export default router;