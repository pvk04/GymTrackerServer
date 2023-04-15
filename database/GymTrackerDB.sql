create database GymTracker;

create table Users(
	UserId int primary key auto_increment,
    UserNickname varchar(50) not null unique,
    UserHeight int null check(UserHeight >= 0), -- measure types managment?
    UserDateBirth date not null,
    UserWeight int null check(UserWeight >= 0), -- measure types managment?
    UserEmail varchar(80) not null unique,
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

create table Exercises(
	ExerciseId int primary key auto_increment,
    ExerciseName varchar(100) not null unique,
    ExerciseMeasureType int not null,
    ExerciseDescription varchar(250) null, -- продумать связь созданных упражнений, с пользователем, создавшим их
    foreign key (ExerciseMeasureType) references ExerciseMeasureTypes(ExerciseMeasureTypeId)
);

create table ExerciseMeasureTypes(
	ExerciseMeasureTypeId int primary key auto_increment,
    ExerciseMeasureTypeName varchar(50) not null unique,
    ExerciseMeasureTypeShortName varchar(10) not null unique
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
    foreign key (ExerciseId) references Exercises(ExerciseId),
    foreign key (WorkoutSetWeightMeasureType) references WeightMeasureTypes(WorkoutSetWeightMeasureTypeId)
); 

create table Suplements(
	SuplementId int primary key auto_increment,
    SuplementName varchar(150) not null unique,
    SuplementManufacturer varchar(150) not null,
    SuplementManufactureCountry varchar(150) not null,
    SuplementMeasureType int not null,
    foreign key (SuplementMeasureType) references SuplementMeasureTypes(SuplementMeasureTypeId)
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

create table SuplementMeasureTypes(
	SuplementMeasureTypeId int primary key auto_increment,
    SuplementMeasureTypeName varchar(100) not null unique,
    SuplementMeasureTypeShortName varchar(20) not null unique
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