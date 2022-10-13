CREATE TABLE Carrera(
    ID_Carrera int NOT NULL AUTO_INCREMENT,
    Nombre varchar(200),
    Duracion int,
    PRIMARY KEY(ID_Carrera)
);

CREATE TABLE Materia(
    ID_Materia int NOT NULL AUTO_INCREMENT,
    Nombre varchar(200),
    Grado int,
    ID_Carrera int,
    PRIMARY KEY(ID_Materia),
    FOREIGN KEY(ID_Carrera) REFERENCES Carrera(ID_Carrera)
);

CREATE TABLE Grupo(
    ID_Grupo int,
    Nombre varchar(200),
    Grado int,
    PRIMARY KEY(ID_Grupo)
);

CREATE TABLE Horario(
    ID_Horario int NOT NULL AUTO_INCREMENT,
    Hora int,
    Dia int,
    ID_Grupo int,
    ID_Materia int,
    PRIMARY KEY(ID_Horario),
    FOREIGN KEY(ID_Grupo) REFERENCES Grupo(ID_Grupo),
    FOREIGN KEY(ID_Materia) REFERENCES Materia(ID_Materia)
);