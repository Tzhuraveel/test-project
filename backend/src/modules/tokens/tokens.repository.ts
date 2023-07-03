import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { Token } from '../../core/database/entities';

@Injectable()
export class TokensRepository extends Repository<Token> {
  constructor(private readonly dataSource: DataSource) {
    super(Token, dataSource.manager);
  }
}
