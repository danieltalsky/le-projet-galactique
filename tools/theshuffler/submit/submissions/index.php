<!doctype html>

<html lang="en">
<head>
  <meta charset="utf-8">

  <title>Le Projet Galactique - shuffletool</title>
  <meta name="description" content="Le Projet Galactique - shuffletool">
  <meta name="author" content="Christopher Hayes">
  <meta name="author" content="Daniel Talsky">

  <link rel="stylesheet" href="/tools/theshuffler/css/I-can-smell-the-colors.css?v=1.0">
  <style>
	h1 {
		width: 100%;
	}
	ul li {
		margin-bottom: .4em; 
	}
	.hidden {
		display: none;
	}
	ul li ul {
		margin: 1em; font-size: .7em; max-width: 30em; line-height: 1.2em;
	}
	ul li ul li {
		margin-bottom: .6em;
	}
	
@media only screen and (max-device-width: 480px) {
	font-size: .5em;
}	
  </style>

</head>

<body>
<h1>The Shuffler Submissions, of death!</h1>

<ul class="file-list">
<?php
foreach(glob(__DIR__.'/*.json') as $file) {
	$filename = basename($file);
	$json_text = file_get_contents($file);
	$shuffle = json_decode($json_text, true);
    print("<li>");
	print("<a class='toggler' href='#'>"); //href='https://specialdelivery.rabbitrabbit.city/tools/theshuffler/submit/submissions/{$filename}'
	print("{$shuffle['title']} <div style='font-size: 10px;'>{$filename}</div></a>");
	
	print("<ul class='hidden'>");
	foreach ($shuffle['cards'] as $card) {
		print("<li>$card</li>");
	}
	print("</ul>");
	
	print("</li>");
}
?>
</ul>

  <script>
	togglers = document.getElementsByClassName("toggler");
	[...togglers].forEach(
		(toggler, index, array) => {
			toggler.addEventListener("click", function (e) {
				console.log(toggler);
				togglers[index].parentElement.querySelector('ul').classList.toggle("hidden");
				e.preventDefault();
			});  
		}
	);

  </script>
</body>
</html>