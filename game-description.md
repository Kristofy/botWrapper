# Planet War

## Játékszabályok

Ebben a játékban bolygók irányításáért versenyeznek a játékosok.
A cél, hogy csapatok gyűjtésével és azok okos mozgatásával minden bolygót elfoglaljunk.
A bolygókon kezdetben bizonyos számú semleges csapat állomásozik.
A játékosok egy-egy anyabolygóról indulnak.

A játékosok minden körben elindíthatják a rendelkezésre álló egységek egy részét a többi bolygó felé.
Az elküldött egységek ezután több körön keresztül utaznak a cél felé.
Ezalatt nem irányíthatók és nem lépnek interakcióba a többi utazó egységgel.
Ha megérkeznek egy saját bolygóra, akkor az egységek száma hozzáadódik a már ott lévőkhöz.
Ha ellenséges bolygóra érnek, akkor a bolygó annak az irányítása alá kerül, akinek a legtöbb egysége van, és az egységek száma a második legnagyobb csapatmérettel csökken.

### Példa

1. Ha piros 5 egységgel van jelen, és kék 3-al érkezik, akkor piros megtartja a bolygót 2 egységgel.
2. Ha piros 5 egységgel van jelen, kék 4, zöld pedig 8 egységgel egyszerre érkeznek meg, akkor 3-an harcolnak és zöld lesz a bolygó tulajdonosa 8-5=3 egységgel.

Döntetlen esetén a bolygó lakatlan lesz és semlegessé válik.
A játékosok által birtokolt bolygók bizonyos gyakorisággal új egységet hoznak létre.
A termelés sebességét a bolygó hatékonysága határozza meg, mely a játék során nem változik.
Semleges bolygók nem hoznak létre új egységet.
Figyelem, ha az összes egységet elküldöd egy bolygóról, akkor elveszted felette az irányítást, és az nem termel tovább.

A bolygó hatékonyságát úgy fejezzük ki, hogy milyen gyakran jön létre rajta új egység.
Ha például a hatékonyság 4, akkor a birtokos minden negyedik körben (tick-ben) kap új egységet.
A termelés számlálója újraindul, ha a bolygó tulajdonosa megváltozik.

Egy játékos kiesik, ha már nincs több egysége a pályán.
A játék akkor ér véget, ha csak egy játékos marad, vagy letelik a játék elején megadott maximális kör szám.

Az egységeket programmal fogjátok tudni irányítani, amit alább részletezünk.
A programok egymás ellen fognak játszani.
Az egyszerűség kedvéért körökre osztjuk a játékot, melyek között fix mennyiségű idő telik el.
A program minden kör elején megkapja az aktuális játékállapotot, majd vissza kell küldenie, mit szeretne lépni.
Ezután a szerver kiszámolja, mi fog történni az akciók hatására.

## Kommunikációs protokoll

A standard inputról kell olvasni, és standard outputra írni (azaz pl. cin és cout).
Fontos, hogy mindig megfelelő formátumban írjunk ki, azaz egy sorban szóközzel elválasztva, ahol kell.
Az is fontos, hogy használjatok 'endl'-t vagy flush-oljátok mindig az output-ot.

### Kezdeti üzenetváltás

Bemet: `"START"`\
Kimenet: `"OK"`

A játék megkezdése előtt kaptok egy üzenetet a szervertől, amit ki kell olvasnotok, majd válaszolni rá.
("OK"-ot kell a standard outputra írni.)

Pálya adatok (csak Bemenet):

`playerID` : egész szám, a játékos azonosítója\
`P`: egész szám, ennyi bolygó van

Minden bolygóra (_P_ sor):\
`x`, `y`, `efficiency`: 3 egész szám, a bolygó két koordinátája és a hatékonysága\
A bolygókat _0_-tól _P-1_-ig számozzuk (később planetID), az _i_. sor az _i_ sorszámú bolygó adatait tartalmazza.

Minden bolygó-párra (_P\*P_-s szimmetrikus mátrix):\
`distance[i][j]` : egész szám, az _i_. és _j_. bolygó között ennyi körig tart az utazás. (mindkét irányban ugyanannyi)

### Körönkénti üzenetek

#### Bemenet

`tick`: egész, az adott kör sorszáma - egyesével nő

Bolygók adatai (_P_ sor):\
`planetID`, `playerID`, `population`: 3 egész szám, a bolygó azonosítója, a birtokló játékos azonosítója (_-1_, ha semleges a bolygó) és a jelenlegi populáció

`T` : egész szám, az úton lévő egységek száma.

Egységek adatai (_T_ sor):\
`playerID`, `from`, `to`, `count`, `arrive`\
`playerID`: egész, a játékos azonosítója\
`from`, `to`: _planetID_ - egész számok, a küldött egységek kiindulási helye és célja (csak saját bolygóról lehet küldeni)\
`count`: egész, a küldött egységek száma\
`arrive`: egész, a kör (tick) azonosító száma, amikor az egységek meg fognak érkezni (a jelenlegi körben (tick-ben) megérkező egységek nem szerepelnek a listában, mert már odaértek)

#### Kimenet

`T`: egész, a mozgatott csapatok száma

A csapatok adatai (_T_ sor)\
`from`, `to`, `count`\
`from`, `to`: _planetID_ - egész számok, a küldött egységek kiindulási helye és célja (csak saját bolygóról lehet küldeni)\
`count`: egész, a küldött egységek száma

Figyelem, egy (_from_, _to_) párost csak egyszer küldhettek el egy körön (ticken) belül a szervernek.
Ha ezt megszegitek, hibát kaptok és abban a körben nem léphettek.

### Játék vége

Bemenet

Ha a játéknak vége, a tick száma helyett -1-et küldünk.
Az eredmény a webes felületen lesz látható.

### Példa üzenetek

Szerver:\
`START`\
Bot:\
`OK`\
Szerver:

```
1
4
0 0 1
10 10 1
0 10 1
10 0 1
0 14 10 10
14 0 10 10
10 10 0 14
10 10 14 0
```

Szerver (1. tick)

```
0
0 0 100
1 1 100
2 -1 100
3 -1 100
0
```

## A szimuláció lépései

1. Az utazó egységek mozognak egyet a céljuk felé
2. A barátságos egységek megérkeznek
3. Az ellenséges egységek harcolnak (Itt vége lehet a játéknak egy játékos számára)
4. A bolygók új egységeket hozhatnak létre
5. A botok új parancsokat adnak ki
