<?php
$type_requete = $_SERVER["REQUEST_METHOD"];
if($type_requete == "POST")
{	 $donneesRecues_json=file_get_contents("php://input");
	$donnees=json_decode($donneesRecues_json,true);

	$sock = socket_create (AF_INET, SOCK_DGRAM, 0 );//
    if($sock!=null)
    {   echo '<p>Creation de la socket : OK</p>';
        //echo '<p>Socket créée : '.$sock.'</p>';
		$trameEnttec=array();
		$trameEnttec[0]=0x41;$trameEnttec[1]=0x72;$trameEnttec[2]=0x74;$trameEnttec[3]=0x2d;
		$trameEnttec[4]=0x4e;$trameEnttec[5]=0x65;$trameEnttec[6]=0x74;$trameEnttec[7]=0x00;
		$trameEnttec[8]=0x00;$trameEnttec[9]=0x50;$trameEnttec[10]=0x00;$trameEnttec[11]=0x0e;
		$trameEnttec[12]=0x00;$trameEnttec[13]=0x00;
		$trameEnttec[14]=$donnees['univers']; //univers
		$trameEnttec[15]=0x00;$trameEnttec[16]=0x02;$trameEnttec[17]=0x00;
		for($i=18;$i<530;$i++) $trameEnttec[$i]=0;
		
		$adDMX=$donnees['adresse'];

		$trameEnttec[18+$adDMX-1]=hexdec(substr($donnees['valeur'],0,2));
		$trameEnttec[19+$adDMX-1]=hexdec(substr($donnees['valeur'],2,2));
		$trameEnttec[20+$adDMX-1]=hexdec(substr($donnees['valeur'],4,2));
		$trameEnttec[21+$adDMX-1]=hexdec(substr($donnees['valeur'],6,2));
		$trameEnttec[22+$adDMX-1]=hexdec(substr($donnees['valeur'],10,2));
		$trameEnttec[23+$adDMX-1]=hexdec(substr($donnees['valeur'],12,2));
		$trameEnttec[24+$adDMX-1]=hexdec(substr($donnees['valeur'],14,2));
		$trameEnttec[25+$adDMX-1]=hexdec(substr($donnees['valeur'],15,2));
		$trameEnttec[26+$adDMX-1]=hexdec(substr($donnees['valeur'],16,2));
		$trameEnttec[27+$adDMX-1]=hexdec(substr($donnees['valeur'],18,2));
		
		$chaine='';
		foreach($trameEnttec as $valeur) {
			$chaine.= chr($valeur);
		}

		echo '<p>Message a envoyé : '.$donnees['valeur'].'</p>';
		echo '<p>Longueur du message a envoyé : '.strlen($donnees['valeur']).'</p>';
		$nbOctetsEmis = socket_sendto($sock, $chaine, strlen($chaine), 0, "172.20.21.183", 6454);
		//$nbOctetsEmis = socket_sendto($sock, $chaine, strlen($chaine), 0, "192.168.1.36", 6454);
        echo '<p>nombre d octets emis : '.$nbOctetsEmis.'</p>';
        //fclose($sock);
    }
}
?>