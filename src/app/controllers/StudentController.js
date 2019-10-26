import * as Yup from 'yup';
import Student from '../models/Student';

class StudentController {
  async store(req, res) {
    const schema = Yup.object().shape({
      email: Yup.string().required(),
      name: Yup.string().required(),
      nascimento: Yup.string().required(),
      peso: Yup.string().required(),
      altura: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Invalid information' });
    }

    const studentExist = await Student.findOne({
      where: { email: req.body.email },
    });
    if (studentExist) {
      return res.status(400).json({ error: 'Student already exists' });
    }
    const { id, name, email, nascimento, peso, altura } = await Student.create(
      req.body
    );
    return res.json({
      id,
      name,
      email,
      nascimento,
      peso,
      altura,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      confirm_email: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Invalid Informations' });
    }

    const student = await Student.findOne({
      where: { email: req.body.confirm_email },
    });
    if (!student) {
      return res.status(400).json({ error: 'User dont exists' });
    }
    const { name, email, nascimento, peso, altura } = await student.update(
      req.body
    );
    return res.json({
      name,
      email,
      nascimento,
      peso,
      altura,
    });
  }
}

export default new StudentController();
