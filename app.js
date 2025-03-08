// Initialisation du bouton PayPal
paypal.Buttons({
    createOrder: function(data, actions) {
        return actions.order.create({
            purchase_units: [{
                amount: {
                    value: document.getElementById('total-price').innerText.replace('€', '')
                }
            }]
        });
    },
    onApprove: function(data, actions) {
        return actions.order.capture().then(function(details) {
            document.getElementById('result-message').innerText = 'Paiement réussi par ' + details.payer.name.given_name;
            alert("Paiement réussi !");
            window.location.href = "confirmation.html"; // Redirige vers une page de confirmation
        });
    },
    onError: function(err) {
        console.error(err);
        alert("Une erreur est survenue avec PayPal. Réessayez plus tard.");
    }
}).render('#paypal-button-container');

// Gestion du code promo
function applyPromo() {
    let promoCode = document.getElementById('promo-code').value;
    let priceElement = document.getElementById('total-price');
    let price = parseFloat(priceElement.innerText.replace('€', ''));

    if (promoCode === "REDUC10") {
        priceElement.innerText = (price * 0.9).toFixed(2) + "€"; // -10% de réduction
        alert("Code promo appliqué ! -10% de réduction");
    } else {
        alert("Code promo invalide !");
    }
}
console.log("PayPal script chargé !");
document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM chargé, initialisation de PayPal...");
});
if (typeof paypal === "undefined") {
    console.error("Le SDK PayPal ne s'est pas chargé correctement !");
} else {
    console.log("PayPal SDK chargé avec succès !");
}
document.addEventListener("DOMContentLoaded", function () {
    if (typeof paypal === "undefined") {
        console.error("Le SDK PayPal ne s'est pas chargé !");
        return;
    }

    paypal.Buttons({
        createOrder: function (data, actions) {
            return actions.order.create({
                purchase_units: [{
                    amount: { value: "10.00" }
                }]
            });
        },
        onApprove: function (data, actions) {
            return actions.order.capture().then(function (details) {
                alert("Paiement effectué avec succès par " + details.payer.name.given_name);
            });
        }
    }).render("#paypal-button-container");
});
// Liste des codes promos valides et leurs réductions
const promoCodes = {
    "PROMO10": 10, // 10% de réduction
    "OPTIMAX20": 20 // 20% de réduction
    "MEGAREDUCE": 30 // 30% de réduction
    "SUPERPROMO": 50 // 50% de réduction
};

let promoUsed = false; // Variable pour vérifier si un code promo a déjà été appliqué

document.getElementById("apply-promo").addEventListener("click", function() {
    if (promoUsed) {
        document.getElementById("promo-message").textContent = "❌ Un seul code promo est autorisé !";
        return;
    }

    let enteredCode = document.getElementById("promo-code").value.trim();
    
    if (promoCodes[enteredCode]) {
        let discount = promoCodes[enteredCode];
        document.getElementById("promo-message").textContent = `✅ Code promo appliqué : ${discount}% de réduction !`;
        promoUsed = true;

        // Désactiver le champ et le bouton après utilisation
        document.getElementById("promo-code").disabled = true;
        document.getElementById("apply-promo").disabled = true;
    } else {
        document.getElementById("promo-message").textContent = "❌ Code promo invalide.";
    }
});
