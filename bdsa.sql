create database avaliar;

use avaliar;

create table avaliador{

    id int auto incrincrement not null;
    nome varchar(20) not null;
    email varchar(20) not null;
    nota decimal not null;

    
}