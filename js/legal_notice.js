function initNotice() {
    docID('legal_notice-container').innerHTML = renderPrivacyPolice();
    // docID('privacy_policy-container').innerHTML = renderSummaryHTML();
    renderHeaderNav();
    renderSideNavHTML();

}

function renderPrivacyPolice() {
    return /*HTML*/ `
    <div class="legal_notice-container">
    <div class="top">
            <div class="headline">legal Notice</div>
            <div><img class="back-arrow-img" src="assets/img/arrow-left-line.svg" alt=""></div>
        </div>
        <div class="notice-text">
            <!-- <h1>Impressum</h1>

            <p>Gruppe 192<br />
                KanBan-Board<br />
                GoodCoding 113<br />
                90210 M&uuml;nchen</p>

            <p>Partnerschaftsregister: HRB 99369934329<br />
                Registergericht: Amtsgericht M&uuml;nchen</p>

            <h2>Kontakt</h2>
            <p>Telefon: +49 (0) 123 44 55 66<br />
                Telefax: +49 (0) 123 44 55 99<br />
                E-Mail: Join-Gruppe-192@gmail.com</p>

            <h2>Umsatzsteuer-ID</h2>
            <p>Umsatzsteuer-Identifikationsnummer gem&auml;&szlig; &sect; 27 a Umsatzsteuergesetz:<br />
                DE01894910</p>

            <h2>Wirtschafts&shy;identifikations&shy;nummer</h2>
            <p>242930&szlig;</p>

            <h2>Gewerbeanmeldung</h2>
            <p>Die Gewerbeerlaubnis nach &sect; 34c GewO wurde am 01.01.2015 von folgender Stelle erteilt: Ordnungsamt
                M&uuml;nchen.</p>

            <h2>Angaben zur Berufs&shy;haftpflicht&shy;versicherung</h2>
            <p><strong>Name und Sitz des Versicherers:</strong><br />
                192 Versicherung AG<br />
                GoodCoding 10<br />
                90210 M&uuml;nchen</p>
            <p><strong>Geltungsraum der Versicherung:</strong><br />Deutschland</p>

            <h2>Redaktionell verantwortlich</h2>
            <p>Gruppe 192<br />
                GoodCoding 110<br />
                90210 M&uuml;nchen</p>

            <h2>EU-Streitschlichtung</h2>
            <p>Die Europ&auml;ische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a
                    href="https://ec.europa.eu/consumers/odr/" target="_blank"
                    rel="noopener noreferrer">https://ec.europa.eu/consumers/odr/</a>.<br /> Unsere E-Mail-Adresse
                finden Sie oben im Impressum.</p>

            <h2>Verbraucher&shy;streit&shy;beilegung/Universal&shy;schlichtungs&shy;stelle</h2>
            <p>Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer
                Verbraucherschlichtungsstelle teilzunehmen.</p>

            <p>Quelle: <a href="https://www.e-recht24.de">eRecht24</a></p> -->

        </div>
</div>`;
}