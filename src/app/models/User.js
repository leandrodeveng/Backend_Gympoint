import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
      },

      {
        sequelize,
      }
    );
    /*    this.addHook('beforeSave', async user => {
      // Adiciona hook de 'beforeSave' para que antes de um usuário ser salvo no banco dados ele execute a função a seguir.
      if (user.password) {
        //  Verifica se existe senha não nula e faz o hash da senha que foi passada, usando o bcrypt
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    }); 
    return this; */
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
