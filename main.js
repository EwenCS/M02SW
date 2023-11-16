function Ecrire()
{   var valeur=document.getElementById("edit").value;
    var client = new XMLHttpRequest();
    client.open("POST","client_udp.php", false);
    donneesJson='{"univers":"0","adresse":"1","valeur":":'+valeur+'"}';
    client.send(donneesJson);
}

function TrameValide(){
    console.log("Verification de la trame");
}

function TrameValide(){
    var TrameHexa=document.getElementById('edit').value;

    if(TrameHexa.length%2 == 0){
        document.getElementById('longueur').className="vert";
    }
    if(TrameHexa.length%2 != 0){
        document.getElementById('longueur').className="rouge";
    }

    for(var i=0;i<TrameHexa.length;i++){
        if(TrameHexa[i]>'F'){
            document.getElementById('Hexa').className="rouge";
            break;
        }else{
            document.getElementById('Hexa').className="vert"; 
        }
    }
}
    var s1=document.getElementById('scrollbar1');

    s1.addEventListener('change', function (){
        var numerocanal=1;
        var trame=document.getElementById('edit').value;
        var entier = Math.abs(s1.value).toString(16).toUpperCase();
        if(s1.value<16) entier="0"+entier;
        var indice=(numerocanal-1)*2;
        trame=trame.substring(0,indice)+entier+trame.substring(indice+2,trame.length);
        document.getElementById('edit').value=trame;


    }); 


    var s2=document.getElementById('scrollbar2');

    s2.addEventListener('change', function (){
        var numerocanal=2;
        var trame=document.getElementById('edit').value;
        var entier = Math.abs(s2.value).toString(16).toUpperCase();
        if(s2.value<16) entier="0"+entier;
        var indice=(numerocanal-1)*2;
        trame=trame.substring(0,indice)+entier+trame.substring(indice+2,trame.length);
        document.getElementById('edit').value=trame;


    }); 

    var s3=document.getElementById('scrollbar3');

    s3.addEventListener('change', function (){
        var numerocanal=3;
        var trame=document.getElementById('edit').value;
        var entier = Math.abs(s3.value).toString(16).toUpperCase();
        if(s3.value<16) entier="0"+entier;
        var indice=(numerocanal-1)*2;
        trame=trame.substring(0,indice)+entier+trame.substring(indice+2,trame.length);
        document.getElementById('edit').value=trame;


    }); 

    var s4=document.getElementById('scrollbar4');

    s4.addEventListener('change', function (){
        var numerocanal=4;
        var trame=document.getElementById('edit').value;
        var entier = Math.abs(s4.value).toString(16).toUpperCase();
        if(s4.value<16) entier="0"+entier;
        var indice=(numerocanal-1)*2;
        trame=trame.substring(0,indice)+entier+trame.substring(indice+2,trame.length);
        document.getElementById('edit').value=trame;

 
    }); 

    var s5=document.getElementById('scrollbar5');

    s5.addEventListener('change', function (){
        var numerocanal=5;
        var trame=document.getElementById('edit').value;
        var entier = Math.abs(s5.value).toString(16).toUpperCase();
        if(s5.value<16) entier="0"+entier;
        var indice=(numerocanal-1)*2;
        trame=trame.substring(0,indice)+entier+trame.substring(indice+2,trame.length);
        document.getElementById('edit').value=trame;


    }); 
    
    var s6=document.getElementById('scrollbar6');

    s6.addEventListener('change', function (){
        var numerocanal=6;
        var trame=document.getElementById('edit').value;
        var entier = Math.abs(s6.value).toString(16).toUpperCase();
        if(s6.value<16) entier="0"+entier;
        var indice=(numerocanal-1)*2;
        trame=trame.substring(0,indice)+entier+trame.substring(indice+2,trame.length);
        document.getElementById('edit').value=trame;


    }); 

    function fullON(){
        document.getElementById("scrollbar1").value = 255;
        document.getElementById("edit").value = "FFFFFFFFFFFF";

        document.getElementById("scrollbar2").value = 255;
        document.getElementById("edit").value = "FFFFFFFFFFFF";

        document.getElementById("scrollbar3").value = 255;
        document.getElementById("edit").value = "FFFFFFFFFFFF";

        document.getElementById("scrollbar4").value = 255;
        document.getElementById("edit").value = "FFFFFFFFFFFF";

        document.getElementById("scrollbar5").value = 255;
        document.getElementById("edit").value = "FFFFFFFFFFFF";

        document.getElementById("scrollbar6").value = 255;
        document.getElementById("edit").value = "FFFFFFFFFFFF";


       
    }
    function fullOFF(){
        document.getElementById("scrollbar1").value = 0;
        document.getElementById("edit").value = "000000000000";

        document.getElementById("scrollbar2").value = 0;
        document.getElementById("edit").value = "000000000000";

        document.getElementById("scrollbar3").value = 0;
        document.getElementById("edit").value = "000000000000";

        document.getElementById("scrollbar4").value = 0;
        document.getElementById("edit").value = "000000000000";

        document.getElementById("scrollbar5").value = 0;
        document.getElementById("edit").value = "000000000000";

        document.getElementById("scrollbar6").value = 0;
        document.getElementById("edit").value = "000000000000";

      
    
     }

     function aleatoire(){
        var event = new Event ('change');
        s1.value=(Math.random()*255);
        s1.dispatchEvent(event);
        s2.value=(Math.random()*255);
        s2.dispatchEvent(event);
        s3.value=(Math.random()*255);
        s3.dispatchEvent(event);
        s4.value=(Math.random()*255);
        s4.dispatchEvent(event);
        s5.value=(Math.random()*255);
        s5.dispatchEvent(event);
        s6.value=(Math.random()*255);
        s6.dispatchEvent(event);
      

     }

     function AES_encryptage()
{
    var key = CryptoJS.enc.Hex.parse("0123456789abcdef0123456789abcdef");

    var iv = CryptoJS.enc.Hex.parse("abcdef9876543210abcdef9876543210");
    var texte_encryte=CryptoJS.AES.encrypt(document.getElementById("edit").value, key, {iv:iv});
    //document.getElementById("letexteAES").innerHTML = texte_encrypte;
    encrypted= texte_encryte.ciphertext.toString(CryptoJS.enc.Base64);
    var xh = new XMLHttpRequest();
    xh.onreadystatechange = function () {
        if (xh.readyState === 4 && xh.status === 200) {
            console.debug("REPONSE : + xh.responseText");
        }
    }
    xh.open("POST", "decrypt_in_php.php", true);
    xh.setRequestHeader("Content-type", "application/json");
    xh.send('{"encrypted":"'+encrypted+'"}');
}
