import Plan from '../models/Plano';

class PlanoController {
  async create(req, res) {
    const plan = await Plan.findOne({
      where: { title: req.body.title },
    });

    if (plan) {
      return res.status(400).json({ error: 'Plan Already Exists' });
    }

    const { title, duration, price } = await Plan.create(req.body);

    return res.json({
      title,
      duration,
      price,
    });
  }

  async index(req, res) {
    const plan = await Plan.findAll();

    return res.json(plan);
  }

  async update(req, res) {
    const plan = await Plan.findOne({ where: { title: req.body.title } });

    if (!plan) {
      return res.status(400).json({ error: 'This Plan Does Not Exists' });
    }

    const { title, duration, price } = await plan.update(req.body);
    return res.json({
      title,
      duration,
      price,
    });
  }

  async delete(req, res) {
    const plan = await Plan.findOne({ where: { title: req.params.name } });

    return res.json(plan);
  }
}

export default new PlanoController();
