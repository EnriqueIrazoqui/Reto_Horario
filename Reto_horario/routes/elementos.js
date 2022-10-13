const express = require("express");
const router = express.Router();

const { save_element, get_elements, update_element, eliminar_elemento, save_carrera, save_materia , save_grupo,get_grupo, save_horario} = require('../controller/elementos-controller.js')

router.get('/', get_elements);
router.get('/grupo', get_grupo);

router.post('/', save_element);
router.post('/carrera',save_carrera);
router.post('/materia',save_materia);
router.post('/grupo',save_grupo);
router.post('/horario',save_horario);

router.put('/', update_element);

router.delete('/', eliminar_elemento);


module.exports = router