
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
      echo"Connect OK";
  };
//pour la simulation, je part du fait de recevoir un email avec le N° de commande
$orderListing="SELECT * FROM `svg_order` WHERE 1";
if ($result = mysqli_query($con, $orderListing)) {
    $idnr=0;
    while($val = mysqli_fetch_array($result)){
    $champ = $val["order_number"];
        $id='button'+$idnr;
        echo "<br><input type='submit' id='$id' name='submit' value='$champ'  onclick='dowloadSVG(this.value, this.id)' ><br>";
        $idnr+=1;
        }
} else {
    echo "Error: " . $orderListing . "<br>" . mysqli_error($con);
}

?>
<script type='text/javascript' >

 function dowloadSVG(ordNr, id){
    let data=''
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(event) {
    if (this.readyState === XMLHttpRequest.DONE) {
        if (this.status === 200) {
            //console.log("Réponse reçu: %s", this.responseText);
        } else {
            //console.log("Status de la réponse: %d (%s)", this.status, this.statusText);
        }
    }
};

    xhr.open("GET", "extractSVG.php"+'?'+ordNr, true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xhr.send(ordNr);
 }

</script>;

<?php

if(isset($_POST["submit"])) {
        echo "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
 };

mysqli_close($con);

?>
