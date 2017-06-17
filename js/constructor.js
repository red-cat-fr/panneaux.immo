
let tableElementFront={
    length: 0,
    addObjectFront: function addObjectFront (newElem) {
        [].push.call(this, newElem);

    }
}
let tableElementBack={
    length: 0,
    addObjectBack: function addObjectBack (newElem) {
        [].push.call(this, newElem);
    }
}

/*Traitement de la suppression d'un élément*/
let optionDelete=false;
function deleteElement(id) {
    optionDelete=true;
    tableConstructorCall(id)
}


/*Cette fonction permet de traiter les 2 cotés. Elle appelle setDefaultValues.
L'opération est faite en 2 étapes. Cela permet de pouvoir appeler setDefaultValues
Ponctuellement, sans affecter les 2 cotés.
*/
function callSetDefaultValues(word, suffix, defaultValue) {
    let id
    id= word + suffix
    setDefaultValues(id, defaultValue)
    id= word + 'Back'+ suffix
    setDefaultValues(id, defaultValue)
}

function setDefaultValues(id, defaultValue) {
    document.getElementById(id).value=defaultValue;
}

/*fonction pour appeler hide ou show pour la table concernée.
Envoyer true pour cacher, false pour montrer*/
function toHideToShowCall(table,TrueFalse) {
    if (TrueFalse==true) {
        for (let key in table)
        {
            toHide(document.getElementsByClassName(key));
        }
    }else {
        for (let key in table)
        {
            toShow(document.getElementsByClassName(key));
        }
    }
}
//cacher des éléments
function toHide(item) {
    for (let i = 0; i < item.length; i++) {
        item[i].style.display = 'none';
    }
}
//Afficher des éléments
function toShow(item) {
    for (let i = 0; i < item.length; i++) {
        item[i].style.display = '';
    }
}

//Gestion de l'affichage des messages d'erreur
function displayErrorMessages(message,TrueFalse) {
    if (TrueFalse==true) {
        document.getElementById('errorMessages').innerHTML=message;
        document.getElementById('errorMessages').style=('font-size:20px; font-style:italic; font-weight:bold;color:red;text-decoration: blink;animation: blinker 1s linear infinite');
    }else {
        document.getElementById('errorMessages').innerHTML='';
    }
}

/*Fonction pour appeler la fonction addElement selon la table concernée
(Pour injection des données Json dans le HTML)*/
function addElementCall(table, tableForCall) {
        for (let key in tableForCall)
        {
            identify=key;
            name=tableForCall[key];
            addElement (identify, name, table);
        }
}
/*Ajoute les éléments dans les listes (injection des données Json dans le HTML) appelé par la fonction addElementCall*/
function addElement (id, name, table)
 {
        defaultValues()
         let subTableKey=[];
         let subTableValue=[];
         for (let key in table)
         {
             subTableKey.push(key);
             subTableValue.push(table[key]);
         }
         for ( j=0; j< subTableKey.length; j++)
         {
             let option = document.createElement("option");
             let currentArea=document.getElementById(id)
             option.setAttribute('value', subTableKey[j])
             option.setAttribute( 'name',name)
             option.innerHTML=subTableValue[j];
             document.getElementById(id).appendChild(option)
         }

     tableConstructorCall(id)
 }

 //Traitement du changement d'état input text. Déclenché par chaque modification de l'input sur la page
 function inputText(id) {
     tableConstructorCall(id)
 }

 //Traitement du changement d'état des input list. Déclenché par chaque modification de l'input sur la page
 function inputList(id) {
     let n;
     //try/catch dans le cas ou un élément d'une liste est vide
    try {
        n=document.getElementById(id).value;
    } catch (e) {
        n=id;
    }
     tableConstructorCall(id)
 }

 //traitemet du changement d'état des input number. Déclenché par chaque modification de l'input sur la page
 function inputNumber(id){
     let v = document.getElementById(id).value;
     document.getElementById(id).value=v;
     tableConstructorCall(id)
 }

//traitement du changement d'état des radio bouton. Déclenché par chaque modification de l'input sur la page
function inputRadioButton(id) {
    optionsChoose(id)
}

 //traitemet du changement d'état des input file. Déclenché par chaque modification de l'input sur la page
function inputFile(id) {
    tableConstructorCall(id)
}

//traitemet du changement d'état des input checkbox. Déclenché par chaque modification de l'input sur la page
function inputCheckbox(id) {
    optionsChoose(id)
}

/*traitement du changement d'état des champs range.
Il renvoie la valeur au champ texte associé*/
function inputRange(id) {
    let result = document.getElementById(id).value;
    document.getElementById(id + 'Display').value=result;
    tableConstructorCall(id)
}

/*traitement du changement d'état des champs texte associés aux input range.
 Le range s'aligne automatiquement*/
function inputTextRange(id) {
    let result = document.getElementById(id).value;
    let newId='';
    for (var i = 0; i < id.length-7; i++) {
        newId=newId+id.charAt(i)
    }
    document.getElementById(newId).value=parseInt(result);
    tableConstructorCall(newId)
}

function removeElement(elementToRemove) {
    for (let key in elementToRemove) {
        delete elementToRemove[key];
    };
    delete elementToRemove
}

//Fonction qui appelle la fonction qui remplie les tables de valeurs : tableConstructor
let tableElementFrontIndex=0;
let tableElementBackIndex=0;
function tableConstructorCall(id) {
    /*test sur le coté back
    */

    //pour renvoyer la bonne table (Front ou Back)
    let table=[];
    //Pour indexer chaque table (front et Back)
    let index;
    //id pour le cas startOptions (listes de choix des éléments)
    let idStart;
    //pour renvoyer 'Back' ou ''
    let suffix;
    //Nom associé à l'ID passé (nom du type d'élément).
    let nameId;
    //pour contrôler les 4 derniers caractères "back"
    let endIdName='';

    nameId=document.getElementById(id).name;
    for (var i = nameId.length-4; i < nameId.length; i++) {
        endIdName=endIdName+nameId.charAt(i)
    }

        if (endIdName!='Back') {
            if (id=='batchQty') {
                //cas de la liste "quantité du lot", ne concerne pas les tables
                priceCalculation();
            }else {
                table=tableElementFront;
                index=tableElementFrontIndex;
                idStart ='startOptions';
                suffix='';
                if (table.length>0) {
                    tableConstructor(table, index, idStart,suffix)
                }
            }
        }else if (endIdName =='Back') {
            table=tableElementBack;
            index=tableElementBackIndex;
            idStart ='startOptionsBack';
            suffix='Back';
            if (table.length>0) {
                tableConstructor(table, index, idStart,suffix)
            }
        }
}

/*fonction qui remplie les tables virtuelles avec les valeurs (X, Y, R, Couleur,...)
*/
//variable qui incrémentera l'id de l'élément
let elementId=0;
let insertionElementPositionX=tableCanvasSVG.width*multiplierCanvasSVGFormatX/2;
let insertionElementPositionY=tableCanvasSVG.height*multiplierCanvasSVGFormatY/2;
//cas de la suppression d'élement : index concerné dans la table
let indexTableToBeDeleted;
//liste des id par attribut
let idHeight;
let idWidth;
let idColor;
let idRadius;
let idRadiusX;
let idRadiusY;
let idText;
let idPolice;
let idBold;
let idRotation;
let idStyle;
let idUrl;
let idScall;
//Vaviable qui permet d'attendre l'url des images (false = pas d'url)
let urlOk=true;
function tableConstructor(table, index, idStart,suffix) {
    //index prends la valeur du dernier index existant de la table
    index=table.length-1;
    //cas ou le client n'est ni en modification, ni en suppression d'élément
    if (modifInProgress==false && optionDelete==false && index>=0) {
        if (table[index].type != document.getElementById(idStart).value) {
            table[index].type=document.getElementById(idStart).value;
            table[index].top=insertionElementPositionY;
            table[index].left=insertionElementPositionX;
        }
        if (table[index].top=="") {
            table[index].top=insertionElementPositionY;
        }
        if (table[index].left=="") {
            table[index].left=insertionElementPositionX;
        }
            if (table[index].type=="text") {
                idHeight = table[index].type +suffix+"Height";
                idText=table[index].type +suffix+"Text";
                idPolice=table[index].type +suffix+"Police";
                idBold=table[index].type +suffix+"Bold";
                idStyle=table[index].type +suffix+"Style";
                idRotation=table[index].type +suffix+"Rotation";
                table[index].style= document.getElementById(idStyle).value;
                table[index].height= document.getElementById(idHeight).value/2;
                table[index].width=400;
                table[index].text= document.getElementById(idText).value;
                table[index].font_size=  table[index].height + 'px';
                table[index].police= document.getElementById(idPolice).value;
                table[index].bold= document.getElementById(idBold).value;
                idColor = table[index].type +suffix+"Color";
                table[index].color= document.getElementById(idColor).value;
                table[index].rotation= document.getElementById(idRotation).value;
                table[index].movable= 1;
                //Element non utilisés
                table[index].radiusX=0;
                table[index].radiusY=0;
                table[index].radius=0;
                table[index].scall=1;
                table[index].url="";

            }else if (table[index].type=="ellipse") {
                idRadiusX=table[index].type +suffix+"RadiusX";
                table[index].radiusX = document.getElementById(idRadiusX).value/2;
                idRadiusY=table[index].type +suffix+"RadiusY";
                table[index].radiusY = document.getElementById(idRadiusY).value/2;
                idColor = table[index].type +suffix+"Color";
                table[index].color= document.getElementById(idColor).value;
                table[index].height=table[index].radiusX;
                table[index].width=table[index].radiusY;
                idRotation=table[index].type +suffix+"Rotation";
                table[index].rotation= document.getElementById(idRotation).value;
                table[index].movable= 1;
                //Element non utilisés
                table[index].police="";
                table[index].font_size=0;
                table[index].text="";
                table[index].bold=0;
                table[index].radius=0;
                table[index].style="";
                table[index].scall=1;
                table[index].url="";
            }else if (table[index].type=="circle") {
                idRadius=table[index].type +suffix+"Radius";
                table[index].radius = document.getElementById(idRadius).value/2;
                idColor = table[index].type +suffix+"Color";
                table[index].color= document.getElementById(idColor).value;
                table[index].height=table[index].radius;//Nota : pour le sercle, il faut une valeur height et width pour le traitement svg.
                table[index].width=table[index].radius;
                table[index].movable= 1;
                //Element non utilisés
                table[index].radiusX=0;
                table[index].radiusY=0;
                table[index].police="";
                table[index].font_size=0;
                table[index].text="";
                table[index].bold=0;
                table[index].rotation=0;
                table[index].style="";
                table[index].scall=1;
                table[index].url="";

            }else if (table[index].type=="picture") {
                idScall=table[index].type +suffix+"Scall";
                idRotation=table[index].type +suffix+"Rotation";
                idUrl=table[index].type+suffix+"Download";
                let essai2=this.Object.getOwnPropertyDescriptor(this.Object,'src' )
                let essai3=this.Object.location
                let azerty = this.URL.path
                let essai = document.getElementById(idUrl).getAttribute(URL)
                if (table[index].url!=undefined && table[index].url!=null && table[index].url!=0 && table[index].url!="") {
                    table[index].scall=document.getElementById(idScall).value + '%';
                    table[index].rotation= document.getElementById(idRotation).value;
                    table[index].movable= 1;
                    urlOk=true;
                    //Element non utilisés
                    table[index].radiusX=0;
                    table[index].radiusY=0;
                    table[index].police="";
                    table[index].font_size=0;
                    table[index].text="";
                    table[index].bold=0;
                    table[index].radius=0;
                    table[index].style="";
                    toShow(document.getElementsByClassName('subPictureSelected'+suffix))
                }else  {
                    urlOk=false;
                }
            }else if (table[index].type=="rectangle"||table[index].type=="line" ||
                    table[index].type=="triangleRectangle" ||
                    table[index].type=="triangleIsocele")
                {
                idHeight = table[index].type +suffix+"Height";
                idWidth = table[index].type +suffix+"Width";
                table[index].height= document.getElementById(idHeight).value/2;
                table[index].width= document.getElementById(idWidth).value/2;
                idColor = table[index].type +suffix+"Color";
                idRotation=table[index].type +suffix+"Rotation";
                table[index].color= document.getElementById(idColor).value;
                table[index].rotation= document.getElementById(idRotation).value
                table[index].movable= 1;
                //Element non utilisés
                table[index].radiusX=0;
                table[index].radiusY=0;
                table[index].police="";
                table[index].font_size=0;
                table[index].text="";
                table[index].bold=0;
                table[index].radius=0;
                table[index].style="";
                table[index].scall=1;
                table[index].url="";
            }else if (table[index].type=="triangleEquilateral") {// ne prendre que la largeur
                idWidth = table[index].type +suffix+"Width";
                table[index].height= document.getElementById(idWidth).value/2 * Math.sqrt(3)/2;
                table[index].width= document.getElementById(idWidth).value/2;
                idColor = table[index].type +suffix+"Color";
                idRotation=table[index].type +suffix+"Rotation";
                table[index].color= document.getElementById(idColor).value;
                table[index].rotation= document.getElementById(idRotation).value
                table[index].movable= 1;
                //Element non utilisés
                table[index].radiusX=0;
                table[index].radiusY=0;
                table[index].police="";
                table[index].font_size=0;
                table[index].text="";
                table[index].bold=0;
                table[index].radius=0;
                table[index].style="";
                table[index].scall=1;
                table[index].url="";
            }else{
                for (let i in table) {
                    table[i]='';
                }
            }
        //cas ou le client supprime un élément lors de sa création
        }else if (modifInProgress==false && optionDelete==true) {

                let idElement=currentElement.id;
                let tableLength = table.length;
                let temporaryValue=0;
                for (var i = 0; i < tableLength; i++) {
                    if (table[i].id == idElement){
                        indexTableToBeDeleted=i;
                        temporaryValue=1;
                    }
                    /*Pour retirer l'index de la table et réaffecter de 0 à n sans interruption.
                    On déplace chaque éléments en le plaçant en dessous
                    a partir de l'élément supprimé. A la fin, on supprime le dernier élément.
                    */
                    if (temporaryValue==1 && i<tableLength-1) {
                        table[i]=table[i+1]
                    }else if (i==tableLength-1) {
                        delete table[i]
                    }
                }
            toHide(document.getElementsByClassName(table[index].type + "Selected"+suffix))

            table.length-=1;
            document.getElementById('addObject'+suffix).style.display = '';
            document.getElementById('validation'+suffix).style.display = 'none';

        //cas ou le client est en modification d'élément
        } else if (modifInProgress==true && optionDelete==false) {
            if (currentElement.type=="text") {
                idHeight = currentElement.type +suffix+"Height";
                idText=currentElement.type +suffix+"Text";
                idPolice=currentElement.type +suffix+"Police";
                idBold=currentElement.type +suffix+"Bold";
                idStyle=currentElement.type +suffix+"Style";
                idRotation=currentElement.type +suffix+"Rotation";
                currentElement.style= document.getElementById(idStyle).value;
                currentElement.height= document.getElementById(idHeight).value/2;
                currentElement.width=400;
                currentElement.text= document.getElementById(idText).value;
                currentElement.font_size=  currentElement.height + 'px';
                currentElement.police= document.getElementById(idPolice).value;
                currentElement.bold= document.getElementById(idBold).value;
                idColor = currentElement.type +suffix+"Color";
                currentElement.color= document.getElementById(idColor).value;
                currentElement.rotation= document.getElementById(idRotation).value;
                currentElement.movable= 1;
                //Element non utilisés
                currentElement.radiusX=0;
                currentElement.radiusY=0;
                currentElement.radius=0;
                currentElement.scall=1;
                currentElement.url="";

            }else if (currentElement.type=="ellipse") {
                idRadiusX=currentElement.type +suffix+"RadiusX";
                currentElement.radiusX = document.getElementById(idRadiusX).value/2;
                idRadiusY=currentElement.type +suffix+"RadiusY";
                currentElement.radiusY = document.getElementById(idRadiusY).value/2;
                idColor = currentElement.type +suffix+"Color";
                currentElement.color= document.getElementById(idColor).value;
                currentElement.height=currentElement.radiusX;//, il faut une valeur height et width pour le traitement svg.
                currentElement.width=currentElement.radiusY;
                idRotation=currentElement.type +suffix+"Rotation";
                currentElement.rotation= document.getElementById(idRotation).value;
                currentElement.movable= 1;
                //Element non utilisés
                currentElement.police="";
                currentElement.font_size=0;
                currentElement.text="";
                currentElement.bold=0;
                currentElement.radius=0;
                currentElement.style="";
                currentElement.scall=1;
                currentElement.url="";

            }else if (currentElement.type=="circle") {
                idRadius=currentElement.type +suffix+"Radius";
                currentElement.radius = document.getElementById(idRadius).value/2;
                idColor = currentElement.type +suffix+"Color";
                currentElement.color= document.getElementById(idColor).value;
                currentElement.height=currentElement.radius;//Nota : pour le sercle, il faut une valeur height et width pour le traitement svg.
                currentElement.width=currentElement.radius;
                currentElement.movable= 1;
                //Element non utilisés
                currentElement.rotation=0;
                currentElement.radiusX=0;
                currentElement.radiusY=0;
                currentElement.police="";
                currentElement.font_size=0;
                currentElement.text="";
                currentElement.bold=0;
                currentElement.style="";
                currentElement.scall=1;
                currentElement.url="";
            //N.B. : il manque la récupération de l'url(à traiter).
            }else if (currentElement.type=="picture") {
                idScall=table[index].type +suffix+"Scall";
                idRotation=table[index].type +suffix+"Rotation";
                idUrl=table[index].type+suffix+"Download";
                table[index].url=document.getElementById(idUrl).value;
                if (table[index].url=document.getElementById(idUrl).value!="") {
                    table[index].scall=document.getElementById(idScall).value;
                    table[index].rotation= document.getElementById(idRotation).value;
                    table[index].movable= 1;
                    urlOk=true;
                }else if (table[index].url=document.getElementById(idUrl).value=="") {
                    urlOk=false;
                }
                //Element non utilisés
                currentElement.radiusX=0;
                currentElement.radiusY=0;
                currentElement.police="";
                currentElement.font_size=0;
                currentElement.text="";
                currentElement.bold=0;
                currentElement.radius=0;
                currentElement.style="";

            }else if (currentElement.type=="rectangle"||currentElement.type=="line" ||
                    currentElement.type=="triangleRectangle" ||
                    currentElement.type=="triangleIsocele")
                {
                idHeight = currentElement.type +suffix+"Height";
                idWidth = currentElement.type +suffix+"Width";
                currentElement.height= document.getElementById(idHeight).value/2;
                currentElement.width= document.getElementById(idWidth).value/2;
                idColor = currentElement.type +suffix+"Color";
                idRotation=currentElement.type +suffix+"Rotation";
                currentElement.color= document.getElementById(idColor).value;
                currentElement.rotation= document.getElementById(idRotation).value
                currentElement.movable= 1;
                //Element non utilisés
                currentElement.radiusX=0;
                currentElement.radiusY=0;
                currentElement.police="";
                currentElement.font_size=0;
                currentElement.text="";
                currentElement.bold=0;
                currentElement.radius=0;
                currentElement.style="";
                currentElement.scall=1;
                currentElement.url="";
            }else if (currentElement.type=="triangleEquilateral") {
                idWidth = currentElement.type +suffix+"Width";
                currentElement.height= document.getElementById(idWidth).value/2 * Math.sqrt(3)/2;
                currentElement.width= document.getElementById(idWidth).value/2;
                idColor = currentElement.type +suffix+"Color";
                idRotation=currentElement.type +suffix+"Rotation";
                currentElement.color= document.getElementById(idColor).value;
                currentElement.rotation= document.getElementById(idRotation).value
                currentElement.movable= 1;
                //Element non utilisés
                currentElement.radiusX=0;
                currentElement.radiusY=0;
                currentElement.police="";
                currentElement.font_size=0;
                currentElement.text="";
                currentElement.bold=0;
                currentElement.radius=0;
                currentElement.style="";
                currentElement.scall=1;
                currentElement.url="";
            }
        //cas ou le client supprime un élément aprés sa validation
        } else if (modifInProgress==true && optionDelete==true ) {
            let typeElement = currentElement.type
            toHide(document.getElementsByClassName(currentElement.type + "Selected"+suffix))
            let idElement=currentElement.id;
            let tableLength = table.length;
            let temporaryValue=0;
            for (var i = 0; i < tableLength; i++) {
                if (table[i].id == idElement){
                    indexTableToBeDeleted=i;
                    temporaryValue=1;
                }
                /*Pour retirer l'index de la table et réaffecter de 0 à n sans interruption.
                On déplace chaque éléments en le plaçant en dessous
                a partir de l'élément supprimé. A la fin, on supprime le dernier élément.
                */
                if (temporaryValue==1 && i<tableLength-1) {
                    table[i]=table[i+1]
                }else if (i==tableLength-1) {
                    delete table[i]
                }
            }

            table.length-=1;
            document.getElementById('addObject'+suffix).style.display = '';
            document.getElementById('validation'+suffix).style.display = 'none';
        }
        //Appel fonction castSVG pour redessiner le SVG.
        if (suffix =='' && urlOk==true) {
            tableElementFront=table;
            castSVG('frontConfiguration', tableElementFront,indexTableToBeDeleted);
            indexTableToBeDeleted='';
        }else if (suffix =='Back' && urlOk==true) {
            tableElementBack=table;
            toShow(document.getElementsByClassName('right'));
            toShow(document.getElementsByClassName('backSVG'));
            castSVG('backConfiguration', tableElementBack,indexTableToBeDeleted);
            indexTableToBeDeleted='';
        }
        optionDelete=false;
}



 //Traitement du telechargement du logo : A developper
 function logoDownloaded(id){
     //pour avoir juste le nom
     let filelist;
     let url;
     url = document.getElementById(id).value; // ok, je récupère l'url.

     //tableConstructorCall(id)
 }


let tableSVGFront;
let tableSVGBack;
let tableOrder;
let orderNumber;

function validConfig() {
//Gestion et formatage date. Le N° de commande est YYYYMMDDHHMNSS;
    let currentdate = new Date();
    let dd=datetimeFormat(currentdate.getDate());
    let mm=datetimeFormat((currentdate.getMonth()+1));
    let hh=datetimeFormat(currentdate.getHours());
    let mn=datetimeFormat(currentdate.getMinutes());
    let sec=datetimeFormat(currentdate.getSeconds());
    function datetimeFormat(item) {
        if (item<10) {
            return item='0'+item;
        }else {
            return item;
        }
    }

    let date =currentdate.getFullYear()+ "-"+mm+ "-" + dd;
    let hour=hh + ":"+ mn + ":" + sec;
    orderNumber=currentdate.getFullYear()+''+mm+''+dd+''+hh+''+ mn+''+ sec;

     tableOrder={
         date:date,
         hour:hour,
         user:'toto',
         quantity:qty,
         price:price,
         orderNumber:orderNumber,
     }

     recordConfiguration(tableOrder)

}
//en cas d'enregistrement sans validation
function recordConfiguration(tableOrder) {

    let eyeValue = convertBoolInt(document.getElementById('eye').checked)
    let flyerValue =convertBoolInt(document.getElementById('double').checked)
    let borderValue =convertBoolInt(document.getElementById('borderOff').checked)
    function convertBoolInt(item) {
        if (item==true) {
            return item=1;
        }else {
            return item=0;
        }
    }
    //entrée valeurs dans table SVG recto
     tableSVGFront={
         side:'front',
         height:document.getElementById('frontConfiguration').height.animVal.value,
         width:document.getElementById('frontConfiguration').width.animVal.value,
         color:document.getElementById('canvasColor').value,//string
         eye:eyeValue,
         flyer:flyerValue,
         border:borderValue,// fond perdu si 1
     }
     //entrée valeurs dans table SVG verso
    if (document.getElementById('FrontAndBack').checked==true || document.getElementById('double').checked==true) {
         tableSVGBack={
             side:'back',
             height:document.getElementById('backConfiguration').height.animVal.value,
             width:document.getElementById('backConfiguration').width.animVal.value,
             color:document.getElementById('canvasColorBack').value,
             eye:eyeValue,
             flyer:flyerValue,
             border:borderValue,// fond perdu si 1
         }
     }else {
             tableSVGBack={
                 side:'back',
                 height:0,
                 width:0,
                 color:"",
                 eye:0,
                 flyer:0,
                 border:0,
         }
     }
     validation()
}

function validation() {
            $.ajax({
                url:"Querys.php",
                type:"POST",
                data:{
                    tableOrder: tableOrder,
                    tableSVGFront: tableSVGFront,
                    tableElementFront:tableElementFront,
                    tableSVGBack:tableSVGBack,
                    tableElementBack:tableElementBack,
                },
                success:console.log("Right ! "),
                dataType:"json",
            })
            .done(function(msg) {
                console.log('done');
            })
 }
