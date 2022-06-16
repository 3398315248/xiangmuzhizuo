<?php
	$conn = mysqli_connect("localhost","root","root","lifei");
	if(!$conn){
		die("数据库连接失败：请检查，数据库的地址，端口号，用户名，密码和数据库名是否正确");
	}
?>