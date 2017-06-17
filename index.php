
<?php
include 'inc/header.inc.php';
?>

<div class="">
    <div class="centered">
        <p for="" id="price" class="mainTittle"></p>
    </div>
    <div class="theCanvas" >
        <div class="frontSVG">
            <label for="canvas"class="title">Recto</label>
            <form class="" action="" method="">
                <label for="" id="frontConfigurationXSize" class=""></label>
            </form>
                <div id="frontConfigurationDiv" class="">
                    <label for="" id="frontConfigurationYSize" class="VerticalText"></label>
                    <svg
                        width="400" height="300"
                        xml:lang="fr"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        style="background-color:#fff"
                        id="frontConfiguration"
                    >Si vous lisez ce messge c'est que votre navigateur ne supporte pas le format SVG
                    </svg>
                    <br>
                </div>
                <br>
        </div>
        <div class="backSVG">
            <label for="canvasBack" class="title">Verso</label>
            <br>
            <br>
            <div id="backConfigurationDiv" class="">
                <svg
                    width="400" height="300"
                    xml:lang="fr"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    style="background-color:white"
                    id="backConfiguration"
                >Si vous lisez ce messge c'est que votre navigateur ne supporte pas le format SVG
                </svg>
                <br>
            </div>
        </div>
    </div>
</div>

    <div class="theCanvas">
        <div class="frontSVG" >
            <form class="" action="index.html" method="post">
                <label for="canvas" class="lbl">Couleur de fond (Recto)</label>
                <select id="canvasColor" name="canvas" onChange="canvasBackGroundColor(this.id)">
                </select>
            </form>
        </div>

        <div class="backSVG" >
            <form class="" action="index.html" method="post">
                <label for="canvasBack" class="lbl">Couleur de fond (Verso)</label>
                <select id="canvasColorBack" name="canvasBack" onChange="canvasBackGroundColor(this.id)"></select>
            </form>
        </div>
    </div>
    <div class="">
        <div class="centered">
            <form class="" action="" method="">
                <p for="currentElementPosition" id="currentElementPosition" class="mainTittle"></p> <br>
                <!-- <input type="text" name="textPosition" id="CurrentElementPosition" value="" disabled> -->
            </form>
        </div>
        <div class="centered" style="border:2px black">
            <form name="frontBackForm" class="frontBack" action="index.html" method="post" >
                <input type="radio" class="br" id="FrontOnly" name="FBTypeChoose" value="FrontOnly" onclick="inputRadioButton(this.id)" checked="true">Recto Simple
                <input type="radio" class="br" id="FrontAndBack" name="FBTypeChoose" value="FrontAndBack" onclick="inputRadioButton(this.id)">Recto et Verso différents
            </form>
        </div>
        <br>

        <div class="centered">
            <p id="errorMessages"></p>
        </div>
    </div>
        <!-- Recto  -->
        <div class="twoColumns">
            <div class="left">
                <div class="">
                    <div class="">
                        <input type="button" id="addObject" name="addObject" value="Ajouter un élémentleft" onclick="addAnObjectFront()">
                    </div>
                    <div class="" >
                        <form class="startOptions" action="index.html" method="post" >
                            <label for="options" class="lbl">Choisissez ce que vous voulez intégrer:</label> <br>
                            <select id="startOptions" name="startOptions" onChange="chooseObjectType(this.id)">
                            </select>
                        </form>
                    </div>
                    <br>
                    <div class="pictureSelected">
                        <table>
                        <tr>
                            <td><label class="lbl" for="logoDownload">Téléchargez votre logo</label></td>
                            <form class="" action="index.html" method="post">
                                <td><input type="radio" name="vectorial" value="" id="vectorial" checked="true" onclick="inputRadioButton(this.id)">Format vectoriel</td>
                                <td><input type="radio" name="vectorial" value="" id="vectorialNone" onclick="inputRadioButton(this.id)">Format Non vectoriel (surcoût)</td>
                            </form>
                        </tr>
                        <tr>
                            <form class="" action="" method="post">
                                <td><input type="file" name="picture" id="pictureDownload" src="" onchange="inputFile(this.id)"></td>
                                <td><output id="pictureDownloadOutput"></output></td>
                                <td><input type="hidden" name="picture" value=""></td>
                            </form>
                        </tr>
                            <tr class="subPictureSelected" >
                                <form name="" class="" action="index.html" method="post">
                                    <td><label for="picture" class="lbl">Zoom (%)</label></td>
                                    <td><input type="number" class="textAuto" name="picture"  id="pictureScall" value="50" step="1" min="1" max="400" onchange="inputNumber(this.id)"></td>
                                </form>
                            </tr>
                            <tr class="subPictureSelected">
                                <form class="" action="index.html" method="post">
                                    <td><label for="picture" class="lbl">Rotation de l'élément</label></td>
                                    <td><input type="text" name="picture" value="0" id="pictureRotationDisplay" onchange="inputTextRange(this.id)" size="20" ></td>
                                    <td><input name="picture" id="pictureRotation" type="range" value="0" max="180" min="-180" step="1" onchange="inputRange(this.id)" ></td>
                                </form>
                            </tr>
                            <tr>
                                <form class="" action="index.html" method="post">
                                    <td><input type="button" name="picture" value="Supprimer" id="pictureDelete" onclick="deleteElement(this.id)" size="20"></td>
                                </form>
                            </tr>
                        </table>
                    </div>


                    <div class="textSelected">
                        <table>
                            <tr>
                                <form class="" action="index.html" method="post" >
                                    <td><label for="text" class="lbl">Police</label></td>
                                    <td><select id="textPolice" name="text" onChange="inputList(this.id)"></select></td>
                                </form>
                            </tr>
                            <tr>
                                <form class="" action="index.html" method="post" >
                                    <td><label for="text" class="lbl">Style de Police</label></td>
                                    <td><select id="textStyle" name="text" onChange="inputList(this.id)"></select></td>
                                </form>
                            </tr>
                            <tr>
                                <form name="" class="" action="index.html" method="post">
                                    <td><label for="text" class="lbl">Taille de la police (mm)</label></td>
                                    <td><input  class="textAuto" type="number" name="text" value="80" step="2" min="40" max="800" id="textHeight" onchange="inputNumber(this.id)"></td>
                                </form>
                            </tr>
                            <tr>
                                <form name="" class="" action="index.html" method="post">
                                    <td><label for="text" class="lbl">Gras/fin</label> <br></td>
                                    <td><input  class="textAuto" type="number" name="text" value="400" step="100" min="100" max="900" id="textBold" onchange="inputNumber(this.id)"></td>
                                </form>
                            </tr>

                            <tr>
                                <form class="" action="index.html" method="post">
                                    <td><label for="text" class="lbl">Couleur de Police</label> <br></td>
                                    <td><select id="textColor" name="text" onChange="inputList(this.id)"></select></td>
                                </form>
                            </tr>
                            <tr>
                                <form class="" action="index.html" method="post">
                                    <td><label for="text" class="lbl">Texte :</label><br></td>
                                    <td><input type="text" id="textText" class="textToWrite" name="text" onkeyup="inputText(this.id)"><br></td>
                                </form>
                            </tr>
                            <tr>
                                <form class="" action="index.html" method="post">
                                    <td><label for="text" class="lbl">Rotation de l'élément</label><br></td>
                                    <td><input type="text" name="text" value="0" id="textRotationDisplay" onchange="inputTextRange(this.id)" size="20"></td>
                                    <td><input name="text" id="textRotation" type="range" value="0" max="180" min="-180" step="1" onchange="inputRange(this.id)"></td>
                                </form>
                            </tr>
                            <tr>
                                <form class="" action="index.html" method="post">
                                    <td><input type="button" name="text" value="Supprimer" id="textDelete" onclick="deleteElement(this.id)" size="20"></td>
                                </form>
                            </tr>
                        </table>
                        </div>

                    <div class="rectangleSelected">
                        <table>
                            <tr>
                                <form name="" class="" action="index.html" method="post">
                                    <td><label for="rectangle" class="lbl">Hauteur/largeur(mm)</label></td>
                                    <td><input type="number" class="textAuto" name="rectangle"  id="rectangleHeight" value="40" step="2" min="20" max="800" onchange="inputNumber(this.id)"></td>
                                    <td><input type="number" class="textAuto" name="rectangle"  id="rectangleWidth" value="40" step="2" min="20" max="800" onchange="inputNumber(this.id)"></td>
                                </form>
                            </tr>
                            <tr>
                                <form class="" action="index.html" method="post">
                                    <td><label for="rectangle" class="lbl">Couleur du rectangle</label></td>
                                    <td><select id="rectangleColor" name="rectangle" onChange="inputList(this.id)"></select></td>
                                </form>
                            </tr>
                            <tr>
                                <form class="" action="index.html" method="post">
                                    <td><label for="rectangle" class="lbl">Rotation de l'élément</label></td>
                                    <td><input type="text" name="rectangle" value="0" id="rectangleRotationDisplay" onchange="inputTextRange(this.id)" size="20" ></td>
                                    <td><input name="rectangle" id="rectangleRotation" type="range" value="0" max="180" min="-180" step="1" onchange="inputRange(this.id)" ></td>
                                </form>
                            </tr>
                            <tr>
                                <form class="" action="index.html" method="post">
                                    <td><input type="button" name="rectangle" value="Supprimer" id="rectangleDelete" onclick="deleteElement(this.id)" size="20"></td>
                                </form>
                            </tr>

                        </table>
                    </div>
                    <div class="lineSelected">
                        <table>
                            <tr>
                                <form name="" class="" action="index.html" method="post">
                                    <td><label for="line" class="lbl">Hauteur/largeur(mm)</label></td>
                                    <td><input type="number" class="textAuto" name="line"  id="lineHeight" value="4" step="1" min="1" max="600" onchange="inputNumber(this.id)"></td>
                                    <td><input type="number" class="textAuto" name="line"  id="lineWidth" value="80" step="2" min="20" max="600" onchange="inputNumber(this.id)"></td>
                                </form>
                            </tr>
                            <tr>
                                <form class="" action="index.html" method="post">
                                    <td><label for="line" class="lbl">Couleur de la ligne</label></td>
                                    <td><select id="lineColor" name="line" onChange="inputList(this.id)"></select></td>
                                </form>
                            </tr>
                            <tr>
                                <form class="" action="index.html" method="post">
                                    <td><label for="line" class="lbl">Rotation de l'élément</label></td>
                                    <td><input type="text" name="line" value="0" id="lineRotationDisplay" onchange="inputTextRange(this.id)" size="20"></td>
                                    <td><input name="line" id="lineRotation" type="range" value="0" max="180" min="-180" step="1" onchange="inputRange(this.id)"></td>
                                </form>
                            </tr>
                            <tr>
                                <form class="" action="index.html" method="post">
                                    <td><input type="button" name="line" value="Supprimer" id="lineDelete" onclick="deleteElement(this.id)" size="20"></td>
                                </form>
                            </tr>
                        </table>
                    </div>
                    <div class="circleSelected">
                        <table>
                            <tr>
                                <form name="" class="" action="index.html" method="post">
                                    <td><label for="circle" class="lbl">Rayon du cercle(mm)</label></td>
                                    <td><input type="number" class="textAuto" name="circle"  id="circleRadius" value="" step="1" min="5" max="600" onchange="inputNumber(this.id)"></td>
                                </form>
                            </tr>
                            <tr>
                                <form class="" action="index.html" method="post">
                                    <td><label for="circle" class="lbl">Couleur du cercle</label></td>
                                    <td><select id="circleColor" name="circle" onChange="inputList(this.id)"></select></td>
                                </form>
                            </tr>
                            <tr>
                                <form class="" action="index.html" method="post">
                                    <td><input type="button" name="circle" value="Supprimer" id="circleDelete" onclick="deleteElement(this.id)" size="20"></td>
                                </form>
                            </tr>

                        </table>
                    </div>
                    <div class="ellipseSelected">
                        <table>
                            <tr>
                                <form name="" class="" action="index.html" method="post">
                                    <td><label for="ellipse" class="lbl">Rayon en X</label></td>
                                    <td><input type="number" class="textAuto" name="ellipse"  id="ellipseRadiusX" value="60" step="1" min="5" max="600" onchange="inputNumber(this.id)"></td>
                                </form>
                            </tr>
                            <tr>
                                <form name="" class="" action="index.html" method="post">
                                    <td><label for="ellipse" class="lbl">Rayon en Y</label></td>
                                    <td><input type="number" class="textAuto" name="ellipse"  id="ellipseRadiusY" value="40" step="1" min="5" max="600" onchange="inputNumber(this.id)"></td>
                                </form>
                            </tr>
                            <tr>
                                <form class="" action="index.html" method="post">
                                    <td><label for="ellipse" class="lbl">Couleur de l'ellipse</label></td>
                                    <td><select id="ellipseColor" name="ellipse" onChange="inputList(this.id)"></select></td>
                                </form>
                            </tr>
                            <tr>
                                <form class="" action="index.html" method="post">
                                    <td><label for="ellipse" class="lbl">Rotation de l'élément</label><br></td>
                                    <td><input type="text" name="ellipse" value="0" id="ellipseRotationDisplay" onchange="inputTextRange(this.id)" size="20"></td>
                                    <td><input name="ellipse" id="ellipseRotation" type="range" value="0" max="180" min="-180" step="1" onchange="inputRange(this.id)"></td>
                                </form>
                            </tr>
                            <tr>
                                <form class="" action="index.html" method="post">
                                    <td><input type="button" name="ellipse" value="Supprimer" id="ellipseDelete" onclick="deleteElement(this.id)" size="20"></td>
                                </form>
                            </tr>

                        </table>
                    </div>

                    <div class="triangleRectangleSelected">
                        <table>
                            <tr>
                                <form name="" class="" action="index.html" method="post">
                                    <td><label for="triangleRectangle" class="lbl">Hauteur/largeur(mm)</label></td>
                                    <td><input type="number" class="textAuto" name="triangleRectangle"  id="triangleRectangleHeight" value="40" step="2" min="20" max="800" onchange="inputNumber(this.id)"></td>
                                    <td><input type="number" class="textAuto" name="triangleRectangle"  id="triangleRectangleWidth" value="40" step="2" min="20" max="800" onchange="inputNumber(this.id)"></td>
                                </form>
                            </tr>
                            <tr>
                                <form class="" action="index.html" method="post">
                                    <td><label for="triangleRectangle" class="lbl">Couleur du triangle</label></td>
                                    <td><select id="triangleRectangleColor" name="triangleRectangle" onChange="inputList(this.id)"></select></td>
                                </form>
                            </tr>
                            <tr>
                                <form class="" action="index.html" method="post">
                                    <td><label for="triangleRectangle" class="lbl">Rotation de l'élément</label></td>
                                    <td><input type="text" name="rectangle" value="0" id="triangleRectangleRotationDisplay" onchange="inputTextRange(this.id)" size="20" ></td>
                                    <td><input name="triangleRectangle" id="triangleRectangleRotation" type="range" value="0" max="180" min="-180" step="1" onchange="inputRange(this.id)" ></td>
                                </form>
                            </tr>
                            <tr>
                                <form class="" action="index.html" method="post">
                                    <td><input type="button" name="triangleRectangle" value="Supprimer" id="triangleRectangleDelete" onclick="deleteElement(this.id)" size="20"></td>
                                </form>
                            </tr>

                        </table>
                    </div>
                    <div class="triangleEquilateralSelected">
                        <table>
                            <tr>
                                <form name="" class="" action="index.html" method="post">
                                    <td><label for="triangleEquilateral" class="lbl">Hauteur/largeur(mm)</label></td>
                                    <td><input type="number" class="textAuto" name="triangleEquilateral"  id="triangleEquilateralWidth" value="60" step="2" min="20" max="800" onchange="inputNumber(this.id)"></td>
                                </form>
                            </tr>
                            <tr>
                                <form class="" action="index.html" method="post">
                                    <td><label for="triangleEquilateral" class="lbl">Couleur du triangle</label></td>
                                    <td><select id="triangleEquilateralColor" name="triangleEquilateral" onChange="inputList(this.id)"></select></td>
                                </form>
                            </tr>
                            <tr>
                                <form class="" action="index.html" method="post">
                                    <td><label for="triangleEquilateral" class="lbl">Rotation de l'élément</label></td>
                                    <td><input type="text" name="rectangle" value="0" id="triangleEquilateralRotationDisplay" onchange="inputTextRange(this.id)" size="20" ></td>
                                    <td><input name="triangleEquilateral" id="triangleEquilateralRotation" type="range" value="0" max="180" min="-180" step="1" onchange="inputRange(this.id)"></td>
                                </form>
                            </tr>
                            <tr>
                                <form class="" action="index.html" method="post">
                                    <td><input type="button" name="triangleEquilateral" value="Supprimer" id="triangleEquilateralDelete" onclick="deleteElement(this.id)" size="20"></td>
                                </form>
                            </tr>

                        </table>
                    </div>

                    <div class="triangleIsoceleSelected">
                        <table>
                            <tr>
                                <form name="" class="" action="index.html" method="post">
                                    <td><label for="triangleIsocele" class="lbl">Hauteur/largeur(mm)</label></td>
                                    <td><input type="number" class="textAuto" name="triangleIsocele"  id="triangleIsoceleHeight" value="40" step="2" min="20" max="800" onchange="inputNumber(this.id)"></td>
                                    <td><input type="number" class="textAuto" name="triangleIsocele"  id="triangleIsoceleWidth" value="60" step="2" min="20" max="800" onchange="inputNumber(this.id)"></td>
                                </form>
                            </tr>
                            <tr>
                                <form class="" action="index.html" method="post">
                                    <td><label for="triangleIsocele" class="lbl">Couleur du triangle</label></td>
                                    <td><select id="triangleIsoceleColor" name="triangleIsocele" onChange="inputList(this.id)"></select></td>
                                </form>
                            </tr>
                            <tr>
                                <form class="" action="index.html" method="post">
                                    <td><label for="triangleIsocele" class="lbl">Rotation de l'élément</label></td>
                                    <td><input type="text" name="triangleIsocele" value="0" id="triangleIsoceleRotationDisplay" onchange="inputTextRange(this.id)" size="20"></td>
                                    <td><input name="triangleIsocele" id="triangleIsoceleRotation" type="range" value="0" max="180" min="-180" step="1" onchange="inputRange(this.id)" ></td>
                                </form>
                            </tr>
                            <tr>
                                <form class="" action="index.html" method="post">
                                    <td><input type="button" name="triangleIsocele" value="Supprimer" id="triangleIsoceleDelete" onclick="deleteElement(this.id)" size="20"></td>
                                </form>
                            </tr>
                        </table>
                    </div>
                    <div class="validation">
                        <input type="button" name="validation" id="validation" value="valider l'objet left" onclick="validObjectFront()">
                    </div>
                </div>
            </div>

    <!-- Verso  -->
            <div class="right">
                <div class="">
                    <div class="">
                        <input type="button" id="addObjectBack" name="addObjectBack" value="Ajouter un élément Right" onclick="addAnObjectBack()" >
                    </div>
                    <div class="startOptionsBack" >
                        <form class="" action="index.html" method="post" >
                            <label for="optionsBack" class="lbl">Choisissez ce que vous voulez intégrer:</label> <br>
                            <select id="startOptionsBack" name="startOptionsBack" onChange="chooseObjectType(this.id)">
                            </select>
                        </form>
                    </div>


                    <div class="pictureSelectedBack">
                        <table>
                        <tr>
                            <td><label class="lbl" for="logoDownload">Téléchargez votre logo</label></td>
                            <form class="" action="index.html" method="post">
                                <td><input type="radio" name="vectorial" value="" id="pictureBackVectorial" checked="true" onclick="inputRadioButton(this.id)">Format vectoriel</td>
                                <td><input type="radio" name="vectorial" value="" id="pictureBackVectorialNone" onclick="inputRadioButton(this.id)">Format Non vectoriel (surcoût)</td>
                            </form>
                        </tr>
                        <tr>
                            <form class="" action="" method="">
                                <td><input type="file" name="picture" id="pictureBackDownload" src="" onchange="inputFile(this.id)"></td>
                                <td><<input type="hidden" name="picture" value=""></td>
                                <!-- <td><<input type="submit" name="picture" value="Valider le logo choisis" onclick="logoDownloaded('logoDownload')"></td> -->
                            </form>
                        </tr>
                            <tr class="subPictureSelectedBack">
                                <form name="" class="" action="index.html" method="post">
                                    <td><label for="pictureBack" class="lbl">Zoom (%)</label></td>
                                    <td><input type="number" class="textAuto" name="pictureBack"  id="pictureBackScall" value="50" step="1" min="1" max="400" onchange="inputNumber(this.id)"></td>
                                </form>
                            </tr>

                            <tr class="subPictureSelectedBack">
                                <form class="" action="index.html" method="post">
                                    <td><label for="pictureBack" class="lbl">Rotation de l'élément</label></td>
                                    <td><input type="text" name="pictureBack" value="0" id="pictureBackRotationDisplay" onchange="inputTextRange(this.id)" size="20" ></td>
                                    <td><input name="picture" id="pictureBackRotation" type="range" value="0" max="180" min="-180" step="1" onchange="inputRange(this.id)" ></td>
                                </form>
                            </tr>

                            <tr>
                                <form class="" action="index.html" method="post">
                                    <td><input type="button" name="picture" value="Supprimer" id="pictureBackDelete" onclick="deleteElement(this.id)" size="20"></td>
                                </form>
                            </tr>
                        </table>
                    </div>



                    <div class="textSelectedBack">
                        <table>
                            <tr>
                                <form class="" action="index.html" method="post" >
                                    <td><label for="textBack" class="lbl">Police</label></td>
                                    <td><select id="textBackPolice" name="textBack" onChange="inputList(this.id)"></select></td>
                                </form>
                            </tr>
                            <tr>
                                <form class="" action="index.html" method="post" >
                                    <td><label for="textBack" class="lbl">Style de Police</label></td>
                                    <td><select id="textBackStyle" name="textBack" onChange="inputList(this.id)"></select></td>
                                </form>
                            </tr>
                            <tr>
                                <form name="" class="" action="index.html" method="post">
                                    <td><label for="textBack" class="lbl">Taille de la police (mm)</label></td>
                                    <td><input  class="textAuto" type="number" name="textBack" value="80" step="2" min="40" max="600" id="textBackHeight" onchange="inputNumber(this.id)"></td>
                                </form>
                            </tr>
                            <tr>
                                <form name="textSelectedBack" class="" action="index.html" method="post">
                                    <td><label for="textBack" class="lbl">Gras/fin</label></td>
                                    <td><input  class="textAuto" type="number" name="textBack" value="400" step="100" min="100" max="900" id="textBackBold" onchange="inputNumber(this.id)"></td>
                                </form>
                            </tr>
                            <tr>
                                <form class="" action="index.html" method="post">
                                    <td><label for="textBack" class="lbl">Couleur de Police</label></td>
                                    <td><select id="textBackColor" name="textBack" onChange="inputList(this.id)"></select></td>
                                </form>
                            </tr>
                            <tr>
                                <form class="" action="index.html" method="post">
                                    <td><label for="textBack" class="lbl">Texte :</label></td>
                                    <td><input type="text" id="textBackText" class="textToWrite" name="textBack" onkeyup="inputText(this.id)"></td>
                                </form>
                            </tr>
                            <tr>
                                <form class="" action="index.html" method="post">
                                    <td><label for="textBack" class="lbl">Rotation de l'élément</label><br></td>
                                    <td><input type="text" name="textBack" value="0" id="textBackRotationDisplay" onchange="inputTextRange(this.id)" size="20"></td>
                                    <td><input name="textBack" id="textBackRotation" type="range" value="0" max="180" min="-180" step="1" onchange="inputRange(this.id)"></td>
                                </form>
                            </tr>
                            <tr>
                                <form class="" action="index.html" method="post">
                                    <td><input type="button" name="textBack" value="Supprimer" id="textBackDelete" onclick="deleteElement(this.id)" size="20"></td>
                                </form>
                            </tr>
                        </table>
                    </div>

                    <div class="rectangleSelectedBack">
                        <table>
                            <tr>
                                <form name="" class="" action="index.html" method="post">
                                    <td><label for="rectangleBack" class="lbl">Hauteur/largeur(mm)</label></td>
                                    <td><input type="number" class="textAuto" name="rectangleBack"  id="rectangleBackHeight" value="40" step="2" min="20" max="600" onchange="inputNumber(this.id)"></td>
                                    <td><input type="number" class="textAuto" name="rectangleBack"  id="rectangleBackWidth" value="40" step="2" min="20" max="600" onchange="inputNumber(this.id)"></td>
                                </form>
                            </tr>
                            <tr>
                                <form class="" action="index.html" method="post">
                                    <td><label for="rectangleBack" class="lbl">Couleur du rectangle</label></td>
                                    <td><select id="rectangleBackColor" name="rectangleBack" onChange="inputList(this.id)"></select></td>
                                </form>
                            </tr>
                            <tr>
                                <form class="" action="index.html" method="post">
                                    <td><label for="rectangleBack" class="lbl">Rotation de l'élément</label></td>
                                    <td><input type="text" name="rectangleBack" value="0" id="rectangleBackRotationDisplay" onchange="inputTextRange(this.id)" size="20"></td>
                                    <td><input name="rectangleBack" id="rectangleBackRotation" type="range" value="0" max="180" min="-180" step="1" onchange="inputRange(this.id)"></td>
                                </form>
                            </tr>
                            <tr>
                                <form class="" action="index.html" method="post">
                                    <td><input type="button" name="rectangleBack" value="Supprimer" id="rectangleBackDelete" onclick="deleteElement(this.id)" size="20"></td>
                                </form>
                            </tr>
                        </table>
                    </div>

                    <div class="lineSelectedBack">
                        <table>
                            <tr>
                                <form name="" class="" action="index.html" method="post">
                                    <td><label for="lineBack" class="lbl">Hauteur/largeur(mm)</label></td>
                                    <td><input type="number" class="textAuto" name="lineBack"  id="lineBackHeight" value="4" step="1" min="1" max="600" onchange="inputNumber(this.id)"></td>
                                    <td><input type="number" class="textAuto" name="lineBack"  id="lineBackWidth" value="80" step="2" min="20" max="600" onchange="inputNumber(this.id)"></td>
                                </form>
                            </tr>
                            <tr>
                                <form class="" action="index.html" method="post">
                                    <td><label for="lineBack" class="lbl">Couleur de la ligne</label></td>
                                    <td><select id="lineBackColor" name="lineBack" onChange="inputList(this.id)"></select></td>
                                </form>
                            </tr>
                            <tr>
                                <form class="" action="index.html" method="post">
                                    <td><label for="lineBack" class="lbl">Rotation de l'élément</label></td>
                                    <td><input type="text" name="lineBack" value="0" id="lineBackRotationDisplay" onchange="inputTextRange(this.id)" size="20"></td>
                                    <td><input name="lineBack" id="lineBackRotation" type="range" value="0" max="180" min="-180" step="1" onchange="inputRange(this.id)"></td>
                                </form>
                            </tr>
                            <tr>
                                <form class="" action="index.html" method="post">
                                    <td><input type="button" name="lineBack" value="Supprimer" id="lineBackDelete" onclick="deleteElement(this.id)" size="20"></td>
                                </form>
                            </tr>

                        </table>
                    </div>

                    <div class="circleSelectedBack">
                        <table>
                            <tr>
                                <form name="" class="" action="index.html" method="post">
                                    <td><label for="circleBack" class="lbl">Rayon du cercle(mm)</label></td>
                                    <td><input type="number" class="textAuto" name="circleBack"  id="circleBackRadius" value="20" step="1" min="5" max="600" onchange="inputNumber(this.id)"></td>
                                </form>
                            </tr>
                            <tr>
                                <form class="" action="index.html" method="post">
                                    <td><label for="circleBack" class="lbl">Couleur du cercle</label></td>
                                    <td><select id="circleBackColor" name="circleBack" onChange="inputList(this.id)"></select></td>
                                </form>
                            </tr>
                            <tr>
                                <form class="" action="index.html" method="post">
                                    <td><input type="button" name="circleBack" value="Supprimer" id="circleBackDelete" onclick="deleteElement(this.id)" size="20"></td>
                                </form>
                            </tr>

                        </table>
                    </div>
                    <div class="ellipseSelectedBack">
                        <table>
                            <tr>
                                <form name="" class="" action="index.html" method="post">
                                    <td><label for="ellipseBack" class="lbl">Rayon en X</label></td>
                                    <td><input type="number" class="textAuto" name="ellipsBacke"  id="ellipseBackRadiusX" value="60" step="1" min="5" max="600" onchange="inputNumber(this.id)"></td>
                                </form>
                            </tr>
                            <tr>
                                <form name="" class="" action="index.html" method="post">
                                    <td><label for="ellipseBack" class="lbl">Rayon en Y</label></td>
                                    <td><input type="number" class="textAuto" name="ellipseBack"  id="ellipseBackRadiusY" value="40" step="1" min="5" max="600" onchange="inputNumber(this.id)"></td>
                                </form>
                            </tr>
                            <tr>
                                <form class="" action="index.html" method="post">
                                    <td><label for="ellipseBack" class="lbl">Couleur de l'ellipse</label></td>
                                    <td><select id="ellipseBackColor" name="ellipseBack" onChange="inputList(this.id)"></select></td>
                                </form>
                            </tr>
                            <tr>
                                <form class="" action="index.html" method="post">
                                    <td><label for="ellipse" class="lbl">Rotation de l'élément</label><br></td>
                                    <td><input type="text" name="ellipse" value="0" id="ellipseBackRotationDisplay" onchange="inputTextRange(this.id)" size="20"></td>
                                    <td><input name="ellipseBack" id="ellipseBackRotation" type="range" value="0" max="180" min="-180" step="1" onchange="inputRange(this.id)"></td>
                                </form>
                            </tr>
                            <tr>
                                <form class="" action="index.html" method="post">
                                    <td><input type="button" name="ellipseBack" value="Supprimer" id="ellipseBackDelete" onclick="deleteElement(this.id)" size="20"></td>
                                </form>
                            </tr>

                        </table>
                    </div>
                    <div class="triangleRectangleSelectedBack">

                        <div class="">
                            <table>
                                <tr>
                                    <form name="" class="" action="index.html" method="post">
                                        <td><label for="triangleRectangleBack" class="lbl">Hauteur/largeur(mm)</label></td>
                                        <td><input type="number" class="textAuto" name="triangleRectangleBack"  id="triangleRectangleBackHeight" value="40" step="2" min="20" max="600" onchange="inputNumber(this.id)"></td>
                                        <td><input type="number" class="textAuto" name="triangleRectangleBack"  id="triangleRectangleBackWidth" value="40" step="2" min="20" max="600" onchange="inputNumber(this.id)"></td>
                                    </form>
                                </tr>
                                <tr>
                                    <form class="" action="index.html" method="post">
                                        <td><label for="triangleRectangleBack" class="lbl">Couleur du triangle</label></td>
                                        <td><select id="triangleRectangleBackColor" name="triangleRectangleBack" onChange="inputList(this.id)"></select></td>
                                    </form>
                                </tr>
                                <tr>
                                    <form class="" action="index.html" method="post">
                                        <td><label for="triangleRectangleBack" class="lbl">Rotation de l'élément</label></td>
                                        <td><input type="text" name="triangleRectangleBack" value="0" id="triangleRectangleBackRotationDisplay" onchange="inputTextRange(this.id)" size="20"></td>
                                        <td><input name="triangleRectangleBack" id="triangleRectangleBackRotation" type="range" value="0" max="180" min="-180" step="1" onchange="inputRange(this.id)"></td>
                                    </form>
                                </tr>
                                <tr>
                                    <form class="" action="index.html" method="post">
                                        <td><input type="button" name="triangleRectangleBack" value="Supprimer" id="triangleRectangleBackDelete" onclick="deleteElement(this.id)" size="20"></td>
                                    </form>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <div class="triangleEquilateralSelectedBack">
                            <tr>
                                <form name="" class="" action="index.html" method="post">
                                    <td><label for="triangleEquilateralBack" class="lbl">Hauteur/largeur(mm)</label></td>
                                    <td><input type="number" class="textAuto" name="triangleEquilateralBack"  id="triangleEquilateralBackWidth" value="40" step="2" min="20" max="600" onchange="inputNumber(this.id)"></td>
                                </form>
                            </tr>
                            <tr>
                                <form class="" action="index.html" method="post">
                                    <td><label for="triangleEquilateralBack" class="lbl">Couleur du triangle</label></td>
                                    <td><select id="triangleEquilateralBackColor" name="triangleEquilateralBack" onChange="inputList(this.id)"></select></td>
                                </form>
                            </tr>
                            <tr>
                                <form class="" action="index.html" method="post">
                                    <td><label for="triangleEquilateralBack" class="lbl">Rotation de l'élément</label></td>
                                    <td><input type="text" name="triangleEquilateralBack" value="0" id="triangleEquilateralBackRotationDisplay" onchange="inputTextRange(this.id)" size="20"></td>
                                    <td><input name="triangleEquilateralBack" id="triangleEquilateralBackRotation" type="range" value="0" max="180" min="-180" step="1" onchange="inputRange(this.id)"></td>
                                </form>
                            </tr>
                            <tr>
                                <form class="" action="index.html" method="post">
                                    <td><input type="button" name="triangleEquilateralBack" value="Supprimer" id="triangleEquilateralBackDelete" onclick="deleteElement(this.id)" size="20"></td>
                                </form>
                            </tr>

                        </table>
                    </div>

                    <div class="triangleIsoceleSelectedBack">
                        <table>
                            <tr>
                                <form name="" class="" action="index.html" method="post">
                                    <td><label for="triangleIsoceleBack" class="lbl">Hauteur/largeur(mm)</label></td>
                                    <td><input type="number" class="textAuto" name="triangleIsoceleBack"  id="triangleIsoceleBackHeight" value="40" step="2" min="20" max="600" onchange="inputNumber(this.id)"></td>
                                    <td><input type="number" class="textAuto" name="triangleIsoceleBack"  id="triangleIsoceleBackWidth" value="40" step="2" min="20" max="600" onchange="inputNumber(this.id)"></td>
                                </form>
                            </tr>
                            <tr>
                                <form class="" action="index.html" method="post">
                                    <td><label for="triangleIsoceleBack" class="lbl">Couleur du triangle</label></td>
                                    <td><select id="triangleIsoceleBackColor" name="triangleIsoceleBack" onChange="inputList(this.id)"></select></td>
                                </form>
                            </tr>
                            <tr>
                                <form class="" action="index.html" method="post">
                                    <td><label for="triangleIsoceleBack" class="lbl">Rotation de l'élément</label></td>
                                    <td><input type="text" name="triangleIsoceleBack" value="0" id="triangleIsoceleBackRotationDisplay" onchange="inputTextRange(this.id)" size="20"></td>
                                    <td><input name="triangleIsoceleBack" id="triangleIsoceleBackRotation" type="range" value="0" max="180" min="-180" step="1" onchange="inputRange(this.id)"></td>
                                </form>
                            </tr>
                            <tr>
                                <form class="" action="index.html" method="post">
                                    <td><input type="button" name="triangleIsoceleBack" value="Supprimer" id="triangleIsoceleBackDelete" onclick="deleteElement(this.id)" size="20"></td>
                                </form>
                            </tr>

                        </table>
                    </div>

                    <div class="validation">
                        <input type="button" name="validationBack" id="validationBack" value="valider l'objet" onclick="validObjectBack()">
                    </div>
                </div>
            </div>
        </div>

        <div class="">
            <h3 class="centered">Options :</h3>
        </div>
        <div class="footer">
            <div class="centered">
                <form class="" action="index.html" method="post">
                    <label for="batchQty" class="lbl">Quantité du lot: </label> <br>
                    <select id="batchQty" name="batchQty" onChange="inputList(this.id)"></select>
                </form>
            </div>
            <br>
            <div class="centered" >
                <label for="optionEye" class="lbl">Option oeillets : </label><br>
                <input type="checkbox" id="eye" style="" name="optionEye" onchange="inputCheckbox(this.id)"> Oeillets
                <br>
            </div>
            <br>
            <div class="centered">
                    <label for="optionDouble" class="lbl">Panneau drapeau : </label><br>
                    <input type="checkbox" id="double" name="optionDouble"  onchange="inputCheckbox(this.id)"> Type Drapeau(double=1600 x 600)<br>Le recto sera dupliqué ainsi que le verso (si option verso sélectionnée). Non représentées dans les vues. Pliage fait dans nos locaux.
            </div>
            <br>
            <div class="centered" style="border:2px black">
                <form name="formatForm" class="frontBack" action="index.html" method="post" >
                    <label for="format" class="lbl">Format des panneaux : </label><br>
                    <input type="radio" class="format" id="middle" name="format" value="MF" checked=true onclick="inputRadioButton(this.id)">Format 800 x 600
                    <input type="radio" class="format" id="little" name="format" value="LF" onclick="inputRadioButton(this.id)">Format 600 x 400
                    <input type="radio" class="format" id="big" name="format" value="BF" onclick="inputRadioButton(this.id)">Format 1200 x 800
                </form>
            </div>
            <br>
            <div class="centered" style="border:2px black">
                <form name="border" id="border" class="frontBack" action="index.html" method="post" >
                    <label for="border" class="lbl">Fond perdu/blanc tournant : </label><br>
                    <input type="radio" class="format" id="borderOn" name="border" value="borderOn" checked=true onclick="inputRadioButton(this.id)">Blanc tournant (contour blanc)
                    <input type="radio" class="format" id="borderOff" name="border" value="borderOff"  onclick="inputRadioButton(this.id)">Fond perdu (contour couleur du fond)
                </form>
            </div>
        </div>
        <div class="centered">
            <input type="button" class="" id="validationConfiguration" name="" onclick="validConfig()" value="Valider la configuration"> <br><br>
        </div>
        <div class="centered">
            <input type="button" class="" id="reset" name="" onclick="reinitialisation()" value="Reinitialiser"><br>
            <a href="http://localhostgit:8080/panneaux.immo_vs_SVG_BDD-5.6.9/extractOrders.php">Extraire les commandes (Admin uniquement)</a><br>
            <a href="http://localhostgit:8080/panneaux.immo_vs_SVG_BDD-5.6.9/svg">Voir résultats (Admin uniquement)</a>
        </div>
    </div>
<?php include 'inc/footer.inc.php';?>
