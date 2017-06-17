
let currentElement;
let svg;
let id=0;
function svg_drag(svg, table,indexTableToBeDeleted) {
    this.elemdrag=null;//
	this.decx=null;//
	this.decy=null;//
	this.trueFalse=true;//
	this.currentTable=table;
	this.obj_json=table;//
	this.svg=document.getElementById(svg);//
	this.tableImage=[];//
	this.table_positions=[];//
	this.table_positionsBack=[];
	this.table_positionsFront=[];
	if (svg=='frontConfiguration') {
		this.table_positions=this.table_positionsFront
	}else if (svg=='backConfiguration') {
		this.table_positions=this.table_positionsBack;
	}
    if (table.length<this.table_positions.length) {
        delete this.table_positions[indexTableToBeDeleted]
    }
	this.index=0;
	this.picture_qty=0;
	this.ftc='';
    this.init(svg);
}


/*lecture du fichier json et configuration des variables et array*/
svg_drag.prototype.init=function(svg) {
		if (this.obj_json!=undefined) {
			for(var i=0;i<this.obj_json.length;i++){
				if(this.obj_json[i].type=="picture"){
					this.tableImage.push(new Image());
					this.tableImage.src=this.obj_json[i].picture;
					this.picture_qty++
				}
                // si ce n'est pas une image et qu'il n'y a aucune particularité
                else if(this.obj_json[i].type=="rectangle"
                    ||this.obj_json[i].type=="triangleRectangle"
                    ||this.obj_json[i].type=="triangleIsocele"
                    ||this.obj_json[i].type=="triangleEquilateral"
                    ||this.obj_json[i].type=="line"
                    || this.obj_json[i].type=="ellipse"){
					this.tableImage.push("empty");
				}else if(this.obj_json[i].type=="circle"){
					this.obj_json[i].top=this.obj_json[i].top;
					this.obj_json[i].left=this.obj_json[i].left;
					this.tableImage.push("empty");
				}else if(this.obj_json[i].type=="text"){
					let font = this.obj_json[i].police;
					textWidth = this.obj_json[i].width
					this.tableImage.push("empty");
				}
                if(this.obj_json[i].movable==1){
					this.table_positions.push(i);
				}
			}
		this.preLoad(svg);
	}
}

//prechargement des images
svg_drag.prototype.preLoad=function(svg){
    this.svg.addEventListener("dblclick",this.modifyingElementDisplay.bind(this),false)
    this.svg.removeEventListener("dblclick", this.ftc, false);
	for (let i = 0; i < this.tableImage.length; i++){
		if(this.tableImage[i] !="empty"){
			if(this.tableImage[i].complete== true || this.tableImage[i].height>0){
				this.picture_qty--;
			}
		}
	}
	if(this.picture_qty==0){
        this.svg.addEventListener("mousemove",this.style_cursor.bind(this), false);
        this.svg.addEventListener("mousedown",this.init_mousedown.bind(this), false);
        this.svg.addEventListener("mouseup",this.end_drag.bind(this), false);
		this.svg_draw(svg);
		return false
	}
	setTimeout(this.preLoad.bind(this),100);
}


//reception du l'evenement mousedown
let dec_x;
let dec_y;
svg_drag.prototype.init_mousedown=function(mouseMvt){
	if (mouseMvt.currentTarget.id=='frontConfiguration') {
		this.table_positions=this.table_positionsFront;
	}else if (mouseMvt.currentTarget.id=='backConfiguration') {
		this.table_positions=this.table_positionsBack;
	}

    if(this.trueFalse){

        this.decx = mouseMvt.offsetX;
		this.decy = mouseMvt.offsetY;
        dec_x=mouseMvt.offsetX;
        dec_y=mouseMvt.offsetY;
		for(let i=this.table_positions.length-1;i>=0;i--){
			let val=this.table_positions[i];
			if(this.obj_json[val].movable==0){
				continue;
			}
			if(this.collision(val)){//collision :
				if(this.obj_json[val].movable!=1){
					break
				}else {
					this.init_drag(i, mouseMvt)
					mouseMvt.preventDefault();
					break;
				}
			}
		}
	}
}

/*interception de la position des elements return true quand il est sur un élément.
le svg_drag.prototype représente ???
this.obj_json[val] représente l'élément concerné
*/

svg_drag.prototype.collision=function(val){
	if(this.decy >= this.obj_json[val].top + (this.obj_json[val].height/2)		         // trop en bas
			|| this.decy <= this.obj_json[val].top-(this.obj_json[val].height/2)		// trop en haut
			|| this.decx>=this.obj_json[val].left+ (this.obj_json[val].width/2)	        // trop à droite
			|| this.decx<=this.obj_json[val].left- (this.obj_json[val].width/2)){	   // trop à gauche
		return false;
	}
	else{
		return true;
	}
}

// initialisation du deplacement
svg_drag.prototype.init_drag=function(i, mouseMvt){
	if (mouseMvt.currentTarget.id=='frontConfiguration') {
		this.table_positions=this.table_positionsFront;
	}else if (mouseMvt.currentTarget.id=='backConfiguration') {
		this.table_positions=this.table_positionsBack;
	}

	let change =parseInt(this.table_positions.splice(i,1));
	this.table_positions.push(change);
	this.index=this.table_positions[this.table_positions.length-1];
	this.decx_b=this.decx-this.obj_json[this.index].left;
	this.decy_b=this.decy-this.obj_json[this.index].top;
	let that=this;
	this.ftc=function(mouseMvt){that.posi.call(that,mouseMvt)};
	document.documentElement.addEventListener("mousemove", that.ftc, false);
	this.trueFalse=false;
}

/*mouseMvt représente la souris,
*/
svg_drag.prototype.posi=function(mouseMvt){
	this.obj_json[this.index].top = this.obj_json[this.index].top+(mouseMvt.offsetY-this.obj_json[this.index].top);
    this.obj_json[this.index].left = this.obj_json[this.index].left+(mouseMvt.offsetX-this.obj_json[this.index].left);
    this.svg_draw(this);
}

//gestion de l'apparence du curseur de la souris
svg_drag.prototype.style_cursor=function(mouseMvt){
	if (mouseMvt.currentTarget.id=='frontConfiguration') {
		this.table_positions=this.table_positionsFront;
	}else if (mouseMvt.currentTarget.id=='backConfiguration') {
		this.table_positions=this.table_positionsBack;
	}
	this.decx = mouseMvt.offsetX
	this.decy = mouseMvt.offsetY
	for(let i=0;i<this.table_positions.length;i++){
		if(this.obj_json[i].movable==0 || this.obj_json[i].type=="no_movable"){
			continue;
		}
		if(this.collision(i) && this.obj_json[i].movable!=1){
			this.svg.style.cursor='move';
			break;
		}
		else if(this.collision(i) && this.obj_json[i].movable==1){
			this.svg.style.cursor='pointer';
			break;
		}
		else{
			this.svg.style.cursor='default';
		}
	}
}
	//fin du deplacement
svg_drag.prototype.end_drag=function(){
	if(this.trueFalse==false){
		document.documentElement.removeEventListener("mousemove", this.ftc, false);
		this.trueFalse=true;
	}
}

/**/

svg_drag.prototype.svg_draw=function() {
    let nodeLayer
    svg=this.svg;
    d3.select(svg).selectAll("*").remove();
    nodeLayer = d3.select(svg);

    for (var i = 0; i < this.currentTable.length; i++) {
        let element=this.obj_json[this.table_positions[i]]
        this.chooseCase(nodeLayer,element, svg,i);

        if (this.obj_json[this.table_positions[i]].left != undefined && this.obj_json[this.table_positions[i]].top != undefined) {
            document.getElementById('currentElementPosition').innerHTML=
            ('Position du centre de l\'élément en cours(mm) : Position X (largeur) = '+
            this.obj_json[this.table_positions[i]].left*2+', Position Y (Hauteur) = '+
            this.obj_json[this.table_positions[i]].top*2);
            }
    }
}

svg_drag.prototype.chooseCase=function(nodeLayer,element, svg,i) {
    if (element!= undefined) {
        switch (element.type) {
        case "rectangle":
            this.rectangle(nodeLayer,element, svg)
            break;
        case "line":
            this.line(nodeLayer,element, svg)
            break;
        case "ellipse":
            this.ellipse(nodeLayer,element, svg)
            break;
        case "picture":
            this.picture(nodeLayer,element, svg,i)
            break;
        case "circle":
            this.circle(nodeLayer,element, svg)
            break;
        case "text":
            this.text(nodeLayer,element, svg)
            break;
        case "triangleRectangle":
            this.triangleRect(nodeLayer,element, svg)
            break;
        case "triangleIsocele":
            this.triangleIsocele(nodeLayer,element, svg)
            break;
        case "triangleEquilateral":
            this.triangleEquilateral(nodeLayer,element, svg)
            break;
        // case "polygon":
        // 	//this.polygon(nodeLayer,element, svg)
        // 	break;
        // case "no_movable":
        // 	this.texte(element, svg)
        // 	break;
        }
    }
    if (document.getElementById('eye').checked==true) {
        eyeDisplay(nodeLayer,svg, this.svg.id)
    }
}

svg_drag.prototype.line=function (nodeLayer,element, svg) {
    if (element.id==undefined) {
        element.id=element.type+id
        id+=1;
    }
    nodeLayer.append("line")
        .style("stroke", element.color)
        .attr("x1", element.left - element.width/2)
        .attr("y1", element.top)
        .attr("x2",element.left + element.width/2)
        .attr("y2",element.top )
        .style("stroke-width", element.height)
        .attr("transform","rotate("+ element.rotation+' '+(element.left)+' '+ (element.top) +")")
        .attr("id",element.id)
}

svg_drag.prototype.ellipse=function (nodeLayer,element, svg) {
    if (element.id==undefined) {
        element.id=element.type+id
        id+=1;
    }
    nodeLayer.append("ellipse")
        .style("fill", element.color)
        .attr("cx", element.left - element.width/2)
        .attr("cy", element.top)
        .attr("rx",element.radiusX)
        .attr("ry",element.radiusY )
        .attr("transform","rotate("+ element.rotation+' '+(element.left)+' '+ (element.top) +")")
        .attr("id",element.id)

}

svg_drag.prototype.rectangle=function (nodeLayer,element, svg) {
    if (element.id==undefined) {
        element.id=element.type+id
        id+=1;
    }
    nodeLayer.append("rect")
        .style("fill", element.color)
        .attr("x", element.left - element.width/2)
        .attr("y", element.top-element.height/2)
        .attr("width", element.width)
        .attr("height", element.height)
        .attr("transform","rotate("+ element.rotation+' '+(element.left)+' '+ (element.top) +")")
        .attr("id",element.id)
}



svg_drag.prototype.picture=function(nodeLayer,element, svg,i){//manque URL
    if (element.id==undefined) {
        element.id=element.type+id
        id+=1;
    }
    nodeLayer.append("image")
        .attr("xlink:href",element.url)
        .style("width",element.scall)
        .style("height",element.scall)
        .attr("x", element.left)
        .attr("y", element.top)
        .attr("preserveaspectratio","xMidYMin")
        //.attr("width", element.width)
        //.attr("height", element.height)
        .attr("transform","rotate("+ element.rotation+' '+(element.left)+' '+ (element.top) +")")
        .attr("id",element.id)
}


svg_drag.prototype.circle=function(nodeLayer,element, svg) {
    if (element.id==undefined) {
        element.id=element.type+id
        id+=1;
    }
    nodeLayer.append("circle")
        .style("fill", element.color)
        .attr("cx", element.left)
        .attr("cy", element.top)
        .attr("r", element.radius)
        .attr("id",element.id)
}

svg_drag.prototype.text=function(nodeLayer,element, svg) {
    if (element.id==undefined) {
        element.id=element.type+id
        id+=1;
    }
    nodeLayer.append("text")
        .attr("x", element.left)
        .attr("y", element.top)
        .attr("value",element.text)
        .attr("id",element.id)
        .style("fill", element.color)
        .style("font-family", element.police)
        .style("font-size", element.font_size)
        .style("font-weight",element.bold)
        .style("font-style",element.style)
        .style("text-anchor","middle")
        .text(element.text)
        .attr("transform","rotate("+ element.rotation+' '+(element.left)+' '+ (element.top) +")")
}

svg_drag.prototype.triangleRect=function(nodeLayer,element, svg) {
    if (element.id==undefined) {
        element.id=element.type+id
        id+=1;
    }
    nodeLayer.append('path')
        .attr('d', function(d) {
          return 'M ' + (element.left-element.width/2) +' '+ (element.top+element.height/2)
                    + ' L ' + (element.left+element.width) + ' ' + (element.top+element.height/2)
                    + ' L ' + (element.left-element.width/2) + ' ' + (element.top-element.height) + ' Z';
        })
        .style("fill", element.color)
        .attr("transform","rotate("+ element.rotation+' '+(element.left)+' '+ (element.top) +")")
        .attr("id",element.id)
}

svg_drag.prototype.triangleIsocele=function(nodeLayer,element, svg) {
    if (element.id==undefined) {
        element.id=element.type+id
        id+=1;
    }
    nodeLayer.append('path')
        .attr('d', function(d) {
          return 'M ' + (element.left-element.width/2) +' '+ (element.top+element.height/2)
                    + ' L ' + (element.left + element.width/2) + ' ' + (element.top+element.height/2)
                    + ' L ' + (element.left) + ' ' + (element.top-element.height) + ' Z';
        })
        .style("fill", element.color)
        .attr("transform","rotate("+ element.rotation+' '+(element.left)+' '+ (element.top) +")")
        .attr("id",element.id)
}


svg_drag.prototype.triangleEquilateral=function(nodeLayer,element, svg) {
    if (element.id==undefined) {
        element.id=element.type+id
        id+=1;
    }
    nodeLayer.append('path')
        .attr('d', function(d) {
          return 'M ' + (element.left-element.width/2) +' '+ (element.top+element.height/2)
                    + ' L ' + (element.left + element.width/2) + ' ' + (element.top+element.height/2)
                    + ' L ' + (element.left) + ' ' + (element.top-element.height/2) + ' Z';
        })
        .style("fill", element.color)
        .attr("transform","rotate("+ element.rotation+' '+(element.left)+' '+ (element.top) +")")
        .attr("id",element.id)

}

// function polygon(ctx,element, svg) {
//
//
//
//  }


function eyeDisplay(nodeLayer,svg,id) {

// }
// svg_drag.prototype.eyeDisplay=function(nodeLayer) {
    let borderType=0;
    if (document.getElementById('borderOff').checked==true) {
        borderType=borderSizeOff;
    }else {
        borderType=0;
    }
    let SVGSizeX=document.getElementById('frontConfiguration').getAttributeNS(null,'width')//-borderType;
    let SVGSizeY=document.getElementById('frontConfiguration').getAttributeNS(null,'height')//-borderType;
    /* positions des oeillets*/
    let eyePosition =12.5;
    let eyeLeftTopX=eyePosition;
    let eyeRightTopX=SVGSizeX-eyePosition;
    let eyeRightBottomX=SVGSizeX - eyePosition//-borderType;
    let eyeLeftBottomX=eyeLeftTopX;
    let eyeleftMiddleX=eyeLeftTopX;
    let eyeRightMiddleX=SVGSizeX - eyePosition//-borderType;
    let eyeLeftTopY=eyeLeftTopX;
    let eyeRightTopY=eyeLeftTopX;
    let eyeleftMiddleY=SVGSizeY/2;
    let eyeRightMiddleY=SVGSizeY/2;
    let eyeLeftBottomY=SVGSizeY - eyePosition//-borderType;
    let eyeRightBottomY=SVGSizeY - eyePosition//-borderType;
    let eyeRadius=2.5;
    let eyeColor;
    let dbl;
    let big;

    if (document.getElementById('eye').checked==true) {
        eyeColor="black";
    }else {
        if (id=='frontConfiguration') {
            eyeColor=document.getElementById('canvasColor').value;

        }else if (id=='backConfiguration') {
            eyeColor=document.getElementById('canvasColorBack').value;
        }
    }

    if (document.getElementById('double').checked==true) {//3 oeillets
        dbl=true;
    }else {
        dbl=false;
    }
    if (document.getElementById('big').checked==true) {//6 oeillets
        big=true;
    }else {
        big=false;
    }
        if (dbl==true && this.svg.id=='frontConfiguration' || dbl==false) {

        //haut gauche
        nodeLayer.append("circle")
            .style("fill", eyeColor)
            .attr("r", eyeRadius)
            .attr("cx", eyeLeftTopX)
            .attr("cy", eyeLeftTopY)
            .attr("class","eye");

        nodeLayer.append("circle")
        //bas gauche
            .style("fill", eyeColor)
            .attr("r", eyeRadius)
            .attr("cx", eyeLeftBottomX)
            .attr("cy", eyeLeftBottomY)
            .attr("class","eye");
        }

        if (dbl==false || (((big==true && dbl==false) || dbl==true) && this.svg.id=='backConfiguration')) {// ça marche pour le cvs de gauche, mais pas celui de droite
            //haut droite
            nodeLayer.append("circle")
                .style("fill", eyeColor)
                .attr("r", eyeRadius)
                .attr("cx", eyeRightTopX)
                .attr("cy", eyeRightTopY)
                .attr("class","eye");
            //bas droite
            nodeLayer.append("circle")
                .style("fill", eyeColor)
                .attr("r", eyeRadius)
                .attr("cx", eyeRightBottomX)
                .attr("cy", eyeRightBottomY)
                .attr("class","eye");
        }
        //millieu left
        //console.log(this.svg.id);
        if (big==true || (dbl==true&& this.svg.id=='frontConfiguration')) {// ça marche pour le cvs de gauche, mais pas celui de droite
            nodeLayer.append("circle")
                .style("fill", eyeColor)
                .attr("r", eyeRadius)
                .attr("cx", eyeleftMiddleX)
                .attr("cy", eyeleftMiddleY)
                .attr("class","eye");
        }
        //millieu right
        if ((big==true && dbl==false) || (dbl==true && this.svg.id=='backConfiguration')) {// ça marche pour le cvs de gauche, mais pas celui de droite
            nodeLayer.append("circle")
                .style("fill", eyeColor)
                .attr("r", eyeRadius)
                .attr("cx", eyeRightMiddleX)
                .attr("cy", eyeRightMiddleY)
                .attr("class","eye");
        }
        //castSVG(svg, table,indexTableToBeDeleted,eyeOption)
}

let decreaseTablesDelete=0;
function castSVG(svg, table,indexTableToBeDeleted){
    if (optionDelete==true) {
        decreaseTablesDelete+=1
    }
    if (table.length==0 && optionDelete==true) {
        d3.select("#"+svg).selectAll("*").remove();

    }else {
        new svg_drag(svg, table,indexTableToBeDeleted)
    }
}


let modifInProgress=false;
svg_drag.prototype.modifyingElementDisplay=function(mouseMvt){
    modifInProgress=true;
    for(let i=this.table_positions.length-1;i>=0;i--){
        let val=this.table_positions[i];
        if(this.obj_json[val].movable==0){
            continue;
        }
        if(this.collision(val)){//collision :Lorsque le pointeur est sur un élément
            if(this.obj_json[val].movable!=1){
                break
            }else {
                //console.log(this.obj_json[val].id);
                if (this.svg.id=='frontConfiguration') {
                	suffix='';
            	}else if (this.svg.id=='backConfiguration') {
            		suffix='Back';
            	}

                document.getElementById('addObject'+suffix).style.display = 'none';
                document.getElementById('validation'+suffix).style.display = '';
                toShow(document.getElementsByClassName(this.obj_json[val].type + "Selected"+suffix))
                    //Affichage des valeurs de l'élémént
                    currentElement=this.obj_json[val]
                    switch (this.obj_json[val].type) {
                    case "rectangle"||"triangleRectangle"||"line" ||"triangleIsocele":
                        idHeight = this.obj_json[val].type +suffix+"Height";
                        idWidth = this.obj_json[val].type +suffix+"Width";
                        idColor = this.obj_json[val].type +suffix+"Color";
                        idRotation=this.obj_json[val].type +suffix+"Rotation";
                        document.getElementById(idHeight).value=this.obj_json[val].height*2;
                        document.getElementById(idWidth).value=this.obj_json[val].width*2;
                        document.getElementById(idColor).value=this.obj_json[val].color;
                        document.getElementById(idRotation).value=this.obj_json[val].rotation;
                        this.obj_json[val].movable= 1;
                        break;

                    case "ellipse":
                        idRadiusX=this.obj_json[val].type +suffix+"RadiusX";
                        idRadiusY=this.obj_json[val].type +suffix+"RadiusY";
                        idColor = this.obj_json[val].type +suffix+"Color";
                        idRotation=this.obj_json[val].type +suffix+"Rotation";
                        document.getElementById(idRadiusX).value=this.obj_json[val].radiusX*2;
                        document.getElementById(idRadiusY).value=this.obj_json[val].radiusY*2;
                        document.getElementById(idColor).value=this.obj_json[val].color;
                        this.obj_json[val].height=this.obj_json[val].radiusX;//, il faut une valeur height et width pour le traitement svg.
                        this.obj_json[val].width=this.obj_json[val].radiusY;
                        document.getElementById(idRotation).value=this.obj_json[val].rotation;
                        this.obj_json[val].movable= 1;
                        break;
                    case "picture":
                        idUrl=this.obj_json[val].type+suffix+"Download"
                        this.obj_json[val].url=document.getElementById(idUrl).value
                        idScall=this.obj_json[val].type +suffix+"Scall";
                        this.obj_json[val].height=50;
                        this.obj_json[val].width=50;
                        this.obj_json[val].scall=document.getElementById(idScall).value
                        idRotation=this.obj_json[val].type +suffix+"Rotation";
                        document.getElementById(idRotation).value=this.obj_json[val].rotation;
                        this.obj_json[val].movable= 1;
                        break;
                    case "circle":
                        idRadius=this.obj_json[val].type +suffix+"Radius";
                        idColor = this.obj_json[val].type +suffix+"Color";
                        document.getElementById(idRadius).value=this.obj_json[val].radius*2;
                        document.getElementById(idColor).value=this.obj_json[val].color;
                        this.obj_json[val].height=this.obj_json[val].radius;
                        this.obj_json[val].width=this.obj_json[val].radius;
                        this.obj_json[val].movable= 1;
                        break;
                    case "text":
                        idHeight = this.obj_json[val].type +suffix+"Height";
                        idText=this.obj_json[val].type +suffix+"Text";
                        idPolice=this.obj_json[val].type +suffix+"Police";
                        idBold=this.obj_json[val].type +suffix+"Bold";
                        idStyle=this.obj_json[val].type +suffix+"Style";
                        idRotation=this.obj_json[val].type +suffix+"Rotation";
                        idColor = this.obj_json[val].type +suffix+"Color";
                        document.getElementById(idStyle).value=this.obj_json[val].style;
                        document.getElementById(idHeight).value=this.obj_json[val].height*2;
                        this.obj_json[val].width=400;
                        document.getElementById(idText).value=this.obj_json[val].text;
                        //this.obj_json[val].height=this.obj_json[val].font_size; //+ ' Font-Weight:'+document.getElementById(idBold).value;
                        document.getElementById(idPolice).value=this.obj_json[val].police;
                        document.getElementById(idBold).value=this.obj_json[val].bold;
                        document.getElementById(idColor).value=this.obj_json[val].color;
                        document.getElementById(idRotation).value=this.obj_json[val].rotation;
                        this.obj_json[val].movable= 1;
                        break;

                    case "triangleEquilateral":
                        idWidth = this.obj_json[val].type +suffix+"Width";
                        idColor = this.obj_json[val].type +suffix+"Color";
                        idRotation=this.obj_json[val].type +suffix+"Rotation";
                        //this.obj_json[val].height= document.getElementById(idWidth).value/2 * Math.sqrt(3)/2;
                        document.getElementById(idWidth).value=this.obj_json[val].height*2 * Math.sqrt(3)/2;
                        document.getElementById(idWidth).value=this.obj_json[val].width*2;
                        this.obj_json[val].color= document.getElementById(idColor).value;
                        this.obj_json[val].rotation= document.getElementById(idRotation).value
                        this.obj_json[val].movable= 1;
                        break;
                    // case "polygon":
                    // 	//this.polygon(nodeLayer,element, svg)
                    // 	break;
                    // case "no_movable":
                    // 	this.texte(element, svg)
                    // 	break;
                    }
                //mouseMvt.preventDefault();
                break;
            }
        }
    }
}
