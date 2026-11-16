#!/usr/bin/env -S node
import type { Contract as End } from '../../snapshots/44239e8cb131541ec50740d92fc5bdb9bff18db1a37252380499a074a45bee4b/contract';
import endContract from '../../snapshots/44239e8cb131541ec50740d92fc5bdb9bff18db1a37252380499a074a45bee4b/contract.json' with { type: 'json' };
import type { Contract as Start } from '../../snapshots/91638e9ce55de8dfd1450ae2ab2172a34ba38b18b25bebec13edb18ab9aa3092/contract';
import startContract from '../../snapshots/91638e9ce55de8dfd1450ae2ab2172a34ba38b18b25bebec13edb18ab9aa3092/contract.json' with { type: 'json' };
import { Migration, MigrationCLI, sql } from '@prisma/orm-postgres/migration';

export default class M extends Migration<Start, End> {
  override readonly startContractJson = startContract;
  override readonly endContractJson = endContract;

  override get operations() {
    return [
      this.addColumnWithTemporaryDefault({
        schema: 'public',
        table: 'user',
        column: 'name',
        type: 'text',
        temporaryDefault: sql`''`,
      }),
      this.addColumnWithTemporaryDefault({
        schema: 'public',
        table: 'user',
        column: 'password',
        type: 'text',
        temporaryDefault: sql`''`,
      }),
    ];
  }
}

MigrationCLI.run(import.meta.url, M);
