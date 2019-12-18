import Enrollment from '../models/Enrollment';
import CheckIn from '../models/CheckIn';

class CheckInController {
  async create(req, res) {
    const enrollment = await Enrollment.findOne({
      where: { student_id: req.query.id },
    });

    if (!enrollment) {
      return res
        .status(401)
        .json('Does Not Exsits Enrollment for this Student');
    }

    const checkin = await CheckIn.create({ student_id: req.query.id });

    return res.json(checkin);
  }
}

export default new CheckInController();
