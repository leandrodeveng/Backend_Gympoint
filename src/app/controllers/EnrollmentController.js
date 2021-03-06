import { addMonths, format } from 'date-fns';
import { pt } from 'date-fns/locale/pt';
import Enrollment from '../models/Enrollment';
import Students from '../models/Student';
import Plano from '../models/Plano';
import Mail from '../../lib/mail';

class EnrollmentController {
  async create(req, res) {
    // Verifica Existencia do estudante
    const student = await Students.findOne({ where: { name: req.query.name } });

    if (!student) {
      return res.status(400).json({
        error:
          'Student does not exist. Create a student profile before create an enrollment',
      });
    }
    // Verifica Existencia do Plano
    const plan = await Plano.findOne({
      where: { title: req.query.plan, available: true },
    });

    if (!plan) {
      return res.status(400).json({
        error:
          'Plan does not exists. Create a student profile before create an enrollment',
      });
    }

    const enrollment = await Enrollment.findOne({
      where: { student_id: student.id },
    });

    if (enrollment) {
      return res
        .status(400)
        .json({ error: 'The Student alreadys have an enrollment' });
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

    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: 'Nova matricula efetuada',
      template: 'enrollmentMail',
      context: {
        aluno: student.name,
        plano: plan.title,
        preco: plan.price,
        data: format(
          enrollmentInfo.end_date,
          "'dia' dd 'de' MMMM', às' H:mm'h'",
          {
            locale: pt,
          }
        ),
      },
    });
    return res.json(enrollmentInfo);
  }

  async index(req, res) {
    const enrollments = await Enrollment.findAll();

    return res.json(enrollments);
  }

  async update(req, res) {
    const student = await Students.findOne({ where: { name: req.query.name } });
    const enrollment = await Enrollment.findOne({
      where: { student_id: student.id },
    });

    if (!enrollment) {
      return res.status(400).json({
        error: 'Does not exist enrollment for this student',
      });
    }

    const plan = await Plano.findOne({ where: { title: req.body.title } });

    if (!plan) {
      return res.status(400).json({ mesage: 'The plan does not exists' });
    }

    const plan_id = plan.id;
    const start_date = new Date();
    const end_date = addMonths(start_date, plan.duration);
    const price = plan.price * plan.duration;

    const enrollmentInfo = {
      plan_id,
      start_date,
      end_date,
      price,
    };

    await enrollment.update(enrollmentInfo);

    return res.json(enrollmentInfo);
  }

  async delete(req, res) {
    const student = await Students.findOne({
      where: { name: req.query.aluno },
    });

    if (!student) {
      return res.status(400).json('Student Does not Exists');
    }

    const enrollment = await Enrollment.findOne({
      where: { student_id: student.id },
    });

    if (!enrollment) {
      return res.status(400).json('Does not exist enrollment for this student');
    }

    await enrollment.destroy();

    return res.json(enrollment);
  }
}

export default new EnrollmentController();
