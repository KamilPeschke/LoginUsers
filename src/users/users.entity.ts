import { Reports } from "src/reports/reports.entinty";
import {AfterInsert, AfterRemove, AfterUpdate, Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";


@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({default: true})
    admin: boolean;

    @OneToMany(() => Reports, (reports) => reports.user)
    reports: Reports[];

    @AfterInsert()
    logInsert(){
        console.log('insert a User with id ' + this.id);
    }

    @AfterRemove()
    logRemove(){
        console.log('delete a user with id ' + this.id);
    }

    @AfterUpdate()
    logUpdate(){
        console.log('Update a user whit id ' + this.id);
    }
}