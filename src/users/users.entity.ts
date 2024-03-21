import {AfterInsert, AfterRemove, AfterUpdate, Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    password: string;

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