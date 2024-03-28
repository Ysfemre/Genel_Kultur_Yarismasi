function Soru(soruIndex, soruMetni, secenekler, dogruCevap) {
    this.soruIndex = soruIndex;
    this.soruMetni = soruMetni;
    this.secenekler = secenekler;
    this.dogruCevap = dogruCevap;
}
Soru.prototype.cevabiKontrolEt = function (cevap) {
    return cevap === this.dogruCevap;
}

let geriSayma;
let soruindex = 0;
let bosBirakilanSoruSayisi = 0;
let dogruCevapSayisi = 0;
let yanlisCevapSayisi = 0;

function soruGoster() {
    function geriSay() {
        var saniye = 16;
        geriSayma = setInterval(function () {
            saniye--;
            let kalansure = `<div class="kalanSure">${saniye}</div>`
            document.querySelector(".ks").innerHTML = kalansure;
            if (saniye <= 0) {
                clearInterval(geriSayma);
                let kalansure = `<div class="kalanSure">${saniye}</div>`
                document.querySelector(".ks").innerHTML = kalansure;
                for (let i = 1; i <= 5; i++) {
                    let sikClass = ".sik" + i;
                    document.querySelector(sikClass).classList.remove("sik" + i + i);
                    document.querySelector(sikClass).classList.add("siklardeaktif");
                    if (document.querySelector(sikClass).textContent == Sorular[soruindex].dogruCevap) {
                        document.querySelector(sikClass).classList.add("dogruCevapSecildi");
                        bosBirakilanSoruSayisi++
                        if (soruindex + 1 == 10) {
                            document.querySelector(".sonrakiSoru").remove();
                            document.querySelector(".BitirButton").classList.remove("bitirbutonugizli");
                        }
                    }
                }
                document.querySelector(".sonrakiSoru").classList.remove("sonrakisoruaktifdegil");
            }
        }, 1000);
    }
    geriSay();
    document.querySelector(".sonrakiSoru").classList.add("sonrakisoruaktifdegil")
    let sorusayisigosterici = '';
    let sorugosterici = '';
    sorugosterici += `<div class="sorumetni">${Sorular[soruindex].soruMetni}</div>
        <div class="siklar">
            <div class="sik1 sik11">${Sorular[soruindex].secenekler.a}</div>
            <div class="sik2 sik22">${Sorular[soruindex].secenekler.b}</div>
            <div class="sik3 sik33">${Sorular[soruindex].secenekler.c}</div>
            <div class="sik4 sik44">${Sorular[soruindex].secenekler.d}</div>
            <div class="sik5 sik55">${Sorular[soruindex].secenekler.e}</div>
        </div>`;
    document.querySelector(".soru").innerHTML = sorugosterici;
    sorusayisigoster();
    document.querySelector(".soru").addEventListener('click', function clickHandler(event) {
        const clickedElement = event.target;
        if (clickedElement.classList.contains('sik1') ||
            clickedElement.classList.contains('sik2') ||
            clickedElement.classList.contains('sik3') ||
            clickedElement.classList.contains('sik4') ||
            clickedElement.classList.contains('sik5')) {
            clearInterval(geriSayma);
            if (soruindex + 1 < 10) { document.querySelector(".sonrakiSoru").classList.remove("sonrakisoruaktifdegil"); }
            if (soruindex + 1 == 10) {
                document.querySelector(".BitirButton").classList.remove("bitirbutonugizli");
            }

            if (clickedElement.textContent == Sorular[soruindex].dogruCevap) {
                clickedElement.classList.add("dogruCevapSecildi");
                dogruCevapSayisi++;
                for (let i = 1; i <= 5; i++) {
                    let sikClass = ".sik" + i;
                    document.querySelector(sikClass).classList.remove("sik" + i + i);
                    document.querySelector(sikClass).classList.add("siklardeaktif");
                    document.querySelector(".soru").removeEventListener('click', clickHandler);
                }
            }
            else {
                clickedElement.classList.add("yanlisCevapSecildi");
                yanlisCevapSayisi++
                for (let i = 1; i <= 5; i++) {
                    let sikClass = ".sik" + i;
                    document.querySelector(sikClass).classList.remove("sik" + i + i);
                    document.querySelector(sikClass).classList.add("siklardeaktif");
                    document.querySelector(".soru").removeEventListener('click', clickHandler);
                    if (document.querySelector(sikClass).textContent == Sorular[soruindex].dogruCevap) {
                        document.querySelector(sikClass).classList.add("dogruCevapSecildi");
                    }
                }

            }
        }

    });
}
function sorusayisigoster() {
    let sorusayisigosterici = `<span>${soruindex + 1}/10</span>`
    document.querySelector(".soruIndex").innerHTML = sorusayisigosterici;
}


let Sorular = [
    new Soru("1", "'Termessos Antik Kenti' hangi şehirde yer alır?", { a: "Antalya", b: "İzmir", c: "Aydın", d: "Muğla", e: "Hatay" }, "Antalya"),
    new Soru("2", "Hangi kurum Atatürk döneminde açılmıştır?", { a: "Darülfünun", b: "Türk Ocakları", c: "Mülkiye Mektebi", d: "Divan-u Humayun", e: "Ankara Hukuk Mektebi" }, "Ankara Hukuk Mektebi"),
    new Soru("3", "85. Oscar Ödülleri töreninde En İyi Yabancı Film Ödülü'nü alan Amour filminin yönetmeni kimdir?", { a: "Michael Haneke", b: "Wes Anderson", c: "Ken Loach", d: "Ang Lee", e: "Nuri Bilge Ceylan" }, "Michael Haneke"),
    new Soru("4", "Güneş sisteminin en büyük gezegeni hangisidir?", { a: "Satürn", b: "Neptün", c: "Uranüs", d: "Jüpiter", e: "Dünya" }, "Jüpiter"),
    new Soru("5", "Hangisi Mustafa Kemal Atatürk'ün hayatını anlatan biyografik bir eserdir?", { a: "Türk'ün Ateşle İmtihanı", b: "Tek Adam", c: "Üç Devirde Bir Adam", d: "Ateşten Gömlek", e: "Ankara" }, "Tek Adam"),
    new Soru("6", "Hangi coğrafi koordinat Türkiye sınırları içerisinde yer almaktadır?", { a: "28° Doğu 35° Kuzey", b: "38 ° Doğu 28° Kuzey", c: "36° Doğu 38° Kuzey", d: "40° Doğu 30° Kuzey", e: "45° Doğu 10° Kuzey" }, "36° Doğu 38° Kuzey"),
    new Soru("7", "Türkiye'de sokağa çıkma yasağının uygulandığı son nüfus sayımı hangi yılda gerçekleşmiştir?", { a: "1970", b: "1980", c: "1990", d: "2000", e: "2009" }, "2000"),
    new Soru("8", "Düşünen Adam heykeli hangi sanatçının eseridir?", { a: "Michelangelo", b: "Pablo Picasso", c: "Leonardo da Vinci", d: "Richard Serra", e: "Auguste Rodin" }, "Auguste Rodin"),
    new Soru("9", "Her yıl adına ödül verilen Türkiye'nin ilk Müslüman Türk kadın tiyatro oyuncusu kimdir?", { a: "Cahide Sonku", b: "Afife Jale", c: "Keriman Halis", d: "Adile Naşit", e: "Ayşe Kulin" }, "Afife Jale"),
    new Soru("10", "İnsan sağlığı üzerindeki olumsuz etkileri nedeniyle dünyanın en önemli sağlık sorunlarından biri olan sigara bağımlılığına yol açan madde nedir?", { a: "Kodein", b: "Tein", c: "Tütün", d: "Nikotin", e: "Adrenalin" }, "Nikotin")
]

document.querySelector(".geridon").addEventListener('click', function () {
    window.location = "BilgiSizsiniz.html";
})
document.querySelector(".yarismayaBaslabutton").addEventListener('click', function () {
    document.querySelector(".card").remove();
    document.querySelector(".sorular").classList.remove("sorulardeaktif");
    soruGoster();

})

document.querySelector(".sonrakiSoru").addEventListener('click', function () {
    if (soruindex < Sorular.length) {
        soruindex++;
        soruGoster();
        document.querySelector(".soru").addEventListener('click', clickHandler());
    }
})
document.querySelector(".BitirButton").addEventListener('click', function () {
    let sonuclarim = `<div class="Dogru">Doğru Sayısı = ${dogruCevapSayisi} </div>
    <div class="Yanlis">Yanlış Sayısı = ${yanlisCevapSayisi}</div>
    <div class="Bos">Boş Bırakılan = ${bosBirakilanSoruSayisi}</div>
    <button class="tekrarBasla">Tekrar Başla</button>
    <button class="anaSayfayaDon">Ana Sayfa</button>`
    document.querySelector(".sonuclar").innerHTML = sonuclarim;
    document.querySelector(".sonuclar").classList.remove("sonuclardeaktif");
    document.querySelector(".card").remove();
    document.body.style.backgroundColor = "#F2CB05";
    document.querySelector(".tekrarBasla").addEventListener('click', function () {
        window.location.href = "Yarisma.html";
    })
    document.querySelector(".anaSayfayaDon").addEventListener('click', function () {
        window.location.href = "BilgiSizsiniz.html";
    })
})
