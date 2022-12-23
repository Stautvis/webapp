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

## Naudotojo sąsajos projektas

<img width="1280" alt="Screenshot 2022-12-23 at 19 27 40" src="https://user-images.githubusercontent.com/23562379/209379783-edde8df0-6613-407f-9c05-8382af58ff76.png">
<img width="1280" alt="Screenshot 2022-12-23 at 19 27 54" src="https://user-images.githubusercontent.com/23562379/209379825-a37160f1-6981-4823-88cd-abec319baffd.png">
<img width="1280" alt="Screenshot 2022-12-23 at 19 39 23" src="https://user-images.githubusercontent.com/23562379/209379849-fbd0baca-8f62-48b3-bd88-a6f48a285062.png">
<img width="1280" alt="Screenshot 2022-12-23 at 19 39 43" src="https://user-images.githubusercontent.com/23562379/209379874-81d48c5d-b4be-4e83-9d4e-ba910f5bf21d.png">


## API specifikacija

<!-------------------------------->

### `GET /company` - gražina visas sukurtas įmones.

- Atsakymo kodai: 200, 404, 500

- Parametrai: nėra

<!-------------------------------->

### `GET /company/{companyId}` - gražina konkrečia sukurtas įmonę.

- Atsakymo kodai: 200, 404, 500

- Parametrai:
  - `companyId` - įmonės ID.

<!-------------------------------->

### `POST /company` - sukuria naują įmonę (tik registruotiems vartotojams)

- Atsakymo kodai: 201, 401, 404, 500

- Parametrai:

  | Name             | Type   | Example                                    |
  | ---------------- | ------ | ------------------------------------------ |
  | title            | string | Boulingas                                  |
  | image            | string | http://pexels-photo-6605345.jpeg           |
  | shortDescription | string | Tai yra pavyzdinė boulingo įmonė.          |
  | description      | string | Tai yra ilgesnis aprašymas apie šią įmonę. |

  <!-------------------------------->

### `PUT /company/{companyId}` - atnaujina įmonę (tik įmonės valdytojams arba sistemos administratoriams)

- Atsakymo kodai: 200, 401, 403, 404, 500

- Parametrai:

  - `companyId` - įmonės ID.

  | Name             | Type   | Example                                    |
  | ---------------- | ------ | ------------------------------------------ |
  | title            | string | Boulingas                                  |
  | image            | string | http://pexels-photo-6605345.jpeg           |
  | shortDescription | string | Tai yra pavyzdinė boulingo įmonė.          |
  | description      | string | Tai yra ilgesnis aprašymas apie šią įmonę. |

<!-------------------------------->

### `DELETE /company/{companyId}` - ištrina įmonę (tik įmonės valdytojams arba sistemos administratoriams)

- Atsakymo kodai: 200, 401, 403, 404, 500

- Parametrai:

  - `companyId` - įmonės ID.

<!-------------------------------->

### `GET /company/{companyId}/service` - gražina visas sukurtas paslaugas.

- Atsakymo kodai: 200, 404, 500

- Parametrai:
  - `companyId` - įmonės ID.

<!-------------------------------->

### `GET /company/{companyId}/service/{serviceId}` - gražina konkrečia sukurtą paslaugą.

- Atsakymo kodai: 200, 404, 500

- Parametrai:
  - `companyId` - įmonės ID.
  - `serviceId` - paslaugos ID.

<!-------------------------------->

### `POST /company/{companyId}/service/{serviceId}` - sukuria naują paslaugą (tik įmonės darbuotojams)

- Atsakymo kodai: 201, 401, 404, 500

- Parametrai:

  - `companyId` - įmonės ID.
  - `serviceId` - paslaugos ID.

  | Name             | Type   | Example                                       |
  | ---------------- | ------ | --------------------------------------------- |
  | title            | string | Boulingas                                     |
  | image            | string | http://pexels-photo-6605345.jpeg              |
  | shortDescription | string | Tai yra pavyzdinė boulingo įmonė.             |
  | description      | string | Tai yra ilgesnis aprašymas apie šią paslaugą. |

  <!-------------------------------->

### `PUT /company/{companyId}/service/{serviceId}` - atnaujina paslaugą (tik įmonės valdytojams arba sistemos administratoriams)

- Atsakymo kodai: 200, 401, 403, 404, 500

- Parametrai:

  - `companyId` - įmonės ID.
  - `serviceId` - paslaugos ID.

  | Name             | Type   | Example                                       |
  | ---------------- | ------ | --------------------------------------------- |
  | title            | string | Boulingas                                     |
  | image            | string | http://pexels-photo-6605345.jpeg              |
  | shortDescription | string | Tai yra pavyzdinė boulingo įmonė.             |
  | description      | string | Tai yra ilgesnis aprašymas apie šią paslaugą. |

<!-------------------------------->

### `DELETE /company/{companyId}/service/{serviceId}` - ištrina paslaugą (tik įmonės valdytojams arba sistemos administratoriams)

- Atsakymo kodai: 200, 401, 403, 404, 500

- Parametrai:

  - `companyId` - įmonės ID.
  - `serviceId` - paslaugos ID.

<!-------------------------------->

### `GET /company/{companyId}/service/{serviceId}/review` - gražina visus sukurtas atsiliepimus.

- Atsakymo kodai: 200, 404, 500

- Parametrai:

  - `companyId` - įmonės ID.
  - `serviceId` - paslaugos ID.

<!-------------------------------->

### `POST /company/{companyId}/service/{serviceId}/review/{reviewId}` - sukuria naują atsiliepimą (tik registruotiems vartotojams)

- Atsakymo kodai: 201, 401, 404, 500

- Parametrai:

  - `companyId` - įmonės ID.
  - `serviceId` - paslaugos ID.
  - `reviewId` - atsiliepimo ID.

  | Name    | Type   | Example       |
  | ------- | ------ | ------------- |
  | message | string | Gera paslauga |
  | rating  | int    | 5             |

    <!-------------------------------->

### `PUT /company/{companyId}/service/{serviceId}/review/{reviewId}` - atnaujina atsiliepimą (tik autoriui arba sistemos administratoriams)

- Atsakymo kodai: 200, 401, 403, 404, 500

- Parametrai:

  - `companyId` - įmonės ID.
  - `serviceId` - paslaugos ID.
  - `reviewId` - atsiliepimo ID.

  | Name    | Type   | Example       |
  | ------- | ------ | ------------- |
  | message | string | Gera paslauga |
  | rating  | int    | 5             |

<!-------------------------------->

### `DELETE /company/{companyId}/service/{serviceId}/review/{reviewId}` - ištrina atsiliepimą (tik autoriui arba sistemos administratoriams)

- Atsakymo kodai: 200, 401, 403, 404, 500

- Parametrai:

  - `companyId` - įmonės ID.
  - `serviceId` - paslaugos ID.
  - `reviewId` - atsiliepimo ID.

## Išvados

Nors ne visi pradžioje išsikelti tikslai įvykdyti, vis dėl to pavyko įgyvendinti paprastą internetinį puslapį, kuriame galima sukurti vartotojus, prisijungti, valdyti savo sukurtas įmonęs ir paslaugas. Tai pat, susipažinome su JWT vartotojų autentifikavimo įrankiu.
