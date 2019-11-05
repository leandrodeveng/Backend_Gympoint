import Plan from '../models/Plano';

class PlanoController {
  async create(req, res) {
    const planoExist = await Plan.findOne({
      where: { title: req.body.title },
    });

    if (planoExist) {
      return res.status(400).json({ error: 'Plan Already Exists' });
    }

    const { title, duration, price } = await Plan.create(req.body);

    return res.json({
      title,
      duration,
      price,
    });
  }
}

export default new PlanoController();
