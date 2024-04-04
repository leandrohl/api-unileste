

create table tb_curso (
	cur_id int primary key auto_increment,
    cur_nome varchar(100),
    cur_valor decimal(10,2)
);

insert into tb_curso (cur_nome, cur_valor) values ("Análise e Desenvolvimento de Sistemas", 300);
insert into tb_curso (cur_nome, cur_valor) values ("Sistemas de Informação", 400);
insert into tb_curso (cur_nome, cur_valor) values ("Ciência da computação", 450);
insert into tb_curso (cur_nome, cur_valor) values ("Medicina", 0.50);


create table tb_matricula (
	mat_id int primary key auto_increment,
    mat_nome varchar(255),
    mat_data datetime,
    mat_email varchar(255),
	mat_cep varchar(50),
    mat_endereco varchar(255),
    mat_bairro varchar(100),
    mat_cidade varchar(100),
    mat_uf varchar(2),
    mat_cursando varchar(1),
    cur_id int,
    
    constraint fk_matricula_curso foreign key (cur_id) references tb_curso (cur_id)
);

create table tb_mensalidade (
	men_id int primary key auto_increment,
    men_mes int,
    men_vencimento date,
    men_valor decimal(10,2),
    mat_id int,
    
    constraint fk_mensalidade_matricula foreign key (mat_id) references tb_matricula (mat_id)
    
);


create table tb_usuarioaluno (
	usa_id int primary key auto_increment,
    usa_ra varchar(100),
    usa_senha varchar(20),
    mat_id int,
    
    constraint fk_aluno_matricula foreign key (mat_id) references tb_matricula (mat_id)
)