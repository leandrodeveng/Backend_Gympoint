import Enrollment from '../models/Enrollment';
import Students from '../models/Student';
import Plano from '../models/Plano';

//  Checar se usuário Existe
//  Checar se usuário já tem matricula ativa

class EnrollmentController {
  async create(req, res) {
    const student = PlanController.findOne({ where: { name: req.query.name } })

    const { }
    return res.json({ mesage: 'PIKA !' });
  }
}

export default new EnrollmentController();
