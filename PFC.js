// On recupere tout les elements dont on aura besoin avec le Id
let resetBtn = document.getElementById("reset");
let scoreJoueur = document.getElementById("score-joueur");
let scoreOrdinateur = document.getElementById("score-ordinateur");

// On récupere les elements avec leur classe
// Ici, on va recuperer une NodeList et on aimerais faire un ForEach sur tous les elements qu'on va recuperer
// On ajoute les crochets pour le transformer en tableau
let btnJoueur = [...document.getElementsByClassName("btn-joueur")];

// On recupere les autres boutons specifique a l'ordi
let opierreBtn = document.getElementById("opierre");
let ofeuilleBtn = document.getElementById("ofeuille");
let ociseauxBtn = document.getElementById("ociseaux");

let message = document.getElementById("message");

let nextBtn = document.getElementById("next");

// Dans la constante, on va pouvoir recuperer l'evenement des qu'il s'est produit
// Ce qu'il y a a l'interieur va nous permettre de selectionner l'element qui a été cliquer
// Target permet de cibler l'element qui a été cliqué
// On utilise closest pour recuperer seulement la div ou il y a l'Id pour savoir sur quel bouton on a appuyé
// De plus, on utilise closest pour dire que peut importe ou on clique, on veut la div la plus proche qui a le selecteur
const jouerManche = (e) => {
    let choix = e.target.closest(".btn-joueur")
    
    // On veut mettre en surbrillance le bouton des qu'on clique dessus en changeant de style
    // Pour commencer, on va les desactiver au click
    // Ensuite, on va enlever les EventListener pour ne plus pouvoir cliquer sur les boutons quand on aura cliquer sur un seul
    btnJoueur.forEach(btn => {
        btn.classList.add("desactivated");
        btn.removeEventListener("click", jouerManche);
    })

    // Pour montrer qu'on a bien choisi le bouton, on va enlever la class Desactivated pour en ajouter une autre
    choix.classList.remove("desactivated");
    choix.classList.add("active");

    // On veut recuperer la valeur du bouton qu'on a choisi, le Id
    let choixJoueur = choix.id;

    // On va créer une autre fonction pour que l'ordinateur fasse un choix lui aussi 
let choixOrdi = faireChoixOrdinateur();

// Dans cette fonction, on va comparer les deux choix afin de voir qui a gagner
verifierGagnant(choixJoueur, choixOrdi);

// Maintenant qu'on a fini un tour, on va afficher le bouton "Tour suivant"
// Comme il etait caché avec le CSS avec visibility: hidden, on va changer le style
nextBtn.style.visibility= "visible"
};

const PIERRE = "pierre";
const FEUILLE = "feuille";
const CISEAUX = "ciseaux";

// On va implemanter une logique avec un nombre aléatoire
// En JS, on utilise des nombre pour faire de l'aléatoire
const faireChoixOrdinateur = () => {
    // 0 = Pierre
    // 1 = Feuille
    // 2 = Ciseaux

    // On va générer un nombre aleatoire
    // Math.random crée un nombre aléatoire compris entre 0 inclu et 1 exclu
    // On utilise Math.floor pour arrondir a la valeur entiere la plus basse
    // On multiplie par 3 pour avoir une valeur comprise entre 0 et 2
    let nbAleatoire = Math.floor(Math.random() * 3);

    // On ajoute une classe en fonction du nombre qu'on a trouvé
    // On va retourner la valeur de ce qu'on a choisi car on aimerai bien recuperer la valeur en texte en appelant la fonction faireChoixOrdinateur()
    switch(nbAleatoire){
        case 0 :
            opierreBtn.classList.add("active");
            return PIERRE;
        case 1 : 
            ofeuilleBtn.classList.add("active");
            return FEUILLE;
        default :
            ociseauxBtn.classList.add("active");
            return CISEAUX;
        
    }
};

const verifierGagnant = (choixJoueur, choixOrdi) => {
    if(choixJoueur == choixOrdi) {
        message.textContent = "Egalité !";
        return;
    }

    if(choixJoueur == PIERRE){
        if(choixOrdi == FEUILLE){
            return victoireOrdinateur();
        } else if (choixOrdi == CISEAUX){
            return victoireJoueur();
        }
    }

    if(choixJoueur == CISEAUX){
        if(choixOrdi == FEUILLE){
            return victoireJoueur();
        } else if (choixOrdi == PIERRE){
            return victoireOrdinateur();
        }   
    }

    if(choixJoueur == FEUILLE){
        if(choixOrdi == CISEAUX){
            return victoireOrdinateur();
        } else if (choixOrdi == PIERRE){
            return victoireJoueur();
        }   
    }
};

// On crée une fonction pour la victoire de l'Ordinateur afin de la reutiliser plusieurs fois
// On recupere la variable score qu'on avait deja recupérer au debut
const victoireOrdinateur = () => {
    message.textContent = "Tu as perdu !";
    scoreOrdinateur.textContent++;
};

// On fait de meme pour la victoire du joueur
const victoireJoueur = () => {
    message.textContent = "Tu as gagné !";
    scoreJoueur.textContent++;
};

// On va commencer par enlever toute les classes du joueur
// On utilise ForEach pour dire chaque bouton
const preparerNouvelleManche = () => {
    btnJoueur.forEach((btn => {
        btn.classList.remove("desactivated");
        btn.classList.remove("active");

// On va remettre les EventListener pour pouvoir rejouer
// Au click du joueur, on appelle la fonction jouerManche
    btn.addEventListener("click", jouerManche);
    }));

    // On va recacher le bouton Tour suivant
    nextBtn.style.visibility = "hidden"


// On va remettre les differents boutons de l'ordinateur
    opierreBtn.classList.remove("active");
    ofeuilleBtn.classList.remove("active");
    ociseauxBtn.classList.remove("active");

    message.textContent = "A vous de jouer !";
}





// On veut preparer une nouvelle manche au click
nextBtn.addEventListener("click", preparerNouvelleManche);

// On veut qu'il se passe quelque chose quand on va appuyer sur un des boutons du joueur
// On ajoute l'ecoute d'un evenement, on veut qu'il se passe quelque chose au click
btnJoueur.forEach(btn => btn.addEventListener("click", jouerManche));

resetBtn.addEventListener("click", () => {
    scoreJoueur.textContent = 0;
    scoreOrdinateur.textContent = 0;

    preparerNouvelleManche();
})