# JEGYZŐKÖNYV
## Webfejlesztés Beadandó Feladat

**Név:** [Saját Név]
**Neptun kód:** PSD1T8
**Dátum:** 2024.
**Téma:** Városi Központi Könyvtár Weboldala

---

## Tartalomjegyzék
1. [Feladat leírása](#feladat-leírása)
2. [Struktúra szerkezet](#struktúra-szerkezet)
3. [Felhasználói felület bemutatása](#felhasználói-felület-bemutatása)
4. [Rövid kód magyarázat](#rövid-kód-magyarázat)

---

## 1. Feladat leírása
A feladat egy komplett weboldal elkészítése volt egy választott témakörben (jelen esetben egy könyvtár), HTML5, CSS3, JavaScript és jQuery technológiák felhasználásával. A projekt célja a modern webfejlesztési eszközök gyakorlati alkalmazása, beleértve a szemantikus HTML szerkezetet, a reszponzív formázást, az interaktív szkripteket, az űrlapvalidációt, valamint az aszinkron adatbetöltést (AJAX) JSON forrásból.

**Főbb követelmények teljesítése:**
- Legalább 5 HTML oldal létrehozása.
- HTML5 szemantikus elemek (header, nav, main, section, article, footer) használata.
- Átfogó CSS formázás (ID, Class, Tag alapú), külső és inline stílusok.
- JavaScript és jQuery alapú interaktivitás (animációk, DOM manipuláció).
- Űrlapkezelés és validáció.
- JSON adatbázis (könyvek) betöltése AJAX segítségével.
- Videó lejátszó egyedi vezérlőkkel.

---

## 2. Struktúra szerkezet

A projekt mappaszerkezete a következő:

```
webbeadandoPSD1T8/
│
├── index.html          (Főoldal)
├── catalog.html        (Könyvkatalógus)
├── authors.html        (Szerzők)
├── membership.html     (Tagsági regisztráció)
├── video.html          (Videó segédlet)
├── about.html          (Rólunk / Információk)
│
├── css/
│   └── style.css       (Központi stíluslap)
│
├── js/
│   ├── main.js         (Általános szkriptek, animációk)
│   ├── catalog.js      (AJAX adatbetöltés, keresés)
│   ├── validation.js   (Űrlap ellenőrzés)
│   └── video.js        (Videó vezérlő logika)
│
├── data/
│   └── books.json      (Könyvadatbázis JSON formátumban)
│
├── images/             (Képek mappája)
│   ├── authors/        (Szerzők portréi)
│   └── video-poster.jpg
│
└── video/
    └── registration-tutorial.mp4 (Videó fájl)
```

---

## 3. Felhasználói felület bemutatása

A weboldal egységes, modern megjelenéssel rendelkezik, domináns színei a kék és a lila átmenetek, valamint a fehér háttér a tartalom kiemelésére. A navigáció minden oldalon azonos, a fejlécben található.

### Menüpontok:
- **Főoldal:** Általános bemutatkozás, szolgáltatások kártyás elrendezésben, dinamikusan betöltődő könyvajánló.
- **Katalógus:** Itt jelenik meg a könyvek listája táblázatos formában. A felhasználó kereshet cím vagy szerző alapján, és szűrhet kategóriák szerint.
- **Szerzők:** Kártyás elrendezésben mutatja be a kiemelt írókat képekkel és rövid életrajzzal.
- **Tagság:** Részletes regisztrációs űrlap. Tartalmaz szöveges mezőket, legördülő listát (város), dátumválasztót, csúszkát (slider) és egyéb interaktív elemeket.
- **Regisztráció segítség (Videó):** Egy beágyazott videólejátszó, amely bemutatja az űrlap kitöltését. Egyedi gombokkal (Lejátszás, Hangerő, Teljes képernyő) vezérelhető.
- **Rólunk:** Információs oldal táblázatos nyitvatartással, statisztikákkal és elérhetőségekkel.

### Interaktivitás:
- A menüpontok és gombok fölé húzva az egeret animációk (színváltás, mozgás) jelzik az aktivitást.
- Az oldalak tartalma "fade-in" effekttel töltődik be.
- Az űrlapmezők hibás kitöltés esetén piros keretet kapnak és hibaüzenet jelenik meg.

---

## 4. Rövid kód magyarázat

### HTML (index.html, stb.)
Minden oldal a `<!DOCTYPE html>` deklarációval kezdődik és `hu` nyelvi kóddal rendelkezik. A `<head>` részben kerülnek betöltésre a stíluslapok és a jQuery könyvtár. A tartalom szemantikus tagekre (`header`, `nav`, `main`, `section`, `footer`) tagolódik a könnyebb átláthatóság és szabványosság érdekében.

### CSS (style.css)
A stíluslap `linear-gradient` hátteret állít be az egész oldalnak. Flexbox (`display: flex`) és Grid (`display: grid`) elrendezéseket használ a reszponzivitás érdekében.
- **Formázások:** Külön stílusok vannak definiálva azonosítók (`#header`), osztályok (`.card`, `.button`) és HTML tagek (`table`, `input`) számára.
- **Reszponzivitás:** `@media` lekérdezések biztosítják, hogy mobil nézetben a menü és a kártyák elrendezése alkalmazkodjon a képernyőmérethez.

### JavaScript
- **main.js:** Ez a fájl felel az oldal általános működéséért. A `$(document).ready()` függvényen belül definiált eseménykezelők végzik a navigáció és az animációk (pl. `slideDown`, `fadeIn`) vezérlését. Itt történik a DOM manipuláció is, például új elemek létrehozása.
- **catalog.js:** AJAX hívást (`$.ajax`) valósít meg a `books.json` fájl beolvasására. Sikeres betöltés esetén egy ciklussal generálja le a HTML táblázat sorait (`<tr>`, `<td>`) a JSON objektumokból. Megvalósítja a kliens oldali szűrést és keresést is.
- **validation.js:** Az űrlap validációt végzi. Figyeli a `keyup` és `change` eseményeket, és regex (reguláris kifejezés) segítségével ellenőrzi az e-mail cím, telefonszám és egyéb mezők helyességét. Hiba esetén módosítja a CSS osztályokat (`.addClass('error')`).
- **video.js:** A HTML5 `<video>` elemet vezérli JavaScript segítségével, egyedi felhasználói felületet biztosítva a böngésző alapértelmezett vezérlője helyett.

### Adatbázis (books.json)
A könyvek adatait tároló JSON fájl. Egy gyökér `library` objektumot tartalmaz, amelyen belül a `books` tömb tárolja a könyv objektumokat. A struktúra támogatja a beágyazást (pl. `author` objektum a könyvön belül).

```json
{
  "library": {
    "name": "Városi Központi Könyvtár",
    "books": [
      {
        "id": 1,
        "title": "Egri csillagok",
        "author": {
          "firstName": "Gárdonyi",
          "lastName": "Géza"
        },
        ...
      }
    ]
  }
}
```
