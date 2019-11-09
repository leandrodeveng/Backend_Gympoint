import { addMonths } from 'date-fns';
import Enrollment from '../models/Enrollment';
import Students from '../models/Student';
import Plano from '../models/Plano';

//  Checar se usuário Existe
//  Checar se usuário já tem matricula ativa

class EnrollmentController {
  async create(req, res) {
    // Verifica Existencia do estudante
    const student = await Students.findOne({ where: { name: req.query.name } });
    if (!student) {
      return res.status(400).json({ error: 'Student does not exist' });
    }
    // Verifica Existencia do Plano
    const plan = await Plano.findOne({ where: { title: req.query.plan } });
    if (!plan) {
      return res.status(400).json({ error: 'Plan does not exists' });
    }

    const student_id = student.id;
    const plan_id = plan.id;
    const start_date = new Date();
    const end_date = addMonths(start_date, plan.duration);
    const price = plan.price * plan.duration;

    const enrollmentInfo = {
      student_id,
      plan_id,
      start_date,
      end_date,
      price,
    };

    await Enrollment.create(enrollmentInfo);

    return res.json(enrollmentInfo);
  }
}

export default new EnrollmentController();
