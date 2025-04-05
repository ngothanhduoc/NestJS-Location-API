import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Tree,
  TreeChildren,
  TreeParent,
  TreeRepository,
  TreeLevelColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('locations')
@Tree('materialized-path')
export class LocationEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  code: string;

  @Column('float')
  area: number;

  @TreeChildren()
  children: LocationEntity[];

  @TreeParent()
  parent: LocationEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
