alter table activity_location add locationid int(11) default 0;
alter table activity_location add type varchar(32);

create table activity_submission_locations (
	id INT(11) AUTO_INCREMENT PRIMARY KEY,
    location_id INT(11) DEFAULT 0,
    submission_id INT(11) DEFAULT 0
);

insert into `activity_location` (`type`, `campus`, `locationid`, `name`) values
/*zhuhai*/
("location", "zhuhai", "1", "珠影门口"),
("location", "zhuhai", "2", "珠影门口"),
("location", "zhuhai", "3", "珠影门口"),
("location", "zhuhai", "1", "岁月湖饭堂"),
("location", "zhuhai", "2", "岁月湖饭堂"),
("location", "zhuhai", "1", "榕园饭堂"),
("location", "zhuhai", "2", "榕园饭堂"),
("location", "zhuhai", "3", "榕园饭堂"),
("location", "zhuhai", "4", "榕园饭堂"),
("location", "zhuhai", "1", "荔园饭堂"),
("location", "zhuhai", "2", "荔园饭堂"),
("location", "zhuhai", "3", "荔园饭堂"),
("location", "zhuhai", "4", "荔园饭堂"),
("location", "zhuhai", "0", "榕园广场"),
("location", "zhuhai", "0", "风雨球场前舞台"),
("location", "zhuhai", "0", "体育馆内"),
("poster", "zhuhai", "1", "田径场"),
("poster", "zhuhai", "2", "田径场"),
("poster", "zhuhai", "3", "田径场"),
("poster", "zhuhai", "4", "田径场"),
("poster", "zhuhai", "5", "田径场"),
("poster", "zhuhai", "6", "田径场"),
("poster", "zhuhai", "7", "田径场"),
("poster", "zhuhai", "8", "田径场"),
("poster", "zhuhai", "9", "田径场"),
("poster", "zhuhai", "10", "田径场"),
("poster", "zhuhai", "11", "田径场"),
("poster", "zhuhai", "12", "田径场"),
("poster", "zhuhai", "13", "田径场"),
("poster", "zhuhai", "14", "田径场"),
("poster", "zhuhai", "15", "田径场"),
("poster", "zhuhai", "16", "田径场"),
("poster", "zhuhai", "17", "田径场"),
("poster", "zhuhai", "18", "田径场"),
("poster", "zhuhai", "19", "田径场"),
("poster", "zhuhai", "20", "田径场"),
("poster", "zhuhai", "21", "田径场"),
("poster", "zhuhai", "22", "田径场"),
("poster", "zhuhai", "23", "田径场"),
("poster", "zhuhai", "24", "田径场"),
("poster", "zhuhai", "25", "田径场"),
("poster", "zhuhai", "26", "田径场"),
("poster", "zhuhai", "27", "田径场"),
("poster", "zhuhai", "28", "田径场"),
("poster", "zhuhai", "29", "田径场"),
("poster", "zhuhai", "30", "田径场"),
("poster", "zhuhai", "31", "田径场"),
("poster", "zhuhai", "32", "田径场"),
("poster", "zhuhai", "33", "田径场"),
("poster", "zhuhai", "34", "田径场"),
("poster", "zhuhai", "35", "田径场"),
("poster", "zhuhai", "0", "荔园球场横幅"),
("poster", "zhuhai", "0", "宿舍楼下海报"),
("actionCenter", "zhuhai", "0", "榕园正厅"),
("actionCenter", "zhuhai", "0", "榕园偏厅"),
("functionRoom", "zhuhai", "0", "榕园4号328会议室"),
("classroom", "zhuhai", "0", "普通教学课课室"),
("classroom", "zhuhai", "0", "图书馆地下多功能室"),
("classroom", "zhuhai", "0", "F520/519室"),

/*notrh*/
("classroom", "north", "0", "新教学楼"),
("classroom", "north", "0", "第一、二、三课室"),
("classroom", "north", "0", "第七至十三课室"),
("functionRoom", "north", "0", "会议室"),
("actionCenter", "north", "0", "讲学厅"),
("actionCenter", "north", "0", "排练厅"),
("poster", "north", "0", "田径场"),
("poster", "north", "0", "校道两侧"),
("poster", "north", "0", "篮球场"),
("location", "north", "0", "学一饭堂"),
("location", "north", "0", "校友会堂"),
("location", "north", "0", "篮球、足球场"),
("location", "north", "0", "体育馆");


