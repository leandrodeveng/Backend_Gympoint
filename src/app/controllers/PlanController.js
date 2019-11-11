import Plan from '../models/Plano';

class PlanoController {
  async create(req, res) {
    const plan = await Plan.findOne({
      where: { title: req.body.title },
    });

    if (plan) {
      // Verifica se o plano existe e está disponível.
      // Caso verdade não cria.
      return res.status(400).json({
        error: 'Plan Already Exists. Check if is available',
      });
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
    // Lista todos os planos.
    return res.json(plan);
  }

  async update(req, res) {
    const plan = await Plan.findOne({ where: { title: req.body.title } });

    if (!plan) {
      return res.status(400).json({ error: 'This Plan Does Not Exists' });
    }

    const { title, duration, price, available } = await plan.update(req.body);
    return res.json({
      title,
      duration,
      price,
      available,
    });
  }

  async delete(req, res) {
    const plan = await Plan.findOne({
      where: { title: req.params.name, available: true },
    });

    if (!plan) {
      return res
        .status(400)
        .json({ error: 'This Plan Does Not Exists or is already disabled' });
    }

    plan.available = false;

    await plan.save();

    return res.json(plan);
  }
}

export default new PlanoController();
