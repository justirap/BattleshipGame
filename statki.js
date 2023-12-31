main();

function main() {
    document.getElementById("tabela2").removeEventListener('click', StrzelGRACZ);
    a = 1;
    tablica = stworzT(10);
    gracz = stworzT(10);
    rundaKOM = false;
    licznikGRACZ = 0;
    licznikKOMP = 0;
    wybranyStatek = null;


    //console.log(tablica);

    plansza(tablica);
    wstawStatki(tablica);



    //..................Wyrzucanie statkow po lewej stronie...............

    var n = 1;
    for (var i = 4; i > 0; i--) {
        for (var j = 0; j < n; j++) {
            var statek = wstawStatek(i);
            statek.id = 'statek' + i + '_' + (j + 1);
            statek.className = 'Statek';
            statek.dataset.dlstatku = i;
            statek.addEventListener('click', zaznaczStatek);
            document.getElementById('lewy').appendChild(statek);
        }
        n++;
    }

    planszaGracza(gracz);


    //..........................Dodanie funkcji wstawiania statku na plansze gracza...................

    document.getElementById('tabela1').addEventListener('click', ustawianieStatkow);
    zaznaczStatek();

    document.getElementById('tabela1').addEventListener('mouseover', podswietl);


    document.getElementById('tabela1').addEventListener('contextmenu', obrot);



    alert("Prawy przycisk myszy - zmiana rotacji statku ;)")

}

//..............FUNKCJE FUNKCJE FUNKCJE FUNKCJE FUNKCJE FUNKCJE FUNKCJE............
//..............FUNKCJE FUNKCJE FUNKCJE FUNKCJE FUNKCJE FUNKCJE FUNKCJE............
//..............FUNKCJE FUNKCJE FUNKCJE FUNKCJE FUNKCJE FUNKCJE FUNKCJE............

function ustawianieStatkow(e) {
    var cel = e.target;
    var x = parseInt(cel.dataset.x);
    var y = parseInt(cel.dataset.y);
    if (a == 2) x = x - naturalne(wybranyStatek.dlstatku + x - 11);
    else y = y - naturalne(wybranyStatek.dlstatku + y - 11);

    if (wybranyStatek) {
        var warunek = sprawdzStatek(x, y, wybranyStatek.dlstatku, a, gracz);
        if (warunek) {
            if (a == 1) {  //dla poziomych
                for (let i = -1; i < 2; i++) {  //wstawianie jedynek w polu statku
                    for (j = y - 1; j < y + wybranyStatek.dlstatku + 1; j++) {
                        gracz[x + i][j] = 1;
                    }
                }
                for (let o = 0; o < wybranyStatek.dlstatku; o++) gracz[x][y + o] = 4; //wstawianie czworek jako statek
            }

            else if (a == 2) { //dla pionowych
                for (let i = -1; i < 2; i++) {   //wstawianie jedynek w polu statku
                    for (let j = x - 1; j < x + wybranyStatek.dlstatku + 1; j++) {
                        gracz[j][y + i] = 1;
                    }
                }
                for (let p = 0; p < wybranyStatek.dlstatku; p++) gracz[x + p][y] = 4; //wstawianie czworek jako statek
            }
            document.getElementById('lewy').removeChild(document.getElementById(wybranyStatek.id));

            wybranyStatek = null;

            planszaGracza(gracz);
        }

    }



    let dlugoscdzieci = document.getElementById("lewy").children.length - 1;

    if (dlugoscdzieci == 0) {
        przycisk = document.createElement("button");
        przycisk.className = "przycisk";
        przycisk.id = "przycisk1";
        przycisk.innerText = "Rozpocznij grę!";
        document.getElementById("dolny").append(przycisk);
    }

    if (document.getElementById("dolny").children.length == 1) {

        document.getElementById('tabela1').removeEventListener('click', ustawianieStatkow);
        document.getElementById('tabela1').removeEventListener('mouseover', podswietl);
        document.getElementById('tabela1').removeEventListener('contextmenu', obrot);

        przycisk.addEventListener("click", function (e) {

            document.getElementById('dolny').removeChild(document.getElementById("przycisk1"));


            document.getElementById('tabela2').addEventListener('click', StrzelGRACZ);


        });

    }

}

//..............Wstawianie statkow komputera po sprawdzeniu warunkow.............

function obrot(e) {
    e.preventDefault();
    if (a == 1) {
        a = 2;
    }
    else
        a = 1;

    podswietl(e);

}

function wstawStatki(tablica) {
    var A = 4;
    var a;
    var ilosc = 1;

    for (let n = 0; n < 4; n++) {
        for (let k = 0; k < ilosc; k++) {
            var warunek;

            do {
                a = losuj(1, 2); //losowanie czy poziomo czy pionowo

                if (a == 1) {  //dla poziomych
                    var x = losuj(1, 10);
                    var y = losuj(1, (7 + n));
                    warunek = sprawdzStatek(x, y, A, a, tablica);
                    if (warunek === true) {
                        for (let i = -1; i < 2; i++) {  //wstawianie jedynek w polu statku
                            for (j = y - 1; j < y + A + 1; j++) {
                                tablica[x + i][j] = 1;
                            }
                        }
                        for (let o = 0; o < A; o++) tablica[x][y + o] = 4; //wstawianie czworek jako statek
                    }
                }
                else if (a == 2) { //dla pionowych
                    var x = losuj(1, (7 + n));
                    var y = losuj(1, 10);
                    warunek = sprawdzStatek(x, y, A, a, tablica);
                    if (warunek === true) {
                        for (let i = -1; i < 2; i++) {   //wstawianie jedynek w polu statku
                            for (let j = x - 1; j < x + A + 1; j++) {
                                tablica[j][y + i] = 1;
                            }
                        }
                        for (let p = 0; p < A; p++) tablica[x + p][y] = 4; //wstawianie czworek jako statek
                    }
                }

            } while (!warunek);
        }
        ilosc++;
        A--;

    }

}

//.................Funkcja sprawdzajaca czy statek moze zostac ustawiony, czyli czy nie stoi na jedynkach.............

function sprawdzStatek(x, y, A, a, tab) {

    if (a == 2) {  //dla pionowych
        for (i = 0; i < A; i++) {
            if (tab[x + i] && tab[x + i][y] && (tab[x + i][y] === 4 || tab[x + i][y] === 1))
                return false;

        }

    }

    else if (a == 1) {  //dla poziomych
        for (i = 0; i < A; i++) {
            if (tab[x] && tab[x][y + i] && (tab[x][y + i] === 4 || tab[x][y + i] === 1))
                return false;

        }
    }
    return true;
}


//.................Przydatne losowanie liczb w jakim chcesz zakresie.............

function losuj(min, max) {
    min = parseInt(min, 10);
    max = parseInt(max, 10);

    if (min > max) {
        var tmp = min;
        min = max;
        max = tmp;
    }

    return Math.floor(Math.random() * (max - min + 1) + min);
}


//..................Tworzenie tablicy o jakim chcesz rozmiarze...............

function stworzT(n) {
    var tab = [];
    for (var i = 0; i < n + 2; i++) {
        tab[i] = [];
    }

    for (var i = 0; i < n + 2; i++) {
        for (var j = 0; j < n + 2; j++) {
            tab[i][j] = 0;
        }
    }

    for (var i = 0; i < n + 2; i++) {
        tab[i][0] = 1;
    }

    for (var i = 0; i < n + 2; i++) {
        tab[0][i] = 1;
    }

    for (var i = 0; i < n + 2; i++) {
        tab[i][11] = 1;
    }

    for (var i = 0; i < n + 2; i++) {
        tab[11][i] = 1;
    }
    return tab;
}

//.................Wstawianie planszy statkow komputera na stronie po sprawdzeniu gdzie leza statki............

function plansza(tab) {
    let n = 10;
    document.getElementById('tabela2').innerHTML = "";
    for (var i = 1; i < n + 1; i++) {
        var wiersz = document.createElement("tr");
        for (var j = 1; j < n + 1; j++) {
            var pole = document.createElement("td");
            pole.innerText = tab[i][j];
            pole.dataset.x = i;
            pole.dataset.y = j;

            pole.style.border = "1px solid black";
            if (pole.innerText == 4) {
                pole.style.backgroundColor = "#00CCFF";
                pole.style.color = "#00CCFF";
            }
            else {
                pole.style.backgroundColor = "white";
                pole.style.color = "white";
            }

            if (pole.innerText == "X") {

                pole.style.backgroundColor = "#00CCFF";
                pole.style.color = "black";
                pole.style.fontSize = "25px";

            }

            if (pole.innerText == "o") {
                pole.style.backgroundColor = "white";
                pole.style.color = "black";
                pole.style.fontSize = "15px";
            }
            wiersz.appendChild(pole);
        }
        document.getElementById("tabela2").appendChild(wiersz);
    }

}

function planszaKOM(tab) {
    let n = 10;
    document.getElementById('tabela2').innerHTML = "";
    for (var i = 1; i < n + 1; i++) {
        var wiersz = document.createElement("tr");
        for (var j = 1; j < n + 1; j++) {
            var pole = document.createElement("td");
            pole.innerText = tab[i][j];
            pole.dataset.x = i;
            pole.dataset.y = j;

            if (pole.innerText == "X") {

                pole.style.backgroundColor = "#00CCFF";
                pole.style.color = "black";
                pole.style.fontSize = "25px";

            }

            if (pole.innerText == "o") {
                pole.style.backgroundColor = "white";
                pole.style.color = "black";
                pole.style.fontSize = "15px";
            }

            else {
                pole.className = "bialy";
            }
            wiersz.appendChild(pole);
        }
        document.getElementById("tabela2").appendChild(wiersz);
    }

}


//....................Wyświetlanie planszy gracza...................

function planszaGracza(gracz) {
    let n = 10;
    document.getElementById('tabela1').innerHTML = "";
    for (var i = 1; i < n + 1; i++) {
        var wiersz = document.createElement("tr");
        for (var j = 1; j < n + 1; j++) {
            var pole = document.createElement("td");
            pole.innerText = gracz[i][j];
            pole.dataset.x = i;
            pole.dataset.y = j;
            pole.style.border = "1px solid black";
            if (pole.innerText == 4) {
                pole.className = "rozowy";
            }
            else {
                pole.className = "bialy";
            }

            if (pole.innerText == "X") {

                pole.style.backgroundColor = "#00CCFF";
                pole.style.color = "black";
                pole.style.fontSize = "25px";

            }

            if (pole.innerText == "o") {
                pole.style.backgroundColor = "white";
                pole.style.color = "black";
                pole.style.fontSize = "15px";
            }

            wiersz.appendChild(pole);
        }
        document.getElementById("tabela1").appendChild(wiersz);
    }

    zaznaczStatek();


}




//....................Tworzenie jednego statku o podanym wymiarze kostek...............
function wstawStatek(n) {
    var Statek = document.createElement("div");
    for (var i = 0; i < n; i++) {
        var pole = document.createElement("div");
        pole.className = "Stateczki";
        Statek.appendChild(pole);
    }
    return Statek;
}


//........................Funkcja zaznaczajaca wybrany statek.................

function zaznaczStatek(e) {

    var statek;


    if (!e) {
        statek = document.getElementsByClassName("Statek")[0];
    }
    else statek = e.currentTarget;

    if (wybranyStatek) {
        let element = document.getElementById(wybranyStatek.id);
        element.style.backgroundColor = "white";
    }

    if (statek) {
        wybranyStatek = { dlstatku: parseInt(statek.dataset.dlstatku), id: statek.id };
        statek.style.backgroundColor = "black";
    }
    else wybranyStatek = null;


}

function podswietl(e) {
    var cel = e.target;

    function kolorowanie(warunek, pozycjaX, pozycjaY) {
        var linijki = e.currentTarget.children;
        for (let i = 0; i < linijki.length; i++) {
            var pole = linijki[i].children;
            for (let j = 0; j < pole.length; j++) {
                if (pozycjaX.includes(parseInt(pole[j].dataset.x)) && pozycjaY.includes(parseInt(pole[j].dataset.y))) {
                    if (warunek) {
                        pole[j].style.backgroundColor = "green";

                    }
                    else pole[j].style.backgroundColor = "red";
                }
                else pole[j].style.backgroundColor = '';

            }
        }
    }



    if (cel.tagName === "TD") {
        var x = parseInt(cel.dataset.x);
        var y = parseInt(cel.dataset.y);
        if (a == 2) x = x - naturalne(wybranyStatek.dlstatku + x - 11);
        else y = y - naturalne(wybranyStatek.dlstatku + y - 11);

        if (wybranyStatek) {
            var warunek = sprawdzStatek(x, y, wybranyStatek.dlstatku, a, gracz);
            var kordy = [];
            if (a == 2) {
                for (let i = 0; i < wybranyStatek.dlstatku; i++) {
                    kordy[i] = x + i;
                }
                kolorowanie(warunek, kordy, [y]);

            }
            if (a == 1) {
                for (let i = 0; i < wybranyStatek.dlstatku; i++) {
                    kordy[i] = y + i;
                }
                kolorowanie(warunek, [x], kordy);

            }

        }

    }

}

function naturalne(liczba) {
    if (liczba < 0) return 0;
    return liczba;
}


function StrzelGRACZ(e) {
    if (rundaKOM) {
        alert("Teraz strzela komputer!");
    }
    else {
        wybranePole = event.target;
        let x = (wybranePole.dataset.x);
        let y = (wybranePole.dataset.y);


        if (tablica[x][y] == 4) {
            tablica[x][y] = "X";
            wybranePole.innerText = "X";

            licznikGRACZ++;
            planszaKOM(tablica);
        }
        else if (tablica[x][y] == 0 || tablica[x][y] == 1) {
            tablica[x][y] = "o";
            wybranePole.innerText = "o";
            rundaKOM = true;
            planszaKOM(tablica);
            var strzal = setTimeout(StrzelKOMP, 1000);
        }
        else alert("Już tutaj strzelales!");
    }

    if (licznikGRACZ == 20) {
        clearTimeout(strzal);
        var nowagra = confirm("Wygrałeś, GRATKi MORDKO! \n Chcesz zagrać jeszcze raz?");
        if (nowagra) {
            planszaGracza(gracz);
            setTimeout(main, 3000);
        }
    }


}


function StrzelKOMP() {
    x = losuj(1, 10);
    y = losuj(1, 10);

    if (gracz[x][y] == 0 || gracz[x][y] == 1) {
        gracz[x][y] = "o";
        planszaGracza(gracz);
        rundaKOM = false;
    }
    else if (gracz[x][y] == 4) {
        gracz[x][y] = "X";
        planszaGracza(gracz);
        licznikKOMP++;
        strzal = setTimeout(StrzelKOMP, 1000);
    }
    else strzal = setTimeout(StrzelKOMP, 1000);


    if (licznikKOMP == 20) {
        clearTimeout(strzal);
        var nowagra = confirm("Niestety przegrałeś :( \n Chcesz zagrać jeszcze raz?");

        if (nowagra) {
            plansza(tablica);
            setTimeout(main, 3000);

        }
    }

}
