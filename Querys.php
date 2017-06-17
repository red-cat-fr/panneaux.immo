
<?php
$db='panneaux_immo_svg';
$host='localhost:3307';
$username='root';
$password='root';
// //vs mac
// $db='panneaux_immo_svg';
// $host='127.0.0.1';
// $username='root';
// $password='dadfba16';
$con=mysqli_connect($host,$username,$password,$db);
if (mysqli_connect_errno())
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }else{
      echo"Connect OK ";
  };

    $tableOrderJSON=json_encode($_POST['tableOrder']);
    $tableSVGFrontJSON=json_encode ($_POST['tableSVGFront']);
    $tableElementFrontJSON=json_encode ($_POST['tableElementFront']);
    $tableSVGBackJSON=json_encode ($_POST['tableSVGBack']);
    $tableElementBackJSON=json_encode ($_POST['tableElementBack']);

    //partie commande
    $tableOrder=json_decode($tableOrderJSON);
    $dateOrder=$tableOrder->{'date'};
    $hourOrder=$tableOrder->{'hour'};
    $userOrder=$tableOrder->{'user'};
    $quantityOrder=$tableOrder->{'quantity'};
    $priceOrder=$tableOrder->{'price'};
    $orderNumberOrder=$tableOrder->{'orderNumber'};

        $orderSql= "INSERT INTO `svg_order`( `date`, `hour`, `user`, `qty`, `price`, `order_number`)
                        VALUES ('$dateOrder','$hourOrder','$userOrder','$quantityOrder','$priceOrder','$orderNumberOrder')";

        if (mysqli_query($con, $orderSql)) {
            echo "New record created successfully";
        } else {
            echo "Error: " . $orderSql . "<br>" . mysqli_error($con);
        }

    // partie SVG front
        $tableSVGFront=json_decode($tableSVGFrontJSON);
        $sideSVGFront=$tableSVGFront->{'side'};
        $heightSVGFront=$tableSVGFront->{'height'};
        $widthSVGFront=$tableSVGFront->{'width'};
        $colorSVGFront=$tableSVGFront->{'color'};
        $eyeSVGFront=$tableSVGFront->{'eye'};
        $flyerSVGFront=$tableSVGFront->{'flyer'};
        $borderSVGFront=$tableSVGFront->{'border'};
        $orderNumberSVGFront=$orderNumberOrder;

            $resultSVGFront=mysqli_query($con,"SELECT `id` FROM `svg_order` WHERE `order_number` = '$orderNumberSVGFront'")or die (mysql_error());
            $rowSVGFront = mysqli_fetch_assoc($resultSVGFront);
            $idSVGFront = $rowSVGFront['id'];

            $svgFront="INSERT INTO `svg_canvas`( `side`, `height`, `width`, `color`, `eye`, `flyer`, `border`,`order_number`,`id_order`)
                            VALUES ('$sideSVGFront','$heightSVGFront','$widthSVGFront','$colorSVGFront','$eyeSVGFront','$flyerSVGFront','$borderSVGFront','$orderNumberOrder',
                            '$idSVGFront')";

            if (mysqli_query($con, $svgFront)) {
                echo "New record created successfully ";
            } else {
                echo "Error: " . $svgFront . "<br>" . mysqli_error($con);
            }


/*partie éléments du svg recto*/
$tableElementFront=json_decode($tableElementFrontJSON,true);
for ($i=0; $i <count($tableElementFront)-2 ; $i++) {
    $id_elementFront=$tableElementFront[$i]['id'];
    $typeFront=$tableElementFront[$i]['type'];
    $movableFront=$tableElementFront[$i]['movable'];
    $topFront=$tableElementFront[$i]['top'];
    $leftFront=$tableElementFront[$i]['left'];
    $heightFront=$tableElementFront[$i]['height'];
    $widthFront=$tableElementFront[$i]['width'];
    $radiusFront=$tableElementFront[$i]['radius'];
    $radiusXFront=$tableElementFront[$i]['radiusX'];
    $radiusYFront=$tableElementFront[$i]['radiusY'];
    $colorFront=$tableElementFront[$i]['color'];
    $textFront=$tableElementFront[$i]['text'];
    //Conversion du texte en string, echapement des caractères code...
//<h1> sdfg </h1>
    $textFront = strval($textFront);
    $policeFront=$tableElementFront[$i]['police'];
    $boldFront=$tableElementFront[$i]['bold'];
    $styleFront=$tableElementFront[$i]['style'];
    $rotationFront=$tableElementFront[$i]['rotation'];
    $scallFront=$tableElementFront[$i]['scall'];
    $urlFront=$tableElementFront[$i]['url'];
    $orderNumberElementFront=$orderNumberOrder;
    //récupération de l'ID du SVG sur lequel les éléments sont.
    $resultElementFront=mysqli_query($con,"SELECT `id` FROM `svg_canvas` AS svg
                                                        WHERE svg.order_number='$orderNumberElementFront'
                                                        AND svg.side= 'front'")
                                                        or die (mysql_error());
    $rowElementFront = mysqli_fetch_assoc($resultElementFront);
    $link_idSvgFront = strval($rowElementFront['id']);
    $elementFrontSql = "INSERT INTO
                    `svg_element`(
                                    `id_element`,`type`,`movable`,`top`,`left`,
                                    `heigth`,`width`,`radius`,`radiusX`,`radiusY`,
                                    `color`,`text`,`police`,`bold`,`style`,`rotation`,
                                    `scall`,`url`,`id_svg`,`order_number`
                                )
                    VALUES (
                        '$id_elementFront','$typeFront','$movableFront',
                        '$topFront','$leftFront','$heightFront','$widthFront',
                        '$radiusFront','$radiusXFront','$radiusYFront',
                        '$colorFront','$textFront','$policeFront','$boldFront',
                        '$styleFront','$rotationFront','$scallFront',
                        '$urlFront','$link_idSvgFront','$orderNumberElementFront'
                    )";

        if (mysqli_query($con, $elementFrontSql)) {
            echo "New record created successfully";
        } else {
            echo "Error: " . $elementFrontSql . "<br>" . mysqli_error($con);
        }

    };


// partie SVG Back
    $tableSVGBack=json_decode($tableSVGBackJSON);
    $sideSVGBack=$tableSVGBack->{'side'};
    $heightSVGBack=$tableSVGBack->{'height'};
    $widthSVGBack=$tableSVGBack->{'width'};
    $colorSVGBack=$tableSVGBack->{'color'};
    $eyeSVGBack=$tableSVGBack->{'eye'};
    $flyerSVGBack=$tableSVGBack->{'flyer'};
    $borderSVGBack=$tableSVGBack->{'border'};
    $orderNumberSVGBack=$orderNumberOrder;
    if ($heightSVGBack>0 && $widthSVGBack>0) {

        $resultSVGBack=mysqli_query($con,"SELECT `id` FROM `svg_order` WHERE `order_number` = '$orderNumberSVGBack'")or die (mysql_error());
        $rowSVGBack = mysqli_fetch_assoc($resultSVGBack);
        $idSVGBack = $rowSVGBack['id'];

        $svgBack="INSERT INTO `svg_canvas`(`side`, `height`, `width`, `color`, `eye`, `flyer`, `border`,`order_number`,`id_order`)
                        VALUES ('$sideSVGBack','$heightSVGBack','$widthSVGBack','$colorSVGBack','$eyeSVGBack','$flyerSVGBack','$borderSVGBack','$orderNumberOrder',
                        '$idSVGBack')";

        if (mysqli_query($con, $svgBack)) {
            echo "New record created successfully ";
        } else {
            echo "Error: " . $svgBack . "<br>" . mysqli_error($con);
        }


/*partie éléments du svg verso (back)*/
    $tableElementBack=json_decode($tableElementBackJSON,true);
    for ($i=0; $i <count($tableElementBack)-2 ; $i++) {
        $id_elementBack=$tableElementBack[$i]['id'];
        $typeBack=$tableElementBack[$i]['type'];
        $movableBack=$tableElementBack[$i]['movable'];
        $topBack=$tableElementBack[$i]['top'];
        $leftBack=$tableElementBack[$i]['left'];
        $heightBack=$tableElementBack[$i]['height'];
        $widthBack=$tableElementBack[$i]['width'];
        $radiusBack=$tableElementBack[$i]['radius'];
        $radiusXBack=$tableElementBack[$i]['radiusX'];
        $radiusYBack=$tableElementBack[$i]['radiusY'];
        $colorBack=$tableElementBack[$i]['color'];
        $textBack=$tableElementBack[$i]['text'];
        $policeBack=$tableElementBack[$i]['police'];
        $boldBack=$tableElementBack[$i]['bold'];
        $styleBack=$tableElementBack[$i]['style'];
        $rotationBack=$tableElementBack[$i]['rotation'];
        $scallBack=$tableElementBack[$i]['scall'];
        $urlBack=$tableElementBack[$i]['url'];
        $orderNumberElementBack=$orderNumberOrder;

        //récupération de l'ID du SVG sur lequel les éléments sont.
        $resultElementBack=mysqli_query($con,"SELECT `id` FROM `svg_canvas` AS svg
                                                            WHERE svg.order_number='$orderNumberElementBack'
                                                            AND svg.side= 'back'")
                                                            or die (mysql_error());
        $rowElementBack = mysqli_fetch_assoc($resultElementBack);
        $link_idSvgBack = strval($rowElementBack['id']);
        $elementBackSql = "INSERT INTO
        `svg_element`(
                        `id_element`,`type`,`movable`,`top`,`left`,
                        `heigth`,`width`,`radius`,`radiusX`,`radiusY`,
                        `color`,`text`,`police`,`bold`,`style`,`rotation`,
                        `scall`,`url`,`id_svg`,`order_number`
                    )
                        VALUES (
                            '$id_elementBack','$typeBack','$movableBack',
                            '$topBack','$leftBack','$heightBack','$widthBack',
                            '$radiusBack','$radiusXBack','$radiusYBack',
                            '$colorBack','$textBack','$policeBack','$boldBack',
                            '$styleBack','$rotationBack','$scallBack','$urlBack',
                            '$link_idSvgBack','$orderNumberElementBack'
                        )";
            if (mysqli_query($con, $elementBackSql)) {
                echo "New record created successfully";
            } else {
                echo "Error: " . $elementBackSql . "<br>" . mysqli_error($con);
            }
        };
    }
mysqli_close($con);
?>
