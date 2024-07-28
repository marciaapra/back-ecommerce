import { MigrationInterface, QueryRunner } from 'typeorm';

export class Products1722105387031 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE IF NOT EXISTS product (
            id varchar(36) NOT NULL,
            name varchar(255) NOT NULL,
            description varchar(255) NOT NULL,
            price int NOT NULL,
            rating int NOT NULL,
            image varchar(255) NOT NULL,
            PRIMARY KEY (id)
        ) 
    `);

    await queryRunner.query(`
        INSERT INTO 
            product (id, name, description, price, image, rating) 
        VALUES
            (uuid(),'Shampoo Cabelos Cacheados', '200ml', 25.00, '', 5),
            (uuid(),'Condicionador Cabelos Cacheados', '200ml', 30.00, '', 3),
            (uuid(),'Shampoo Cabelos Lisos', '200ml', 25.00, '', 5),
            (uuid(),'Condicionador Cabelos Lisos', '200ml', 30.00, '', 3),
            (uuid(),'Perfume Essence Masculino', '100ml', 120.00, '', 5),
            (uuid(),'Perfume Essence Feminino', '100ml', 120.00, '', 5),
            (uuid(),'Hidratante Corporal Soft', '150ml', 60.00, '', 5),
            (uuid(),'Esmalte Cintilante', '10ml', 10.00, '', 4);
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE product`);
  }
}
