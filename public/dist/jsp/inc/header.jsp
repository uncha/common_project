<!DOCTYPE html>
<html>
<head>
<title></title>
<link rel="stylesheet" href="/resources/css/reset.css" type="text/css" />
<link rel="stylesheet" href="/resources/css/common.css" type="text/css" />
<script type="text/javascript" src="/resources/libs/jquery/js/jquery.min.js"></script>
<script type="text/javascript" src="/resources/libs/system/system.js"></script>
<link rel="stylesheet" href="/resources/js/common.js" type="text/css" />
<script>
// set our baseURL reference path
SystemJS.config({
    baseURL: '/resources/js'
});
// common.js 자동으로 load
SystemJS.import('common.js').then(function(){
	if(typeof systemInit === 'function') systemInit();
});
</script>
</head>
<body>
<header id="header">
	header
</header>