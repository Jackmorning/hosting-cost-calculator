const translations = {
    it: {
        title: "Calcolatore Hosting",
        lblCurrency: "Valuta:",
        lblDuration: "Durata Totale:",
        lblPromoPrice: "Prezzo Promo:",
        lblPromoMonths: "Mesi in Promo:",
        lblRenewalPrice: "Prezzo Rinnovo:",
        btn: "Calcola Costo Reale",
        resDefault: "Inserisci i dati e calcola",
        total: "Costo Totale",
        average: "Media mensile",
        error: "Errore: Mesi promo superiori alla durata!",
        lnk: "Confronta Migliori Hosting"
    },
    en: {
        title: "Hosting Calculator",
        lblCurrency: "Currency:",
        lblDuration: "Total Duration:",
        lblPromoPrice: "Promo Price:",
        lblPromoMonths: "Promo Months:",
        lblRenewalPrice: "Renewal Price:",
        btn: "Calculate Real Cost",
        resDefault: "Enter data and calculate",
        total: "Total Cost",
        average: "Monthly average",
        error: "Error: Promo months exceed duration!",
        lnk: "Compare Best Hosting"
    }
};

const langSelect = document.getElementById('lang');

function updateLanguage(lang) {
    const t = translations[lang];
    document.getElementById('title').innerText = t.title;
    document.getElementById('lblCurrency').innerText = t.lblCurrency;
    document.getElementById('lblDuration').innerText = t.lblDuration;
    document.getElementById('lblPromoPrice').innerText = t.lblPromoPrice;
    document.getElementById('lblPromoMonths').innerText = t.lblPromoMonths;
    document.getElementById('lblRenewalPrice').innerText = t.lblRenewalPrice;
    document.getElementById('calculateBtn').innerText = t.btn;
    document.getElementById('result').innerText = t.resDefault;
    document.getElementById('lnkReviews').innerText = t.lnk;
}

langSelect.addEventListener('change', (e) => updateLanguage(e.target.value));

document.getElementById('calculateBtn').addEventListener('click', () => {
    const lang = langSelect.value;
    const t = translations[lang];
    const promoPrice = parseFloat(document.getElementById('promoPrice').value);
    const promoMonths = parseInt(document.getElementById('promoMonths').value);
    const renewalPrice = parseFloat(document.getElementById('renewalPrice').value);
    const totalDuration = parseInt(document.getElementById('duration').value);
    const currency = document.getElementById('currency').value;
    const resultDiv = document.getElementById('result');

    if (isNaN(promoPrice) || isNaN(promoMonths) || isNaN(renewalPrice)) {
        resultDiv.innerText = lang === 'it' ? "Inserisci valori validi." : "Enter valid values.";
        return;
    }

    if (promoMonths > totalDuration) {
        resultDiv.innerText = t.error;
        resultDiv.style.color = "red";
        return;
    }

    resultDiv.style.color = "#004d40";
    const remainingMonths = totalDuration - promoMonths;
    const totalCost = (promoPrice * promoMonths) + (renewalPrice * remainingMonths);
    const monthlyAverage = totalCost / totalDuration;

    resultDiv.innerHTML = `${t.total} (${totalDuration} mesi): ${totalCost.toFixed(2)}${currency}<br>` +
                         `<span style="color: #00796b; font-size: 0.9em;">${t.average}: ${monthlyAverage.toFixed(2)}${currency}</span>`;
});

// Avvio in Italiano
updateLanguage('it');