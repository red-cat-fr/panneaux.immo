/*Ce fichier traite de toutes les fonctions d'initialisation
 */

/*Initialisation au chargement de la page.
tableForCall: représente la table qui appelle les différentes tables à initialiser
table : représente la table à initialiser
*/

onload = function initSheet()
{
    let identify;
    let name;
    let table = [];
    let tableForCall = [];
    let borderSizeOff = 0;

    tableForCall = tableInitOptionsTable;
    table = optionsTable;
    addElementCall(table, tableForCall);
    tableForCall = tableInitPoliceTypeTable;
    table = policeTypeTable;
    addElementCall(table, tableForCall);
    tableForCall = tableInitPoliceStyleTable;
    table = policeStyleTable;
    addElementCall(table, tableForCall);
    tableForCall = tableInitColorTable;
    table = colorTable;
    addElementCall(table, tableForCall);
    table = QtyTable;
    tableForCall = tableInitQty;
    addElementCall(table, tableForCall);
    toHideToShowCall(tableToHideToShow, true); //appelle la table 'tous les id php concernés et passe true pour les cacher'
    if (document.getElementById('FrontOnly').checked == true) { //teste dans cette table le coté front pour montrer les éléments
        toHide(document.getElementsByClassName('right'));
        toHide(document.getElementsByClassName('backSVG'));
    }
    document.getElementById('canvasColor').value = "#ffffff";
    document.getElementById('canvasColorBack').value = "#ffffff";
    optionsChoose('middle');
    priceCalculation();
    document.getElementById('validation').style.display = 'none';
    document.getElementById('validationBack').style.display = 'none';
    multiplierCanvasSVGFormatX = 1;
    multiplierCanvasSVGFormatY = 1;
    document.getElementById('pictureDownload').accept = ".ai,.dxf,.svg,.cdr,.dwg";
    document.getElementById('pictureBackDownload').accept = ".ai,.dxf,.svg,.cdr,.dwg";
    canvasSvgSize(multiplierCanvasSVGFormatX, multiplierCanvasSVGFormatY, borderSizeOff);

}



/*Remise des valeurs par défaut
 */

function defaultValues() {
    let defaultValueDistance = 100;
    let defaultValueColor = "#000000";
    let defaultValueRotation = 0;
    let id;
    let word;
    let suffix;
    //texte
    word = 'text';
    suffix = 'Police';
    callSetDefaultValues(word, suffix, 'Arial');
    suffix = 'Height';
    callSetDefaultValues(word, suffix, defaultValueDistance / 2);
    suffix = 'Style';
    callSetDefaultValues(word, suffix, 'normal');
    suffix = 'Bold';
    callSetDefaultValues(word, suffix, 400);
    suffix = 'Text';
    callSetDefaultValues(word, suffix, '');
    suffix = 'Color';
    callSetDefaultValues(word, suffix, defaultValueColor);
    suffix = 'RotationDisplay';
    callSetDefaultValues(word, suffix, defaultValueRotation);
    suffix = 'Rotation';
    callSetDefaultValues(word, suffix, defaultValueRotation);
    //rectangle
    word = 'rectangle';
    suffix = 'Height';
    callSetDefaultValues(word, suffix, defaultValueDistance);
    suffix = 'Width';
    callSetDefaultValues(word, suffix, defaultValueDistance);
    suffix = 'Color';
    callSetDefaultValues(word, suffix, defaultValueColor);
    suffix = 'RotationDisplay';
    callSetDefaultValues(word, suffix, defaultValueRotation);
    suffix = 'Rotation';
    callSetDefaultValues(word, suffix, defaultValueRotation);
    //ligne
    word = 'line';
    suffix = 'Height';
    callSetDefaultValues(word, suffix, 4);
    suffix = 'Width';
    callSetDefaultValues(word, suffix, defaultValueDistance);
    suffix = 'Color';
    callSetDefaultValues(word, suffix, defaultValueColor);
    suffix = 'RotationDisplay';
    callSetDefaultValues(word, suffix, defaultValueRotation);
    suffix = 'Rotation';
    callSetDefaultValues(word, suffix, defaultValueRotation);
    //ellipse
    word = 'ellipse';
    suffix = 'RadiusX';
    callSetDefaultValues(word, suffix, defaultValueDistance);
    suffix = 'RadiusY';
    callSetDefaultValues(word, suffix, defaultValueDistance / 2);
    suffix = 'Color';
    callSetDefaultValues(word, suffix, '#ff0000');
    suffix = 'RotationDisplay';
    callSetDefaultValues(word, suffix, defaultValueRotation);
    suffix = 'Rotation';
    callSetDefaultValues(word, suffix, defaultValueRotation);
    //cercle
    word = 'circle';
    suffix = 'Radius';
    callSetDefaultValues(word, suffix, defaultValueDistance);
    suffix = 'Color';
    callSetDefaultValues(word, suffix, defaultValueColor);
    //triangleRectangle
    word = 'triangleRectangle';
    suffix = 'Height';
    callSetDefaultValues(word, suffix, defaultValueDistance);
    suffix = 'Width';
    callSetDefaultValues(word, suffix, defaultValueDistance);
    suffix = 'Color';
    callSetDefaultValues(word, suffix, "#3be507");
    suffix = 'RotationDisplay';
    callSetDefaultValues(word, suffix, defaultValueRotation);
    suffix = 'Rotation';
    callSetDefaultValues(word, suffix, defaultValueRotation);
    //triangleEquilateral
    word = 'triangleEquilateral';
    suffix = 'Width';
    callSetDefaultValues(word, suffix, defaultValueDistance);
    suffix = 'Color';
    callSetDefaultValues(word, suffix, "#0822e5");
    suffix = 'RotationDisplay';
    callSetDefaultValues(word, suffix, defaultValueRotation);
    suffix = 'Rotation';
    callSetDefaultValues(word, suffix, defaultValueRotation);
    //triangleIsocele
    word = 'triangleIsocele';
    suffix = 'Height';
    callSetDefaultValues(word, suffix, defaultValueDistance);
    suffix = 'Width';
    callSetDefaultValues(word, suffix, defaultValueDistance + defaultValueDistance / 2);
    suffix = 'Color';
    callSetDefaultValues(word, suffix, "#e50914");
    suffix = 'RotationDisplay';
    callSetDefaultValues(word, suffix, defaultValueRotation);
    suffix = 'Rotation';
    callSetDefaultValues(word, suffix, defaultValueRotation);
    //image/logo
    word = 'picture';
    suffix = 'Scall';
    callSetDefaultValues(word, suffix, 50);
    suffix = 'RotationDisplay';
    callSetDefaultValues(word, suffix, defaultValueRotation);
    suffix = 'Rotation';
    callSetDefaultValues(word, suffix, defaultValueRotation);
};


//uniquement pour la phase de développement.
function reinitialisation() {
    window.location.reload();
}
