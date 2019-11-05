import Sequelize, { Model } from 'sequelize';

class Plano extends Model {
  static init(sequelize) {
    super.init(
      {
        title: Sequelize.STRING,
        duration: Sequelize.INTEGER,
        price: Sequelize.FLOAT,
        available: Sequelize.BOOLEAN,
      },

      {
        sequelize,
      }
    );
  }
}

export default Plano;
