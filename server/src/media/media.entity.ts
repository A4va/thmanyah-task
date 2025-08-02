import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Media {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  term: string;

  @Column({ type: 'jsonb' })
  results: any;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
