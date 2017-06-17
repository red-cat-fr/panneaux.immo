
let tableCanvasSVG={
    'height':300,
    'width':400,
    'eye':false,
    'style="background-color"':'white',
};

/*
*/
function canvasBackGroundColor(id) {
    let canvasBackGroundColor=document.getElementById(id).value;
    if (id=='canvasColor') {
        document.getElementById('frontConfiguration').style.backgroundColor=canvasBackGroundColor;
    }else if (id=='canvasColorBack') {
        document.getElementById('backConfiguration').style.backgroundColor=canvasBackGroundColor;
    }
    if (document.getElementById('borderOn').checked==true) {
        optionsChoose('borderOn',tableElementFront,tableElementBack);

    }else {
        optionsChoose('borderOff',tableElementFront,tableElementBack);
    }
};
/*Ajouter un élément Recto et Verso : montre la liste de éléments
 ajoutables et ajoute un élément dans la
table. Initialisation des valeurs par défaut
*/
function addAnObjectFront() {
    toShow(document.getElementsByClassName('startOptions'));
    defaultValues();
    tableElementFront.addObjectFront({});
    document.getElementById('addObject').style.display = 'none';
    document.getElementById('validation').style.display = '';

}
function addAnObjectBack() {
    toShow(document.getElementsByClassName('startOptionsBack'));
    defaultValues();
    tableElementBack.addObjectBack({});
    document.getElementById('addObjectBack').style.display = 'none';
    document.getElementById('validationBack').style.display = '';
}
/*Validation : cache ou montre des éléments
*/
function validObjectFront(){
    modifInProgress=false;
    tableElementFrontIndex+=1;
    toHideToShowCall(tableToHideToShow,true);
    document.getElementById('startOptions').value='';
    document.getElementById('addObject').style.display = '';
    toShow(document.getElementById('addObject'));
    toHide(document.getElementById('validation'));
    document.getElementById('validation').style.display = 'none';
}
function validObjectBack(){
    modifInProgress=false;
    tableElementBackIndex+=1;
    toHideToShowCall(tableToHideToShow,true);
    document.getElementById('startOptionsBack').value='';
    toShow(document.getElementById('addObjectBack'));
    document.getElementById('addObjectBack').style.display = '';
    toHide(document.getElementById('validationBack'));
    document.getElementById('validationBack').style.display = 'none';
}

/*cache ou montre des éléments selon le choix
*/
function chooseObjectType(id){
    let nameId;//Nom associé à l'ID.
    let endIdName='';//pour contrôler les 4 derniers caractères "back"
    let suffix;
    nameId=document.getElementById(id).name;//nom du type d'élément
    for (var i = nameId.length-4; i < nameId.length; i++) {
        endIdName=endIdName+nameId.charAt(i);
    }
    if (endIdName=='Back') {
        suffix = endIdName;
    }else {
        suffix='';
    }
    let optionSelected;
        optionSelected=document.getElementById(id).value;
    if (optionSelected=='') {
        toHideToShowCall(tableToHideToShow,true);
    }else if (optionSelected=='text'
            || optionSelected=='line'
            || optionSelected=='ellipse'
            || optionSelected=='rectangle'
            || optionSelected=='circle'
            || optionSelected=='triangleRectangle'
            || optionSelected=='triangleIsocele'
            || optionSelected=='triangleEquilateral'
            || optionSelected=='picture'
            ) {
        toHideToShowCall(tableToHideToShow,true);
        toShow(document.getElementsByClassName(optionSelected+'Selected'+suffix));
        if (optionSelected=='picture') {
            toHide(document.getElementsByClassName('subPictureSelected'+suffix));
        }
        inputList(id)
     }
}

/* Calcule du prix
*/

let price =0;
let discount;
let qty;
function priceCalculation() {
    let unitPrice;
    let eyePriceUnit=0.3;
    let format;
    let twice;
    let border;
    let fAndB;
    let vectorialLogo;
    let paint;
    let qtyPaint;// A développer
    if (document.getElementById('double').checked==true) {
        twice=1.5;
        eyePriceUnit=6*eyePriceUnit;
    }else {
        twice=1;
        eyePriceUnit=4*eyePriceUnit;
    }
    if (document.getElementById('eye').checked==true) {
        eyePriceUnit=eyePriceUnit;
    }else {
        eyePriceUnit=0;
    }
    if (document.getElementById('little').checked==true) {
        unitPrice = 8;
        }else if (document.getElementById('middle').checked==true) {
            unitPrice = 10;
        }else if (document.getElementById('big').checked==true) {
            unitPrice = 12;
    }
    if (document.getElementById('borderOn').checked==true) {
        border=1;
        }else if (document.getElementById('borderOff').checked==true) {
            border=1.2;
    }
    if (document.getElementById('FrontAndBack').checked==true) {
        fAndB=1.5;
    }else if (document.getElementById('FrontOnly').checked==true) {
        fAndB=1;
    }
    if (document.getElementById('vectorialNone').checked==true) {
        vectorialLogo=40;
    }else {
        vectorialLogo=0;
    }
    //discount = document.getElementById('batchQty').value
    for (let key in QtyTable)
    {
        if (key==document.getElementById('batchQty').value) {
            qty=QtyTable[key];
            discount=key;
        }
    }
    if (qtyPaint>2) {
        paint = 1.5*qtyPaint;
        displayErrorMessages('Attention, le choix de plus de 2 couleurs est payant',true);
    }else {
        //displayErrorMessages('',false);
        paint =1;
    }
    price = (unitPrice +eyePriceUnit) *fAndB*qty*(1-(discount/100))*border*twice*paint+vectorialLogo
    return price;
}
/* Traitement des options
*/
//initialisation des variables
let CanvasSVGSizeX = tableCanvasSVG.width;
let CanvasSVGSizeY = tableCanvasSVG.height;
let multiplierCanvasSVGFormatX=1;
let multiplierCanvasSVGFormatY=1;
let borderSizeOn=0;
let borderSizeOff=0;
let borderColorFront;
let borderColorBack;
function optionsChoose(id,tableElementFront,tableElementBack) {
    switch (id) {

        case 'eye'://oeillets : à développer, fonctionne mal
            //tableConstructorCall(id)

                // if (document.getElementById('FrontOnly').checked==true) {
                //     svg='#frontConfiguration'
                //     nodeLayer=d3.select(svg);
                //     eyeDisplay(nodeLayer,svg,'frontConfiguration')
                //
                // }else if (document.getElementById('FrontAndBack').checked==true) {
                //     svg='#frontConfiguration'
                //     nodeLayer=d3.select(svg);
                //     eyeDisplay(nodeLayer,svg,'frontConfiguration')
                //     svg='#backConfiguration'
                //     nodeLayer=d3.select(svg);
                //     eyeDisplay(nodeLayer,svg,'backConfiguration')
                // }

        break;
        case 'double'://panneaux drapeau : recalcul du prix, affichage oeillets (x6), affichage message
            if (document.getElementById(id).checked==true) {
                document.getElementById('middle').checked=true;
                optionsChoose('middle',tableElementFront,tableElementBack);
                displayErrorMessages('Attention, ce format n\'est compatible qu\'avec le format 1600x600 (représenté, ici par le format 800x600). Pliage OFFERT !',true);
            }
            else {
                displayErrorMessages("",false);
            }
            optionsChoose('eye',tableElementFront,tableElementBack);
            break;
        case 'little': //formats 600 x 400
            document.getElementById('double').checked=false;
            multiplierCanvasSVGFormatX=3/4;
            multiplierCanvasSVGFormatY=2/3;
            canvasSvgSize(multiplierCanvasSVGFormatX,multiplierCanvasSVGFormatY,borderSizeOff);
            optionsChoose('double',tableElementFront,tableElementBack);
            optionsChoose('eye',tableElementFront,tableElementBack);
            //Réaffichage un seul coté ou pas selon l'option choisie
            if (document.getElementById('FrontAndBack').checked==true) {
                optionsChoose('FrontAndBack',tableElementFront,tableElementBack);
            }else {
                optionsChoose('FrontOnly',tableElementFront,tableElementBack);
            }

            break;
        case 'big': // 1200 x 800
            document.getElementById('double').checked=false;
            multiplierCanvasSVGFormatX=2*3/4;
            multiplierCanvasSVGFormatY=2*2/3;
            canvasSvgSize(multiplierCanvasSVGFormatX,multiplierCanvasSVGFormatY,borderSizeOff);
            optionsChoose('double',tableElementFront,tableElementBack)
            optionsChoose('eye',tableElementFront,tableElementBack);

            //Réaffichage un seul coté ou pas selon l'option choisie
            if (document.getElementById('FrontAndBack').checked==true) {
                optionsChoose('FrontAndBack',tableElementFront,tableElementBack);
            }else {
                optionsChoose('FrontOnly',tableElementFront,tableElementBack);
            }
            break;
        case 'middle': //formats 800 x 600
            multiplierCanvasSVGFormatX=1;
            multiplierCanvasSVGFormatY=1;
            canvasSvgSize(multiplierCanvasSVGFormatX,multiplierCanvasSVGFormatY,borderSizeOff);
            optionsChoose('eye',tableElementFront,tableElementBack);
            break
        case 'borderOn'://Blanc tournant = zone de tranquilité de 10 mm, mais panneaux 800x600 (par exemple)
            borderSizeOn=5;
            borderSizeOff=0;
            borderColorFront="#fff";
            borderColorBack=borderColorFront;
            displayErrorMessages('',false);
            border(borderSizeOff,borderSizeOn,borderColorFront,borderColorBack,multiplierCanvasSVGFormatX,multiplierCanvasSVGFormatY);
            optionsChoose('eye',tableElementFront,tableElementBack);
            break;
        case 'borderOff'://Fond perdu = coupe de 10 mm de chaque coté (panneau = 780 x 580 par exemple)
            borderSizeOff=5;
            borderSizeOn=0;
            borderColorFront=document.getElementById('canvasColor').value;
            borderColorBack=document.getElementById('canvasColorBack').value;
            displayErrorMessages('Attention, cette option implique un travail de découpe précise, donc, un coût',true);
            border(borderSizeOff,borderSizeOn,borderColorFront,borderColorBack,multiplierCanvasSVGFormatX,multiplierCanvasSVGFormatY);
            optionsChoose('eye',tableElementFront,tableElementBack);
            break;
        case 'FrontAndBack'://Choix Recto/verso
            toShow(document.getElementsByClassName("right"));
            toShow(document.getElementsByClassName("backSVG"));
            optionsChoose('eye',tableElementFront,tableElementBack);
            break;
        case 'FrontOnly': //Choix recto
            toHide(document.getElementsByClassName("right"));
            toHide(document.getElementsByClassName("backSVG"));
            optionsChoose('eye',tableElementFront,tableElementBack);
            break;
        case 'batchQty':
            break;
        case 'vectorial':
            document.getElementById('pictureBackDownload').accept=".ai,.dxf,.svg,.cdr,.dwg";
            document.getElementById('pictureDownload').accept=".ai,.dxf,.svg,.cdr,.dwg";
            displayErrorMessages('',false);
            break;
        case 'vectorialNone':
            document.getElementById('pictureBackDownload').accept="image/*";
            document.getElementById('pictureDownload').accept="image/*";
            displayErrorMessages('Attention, un format image implique un travail d\'infographie, donc, un coût',true);
            break;
    }
    let previousPrice = document.getElementById('price').value;
    priceCalculation();
    if (previousPrice!=price) {
        blinkStyle='font-style:normal; font-weight:bold;color:red;font-size:22px; text-decoration: blink;animation: blinker 1s linear ;animation-iteration-count: 3';
    }else {
        blinkStyle='font-style:normal; font-weight:bold;color:black;font-size:20px;';
    }
    previousPrice=price;
    document.getElementById('price').innerHTML=('Prix Total HT :  <blink style= "font-size:20px; font-style:normal; font-weight:bold;color:red;'+blinkStyle+'">' +price.toFixed(2)
    + '€</blink>, soit <blink style= "'+blinkStyle+'">' +discount+'%</blink> de remise');

}
//traite le cas fond perdu/blanc tournant
function border(borderSizeOff,borderSizeOn,borderColorFront,borderColorBack,multiplierCanvasSVGFormatX,multiplierCanvasSVGFormatY){
    document.getElementById('frontConfiguration').style.border=borderSizeOn+"px solid" + borderColorFront;
    document.getElementById('backConfiguration').style.border=borderSizeOn+"px solid" + borderColorBack;
    //recalculer le format
    canvasSvgSize(multiplierCanvasSVGFormatX, multiplierCanvasSVGFormatY,borderSizeOff);
}

// redimensionne les SVG et affiche les dimensions
function canvasSvgSize(multiplierCanvasSVGFormatX,multiplierCanvasSVGFormatY,borderSizeOff){
    document.getElementById('frontConfiguration').setAttribute('width',(tableCanvasSVG.width)* multiplierCanvasSVGFormatX-borderSizeOff*2);
    document.getElementById('frontConfiguration').setAttribute('height',(tableCanvasSVG.height)* multiplierCanvasSVGFormatY-borderSizeOff*2);
    document.getElementById('backConfiguration').setAttribute('width',(tableCanvasSVG.width)* multiplierCanvasSVGFormatX-borderSizeOff*2);
    document.getElementById('backConfiguration').setAttribute('height',(tableCanvasSVG.height)* multiplierCanvasSVGFormatY-borderSizeOff*2);
    document.getElementById('frontConfigurationXSize').innerHTML=('Largeur Panneau:'+((tableCanvasSVG.width* multiplierCanvasSVGFormatX-borderSizeOff*2)*2) + " mm");
    document.getElementById('frontConfigurationYSize').innerHTML=('Hauteur Panneau:'+((tableCanvasSVG.height* multiplierCanvasSVGFormatY-borderSizeOff*2)*2) + " mm");
}
