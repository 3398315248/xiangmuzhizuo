<?php
	include("./header.php");
	include("./conndb.php");
	
	//3）、传输数据（过桥）
	$sqlstr = "select * from goodsType order by typeid";
	$result = mysqli_query($conn,$sqlstr);//执行查询的sql语句后，有返回值，返回的是查询结果
	if(!$result){
		die("获取数据失败".mysqli_error());
	}
	//查询列数
	 $query_cols = mysqli_num_fields($result);
	 //echo "列数：".$query_cols;
	//查询行数
    $query_num =mysqli_num_rows($result);
    //echo "行数：".$query_num;
	
	$str="[";
	
	$query_row = mysqli_fetch_array($result);//游标下移,拿出结果集中的某一行，返回值是拿到的行；
	while($query_row){
		$str = $str.'{ "typeId":"'.$query_row[0].'","goodsType":"'.$query_row[1].'","img":"'.$query_row[2].'"
		}';
		
		$query_row = mysqli_fetch_array($result);
		if($query_row){
			$str = $str.",";
		}
	}
	$str = $str."]";
	//4、关闭数据库
	mysqli_close($conn);
	
	//3、给客户端返回商品的json数组！
	echo $str;
?>
