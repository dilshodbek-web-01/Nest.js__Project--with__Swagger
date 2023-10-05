import { Inject, Injectable } from '@nestjs/common';
import { KnexConfig } from '../KnexConfig/knexConfig';

@Injectable()
export class AuthRepository {
  @Inject()
  private readonly knexConfig: KnexConfig;

  getUserByEmail(email) {
    const knex = this.knexConfig.instance;
    return knex.select('*').from('users').where({ email: email });
  }

  register(userInfo) {
    const knex = this.knexConfig.instance;
    return knex('users').returning('*').insert(userInfo);
  }

  login(userInfo) {
    const knex = this.knexConfig.instance;
    return knex.select('*').from('users').where({ email: userInfo.email });
  }
}
