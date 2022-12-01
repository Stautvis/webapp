## T120B165-saityno-taikomuju-programu-projektavimas

## Projekto pavadinimas - Paslaugų platforma

## Sprendžiamo uždavinio aprašymas

### Sistemos paskirtis

Projekto tikslas - sukurti paslaugų tiekimo / naudojimo platformą, kuri leidžią:

- verslui reklamuoti savo teikiamas paslaugas, valdyti užsakymus.
- vartotojui ieškoti jį dominančių paslaugų, užsakyti jas bei palikti atsiliepimus

Verslas, norintis naudotis šia platforma ir reklamuoti savo teikiamas paslaugas turi susikurti verslo profilį, užregistruoti savo teikiamas paslaugas užpildant paslaugos registravimo formą. Po administratoriaus patvirtinimo, paslauga tampa viešai prieinama ir klientai/vartotojai gali peržiūrėti paslaugos informaciją (įkainius, aprašymą, atsiliepimus, užimtumą) bei atlikti rezervaciją.

### Funkciniai reikalavimai

Neregistruotas sistemos vartotojas galės:

1. Peržiūrėti visas viešai prieinamas (patvirtintas) paslaugas.
2. Peržiūrėti paslaugų tiekėjus.
3. Sukurti naują paskyrą/prisijungti prie esamos paskyros.

Administratorius galės:

1. Patvirtinti/pašalinti paslaugų tiekėjus.
2. Patvirtinti/pašalinti vartotojus (klientus).
3. Patvirtinti/pašalinti paslaugas.

Paslaugų tiekėjas galės:

1. Sukurti/redaguoti paslaugą.
2. Pridėti/šalinti darbuotojus darbuotojus.
3. Redaguoti savo paslaugų profilį.
4. Peržiūrėti ir valdyti savo užsakymus ir dienotvarkę.

Klientas galės:

1. Užsakyti paslaugą.
2. Palikti atsiliepimą apie užsakytą paslaugą.
3. Peržiūrėti ir valdyti savo užsakymus.
4. Sukurti savo paslaugų tiekėjo profilį.

## Pasirinktų technologijų aprašymas

- Kliento pusei (angl. front-end) programuoti bus naudojamas `SvelteKit` karkasas.
- Serverio pusei (angl. back-end) programuoti bus naudojamas `.NET6 API` karkasas.
- Informacijos saugojimui bus naudojama `MariaDB` reliacinė duomenų bazė.
- Serverio bendravimui su duomenų baze bus naudojamas `Entitiy Framework` karkasas.
- Žinučių apsikeitimui tarp serverio ir kliento dalies bus naudojama `REST API`
