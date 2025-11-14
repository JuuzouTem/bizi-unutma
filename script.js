document.addEventListener('DOMContentLoaded', () => {
    const splashTextEl = document.getElementById('splash-text');
    const enterBtn = document.getElementById('enter-wired-btn');
    const splashScreen = document.getElementById('splash-screen');
    const mainContent = document.getElementById('main-content');
    const letterTextEl = document.getElementById('letter-text');
    
    const splashLines = [
        "Bağlantı kuruluyor...|1200", // 1.2 saniye bekle
        "Navi'ye giriş yapılıyor...|1200", // 1.2 saniye bekle
        "Protokol: Esin Ablam yükleniyor...|2000", // 2 saniye bekle
        "Present day...|800 Present time...|1000 hahaha."
    ];

    const letterContent = `Esin Ablam,\n\nBu satırları yazarken aklıma o kadar çok şey geliyor ki... Kantinde ettiğimiz muhabbetler, birbirimize attığımız binlerce mesaj, buluştuğumuzda konuştuklarımız ve tabii ki gecenin bir yarısı yaptığımız o derin 'deep talk'lar.\n\nBazen bazı kararlar ani gelir ama biliyorum ki bu senin için yeni bir başlangıç. Yine de İstanbul'un sensiz biraz daha "az iyi" olacağı kesin. Unutma, aramızdaki tek fark artık birkaç yüz kilometre olacak. Among Us lobileri, ortak anime seansları ve benim gelecekteki icatlarımı puanlaman için her zaman 'online' olacağız.\n\nBu site, bizim küçük 'Wired'ımız olur umarım. Özlediğinde girip bak diye. Çünkü ne olursa olsun, sen benim için hep çok özelsin.\n\nHer zaman yanında olan 'babusun',\nBehlül.`;

    function typeWriter(element, text, speed, onComplete) {
        let i = 0;
        element.innerHTML = "";

        function type() {
            if (i < text.length) {
                const cursor = element.querySelector('.blinking-cursor');
                if (cursor) cursor.remove();

                if (text[i] === '|') {
                    let pauseStr = '';
                    let j = i + 1;
                    while (j < text.length && !isNaN(parseInt(text[j], 10))) {
                        pauseStr += text[j];
                        j++;
                    }
                    if (pauseStr) {
                        const pauseDuration = parseInt(pauseStr, 10);
                        i = j;
                        setTimeout(type, pauseDuration);
                        return;
                    }
                }

                const char = text[i] === '\n' ? '<br>' : text[i];
                element.innerHTML += char;
                element.innerHTML += '<span class="blinking-cursor">_</span>';
                
                i++;
                setTimeout(type, speed);
            } else {
                const cursor = element.querySelector('.blinking-cursor');
                if (cursor) cursor.remove();
                if (onComplete) onComplete();
            }
        }
        type();
    }
    
    function runSplashAnimation() {
        const fullText = splashLines.join('\n');
        typeWriter(splashTextEl, fullText, 75, () => {
            splashTextEl.innerHTML += '<span class="blinking-cursor">_</span>';
            enterBtn.style.display = 'block';
        });
    }
    
    enterBtn.addEventListener('click', () => {
        splashScreen.classList.add('hidden');
        setTimeout(() => {
            splashScreen.style.display = 'none';
            mainContent.style.display = 'block';
            typeWriter(letterTextEl, letterContent, 50);
            startCountdown();
        }, 500);
    });
    
    function startCountdown() {
        const targetDate = new Date(2025, 10, 15, 13, 0, 0).getTime();

        const countdownInterval = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance < 0) {
                clearInterval(countdownInterval);
                document.getElementById('countdown').innerHTML = "Zaman doldu! Hadi konuşalım!";
                return;
            }

            const days = Math.floor(distance / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
            const format = (num) => num < 10 ? '0' + num : num;

            document.getElementById('days').innerText = format(days);
            document.getElementById('hours').innerText = format(hours);
            document.getElementById('minutes').innerText = format(minutes);
            document.getElementById('seconds').innerText = format(seconds);

        }, 1000);
    }

    runSplashAnimation();
});