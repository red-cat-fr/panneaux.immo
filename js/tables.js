

/*Cette table représente toutes les class de chaque élémént PHP*/
let tableToHideToShow={
    'startOptions':'',
    'textSelected':'',
    'pictureSelected':'',
    'lineSelected':'',
    'rectangleSelected':'',
    'circleSelected':'',
    'ellipseSelected':'',
    'triangleRectangleSelected':'',
    'triangleEquilateralSelected':'',
    'triangleIsoceleSelected':'',
    //'triangleAnySelected':'',
    'startOptionsBack':'',
    'twoColumnsBack':'',
    'textSelectedBack':'',
    'pictureSelectedBack':'',
    'lineSelectedBack':'',
    'rectangleSelectedBack':'',
    'circleSelectedBack':'',
    'ellipseSelectedBack':'',
    'triangleRectangleSelectedBack':'',
    'triangleEquilateralSelectedBack':'',
    'triangleIsoceleSelectedBack':'',
    //'triangleAnySelectedBack':'',
};

/*Pour les tables du type "init..." (ou tableForCall), la clé : id php du select
concerné, la valeur représente le name qui sera rentré dans les options.
*/
let tableInitQty={
    batchQty:'batchQty',
};
//clé : id php, valeur : name php
let tableInitOptionsTable={
    startOptions:'options',
    startOptionsBack:'optionsBack',
};

//clé : id php, valeur : name php
let tableInitPoliceTypeTable={
    textPolice:'text',
    textBackPolice:'textBack',
};

//clé : id php, valeur : name php
let tableInitPoliceStyleTable={
    textStyle:'text',
    textBackStyle:'textBack',
};

//clé : id php, valeur : name php
let tableInitColorTable={
    textColor:'text',
    circleColor:'circle',
    lineColor:'line',
    ellipseColor:'ellipse',
    rectangleColor:'rectangle',
    triangleRectangleColor:'triangleRectangle',
    triangleEquilateralColor:'triangleEquilateral',
    triangleIsoceleColor:'triangleIsocele',
    //triangleAnyColor:'triangleAny',
    textBackColor:'textBack',
    lineBackColor:'lineBack',
    ellipseBackColor:'ellipseBack',
    circleBackColor:'circleBack',
    rectangleBackColor:'rectangleBack',
    triangleRectangleBackColor:'triangleRectangleBack',
    triangleEquilateralBackColor:'triangleEquilateralBack',
    triangleIsoceleBackColor:'triangleIsoceleBack',
    //triangleAnyBackColor:'triangleAnyBack',
    canvasColorBack:'canvasBack',
    canvasColor:'canvas',
};

//5 10 15 50 100 {% reduc: qty/lot}
let QtyTable={
    0:5,
    5:10,
    10:15,
    20:50,
    30:100,
};
/*Les tables suivantes représentent :
clés: valeurs prises en compte par le programme,
valeurs : ce qui sera affiché dans les listes ou menus.
*/

let optionsTable= {
      '':'',
    text:'Texte',
    picture:'Logo',
    rectangle:'Rectangle',
    line:'ligne',
    circle:'cercle',
    ellipse:'ellipse',
    triangleRectangle:'Triangle Rectangle',
    triangleIsocele:'Triangle Isocele',
    triangleEquilateral:'Triangle Equilatéral',
    //triangleAny:'Triangle Quelconque',
    };

let policeTypeTable= {
    Arial:'Arial',
    ArialUnicode:'Arial Unicode MS',
    ArialNarrow:'Arial Narrow',
    ArialRoundedBold:'Arial Rounded MT Bold',
    Avenir:'Avenir',
    Prestige:'Prestige',
    Courier:'Courier',
    'Courier New':'Courier New',
    Helvetica:'Helvetica',
    Verdana:'Verdana',
    Tahoma:'Tahoma',
    Geneva:'Geneva',
    Liberationans:'Liberation, sans-serif',
    Impact:'Impact',
    AriaBlack:'Arial Black'
    };

let policeStyleTable={
    normal :'Normal',
    italic :'Italique',
    oblique :'Oblique',
    };

let colorTable={
    "#000000":'Noir',
    "#ff0000":"Rouge",
    "#0822e5":"Bleu",
    "#3be507":"Vert",
    "#a0a2a5":"Gris",
    "#ffffff":"Blanc"
    };
