# Automatisering med Gulp.js

## Automatiseringsprocessens syfte
Genom att automatisera uppgifter som vanligtvis tar tid att göra manuellt så blir utvecklingsprocessen snabbare och bekvämare. Man slipper manuellt ta hand om sådant som vanligtvis skulle ta tid, och istället kan man fokusera på själva utvecklingen i sig. Ur en annan aspekt så kan man tycka att det är säkrare att automatisera vissa uppgifter, då man undviker risken att glömma uppgifterna.

## Paket och verktyg som jag har använt
Jag har använt följande verktyg:
* Paketet `gulp`, vilket är ganska självklart då det är själva task-runnern som används i uppgiften.
* Paketet `gulp-concat` för att konkatenera CSS- och JS-filer.
* Paketet `gulp-connect` för att skapa en server med automatisk uppdatering av webbläsaren när filer ändras.
* Paketet `gulp-csso` för att minifiera CSS-filer.
* Paketet `gulp-terser` för att minifiera JS-filer.
* Paketet `gulp-clean-fix` för att rensa pub-katalogen vid kommandot "gulp".

## Beskrivning av systemet
Jag har skapat en del tasks i `gulpfile.js`-filen som i sin tur körs via Gulp. 

För att använda systemet så ska man efter att ha klonat repot installera NPM-paketen genom att köra kommandot `npm install`. 

Därefter är det bara att köra kommandot `gulp` och då startas en lokal server på **localhost:8080**. Initialt så rensas pub-katalogen, HTML-filer och bilder kopieras till pub-katalogen, och sen konkateneras samt minifieras CSS- och JS-filerna. Om man ändrar filer så kommer webbläsaren uppdateras automatiskt. En lyssnare sätts upp som lyssnar efter ändringar i filerna och upprepar en del uppgifter (kopiering av filer i pub, samt konkatenering + minifiering av CSS och JS).