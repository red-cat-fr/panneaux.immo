Deplacer les elements d'un canvas a la souris et cr�er des lien---------------------------------------------------------------
Url     : http://codes-sources.commentcamarche.net/source/100970-deplacer-les-elements-d-un-canvas-a-la-souris-et-creer-des-lienAuteur  : kazmaDate    : 07/04/2015
Licence :
=========

Ce document intitul� � Deplacer les elements d'un canvas a la souris et cr�er des lien � issu de CommentCaMarche
(codes-sources.commentcamarche.net) est mis � disposition sous les termes de
la licence Creative Commons. Vous pouvez copier, modifier des copies de cette
source, dans les conditions fix�es par la licence, tant que cette note
appara�t clairement.

Description :
=============

Comme son nom l'indique, la source sert a deplacer les elements d'un canvas (ima
ge texte rectangle et cercle) � la souris et permet de cr�er des lien vers d'aut
res pages par l'intermediaire d'un fichier de configuration json.
<br />
<br /
>Pour cette source, j'ai experiment� comment deplacer des elements : pour ce fai
re, j'utilise un fichier json qui au chargement de la page devient un array d'ob
jet contenant la configuration de chaques elements et, � chaque deplacement, on 
reatualise le array en modifiant la position de l'element deplac� et on reactuli
se le canvas toujours en lisant les donn� du array de l'ojet concern�.
<br />La
 detection de chaques elements se fait en utilisant une fonction de detection de
s bords comme celle utilis�e dans les colisions pour les jeux 2d.
<br />Il y a 
aussi un array qui permet de connaitre la position au niveau de la pronfondeur d
es elements afin qu'un element deplac� se retrouve au premier plan et que ceux p
recedement deplac� concervent leurs place.
<br />
<br />j'aurai pu appronfondi
r la source mais j'ai prefer� m'arreter car je ne sais pas si elle peut vraiment
 etre utile. En tout cas je pense q'elle peut etre une bonne base de depart pour
 se cr�er son propre systeme de deplacement dans un canvas.
<br />
<br /><a hr
ef='http://scriptevol.free.fr/cvs_drag/canvas_drag.html' target='_blank'>page te
ste</a>
<br />
<br />mise en place
<br />
<br />pour chaque canvas il suffit
 de cree une instance en precisant le nom du canvas et le nom de l'objet json
<
br />
<br /><pre class="code" data-mode="js">//////////////creation des instanc
es////////////////

function lancer(){
    
    new kvs_drag("zone",cvs_elem);  
  //mettre le nom du canvas cible et le nom de l'objet json//
    new kvs_drag( 
"zone2",cvs_elem2);    //mettre le nom du canvas cible et le nom de l'objet json
//
}

window.addEventListener("load",lancer, false);

//////////////////////////
////////////////////////</pre>
