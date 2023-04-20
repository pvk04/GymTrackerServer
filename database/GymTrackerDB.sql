create database GymTracker;
use GymTracker;

create table Users(
	UserId int primary key auto_increment,
    UserNickname varchar(50) not null unique,
    HeightInFt tinyint(1) not null default 0, -- if 0 - kg, else in ft
    WeightInLb tinyint(1) not null default 0, -- if 0 - kg, else Lb
    DistanceIn tinyint(1) not null default 0, -- if 0 - metres, else miles
    UserHeight int null check(UserHeight >= 0), -- measure types managment?
    UserDateBirth date not null,
    UserWeight int null check(UserWeight >= 0), -- measure types managment?
    UserEmail varchar(100) not null unique,
    UserPassword varchar(20) not null -- password hash max length?
);

create table Workout(
	WorkoutId int primary key auto_increment,
    WorkoutName varchar(100) not null,
    UserId int not null,
    WorkoutDateTimeStart datetime not null,
    WorkoutTimeEnd time not null,
    WorkoutNote varchar(1000) null,
    foreign key (UserId) references Users(UserId)
);

create table ExerciseMeasureTypes(
	ExerciseMeasureTypeId int primary key auto_increment,
    ExerciseMeasureTypeName varchar(50) not null unique,
    ExerciseMeasureTypeShortName varchar(10) not null unique
);

create table Exercises(
	ExerciseId int primary key auto_increment,
    ExerciseName varchar(100) not null unique,
    ExerciseMeasureType int not null,
    ExerciseDescription varchar(250) null, -- продумать связь созданных упражнений, с пользователем, создавшим их
    foreign key (ExerciseMeasureType) references ExerciseMeasureTypes(ExerciseMeasureTypeId)
);

create table SetTypes(
	SetTypeId int primary key auto_increment,
    SetTypeName varchar(100) not null unique,
    SetTypeDescription varchar(500) not null
);

create table WorkoutSet(
	WorkoutId int not null,
    ExerciseId int not null,
    SetType int not null,
    WorkoutSetReps int null, -- Если бег, то количество повторений не нужно учитывать - продумать это
    WorkoutSetWeight int null, -- Если бег, то вес не нужно учитывать - продумать это
    WorkoutSetDurationSec int null,
    WorkoutSetRestDuration time null, 
    WorkoutSetDistance int null,
    WorkoutSetNote varchar(1000) null,
    foreign key (WorkoutId) references Workout(WorkoutId),
    foreign key (ExerciseId) references Exercises(ExerciseId)
); 

create table SuplementManufacturers(
	SuplementManufacturerId int primary key auto_increment,
    SuplementManufacturerName varchar(150) not null,
    SuplementManufacturerCountry varchar(150) not null
);

create table SuplementMeasureTypes(
	SuplementMeasureTypeId int primary key auto_increment,
    SuplementMeasureTypeName varchar(100) not null unique,
    SuplementMeasureTypeShortName varchar(20) not null unique
);

create table Suplements(
	SuplementId int primary key auto_increment,
    SuplementName varchar(150) not null unique,
    SuplementManufacturer int not null,
    SuplementMeasureType int not null,
    foreign key (SuplementMeasureType) references SuplementMeasureTypes(SuplementMeasureTypeId),
	foreign key (SuplementManufacturer) references SuplementManufacturers(SuplementManufacturerId)
);

create table SuplementRewievs(
	SuplementReviewId int primary key auto_increment,
    UserId int not null,
    Suplement int not null,
    SuplementRewievRate int not null check(SuplementRewievRate >= 1 and SuplementRewievRate <= 10),
    SuplementReviewText varchar(2000) null,
    foreign key (UserId) references Users(UserId),
    foreign key (Suplement) references Suplements(SuplementId)
);

create table TimesOfConsume(
	TimeOfConsumeId int primary key auto_increment,
    TimeOfConsumeName varchar(150) not null unique
);

create table WorkoutSuplement(
 	WorkoutId int not null,
    SuplementId int not null,
    SuplementAmount int not null,
    SuplementTimeOfConsume int not null,
    foreign key (WorkoutId) references Workout(WorkoutId),
    foreign key (SuplementId) references Suplements(SuplementId),
    foreign key (SuplementTimeOfConsume) references TimesOfConsume(TimeOfConsumeId)
); 