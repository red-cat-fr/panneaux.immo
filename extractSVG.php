
<script src="js/export.js"></script>

<?php
$db='panneaux_immo_svg';
$host='localhost:3307';
$username='root';
$password='root';
//vs mac
// $db='panneaux_immo_svg';
// $host='127.0.0.1';
// $username='root';
// $password='dadfba16';

$con=mysqli_connect($host,$username,$password,$db);

if (mysqli_connect_errno())
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }else{
      echo"Connect OK";
  };


//pour la simulation, je part du fait de recevoir un email avec le N° de commande
$ordNr = array_search('', $_GET);
$fileFront ="svg/$ordNr&Front.svg";
$fileBack ="svg/$ordNr&Back.svg";
$ff = fopen($fileFront, "x+");
$fb = fopen($fileBack, "x+");
    //unité utilisée dans le SVG extrait :
$unit="mm";

//Récupération de l'Id et des caractéristiques du SVG front
//ff : front file/fb back file
$reqSvgFront="SELECT * FROM `svg_canvas` AS `svgcf` WHERE (svgcf.order_number='$ordNr' AND svgcf.side='front')";
if ($result=mysqli_query($con, $reqSvgFront)) {
    $val = mysqli_fetch_array($result);
        $svgFrontId = $val["id"];
        var_dump($svgFrontId);
        $index=0;
        var_dump(count($val)/2);

        for ($i=0; $i <count($val)/2 ; $i++) {
            $svgFront[$i]=$val[$i];
        }
        $index+=1;
        $intHeight = $svgFront[2]*2;
        $strHeight=strval($intHeight);
        $height=$strHeight.$unit;
        $intWidth=$svgFront[3]*2;
        $strWidth=strval($intWidth);
        $width=$strWidth.$unit;
        var_dump($svgFront);

        fputs($ff,"<?xml version='1.0' encoding='utf-8'?>\n");
        fputs($ff,"<!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 20010904//EN'
        'http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd'>\n");

        fputs($ff,"<svg width='$width' height='$height' xml:lang='fr'\n");

        fputs($ff,"xmlns='http://www.w3.org/2000/svg'\n");
        fputs($ff,"xmlns:xlink='http://www.w3.org/1999/xlink'\n");
        fputs($ff,"style='background-color:$svgFront[4]' \n");
        fputs($ff,"id='frontConfigurationSVG'\n");
        fputs($ff," viewBox='0 0 $intWidth $intHeight'>\n");

} else {
    echo "Error: " . $reqSvgFront . "<br>" . mysqli_error($con);
}

//Récupération de l'Id et des caractéristiques des éléments front
$reqElementsFront="SELECT * FROM `svg_element` WHERE `id_svg` = '$svgFrontId'";
if ($result = mysqli_query($con, $reqElementsFront)) {

    $index=0;
    while ($row = mysqli_fetch_row($result)) {
        var_dump(count($row));
        for ($i=0; $i <count($row) ; $i++) {
            $tableElementFront[$index][$i]=$row[$i];
        }
        $index+=1;
    }
        displayElements($tableElementFront,$index,$ff);


        var_dump($tableElementFront);
    /* Libère le jeu de résultats */
    mysqli_free_result($result);
}else {
    echo "Error: " . $reqElementsFront . "<br>" . mysqli_error($con);
}




/*traitement des éléments.
- traitement des valeurs (conversion en string)
- traitement des spécificités liès au type d'élément (switch/case)
Cette partie est à factoriser pour les 2 cotés.
Reste à traiter les rotations et le point d'insertion des éléments
(en BDD, c'est le centre de chaque élément qui a été enregistré)
*/
function displayElements($table,$index,$side)
{
    # code...

for ($i=0; $i <$index ; $i++) {

    $intTop=$table[$i][4]*2;
    $strTop=strval($intTop);
    $top=$strTop;

    $intLeft=$table[$i][5]*2;
    $strLeft=strval($intLeft);
    $left=$strLeft;

    $intHeight=$table[$i][6]*2;
    $strHeight=strval($intHeight);
    $height=$strHeight;

    $intWidth=$table[$i][7]*2;
    $strWidth=strval($intWidth);
    $width=$strWidth;

    $intRadius=$table[$i][8]*2;
    $strRadius=strval($intRadius);
    $radius=$strRadius;

    $intRadiusX=$table[$i][9]*2;
    $strRadiusX=strval($intRadiusX);
    $radiusX=$strRadiusX;

    $intRadiusY=$table[$i][10]*2;
    $strRadiusY=strval($intRadiusY);
    $radiusY=$strRadiusY;

    $color=$table[$i][11];
    $text=$table[$i][12];
    $police=$table[$i][13];
    $bold=$table[$i][14];
    $style=$table[$i][15];
    $rotation=$table[$i][16];
    $scall=$table[$i][17];
    $url=$table[$i][18];

    /*Attention, c'est le centre de l'élément qui est dans la table.
    L'insertion est en haut à gauche
    (texte bas gauche ou .style("text-anchor","middle"))
    */


    switch ($table[$i][2]) {
        case 'text': //attention aux px
            $left=($intLeft);
            $top=($intTop);
            $type="<text x='$left' y='$top' font-size='$intHeight'
                font-style='$style' fill='$color' font-family='$police'
                font-weight='$bold'
                style='text-anchor:middle'
                transform='rotate($rotation,$left,$top)'>$text</text>";
            break;
        case 'line':
            $intX1=$left-$width/2;
            $strX1=strval($intX1);
            $x1=$strX1;

            $intX2=$left+$width/2;
            $strX2=strval($intX2);
            $x2=$strX2;

            $y1=$top;
            $y2=$top;
            $type="<line x1='$x1' y1='$y1' x2='$x2' y2='$y2' style='stroke:$color' stroke-width='$height'
            transform='rotate($rotation $intLeft $intTop)'/>";
            break;
        case 'rectangle':
            $left=($intLeft-$intWidth/2);
            $top=($intTop-$intHeight/2);
            $type="<rect x='$left' y='$top' height='$height' width='$width' style='fill:$color'
            transform='rotate($rotation $intLeft $intTop)'/>";
            break;
        case 'circle':
            $type="<circle cx='$left' cy='$top' r='$radius' style='fill:$color'
            transform='rotate($rotation,$intLeft,$intTop)'/>";
            break;
        case 'ellipse':
            $type="<ellipse cx='$left' cy='$top' rx='$radiusX' ry='$radiusY' style='fill:$color'
            transform='rotate($rotation,$left,$top)'/>";
            break;
        case 'triangleRectangle':
            $x1=$left-$width/2;
            $y1=$top+$height/2;
            $x2=$left+$width;
            $y2=$top+$height/2;
            $x3=$left-$width/2;
            $y3=$top-$height;
            $type="<path d= 'M $x1 $y1 L $x2 $y2 L $x3 $y3 Z' style='fill:$color'
            transform='rotate($rotation,$intLeft,$intTop)'/>";
            break;
        case 'triangleIsocele':
            $x1=$left-$width/2;
            $y1=$top+$height/2;
            $x2=$left+$width/2;
            $y2=$top+$height/2;
            $x3=$left;
            $y3=$top-$height;
            $type="<path d= 'M $x1 $y1 L $x2 $y2 L $x3 $y3 Z' style='fill:$color'
            transform='rotate($rotation,$intLeft,$intTop)'/>";
            break;
        case 'triangleEquilateral':
            $x1=$left-$width/2;
            $y1=$top+$height/2;
            $x2=$left+$width/2;
            $y2=$top+$height/2;
            $x3=$left;
            $y3=$top-$height/2;
            $type="<path d= 'M $x1 $y1 L $x2 $y2 L $x3 $y3 Z' style='fill:$color'
            transform='rotate($rotation,$intLeft,$intTop)'/>";
            break;
    }
    fputs($side,"$type\n");

}

fputs($side,"Si vous lisez ce message c'est que votre navigateur ne supporte pas le format SVG</svg>\n");

};

//Récupération de l'Id et des caractéristiques du SVG back
$reqSvgBack="SELECT * FROM `svg_canvas` AS `svgcb` WHERE svgcb.order_number='$ordNr' AND svgcb.side='back'";
if ($result=mysqli_query($con, $reqSvgBack)) {
    $val = mysqli_fetch_array($result);
        $svgBackid = $val["id"];
        var_dump($svgBackid);
        var_dump($val)/2;
        $index=0;
        for ($i=0; $i <count($val)/2 ; $i++) {
            $svgBack[$i]=$val[$i];
        }
        $index+=1;
        var_dump($svgBack);
    } else {
        echo "Error: " . $reqSvgBack . "<br>" . mysqli_error($con);
    }
    if (isset($svgBack[0])) {

        $intHeight = $svgBack[2]*2;
        $strHeight=strval($intHeight);
        $height=$strHeight.$unit;

        $intWidth=$svgBack[3]*2;
        $strWidth=strval($intWidth);
        $width=$strWidth.$unit;

        fputs($fb,"<?xml version='1.0' encoding='utf-8'?>\n");
        fputs($fb,"<!DOCTYPE svg PUBLIC '-//W3C//DTD SVG 20010904//EN'
        'http://www.w3.org/TR/2001/REC-SVG-20010904/DTD/svg10.dtd'>\n");

        fputs($fb,"<svg width='$width' height='$height' xml:lang='fr'\n");
        fputs($fb,"xmlns='http://www.w3.org/2000/svg'\n");
        fputs($fb,"xmlns:xlink='http://www.w3.org/1999/xlink'\n");
        fputs($fb,"style='background-color:$svgBack[4]' \n");
        fputs($fb,"id='backConfigurationSVG'\n");
        fputs($fb," viewBox='0 0 $intWidth $intHeight'>\n");
        /*Attention, dans le cas du fond perdu, il y a un décalage width et height : A résoudre*/
    //Récupération de l'Id et des caractéristiques des éléments Back
    $reqElementsBack="SELECT * FROM `svg_element` WHERE `id_svg` = '$svgBackid'";
    if ($result = mysqli_query($con, $reqElementsBack)) {

        $index=0;
        while ($row = mysqli_fetch_row($result)) {
            var_dump(count($row));
            for ($i=0; $i <count($row) ; $i++) {
                $tableElementBack[$index][$i]=$row[$i];
            }
            $index+=1;
        }
            try {
                var_dump($tableElementBack);
                displayElements($tableElementBack,$index,$fb);
            } catch (Exception $e) {
                print_r($e);
            }

        mysqli_free_result($result);
    }else {
        echo "Error: " . $reqElementsBack . "<br>" . mysqli_error($con);
    }
}

mysqli_close($con);
?>
