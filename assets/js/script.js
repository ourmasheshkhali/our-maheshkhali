/* ============================================================
   OUR MAHESHKHALI - Complete JavaScript System
   11 Scene Cinematic Loader + Language + Clock + Theme + Nav
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    console.log('🏝️ OUR MAHESHKHALI - System Initializing...');

    initCinematicLoader();
    initLanguageSystem();
    initLiveClock();
    initThemeToggle();
    initMobileMenu();
    initSmoothScroll();
    initUnionButtons();

    console.log('✅ OUR MAHESHKHALI - All Systems Ready!');
});

/* ============================================================
   🎬 CINEMATIC LOADER - 11 Scenes Auto Play
   ============================================================ */

function initCinematicLoader() {
    console.log('🎬 Cinematic Loader Initializing...');

    const loader = document.getElementById('loader');
    if (!loader) {
        console.warn('⚠️ Loader not found');
        showMainContent();
        return;
    }

    const scenes = [
        { id: 'sceneWorld',   duration: 5000 },
        { id: 'sceneBD',      duration: 4500 },
        { id: 'sceneRose',    duration: 5000 },
        { id: 'sceneQuran',   duration: 5500 },
        { id: 'sceneDhkCtg',  duration: 4500 },
        { id: 'sceneCtgCox',  duration: 4500 },
        { id: 'sceneCoast',   duration: 4500 },
        { id: 'sceneOcean',   duration: 5000 },
        { id: 'sceneMap3d',   duration: 5500 },
        { id: 'sceneSummary', duration: 5500 },
        { id: 'sceneFinal',   duration: 7000 }
    ];

    let currentIndex = 0;
    let autoPlayTimer = null;
    let isAutoPlaying = true;
    let isSkipped = false;
    let countdownInterval = null;
    let finalProgressInterval = null;

    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const autoBtn = document.getElementById('autoBtn');
    const skipBtn = document.getElementById('skipBtn');
    const enterBtn = document.getElementById('enterBtn');
    const sceneCounter = document.getElementById('sceneCounter');
    const sceneName = document.getElementById('sceneName');
    const progressFill = document.getElementById('progressFill');
    const countdownNum = document.getElementById('countdownNum');
    const flbFill = document.getElementById('flbFill');

    // Hide all scenes first
    scenes.forEach(s => {
        const el = document.getElementById(s.id);
        if (el) el.classList.remove('active');
    });

    function showScene(index) {
        if (isSkipped) return;
        if (index >= scenes.length) { endLoader(); return; }

        scenes.forEach(s => {
            const el = document.getElementById(s.id);
            if (el) el.classList.remove('active');
        });

        const current = document.getElementById(scenes[index].id);
        if (current) {
            current.classList.add('active');
            console.log(`🎬 Scene ${index + 1}/${scenes.length}: ${scenes[index].id}`);
        }

        if (sceneCounter) sceneCounter.textContent = `${index + 1}/${scenes.length}`;

        // Update scene name based on current language
        const currentLang = localStorage.getItem('maheshkhali-lang') || 'bn';
        const currentSceneEl = document.getElementById(scenes[index].id);
        const sceneNameEl = currentSceneEl?.querySelector('.scene-title, .coast-title, .ocean-title, .summary-title, .final-label');
        if (sceneNameEl && sceneName) {
            sceneName.textContent = sceneNameEl.textContent || '...';
        }

        const progressPercent = ((index + 1) / scenes.length) * 100;
        if (progressFill) progressFill.style.width = progressPercent + '%';

        // Countdown for final scene
        if (scenes[index].id === 'sceneFinal') {
            startCountdown();
        }
    }

    function goNext() {
        stopAutoPlay();
        if (currentIndex < scenes.length - 1) {
            currentIndex++;
            showScene(currentIndex);
        } else {
            endLoader();
        }
    }

    function goPrev() {
        stopAutoPlay();
        if (currentIndex > 0) {
            currentIndex--;
            showScene(currentIndex);
        }
    }

    function startAutoPlay() {
        if (isAutoPlaying) return;
        isAutoPlaying = true;
        if (autoBtn) {
            const lang = localStorage.getItem('maheshkhali-lang') || 'bn';
            autoBtn.textContent = lang === 'bn' ? '⏸️ বিরতি' : '⏸️ Pause';
            autoBtn.classList.add('active');
        }
        console.log('▶️ Auto-play STARTED');
        scheduleNext();
    }

    function scheduleNext() {
        if (autoPlayTimer) clearTimeout(autoPlayTimer);
        if (!isAutoPlaying || isSkipped) return;

        const currentScene = scenes[currentIndex];
        autoPlayTimer = setTimeout(() => {
            if (isSkipped) return;
            if (currentIndex < scenes.length - 1) {
                currentIndex++;
                showScene(currentIndex);
                scheduleNext();
            } else {
                endLoader();
            }
        }, currentScene.duration);
    }

    function stopAutoPlay() {
        isAutoPlaying = false;
        if (autoBtn) {
            const lang = localStorage.getItem('maheshkhali-lang') || 'bn';
            autoBtn.textContent = lang === 'bn' ? '▶️ অটো' : '▶️ Auto';
            autoBtn.classList.remove('active');
        }
        if (autoPlayTimer) { clearTimeout(autoPlayTimer); autoPlayTimer = null; }
        console.log('⏸️ Auto-play STOPPED');
    }

    function startCountdown() {
        let count = 3;
        if (countdownNum) countdownNum.textContent = '03';
        if (countdownInterval) clearInterval(countdownInterval);
        if (finalProgressInterval) clearInterval(finalProgressInterval);

        countdownInterval = setInterval(() => {
            count--;
            if (count > 0) {
                if (countdownNum) countdownNum.textContent = '0' + count;
            } else if (count === 0) {
                if (countdownNum) countdownNum.textContent = '01';
                clearInterval(countdownInterval);
            } else {
                clearInterval(countdownInterval);
            }
        }, 1500);

        let progress = 0;
        finalProgressInterval = setInterval(() => {
            progress += 2;
            if (flbFill) flbFill.style.width = progress + '%';
            if (progress >= 100) clearInterval(finalProgressInterval);
        }, 120);
    }

    function endLoader() {
        if (isSkipped) return;
        isSkipped = true;

        stopAutoPlay();
        if (countdownInterval) clearInterval(countdownInterval);
        if (finalProgressInterval) clearInterval(finalProgressInterval);

        console.log('🚀 Loading Complete — Entering Website...');

        if (loader) {
            loader.classList.add('hidden');
            setTimeout(() => {
                loader.style.display = 'none';
                document.body.classList.add('loaded');
                showMainContent();
                window.scrollTo(0, 0);
                console.log('✅ Welcome to OUR MAHESHKHALI!');
            }, 1000);
        }
    }

    function showMainContent() {
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            mainContent.style.display = 'block';
            mainContent.style.animation = 'fadeInMain 0.8s ease';
        }
    }

    if (nextBtn) nextBtn.addEventListener('click', goNext);
    if (prevBtn) prevBtn.addEventListener('click', goPrev);
    if (autoBtn) {
        autoBtn.addEventListener('click', () => {
            isAutoPlaying ? stopAutoPlay() : startAutoPlay();
        });
    }
    if (skipBtn) skipBtn.addEventListener('click', () => {
        console.log('⏭️ Skip clicked');
        endLoader();
    });
    if (enterBtn) enterBtn.addEventListener('click', () => {
        console.log('🚀 Enter clicked');
        endLoader();
    });

    document.addEventListener('keydown', (e) => {
        if (isSkipped) return;
        if (e.key === 'ArrowRight') { goNext(); }
        else if (e.key === 'ArrowLeft') { goPrev(); }
        else if (e.key === 'Escape' || e.key === ' ') {
            e.preventDefault();
            endLoader();
        }
    });

    setTimeout(() => {
        console.log('▶️ Auto-play STARTED');
        showScene(0);
        if (autoBtn) {
            const lang = localStorage.getItem('maheshkhali-lang') || 'bn';
            autoBtn.textContent = lang === 'bn' ? '⏸️ বিরতি' : '⏸️ Pause';
            autoBtn.classList.add('active');
        }
        scheduleNext();
    }, 800);

    console.log('✅ Cinematic Loader Ready — 11 Scenes');
}

/* ============================================================
   🌐 GLOBAL LANGUAGE SYSTEM (বাংলা ↔ English)
   সব data-bn / data-en attribute switch করবে
   ============================================================ */

function initLanguageSystem() {
    let currentLang = localStorage.getItem('maheshkhali-lang') || 'bn';

    const langBtnLoader = document.getElementById('langToggle');
    const langTextLoader = document.getElementById('langText');
    const langBtnTop = document.getElementById('topLangBtn');
    const langTextTop = document.getElementById('topLangText');

    // Apply language
    function applyLanguage(lang) {
        currentLang = lang;
        document.documentElement.lang = lang;

        // Update all elements with data-bn / data-en
        document.querySelectorAll('[data-bn][data-en]').forEach(el => {
            const text = el.getAttribute(`data-${lang}`);
            if (text) {
                // If element has child elements, use innerHTML
                if (el.children.length > 0) {
                    el.innerHTML = text;
                } else {
                    el.textContent = text;
                }
            }
        });

        // Update language buttons text
        if (langTextLoader) langTextLoader.textContent = lang === 'bn' ? 'বাংলা' : 'English';
        if (langTextTop) langTextTop.textContent = lang === 'bn' ? 'বাংলা' : 'English';

        // Save
        localStorage.setItem('maheshkhali-lang', lang);

        // Show toast
        showToast(lang === 'bn' ? '🌐 ভাষা: বাংলা' : '🌐 Language: English');

        console.log(`🌐 Language: ${lang.toUpperCase()}`);
    }

    function toggleLanguage() {
        const newLang = currentLang === 'bn' ? 'en' : 'bn';
        applyLanguage(newLang);
    }

    // Event listeners
    if (langBtnLoader) langBtnLoader.addEventListener('click', toggleLanguage);
    if (langBtnTop) langBtnTop.addEventListener('click', toggleLanguage);

    // Login / Register buttons
    const loginBtnLoader = document.getElementById('loginBtn');
    const registerBtnLoader = document.getElementById('registerBtn');
    const topLoginBtn = document.getElementById('topLoginBtn');
    const topRegisterBtn = document.getElementById('topRegisterBtn');
    const topSearchBtn = document.getElementById('topSearchBtn');
    const topNotifBtn = document.getElementById('topNotifBtn');

    function showLoginMsg() {
        showToast(currentLang === 'bn' ? '🔐 লগইন সিস্টেম শীঘ্রই আসছে!' : '🔐 Login system coming soon!');
    }
    function showRegisterMsg() {
        showToast(currentLang === 'bn' ? '📝 রেজিস্ট্রেশন শীঘ্রই আসছে!' : '📝 Registration coming soon!');
    }
    function showSearchMsg() {
        showToast(currentLang === 'bn' ? '🔎 সার্চ সিস্টেম শীঘ্রই আসছে!' : '🔎 Search coming soon!');
    }
    function showNotifMsg() {
        showToast(currentLang === 'bn' ? '🔔 ৩টি নতুন নোটিফিকেশন!' : '🔔 You have 3 new notifications!');
    }

    if (loginBtnLoader) loginBtnLoader.addEventListener('click', showLoginMsg);
    if (registerBtnLoader) registerBtnLoader.addEventListener('click', showRegisterMsg);
    if (topLoginBtn) topLoginBtn.addEventListener('click', showLoginMsg);
    if (topRegisterBtn) topRegisterBtn.addEventListener('click', showRegisterMsg);
    if (topSearchBtn) topSearchBtn.addEventListener('click', showSearchMsg);
    if (topNotifBtn) topNotifBtn.addEventListener('click', showNotifMsg);

    // Initial apply
    applyLanguage(currentLang);
    console.log('✅ Language System Ready');
}

/* ============================================================
   🕐 LIVE CLOCK - Bengali / English Date & Time
   ============================================================ */

function initLiveClock() {
    const dayEl = document.getElementById('current-day');
    const dateEl = document.getElementById('current-date');
    const timeEl = document.getElementById('live-time');

    if (!dayEl && !dateEl && !timeEl) return;

    const bengaliDays = ['রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার'];
    const bengaliMonths = ['জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন',
                          'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'];
    const englishDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const englishMonths = ['January', 'February', 'March', 'April', 'May', 'June',
                          'July', 'August', 'September', 'October', 'November', 'December'];

    function toBn(num) {
        return String(num).replace(/\d/g, d => '০১২৩৪৫৬৭৮৯'[d]);
    }

    function updateClock() {
        const now = new Date();
        const lang = localStorage.getItem('maheshkhali-lang') || 'bn';

        if (dayEl) {
            const dayText = lang === 'bn' ? bengaliDays[now.getDay()] : englishDays[now.getDay()];
            dayEl.setAttribute(`data-${lang}`, dayText);
            dayEl.textContent = dayText;
        }

        if (dateEl) {
            if (lang === 'bn') {
                dateEl.textContent = `${toBn(now.getDate())} ${bengaliMonths[now.getMonth()]} ${toBn(now.getFullYear())}`;
            } else {
                dateEl.textContent = `${now.getDate()} ${englishMonths[now.getMonth()]} ${now.getFullYear()}`;
            }
        }

        if (timeEl) {
            let hours = now.getHours();
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12 || 12;
            
            if (lang === 'bn') {
                timeEl.textContent = `${toBn(hours)}:${toBn(minutes)}:${toBn(seconds)} ${ampm}`;
            } else {
                timeEl.textContent = `${hours}:${minutes}:${seconds} ${ampm}`;
            }
        }
    }

    updateClock();
    setInterval(updateClock, 1000);
    console.log('🕐 Live Clock Ready');
}

/* ============================================================
   🌙 THEME TOGGLE
   ============================================================ */

function initThemeToggle() {
    const themeTop = document.getElementById('topThemeBtn');

    const savedTheme = localStorage.getItem('maheshkhali-theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        if (themeTop) themeTop.textContent = '☀️';
    }

    if (themeTop) {
        themeTop.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            themeTop.textContent = isDark ? '☀️' : '🌙';
            localStorage.setItem('maheshkhali-theme', isDark ? 'dark' : 'light');

            const lang = localStorage.getItem('maheshkhali-lang') || 'bn';
            showToast(lang === 'bn' 
                ? (isDark ? '🌙 ডার্ক মোড চালু' : '☀️ লাইট মোড চালু') 
                : (isDark ? '🌙 Dark mode on' : '☀️ Light mode on'));
        });
    }

    console.log('✅ Theme Toggle Ready');
}

/* ============================================================
   📱 MOBILE MENU
   ============================================================ */

function initMobileMenu() {
    const menuBtn = document.getElementById('mobileMenuBtn');
    const nav = document.getElementById('mainNav');

    if (!menuBtn || !nav) return;

    menuBtn.addEventListener('click', () => {
        nav.classList.toggle('open');
        menuBtn.classList.toggle('active');
    });

    // Close menu when link clicked
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 991) {
                nav.classList.remove('open');
                menuBtn.classList.remove('active');
            }
        });
    });

    // Mega menu toggle on mobile
    document.querySelectorAll('.has-mega > .nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 991) {
                e.preventDefault();
                const parent = link.closest('.has-mega');
                parent.classList.toggle('open');
            }
        });
    });

    console.log('✅ Mobile Menu Ready');
}

/* ============================================================
   🖱️ SMOOTH SCROLL
   ============================================================ */

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#' || href === '') return;
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
    console.log('✅ Smooth Scroll Ready');
}

/* ============================================================
   🏘️ UNION DETAILS BUTTONS
   ============================================================ */

function initUnionButtons() {
    document.querySelectorAll('.details-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const card = btn.closest('.union-card');
            const unionNameBn = card?.querySelector('h3')?.getAttribute('data-bn') || 'ইউনিয়ন';
            const unionNameEn = card?.querySelector('h3')?.getAttribute('data-en') || 'Union';
            const lang = localStorage.getItem('maheshkhali-lang') || 'bn';
            
            const msg = lang === 'bn' 
                ? `🏘️ ${unionNameBn} — বিস্তারিত তথ্য শীঘ্রই আসছে!`
                : `🏘️ ${unionNameEn} — Detailed information coming soon!`;
            
            showToast(msg);
        });
    });
    console.log('✅ Union Buttons Ready');
}

/* ============================================================
   🍞 TOAST NOTIFICATION
   ============================================================ */

function showToast(message, duration = 3000) {
    let container = document.getElementById('toast-container');
    if (!container) {
        container = document.createElement('div');
        container.id = 'toast-container';
        container.style.cssText = `
            position: fixed;
            bottom: 100px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 100000;
            display: flex;
            flex-direction: column;
            gap: 10px;
            pointer-events: none;
        `;
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.style.cssText = `
        background: #800000;
        color: #D4AF37;
        padding: 15px 25px;
        border-radius: 10px;
        font-weight: 700;
        font-size: 0.95rem;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        border: 2px solid #D4AF37;
        animation: toastSlideUp 0.4s ease;
        pointer-events: auto;
        max-width: 90vw;
        text-align: center;
        font-family: inherit;
    `;
    toast.textContent = message;

    container.appendChild(toast);

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transition = 'opacity 0.4s ease';
        setTimeout(() => toast.remove(), 400);
    }, duration);
}

/* ============================================================
   🎨 DYNAMIC STYLES
   ============================================================ */

const dynamicStyles = document.createElement('style');
dynamicStyles.textContent = `
    @keyframes fadeInMain {
        from { opacity: 0; transform: translateY(20px); }
        to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes toastSlideUp {
        from { opacity: 0; transform: translateY(30px); }
        to   { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(dynamicStyles);

/* ============================================================
   🎬 CONSOLE ART
   ============================================================ */

console.log(`
🏝️ OUR MAHESHKHALI
━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Cinematic Loader (11 Scenes)
✅ Language System (বাংলা/English)
✅ Live Clock (Bengali/English)
✅ Theme Toggle
✅ Mobile Menu
✅ Smooth Scroll
✅ Toast Notifications
━━━━━━━━━━━━━━━━━━━━━━━━━
👨‍💻 Developed by Badsha Solyman
🌴 One Island. One Community. One Platform.
`);/* ============================================================
   🌴 FOOTER - Back to Top Button
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    const backTopBtn = document.getElementById('footerBackTop');

    if (backTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 400) {
                backTopBtn.classList.add('visible');
            } else {
                backTopBtn.classList.remove('visible');
            }
        }, { passive: true });

        backTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    console.log('✅ Footer Back-to-Top Ready');
});/* ============================================================
   ⬆️ FOOTER - BACK TO TOP BUTTON
   Show on scroll + Smooth scroll to top
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    const backTopBtn = document.getElementById('footerBackTop');

    if (!backTopBtn) {
        console.warn('⚠️ Back to Top Button not found');
        return;
    }

    // Show / Hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 400) {
            backTopBtn.classList.add('visible');
        } else {
            backTopBtn.classList.remove('visible');
        }
    }, { passive: true });

    // Smooth scroll to top on click
    backTopBtn.addEventListener('click', () => {
        window.scrollTo({ 
            top: 0, 
            behavior: 'smooth' 
        });
        console.log('⬆️ Back to top clicked');
    });

    console.log('✅ Back to Top Button Ready');
});/* ============================================================
   📊 SIDE BARS + FLOATING NAV + BACK TO TOP
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    // ============================================================
    // ⬆️ BACK TO TOP BUTTON
    // ============================================================
    const backToTopBtn = document.getElementById('backToTopBtn');
    
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 400) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        }, { passive: true });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            console.log('⬆️ Back to top');
        });
    }

    // ============================================================
    // 🎡 LEFT SPIN COUNTER
    // ============================================================
    const spinBtn = document.getElementById('spinCounterBtn');
    const spinCount = document.getElementById('spinCount');
    let spinValue = parseInt(localStorage.getItem('maheshkhali-spin') || '0');

    if (spinCount) spinCount.textContent = spinValue;

    if (spinBtn && spinCount) {
        spinBtn.addEventListener('click', () => {
            spinValue++;
            spinCount.textContent = spinValue;
            localStorage.setItem('maheshkhali-spin', spinValue);

            spinBtn.classList.add('spinning');
            setTimeout(() => spinBtn.classList.remove('spinning'), 500);

            console.log(`🎡 Spin: ${spinValue}`);
        });
    }

    // ============================================================
    // 🧭 FLOATING NAVIGATION BAR
    // ============================================================
    const fnbTop = document.getElementById('fnbTop');
    const fnbFooter = document.getElementById('fnbFooter');
    const fnbPrev = document.getElementById('fnbPrev');
    const fnbNext = document.getElementById('fnbNext');

    // Get all sections
    const sections = Array.from(document.querySelectorAll('section[id]'));
    let currentSectionIndex = 0;

    function updateCurrentSection() {
        const scrollY = window.pageYOffset;
        let activeIndex = 0;
        sections.forEach((section, i) => {
            const sectionTop = section.offsetTop - 150;
            if (scrollY >= sectionTop) activeIndex = i;
        });
        currentSectionIndex = activeIndex;
    }

    window.addEventListener('scroll', updateCurrentSection, { passive: true });

    // TOP
    if (fnbTop) {
        fnbTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // FOOTER
    if (fnbFooter) {
        fnbFooter.addEventListener('click', () => {
            const footer = document.querySelector('.site-footer');
            if (footer) {
                window.scrollTo({ top: footer.offsetTop, behavior: 'smooth' });
            }
        });
    }

    // PREV
    if (fnbPrev) {
        fnbPrev.addEventListener('click', () => {
            if (sections.length === 0) return;
            const prevIndex = Math.max(0, currentSectionIndex - 1);
            const target = sections[prevIndex];
            if (target) {
                window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
            }
        });
    }

    // NEXT
    if (fnbNext) {
        fnbNext.addEventListener('click', () => {
            if (sections.length === 0) return;
            const nextIndex = Math.min(sections.length - 1, currentSectionIndex + 1);
            const target = sections[nextIndex];
            if (target) {
                window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
            }
        });
    }

    console.log('✅ Side Bars + Floating Nav + Back to Top Ready');
});/* ============================================================
   🎯 LEFT IMPORTANT SIDEBAR - Actions
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

    const leftBar = document.getElementById('leftImportantBar');
    const libToggle = document.getElementById('libToggle');

    // Toggle sidebar
    if (libToggle && leftBar) {
        libToggle.addEventListener('click', () => {
            leftBar.classList.toggle('open');
        });
    }

    // Auto-close on link click (mobile)
    if (leftBar) {
        leftBar.querySelectorAll('a, button').forEach(el => {
            if (el === libToggle) return;
            el.addEventListener('click', () => {
                if (window.innerWidth <= 767) {
                    setTimeout(() => leftBar.classList.remove('open'), 300);
                }
            });
        });
    }

    // ============================================================
    // BUTTON ACTIONS
    // ============================================================
    const showMsg = (bn, en) => {
        const lang = localStorage.getItem('maheshkhali-lang') || 'bn';
        showToast(lang === 'bn' ? bn : en);
    };

    // Search
    const libSearch = document.getElementById('libSearch');
    if (libSearch) {
        libSearch.addEventListener('click', () => {
            showMsg('🔍 সার্চ সিস্টেম শীঘ্রই আসছে!', '🔍 Search coming soon!');
        });
    }

    // Login
    const libLogin = document.getElementById('libLogin');
    if (libLogin) {
        libLogin.addEventListener('click', () => {
            showMsg('🔐 লগইন সিস্টেম শীঘ্রই আসছে!', '🔐 Login coming soon!');
        });
    }

    // Register
    const libRegister = document.getElementById('libRegister');
    if (libRegister) {
        libRegister.addEventListener('click', () => {
            showMsg('📝 রেজিস্ট্রেশন সিস্টেম শীঘ্রই আসছে!', '📝 Registration coming soon!');
        });
    }

    // Emergency
    const libEmergency = document.getElementById('libEmergency');
    if (libEmergency) {
        libEmergency.addEventListener('click', () => {
            // Open Emergency modal
            const modal = document.getElementById('emergency-command-modal');
            if (modal) {
                modal.setAttribute('aria-hidden', 'false');
                modal.style.display = 'flex';
            } else {
                showMsg('🚨 জরুরি সেবা: ৯৯৯', '🚨 Emergency: 999');
            }
        });
    }

    // Hospital
    const libHospital = document.getElementById('libHospital');
    if (libHospital) {
        libHospital.addEventListener('click', () => {
            showMsg('🏥 নিকটস্থ হাসপাতাল খোঁজা হচ্ছে...', '🏥 Finding nearby hospitals...');
        });
    }

    // Police
    const libPolice = document.getElementById('libPolice');
    if (libPolice) {
        libPolice.addEventListener('click', () => {
            showMsg('👮 পুলিশ: ৯৯৯', '👮 Police: 999');
        });
    }

    // Weather
    const libWeather = document.getElementById('libWeather');
    if (libWeather) {
        libWeather.addEventListener('click', () => {
            showMsg('🌤️ আবহাওয়া: ডেমো ডেটা', '🌤️ Weather: Demo data');
        });
    }

    // Map
    const libMap = document.getElementById('libMap');
    if (libMap) {
        libMap.addEventListener('click', () => {
            const mapSection = document.getElementById('map');
            if (mapSection) {
                mapSection.scrollIntoView({ behavior: 'smooth' });
                showMsg('🗺️ ম্যাপে যাচ্ছি...', '🗺️ Going to map...');
            }
        });
    }

    // Contact
    const libContact = document.getElementById('libContact');
    if (libContact) {
        libContact.addEventListener('click', () => {
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            } else {
                showMsg('📞 +880 1886-033345', '📞 +880 1886-033345');
            }
        });
    }

    // Language (connects to top bar language)
    const libLang = document.getElementById('libLang');
    const libLangIcon = document.getElementById('libLangIcon');
    const libLangText = document.getElementById('libLangText');
    
    if (libLang) {
        libLang.addEventListener('click', () => {
            const topLangBtn = document.getElementById('topLangBtn');
            if (topLangBtn) {
                topLangBtn.click();
                // Update icon/text
                setTimeout(() => {
                    const lang = localStorage.getItem('maheshkhali-lang') || 'bn';
                    if (libLangText) libLangText.textContent = lang === 'bn' ? 'বাংলা' : 'English';
                    if (libLangIcon) libLangIcon.textContent = lang === 'bn' ? '🌐' : '🌐';
                }, 100);
            }
        });
    }

    // Theme
    const libTheme = document.getElementById('libTheme');
    const libThemeIcon = document.getElementById('libThemeIcon');
    
    if (libTheme) {
        libTheme.addEventListener('click', () => {
            const topThemeBtn = document.getElementById('topThemeBtn');
            if (topThemeBtn) {
                topThemeBtn.click();
                setTimeout(() => {
                    const isDark = document.body.classList.contains('dark-mode');
                    if (libThemeIcon) libThemeIcon.textContent = isDark ? '☀️' : '🌙';
                }, 100);
            }
        });
    }

    console.log('✅ Left Important Sidebar Ready');
});/* ============================================================
   🎡 UNIVERSAL LEARNING HUB SYSTEM
   Spin Button + Panel + Categories + Search + Gamification
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    console.log('🎡 Learning Hub Initializing...');

    // ============================================================
    // DOM ELEMENTS
    // ============================================================
    const spinBtn = document.getElementById('spinCounterBtn');
    const spinCount = document.getElementById('spinCount');
    const hubOverlay = document.getElementById('learningHubOverlay');
    const hubClose = document.getElementById('lhClose');
    const searchInput = document.getElementById('lhSearchInput');
    const searchBtn = document.getElementById('lhSearchBtn');
    const suggestBtns = document.querySelectorAll('.lh-suggest-btn');
    const categoryCards = document.querySelectorAll('.lh-cat-card');

    // Stats
    const lhSpinCount = document.getElementById('lhSpinCount');
    const lhScore = document.getElementById('lhScore');
    const lhXP = document.getElementById('lhXP');
    const lhStreak = document.getElementById('lhStreak');
    const lhLevel = document.getElementById('lhLevel');

    // ============================================================
    // LOCALSTORAGE DATA
    // ============================================================
    let hubData = {
        spin: parseInt(localStorage.getItem('maheshkhali-spin') || '0'),
        score: parseInt(localStorage.getItem('maheshkhali-score') || '0'),
        xp: parseInt(localStorage.getItem('maheshkhali-xp') || '0'),
        streak: parseInt(localStorage.getItem('maheshkhali-streak') || '0'),
        level: localStorage.getItem('maheshkhali-level') || 'Beginner'
    };

    // ============================================================
    // UPDATE STATS UI
    // ============================================================
    function updateStatsUI() {
        if (spinCount) spinCount.textContent = hubData.spin;
        if (lhSpinCount) lhSpinCount.textContent = hubData.spin;
        if (lhScore) lhScore.textContent = hubData.score;
        if (lhXP) lhXP.textContent = hubData.xp;
        if (lhStreak) lhStreak.textContent = hubData.streak;

        let level = 'Beginner';
        if (hubData.xp >= 1000) level = 'Expert';
        else if (hubData.xp >= 500) level = 'Advanced';
        else if (hubData.xp >= 100) level = 'Intermediate';

        hubData.level = level;
        localStorage.setItem('maheshkhali-level', level);

        if (lhLevel) {
            const lang = localStorage.getItem('maheshkhali-lang') || 'bn';
            const levelBn = {
                'Beginner': 'শিক্ষানবিশ',
                'Intermediate': 'মাঝারি',
                'Advanced': 'উন্নত',
                'Expert': 'বিশেষজ্ঞ'
            };
            lhLevel.textContent = lang === 'bn' ? levelBn[level] : level;
        }
    }

    updateStatsUI();

    // ============================================================
    // OPEN LEARNING HUB
    // ============================================================
    if (spinBtn && hubOverlay) {
        spinBtn.addEventListener('click', () => {
            hubData.spin++;
            hubData.xp += 5;
            hubData.score += 1;
            localStorage.setItem('maheshkhali-spin', hubData.spin);
            localStorage.setItem('maheshkhali-xp', hubData.xp);
            localStorage.setItem('maheshkhali-score', hubData.score);

            spinBtn.classList.add('spinning');
            setTimeout(() => spinBtn.classList.remove('spinning'), 600);

            hubOverlay.classList.add('open');
            hubOverlay.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';

            updateStatsUI();

            const lang = localStorage.getItem('maheshkhali-lang') || 'bn';
            showToast(
                lang === 'bn'
                    ? `🎡 স্পিন: ${hubData.spin} | XP: ${hubData.xp}`
                    : `🎡 Spin: ${hubData.spin} | XP: ${hubData.xp}`
            );

            console.log(`🎡 Learning Hub Opened — Spin: ${hubData.spin}, XP: ${hubData.xp}`);
        });
    }

    // ============================================================
    // CLOSE LEARNING HUB
    // ============================================================
    function closeHub() {
        if (hubOverlay) {
            hubOverlay.classList.remove('open');
            hubOverlay.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
            console.log('🎡 Learning Hub Closed');
        }
    }

    if (hubClose) hubClose.addEventListener('click', closeHub);

    if (hubOverlay) {
        hubOverlay.addEventListener('click', (e) => {
            if (e.target === hubOverlay) closeHub();
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && hubOverlay?.classList.contains('open')) {
            closeHub();
        }
    });

    // ============================================================
    // CATEGORY CARD CLICK
    // ============================================================
    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const categoryKey = card.getAttribute('data-category');
            const titleEl = card.querySelector('.lh-cat-title');
            const categoryName = titleEl?.textContent || 'Category';

            hubData.xp += 10;
            hubData.score += 5;
            localStorage.setItem('maheshkhali-xp', hubData.xp);
            localStorage.setItem('maheshkhali-score', hubData.score);
            updateStatsUI();

            card.style.transform = 'scale(0.95)';
            setTimeout(() => card.style.transform = '', 200);

            const lang = localStorage.getItem('maheshkhali-lang') || 'bn';
            const msg = lang === 'bn'
                ? `📚 ${categoryName} — +10 XP, +5 Score`
                : `📚 ${categoryName} — +10 XP, +5 Score`;
            showToast(msg);

            console.log(`📚 Category: ${categoryKey} — XP: ${hubData.xp}`);
        });
    });

    // ============================================================
    // SEARCH FUNCTIONALITY
    // ============================================================
    function performSearch() {
        if (!searchInput) return;

        const query = searchInput.value.trim().toLowerCase();
        if (!query) {
            const lang = localStorage.getItem('maheshkhali-lang') || 'bn';
            showToast(lang === 'bn' ? '🔎 কিছু লিখুন...' : '🔎 Type something...');
            return;
        }

        let foundCount = 0;
        categoryCards.forEach(card => {
            const title = card.querySelector('.lh-cat-title')?.textContent.toLowerCase() || '';
            const desc = card.querySelector('.lh-cat-desc')?.textContent.toLowerCase() || '';
            
            if (title.includes(query) || desc.includes(query)) {
                card.style.display = 'flex';
                card.style.animation = 'lhFadeIn 0.4s ease';
                foundCount++;
            } else {
                card.style.display = 'none';
            }
        });

        const lang = localStorage.getItem('maheshkhali-lang') || 'bn';
        if (foundCount > 0) {
            showToast(
                lang === 'bn'
                    ? `🔎 "${query}" — ${foundCount} টি ফলাফল`
                    : `🔎 "${query}" — ${foundCount} results`
            );
        } else {
            showToast(
                lang === 'bn'
                    ? `❌ "${query}" — কিছু পাওয়া যায়নি`
                    : `❌ "${query}" — nothing found`
            );
        }

        console.log(`🔎 Search: "${query}" — ${foundCount} results`);
    }

    if (searchBtn) searchBtn.addEventListener('click', performSearch);

    if (searchInput) {
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') performSearch();
        });

        searchInput.addEventListener('input', () => {
            const query = searchInput.value.trim().toLowerCase();
            if (query.length === 0) {
                categoryCards.forEach(card => {
                    card.style.display = 'flex';
                });
            }
        });
    }

    // ============================================================
    // SUGGESTION BUTTONS
    // ============================================================
    suggestBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const text = btn.textContent.trim();
            if (searchInput) {
                searchInput.value = text;
                searchInput.focus();
            }
        });
    });

    // ============================================================
    // DAILY STREAK
    // ============================================================
    function updateDailyStreak() {
        const today = new Date().toDateString();
        const lastVisit = localStorage.getItem('maheshkhali-last-visit');

        if (lastVisit !== today) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            
            if (lastVisit === yesterday.toDateString()) {
                hubData.streak++;
            } else if (lastVisit) {
                hubData.streak = 1;
            } else {
                hubData.streak = 1;
            }

            localStorage.setItem('maheshkhali-streak', hubData.streak);
            localStorage.setItem('maheshkhali-last-visit', today);
            
            updateStatsUI();
            console.log(`🔥 Streak updated: ${hubData.streak} days`);
        }
    }

    updateDailyStreak();

    // ============================================================
    // KEYBOARD SHORTCUT (Ctrl + K)
    // ============================================================
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'k') {
            e.preventDefault();
            if (spinBtn) spinBtn.click();
        }
    });

    console.log('✅ Learning Hub Ready — Spin, Search, Categories, Stats');
});/* ============================================================
   🏛️ UNION DIRECTORY SYSTEM (Part 1)
   8 Unions Data + Details Modal
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    console.log('🏛️ Union Directory Initializing...');

    // ============================================================
    // UNION DATA (8 Unions)
    // ============================================================
    const unionData = {

        // ========================================================
        // 01 — MATARBARI
        // ========================================================
        matarbari: {
            number: '০১ নম্বর ইউনিয়ন',
            nameBn: 'মাতারবাড়ী ইউনিয়ন',
            nameEn: 'Matarbari Union',
            icon: '🏝️',
            intro: 'মাতারবাড়ী কক্সবাজার জেলার মহেশখালী উপজেলার একটি গুরুত্বপূর্ণ ও সম্ভাবনাময় উপকূলীয় ইউনিয়ন। বঙ্গোপসাগরঘেঁষা ভৌগোলিক অবস্থান, লবণ উৎপাদন, সামুদ্রিক মৎস্য আহরণ ও কৃষিনির্ভর ঐতিহ্যের পাশাপাশি বর্তমানে গভীর সমুদ্রবন্দর, বিদ্যুৎ উৎপাদন, জেটি, যোগাযোগ অবকাঠামো এবং শিল্পায়নভিত্তিক উন্নয়ন কার্যক্রমের কারণে মাতারবাড়ী জাতীয় অর্থনীতি ও উপকূলীয় উন্নয়নের একটি গুরুত্বপূর্ণ অঞ্চলে পরিণত হয়েছে।',
            general: [
                { label: 'ইউনিয়নের নাম', value: 'মাতারবাড়ী' },
                { label: 'ইউনিয়ন নম্বর', value: '১ নম্বর' },
                { label: 'উপজেলা', value: 'মহেশখালী' },
                { label: 'জেলা', value: 'কক্সবাজার' },
                { label: 'বিভাগ', value: 'চট্টগ্রাম' },
                { label: 'আয়তন', value: 'প্রায় ১২ বর্গকিলোমিটার' },
                { label: 'জনসংখ্যা', value: 'প্রায় ৮০,০০০ জন*' },
                { label: 'মোট পরিবার', value: 'প্রায় ১১,৫০০টি' },
                { label: 'গ্রাম', value: 'প্রোফাইলে ২৫টি*' },
                { label: 'মৌজা', value: '১টি' },
                { label: 'হাট/বাজার', value: '৩টি' },
                { label: 'মোট ভোটার', value: '৪০,৯১৯ জন' }
            ],
            history: 'মাতারবাড়ী একটি দীর্ঘদিনের ঐতিহ্যবাহী উপকূলীয় জনপদ। স্থানীয় মানুষের জীবন ও অর্থনীতি ঐতিহাসিকভাবে লবণ উৎপাদন, কৃষিকাজ, মৎস্য আহরণ, নৌযাননির্ভর যোগাযোগ এবং স্থানীয় ব্যবসা-বাণিজ্যের সঙ্গে যুক্ত। সময়ের সঙ্গে মাতারবাড়ীতে বিভিন্ন গ্রাম, বাজার, শিক্ষা প্রতিষ্ঠান, ধর্মীয় প্রতিষ্ঠান এবং স্থানীয় প্রশাসনিক অবকাঠামোর বিকাশ ঘটে।',
            modern: ['⚓ গভীর সমুদ্রবন্দর', '⚡ বিদ্যুৎ উৎপাদন', '🏗️ জেটি ও অবকাঠামো', '🛣️ সড়ক যোগাযোগ', '🏭 শিল্পায়নের সম্ভাবনা', '👥 কর্মসংস্থানের সম্ভাবনা', '💼 বিনিয়োগের সুযোগ'],
            education: [
                { label: 'শিক্ষার হার', value: '৫২%*' },
                { label: 'সরকারি প্রাথমিক বিদ্যালয়', value: '৯টি' },
                { label: 'উচ্চ বিদ্যালয়', value: '৩টি' },
                { label: 'সরকারি মাদ্রাসা', value: '২টি' },
                { label: 'বেসরকারি মাদ্রাসা', value: '৭টি' }
            ],
            villages: ['সিকদারপাড়া', 'উত্তর সিকদারপাড়া', 'পশ্চিম সিকদারপাড়া', 'বান্ডি সিকদারপাড়া', 'পূর্বপাড়া', 'খন্দার বিল', 'উত্তর রাজঘাট', 'দক্ষিণ রাজঘাট', 'বিলপাড়া', 'সাতঘরপাড়া', 'লাইল্যাঘোনা', 'মনহাজিরপাড়া', 'মিয়াজিরপাড়া', 'উত্তর মিয়াজিরপাড়া', 'বলিরপাড়া', 'তিতামাঝিরপাড়া', 'মাইজপাড়া', 'মাঝের ডেইল', 'ফুলজান মোরা', 'নয়াপাড়া', 'মশরফআলী সিকদারপাড়া', 'হংসমিয়াজিরপাড়া', 'মগডেইল', 'সরদারপাড়া', 'সাইরার ডেইল', 'হেটপাড়া'],
            mapUrl: 'https://www.google.com/maps/search/?api=1&query=Matarbari%20Union%2C%20Maheshkhali%2C%20Cox%27s%20Bazar%2C%20Bangladesh'
        },

        // ========================================================
        // 02 — DHALGHATA
        // ========================================================
        dhalghata: {
            number: '০২ নম্বর ইউনিয়ন',
            nameBn: 'ধলঘাটা ইউনিয়ন',
            nameEn: 'Dhalghata Union',
            icon: '🌊',
            intro: 'ধলঘাটা ইউনিয়ন মহেশখালী উপজেলার একটি গুরুত্বপূর্ণ উপকূলীয় ইউনিয়ন। কক্সবাজার জেলার মহেশখালী উপজেলার উপকূলীয় অঞ্চলে অবস্থিত এই জনপদটি সমুদ্র, নদী, লবণ উৎপাদন, মৎস্যসম্পদ, কৃষি, স্থানীয় বাজার ও মানুষের জীবনযাত্রার সমন্বয়ে নিজস্ব বৈশিষ্ট্য ধারণ করে আছে।',
            general: [
                { label: 'ইউনিয়নের নাম', value: 'ধলঘাটা' },
                { label: 'উপজেলা', value: 'মহেশখালী' },
                { label: 'জেলা', value: 'কক্সবাজার' },
                { label: 'বিভাগ', value: 'চট্টগ্রাম' },
                { label: 'আয়তন', value: 'প্রায় ২১.৬৭ বর্গকিলোমিটার' },
                { label: 'জনসংখ্যা', value: 'প্রায় ২০,০০০ জন*' },
                { label: 'পুরুষ', value: '১১,৫৬৪ জন*' },
                { label: 'নারী', value: '৯,৪৩৬ জন*' },
                { label: 'মোট ভোটার', value: '৮,৯৭০ জন*' },
                { label: 'গ্রাম', value: '১৪টি*' },
                { label: 'মৌজা', value: '১টি / ২টি*' },
                { label: 'হাট-বাজার', value: '৩টি*' }
            ],
            history: 'ধলঘাটা একটি পুরোনো উপকূলীয় জনপদ। স্থানীয় ঐতিহ্য ও প্রচলিত ইতিহাস অনুযায়ী, প্রায় ১৬৫৯ সালের দিকে এই দ্বীপাঞ্চলে বসতি গড়ে ওঠার কথা বলা হয়। ধলঘাটার নামকরণ সম্পর্কে স্থানীয়ভাবে একটি ঐতিহ্যবাহী কাহিনি প্রচলিত রয়েছে। কথিত আছে, ধলাবলী নামের একজন স্থানীয় বলী বা বীর একসময় সাপমারার ডেইল ঘাটে আটকে পড়া একটি নৌযান সরিয়ে দিতে সক্ষম হন।',
            modern: ['🌊 বঙ্গোপসাগর', '🏞️ কুহেলিয়া নদী', '🧂 লবণ মাঠ', '🌾 কৃষিজমি', '🐟 মাছ ও সামুদ্রিক সম্পদ', '🏘️ গ্রামীণ জনপদ'],
            education: [
                { label: 'সরকারি প্রাথমিক বিদ্যালয়', value: '৪টি' },
                { label: 'কমিউনিটি স্কুল', value: '২২টি' },
                { label: 'উচ্চ বিদ্যালয়', value: '১টি' },
                { label: 'দাখিল মাদ্রাসা', value: '১টি' },
                { label: 'আলিম মাদ্রাসা', value: '১টি' },
                { label: 'সাক্ষরতার হার', value: 'প্রায় ৬৩%*' }
            ],
            villages: [],
            mapUrl: 'https://www.google.com/maps/search/?api=1&query=Dhalghata%20Union%2C%20Maheshkhali%2C%20Cox%27s%20Bazar%2C%20Bangladesh'
        },

        // ========================================================
        // 03 — KALARMARCHHARA
        // ========================================================
        kalarmarchhara: {
            number: '০৩ নম্বর ইউনিয়ন',
            nameBn: 'কালারমারছড়া ইউনিয়ন',
            nameEn: 'Kalarmarchhara Union',
            icon: '🌿',
            intro: 'কালারমারছড়া ইউনিয়ন মহেশখালী উপজেলার একটি গুরুত্বপূর্ণ ও প্রাকৃতিক সৌন্দর্যমণ্ডিত উপকূলীয় ইউনিয়ন। পাহাড়, সমুদ্র, নদী, সবুজ প্রকৃতি, কৃষি, লবণ, চিংড়ি ও মৎস্যসম্পদের সমন্বয়ে গড়ে উঠেছে এই জনপদের স্বতন্ত্র জীবনধারা।',
            general: [
                { label: 'ইউনিয়নের নাম', value: 'কালারমারছড়া' },
                { label: 'ইউনিয়ন নম্বর', value: '৩ নং' },
                { label: 'উপজেলা', value: 'মহেশখালী' },
                { label: 'জেলা', value: 'কক্সবাজার' },
                { label: 'আয়তন', value: '২৮.৯৮ বর্গকিলোমিটার' },
                { label: 'জনসংখ্যা', value: '৬২,৪৮৩ জন*' },
                { label: 'মোট পরিবার', value: '৭,৯৬৬টি*' },
                { label: 'গ্রাম', value: '২১টি*' },
                { label: 'মৌজা', value: '৫টি*' },
                { label: 'মোট ভোটার', value: '৩১,৯৫৭ জন*' },
                { label: 'হাট-বাজার', value: '১২টি' },
                { label: 'মসজিদ', value: '৫২টি' }
            ],
            history: 'প্রদত্ত ঐতিহাসিক তথ্য অনুযায়ী, ১৯৩৭ সাল থেকে কালারমারছড়া ইউনিয়নের প্রশাসনিক যাত্রার উল্লেখ পাওয়া যায়। তৎকালীন ইউনিয়ন কাউন্সিলের প্রথম প্রেসিডেন্ট হিসেবে মৌলভী বদি উদ্দিন-এর নাম উল্লেখ করা হয়েছে। স্থানীয় জনশ্রুতি অনুযায়ী, ইউনিয়নের নামের উৎপত্তি "কালারমার" বা "কালু মার" নামের সঙ্গে সম্পর্কিত হতে পারে।',
            modern: ['🧂 লবণ উৎপাদন', '🦐 চিংড়ি চাষ', '🌾 কৃষি', '🐟 মৎস্য', '⛰️ মহেশখালীর পাহাড়', '🌊 বঙ্গোপসাগর'],
            education: [
                { label: 'সরকারি প্রাথমিক বিদ্যালয়', value: '১১টি' },
                { label: 'উচ্চ বিদ্যালয়', value: '২টি' },
                { label: 'দাখিল মাদ্রাসা', value: '৩টি' },
                { label: 'আলিম মাদ্রাসা', value: '১টি' },
                { label: 'শিক্ষার হার', value: '৩৭%*' }
            ],
            villages: ['আড়ারপাড়া', 'বাগমারা', 'বাঁশবাড়িয়া', 'বড়ইতলী', 'চৌধুরীপাড়া', 'দক্ষিণ চিংগড়া', 'পূর্ব চিংগড়া', 'গর্ববিবিরপাড়া', 'হাজীপাড়া', 'জাহাজপুরা', 'কালারমারছড়া', 'খরারবিল', 'লম্বাঘোনা', 'মাঝেরপাড়া', 'মুড়াপাড়া', 'নয়াপাড়া', 'পূর্ব নয়াপাড়া', 'সিকদারপাড়া', 'শাহপুরা', 'উত্তর চিংগড়া'],
            mapUrl: 'https://www.google.com/maps/search/?api=1&query=Kalarmarchhara%20Union%2C%20Maheshkhali%2C%20Cox%27s%20Bazar%2C%20Bangladesh'
        }

        // পর্ব ২ এ Shaplapur, Hoanak, Bara Maheshkhali আসবে
    };

    // ============================================================
    // MAKE unionData GLOBAL (for Part 2 & 3)
    // ============================================================
    window.MaheshkhaliUnions = unionData;

    console.log('✅ Union Data Part 1 Loaded (3 Unions)');
});/* ============================================================
   🤖 AI WORLD PANEL SYSTEM
   Open / Close / Search / Filter
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    console.log('🤖 AI World Panel Initializing...');

    // ============================================================
    // DOM ELEMENTS
    // ============================================================
    const aiCard = document.querySelector('.lh-cat-ai[data-category="ai"]');
    const aiOverlay = document.getElementById('aiWorldPanelOverlay');
    const aiClose = document.getElementById('aiPanelClose');
    const aiSearch = document.getElementById('aiSearchInput');
    const aiNavBtns = document.querySelectorAll('.ai-nav-btn');
    const aiSections = document.querySelectorAll('.ai-section');
    const aiLinkCards = document.querySelectorAll('.ai-link-card');

    if (!aiCard || !aiOverlay) {
        console.warn('⚠️ AI World elements not found');
        return;
    }

    // ============================================================
    // OPEN PANEL (Click on AI Card)
    // ============================================================
    aiCard.addEventListener('click', (e) => {
        e.stopPropagation();
        openAIPanel();
    });

    function openAIPanel() {
        aiOverlay.classList.add('open');
        aiOverlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';

        // Reset to "All" view
        resetFilters();

        // Focus search after animation
        setTimeout(() => {
            if (aiSearch) aiSearch.focus();
        }, 400);

        console.log('🤖 AI World Panel Opened');
    }

    // ============================================================
    // CLOSE PANEL
    // ============================================================
    function closeAIPanel() {
        aiOverlay.classList.remove('open');
        aiOverlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';

        // Clear search
        if (aiSearch) aiSearch.value = '';

        console.log('🤖 AI World Panel Closed');
    }

    // Close button
    if (aiClose) {
        aiClose.addEventListener('click', closeAIPanel);
    }

    // Backdrop click
    aiOverlay.addEventListener('click', (e) => {
        if (e.target === aiOverlay) {
            closeAIPanel();
        }
    });

    // ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && aiOverlay.classList.contains('open')) {
            closeAIPanel();
        }
    });

    // ============================================================
    // CATEGORY FILTER
    // ============================================================
    aiNavBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-ai-filter');

            // Update active button
            aiNavBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Filter sections
            aiSections.forEach(section => {
                const category = section.getAttribute('data-ai-category');

                if (filter === 'all' || category === filter) {
                    section.classList.remove('hidden');
                    section.style.animation = 'aiSectionFade 0.5s ease forwards';
                } else {
                    section.classList.add('hidden');
                }
            });

            // Clear search
            if (aiSearch) aiSearch.value = '';

            // Scroll to top
            const body = document.getElementById('aiPanelBody');
            if (body) body.scrollTop = 0;

            console.log(`🤖 Filter: ${filter}`);
        });
    });

    // ============================================================
    // SEARCH FUNCTIONALITY
    // ============================================================
    if (aiSearch) {
        aiSearch.addEventListener('input', () => {
            const query = aiSearch.value.trim().toLowerCase();

            // When searching, show all sections
            if (query.length > 0) {
                aiSections.forEach(section => section.classList.remove('hidden'));
            }

            // Filter link cards
            let visibleCount = 0;

            aiLinkCards.forEach(card => {
                const title = card.querySelector('.ai-link-info strong')?.textContent.toLowerCase() || '';
                const url = card.querySelector('.ai-link-info small')?.textContent.toLowerCase() || '';

                if (query === '' || title.includes(query) || url.includes(query)) {
                    card.style.display = 'flex';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });

            // Hide empty sections
            aiSections.forEach(section => {
                const visibleLinks = section.querySelectorAll('.ai-link-card:not([style*="display: none"])');
                if (query.length > 0 && visibleLinks.length === 0) {
                    section.classList.add('hidden');
                }
            });

            // Show "no results" if nothing matches
            let noResults = document.getElementById('aiNoResults');
            if (visibleCount === 0 && query.length > 0) {
                if (!noResults) {
                    noResults = document.createElement('div');
                    noResults.id = 'aiNoResults';
                    noResults.style.cssText = `
                        text-align: center;
                        padding: 40px 20px;
                        color: #D4AF37;
                        font-size: 1rem;
                        font-weight: 600;
                    `;
                    noResults.innerHTML = `
                        <div style="font-size:3rem; margin-bottom:15px;">🔍</div>
                        <div style="font-size:1.1rem; margin-bottom:8px;">কোনো ফলাফল নেই</div>
                        <div style="font-size:0.85rem; opacity:0.7; font-style:italic;">No results found</div>
                    `;
                    document.getElementById('aiPanelBody').appendChild(noResults);
                }
                noResults.style.display = 'block';
            } else if (noResults) {
                noResults.style.display = 'none';
            }

            console.log(`🔎 Search: "${query}" — ${visibleCount} results`);
        });

        // ESC to clear search
        aiSearch.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && aiSearch.value.length > 0) {
                e.stopPropagation();
                aiSearch.value = '';
                aiSearch.dispatchEvent(new Event('input'));
            }
        });
    }

    // ============================================================
    // RESET FILTERS
    // ============================================================
    function resetFilters() {
        // Reset nav
        aiNavBtns.forEach(b => b.classList.remove('active'));
        const allBtn = document.querySelector('.ai-nav-btn[data-ai-filter="all"]');
        if (allBtn) allBtn.classList.add('active');

        // Show all sections
        aiSections.forEach(section => {
            section.classList.remove('hidden');
            section.style.animation = 'aiSectionFade 0.5s ease forwards';
        });

        // Show all cards
        aiLinkCards.forEach(card => {
            card.style.display = 'flex';
        });

        // Clear search
        if (aiSearch) aiSearch.value = '';

        // Hide no results
        const noResults = document.getElementById('aiNoResults');
        if (noResults) noResults.style.display = 'none';

        // Scroll to top
        const body = document.getElementById('aiPanelBody');
        if (body) body.scrollTop = 0;
    }

    // ============================================================
    // LINK CARD CLICK — Track & Animate
    // ============================================================
    aiLinkCards.forEach(card => {
        card.addEventListener('click', () => {
            const name = card.querySelector('.ai-link-info strong')?.textContent || 'Link';
            console.log(`🔗 Opening: ${name}`);

            // Optional: Show toast
            if (typeof showToast === 'function') {
                const lang = localStorage.getItem('maheshkhali-lang') || 'bn';
                showToast(
                    lang === 'bn' 
                        ? `🔗 ${name} খোলা হচ্ছে...` 
                        : `🔗 Opening ${name}...`,
                    1500
                );
            }
        });
    });

    // ============================================================
    // KEYBOARD SHORTCUT — Ctrl + Shift + A
    // ============================================================
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.shiftKey && e.key === 'A') {
            e.preventDefault();
            if (aiOverlay.classList.contains('open')) {
                closeAIPanel();
            } else {
                openAIPanel();
            }
        }
    });

    // ============================================================
    // EXPORT
    // ============================================================
    window.MaheshkhaliAI = {
        open: openAIPanel,
        close: closeAIPanel,
        search: (query) => {
            if (aiSearch) {
                aiSearch.value = query;
                aiSearch.dispatchEvent(new Event('input'));
            }
        }
    };

    console.log('✅ AI World Panel Ready — Ctrl+Shift+A to open');
});/* =========================================================
   🧠 BS~9Q-5F MINDMAP METHOD — Panel Controller
   ========================================================= */

(function () {
    'use strict';

    // ---------- DOM Elements ----------
    const card       = document.querySelector('.lh-cat-card.lh-cat-bs9q');
    const overlay    = document.getElementById('bs9qPanelOverlay');
    const closeBtn   = document.getElementById('bs9qClose');
    const copyBtn    = document.getElementById('bs9qCopyBtn');
    const downloadBtn= document.getElementById('bs9qDownloadBtn');
    const shareBtn   = document.getElementById('bs9qShareBtn');
    const fullText   = document.getElementById('bs9qFullText');
    const body       = document.getElementById('bs9qBody');
    const navBtns    = document.querySelectorAll('.bs9q-nav-btn');

    // Safety check — প্যানেল না থাকলে কিছুই করবে না
    if (!overlay) return;

    // =========================================================
    // 1. OPEN PANEL
    // =========================================================
    function openPanel() {
        overlay.classList.add('bs9q-open');
        overlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        // ফোকাস ক্লোজ বাটনে নিয়ে যাও (accessibility)
        setTimeout(() => closeBtn?.focus(), 100);
    }

    // =========================================================
    // 2. CLOSE PANEL
    // =========================================================
    function closePanel() {
        overlay.classList.remove('bs9q-open');
        overlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        // ফোকাস কার্ডে ফিরিয়ে দাও
        card?.focus();
    }

    // কার্ডে ক্লিক → প্যানেল খোলো
    card?.addEventListener('click', openPanel);
    card?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openPanel();
        }
    });
    card?.setAttribute('tabindex', '0');
    card?.setAttribute('role', 'button');

    // ক্লোজ বাটন
    closeBtn?.addEventListener('click', closePanel);

    // Overlay-এর বাইরে ক্লিক → বন্ধ
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closePanel();
    });

    // ESC চাপলে → বন্ধ
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('bs9q-open')) {
            closePanel();
        }
    });

    // Focus trap — Tab চাপলে প্যানেলের ভিতরেই থাকবে
    overlay.addEventListener('keydown', (e) => {
        if (e.key !== 'Tab') return;
        const focusables = overlay.querySelectorAll(
            'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables.length) return;
        const first = focusables[0];
        const last  = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
        }
    });

    // =========================================================
    // 3. COPY FULL PROMPT
    // =========================================================
    copyBtn?.addEventListener('click', async () => {
        const label = copyBtn.querySelector('span:last-child');
        const original = label?.textContent || 'সম্পূর্ণ কপি';

        try {
            await navigator.clipboard.writeText(fullText.value);
            if (label) label.textContent = '✅ কপি হয়েছে!';
        } catch (err) {
            // Fallback — পুরনো ব্রাউজারের জন্য
            fullText.style.display = 'block';
            fullText.select();
            fullText.setSelectionRange(0, 999999);
            document.execCommand('copy');
            fullText.style.display = 'none';
            if (label) label.textContent = '✅ কপি হয়েছে!';
        }

        setTimeout(() => {
            if (label) label.textContent = original;
        }, 2000);
    });

    // =========================================================
    // 4. DOWNLOAD AS .TXT
    // =========================================================
    downloadBtn?.addEventListener('click', () => {
        const label = downloadBtn.querySelector('span:last-child');
        const original = label?.textContent || 'ডাউনলোড';

        const blob = new Blob([fullText.value], {
            type: 'text/plain;charset=utf-8'
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'BS-9Q-5F-Mindmap-Method.txt';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);

        if (label) label.textContent = '✅ ডাউনলোড হয়েছে!';
        setTimeout(() => {
            if (label) label.textContent = original;
        }, 2000);
    });

    // =========================================================
    // 5. SHARE
    // =========================================================
    shareBtn?.addEventListener('click', async () => {
        const label = shareBtn.querySelector('span:last-child');
        const original = label?.textContent || 'শেয়ার';
        const shareData = {
            title: 'BS~9Q-5F Mindmap Method™',
            text: 'Universal AI Master Command — v0.1',
            url: location.href
        };

        // Native share (mobile)
        if (navigator.share) {
            try {
                await navigator.share(shareData);
                return;
            } catch (err) {
                if (err.name === 'AbortError') return;
            }
        }

        // Fallback — লিংক কপি
        try {
            await navigator.clipboard.writeText(location.href);
            if (label) label.textContent = '🔗 লিংক কপি হয়েছে!';
        } catch {
            if (label) label.textContent = '❌ কপি ব্যর্থ';
        }
        setTimeout(() => {
            if (label) label.textContent = original;
        }, 2000);
    });

    // =========================================================
    // 6. NAVIGATION (Section Jump)
    // =========================================================
    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.dataset.bs9qJump;
            const target = body.querySelector(`[data-bs9q-section="${targetId}"]`);
            if (target) {
                const offsetTop = target.offsetTop - body.offsetTop - 10;
                body.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }
            // Active class আপডেট
            navBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // =========================================================
    // 7. SCROLL SPY (Active nav button on scroll)
    // =========================================================
    let scrollTimer = null;
    body?.addEventListener('scroll', () => {
        if (scrollTimer) return;
        scrollTimer = setTimeout(() => {
            scrollTimer = null;

            const sections = body.querySelectorAll('[data-bs9q-section]');
            const scrollPos = body.scrollTop + 80;
            let current = '';

            sections.forEach(sec => {
                if (scrollPos >= sec.offsetTop) {
                    current = sec.dataset.bs9qSection;
                }
            });

            if (current) {
                navBtns.forEach(btn => {
                    btn.classList.toggle('active', btn.dataset.bs9qJump === current);
                });
            }
        }, 100);
    });

    // =========================================================
    // 8. COMMAND TAG CLICK → কপি
    // =========================================================
    document.querySelectorAll('.bs9q-cmd-tags code, .bs9q-cmd-list code').forEach(code => {
        code.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(code.textContent);
                const original = code.textContent;
                code.textContent = '✅ কপি';
                setTimeout(() => { code.textContent = original; }, 1000);
            } catch {
                // Fallback
                const temp = document.createElement('textarea');
                temp.value = code.textContent;
                document.body.appendChild(temp);
                temp.select();
                document.execCommand('copy');
                document.body.removeChild(temp);
            }
        });
        code.style.cursor = 'pointer';
        code.title = 'ক্লিক করে কপি করুন';
    });

    // =========================================================
    // 9. SCROLL TO TOP (Optional — প্যানেল খোলার সময়)
    // =========================================================
    card?.addEventListener('click', () => {
        if (body) body.scrollTop = 0;
        // প্রথম nav button active
        navBtns.forEach(b => b.classList.remove('active'));
        navBtns[0]?.classList.add('active');
    });

})();/* =========================================================
   ⌨️ SKILLS LAB — Typing Master Controller
   ========================================================= */
(function () {
    'use strict';

    // =========================================================
    // BACKEND DATA (এখানেই সব ডেটা)
    // =========================================================
    const DATA = {
        practiceLines: [
            "The quick brown fox jumps over the lazy dog",
            "Pack my box with five dozen liquor jugs",
            "How vexingly quick daft zebras jump",
            "The five boxing wizards jump quickly",
            "Sphinx of black quartz, judge my vow",
            "Jackdaws love my big sphinx of quartz",
            "A quick brown fox jumps over the lazy dog",
            "Bright vixens jump; dozy fowl quack",
            "Waltz, bad nymph, for quick jigs vex",
            "Jived fox nymph grabs quick waltz"
        ],
        banglaPractice: [
            "আমি বাংলায় টাইপিং শিখছি",
            "দ্রুত টাইপিং একটি গুরুত্বপূর্ণ স্কিল",
            "প্রতিদিন প্র্যাকটিস করলে দক্ষতা বাড়ে",
            "কীবোর্ডে সঠিক আঙুল ব্যবহার করুন",
            "টাইপিং শিখতে ধৈর্য প্রয়োজন"
        ],
        lessons: [
            { id: 1, title: "Home Row Basics", titleBn: "হোম রো বেসিক", desc: "ASDF JKL; — আঙুলের সঠিক অবস্থান", keys: "asdf jkl;", duration: "10 min" },
            { id: 2, title: "Top Row", titleBn: "টপ রো", desc: "QWERTY UIOP — উপরের সারি", keys: "qwerty uiop", duration: "15 min" },
            { id: 3, title: "Bottom Row", titleBn: "বটম রো", desc: "ZXCVBNM — নিচের সারি", keys: "zxcvbnm", duration: "15 min" },
            { id: 4, title: "Numbers & Symbols", titleBn: "সংখ্যা ও চিহ্ন", desc: "1234567890 এবং !@#$%", keys: "1234567890", duration: "20 min" },
            { id: 5, title: "Speed Building", titleBn: "স্পিড বিল্ডিং", desc: "৪০+ WPM লক্ষ্য", keys: "mixed", duration: "30 min" },
            { id: 6, title: "Bangla Typing", titleBn: "বাংলা টাইপিং", desc: "অ আ ক খ — অভ্র/রিদ্মিক", keys: "bangla", duration: "25 min" }
        ],
        tools: [
            { name: "10FastFingers", nameBn: "১০ ফাস্ট ফিঙ্গার্স", url: "https://10fastfingers.com", desc: "Popular typing speed test", icon: "⚡" },
            { name: "Typing.com", nameBn: "টাইপিং.কম", url: "https://typing.com", desc: "Free typing lessons", icon: "🎓" },
            { name: "Keybr", nameBn: "কীব্র", url: "https://keybr.com", desc: "Adaptive typing practice", icon: "🎯" },
            { name: "Monkeytype", nameBn: "মনকিটাইপ", url: "https://monkeytype.com", desc: "Minimalist typing test", icon: "🐒" },
            { name: "TypingClub", nameBn: "টাইপিং ক্লাব", url: "https://typingclub.com", desc: "Structured lessons", icon: "📚" },
            { name: "Ratatype", nameBn: "রেটাটাইপ", url: "https://ratatype.com", desc: "Typing tutor & certificates", icon: "🏆" },
            { name: "Nitro Type", nameBn: "নাইট্রো টাইপ", url: "https://nitrotype.com", desc: "Gamified typing", icon: "🏎️" },
            { name: "Bangla Typing", nameBn: "বাংলা টাইপিং", url: "https://www.banglatyping.com", desc: "বাংলা টাইপিং প্র্যাকটিস", icon: "🇧🇩" }
        ],
        tips: [
            "প্রতিদিন অন্তত ১৫ মিনিট প্র্যাকটিস করুন",
            "সঠিক আঙুল সঠিক কী-তে রাখুন (Home Row: ASDF JKL;)",
            "স্ক্রিনের দিকে নয়, কীবোর্ডের দিকে তাকান (touch typing)",
            "ভুল করলে থামবেন না, চালিয়ে যান",
            "গতি নয়, প্রথমে নির্ভুলতা শিখুন",
            "পিঠ সোজা রেখে বসুন, কব্জি সোজা রাখুন",
            "প্রতি সপ্তাহে নিজের WPM মাপুন এবং লক্ষ্য বাড়ান",
            "বাংলা টাইপিং শিখতে Avro বা Ridmik কীবোর্ড ব্যবহার করুন"
        ]
    };

    // =========================================================
    // DOM
    // =========================================================
    const card       = document.querySelector('.lh-cat-card.lh-cat-skills');
    const overlay    = document.getElementById('skillsPanelOverlay');
    const closeBtn   = document.getElementById('skillsClose');
    const body       = document.getElementById('skillsBody');
    const navBtns    = document.querySelectorAll('.skills-nav-btn');

    const display    = document.getElementById('typingDisplay');
    const input      = document.getElementById('typingInput');
    const startBtn   = document.getElementById('typingStart');
    const resetBtn   = document.getElementById('typingReset');
    const nextBtn    = document.getElementById('typingNext');
    const modeSelect = document.getElementById('typingMode');

    const wpmEl      = document.getElementById('typingWPM');
    const accEl      = document.getElementById('typingAccuracy');
    const timeEl     = document.getElementById('typingTime');
    const errEl      = document.getElementById('typingErrors');

    const resultBox  = document.getElementById('typingResult');
    const resultWPM  = document.getElementById('resultWPM');
    const resultAcc  = document.getElementById('resultAcc');
    const resultTime = document.getElementById('resultTime');
    const resultMsg  = document.getElementById('resultMsg');

    const lessonsGrid= document.getElementById('lessonsGrid');
    const toolsGrid  = document.getElementById('toolsGrid');
    const tipsList   = document.getElementById('tipsList');

    if (!overlay) return;

    // =========================================================
    // STATE
    // =========================================================
    const state = {
        currentText: '',
        started: false,
        finished: false,
        startTime: 0,
        timer: null,
        errors: 0,
        totalTyped: 0,
        correctTyped: 0,
        mode: 'english',
        lineIndex: 0
    };

    // =========================================================
    // RENDER LESSONS / TOOLS / TIPS
    // =========================================================
    function renderLessons() {
        lessonsGrid.innerHTML = DATA.lessons.map(l => `
            <div class="lesson-card">
                <span class="lesson-num">Lesson ${l.id}</span>
                <span class="lesson-duration">${l.duration}</span>
                <h5>${l.titleBn || l.title}</h5>
                <p>${l.desc}</p>
                <span class="lesson-keys">${l.keys}</span>
            </div>
        `).join('');
    }

    function renderTools() {
        toolsGrid.innerHTML = DATA.tools.map(t => `
            <a class="tool-card" href="${t.url}" target="_blank" rel="noopener noreferrer">
                <span class="tool-icon">${t.icon}</span>
                <div class="tool-info">
                    <h6>${t.nameBn || t.name}</h6>
                    <small>${t.desc}</small>
                </div>
            </a>
        `).join('');
    }

    function renderTips() {
        tipsList.innerHTML = DATA.tips.map(t => `<li>${t}</li>`).join('');
    }

    renderLessons();
    renderTools();
    renderTips();

    // =========================================================
    // TYPING ENGINE
    // =========================================================
    function getLines() {
        return state.mode === 'bangla' ? DATA.banglaPractice : DATA.practiceLines;
    }

    function loadLine(index) {
        const lines = getLines();
        state.lineIndex = ((index % lines.length) + lines.length) % lines.length;
        state.currentText = lines[state.lineIndex];
        renderText();
    }

    function renderText() {
        const typed = input.value;
        display.innerHTML = '';

        for (let i = 0; i < state.currentText.length; i++) {
            const span = document.createElement('span');
            span.className = 'typing-char';
            span.textContent = state.currentText[i];

            if (i < typed.length) {
                span.classList.add(typed[i] === state.currentText[i] ? 'correct' : 'incorrect');
            } else if (i === typed.length && state.started) {
                span.classList.add('current');
            }
            display.appendChild(span);
        }
    }

    function startTest() {
        if (state.started) return;

        // নতুন লাইন লোড
        if (!state.currentText) loadLine(0);

        state.started = true;
        state.finished = false;
        state.startTime = Date.now();
        state.errors = 0;
        state.totalTyped = 0;
        state.correctTyped = 0;

        input.disabled = false;
        input.value = '';
        input.focus();

        resultBox.hidden = true;
        renderText();

        // Timer
        clearInterval(state.timer);
        state.timer = setInterval(updateStats, 200);
    }

    function resetTest() {
        clearInterval(state.timer);
        state.started = false;
        state.finished = false;
        state.startTime = 0;
        state.errors = 0;
        state.totalTyped = 0;
        state.correctTyped = 0;
        input.value = '';
        input.disabled = true;
        wpmEl.textContent = '0';
        accEl.textContent = '100%';
        timeEl.textContent = '0s';
        errEl.textContent = '0';
        resultBox.hidden = true;
        loadLine(state.lineIndex);
    }

    function nextLine() {
        resetTest();
        loadLine(state.lineIndex + 1);
        startBtn.textContent = '▶️ Start';
    }

    function updateStats() {
        if (!state.started) return;
        const elapsed = (Date.now() - state.startTime) / 1000;
        const minutes = elapsed / 60;

        const wpm = minutes > 0 ? Math.round((state.correctTyped / 5) / minutes) : 0;
        const acc = state.totalTyped > 0
            ? Math.round((state.correctTyped / state.totalTyped) * 100)
            : 100;

        wpmEl.textContent = wpm;
        accEl.textContent = acc + '%';
        timeEl.textContent = Math.round(elapsed) + 's';
        errEl.textContent = state.errors;
    }

    function finishTest() {
        state.started = false;
        state.finished = true;
        clearInterval(state.timer);

        const elapsed = (Date.now() - state.startTime) / 1000;
        const minutes = elapsed / 60;
        const wpm = minutes > 0 ? Math.round((state.correctTyped / 5) / minutes) : 0;
        const acc = state.totalTyped > 0
            ? Math.round((state.correctTyped / state.totalTyped) * 100)
            : 100;

        resultWPM.textContent = wpm;
        resultAcc.textContent = acc + '%';
        resultTime.textContent = Math.round(elapsed) + 's';

        let msg = '';
        if (wpm >= 80) msg = '🏆 অসাধারণ! আপনি প্রো লেভেলের টাইপিস্ট!';
        else if (wpm >= 60) msg = '🚀 চমৎকার! আপনি ফাস্ট টাইপার!';
        else if (wpm >= 40) msg = '👍 ভালো! আরেকটু প্র্যাকটিসে আরও ভালো হবে।';
        else if (wpm >= 20) msg = '💪 ভালো শুরু! প্রতিদিন প্র্যাকটিস করুন।';
        else msg = '🌱 শুরুটা হয়েছে! ধৈর্য ধরে প্র্যাকটিস করুন।';

        resultMsg.textContent = msg;
        resultBox.hidden = false;
        input.disabled = true;
        startBtn.textContent = '▶️ Start';
    }

    // =========================================================
    // INPUT HANDLER
    // =========================================================
    input.addEventListener('input', () => {
        if (!state.started) return;

        const typed = input.value;
        const target = state.currentText;

        // Count stats
        state.totalTyped = typed.length;
        state.correctTyped = 0;
        state.errors = 0;
        for (let i = 0; i < typed.length; i++) {
            if (typed[i] === target[i]) state.correctTyped++;
            else state.errors++;
        }

        renderText();
        updateStats();

        // Finished?
        if (typed.length >= target.length) {
            finishTest();
        }
    });

    // =========================================================
    // BUTTON EVENTS
    // =========================================================
    startBtn.addEventListener('click', startTest);
    resetBtn.addEventListener('click', resetTest);
    nextBtn.addEventListener('click', nextLine);

    modeSelect.addEventListener('change', () => {
        state.mode = modeSelect.value;
        resetTest();
    });

    // =========================================================
    // PANEL OPEN / CLOSE
    // =========================================================
    function openPanel() {
        overlay.classList.add('skills-open');
        overlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        setTimeout(() => closeBtn?.focus(), 100);
    }

    function closePanel() {
        overlay.classList.remove('skills-open');
        overlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        resetTest();
        card?.focus();
    }

    card?.addEventListener('click', openPanel);
    card?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openPanel();
        }
    });

    closeBtn?.addEventListener('click', closePanel);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) closePanel(); });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('skills-open')) closePanel();
    });

    // Focus trap
    overlay.addEventListener('keydown', (e) => {
        if (e.key !== 'Tab') return;
        const focusables = overlay.querySelectorAll(
            'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });

    // =========================================================
    // NAVIGATION
    // =========================================================
    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = body.querySelector(`[data-skills-section="${btn.dataset.skillsJump}"]`);
            if (target) {
                const offsetTop = target.offsetTop - body.offsetTop - 10;
                body.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }
            navBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // Scroll spy
    let scrollTimer = null;
    body?.addEventListener('scroll', () => {
        if (scrollTimer) return;
        scrollTimer = setTimeout(() => {
            scrollTimer = null;
            const sections = body.querySelectorAll('[data-skills-section]');
            const scrollPos = body.scrollTop + 80;
            let current = '';
            sections.forEach(sec => {
                if (scrollPos >= sec.offsetTop) current = sec.dataset.skillsSection;
            });
            if (current) {
                navBtns.forEach(btn => {
                    btn.classList.toggle('active', btn.dataset.skillsJump === current);
                });
            }
        }, 100);
    });

})();/* =========================================================
   💻 DEVELOPER LAB — Zero to Hero Controller
   ========================================================= */
(function () {
    'use strict';

    // =========================================================
    // DATA — সব ডেটা এখানেই (JSON লাগবে না)
    // =========================================================
    const DATA = {

        // ---------- ROADMAP ----------
        roadmap: [
            { step: "01", title: "Computer Basics", desc: "ফাইল, ফোল্ডার, ইন্টারনেট, ব্রাউজার, কীবোর্ড শর্টকাট — এগুলো না জানলে প্রোগ্রামিং কঠিন লাগবে।", tags: ["File System", "Browser", "Terminal Basics"] },
            { step: "02", title: "HTML — Structure", desc: "ওয়েবসাইটের কাঠামো। হেডিং, প্যারাগ্রাফ, লিংক, ছবি, ফর্ম — সব HTML দিয়ে। এটি দিয়ে শুরু করুন।", tags: ["Tags", "Elements", "Forms", "Semantic HTML"] },
            { step: "03", title: "CSS — Design", desc: "রঙ, ফন্ট, লেআউট, অ্যানিমেশন। Flexbox ও Grid শিখলে যেকোনো ডিজাইন করা যাবে।", tags: ["Colors", "Flexbox", "Grid", "Responsive"] },
            { step: "04", title: "JavaScript — Logic", desc: "ওয়েবসাইটে প্রাণ দেয়। বাটন ক্লিক, ফর্ম ভ্যালিডেশন, API কল — সব JS দিয়ে।", tags: ["Variables", "Functions", "DOM", "Fetch API"] },
            { step: "05", title: "Git & GitHub", desc: "কোডের ইতিহাস রাখা, টিমের সাথে কাজ করা, প্রজেক্ট হোস্ট করা। প্রতিটি ডেভেলপারের জন্য বাধ্যতামূলক।", tags: ["Git", "Commits", "Branches", "Pull Requests"] },
            { step: "06", title: "A Framework", desc: "React / Vue / Svelte — যেকোনো একটি। আধুনিক ওয়েব অ্যাপ বানাতে লাগবে।", tags: ["React", "Vue", "Components", "State"] },
            { step: "07", title: "Backend + Database", desc: "Node.js / Python (Django/Flask) / PHP (Laravel) + SQL/NoSQL। ডেটা সংরক্ষণ ও API বানানো শিখুন।", tags: ["Node.js", "Express", "MongoDB", "SQL"] },
            { step: "08", title: "Deploy & Ship", desc: "Netlify, Vercel, GitHub Pages — ফ্রিতে সাইট লাইভ করুন। ডোমেইন কিনে কাস্টম লিংক দিন।", tags: ["Netlify", "Vercel", "Domain", "DNS"] }
        ],

        // ---------- LANGUAGES ----------
        languages: [
            { name: "HTML", icon: "📄", color: "#e34f26", desc: "ওয়েবসাইটের কাঠামো ও কনটেন্ট।", tags: ["Frontend", "Markup"], level: "easy" },
            { name: "CSS", icon: "🎨", color: "#1572b6", desc: "ওয়েবসাইটের ডিজাইন ও লেআউট।", tags: ["Frontend", "Styling"], level: "easy" },
            { name: "JavaScript", icon: "🟨", color: "#f7df1e", desc: "ওয়েব, মোবাইল, ডেস্কটপ, গেম — সব জায়গায়।", tags: ["Frontend", "Backend", "Game"], level: "easy" },
            { name: "TypeScript", icon: "🔷", color: "#3178c6", desc: "JavaScript + Type Safety। বড় প্রজেক্টে ব্যবহৃত।", tags: ["Frontend", "Backend"], level: "medium" },
            { name: "Python", icon: "🐍", color: "#3776ab", desc: "Web, AI, Data Science, Automation, Game।", tags: ["Backend", "AI", "Data", "Game"], level: "easy" },
            { name: "PHP", icon: "🐘", color: "#777bb4", desc: "ওয়েবসাইটের সবচেয়ে জনপ্রিয় ব্যাকএন্ড ভাষা।", tags: ["Backend", "CMS"], level: "easy" },
            { name: "Java", icon: "☕", color: "#f89820", desc: "এন্টারপ্রাইজ সফটওয়্যার, Android App।", tags: ["Backend", "Android", "Enterprise"], level: "medium" },
            { name: "C#", icon: "🎯", color: "#68217a", desc: "Unity Game Engine, Windows Software।", tags: ["Game", "Software", "Backend"], level: "medium" },
            { name: "C++", icon: "⚡", color: "#00599c", desc: "High-performance Game, System Software।", tags: ["Game", "System"], level: "hard" },
            { name: "C", icon: "🔧", color: "#a8b9cc", desc: "Operating System, Embedded System।", tags: ["System", "Embedded"], level: "hard" },
            { name: "Dart", icon: "🎯", color: "#0175c2", desc: "Flutter দিয়ে cross-platform mobile app।", tags: ["Mobile", "Frontend"], level: "easy" },
            { name: "Kotlin", icon: "🤖", color: "#7f52ff", desc: "Android App-এর অফিসিয়াল ভাষা।", tags: ["Android", "Mobile"], level: "medium" },
            { name: "Swift", icon: "🍎", color: "#fa7343", desc: "iOS / macOS App।", tags: ["iOS", "Mobile"], level: "medium" },
            { name: "Go (Golang)", icon: "🐹", color: "#00add8", desc: "Backend, Cloud, DevOps — দ্রুত ও শক্তিশালী।", tags: ["Backend", "Cloud"], level: "medium" },
            { name: "Rust", icon: "🦀", color: "#dea584", desc: "Memory-safe System Programming।", tags: ["System", "Performance"], level: "hard" },
            { name: "SQL", icon: "🗄️", color: "#00758f", desc: "ডেটাবেস কোয়েরি — সব জায়গায় লাগে।", tags: ["Database", "Backend"], level: "easy" },
            { name: "R", icon: "📊", color: "#276dc3", desc: "Data Science, Statistics।", tags: ["Data", "Statistics"], level: "medium" },
            { name: "GDScript", icon: "🎮", color: "#478cbf", desc: "Godot Game Engine-এর স্ক্রিপ্ট।", tags: ["Game"], level: "easy" }
        ],

        // ---------- STACKS ----------
        stacks: [
            { name: "MERN", icon: "⚛️", color: "#61dafb", desc: "Modern full-stack JavaScript স্ট্যাক।", parts: ["MongoDB", "Express", "React", "Node.js"], best: "Web App, SPA" },
            { name: "MEAN", icon: "🅰️", color: "#dd0031", desc: "MERN-এর মতো, তবে Angular দিয়ে।", parts: ["MongoDB", "Express", "Angular", "Node.js"], best: "Enterprise Web App" },
            { name: "MEVN", icon: "💚", color: "#42b883", desc: "Vue.js ভিত্তিক JavaScript স্ট্যাক।", parts: ["MongoDB", "Express", "Vue", "Node.js"], best: "Modern Web App" },
            { name: "LAMP", icon: "🐧", color: "#f7b93e", desc: "ক্লাসিক PHP স্ট্যাক — সবচেয়ে জনপ্রিয়।", parts: ["Linux", "Apache", "MySQL", "PHP"], best: "Website, CMS" },
            { name: "LEMP", icon: "⚡", color: "#009639", desc: "LAMP-এর দ্রুত বিকল্প (Nginx সহ)।", parts: ["Linux", "Nginx", "MySQL", "PHP"], best: "High-traffic Site" },
            { name: "Laravel Stack", icon: "🔴", color: "#ff2d20", desc: "PHP-এর সেরা ফ্রেমওয়ার্ক।", parts: ["Laravel", "MySQL", "Blade", "Vue/React"], best: "Web App, SaaS" },
            { name: "Django Stack", icon: "🐍", color: "#092e20", desc: "Python-এর শক্তিশালী ফ্রেমওয়ার্ক।", parts: ["Django", "PostgreSQL", "DRF", "React"], best: "Web App, API, AI" },
            { name: "Next.js Stack", icon: "▲", color: "#000000", desc: "SEO-friendly React স্ট্যাক।", parts: ["Next.js", "React", "Prisma", "PostgreSQL"], best: "SEO Site, SaaS" },
            { name: "Flutter Stack", icon: "🎯", color: "#02569b", desc: "Cross-platform mobile app।", parts: ["Flutter", "Dart", "Firebase"], best: "Mobile App (iOS+Android)" },
            { name: "Unity Stack", icon: "🎮", color: "#000000", desc: "Game development স্ট্যাক।", parts: ["Unity", "C#", "Asset Store"], best: "2D/3D Game" },
            { name: "Unreal Stack", icon: "🎯", color: "#0e1128", desc: "High-end game engine।", parts: ["Unreal", "C++", "Blueprints"], best: "AAA Game" },
            { name: "T3 Stack", icon: "🔺", color: "#2596be", desc: "Type-safe modern full-stack।", parts: ["Next.js", "TypeScript", "tRPC", "Prisma"], best: "Modern SaaS" }
        ],

        // ---------- MUST-LEARN ----------
        common: [
            { rank: "#1", icon: "🟨", name: "JavaScript", desc: "এক ভাষায় Website + Software + Game — সব করা যায়।", uses: ["Website", "Software", "Game", "Mobile"] },
            { rank: "#2", icon: "🐍", name: "Python", desc: "Web + AI + Data + Game — সবচেয়ে versatile।", uses: ["Website", "AI", "Data", "Game"] },
            { rank: "#3", icon: "🎯", name: "C# + Unity", desc: "Game + Windows Software দুটোতেই সেরা।", uses: ["Game", "Software"] },
            { rank: "#4", icon: "🌐", name: "HTML + CSS", desc: "যেকোনো ওয়েব ডেভেলপমেন্টের ভিত্তি।", uses: ["Website", "Design"] },
            { rank: "#5", icon: "🗄️", name: "SQL", desc: "যেকোনো ডেটা-ভিত্তিক অ্যাপে লাগে।", uses: ["Database", "Backend"] },
            { rank: "#6", icon: "🐙", name: "Git + GitHub", desc: "প্রতিটি ডেভেলপারের বাধ্যতামূলক স্কিল।", uses: ["Version Control", "Collab"] }
        ],

        // ---------- LEARN PLATFORMS ----------
        learn: [
            { name: "W3Schools", bn: "ডব্লিউ৩ স্কুল", url: "https://www.w3schools.com", desc: "HTML, CSS, JS, Python — সব বেসিক উদাহরণসহ", icon: "🌐", badge: "free" },
            { name: "FreeCodeCamp", bn: "ফ্রি কোড ক্যাম্প", url: "https://www.freecodecamp.org", desc: "সম্পূর্ণ ফ্রি কোর্স + সার্টিফিকেট", icon: "🔥", badge: "free" },
            { name: "MDN Web Docs", bn: "এমডিএন ডকস", url: "https://developer.mozilla.org", desc: "ওয়েব ডেভেলপমেন্টের অফিসিয়াল ডকুমেন্টেশন", icon: "📘", badge: "free" },
            { name: "Codecademy", bn: "কোড একাডেমি", url: "https://www.codecademy.com", desc: "ইন্টারঅ্যাকটিভ কোডিং কোর্স", icon: "🎓", badge: "free" },
            { name: "Khan Academy", bn: "খান একাডেমি", url: "https://www.khanacademy.org/computing", desc: "কম্পিউটার সায়েন্স বেসিক", icon: "🧪", badge: "free" },
            { name: "The Odin Project", bn: "ওডিন প্রজেক্ট", url: "https://www.theodinproject.com", desc: "সম্পূর্ণ ফুল-স্ট্যাক কারিকুলাম", icon: "⚔️", badge: "free" },
            { name: "Coursera", bn: "কোর্সেরা", url: "https://www.coursera.org", desc: "ইউনিভার্সিটি কোর্স (কিছু ফ্রি)", icon: "🎯", badge: "paid" },
            { name: "Udemy", bn: "ইউডেমি", url: "https://www.udemy.com", desc: "বিশাল কোর্স লাইব্রেরি", icon: "🎬", badge: "paid" }
        ],

        // ---------- EDITORS ----------
        editors: [
            { name: "VS Code", url: "https://code.visualstudio.com", desc: "সবচেয়ে জনপ্রিয় ফ্রি এডিটর", icon: "💙" },
            { name: "Cursor", url: "https://cursor.com", desc: "AI-পাওয়ার্ড কোড এডিটর", icon: "🤖" },
            { name: "Sublime Text", url: "https://www.sublimetext.com", desc: "দ্রুত ও হালকা", icon: "⚡" },
            { name: "WebStorm", url: "https://www.jetbrains.com/webstorm", desc: "জেটব্রেইনসের পেইড IDE", icon: "🌊" },
            { name: "PyCharm", url: "https://www.jetbrains.com/pycharm", desc: "Python-এর জন্য সেরা IDE", icon: "🐍" },
            { name: "Replit", url: "https://replit.com", desc: "ব্রাউজারে কোড লিখুন", icon: "🌐" },
            { name: "CodePen", url: "https://codepen.io", desc: "HTML/CSS/JS টেস্ট করার প্লে গ্রাউন্ড", icon: "✏️" },
            { name: "StackBlitz", url: "https://stackblitz.com", desc: "ব্রাউজারে ফুল প্রজেক্ট", icon: "⚡" }
        ],

        // ---------- GITHUB ----------
        github: [
            { name: "GitHub", url: "https://github.com", desc: "বিশ্বের সবচেয়ে বড় কোড হোস্টিং", icon: "🐙" },
            { name: "GitLab", url: "https://gitlab.com", desc: "GitHub-এর বিকল্প, CI/CD সহ", icon: "🦊" },
            { name: "Bitbucket", url: "https://bitbucket.org", desc: "Atlassian-এর Git হোস্টিং", icon: "🪣" },
            { name: "GitHub Pages", url: "https://pages.github.com", desc: "ফ্রি স্ট্যাটিক হোস্টিং", icon: "📄" },
            { name: "GitHub Student Pack", url: "https://education.github.com/pack", desc: "স্টুডেন্টদের জন্য ফ্রি টুলস", icon: "🎒" },
            { name: "Git Docs", url: "https://git-scm.com/doc", desc: "Git-এর অফিসিয়াল ডকস", icon: "📘" }
        ],

        // ---------- HOSTING ----------
        hosting: [
            { name: "Netlify", url: "https://netlify.com", desc: "স্ট্যাটিক সাইটের জন্য সেরা ফ্রি হোস্টিং", icon: "🌐", badge: "free" },
            { name: "Vercel", url: "https://vercel.com", desc: "Next.js/React অ্যাপের জন্য ফ্রি", icon: "▲", badge: "free" },
            { name: "GitHub Pages", url: "https://pages.github.com", desc: "GitHub রিপো থেকে সরাসরি সাইট", icon: "📄", badge: "free" },
            { name: "Cloudflare Pages", url: "https://pages.cloudflare.com", desc: "ফ্রি + সুপারফাস্ট CDN", icon: "☁️", badge: "free" },
            { name: "Render", url: "https://render.com", desc: "ফুল-স্ট্যাক অ্যাপ হোস্টিং", icon: "🎨", badge: "free" },
            { name: "Railway", url: "https://railway.app", desc: "ব্যাকএন্ড হোস্টিং", icon: "🚂", badge: "free" },
            { name: "Freenom", url: "https://www.freenom.com", desc: "ফ্রি ডোমেইন (.tk, .ml, .ga)", icon: "🆓", badge: "free" },
            { name: "Namecheap", url: "https://www.namecheap.com", desc: "সস্তা ডোমেইন রেজিস্ট্রার", icon: "💳", badge: "paid" }
        ],

        // ---------- CMS ----------
        cms: [
            { name: "WordPress", url: "https://wordpress.org", desc: "বিশ্বের ৪৩% সাইট WordPress-এ", icon: "📰" },
            { name: "WordPress.com", url: "https://wordpress.com", desc: "হোস্টেড WordPress — সহজ", icon: "☁️" },
            { name: "Elementor", url: "https://elementor.com", desc: "WordPress-এর ড্র্যাগ-ড্রপ বিল্ডার", icon: "🎨" },
            { name: "WooCommerce", url: "https://woocommerce.com", desc: "WordPress দিয়ে ই-কমার্স", icon: "🛒" },
            { name: "Pantheon", url: "https://pantheon.io", desc: "WordPress/Drupal হোস্টিং", icon: "⚡" },
            { name: "Ghost", url: "https://ghost.org", desc: "ব্লগ ও পাবলিশিং CMS", icon: "👻" },
            { name: "Strapi", url: "https://strapi.io", desc: "Headless CMS (Node.js)", icon: "🚀" },
            { name: "Sanity", url: "https://www.sanity.io", desc: "Modern Headless CMS", icon: "🟥" }
        ],

        // ---------- BUILD / PROJECTS ----------
        build: [
            { name: "Portfolio Website", bn: "পোর্টফোলিও সাইট", desc: "নিজের পরিচয়, স্কিল, প্রজেক্ট", level: "beginner", icon: "👤", stack: "HTML/CSS/JS" },
            { name: "To-Do App", bn: "টু-ডু অ্যাপ", desc: "টাস্ক যোগ, ডিলিট, সেভ", level: "beginner", icon: "✅", stack: "React / Vue" },
            { name: "Weather App", bn: "ওয়েদার অ্যাপ", desc: "API থেকে আবহাওয়া দেখাবে", level: "beginner", icon: "🌤️", stack: "JS + API" },
            { name: "Calculator", bn: "ক্যালকুলেটর", desc: "বেসিক হিসাব", level: "beginner", icon: "🧮", stack: "JS" },
            { name: "Blog Site", bn: "ব্লগ সাইট", desc: "পোস্ট লেখা, দেখা, কমেন্ট", level: "intermediate", icon: "📝", stack: "MERN / Laravel" },
            { name: "E-commerce Store", bn: "ই-কমার্স স্টোর", desc: "প্রোডাক্ট, কার্ট, পেমেন্ট", level: "intermediate", icon: "🛒", stack: "MERN / WooCommerce" },
            { name: "Chat App", bn: "চ্যাট অ্যাপ", desc: "রিয়েল-টাইম মেসেজিং", level: "intermediate", icon: "💬", stack: "React + Socket.io" },
            { name: "Note App", bn: "নোট অ্যাপ", desc: "নোট লেখা, সার্চ, ট্যাগ", level: "beginner", icon: "📒", stack: "React + Firebase" },
            { name: "2D Game", bn: "২ডি গেম", desc: "Pong, Snake, Flappy Bird", level: "intermediate", icon: "🎮", stack: "Phaser / Unity" },
            { name: "Mobile App", bn: "মোবাইল অ্যাপ", desc: "Cross-platform app", level: "advanced", icon: "📱", stack: "Flutter / React Native" },
            { name: "AI Chatbot", bn: "AI চ্যাটবট", desc: "OpenAI API দিয়ে চ্যাটবট", level: "advanced", icon: "🤖", stack: "Python + OpenAI" },
            { name: "SaaS App", bn: "SaaS অ্যাপ", desc: "সাবস্ক্রিপশন ভিত্তিক সার্ভিস", level: "advanced", icon: "💼", stack: "MERN / T3 Stack" }
        ]
    };

    // =========================================================
    // DOM
    // =========================================================
    const card    = document.querySelector('.lh-cat-card.lh-cat-dev');
    const overlay = document.getElementById('devPanelOverlay');
    const closeBtn= document.getElementById('devClose');
    const body    = document.getElementById('devBody');
    const navBtns = document.querySelectorAll('.dev-nav-btn');

    if (!overlay) return;

    // =========================================================
    // RENDER HELPERS
    // =========================================================
    function el(tag, className, html) {
        const e = document.createElement(tag);
        if (className) e.className = className;
        if (html) e.innerHTML = html;
        return e;
    }

    // ---------- ROADMAP ----------
    function renderRoadmap() {
        const box = document.getElementById('devRoadmap');
        if (!box) return;
        box.innerHTML = DATA.roadmap.map(r => `
            <div class="dev-roadmap-item">
                <span class="dev-roadmap-num">${r.step}</span>
                <h5>${r.title}</h5>
                <p>${r.desc}</p>
                <div class="dev-roadmap-tags">
                    ${r.tags.map(t => `<span>${t}</span>`).join('')}
                </div>
            </div>
        `).join('');
    }

    // ---------- LANGUAGES ----------
    function renderLanguages() {
        const box = document.getElementById('devLangGrid');
        if (!box) return;
        box.innerHTML = DATA.languages.map(l => `
            <div class="dev-lang-card" style="--lang-color:${l.color}">
                <span class="dev-lang-level ${l.level === 'easy' ? '' : l.level}">
                    ${l.level === 'easy' ? '🟢 Easy' : l.level === 'medium' ? '🟡 Medium' : '🔴 Hard'}
                </span>
                <div class="dev-lang-head">
                    <span class="dev-lang-icon">${l.icon}</span>
                    <span class="dev-lang-name">${l.name}</span>
                </div>
                <p class="dev-lang-desc">${l.desc}</p>
                <div class="dev-lang-tags">
                    ${l.tags.map(t => `<span>${t}</span>`).join('')}
                </div>
            </div>
        `).join('');
    }

    // ---------- STACKS ----------
    function renderStacks() {
        const box = document.getElementById('devStackGrid');
        if (!box) return;
        box.innerHTML = DATA.stacks.map(s => `
            <div class="dev-stack-card" style="--stack-color:${s.color}">
                <div class="dev-stack-head">
                    <span class="dev-stack-icon">${s.icon}</span>
                    <span class="dev-stack-name">${s.name}</span>
                </div>
                <p class="dev-stack-desc">${s.desc}</p>
                <div class="dev-stack-parts">
                    ${s.parts.map(p => `<span>${p}</span>`).join('')}
                </div>
                <div class="dev-stack-best">🎯 <b>Best for:</b> ${s.best}</div>
            </div>
        `).join('');
    }

    // ---------- COMMON / MUST-LEARN ----------
    function renderCommon() {
        const box = document.getElementById('devCommonGrid');
        if (!box) return;
        box.innerHTML = DATA.common.map(c => `
            <div class="dev-common-card">
                <span class="dev-common-rank">${c.rank}</span>
                <span class="dev-common-icon">${c.icon}</span>
                <h5>${c.name}</h5>
                <p>${c.desc}</p>
                <div class="dev-common-uses">
                    ${c.uses.map(u => `<span>${u}</span>`).join('')}
                </div>
            </div>
        `).join('');
    }

    // ---------- GENERIC CARD RENDERER ----------
    function renderResCards(containerId, items, opts) {
        const box = document.getElementById(containerId);
        if (!box) return;
        const { external = true, showBadge = false, bn = false } = opts || {};
        box.innerHTML = items.map(item => {
            const tag = external ? 'a' : 'div';
            const attrs = external
                ? `href="${item.url}" target="_blank" rel="noopener noreferrer"`
                : '';
            const badge = showBadge && item.badge
                ? `<span class="dev-res-badge ${item.badge}">${item.badge === 'free' ? '🆓 Free' : '💎 Paid'}</span>`
                : '';
            const title = bn && item.bn ? item.bn : item.name;
            return `
                <${tag} class="dev-res-card" ${attrs}>
                    <div class="dev-res-head">
                        <span class="dev-res-icon">${item.icon}</span>
                        <span class="dev-res-title">${title}</span>
                    </div>
                    <p class="dev-res-desc">${item.desc}</p>
                    ${badge}
                </${tag}>
            `;
        }).join('');
    }

    // ---------- BUILD CARDS (special) ----------
    function renderBuild() {
        const box = document.getElementById('devBuildGrid');
        if (!box) return;
        const levelColor = {
            beginner: '#22c55e',
            intermediate: '#f59e0b',
            advanced: '#ef4444'
        };
        box.innerHTML = DATA.build.map(b => `
            <div class="dev-res-card" style="border-left:3px solid ${levelColor[b.level]}">
                <div class="dev-res-head">
                    <span class="dev-res-icon">${b.icon}</span>
                    <span class="dev-res-title">${b.bn}</span>
                </div>
                <p class="dev-res-desc">${b.desc}</p>
                <div class="dev-res-head" style="gap:5px;flex-wrap:wrap">
                    <span class="dev-res-badge">${b.stack}</span>
                    <span class="dev-res-badge ${b.level === 'beginner' ? 'free' : b.level === 'intermediate' ? 'paid' : ''}">
                        ${b.level === 'beginner' ? '🟢 Beginner' : b.level === 'intermediate' ? '🟡 Intermediate' : '🔴 Advanced'}
                    </span>
                </div>
            </div>
        `).join('');
    }

    // =========================================================
    // RENDER ALL
    // =========================================================
    renderRoadmap();
    renderLanguages();
    renderStacks();
    renderCommon();
    renderResCards('devLearnGrid', DATA.learn, { showBadge: true, bn: true });
    renderResCards('devEditorGrid', DATA.editors, { showBadge: false });
    renderResCards('devGithubGrid', DATA.github, { showBadge: false });
    renderResCards('devHostingGrid', DATA.hosting, { showBadge: true });
    renderResCards('devCmsGrid', DATA.cms, { showBadge: false });
    renderBuild();

    // =========================================================
    // PANEL OPEN / CLOSE
    // =========================================================
    function openPanel() {
        overlay.classList.add('dev-open');
        overlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        setTimeout(() => closeBtn?.focus(), 100);
    }

    function closePanel() {
        overlay.classList.remove('dev-open');
        overlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        card?.focus();
    }

    card?.addEventListener('click', openPanel);
    card?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openPanel();
        }
    });

    closeBtn?.addEventListener('click', closePanel);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closePanel();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('dev-open')) closePanel();
    });

    // Focus trap
    overlay.addEventListener('keydown', (e) => {
        if (e.key !== 'Tab') return;
        const focusables = overlay.querySelectorAll(
            'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables.length) return;
        const first = focusables[0];
        const last  = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
            e.preventDefault(); last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault(); first.focus();
        }
    });

    // =========================================================
    // NAVIGATION (Section Jump)
    // =========================================================
    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = body.querySelector(`[data-dev-section="${btn.dataset.devJump}"]`);
            if (target) {
                const offsetTop = target.offsetTop - body.offsetTop - 10;
                body.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }
            navBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // =========================================================
    // SCROLL SPY
    // =========================================================
    let scrollTimer = null;
    body?.addEventListener('scroll', () => {
        if (scrollTimer) return;
        scrollTimer = setTimeout(() => {
            scrollTimer = null;
            const sections = body.querySelectorAll('[data-dev-section]');
            const scrollPos = body.scrollTop + 80;
            let current = '';
            sections.forEach(sec => {
                if (scrollPos >= sec.offsetTop) current = sec.dataset.devSection;
            });
            if (current) {
                navBtns.forEach(btn => {
                    btn.classList.toggle('active', btn.dataset.devJump === current);
                });
            }
        }, 100);
    });

})();/* =========================================================
   🔬 RESEARCH LAB — Complete Toolkit Controller
   ========================================================= */
(function () {
    'use strict';

    // =========================================================
    // DATA — সব ডেটা এখানেই
    // =========================================================
    const DATA = {

        // ---------- RESEARCH PROCESS ----------
        process: [
            { step: "01", title: "Topic Selection", bn: "বিষয় নির্বাচন", desc: "আগ্রহ, সুযোগ, গুরুত্ব — তিনটি বিষয় মিলিয়ে টপিক বাছুন।", tags: ["Interest", "Feasibility", "Relevance"] },
            { step: "02", title: "Literature Review", bn: "সাহিত্য পর্যালোচনা", desc: "আগে কী কী গবেষণা হয়েছে তা জানুন। গ্যাপ খুঁজুন।", tags: ["Google Scholar", "Scopus", "Gap Finding"] },
            { step: "03", title: "Research Question", bn: "গবেষণা প্রশ্ন", desc: "স্পষ্ট, নির্দিষ্ট, measurable প্রশ্ন তৈরি করুন।", tags: ["SMART", "PICO", "Hypothesis"] },
            { step: "04", title: "Methodology", bn: "পদ্ধতি নির্ধারণ", desc: "Qualitative / Quantitative / Mixed — কোন পদ্ধতি ব্যবহার করবেন ঠিক করুন।", tags: ["Design", "Sampling", "Tools"] },
            { step: "05", title: "Data Collection", bn: "ডেটা সংগ্রহ", desc: "Survey, Interview, Experiment, Observation — যেভাবে লাগে।", tags: ["Survey", "Interview", "Experiment"] },
            { step: "06", title: "Data Analysis", bn: "ডেটা বিশ্লেষণ", desc: "Statistical বা Thematic বিশ্লেষণ। Software ব্যবহার করুন।", tags: ["SPSS", "R", "Python", "NVivo"] },
            { step: "07", title: "Results & Discussion", bn: "ফলাফল ও আলোচনা", desc: "ফলাফল ব্যাখ্যা করুন, পূর্বের গবেষণার সাথে তুলনা করুন।", tags: ["Charts", "Comparison", "Interpretation"] },
            { step: "08", title: "Conclusion & Publish", bn: "সিদ্ধান্ত ও প্রকাশ", desc: "সারসংক্ষেপ লিখুন, জার্নালে জমা দিন, কনফারেন্সে উপস্থাপন করুন।", tags: ["Paper", "Journal", "Conference"] }
        ],

        // ---------- SEARCH ENGINES ----------
        search: [
            { name: "Google Scholar", bn: "গুগল স্কলার", url: "https://scholar.google.com", desc: "সব বিষয়ের একাডেমিক পেপার, থিসিস, বই", icon: "🎓", tag: "free", color: "#4285f4" },
            { name: "PubMed", bn: "পাবমেড", url: "https://pubmed.ncbi.nlm.nih.gov", desc: "Medical ও Life Science-এর সেরা ডেটাবেস", icon: "🩺", tag: "free", color: "#326599" },
            { name: "JSTOR", bn: "জেস্টর", url: "https://www.jstor.org", desc: "Humanities ও Social Science জার্নাল", icon: "📚", tag: "paid", color: "#d9534f" },
            { name: "IEEE Xplore", bn: "আইইইই", url: "https://ieeexplore.ieee.org", desc: "Engineering, CS, Technology পেপার", icon: "⚡", tag: "paid", color: "#00629b" },
            { name: "arXiv", bn: "আর্কসিভ", url: "https://arxiv.org", desc: "Physics, Math, CS-এর ফ্রি প্রিপ্রিন্ট", icon: "📄", tag: "free", color: "#b31b1b" },
            { name: "ResearchGate", bn: "রিসার্চগেট", url: "https://www.researchgate.net", desc: "গবেষকদের নেটওয়ার্ক, পেপার শেয়ার", icon: "🌐", tag: "free", color: "#00d0af" },
            { name: "Scopus", bn: "স্কোপাস", url: "https://www.scopus.com", desc: "Citation ও Abstract ডেটাবেস", icon: "📊", tag: "paid", color: "#f36f21" },
            { name: "Web of Science", bn: "ওয়েব অফ সায়েন্স", url: "https://www.webofscience.com", desc: "High-quality indexed journals", icon: "🔬", tag: "paid", color: "#6c3483" },
            { name: "DOAJ", bn: "ডিওএজে", url: "https://doaj.org", desc: "Open Access Journals-এর ডিরেক্টরি", icon: "🆓", tag: "free", color: "#00a1e0" },
            { name: "Semantic Scholar", bn: "সিমান্টিক স্কলার", url: "https://www.semanticscholar.org", desc: "AI-পাওয়ার্ড পেপার সার্চ", icon: "🤖", tag: "free", color: "#1857b6" }
        ],

        // ---------- AI RESEARCH TOOLS ----------
        ai: [
            { name: "ChatGPT", bn: "চ্যাটজিপিটি", url: "https://chat.openai.com", desc: "ব্রেনস্টর্মিং, ড্রাফটিং, সারসংক্ষেপ", icon: "💬", tag: "free", color: "#10a37f" },
            { name: "Claude", bn: "ক্লড", url: "https://claude.ai", desc: "বড় ডকুমেন্ট বিশ্লেষণ, রাইটিং", icon: "🧠", tag: "free", color: "#cc785c" },
            { name: "Perplexity", bn: "পারপ্লেক্সিটি", url: "https://www.perplexity.ai", desc: "Citation সহ AI সার্চ", icon: "🔍", tag: "free", color: "#20b8cd" },
            { name: "Elicit", bn: "এলিসিট", url: "https://elicit.com", desc: "Literature review অটোমেশন", icon: "📑", tag: "free", color: "#6366f1" },
            { name: "Consensus", bn: "কনসেনসাস", url: "https://consensus.app", desc: "প্রশ্ন → পেপার থেকে উত্তর", icon: "🎯", tag: "free", color: "#10b981" },
            { name: "SciSpace", bn: "সাইস্পেস", url: "https://typeset.io", desc: "পেপার পড়া ও ব্যাখ্যা", icon: "📖", tag: "free", color: "#f59e0b" },
            { name: "Connected Papers", bn: "কানেক্টেড পেপার্স", url: "https://www.connectedpapers.com", desc: "পেপারের সম্পর্ক ম্যাপ", icon: "🕸️", tag: "free", color: "#8b5cf6" },
            { name: "Scholarcy", bn: "স্কলারসি", url: "https://www.scholarcy.com", desc: "পেপার সামারি", icon: "📝", tag: "paid", color: "#ec4899" },
            { name: "Scite.ai", bn: "সাইট", url: "https://scite.ai", desc: "Citation context দেখা", icon: "📊", tag: "paid", color: "#06b6d4" },
            { name: "ResearchRabbit", bn: "রিসার্চ র‍্যাবিট", url: "https://www.researchrabbit.ai", desc: "পেপার ডিসকভারি ও ট্র্যাকিং", icon: "🐰", tag: "free", color: "#a855f7" }
        ],

        // ---------- DATA TOOLS ----------
        data: [
            { name: "Microsoft Excel", bn: "এক্সেল", url: "https://www.microsoft.com/microsoft-365/excel", desc: "ডেটা টেবিল, চার্ট, ফর্মুলা", icon: "📗", tag: "paid", color: "#217346" },
            { name: "Google Sheets", bn: "গুগল শিটস", url: "https://sheets.google.com", desc: "ফ্রি ক্লাউড স্প্রেডশিট", icon: "📊", tag: "free", color: "#34a853" },
            { name: "SPSS", bn: "এসপিএসএস", url: "https://www.ibm.com/spss", desc: "Statistical analysis সফটওয়্যার", icon: "📈", tag: "paid", color: "#1f70c1" },
            { name: "R + RStudio", bn: "আর স্টুডিও", url: "https://posit.co", desc: "ফ্রি statistical computing", icon: "🔵", tag: "opensource", color: "#276dc3" },
            { name: "Python (Pandas)", bn: "পাইথন", url: "https://pandas.pydata.org", desc: "Data science, ML, automation", icon: "🐍", tag: "opensource", color: "#3776ab" },
            { name: "JASP", bn: "জেস্প", url: "https://jasp-stats.org", desc: "ফ্রি statistics software", icon: "📉", tag: "opensource", color: "#e91e63" },
            { name: "Tableau", bn: "ট্যাবলো", url: "https://www.tableau.com", desc: "Interactive visualization", icon: "📊", tag: "paid", color: "#e97627" },
            { name: "Power BI", bn: "পাওয়ার বি আই", url: "https://powerbi.microsoft.com", desc: "Microsoft-এর BI টুল", icon: "⚡", tag: "free", color: "#f2c811" },
            { name: "NVivo", bn: "এনভাইভো", url: "https://lumivero.com/products/nvivo", desc: "Qualitative data analysis", icon: "📁", tag: "paid", color: "#8b5cf6" },
            { name: "MAXQDA", bn: "ম্যাক্সকিউডিএ", url: "https://www.maxqda.com", desc: "Qualitative ও Mixed method", icon: "🔍", tag: "paid", color: "#dc2626" }
        ],

        // ---------- STATISTICS METHODS ----------
        stats: [
            { name: "Mean / Median / Mode", bn: "কেন্দ্রীয় প্রবণতা", desc: "ডেটার গড়, মধ্যমা, সংখ্যাগুরু মান।", use: "Basic descriptive", color: "#22c55e" },
            { name: "Standard Deviation", bn: "স্ট্যান্ডার্ড ডেভিয়েশন", desc: "ডেটা কী পরিমাণ ছড়িয়ে আছে।", use: "Variability", color: "#16a34a" },
            { name: "t-test", bn: "টি-টেস্ট", desc: "দুই গ্রুপের গড় তুলনা।", use: "2 groups compare", color: "#3b82f6" },
            { name: "ANOVA", bn: "অ্যানোভা", desc: "তিন বা তার বেশি গ্রুপের তুলনা।", use: "3+ groups", color: "#2563eb" },
            { name: "Chi-Square Test", bn: "চি-স্কয়ার", desc: "Categorical ডেটার সম্পর্ক।", use: "Categorical test", color: "#8b5cf6" },
            { name: "Correlation", bn: "কোরিলেশন", desc: "দুই ভেরিয়েবলের সম্পর্ক (r)।", use: "Relationship", color: "#a855f7" },
            { name: "Regression", bn: "রিগ্রেশন", desc: "একটি ভেরিয়েবল দিয়ে অন্যটা পূর্বাভাস।", use: "Prediction", color: "#ec4899" },
            { name: "P-value", bn: "পি-ভ্যালু", desc: "ফলাফল কতটা significant (p < 0.05)।", use: "Significance", color: "#f43f5e" },
            { name: "Confidence Interval", bn: "কনফিডেন্স ইন্টারভাল", desc: "৯৫% আস্থার রেঞ্জ।", use: "Estimation", color: "#f59e0b" },
            { name: "Sample Size", bn: "স্যাম্পল সাইজ", desc: "কতজন অংশগ্রহণকারী লাগবে।", use: "Study design", color: "#eab308" },
            { name: "Hypothesis Testing", bn: "হাইপোথেসিস টেস্ট", desc: "Null ও Alternative hypothesis যাচাই।", use: "Testing theory", color: "#14b8a6" },
            { name: "Bayesian Analysis", bn: "বেইজিয়ান", desc: "Probability update, prior + data।", use: "Advanced stats", color: "#06b6d4" }
        ],

        // ---------- WRITING TOOLS ----------
        write: [
            { name: "Google Docs", bn: "গুগল ডকস", url: "https://docs.google.com", desc: "ফ্রি ক্লাউড ডকুমেন্ট, Collaboration", icon: "📝", tag: "free", color: "#4285f4" },
            { name: "Overleaf", bn: "ওভারলিফ", url: "https://www.overleaf.com", desc: "LaTeX-based পেপার রাইটিং", icon: "🌿", tag: "free", color: "#47a141" },
            { name: "LaTeX", bn: "লাটেক", url: "https://www.latex-project.org", desc: "Scientific writing স্ট্যান্ডার্ড", icon: "📐", tag: "opensource", color: "#008080" },
            { name: "Grammarly", bn: "গ্রামারলি", url: "https://www.grammarly.com", desc: "English grammar ও style check", icon: "✏️", tag: "free", color: "#15c39a" },
            { name: "Notion", bn: "নোশন", url: "https://www.notion.so", desc: "Notes, planning, database", icon: "📓", tag: "free", color: "#000000" },
            { name: "Obsidian", bn: "অবসিডিয়ান", url: "https://obsidian.md", desc: "Local markdown notes, linked", icon: "💎", tag: "free", color: "#7c3aed" },
            { name: "Hemingway Editor", bn: "হেমিংওয়ে", url: "https://hemingwayapp.com", desc: "Readability improve", icon: "✒️", tag: "free", color: "#e34c26" },
            { name: "QuillBot", bn: "কুইলবট", url: "https://quillbot.com", desc: "Paraphrasing, summarizing", icon: "🪶", tag: "free", color: "#5a67d8" }
        ],

        // ---------- CITATION MANAGERS ----------
        cite: [
            { name: "Zotero", bn: "জোটেরো", url: "https://www.zotero.org", desc: "ফ্রি, ওপেন সোর্স রেফারেন্স ম্যানেজার", icon: "📚", tag: "opensource", color: "#cc2936" },
            { name: "Mendeley", bn: "মেন্ডেলি", url: "https://www.mendeley.com", desc: "Elsevier-এর ফ্রি ম্যানেজার", icon: "📖", tag: "free", color: "#9d1620" },
            { name: "EndNote", bn: "এন্ডনোট", url: "https://endnote.com", desc: "Pro-level citation manager", icon: "📕", tag: "paid", color: "#003087" },
            { name: "BibTeX", bn: "বিবটেক", url: "https://www.bibtex.org", desc: "LaTeX-এর জন্য citation", icon: "📘", tag: "opensource", color: "#008080" },
            { name: "Paperpile", bn: "পেপারপাইল", url: "https://paperpile.com", desc: "Google Docs-এর সাথে integrate", icon: "📎", tag: "paid", color: "#4a90e2" },
            { name: "Citavi", bn: "সিটাভি", url: "https://www.citavi.com", desc: "Knowledge organization + citation", icon: "🗂️", tag: "free", color: "#e63946" }
        ],

        // ---------- PUBLISHING ----------
        publish: [
            { name: "arXiv", bn: "আর্কসিভ", url: "https://arxiv.org", desc: "Preprint server (ফ্রি পাবলিশ)", icon: "📄", tag: "free", color: "#b31b1b" },
            { name: "ResearchGate", bn: "রিসার্চগেট", url: "https://www.researchgate.net", desc: "পেপার শেয়ার ও ডিসকাশন", icon: "🌐", tag: "free", color: "#00d0af" },
            { name: "Elsevier", bn: "এলসেভিয়ার", url: "https://www.elsevier.com", desc: "বিশ্বের বড় পাবলিশার", icon: "📕", tag: "paid", color: "#ff6d00" },
            { name: "Springer", bn: "স্প্রিংগার", url: "https://www.springer.com", desc: "বিজ্ঞান ও প্রযুক্তি জার্নাল", icon: "📗", tag: "paid", color: "#7c2d12" },
            { name: "IEEE", bn: "আইইইই", url: "https://www.ieee.org", desc: "Engineering ও CS কনফারেন্স", icon: "⚡", tag: "paid", color: "#00629b" },
            { name: "MDPI", bn: "এমডিপিআই", url: "https://www.mdpi.com", desc: "Open Access জার্নাল", icon: "🔓", tag: "paid", color: "#0d6efd" },
            { name: "Frontiers", bn: "ফ্রন্টিয়ার্স", url: "https://www.frontiersin.org", desc: "Open Access, দ্রুত review", icon: "🚀", tag: "paid", color: "#0a9396" },
            { name: "PLOS", bn: "প্লস", url: "https://plos.org", desc: "Open Access journal", icon: "🆓", tag: "paid", color: "#f4a261" }
        ],

        // ---------- TIPS ----------
        tips: [
            "প্রতিদিন অন্তত ৩০ মিনিট লিটারেচার পড়ুন — Google Scholar-এ alert সেট করুন।",
            "একটি Research Question স্পষ্ট না হলে পুরো গবেষণা ভেস্তে যাবে — প্রথমে সেটা ঠিক করুন।",
            "Zotero/Mendeley ব্যবহার করুন — শেষ মুহূর্তে citation যোগ করা কষ্টের।",
            "ডেটা সংগ্রহ শুরু করার আগে Sample Size ঠিক করুন — পরে লাভ নেই।",
            "Predatory Journal চেনার উপায় — DOAJ/Scopus-এ ইনডেক্সড কিনা দেখুন।",
            "AI Tools (ChatGPT, Elicit) কে সহকারী হিসেবে ব্যবহার করুন, বিকল্প হিসেবে নয়।",
            "Result পড়ার আগে Abstract পড়ুন — সময় বাঁচবে।",
            "প্রতিটি সোর্সের মূল কাগজ সংগ্রহ করুন — দ্বিতীয় সোর্স বিশ্বাস করবেন না।",
            "APA/MLA/IEEE — যেকোনো একটি স্টাইল শিখে ফেলুন, সব কাজে লাগবে।",
            "একাকী না করে মেন্টর/টিমের সাথে কাজ করুন — ৩x দ্রুত এগোবে।",
            "Research Log/Metadata রাখুন — কোন পেপার থেকে কী পেয়েছেন লিখে রাখুন।",
            "Ethics অনুমতি (IRB) ছাড়া মানুষ নিয়ে গবেষণা করবেন না।"
        ]
    };

    // =========================================================
    // DOM
    // =========================================================
    const card    = document.querySelector('.lh-cat-card.lh-cat-research');
    const overlay = document.getElementById('resPanelOverlay');
    const closeBtn= document.getElementById('resClose');
    const body    = document.getElementById('resBody');
    const navBtns = document.querySelectorAll('.res-nav-btn');

    if (!overlay) return;

    // =========================================================
    // RENDER HELPERS
    // =========================================================

    // ---------- PROCESS ----------
    function renderProcess() {
        const box = document.getElementById('resProcess');
        if (!box) return;
        box.innerHTML = DATA.process.map(p => `
            <div class="res-process-item">
                <span class="res-process-num">${p.step}</span>
                <h5>${p.title} <span style="color:#5eead4;font-weight:400">— ${p.bn}</span></h5>
                <p>${p.desc}</p>
                <div class="res-process-tags">
                    ${p.tags.map(t => `<span>${t}</span>`).join('')}
                </div>
            </div>
        `).join('');
    }

    // ---------- GENERIC CARD GRID ----------
    function renderCards(containerId, items) {
        const box = document.getElementById(containerId);
        if (!box) return;
        box.innerHTML = items.map(item => {
            const isLink = !!item.url;
            const tag = isLink ? 'a' : 'div';
            const attrs = isLink
                ? `href="${item.url}" target="_blank" rel="noopener noreferrer"`
                : '';
            const colorStyle = item.color ? `--res-color:${item.color}` : '';
            const tagBadge = item.tag
                ? `<span class="res-card-tag ${item.tag}">${
                    item.tag === 'free' ? '🆓 Free'
                    : item.tag === 'paid' ? '💎 Paid'
                    : '🌐 Open Source'
                }</span>`
                : '';
            return `
                <${tag} class="res-card" ${attrs} style="${colorStyle}">
                    <div class="res-card-head">
                        <span class="res-card-icon">${item.icon}</span>
                        <span class="res-card-title">${item.bn || item.name}</span>
                    </div>
                    <p class="res-card-desc">${item.desc}</p>
                    ${tagBadge}
                </${tag}>
            `;
        }).join('');
    }

    // ---------- STATS ----------
    function renderStats() {
        const box = document.getElementById('resStatsGrid');
        if (!box) return;
        box.innerHTML = DATA.stats.map(s => `
            <div class="res-stat-card" style="--stat-color:${s.color}">
                <div class="res-stat-head">
                    <span class="res-stat-icon" style="color:${s.color}">📊</span>
                    <span class="res-stat-name">${s.bn}</span>
                </div>
                <p class="res-stat-desc">${s.desc}</p>
                <div class="res-stat-use">🎯 <b>Use:</b> ${s.use}</div>
            </div>
        `).join('');
    }

    // ---------- TIPS ----------
    function renderTips() {
        const box = document.getElementById('resTipsList');
        if (!box) return;
        box.innerHTML = DATA.tips.map(t => `<li>${t}</li>`).join('');
    }

    // =========================================================
    // RENDER ALL
    // =========================================================
    renderProcess();
    renderCards('resSearchGrid', DATA.search);
    renderCards('resAiGrid', DATA.ai);
    renderCards('resDataGrid', DATA.data);
    renderStats();
    renderCards('resWriteGrid', DATA.write);
    renderCards('resCiteGrid', DATA.cite);
    renderCards('resPublishGrid', DATA.publish);
    renderTips();

    // =========================================================
    // PANEL OPEN / CLOSE
    // =========================================================
    function openPanel() {
        overlay.classList.add('res-open');
        overlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        setTimeout(() => closeBtn?.focus(), 100);
    }

    function closePanel() {
        overlay.classList.remove('res-open');
        overlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        card?.focus();
    }

    card?.addEventListener('click', openPanel);
    card?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openPanel();
        }
    });

    closeBtn?.addEventListener('click', closePanel);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closePanel();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('res-open')) closePanel();
    });

    // Focus trap
    overlay.addEventListener('keydown', (e) => {
        if (e.key !== 'Tab') return;
        const focusables = overlay.querySelectorAll(
            'button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables.length) return;
        const first = focusables[0];
        const last  = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
            e.preventDefault(); last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault(); first.focus();
        }
    });

    // =========================================================
    // NAVIGATION
    // =========================================================
    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = body.querySelector(`[data-res-section="${btn.dataset.resJump}"]`);
            if (target) {
                const offsetTop = target.offsetTop - body.offsetTop - 10;
                body.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }
            navBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // =========================================================
    // SCROLL SPY
    // =========================================================
    let scrollTimer = null;
    body?.addEventListener('scroll', () => {
        if (scrollTimer) return;
        scrollTimer = setTimeout(() => {
            scrollTimer = null;
            const sections = body.querySelectorAll('[data-res-section]');
            const scrollPos = body.scrollTop + 80;
            let current = '';
            sections.forEach(sec => {
                if (scrollPos >= sec.offsetTop) current = sec.dataset.resSection;
            });
            if (current) {
                navBtns.forEach(btn => {
                    btn.classList.toggle('active', btn.dataset.resJump === current);
                });
            }
        }, 100);
    });

})();/* =========================================================
   🏝️ MAHESHKHALI UNIONS — Panel + Language Controller
   ========================================================= */
(function () {
    'use strict';

    // =========================================================
    // 🌐 LANGUAGE ENGINE
    // =========================================================
    const LANG_KEY = 'om_lang';
    const DEFAULT_LANG = 'bn';

    let currentLang = localStorage.getItem(LANG_KEY) || DEFAULT_LANG;

    // ---------- Apply language to all [data-bn][data-en] ----------
    function applyLanguage(lang) {
        currentLang = lang;
        localStorage.setItem(LANG_KEY, lang);

        // html + body attribute
        document.documentElement.setAttribute('lang', lang);
        document.documentElement.setAttribute('data-lang', lang);

        // সব element যাদের data-bn ও data-en আছে
        document.querySelectorAll('[data-bn][data-en]').forEach(el => {
            const text = el.getAttribute('data-' + lang);
            if (text !== null) {
                if (el.hasAttribute('aria-label')) {
                    el.setAttribute('aria-label', text);
                }
                el.textContent = text;
            }
        });

        // Loading Screen-এর langText label update
        const langText = document.getElementById('langText');
        if (langText) {
            langText.textContent = lang === 'bn' ? 'English' : 'বাংলা';
        }

        // Custom event — অন্যান্য কোড listen করতে পারে
        document.dispatchEvent(new CustomEvent('languageChanged', {
            detail: { lang }
        }));
    }

    // ---------- Toggle ----------
    function toggleLanguage() {
        applyLanguage(currentLang === 'bn' ? 'en' : 'bn');
    }

    // ---------- Loading Screen-এর langToggle-এর সাথে sync ----------
    const langToggleBtn = document.getElementById('langToggle');
    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', toggleLanguage);
    }

    // ---------- Initial apply ----------
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => applyLanguage(currentLang));
    } else {
        applyLanguage(currentLang);
    }

    // =========================================================
    // 🏝️ UNION DETAILS PANEL CONTROLLER
    // =========================================================
    const body = document.body;

    // ---------- OPEN ----------
    function openPanel(unionKey, btn) {
        const panel = document.getElementById('union-details-' + unionKey);
        if (!panel) {
            console.warn('⚠️ Panel not found for:', unionKey);
            return;
        }

        panel.classList.add('union-open');
        panel.setAttribute('aria-hidden', 'false');
        body.classList.add('union-locked');

        if (btn) btn.setAttribute('aria-expanded', 'true');

        // Close বাটনে focus
        const closeBtn = panel.querySelector('.union-details-close');
        setTimeout(() => closeBtn?.focus(), 200);

        // Panel scroll top-এ
        const panelBody = panel.querySelector('.union-details-body');
        if (panelBody) panelBody.scrollTop = 0;

        // Focus restore জন্য সংরক্ষণ
        panel._lastFocused = btn || document.activeElement;
    }

    // ---------- CLOSE ----------
    function closePanel(panel) {
        if (!panel) return;

        panel.classList.remove('union-open');
        panel.setAttribute('aria-hidden', 'true');
        body.classList.remove('union-locked');

        // aria-expanded reset
        const key = panel.id.replace('union-details-', '');
        document.querySelectorAll(`[data-toggle="${key}"]`).forEach(b => {
            b.setAttribute('aria-expanded', 'false');
        });

        // Focus ফিরিয়ে দাও
        if (panel._lastFocused && typeof panel._lastFocused.focus === 'function') {
            panel._lastFocused.focus();
            panel._lastFocused = null;
        }
    }

    // ---------- Global click handler ----------
    document.addEventListener('click', (e) => {

        // OPEN — data-toggle="XXXX"
        const toggleBtn = e.target.closest('[data-toggle]');
        if (toggleBtn) {
            e.preventDefault();
            const key = toggleBtn.dataset.toggle;
            openPanel(key, toggleBtn);
            return;
        }

        // CLOSE — data-close-details
        const closeEl = e.target.closest('[data-close-details]');
        if (closeEl) {
            e.preventDefault();
            const panel = closeEl.closest('.union-details-panel');
            closePanel(panel);
            return;
        }
    });

    // ---------- ESC key ----------
    document.addEventListener('keydown', (e) => {
        if (e.key !== 'Escape') return;
        const openP = document.querySelector('.union-details-panel.union-open');
        if (openP) {
            e.preventDefault();
            closePanel(openP);
        }
    });

    // ---------- Focus Trap ----------
    document.addEventListener('keydown', (e) => {
        if (e.key !== 'Tab') return;

        const panel = document.querySelector('.union-details-panel.union-open');
        if (!panel) return;

        const focusables = panel.querySelectorAll(
            'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables.length) return;

        const first = focusables[0];
        const last  = focusables[focusables.length - 1];

        if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
        }
    });

    // ---------- Mobile scroll safety ----------
    document.addEventListener('touchmove', (e) => {
        const openP = document.querySelector('.union-details-panel.union-open');
        if (openP && !e.target.closest('.union-details-body')) {
            e.preventDefault();
        }
    }, { passive: false });

    // =========================================================
    // 🧪 PUBLIC API (debug-এর জন্য)
    // =========================================================
    window.UnionPanel = {
        open:  (key) => openPanel(key),
        close: () => {
            const p = document.querySelector('.union-details-panel.union-open');
            closePanel(p);
        }
    };

    window.OMLang = {
        get:    () => currentLang,
        set:    (lang) => applyLanguage(lang),
        toggle: () => toggleLanguage()
    };

})();/* =========================================================
   📚 KNOWLEDGE LIBRARY — Panel Controller + Data
   ========================================================= */
(function () {
    'use strict';

    // =========================================================
    // 📖 DATA
    // =========================================================
    const DATA = {

        // ---------- বাংলাদেশের বিখ্যাত লেখক ----------
        banglaWriters: [
            {
                name: 'রবীন্দ্রনাথ ঠাকুর',
                en: 'Rabindranath Tagore',
                icon: '🎭',
                color: '#f59e0b',
                role: 'কবি • নোবেল বিজয়ী',
                desc: 'বাংলা সাহিত্যের সর্বশ্রেষ্ঠ কবি। ১৯১৩ সালে "গীতাঞ্জলি" কাব্যগ্রন্থের জন্য এশিয়ার প্রথম নোবেল পুরস্কার পান।',
                books: 'গীতাঞ্জলি, গোরা, ঘরে-বাইরে, শেষের কবিতা'
            },
            {
                name: 'কাজী নজরুল ইসলাম',
                en: 'Kazi Nazrul Islam',
                icon: '🕊️',
                color: '#ef4444',
                role: 'জাতীয় কবি • বিদ্রোহী কবি',
                desc: 'বাংলাদেশের জাতীয় কবি। "বিদ্রোহী" কবিতার জন্য বিদ্রোহী কবি নামে পরিচিত।',
                books: 'বিদ্রোহী, অগ্নিবীণা, বিষের বাঁশি, সাম্যবাদী'
            },
            {
                name: 'শরৎচন্দ্র চট্টোপাধ্যায়',
                en: 'Sarat Chandra Chattopadhyay',
                icon: '📖',
                color: '#8b5cf6',
                role: 'ঔপন্যাসিক',
                desc: 'বাংলা সাহিত্যের অমর কথাশিল্পী। সমাজের নিম্নবর্গের মানুষের জীবনকে সাহিত্যে এনেছেন।',
                books: 'দেবদাস, পল্লী সমাজ, শ্রীকান্ত, চরিত্রহীন'
            },
            {
                name: 'বঙ্কিমচন্দ্র চট্টোপাধ্যায়',
                en: 'Bankim Chandra Chatterjee',
                icon: '🏛️',
                color: '#06b6d4',
                role: 'ঔপন্যাসিক',
                desc: 'বাংলা উপন্যাসের জনক। "বন্দে মাতরম্" গানের রচয়িতা।',
                books: 'আনন্দমঠ, কপালকুণ্ডলা, বিষবৃক্ষ, দুর্গেশনন্দিনী'
            },
            {
                name: 'জসীমউদ্দীন',
                en: 'Jasimuddin',
                icon: '🌾',
                color: '#22c55e',
                role: 'পল্লী কবি',
                desc: 'বাংলা সাহিত্যের পল্লীকবি। গ্রামবাংলার রূপ-রস-গন্ধ তাঁর কবিতায় জীবন্ত।',
                books: 'নকশী কাঁথার মাঠ, সোজন বাদিয়ার ঘাট, রাখালী'
            },
            {
                name: 'মাইকেল মধুসূদন দত্ত',
                en: 'Michael Madhusudan Dutt',
                icon: '✒️',
                color: '#ec4899',
                role: 'মহাকবি',
                desc: 'বাংলা সাহিত্যে সনেট ও অমিত্রাক্ষর ছন্দের প্রবর্তক।',
                books: 'মেঘনাদবধ কাব্য, কৃষ্ণকুমারী'
            },
            {
                name: 'হুমায়ূন আহমেদ',
                en: 'Humayun Ahmed',
                icon: '🌟',
                color: '#3b82f6',
                role: 'ঔপন্যাসিক • চলচ্চিত্রকার',
                desc: 'আধুনিক বাংলা সাহিত্যের সবচেয়ে জনপ্রিয় লেখক। হিমু, মিসির আলী চরিত্রের স্রষ্টা।',
                books: 'নন্দিত নরকে, শঙ্খনীল কারাগার, মিসির আলী সিরিজ'
            },
            {
                name: 'সুনীল গঙ্গোপাধ্যায়',
                en: 'Sunil Gangopadhyay',
                icon: '📚',
                color: '#a855f7',
                role: 'কবি • ঔপন্যাসিক',
                desc: 'বাংলা সাহিত্যের অন্যতম প্রধান লেখক। "নীললোহিত" ছদ্মনামে লিখতেন।',
                books: 'সেই সময়, প্রথম আলো, পূর্ব-পশ্চিম'
            },
            {
                name: 'জীবনানন্দ দাশ',
                en: 'Jibanananda Das',
                icon: '🌿',
                color: '#14b8a6',
                role: 'কবি',
                desc: 'রূপসী বাংলার কবি। বাংলা কবিতায় আধুনিকতার পথিকৃৎ।',
                books: 'বনলতা সেন, ধূসর পাণ্ডুলিপি, রূপসী বাংলা'
            },
            {
                name: 'সুকান্ত ভট্টাচার্য',
                en: 'Sukanta Bhattacharya',
                icon: '⚡',
                color: '#f97316',
                role: 'কবি',
                desc: 'মাত্র ২১ বছর বেঁচে ছিলেন, কিন্তু তাঁর কবিতা আজও প্রাসঙ্গিক।',
                books: 'ছাড়পত্র, ঘুম নেই, পূর্বাভাস'
            },
            {
                name: 'সত্যেন্দ্রনাথ দত্ত',
                en: 'Satyendranath Dutta',
                icon: '🎵',
                color: '#fbbf24',
                role: 'ছন্দের জাদুকর',
                desc: 'বাংলা কবিতায় ছন্দের বৈচিত্র্যের জন্য "ছন্দের জাদুকর" নামে পরিচিত।',
                books: 'বেণু ও বীণা, ফুলের ফসল'
            },
            {
                name: 'শামসুর রাহমান',
                en: 'Shamsur Rahman',
                icon: '🕊️',
                color: '#06b6d4',
                role: 'কবি',
                desc: 'আধুনিক বাংলা কবিতার শ্রেষ্ঠ কবি। স্বাধীনতা সংগ্রামের চেতনায় উদ্বুদ্ধ।',
                books: 'অসম্ভব আন্তরিকতা, নিজ বাসভূমে, রৌদ্র করোটিতে'
            },
            {
                name: 'সৈয়দ শামসুল হক',
                en: 'Syed Shamsul Haq',
                icon: '🎭',
                color: '#d97706',
                role: 'কবি • নাট্যকার',
                desc: 'বহুমুখী প্রতিভার অধিকারী। কবিতা, উপন্যাস, নাটক সবক্ষেত্রে অবদান।',
                books: 'পায়ের আওয়াজ পাওয়া যায়, নুরলদীনের সারাজীবন'
            },
            {
                name: 'আল মাহমুদ',
                en: 'Al Mahmud',
                icon: '🌾',
                color: '#22c55e',
                role: 'কবি',
                desc: 'গ্রামবাংলার কবি। নিম্নবর্গের মানুষের কণ্ঠস্বর।',
                books: 'লোক লোকান্তর, কালের কলস, সোনালী কাবিন'
            },
            {
                name: 'রাহাত খান',
                en: 'Rahat Khan',
                icon: '📖',
                color: '#8b5cf6',
                role: 'লেখক',
                desc: 'মুক্তিযুদ্ধভিত্তিক সাহিত্যের অন্যতম লেখক।',
                books: 'মধ্য মাঠের যুদ্ধ, বৃত্তের বাইরে'
            },
            {
                name: 'সেলিনা হোসেন',
                en: 'Selina Hossain',
                icon: '🌸',
                color: '#ec4899',
                role: 'লেখিকা',
                desc: 'মুক্তিযুদ্ধ ও নারীর জীবন সংগ্রাম নিয়ে লিখেন।',
                books: 'হাঙর নদী গ্রেনেড, পোড়ামাটি, কাঁটাতারে প্রজাপতি'
            },
            {
                name: 'আখতারুজ্জামান ইলিয়াস',
                en: 'Akhtaruzzaman Elias',
                icon: '🖋️',
                color: '#14b8a6',
                role: 'লেখক',
                desc: 'বাংলা কথাসাহিত্যের অন্যতম শক্তিশালী লেখক।',
                books: 'খোয়াবনামা, চিলেকোঠার সেপাই'
            },
            {
                name: 'হাসান আজিজুল হক',
                en: 'Hasan Azizul Huq',
                icon: '📚',
                color: '#f59e0b',
                role: 'লেখক',
                desc: 'বাংলা ছোটগল্পের অন্যতম সেরা কারিগর।',
                books: 'আগুনপাখি, জীবনানন্দ পুরস্কার'
            },
            {
                name: 'বিভূতিভূষণ বন্দ্যোপাধ্যায়',
                en: 'Bibhutibhushan Bandyopadhyay',
                icon: '🌳',
                color: '#22c55e',
                role: 'ঔপন্যাসিক',
                desc: 'বাংলা সাহিত্যের অন্যতম শ্রেষ্ঠ ঔপন্যাসিক।',
                books: 'পথের পাঁচালী, অপরাজিত, আরণ্যক'
            },
            {
                name: 'মানিক বন্দ্যোপাধ্যায়',
                en: 'Manik Bandopadhyay',
                icon: '👨‍🌾',
                color: '#06b6d4',
                role: 'ঔপন্যাসিক',
                desc: 'বাংলা সাহিত্যের শক্তিশালী বাস্তববাদী ঔপন্যাসিক।',
                books: 'পদ্মা নদীর মাঝি, পুতুলনাচের ইতিকথা, দিবারাত্রির কাব্য'
            },
            {
                name: 'তারাশঙ্কর বন্দ্যোপাধ্যায়',
                en: 'Tarashankar Bandyopadhyay',
                icon: '🌾',
                color: '#d97706',
                role: 'ঔপন্যাসিক',
                desc: 'বীরভূম অঞ্চলের জীবন নিয়ে লেখেন।',
                books: 'হাঁসুলী বাঁকের উপকথা, কবি, আরোগ্য নিকেতন'
            },
            {
                name: 'প্রেমেন্দ্র মিত্র',
                en: 'Premendra Mitra',
                icon: '🔍',
                color: '#8b5cf6',
                role: 'কবি • গল্পকার',
                desc: 'কল্পবিজ্ঞান ও রহস্য গল্পের জনপ্রিয় লেখক।',
                books: 'ঘনাদা সিরিজ'
            },
            {
                name: 'সৈয়দ মুজতবা আলী',
                en: 'Syed Mujtaba Ali',
                icon: '✈️',
                color: '#f97316',
                role: 'লেখক',
                desc: 'ভ্রমণকাহিনী ও রম্যরচনার জন্য বিখ্যাত।',
                books: 'দেশে বিদেশে, শবনম, চাচা কাহিনী'
            },
            {
                name: 'জহির রায়হান',
                en: 'Zahir Raihan',
                icon: '🎬',
                color: '#ef4444',
                role: 'লেখক • চলচ্চিত্রকার',
                desc: 'মুক্তিযুদ্ধভিত্তিক সাহিত্য ও চলচ্চিত্রের পথিকৃৎ।',
                books: 'হাজার বছর ধরে, আরেক ফাল্গুন, বরফ গলা নদী'
            },
            {
                name: 'শহীদুল জহির',
                en: 'Shahidul Zahir',
                icon: '🖤',
                color: '#a855f7',
                role: 'লেখক',
                desc: 'বাংলা সাহিত্যের অনন্য শৈলীর লেখক।',
                books: 'জীবন ও राजনৈতিক বাস্তবতা, মুখের দিকে দেখি'
            }
        ],

        // ---------- কাজী নজরুল ইসলামের বই ----------
        nazrulBooks: [
            { icon: '⚔️', title: 'বিদ্রোহী', meta: 'কবিতা', year: '১৯২২' },
            { icon: '🔥', title: 'অগ্নিবীণা', meta: 'কাব্যগ্রন্থ', year: '১৯২২' },
            { icon: '🌺', title: 'বিষের বাঁশি', meta: 'কাব্যগ্রন্থ', year: '১৯২৪' },
            { icon: '🎵', title: 'সাম্যবাদী', meta: 'কাব্যগ্রন্থ', year: '১৯২৫' },
            { icon: '🌙', title: 'ভাঙার গান', meta: 'কাব্যগ্রন্থ', year: '১৯২৪' },
            { icon: '⚡', title: 'সর্বহারা', meta: 'কাব্যগ্রন্থ', year: '১৯২৬' },
            { icon: '🌸', title: 'ফনীমনসা', meta: 'কাব্যগ্রন্থ', year: '১৯২৭' },
            { icon: '🕊️', title: 'নজরুল ইসলামের গান', meta: 'সংগীত সংকলন', year: '—' },
            { icon: '📚', title: 'বাঁধনহারা', meta: 'উপন্যাস', year: '১৯২৭' },
            { icon: '📖', title: 'মৃত্যুক্ষুধা', meta: 'উপন্যাস', year: '১৯৩০' },
            { icon: '🎭', title: 'ঝিঙেফুল', meta: 'কাব্যগ্রন্থ', year: '১৯২৬' },
            { icon: '🌊', title: 'সঞ্চিতা', meta: 'কবিতা সংকলন', year: '১৯২৮' }
        ],

        // ---------- বাংলা সাহিত্যের বিখ্যাত বই ----------
        famousBooks: [
            { icon: '🌅', title: 'গীতাঞ্জলি', author: 'রবীন্দ্রনাথ ঠাকুর', year: '১৯১০' },
            { icon: '🕊️', title: 'বিদ্রোহী', author: 'কাজী নজরুল ইসলাম', year: '১৯২২' },
            { icon: '🏛️', title: 'আনন্দমঠ', author: 'বঙ্কিমচন্দ্র চট্টোপাধ্যায়', year: '১৮৮২' },
            { icon: '💔', title: 'দেবদাস', author: 'শরৎচন্দ্র চট্টোপাধ্যায়', year: '১৯১৭' },
            { icon: '🌾', title: 'নকশী কাঁথার মাঠ', author: 'জসীমউদ্দীন', year: '১৯২৯' },
            { icon: '🌳', title: 'পথের পাঁচালী', author: 'বিভূতিভূষণ বন্দ্যোপাধ্যায়', year: '১৯২৯' },
            { icon: '🚣', title: 'পদ্মা নদীর মাঝি', author: 'মানিক বন্দ্যোপাধ্যায়', year: '১৯৩৬' },
            { icon: '🌟', title: 'পুতুলনাচের ইতিকথা', author: 'মানিক বন্দ্যোপাধ্যায়', year: '১৯৩৬' },
            { icon: '🎭', title: 'শ্রীকান্ত', author: 'শরৎচন্দ্র চট্টোপাধ্যায়', year: '১৯১৭' },
            { icon: '🕉️', title: 'মেঘনাদবধ কাব্য', author: 'মাইকেল মধুসূদন দত্ত', year: '১৮৬১' },
            { icon: '🌿', title: 'বনলতা সেন', author: 'জীবনানন্দ দাশ', year: '১৯৪২' },
            { icon: '🦁', title: 'সোনালী কাবিন', author: 'আল মাহমুদ', year: '১৯৭৩' },
            { icon: '🌊', title: 'খোয়াবনামা', author: 'আখতারুজ্জামান ইলিয়াস', year: '১৯৯৬' },
            { icon: '🔥', title: 'আগুনপাখি', author: 'হাসান আজিজুল হক', year: '২০০৬' },
            { icon: '🦈', title: 'হাঙর নদী গ্রেনেড', author: 'সেলিনা হোসেন', year: '১৯৯৬' },
            { icon: '🎬', title: 'হাজার বছর ধরে', author: 'জহির রায়হান', year: '১৯৬৪' }
        ],

        // ---------- আন্তর্জাতিক কবি ও সাহিত্যিক ----------
        intlWriters: [
            {
                name: 'উইলিয়াম শেক্সপিয়ার',
                en: 'William Shakespeare',
                icon: '🎭',
                color: '#ef4444',
                role: 'ইংরেজি সাহিত্যের শ্রেষ্ঠ নাট্যকার',
                desc: 'বিশ্বসাহিত্যের সর্বশ্রেষ্ঠ নাট্যকার ও কবি। (১৫৬৪–১৬১৬)',
                books: 'হ্যামলেট, ম্যাকবেথ, ওথেলো, রোমিও অ্যান্ড জুলিয়েট'
            },
            {
                name: 'লিও টলস্টয়',
                en: 'Leo Tolstoy',
                icon: '📚',
                color: '#8b5cf6',
                role: 'রুশ ঔপন্যাসিক',
                desc: 'বিশ্বসাহিত্যের মহান ঔপন্যাসিক। (১৮২৮–১৯১০)',
                books: 'ওয়ার অ্যান্ড পিস, আন্না কারেনিনা'
            },
            {
                name: 'ফিওদর দস্তয়েভস্কি',
                en: 'Fyodor Dostoevsky',
                icon: '🖤',
                color: '#06b6d4',
                role: 'রুশ ঔপন্যাসিক',
                desc: 'অস্তিত্ববাদী সাহিত্যের পথিকৃৎ। (১৮২১–১৮৮১)',
                books: 'ক্রাইম অ্যান্ড পানিশমেন্ট, দ্য ব্রাদার্স কারামাজভ'
            },
            {
                name: 'আর্নেস্ট হেমিংওয়ে',
                en: 'Ernest Hemingway',
                icon: '🐟',
                color: '#22c55e',
                role: 'নোবেল বিজয়ী মার্কিন লেখক',
                desc: '১৯৫৪ সালে সাহিত্যে নোবেল পান। (১৮৯৯–১৯৬১)',
                books: 'দ্য ওল্ড ম্যান অ্যান্ড দ্য সি, আ ফেয়ারওয়েল টু আর্মস'
            },
            {
                name: 'রবীন্দ্রনাথ ঠাকুর',
                en: 'Rabindranath Tagore',
                icon: '🏆',
                color: '#f59e0b',
                role: 'নোবেল বিজয়ী বাঙালি কবি',
                desc: 'এশিয়ার প্রথম সাহিত্যে নোবেল বিজয়ী (১৯১৩)। (১৮৬১–১৯৪১)',
                books: 'গীতাঞ্জলি, গোরা, ঘরে-বাইরে'
            },
            {
                name: 'পাবলো নেরুদা',
                en: 'Pablo Neruda',
                icon: '🌹',
                color: '#ec4899',
                role: 'চিলিয়ান কবি • নোবেল বিজয়ী',
                desc: '১৯৭১ সালে সাহিত্যে নোবেল পান। (১৯০৪–১৯৭৩)',
                books: 'টোয়েন্টি লাভ পোয়েমস, ক্যান্টো জেনারেল'
            },
            {
                name: 'ভিক্টর হুগো',
                en: 'Victor Hugo',
                icon: '🇫🇷',
                color: '#3b82f6',
                role: 'ফরাসি লেখক',
                desc: 'ফরাসি রোমান্টিক সাহিত্যের প্রধান লেখক। (১৮০২–১৮৮৫)',
                books: 'লেস মিজারেবল, দ্য হাঞ্চব্যাক অফ নটরডেম'
            },
            {
                name: 'চার্লস ডিকেন্স',
                en: 'Charles Dickens',
                icon: '🎩',
                color: '#d97706',
                role: 'ইংরেজ ঔপন্যাসিক',
                desc: 'ভিক্টোরিয়ান যুগের সর্বশ্রেষ্ঠ ঔপন্যাসিক। (১৮১২–১৮৭০)',
                books: 'অলিভার টুইস্ট, আ টেল অফ টু সিটিজ'
            },
            {
                name: 'জর্জ অরওয়েল',
                en: 'George Orwell',
                icon: '👁️',
                color: '#a855f7',
                role: 'ইংরেজ লেখক',
                desc: 'রাজনৈতিক সাহিত্যের অন্যতম। (১৯০৩–১৯৫০)',
                books: '১৯৮৪, অ্যানিমেল ফার্ম'
            },
            {
                name: 'গ্যাব্রিয়েল গার্সিয়া মার্কেস',
                en: 'Gabriel García Márquez',
                icon: '🦋',
                color: '#14b8a6',
                role: 'নোবেল বিজয়ী কলম্বিয়ান লেখক',
                desc: 'ম্যাজিক রিয়ালিজমের জনক। (১৯২৭–২০১৪)',
                books: 'ওয়ান হান্ড্রেড ইয়ার্স অফ সলিচিউড'
            },
            {
                name: 'রুমি',
                en: 'Rumi',
                icon: '🌙',
                color: '#fbbf24',
                role: 'ফারসি সুফি কবি',
                desc: 'বিশ্বের সবচেয়ে জনপ্রিয় সুফি কবি। (১২০৭–১২৭৩)',
                books: 'মসনবি, দিওয়ান-ই-শামস-ই-তাবরিজি'
            },
            {
                name: 'হোমার',
                en: 'Homer',
                icon: '🏛️',
                color: '#f97316',
                role: 'প্রাচীন গ্রিক মহাকবি',
                desc: 'পাশ্চাত্য সাহিত্যের পথিকৃৎ। (আনু. ৮ম শতক খ্রি.পূ.)',
                books: 'ইলিয়াড, ওডিসি'
            }
        ],

        // ---------- বিশ্বকোষ ----------
        encyclopedia: [
            { name: 'বাংলাপিডিয়া', en: 'Banglapedia', icon: '🇧🇩', color: '#22c55e', desc: 'বাংলাদেশের জাতীয় বিশ্বকোষ — এশিয়াটিক সোসাইটি', url: 'https://bn.banglapedia.org' },
            { name: 'উইকিপিডিয়া', en: 'Wikipedia', icon: '📚', color: '#3b82f6', desc: 'বিশ্বের সর্ববৃহৎ মুক্ত বিশ্বকোষ', url: 'https://bn.wikipedia.org' },
            { name: 'ব্রিটানিকা', en: 'Britannica', icon: '📖', color: '#d97706', desc: 'বিশ্বের সবচেয়ে পুরোনো ও নির্ভরযোগ্য বিশ্বকোষ', url: 'https://www.britannica.com' },
            { name: 'উইকিসোর্স', en: 'Wikisource', icon: '📜', color: '#8b5cf6', desc: 'মুক্ত উৎসের বই ও ডকুমেন্ট', url: 'https://bn.wikisource.org' },
            { name: 'প্রজেক্ট গুটেনবার্গ', en: 'Project Gutenberg', icon: '📕', color: '#f59e0b', desc: '৭০,০০০+ ফ্রি ই-বুক সংগ্রহ', url: 'https://www.gutenberg.org' },
            { name: 'ইন্টারনেট আর্কাইভ', en: 'Internet Archive', icon: '🏛️', color: '#06b6d4', desc: 'ডিজিটাল লাইব্রেরি ও আর্কাইভ', url: 'https://archive.org' }
        ],

        // ---------- বিজ্ঞান ----------
        science: [
            { name: 'নাসা', en: 'NASA', icon: '🚀', color: '#3b82f6', desc: 'মহাকাশ গবেষণা — ছবি, ভিডিও, তথ্য', url: 'https://www.nasa.gov' },
            { name: 'খান একাডেমি', en: 'Khan Academy', icon: '🎓', color: '#22c55e', desc: 'সম্পূর্ণ ফ্রি শিক্ষা — গণিত, বিজ্ঞান, ইতিহাস', url: 'https://www.khanacademy.org' },
            { name: 'কোর্সেরা', en: 'Coursera', icon: '🎯', color: '#f59e0b', desc: 'বিশ্ববিদ্যালয়ের অনলাইন কোর্স', url: 'https://www.coursera.org' },
            { name: 'নেচার', en: 'Nature', icon: '🔬', color: '#06b6d4', desc: 'বিশ্বের শীর্ষস্থানীয় বিজ্ঞান জার্নাল', url: 'https://www.nature.com' },
            { name: 'সায়েন্স', en: 'Science', icon: '🧪', color: '#ef4444', desc: 'বিজ্ঞানের সর্বাধিক পঠিত জার্নাল', url: 'https://www.science.org' },
            { name: 'NPTEL', en: 'NPTEL', icon: '📡', color: '#8b5cf6', desc: 'ভারতের IIT/ IISc-এর ফ্রি ইঞ্জিনিয়ারিং কোর্স', url: 'https://nptel.ac.in' }
        ],

        // ---------- উপকারী লিংক ----------
        links: [
            { name: 'গুগল স্কলার', en: 'Google Scholar', icon: '🎓', color: '#3b82f6', desc: 'একাডেমিক পেপার ও থিসিস সার্চ', url: 'https://scholar.google.com' },
            { name: 'টেড', en: 'TED Talks', icon: '🎤', color: '#ef4444', desc: 'বিশ্বসেরা স্পিকারদের আইডিয়া', url: 'https://www.ted.com' },
            { name: 'লিব্রিভক্স', en: 'LibriVox', icon: '🎧', color: '#d97706', desc: 'ফ্রি অডিওবুক', url: 'https://librivox.org' },
            { name: 'ডুওলিঙ্গো', en: 'Duolingo', icon: '🦉', color: '#22c55e', desc: 'ভাষা শেখার সেরা ফ্রি অ্যাপ', url: 'https://www.duolingo.com' },
            { name: 'সিমলাব', en: 'Semantic Scholar', icon: '🤖', color: '#06b6d4', desc: 'AI-পাওয়ার্ড পেপার সার্চ', url: 'https://www.semanticscholar.org' },
            { name: 'গুডরিডস', en: 'Goodreads', icon: '📚', color: '#a855f7', desc: 'বই রিভিউ ও রেকমেন্ডেশন', url: 'https://www.goodreads.com' }
        ]
    };

    // =========================================================
    // 🎨 RENDER HELPERS
    // =========================================================
    function escHtml(str) {
        if (typeof str !== 'string') return str;
        return str.replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;' })[c]);
    }

    // ---------- Writers Grid ----------
    function renderWriters(containerId, writers) {
        const box = document.getElementById(containerId);
        if (!box) return;
        box.innerHTML = writers.map(w => `
            <div class="kn-card" style="--kn-color:${w.color}">
                <div class="kn-card-head">
                    <span class="kn-card-avatar">${w.icon}</span>
                    <div>
                        <div class="kn-card-name">${escHtml(w.name)}</div>
                        <p class="kn-card-en">${escHtml(w.en)}</p>
                    </div>
                </div>
                <span class="kn-card-role">${escHtml(w.role)}</span>
                <p class="kn-card-desc">${escHtml(w.desc)}</p>
                ${w.books ? `
                    <div class="kn-card-books">
                        <div class="kn-card-books-label">📚 বিখ্যাত বই</div>
                        <div class="kn-card-books-list">${escHtml(w.books)}</div>
                    </div>
                ` : ''}
            </div>
        `).join('');
    }

    // ---------- Books Grid ----------
    function renderBooks(containerId, books) {
        const box = document.getElementById(containerId);
        if (!box) return;
        box.innerHTML = books.map(b => `
            <div class="kn-book">
                <span class="kn-book-icon">${b.icon}</span>
                <div class="kn-book-info">
                    <div class="kn-book-title">${escHtml(b.title)}</div>
                    <div class="kn-book-meta">${escHtml(b.author || b.meta || '')}</div>
                    ${b.year ? `<span class="kn-book-year">${escHtml(b.year)}</span>` : ''}
                </div>
            </div>
        `).join('');
    }

    // ---------- Links Grid ----------
    function renderLinks(containerId, links) {
        const box = document.getElementById(containerId);
        if (!box) return;
        box.innerHTML = links.map(l => `
            <a class="kn-link" href="${l.url}" target="_blank" rel="noopener noreferrer" style="--kn-color:${l.color}">
                <div class="kn-link-head">
                    <span class="kn-link-icon">${l.icon}</span>
                    <span class="kn-link-title">${escHtml(l.name)}</span>
                </div>
                <p class="kn-link-desc">${escHtml(l.desc)}</p>
            </a>
        `).join('');
    }

    // =========================================================
    // 🚀 RENDER ALL
    // =========================================================
    renderWriters('knBanglaGrid', DATA.banglaWriters);
    renderBooks('knNazrulBooks', DATA.nazrulBooks);
    renderBooks('knFamousBooks', DATA.famousBooks);
    renderWriters('knIntlGrid', DATA.intlWriters);
    renderLinks('knEncycloGrid', DATA.encyclopedia);
    renderLinks('knScienceGrid', DATA.science);
    renderLinks('knLinksGrid', DATA.links);

    // =========================================================
    // 🎛️ PANEL CONTROLLER
    // =========================================================
    const card    = document.querySelector('.lh-cat-card.lh-cat-knowledge');
    const overlay = document.getElementById('knPanelOverlay');
    const closeBtn= document.getElementById('knClose');
    const body    = document.getElementById('knBody');
    const navBtns = document.querySelectorAll('.kn-nav-btn');

    if (!overlay) return;

    function openPanel() {
        overlay.classList.add('kn-open');
        overlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        setTimeout(() => closeBtn?.focus(), 100);
    }

    function closePanel() {
        overlay.classList.remove('kn-open');
        overlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        card?.focus();
    }

    card?.addEventListener('click', openPanel);
    card?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openPanel();
        }
    });
    card?.setAttribute('tabindex', '0');
    card?.setAttribute('role', 'button');

    closeBtn?.addEventListener('click', closePanel);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closePanel();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('kn-open')) {
            closePanel();
        }
    });

    // Focus trap
    overlay.addEventListener('keydown', (e) => {
        if (e.key !== 'Tab') return;
        const focusables = overlay.querySelectorAll(
            'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables.length) return;
        const first = focusables[0];
        const last  = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
            e.preventDefault(); last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault(); first.focus();
        }
    });

    // Navigation
    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = body.querySelector(`[data-kn-section="${btn.dataset.knJump}"]`);
            if (target) {
                const offsetTop = target.offsetTop - body.offsetTop - 10;
                body.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }
            navBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // Scroll spy
    let scrollTimer = null;
    body?.addEventListener('scroll', () => {
        if (scrollTimer) return;
        scrollTimer = setTimeout(() => {
            scrollTimer = null;
            const sections = body.querySelectorAll('[data-kn-section]');
            const scrollPos = body.scrollTop + 80;
            let current = '';
            sections.forEach(sec => {
                if (scrollPos >= sec.offsetTop) current = sec.dataset.knSection;
            });
            if (current) {
                navBtns.forEach(btn => {
                    btn.classList.toggle('active', btn.dataset.knJump === current);
                });
            }
        }, 100);
    });

})();/* =========================================================
   🎓 EDUCATION MASTER — Panel Controller + Complete Data
   ========================================================= */
(function () {
    'use strict';

    // =========================================================
    // 📚 DATA
    // =========================================================
    const DATA = {

        // ========== 🏫 PRIMARY ==========
        primary: [
            { icon: '🏫', name: 'DPE — প্রাথমিক শিক্ষা অধিদপ্তর', color: '#16a34a', desc: 'সরকারি প্রাথমিক শিক্ষা ব্যবস্থাপনা', url: 'http://www.dpe.gov.bd', tag: 'govt' },
            { icon: '📖', name: 'প্রাথমিক শিক্ষা বোর্ড', color: '#22c55e', desc: 'প্রাথমিক সমাপনী পরীক্ষা', url: 'http://www.dpe.gov.bd', tag: 'govt' },
            { icon: '🎒', name: 'DSHE — মাধ্যমিক ও উচ্চ শিক্ষা', color: '#3b82f6', desc: 'শিক্ষা মন্ত্রণালয়', url: 'http://www.dshe.gov.bd', tag: 'govt' },
            { icon: '🌟', name: 'a2i — শিক্ষা সেবা', color: '#f59e0b', desc: 'ডিজিটাল শিক্ষা সেবা', url: 'https://a2i.gov.bd', tag: 'govt' },
            { icon: '📱', name: 'ঘরে থাকুন, ঘরে শিখুন', color: '#8b5cf6', desc: 'শিক্ষা মন্ত্রণালয়ের অনলাইন ক্লাস', url: 'https://www.dshe.gov.bd', tag: 'govt' }
        ],

        // ========== 📚 SECONDARY ==========
        secondary: [
            { icon: '📘', name: 'NCTB — পাঠ্যবই', color: '#16a34a', desc: 'জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড', url: 'http://www.nctb.gov.bd', tag: 'free' },
            { icon: '📝', name: 'শিক্ষা বোর্ড', color: '#22c55e', desc: 'SSC পরীক্ষা ও ফলাফল', url: 'http://www.educationboard.gov.bd', tag: 'govt' },
            { icon: '🎯', name: '১০ মিনিট স্কুল', color: '#ef4444', desc: 'বাংলাদেশের সেরা অনলাইন স্কুল', url: 'https://10minuteschool.com', tag: 'paid' },
            { icon: '📚', name: 'শিখো', color: '#8b5cf6', desc: 'SSC ও HSC প্রস্তুতি', url: 'https://shikho.com', tag: 'paid' },
            { icon: '🎓', name: 'উদ্ভাস', color: '#f59e0b', desc: 'মেডিকেল ও ইঞ্জিনিয়ারিং প্রস্তুতি', url: 'https://udvash.com', tag: 'paid' }
        ],

        // ========== 🎓 HSC ==========
        hsc: [
            { icon: '🏛️', name: 'শিক্ষা বোর্ড HSC', color: '#22c55e', desc: 'HSC পরীক্ষা ও ফলাফল', url: 'http://www.educationboard.gov.bd', tag: 'govt' },
            { icon: '🎯', name: 'বিশ্ববিদ্যালয় ভর্তি গাইড', color: '#3b82f6', desc: 'সকল পাবলিক বিশ্ববিদ্যালয় তথ্য', url: 'https://ugc.gov.bd', tag: 'govt' },
            { icon: '📖', name: 'NCTB HSC পাঠ্যবই', color: '#16a34a', desc: 'PDF সহ সব বই', url: 'http://www.nctb.gov.bd', tag: 'free' },
            { icon: '💡', name: 'লেকচার পিডিয়া', color: '#ef4444', desc: 'ফ্রি ভিডিও লেকচার', url: 'https://www.youtube.com/@LecturePedia', tag: 'free' },
            { icon: '🎓', name: 'বিশ্ববিদ্যালয় ভর্তি কোচিং', color: '#8b5cf6', desc: 'ভর্তি প্রস্তুতি', url: 'https://udvash.com', tag: 'paid' }
        ],

        // ========== 🏛️ UNIVERSITIES ==========
        generalUni: [
            { icon: '🏛️', name: 'ঢাকা বিশ্ববিদ্যালয় (DU)', color: '#3b82f6', desc: 'বাংলাদেশের শীর্ষস্থানীয়', url: 'https://www.du.ac.bd', tag: 'govt' },
            { icon: '🏛️', name: 'রাজশাহী বিশ্ববিদ্যালয় (RU)', color: '#3b82f6', desc: 'রাজশাহী', url: 'https://www.ru.ac.bd', tag: 'govt' },
            { icon: '🏛️', name: 'চট্টগ্রাম বিশ্ববিদ্যালয় (CU)', color: '#3b82f6', desc: 'চট্টগ্রাম', url: 'https://www.cu.ac.bd', tag: 'govt' },
            { icon: '🏛️', name: 'জাহাঙ্গীরনগর বিশ্ববিদ্যালয় (JU)', color: '#3b82f6', desc: 'সাভার', url: 'https://www.juniv.edu', tag: 'govt' },
            { icon: '🏛️', name: 'জগন্নাথ বিশ্ববিদ্যালয় (JnU)', color: '#3b82f6', desc: 'ঢাকা', url: 'https://www.jnu.ac.bd', tag: 'govt' },
            { icon: '🏛️', name: 'খুলনা বিশ্ববিদ্যালয় (KU)', color: '#3b82f6', desc: 'খুলনা', url: 'https://www.ku.ac.bd', tag: 'govt' },
            { icon: '🏛️', name: 'ইসলামী বিশ্ববিদ্যালয় (IU)', color: '#3b82f6', desc: 'কুষ্টিয়া', url: 'https://www.iu.ac.bd', tag: 'govt' },
            { icon: '🏛️', name: 'জাতীয় বিশ্ববিদ্যালয় (NU)', color: '#3b82f6', desc: 'গাজীপুর', url: 'https://www.nu.ac.bd', tag: 'govt' },
            { icon: '🏛️', name: 'বাংলাদেশ উন্মুক্ত বিশ্ববিদ্যালয় (BOU)', color: '#3b82f6', desc: 'গাজীপুর', url: 'https://www.bou.ac.bd', tag: 'govt' },
            { icon: '🎓', name: 'BUP', color: '#8b5cf6', desc: 'বাংলাদেশ ইউনিভার্সিটি অব প্রফেশনালস', url: 'https://www.bup.edu.bd', tag: 'govt' },
            { icon: '🎓', name: 'BUTEX', color: '#8b5cf6', desc: 'বাংলাদেশ টেক্সটাইল বিশ্ববিদ্যালয়', url: 'https://www.butex.edu.bd', tag: 'govt' },
            { icon: '🎓', name: 'SUST', color: '#22c55e', desc: 'শাহজালাল বিজ্ঞান ও প্রযুক্তি', url: 'https://www.sust.edu', tag: 'govt' },
            { icon: '🎓', name: 'HSTU', color: '#22c55e', desc: 'হাজী দানেশ বিজ্ঞান ও প্রযুক্তি', url: 'https://www.hstu.ac.bd', tag: 'govt' },
            { icon: '🎓', name: 'MBSTU', color: '#22c55e', desc: 'মাওলানা ভাসানী বিজ্ঞান ও প্রযুক্তি', url: 'https://www.mbstu.ac.bd', tag: 'govt' },
            { icon: '🎓', name: 'PUST', color: '#22c55e', desc: 'পাবনা বিজ্ঞান ও প্রযুক্তি', url: 'https://www.pust.ac.bd', tag: 'govt' },
            { icon: '🎓', name: 'NSTU', color: '#22c55e', desc: 'নোয়াখালী বিজ্ঞান ও প্রযুক্তি', url: 'https://www.nstu.edu.bd', tag: 'govt' },
            { icon: '🎓', name: 'JUST', color: '#22c55e', desc: 'যশোর বিজ্ঞান ও প্রযুক্তি', url: 'https://www.just.edu.bd', tag: 'govt' },
            { icon: '🎓', name: 'বেগম রোকেয়া বিশ্ববিদ্যালয়', color: '#3b82f6', desc: 'রংপুর', url: 'https://www.brur.ac.bd', tag: 'govt' },
            { icon: '🎓', name: 'কুমিল্লা বিশ্ববিদ্যালয়', color: '#3b82f6', desc: 'কুমিল্লা', url: 'https://www.cou.ac.bd', tag: 'govt' },
            { icon: '🎓', name: 'বরিশাল বিশ্ববিদ্যালয়', color: '#3b82f6', desc: 'বরিশাল', url: 'https://www.bu.ac.bd', tag: 'govt' },
            { icon: '🎓', name: 'রবীন্দ্র বিশ্ববিদ্যালয়', color: '#3b82f6', desc: 'সিরাজগঞ্জ', url: 'https://www.rbu.ac.bd', tag: 'govt' },
            { icon: '🎓', name: 'বঙ্গবন্ধু শেখ মুজিবুর রহমান ডিজিটাল ইউনিভার্সিটি', color: '#3b82f6', desc: 'গাজীপুর', url: 'https://bsmrau.edu.bd', tag: 'govt' },
            { icon: '🎓', name: 'পটুয়াখালী বিজ্ঞান ও প্রযুক্তি (PSTU)', color: '#22c55e', desc: 'পটুয়াখালী', url: 'https://www.pstu.ac.bd', tag: 'govt' },
            { icon: '🎓', name: 'সিলেট কৃষি বিশ্ববিদ্যালয় (SAU)', color: '#22c55e', desc: 'সিলেট', url: 'https://www.sau.ac.bd', tag: 'govt' },
            { icon: '🎓', name: 'বাংলাদেশ কৃষি বিশ্ববিদ্যালয় (BAU)', color: '#22c55e', desc: 'ময়মনসিংহ', url: 'https://www.bau.edu.bd', tag: 'govt' },
            { icon: '🎓', name: 'শের-ই-বাংলা কৃষি বিশ্ববিদ্যালয়', color: '#22c55e', desc: 'ঢাকা', url: 'https://sau.edu.bd', tag: 'govt' },
            { icon: '🎓', name: 'খুলনা কৃষি বিশ্ববিদ্যালয়', color: '#22c55e', desc: 'খুলনা', url: 'https://www.kau.edu.bd', tag: 'govt' }
        ],

        // ========== 📋 BOARDS (১১টি) ==========
        boards: [
            { icon: '🕌', name: 'মাদ্রাসা শিক্ষা বোর্ড', color: '#16a34a', desc: 'দাখিল, আলিম, ফাযিল, কামিল', url: 'http://www.bmeb.gov.bd', tag: 'govt' },
            { icon: '⚙️', name: 'কারিগরি শিক্ষা বোর্ড', color: '#8b5cf6', desc: 'BTEB — ডিপ্লোমা ও ভোকেশনাল', url: 'http://www.bteb.gov.bd', tag: 'govt' },
            { icon: '🏛️', name: 'ঢাকা শিক্ষা বোর্ড', color: '#3b82f6', desc: 'Dhaka Board', url: 'http://www.dhakaeducationboard.gov.bd', tag: 'govt' },
            { icon: '🏛️', name: 'রাজশাহী শিক্ষা বোর্ড', color: '#3b82f6', desc: 'Rajshahi Board', url: 'http://www.rajshahieducationboard.gov.bd', tag: 'govt' },
            { icon: '🏛️', name: 'কুমিল্লা শিক্ষা বোর্ড', color: '#3b82f6', desc: 'Cumilla Board', url: 'http://www.comillaboard.gov.bd', tag: 'govt' },
            { icon: '🏛️', name: 'যশোর শিক্ষা বোর্ড', color: '#3b82f6', desc: 'Jashore Board', url: 'http://www.jessoreboard.gov.bd', tag: 'govt' },
            { icon: '🏛️', name: 'চট্টগ্রাম শিক্ষা বোর্ড', color: '#3b82f6', desc: 'Chattogram Board', url: 'http://www.bise-ctg.gov.bd', tag: 'govt' },
            { icon: '🏛️', name: 'বরিশাল শিক্ষা বোর্ড', color: '#3b82f6', desc: 'Barishal Board', url: 'http://www.barisalboard.gov.bd', tag: 'govt' },
            { icon: '🏛️', name: 'সিলেট শিক্ষা বোর্ড', color: '#3b82f6', desc: 'Sylhet Board', url: 'http://www.sylhetboard.gov.bd', tag: 'govt' },
            { icon: '🏛️', name: 'দিনাজপুর শিক্ষা বোর্ড', color: '#3b82f6', desc: 'Dinajpur Board', url: 'http://www.dinajpureducationboard.gov.bd', tag: 'govt' },
            { icon: '🏛️', name: 'ময়মনসিংহ শিক্ষা বোর্ড', color: '#3b82f6', desc: 'Mymensingh Board', url: 'http://www.mymensingheducationboard.gov.bd', tag: 'govt' }
        ],

        // ========== ⚙️ ENGINEERING ==========
        engineering: [
            { icon: '⚙️', name: 'বাংলাদেশ প্রকৌশল বিশ্ববিদ্যালয় (BUET)', color: '#a855f7', desc: 'ঢাকা — দেশের শীর্ষ', url: 'https://www.buet.ac.bd', tag: 'engineering' },
            { icon: '⚙️', name: 'চট্টগ্রাম প্রকৌশল ও প্রযুক্তি (CUET)', color: '#a855f7', desc: 'চট্টগ্রাম', url: 'https://www.cuet.ac.bd', tag: 'engineering' },
            { icon: '⚙️', name: 'রাজশাহী প্রকৌশল ও প্রযুক্তি (RUET)', color: '#a855f7', desc: 'রাজশাহী', url: 'https://www.ruet.ac.bd', tag: 'engineering' },
            { icon: '⚙️', name: 'খুলনা প্রকৌশল ও প্রযুক্তি (KUET)', color: '#a855f7', desc: 'খুলনা', url: 'https://www.kuet.ac.bd', tag: 'engineering' },
            { icon: '⚙️', name: 'ঢাকা প্রকৌশল ও প্রযুক্তি (DUET)', color: '#a855f7', desc: 'গাজীপুর', url: 'https://www.duet.ac.bd', tag: 'engineering' },
            { icon: '⚙️', name: 'ইসলামিক ইউনিভার্সিটি অব টেকনোলজি (IUT)', color: '#a855f7', desc: 'গাজীপুর — OIC', url: 'https://www.iutoic-dhaka.edu', tag: 'engineering' },
            { icon: '⚙️', name: 'বাংলাদেশ টেক্সটাইল বিশ্ববিদ্যালয় (BUTEX)', color: '#a855f7', desc: 'ঢাকা', url: 'https://www.butex.edu.bd', tag: 'engineering' },
            { icon: '⚙️', name: 'MIST', color: '#a855f7', desc: 'মিলিটারি ইনস্টিটিউট অব সায়েন্স', url: 'https://mist.ac.bd', tag: 'engineering' }
        ],

        // ========== 🏥 MEDICAL ==========
        medical: [
            { icon: '🏥', name: 'ঢাকা মেডিকেল কলেজ (DMC)', color: '#ef4444', desc: 'ঢাকা', url: 'https://www.dmc.gov.bd', tag: 'medical' },
            { icon: '🏥', name: 'স্যার সলিমুল্লাহ মেডিকেল কলেজ (SSMC)', color: '#ef4444', desc: 'ঢাকা — মিটফোর্ড', url: 'https://ssmc.gov.bd', tag: 'medical' },
            { icon: '🏥', name: 'শহীদ সোহরাওয়ার্দী মেডিকেল কলেজ (ShSMC)', color: '#ef4444', desc: 'ঢাকা', url: 'https://shsmc.gov.bd', tag: 'medical' },
            { icon: '🏥', name: 'চট্টগ্রাম মেডিকেল কলেজ (CMC)', color: '#ef4444', desc: 'চট্টগ্রাম', url: 'https://www.cmc.gov.bd', tag: 'medical' },
            { icon: '🏥', name: 'রাজশাহী মেডিকেল কলেজ (RMC)', color: '#ef4444', desc: 'রাজশাহী', url: 'https://www.rmc.gov.bd', tag: 'medical' },
            { icon: '🏥', name: 'ময়মনসিংহ মেডিকেল কলেজ (MMC)', color: '#ef4444', desc: 'ময়মনসিংহ', url: 'https://www.mmc.gov.bd', tag: 'medical' },
            { icon: '🏥', name: 'শহীদ জিয়াউর রহমান মেডিকেল কলেজ (SZMC)', color: '#ef4444', desc: 'বগুড়া', url: 'https://www.szmc.edu.bd', tag: 'medical' },
            { icon: '🏥', name: 'খুলনা মেডিকেল কলেজ (KMC)', color: '#ef4444', desc: 'খুলনা', url: 'https://www.kmc.gov.bd', tag: 'medical' },
            { icon: '🏥', name: 'শের-ই-বাংলা মেডিকেল কলেজ (SBMC)', color: '#ef4444', desc: 'বরিশাল', url: 'https://www.sbmc.gov.bd', tag: 'medical' },
            { icon: '🏥', name: 'সিলেট এম.এ.জি. ওসমানী মেডিকেল (SOMC)', color: '#ef4444', desc: 'সিলেট', url: 'https://www.somc.gov.bd', tag: 'medical' },
            { icon: '🏥', name: 'রংপুর মেডিকেল কলেজ (RpMC)', color: '#ef4444', desc: 'রংপুর', url: 'https://www.rangpurmedical.gov.bd', tag: 'medical' },
            { icon: '🏥', name: 'ফরিদপুর মেডিকেল কলেজ (FMC)', color: '#ef4444', desc: 'ফরিদপুর', url: 'https://www.fmc.gov.bd', tag: 'medical' },
            { icon: '🏥', name: 'কুমিল্লা মেডিকেল কলেজ', color: '#ef4444', desc: 'কুমিল্লা', url: 'https://www.cumillamedical.gov.bd', tag: 'medical' },
            { icon: '🏥', name: 'মাগুরা মেডিকেল কলেজ', color: '#ef4444', desc: 'মাগুরা', url: 'https://www.maguramedical.gov.bd', tag: 'medical' },
            { icon: '🏥', name: 'নোয়াখালী মেডিকেল কলেজ', color: '#ef4444', desc: 'নোয়াখালী', url: 'https://www.nmc.gov.bd', tag: 'medical' },
            { icon: '🏥', name: 'কক্সবাজার মেডিকেল কলেজ', color: '#ef4444', desc: 'কক্সবাজার', url: 'https://www.coxbazarmedical.gov.bd', tag: 'medical' },
            { icon: '🏥', name: 'পাবনা মেডিকেল কলেজ', color: '#ef4444', desc: 'পাবনা', url: 'https://www.pabnamedical.gov.bd', tag: 'medical' },
            { icon: '🏥', name: 'সাতক্ষীরা মেডিকেল কলেজ', color: '#ef4444', desc: 'সাতক্ষীরা', url: 'https://www.satkhiramedical.gov.bd', tag: 'medical' },
            { icon: '🏥', name: 'টাঙ্গাইল মেডিকেল কলেজ', color: '#ef4444', desc: 'টাঙ্গাইল', url: 'https://www.tangailmedical.gov.bd', tag: 'medical' },
            { icon: '🏥', name: 'দিনাজপুর মেডিকেল কলেজ', color: '#ef4444', desc: 'দিনাজপুর', url: 'https://www.dinajpurmedical.gov.bd', tag: 'medical' },
            { icon: '🏥', name: 'জামালপুর মেডিকেল কলেজ', color: '#ef4444', desc: 'জামালপুর', url: 'https://www.jamalpurmedical.gov.bd', tag: 'medical' },
            { icon: '🏥', name: 'চাঁদপুর মেডিকেল কলেজ', color: '#ef4444', desc: 'চাঁদপুর', url: 'https://www.chandpurmedical.gov.bd', tag: 'medical' },
            { icon: '🏥', name: 'কুষ্টিয়া মেডিকেল কলেজ', color: '#ef4444', desc: 'কুষ্টিয়া', url: 'https://www.kushtiamedical.gov.bd', tag: 'medical' },
            { icon: '🏥', name: 'শহীদ সৈয়দ নজরুল ইসলাম মেডিকেল', color: '#ef4444', desc: 'কিশোরগঞ্জ', url: 'https://www.snmedical.gov.bd', tag: 'medical' },
            { icon: '🏥', name: 'শেখ হাসিনা মেডিকেল কলেজ', color: '#ef4444', desc: 'জামালপুর', url: 'https://www.shmc.gov.bd', tag: 'medical' },
            { icon: '🏥', name: 'গোপালগঞ্জ মেডিকেল কলেজ', color: '#ef4444', desc: 'গোপালগঞ্জ', url: 'https://www.gopalmc.gov.bd', tag: 'medical' },
            { icon: '🏥', name: 'রাঙ্গামাটি মেডিকেল কলেজ', color: '#ef4444', desc: 'রাঙ্গামাটি', url: 'https://www.rmc.gov.bd', tag: 'medical' },
            { icon: '🏥', name: 'হবিগঞ্জ মেডিকেল কলেজ', color: '#ef4444', desc: 'হবিগঞ্জ', url: 'https://www.habiganjmedical.gov.bd', tag: 'medical' },
            { icon: '🏥', name: 'মুন্সিগঞ্জ মেডিকেল কলেজ', color: '#ef4444', desc: 'মুন্সিগঞ্জ', url: 'https://www.munshiganjmedical.gov.bd', tag: 'medical' },
            { icon: '🏥', name: 'ভোলা মেডিকেল কলেজ', color: '#ef4444', desc: 'ভোলা', url: 'https://www.bholamedical.gov.bd', tag: 'medical' },
            { icon: '🏥', name: 'নেত্রকোনা মেডিকেল কলেজ', color: '#ef4444', desc: 'নেত্রকোনা', url: 'https://www.netrok namedical.gov.bd', tag: 'medical' },
            { icon: '🏥', name: 'নারায়ণগঞ্জ মেডিকেল কলেজ', color: '#ef4444', desc: 'নারায়ণগঞ্জ', url: 'https://www.narayanganjmedical.gov.bd', tag: 'medical' },
            { icon: '🏥', name: 'নওগাঁ মেডিকেল কলেজ', color: '#ef4444', desc: 'নওগাঁ', url: 'https://www.naogaonmedical.gov.bd', tag: 'medical' },
            { icon: '🏥', name: 'কুড়িগ্রাম মেডিকেল কলেজ', color: '#ef4444', desc: 'কুড়িগ্রাম', url: 'https://www.kurigrammedical.gov.bd', tag: 'medical' },
            { icon: '🏥', name: 'পিরোজপুর মেডিকেল কলেজ', color: '#ef4444', desc: 'পিরোজপুর', url: 'https://www.pirojpurmedical.gov.bd', tag: 'medical' },
            { icon: '🏥', name: 'মাদারীপুর মেডিকেল কলেজ', color: '#ef4444', desc: 'মাদারীপুর', url: 'https://www.madaripurmedical.gov.bd', tag: 'medical' }
        ],

        // ========== 🗣️ LANGUAGES (১৫টি) ==========
        language: [
            { icon: '🇬🇧', name: 'ইংরেজি (English)', color: '#3b82f6', desc: 'Duolingo, BBC Learning, Cambridge', url: 'https://www.duolingo.com', tag: 'language' },
            { icon: '🇸🇦', name: 'আরবি (Arabic)', color: '#16a34a', desc: 'Madinah Arabic, Duolingo Arabic', url: 'https://www.madinaharabic.com', tag: 'language' },
            { icon: '🇮🇳', name: 'হিন্দি (Hindi)', color: '#f97316', desc: 'Duolingo, HindiPod101', url: 'https://www.duolingo.com', tag: 'language' },
            { icon: '🇨🇳', name: 'চীনা (Chinese)', color: '#ef4444', desc: 'HelloChinese, Duolingo', url: 'https://www.hellochinese.cc', tag: 'language' },
            { icon: '🇩🇪', name: 'জার্মান (German)', color: '#f59e0b', desc: 'DW Learn German, Duolingo', url: 'https://learngerman.dw.com', tag: 'language' },
            { icon: '🇫🇷', name: 'ফ্রেঞ্চ (French)', color: '#3b82f6', desc: 'Duolingo, Babbel French', url: 'https://www.duolingo.com', tag: 'language' },
            { icon: '🇯🇵', name: 'জাপানি (Japanese)', color: '#ef4444', desc: 'Duolingo, Tofugu, NHK Easy', url: 'https://www.tofugu.com', tag: 'language' },
            { icon: '🇰🇷', name: 'কোরিয়ান (Korean)', color: '#8b5cf6', desc: 'Duolingo, Talk To Me In Korean', url: 'https://talktomeinkorean.com', tag: 'language' },
            { icon: '🇪🇸', name: 'স্প্যানিশ (Spanish)', color: '#f59e0b', desc: 'Duolingo, SpanishDict', url: 'https://www.duolingo.com', tag: 'language' },
            { icon: '🇹🇷', name: 'তুর্কি (Turkish)', color: '#ef4444', desc: 'Duolingo, Turkish Tea Time', url: 'https://www.duolingo.com', tag: 'language' },
            { icon: '🇷🇺', name: 'রাশিয়ান (Russian)', color: '#3b82f6', desc: 'Duolingo, RussianPod101', url: 'https://www.duolingo.com', tag: 'language' },
            { icon: '🇮🇹', name: 'ইতালিয়ান (Italian)', color: '#16a34a', desc: 'Duolingo, ItalianPod101', url: 'https://www.duolingo.com', tag: 'language' },
            { icon: '🇵🇹', name: 'পর্তুগিজ (Portuguese)', color: '#22c55e', desc: 'Duolingo, PortuguesePod101', url: 'https://www.duolingo.com', tag: 'language' },
            { icon: '🇳🇱', name: 'ডাচ (Dutch)', color: '#f97316', desc: 'Duolingo, DutchPod101', url: 'https://www.duolingo.com', tag: 'language' },
            { icon: '🇹🇭', name: 'থাই (Thai)', color: '#8b5cf6', desc: 'ThaiPod101, Learn Thai', url: 'https://www.thaipod101.com', tag: 'language' }
        ],

        // ========== 🧠 HUMAN BODY ==========
        human: [
            { icon: '🧠', name: 'Kenhub — Anatomy', color: '#06b6d4', desc: 'মানবদেহের অ্যানাটমি', url: 'https://www.kenhub.com', tag: 'science' },
            { icon: '🫀', name: 'InnerBody', color: '#ef4444', desc: 'ইন্টারঅ্যাকটিভ মানবদেহ', url: 'https://www.innerbody.com', tag: 'science' },
            { icon: '🩺', name: 'MedlinePlus', color: '#3b82f6', desc: 'স্বাস্থ্য ও শারীরবিদ্যা', url: 'https://medlineplus.gov', tag: 'medical' },
            { icon: '🧬', name: 'NCBI', color: '#16a34a', desc: 'জিন ও মেডিকেল রিসার্চ', url: 'https://www.ncbi.nlm.nih.gov', tag: 'science' },
            { icon: '❤️', name: 'Visible Body', color: '#f59e0b', desc: '3D হিউম্যান অ্যানাটমি', url: 'https://www.visiblebody.com', tag: 'paid' },
            { icon: '💊', name: 'WebMD', color: '#8b5cf6', desc: 'রোগ ও চিকিৎসা', url: 'https://www.webmd.com', tag: 'free' },
            { icon: '🧪', name: 'Khan Academy Biology', color: '#22c55e', desc: 'মানব জীববিজ্ঞান', url: 'https://www.khanacademy.org/science/biology', tag: 'free' },
            { icon: '🫁', name: 'BioDigital', color: '#06b6d4', desc: '3D মানবদেহ', url: 'https://www.biodigital.com', tag: 'free' }
        ],

        // ========== 🤖 AI & ROBOTICS ==========
        ai: [
            { icon: '🤖', name: 'Coursera AI', color: '#8b5cf6', desc: 'AI ও ML কোর্স', url: 'https://www.coursera.org/browse/data-science/machine-learning', tag: 'ai' },
            { icon: '🧠', name: 'DeepLearning.AI', color: '#f59e0b', desc: 'Andrew Ng-এর AI কোর্স', url: 'https://www.deeplearning.ai', tag: 'ai' },
            { icon: '📊', name: 'Kaggle Learn', color: '#3b82f6', desc: 'ডেটা সায়েন্স ও ML', url: 'https://www.kaggle.com/learn', tag: 'free' },
            { icon: '🐍', name: 'Python.org', color: '#16a34a', desc: 'Python প্রোগ্রামিং', url: 'https://www.python.org', tag: 'free' },
            { icon: '⚙️', name: 'Arduino', color: '#06b6d4', desc: 'রোবোটিক্স ও ইলেকট্রনিক্স', url: 'https://www.arduino.cc', tag: 'free' },
            { icon: '🦾', name: 'ROS — Robot OS', color: '#ef4444', desc: 'রোবোটিক্স অপারেটিং সিস্টেম', url: 'https://www.ros.org', tag: 'free' },
            { icon: '🧬', name: 'TensorFlow', color: '#f97316', desc: 'Google-এর ML ফ্রেমওয়ার্ক', url: 'https://www.tensorflow.org', tag: 'ai' },
            { icon: '🔥', name: 'PyTorch', color: '#ef4444', desc: 'Meta-র ML ফ্রেমওয়ার্ক', url: 'https://pytorch.org', tag: 'ai' },
            { icon: '💬', name: 'Hugging Face', color: '#f59e0b', desc: 'AI মডেল ও ডেটাসেট', url: 'https://huggingface.co', tag: 'ai' },
            { icon: '🎓', name: 'fast.ai', color: '#8b5cf6', desc: 'ফ্রি ডিপ লার্নিং কোর্স', url: 'https://www.fast.ai', tag: 'free' }
        ],

        // ========== 🔬 SCIENCE ==========
        science: [
            { icon: '🚀', name: 'NASA', color: '#3b82f6', desc: 'মহাকাশ গবেষণা', url: 'https://www.nasa.gov', tag: 'science' },
            { icon: '🔬', name: 'Nature', color: '#06b6d4', desc: 'শীর্ষস্থানীয় বিজ্ঞান জার্নাল', url: 'https://www.nature.com', tag: 'science' },
            { icon: '🧪', name: 'Science.org', color: '#ef4444', desc: 'বিজ্ঞানের সর্বাধিক পঠিত জার্নাল', url: 'https://www.science.org', tag: 'science' },
            { icon: '📐', name: 'PhET Simulations', color: '#22c55e', desc: 'ইন্টারঅ্যাকটিভ সায়েন্স সিমুলেশন', url: 'https://phet.colorado.edu', tag: 'free' },
            { icon: '🌍', name: 'National Geographic', color: '#f59e0b', desc: 'প্রকৃতি ও বিজ্ঞান', url: 'https://www.nationalgeographic.com', tag: 'free' },
            { icon: '⚛️', name: 'CERN', color: '#8b5cf6', desc: 'পার্টিকেল ফিজিক্স', url: 'https://home.cern', tag: 'science' },
            { icon: '🧬', name: 'BioRxiv', color: '#16a34a', desc: 'বায়োলজি প্রিপ্রিন্ট', url: 'https://www.biorxiv.org', tag: 'free' },
            { icon: '📊', name: 'arXiv', color: '#f97316', desc: 'ফিজিক্স, ম্যাথ, CS পেপার', url: 'https://arxiv.org', tag: 'free' }
        ],

        // ========== 💼 BUSINESS ==========
        business: [
            { icon: '📈', name: 'Coursera Business', color: '#f59e0b', desc: 'Business ও Marketing কোর্স', url: 'https://www.coursera.org/business', tag: 'business' },
            { icon: '💰', name: 'Investopedia', color: '#16a34a', desc: 'ফিন্যান্স ও বিনিয়োগ', url: 'https://www.investopedia.com', tag: 'free' },
            { icon: '📊', name: 'Harvard Business Review', color: '#ef4444', desc: 'বিজনেস আর্টিকেল', url: 'https://hbr.org', tag: 'paid' },
            { icon: '🎯', name: 'HubSpot Academy', color: '#f97316', desc: 'ফ্রি মার্কেটিং কোর্স', url: 'https://academy.hubspot.com', tag: 'free' },
            { icon: '🏦', name: 'Khan Academy Finance', color: '#22c55e', desc: 'ফিন্যান্স বেসিক', url: 'https://www.khanacademy.org/economics-finance-domain', tag: 'free' },
            { icon: '💼', name: 'edX Business', color: '#8b5cf6', desc: 'MIT, Wharton কোর্স', url: 'https://www.edx.org/learn/business', tag: 'business' },
            { icon: '📚', name: 'Corporate Finance Institute', color: '#3b82f6', desc: 'CFI সার্টিফিকেশন', url: 'https://corporatefinanceinstitute.com', tag: 'paid' },
            { icon: '🎓', name: 'Wharton Online', color: '#06b6d4', desc: 'পেনসিলভানিয়া বিশ্ববিদ্যালয়', url: 'https://online.wharton.upenn.edu', tag: 'paid' }
        ],

        // ========== 🎨 DESIGN ==========
        design: [
            { icon: '🎨', name: 'Canva Design School', color: '#06b6d4', desc: 'ফ্রি ডিজাইন কোর্স', url: 'https://www.canva.com/designschool', tag: 'free' },
            { icon: '🖌️', name: 'Adobe Learn', color: '#ef4444', desc: 'Photoshop, Illustrator', url: 'https://helpx.adobe.com/learning.html', tag: 'free' },
            { icon: '✏️', name: 'Figma Academy', color: '#f59e0b', desc: 'UI/UX ডিজাইন', url: 'https://www.figma.com/resource-library', tag: 'free' },
            { icon: '📐', name: 'Dribbble', color: '#ec4899', desc: 'ডিজাইন ইনস্পিরেশন', url: 'https://dribbble.com', tag: 'free' },
            { icon: '🎬', name: 'YouTube Creators', color: '#ef4444', desc: 'ভিডিও এডিটিং', url: 'https://www.youtube.com/creators', tag: 'free' },
            { icon: '📷', name: 'Photography Life', color: '#8b5cf6', desc: 'ফটোগ্রাফি শেখা', url: 'https://photographylife.com', tag: 'free' },
            { icon: '🎥', name: 'Motion Design School', color: '#16a34a', desc: 'মোশন গ্রাফিক্স', url: 'https://motiondesign.school', tag: 'paid' },
            { icon: '🖼️', name: 'Behance', color: '#3b82f6', desc: 'ডিজাইন পোর্টফোলিও', url: 'https://www.behance.net', tag: 'free' }
        ],

        // ========== 💻 ONLINE ==========
        online: [
            { icon: '🎓', name: 'Coursera', color: '#3b82f6', desc: 'বিশ্ববিদ্যালয়ের অনলাইন কোর্স', url: 'https://www.coursera.org', tag: 'free' },
            { icon: '📚', name: 'Khan Academy', color: '#22c55e', desc: 'সম্পূর্ণ ফ্রি শিক্ষা', url: 'https://www.khanacademy.org', tag: 'free' },
            { icon: '🎬', name: 'Udemy', color: '#ef4444', desc: '৬০,০০০+ কোর্স', url: 'https://www.udemy.com', tag: 'paid' },
            { icon: '🎯', name: 'edX', color: '#8b5cf6', desc: 'MIT, Harvard কোর্স', url: 'https://www.edx.org', tag: 'free' },
            { icon: '📡', name: 'NPTEL', color: '#f59e0b', desc: 'IIT কোর্স', url: 'https://nptel.ac.in', tag: 'free' },
            { icon: '🆓', name: 'freeCodeCamp', color: '#16a34a', desc: 'ফ্রি প্রোগ্রামিং কোর্স', url: 'https://www.freecodecamp.org', tag: 'free' },
            { icon: '🌐', name: 'Alison', color: '#06b6d4', desc: 'ফ্রি অনলাইন কোর্স', url: 'https://alison.com', tag: 'free' },
            { icon: '📘', name: 'FutureLearn', color: '#a855f7', desc: 'বিশ্ববিদ্যালয়ের ফ্রি কোর্স', url: 'https://www.futurelearn.com', tag: 'free' }
        ],

        // ========== 🌐 VIRTUAL / DISTANCE ==========
        virtual: [
            { icon: '🎓', name: 'BOU — উন্মুক্ত বিশ্ববিদ্যালয়', color: '#3b82f6', desc: 'দূরশিক্ষণ ডিগ্রি', url: 'https://www.bou.ac.bd', tag: 'govt' },
            { icon: '🌐', name: 'edX MicroMasters', color: '#8b5cf6', desc: 'MIT ডিগ্রি প্রোগ্রাম', url: 'https://www.edx.org/masters', tag: 'free' },
            { icon: '🎯', name: 'Coursera Degrees', color: '#3b82f6', desc: 'অনলাইন ডিগ্রি', url: 'https://www.coursera.org/degrees', tag: 'paid' },
            { icon: '📚', name: 'OpenLearn — OU', color: '#f59e0b', desc: 'Open University UK', url: 'https://www.open.edu/openlearn', tag: 'free' },
            { icon: '🏛️', name: 'MOOCs.org', color: '#06b6d4', desc: 'সব MOOC তালিকা', url: 'https://www.mooc.org', tag: 'free' },
            { icon: '🎬', name: 'Class Central', color: '#16a34a', desc: 'অনলাইন কোর্স ডিরেক্টরি', url: 'https://www.classcentral.com', tag: 'free' }
        ],

        // ========== 📝 JOBS PREP ==========
        jobs: [
            { icon: '📝', name: 'BPSC — BCS', color: '#ef4444', desc: 'বিসিএস অফিসিয়াল', url: 'http://www.bpsc.gov.bd', tag: 'jobs' },
            { icon: '🏦', name: 'ব্যাংক নিয়োগ', color: '#3b82f6', desc: 'বাংলাদেশ ব্যাংক', url: 'https://erecruitment.bb.org.bd', tag: 'jobs' },
            { icon: '🎓', name: 'প্রাইমারি নিয়োগ', color: '#22c55e', desc: 'DPE শিক্ষক নিয়োগ', url: 'http://www.dpe.gov.bd', tag: 'jobs' },
            { icon: '👨‍🏫', name: 'NTRCA — শিক্ষক নিবন্ধন', color: '#f59e0b', desc: 'শিক্ষক নিবন্ধন', url: 'http://www.ntrca.gov.bd', tag: 'jobs' },
            { icon: '📊', name: 'Teletalk', color: '#8b5cf6', desc: 'সরকারি চাকরির আবেদন', url: 'http://www.teletalk.com.bd', tag: 'jobs' },
            { icon: '🎯', name: 'BCS প্রিলি প্রস্তুতি', color: '#06b6d4', desc: 'অনলাইন প্রস্তুতি', url: 'https://www.youtube.com', tag: 'free' },
            { icon: '📚', name: 'BDJobs', color: '#a855f7', desc: 'প্রাইভেট চাকরির খবর', url: 'https://bdjobs.com', tag: 'free' }
        ],

        // ========== 🎯 SCHOLARSHIP ==========
        scholarship: [
            { icon: '🇺🇸', name: 'Fulbright', color: '#3b82f6', desc: 'USA-তে উচ্চশিক্ষা', url: 'https://bd.usembassy.gov', tag: 'scholarship' },
            { icon: '🇬🇧', name: 'Commonwealth', color: '#ef4444', desc: 'UK-তে মাস্টার্স/পিএইচডি', url: 'https://cscuk.fcdo.gov.uk', tag: 'scholarship' },
            { icon: '🇦🇺', name: 'Australia Awards', color: '#22c55e', desc: 'অস্ট্রেলিয়া', url: 'https://www.dfat.gov.au', tag: 'scholarship' },
            { icon: '🇩🇪', name: 'DAAD', color: '#f59e0b', desc: 'জার্মানি', url: 'https://www.daad.de', tag: 'scholarship' },
            { icon: '🇯🇵', name: 'MEXT', color: '#ef4444', desc: 'জাপান', url: 'https://www.studyinjapan.go.jp', tag: 'scholarship' },
            { icon: '🌍', name: 'Chevening', color: '#8b5cf6', desc: 'UK প্রিমিয়ার', url: 'https://www.chevening.org', tag: 'scholarship' },
            { icon: '🇰🇷', name: 'Korean Scholarship', color: '#06b6d4', desc: 'দক্ষিণ কোরিয়া', url: 'https://www.studyinkorea.go.kr', tag: 'scholarship' },
            { icon: '🇨🇳', name: 'Chinese Scholarship', color: '#ec4899', desc: 'চীন', url: 'https://www.campuschina.org', tag: 'scholarship' }
        ],

        // ========== 📖 LIBRARY ==========
        library: [
            { icon: '📖', name: 'Project Gutenberg', color: '#f59e0b', desc: '৭০,০০০+ ফ্রি ই-বুক', url: 'https://www.gutenberg.org', tag: 'free' },
            { icon: '📚', name: 'Internet Archive', color: '#3b82f6', desc: 'ডিজিটাল লাইব্রেরি', url: 'https://archive.org', tag: 'free' },
            { icon: '🇧🇩', name: 'বাংলাপিডিয়া', color: '#22c55e', desc: 'বাংলাদেশের বিশ্বকোষ', url: 'https://bn.banglapedia.org', tag: 'free' },
            { icon: '📕', name: 'Open Library', color: '#8b5cf6', desc: '৩০ লাখ+ ফ্রি বই', url: 'https://openlibrary.org', tag: 'free' },
            { icon: '📘', name: 'Google Books', color: '#ef4444', desc: 'বই সার্চ ও প্রিভিউ', url: 'https://books.google.com', tag: 'free' },
            { icon: '🎧', name: 'LibriVox', color: '#06b6d4', desc: 'ফ্রি অডিওবুক', url: 'https://librivox.org', tag: 'free' }
        ]
    };

    // =========================================================
    // 🎨 RENDER FUNCTION
    // =========================================================
    function escHtml(str) {
        if (typeof str !== 'string') return str;
        return str.replace(/[&<>"']/g, c => ({
            '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'
        })[c]);
    }

    function renderLinks(containerId, items) {
        const box = document.getElementById(containerId);
        if (!box) return;
        box.innerHTML = items.map(item => `
            <a class="edu-link" href="${item.url}" target="_blank" rel="noopener noreferrer" style="--edu-color:${item.color}">
                <div class="edu-link-head">
                    <span class="edu-link-icon">${item.icon}</span>
                    <span class="edu-link-title">${escHtml(item.name)}</span>
                </div>
                <p class="edu-link-desc">${escHtml(item.desc)}</p>
                <span class="edu-link-url">${escHtml(item.url.replace(/^https?:\/\//, '').replace(/\/$/, ''))}</span>
                ${item.tag ? `<span class="edu-link-tag ${item.tag}">${
                    item.tag === 'free' ? '🆓 Free'
                    : item.tag === 'paid' ? '💎 Paid'
                    : item.tag === 'govt' ? '🏛️ Govt'
                    : item.tag === 'medical' ? '🏥 Medical'
                    : item.tag === 'engineering' ? '⚙️ Engineering'
                    : item.tag === 'language' ? '🗣️ Language'
                    : item.tag === 'science' ? '🔬 Science'
                    : item.tag === 'business' ? '💼 Business'
                    : item.tag === 'design' ? '🎨 Design'
                    : item.tag === 'ai' ? '🤖 AI'
                    : item.tag === 'jobs' ? '📝 Jobs'
                    : item.tag === 'scholarship' ? '🎯 Scholarship'
                    : item.tag
                }</span>` : ''}
            </a>
        `).join('');
    }

    // =========================================================
    // 🚀 RENDER ALL SECTIONS
    // =========================================================
    renderLinks('eduPrimaryGrid', DATA.primary);
    renderLinks('eduSecondaryGrid', DATA.secondary);
    renderLinks('eduHscGrid', DATA.hsc);
    renderLinks('eduGeneralUniGrid', DATA.generalUni);
    renderLinks('eduBoardsGrid', DATA.boards);
    renderLinks('eduEngineeringGrid', DATA.engineering);
    renderLinks('eduMedicalGrid', DATA.medical);
    renderLinks('eduLanguageGrid', DATA.language);
    renderLinks('eduHumanGrid', DATA.human);
    renderLinks('eduAiGrid', DATA.ai);
    renderLinks('eduScienceGrid', DATA.science);
    renderLinks('eduBusinessGrid', DATA.business);
    renderLinks('eduDesignGrid', DATA.design);
    renderLinks('eduOnlineGrid', DATA.online);
    renderLinks('eduVirtualGrid', DATA.virtual);
    renderLinks('eduJobsGrid', DATA.jobs);
    renderLinks('eduScholarGrid', DATA.scholarship);
    renderLinks('eduLibraryGrid', DATA.library);

    // =========================================================
    // 🎛️ PANEL CONTROLLER
    // =========================================================
    const card    = document.querySelector('.lh-cat-card.lh-cat-education');
    const overlay = document.getElementById('eduPanelOverlay');
    const closeBtn= document.getElementById('eduClose');
    const body    = document.getElementById('eduBody');
    const navBtns = document.querySelectorAll('.edu-nav-btn');

    if (!overlay) return;

    function openPanel() {
        overlay.classList.add('edu-open');
        overlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        setTimeout(() => closeBtn?.focus(), 100);
    }

    function closePanel() {
        overlay.classList.remove('edu-open');
        overlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        card?.focus();
    }

    card?.addEventListener('click', openPanel);
    card?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openPanel();
        }
    });
    card?.setAttribute('tabindex', '0');
    card?.setAttribute('role', 'button');

    closeBtn?.addEventListener('click', closePanel);
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closePanel();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && overlay.classList.contains('edu-open')) {
            closePanel();
        }
    });

    // Focus trap
    overlay.addEventListener('keydown', (e) => {
        if (e.key !== 'Tab') return;
        const focusables = overlay.querySelectorAll(
            'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!focusables.length) return;
        const first = focusables[0];
        const last  = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
            e.preventDefault(); last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault(); first.focus();
        }
    });

    // Navigation
    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = body.querySelector(`[data-edu-section="${btn.dataset.eduJump}"]`);
            if (target) {
                const offsetTop = target.offsetTop - body.offsetTop - 10;
                body.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }
            navBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    // Scroll spy
    let scrollTimer = null;
    body?.addEventListener('scroll', () => {
        if (scrollTimer) return;
        scrollTimer = setTimeout(() => {
            scrollTimer = null;
            const sections = body.querySelectorAll('[data-edu-section]');
            const scrollPos = body.scrollTop + 80;
            let current = '';
            sections.forEach(sec => {
                if (scrollPos >= sec.offsetTop) current = sec.dataset.eduSection;
            });
            if (current) {
                navBtns.forEach(btn => {
                    btn.classList.toggle('active', btn.dataset.eduJump === current);
                });
            }
        }, 100);
    });

})();/* =========================================================
   🎡 UNIVERSAL LEARNING HUB — Master Controller
   ========================================================= */
(function () {
    'use strict';

    // =========================================================
    // 🌐 LANGUAGE ENGINE
    // =========================================================
    const LANG_KEY = 'om_lang';
    const DEFAULT_LANG = 'bn';
    let currentLang = localStorage.getItem(LANG_KEY) || DEFAULT_LANG;

    function applyLanguage(lang) {
        currentLang = lang;
        localStorage.setItem(LANG_KEY, lang);
        document.documentElement.setAttribute('lang', lang);
        document.documentElement.setAttribute('data-lang', lang);

        document.querySelectorAll('[data-bn][data-en]').forEach(el => {
            const text = el.getAttribute('data-' + lang);
            if (text !== null) {
                if (el.hasAttribute('aria-label')) el.setAttribute('aria-label', text);
                el.textContent = text;
            }
        });

        const langText = document.getElementById('langText');
        if (langText) langText.textContent = lang === 'bn' ? 'English' : 'বাংলা';

        document.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
    }

    function toggleLanguage() {
        applyLanguage(currentLang === 'bn' ? 'en' : 'bn');
    }

    const langToggleBtn = document.getElementById('langToggle');
    if (langToggleBtn) langToggleBtn.addEventListener('click', toggleLanguage);

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => applyLanguage(currentLang));
    } else {
        applyLanguage(currentLang);
    }

    // =========================================================
    // 🎡 SPIN COUNTER (localStorage)
    // =========================================================
    const SPIN_KEY = 'om_spin_count';
    let spinCount = parseInt(localStorage.getItem(SPIN_KEY) || '0', 10);

    const spinCountEl = document.getElementById('spinCount');
    const lhSpinCountEl = document.getElementById('lhSpinCount');

    function updateSpinCount() {
        if (spinCountEl) spinCountEl.textContent = spinCount;
        if (lhSpinCountEl) lhSpinCountEl.textContent = spinCount;
    }
    updateSpinCount();

    function incrementSpin() {
        spinCount++;
        localStorage.setItem(SPIN_KEY, spinCount);
        updateSpinCount();
    }

    // =========================================================
    // 🎛️ GENERIC PANEL CONTROLLER
    // =========================================================
    function createPanelController(config) {
        const {
            cardSelector,
            overlayId,
            closeId,
            openClass,
            navSelector,
            bodyId
        } = config;

        const card = document.querySelector(cardSelector);
        const overlay = document.getElementById(overlayId);
        const closeBtn = document.getElementById(closeId);
        const body = bodyId ? document.getElementById(bodyId) : null;
        const navBtns = navSelector ? overlay?.querySelectorAll(navSelector) : null;

        if (!card || !overlay) return null;

        function open() {
            overlay.classList.add(openClass);
            overlay.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
            setTimeout(() => closeBtn?.focus(), 100);
        }

        function close() {
            overlay.classList.remove(openClass);
            overlay.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
            card?.focus();
        }

        card.addEventListener('click', open);
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                open();
            }
        });
        card.setAttribute('tabindex', '0');
        card.setAttribute('role', 'button');

        closeBtn?.addEventListener('click', close);
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) close();
        });

        // Focus trap
        overlay.addEventListener('keydown', (e) => {
            if (e.key !== 'Tab') return;
            const focusables = overlay.querySelectorAll(
                'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            if (!focusables.length) return;
            const first = focusables[0];
            const last = focusables[focusables.length - 1];
            if (e.shiftKey && document.activeElement === first) {
                e.preventDefault(); last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault(); first.focus();
            }
        });

        // Nav buttons
        if (navBtns && body) {
            navBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    const jumpKey = btn.dataset[Object.keys(btn.dataset)[0]];
                    const section = body.querySelector(`[data-${config.jumpPrefix}-section="${jumpKey}"]`);
                    if (section) {
                        const offsetTop = section.offsetTop - body.offsetTop - 10;
                        body.scrollTo({ top: offsetTop, behavior: 'smooth' });
                    }
                    navBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                });
            });

            // Scroll spy
            let scrollTimer = null;
            body.addEventListener('scroll', () => {
                if (scrollTimer) return;
                scrollTimer = setTimeout(() => {
                    scrollTimer = null;
                    const sections = body.querySelectorAll(`[data-${config.jumpPrefix}-section]`);
                    const scrollPos = body.scrollTop + 80;
                    let current = '';
                    sections.forEach(sec => {
                        if (scrollPos >= sec.offsetTop) {
                            current = sec.dataset[config.jumpPrefix + 'Section'];
                        }
                    });
                    if (current) {
                        navBtns.forEach(btn => {
                            const k = btn.dataset[Object.keys(btn.dataset)[0]];
                            btn.classList.toggle('active', k === current);
                        });
                    }
                }, 100);
            });
        }

        return { open, close };
    }

    // =========================================================
    // 🎡 LEARNING HUB PANEL
    // =========================================================
    const hubCard = document.getElementById('spinCounterBtn');
    const hubOverlay = document.getElementById('learningHubOverlay');
    const hubClose = document.getElementById('lhClose');

    function openHub() {
        hubOverlay?.classList.add('lh-open');
        hubOverlay?.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
        incrementSpin();
        setTimeout(() => hubClose?.focus(), 100);
    }

    function closeHub() {
        hubOverlay?.classList.remove('lh-open');
        hubOverlay?.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        hubCard?.focus();
    }

    hubCard?.addEventListener('click', openHub);
    hubClose?.addEventListener('click', closeHub);
    hubOverlay?.addEventListener('click', (e) => {
        if (e.target === hubOverlay) closeHub();
    });

    // =========================================================
    // 🌐 ESC KEY — Close any open panel
    // =========================================================
    document.addEventListener('keydown', (e) => {
        if (e.key !== 'Escape') return;
        const openOverlay = document.querySelector(
            '.learning-hub-overlay.lh-open, .kn-panel-overlay.kn-open, .edu-panel-overlay.edu-open, .bs9q-panel-overlay.bs9q-open, .skills-panel-overlay.skills-open, .ai-world-panel-overlay.ai-open, .dev-panel-overlay.dev-open, .res-panel-overlay.res-open'
        );
        if (openOverlay) {
            e.preventDefault();
            // Determine which close function to use based on class
            if (openOverlay.classList.contains('lh-open')) closeHub();
            else {
                openOverlay.classList.remove('kn-open', 'edu-open', 'bs9q-open', 'skills-open', 'ai-open', 'dev-open', 'res-open');
                openOverlay.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = '';
            }
        }
    });

    // =========================================================
    // 📚 KNOWLEDGE LIBRARY
    // =========================================================
    const knowledge = createPanelController({
        cardSelector: '.lh-cat-card.lh-cat-knowledge',
        overlayId: 'knPanelOverlay',
        closeId: 'knClose',
        openClass: 'kn-open',
        navSelector: '.kn-nav-btn',
        bodyId: 'knBody',
        jumpPrefix: 'kn'
    });

    // Knowledge Data
    const KNOWLEDGE_DATA = {
        bangla: [
            { icon: '🎭', name: 'রবীন্দ্রনাথ ঠাকুর', en: 'Rabindranath Tagore', color: '#f59e0b', role: 'কবি • নোবেল', desc: 'এশিয়ার প্রথম নোবেল বিজয়ী', books: 'গীতাঞ্জলি, গোরা, ঘরে-বাইরে' },
            { icon: '🕊️', name: 'কাজী নজরুল ইসলাম', en: 'Kazi Nazrul Islam', color: '#ef4444', role: 'জাতীয় কবি', desc: 'বিদ্রোহী কবি', books: 'বিদ্রোহী, অগ্নিবীণা' },
            { icon: '📖', name: 'শরৎচন্দ্র চট্টোপাধ্যায়', en: 'Sarat Chandra', color: '#8b5cf6', role: 'ঔপন্যাসিক', desc: 'অমর কথাশিল্পী', books: 'দেবদাস, শ্রীকান্ত' },
            { icon: '🏛️', name: 'বঙ্কিমচন্দ্র চট্টোপাধ্যায়', en: 'Bankim Chandra', color: '#06b6d4', role: 'ঔপন্যাসিক', desc: 'বাংলা উপন্যাসের জনক', books: 'আনন্দমঠ, কপালকুণ্ডলা' },
            { icon: '🌾', name: 'জসীমউদ্দীন', en: 'Jasimuddin', color: '#22c55e', role: 'পল্লী কবি', desc: 'গ্রামবাংলার কবি', books: 'নকশী কাঁথার মাঠ' },
            { icon: '✒️', name: 'মাইকেল মধুসূদন দত্ত', en: 'Michael Madhusudan', color: '#ec4899', role: 'মহাকবি', desc: 'অমিত্রাক্ষর ছন্দের প্রবর্তক', books: 'মেঘনাদবধ কাব্য' },
            { icon: '🌟', name: 'হুমায়ূন আহমেদ', en: 'Humayun Ahmed', color: '#3b82f6', role: 'ঔপন্যাসিক', desc: 'হিমু, মিসির আলী চরিত্রের স্রষ্টা', books: 'নন্দিত নরকে' },
            { icon: '📚', name: 'সুনীল গঙ্গোপাধ্যায়', en: 'Sunil Gangopadhyay', color: '#a855f7', role: 'কবি', desc: 'নীললোহিত ছদ্মনাম', books: 'সেই সময়, প্রথম আলো' },
            { icon: '🌿', name: 'জীবনানন্দ দাশ', en: 'Jibanananda Das', color: '#14b8a6', role: 'কবি', desc: 'রূপসী বাংলার কবি', books: 'বনলতা সেন' },
            { icon: '⚡', name: 'সুকান্ত ভট্টাচার্য', en: 'Sukanta Bhattacharya', color: '#f97316', role: 'কবি', desc: 'মাত্র ২১ বছর বেঁচে ছিলেন', books: 'ছাড়পত্র' },
            { icon: '🕊️', name: 'শামসুর রাহমান', en: 'Shamsur Rahman', color: '#06b6d4', role: 'কবি', desc: 'আধুনিক কবি', books: 'অসম্ভব আন্তরিকতা' },
            { icon: '🌾', name: 'আল মাহমুদ', en: 'Al Mahmud', color: '#22c55e', role: 'কবি', desc: 'গ্রামবাংলার কবি', books: 'সোনালী কাবিন' },
            { icon: '🖋️', name: 'আখতারুজ্জামান ইলিয়াস', en: 'Akhtaruzzaman Elias', color: '#14b8a6', role: 'লেখক', desc: 'কথাসাহিত্যের কারিগর', books: 'খোয়াবনামা' },
            { icon: '🌸', name: 'সেলিনা হোসেন', en: 'Selina Hossain', color: '#ec4899', role: 'লেখিকা', desc: 'মুক্তিযুদ্ধের লেখিকা', books: 'হাঙর নদী গ্রেনেড' },
            { icon: '📖', name: 'হাসান আজিজুল হক', en: 'Hasan Azizul Haq', color: '#f59e0b', role: 'লেখক', desc: 'ছোটগল্পের কারিগর', books: 'আগুনপাখি' },
            { icon: '🎬', name: 'জহির রায়হান', en: 'Zahir Raihan', color: '#ef4444', role: 'লেখক • চলচ্চিত্রকার', desc: 'মুক্তিযুদ্ধের চিত্রনায়ক', books: 'হাজার বছর ধরে' }
        ],

        nazrulBooks: [
            { icon: '⚔️', title: 'বিদ্রোহী', meta: 'কবিতা', year: '১৯২২' },
            { icon: '🔥', title: 'অগ্নিবীণা', meta: 'কাব্যগ্রন্থ', year: '১৯২২' },
            { icon: '🌺', title: 'বিষের বাঁশি', meta: 'কাব্যগ্রন্থ', year: '১৯২৪' },
            { icon: '🎵', title: 'সাম্যবাদী', meta: 'কাব্যগ্রন্থ', year: '১৯২৫' },
            { icon: '🌙', title: 'ভাঙার গান', meta: 'কাব্যগ্রন্থ', year: '১৯২৪' },
            { icon: '⚡', title: 'সর্বহারা', meta: 'কাব্যগ্রন্থ', year: '১৯২৬' },
            { icon: '🌸', title: 'ফনীমনসা', meta: 'কাব্যগ্রন্থ', year: '১৯২৭' },
            { icon: '📚', title: 'বাঁধনহারা', meta: 'উপন্যাস', year: '১৯২৭' },
            { icon: '📖', title: 'মৃত্যুক্ষুধা', meta: 'উপন্যাস', year: '১৯৩০' },
            { icon: '🌊', title: 'সঞ্চিতা', meta: 'কবিতা সংকলন', year: '১৯২৮' }
        ],

        famousBooks: [
            { icon: '🌅', title: 'গীতাঞ্জলি', author: 'রবীন্দ্রনাথ ঠাকুর', year: '১৯১০' },
            { icon: '🕊️', title: 'বিদ্রোহী', author: 'কাজী নজরুল ইসলাম', year: '১৯২২' },
            { icon: '🏛️', title: 'আনন্দমঠ', author: 'বঙ্কিমচন্দ্র', year: '১৮৮২' },
            { icon: '💔', title: 'দেবদাস', author: 'শরৎচন্দ্র', year: '১৯১৭' },
            { icon: '🌾', title: 'নকশী কাঁথার মাঠ', author: 'জসীমউদ্দীন', year: '১৯২৯' },
            { icon: '🌳', title: 'পথের পাঁচালী', author: 'বিভূতিভূষণ', year: '১৯২৯' },
            { icon: '🚣', title: 'পদ্মা নদীর মাঝি', author: 'মানিক বন্দ্যোপাধ্যায়', year: '১৯৩৬' },
            { icon: '🕉️', title: 'মেঘনাদবধ কাব্য', author: 'মধুসূদন দত্ত', year: '১৮৬১' },
            { icon: '🌿', title: 'বনলতা সেন', author: 'জীবনানন্দ দাশ', year: '১৯৪২' },
            { icon: '🦁', title: 'সোনালী কাবিন', author: 'আল মাহমুদ', year: '১৯৭৩' },
            { icon: '🌊', title: 'খোয়াবনামা', author: 'আখতারুজ্জামান ইলিয়াস', year: '১৯৯৬' },
            { icon: '🔥', title: 'আগুনপাখি', author: 'হাসান আজিজুল হক', year: '২০০৬' }
        ],

        international: [
            { icon: '🎭', name: 'উইলিয়াম শেক্সপিয়ার', en: 'William Shakespeare', color: '#ef4444', role: 'নাট্যকার', desc: 'বিশ্বসাহিত্যের শ্রেষ্ঠ নাট্যকার' },
            { icon: '📚', name: 'লিও টলস্টয়', en: 'Leo Tolstoy', color: '#8b5cf6', role: 'ঔপন্যাসিক', desc: 'ওয়ার অ্যান্ড পিস-এর লেখক' },
            { icon: '🖤', name: 'দস্তয়েভস্কি', en: 'Dostoevsky', color: '#06b6d4', role: 'ঔপন্যাসিক', desc: 'অস্তিত্ববাদের পথিকৃৎ' },
            { icon: '🐟', name: 'আর্নেস্ট হেমিংওয়ে', en: 'Ernest Hemingway', color: '#22c55e', role: 'নোবেল বিজয়ী', desc: 'দ্য ওল্ড ম্যান অ্যান্ড দ্য সি' },
            { icon: '🏆', name: 'রবীন্দ্রনাথ ঠাকুর', en: 'Rabindranath Tagore', color: '#f59e0b', role: 'নোবেল বিজয়ী', desc: 'এশিয়ার প্রথম নোবেল' },
            { icon: '🌹', name: 'পাবলো নেরুদা', en: 'Pablo Neruda', color: '#ec4899', role: 'নোবেল কবি', desc: 'চিলিয়ান কবি' },
            { icon: '🇫🇷', name: 'ভিক্টর হুগো', en: 'Victor Hugo', color: '#3b82f6', role: 'লেখক', desc: 'লেস মিজারেবল' },
            { icon: '🎩', name: 'চার্লস ডিকেন্স', en: 'Charles Dickens', color: '#d97706', role: 'ঔপন্যাসিক', desc: 'অলিভার টুইস্ট' },
            { icon: '👁️', name: 'জর্জ অরওয়েল', en: 'George Orwell', color: '#a855f7', role: 'লেখক', desc: '১৯৮৪, অ্যানিমেল ফার্ম' },
            { icon: '🦋', name: 'গার্সিয়া মার্কেস', en: 'García Márquez', color: '#14b8a6', role: 'নোবেল বিজয়ী', desc: 'ম্যাজিক রিয়ালিজম' },
            { icon: '🌙', name: 'রুমি', en: 'Rumi', color: '#fbbf24', role: 'সুফি কবি', desc: 'মসনবি' },
            { icon: '🏛️', name: 'হোমার', en: 'Homer', color: '#f97316', role: 'গ্রিক মহাকবি', desc: 'ইলিয়াড, ওডিসি' }
        ],

        encyclopedia: [
            { name: 'বাংলাপিডিয়া', en: 'Banglapedia', icon: '🇧🇩', color: '#22c55e', desc: 'বাংলাদেশের জাতীয় বিশ্বকোষ', url: 'https://bn.banglapedia.org' },
            { name: 'উইকিপিডিয়া', en: 'Wikipedia', icon: '📚', color: '#3b82f6', desc: 'মুক্ত বিশ্বকোষ', url: 'https://bn.wikipedia.org' },
            { name: 'ব্রিটানিকা', en: 'Britannica', icon: '📖', color: '#d97706', desc: 'সবচেয়ে পুরোনো বিশ্বকোষ', url: 'https://www.britannica.com' },
            { name: 'উইকিসোর্স', en: 'Wikisource', icon: '📜', color: '#8b5cf6', desc: 'মুক্ত উৎসের বই', url: 'https://bn.wikisource.org' },
            { name: 'Project Gutenberg', en: 'Gutenberg', icon: '📕', color: '#f59e0b', desc: '৭০,০০০+ ফ্রি ই-বুক', url: 'https://www.gutenberg.org' },
            { name: 'Internet Archive', en: 'Archive', icon: '🏛️', color: '#06b6d4', desc: 'ডিজিটাল লাইব্রেরি', url: 'https://archive.org' }
        ],

        science: [
            { name: 'NASA', icon: '🚀', color: '#3b82f6', desc: 'মহাকাশ গবেষণা', url: 'https://www.nasa.gov' },
            { name: 'Khan Academy', icon: '🎓', color: '#22c55e', desc: 'ফ্রি শিক্ষা', url: 'https://www.khanacademy.org' },
            { name: 'Coursera', icon: '🎯', color: '#f59e0b', desc: 'অনলাইন কোর্স', url: 'https://www.coursera.org' },
            { name: 'Nature', icon: '🔬', color: '#06b6d4', desc: 'শীর্ষস্থানীয় জার্নাল', url: 'https://www.nature.com' },
            { name: 'Science.org', icon: '🧪', color: '#ef4444', desc: 'বিজ্ঞানের জার্নাল', url: 'https://www.science.org' },
            { name: 'NPTEL', icon: '📡', color: '#8b5cf6', desc: 'IIT কোর্স', url: 'https://nptel.ac.in' }
        ],

        links: [
            { name: 'Google Scholar', icon: '🎓', color: '#3b82f6', desc: 'একাডেমিক পেপার সার্চ', url: 'https://scholar.google.com' },
            { name: 'TED Talks', icon: '🎤', color: '#ef4444', desc: 'বিশ্বসেরা স্পিকার', url: 'https://www.ted.com' },
            { name: 'LibriVox', icon: '🎧', color: '#d97706', desc: 'ফ্রি অডিওবুক', url: 'https://librivox.org' },
            { name: 'Duolingo', icon: '🦉', color: '#22c55e', desc: 'ভাষা শেখা', url: 'https://www.duolingo.com' },
            { name: 'Semantic Scholar', icon: '🤖', color: '#06b6d4', desc: 'AI পেপার সার্চ', url: 'https://www.semanticscholar.org' },
            { name: 'Goodreads', icon: '📚', color: '#a855f7', desc: 'বই রিভিউ', url: 'https://www.goodreads.com' }
        ]
    };

    function renderKnowledge() {
        const D = KNOWLEDGE_DATA;

        // Bangla writers
        const banglaGrid = document.getElementById('knBanglaGrid');
        if (banglaGrid) {
            banglaGrid.innerHTML = D.bangla.map(w => `
                <div class="kn-card" style="--kn-color:${w.color}">
                    <div class="kn-card-head">
                        <span class="kn-card-avatar">${w.icon}</span>
                        <div>
                            <div class="kn-card-name">${w.name}</div>
                            <p class="kn-card-en">${w.en}</p>
                        </div>
                    </div>
                    <span class="kn-card-role">${w.role}</span>
                    <p class="kn-card-desc">${w.desc}</p>
                    <div class="kn-card-books">
                        <div class="kn-card-books-label">📚 বই</div>
                        <div class="kn-card-books-list">${w.books}</div>
                    </div>
                </div>
            `).join('');
        }

        // Nazrul books
        const nazrulGrid = document.getElementById('knNazrulBooks');
        if (nazrulGrid) {
            nazrulGrid.innerHTML = D.nazrulBooks.map(b => `
                <div class="kn-book">
                    <span class="kn-book-icon">${b.icon}</span>
                    <div class="kn-book-info">
                        <div class="kn-book-title">${b.title}</div>
                        <div class="kn-book-meta">${b.meta}</div>
                        <span class="kn-book-year">${b.year}</span>
                    </div>
                </div>
            `).join('');
        }

        // Famous books
        const booksGrid = document.getElementById('knFamousBooks');
        if (booksGrid) {
            booksGrid.innerHTML = D.famousBooks.map(b => `
                <div class="kn-book">
                    <span class="kn-book-icon">${b.icon}</span>
                    <div class="kn-book-info">
                        <div class="kn-book-title">${b.title}</div>
                        <div class="kn-book-meta">${b.author}</div>
                        <span class="kn-book-year">${b.year}</span>
                    </div>
                </div>
            `).join('');
        }

        // International writers
        const intlGrid = document.getElementById('knIntlGrid');
        if (intlGrid) {
            intlGrid.innerHTML = D.international.map(w => `
                <div class="kn-card" style="--kn-color:${w.color}">
                    <div class="kn-card-head">
                        <span class="kn-card-avatar">${w.icon}</span>
                        <div>
                            <div class="kn-card-name">${w.name}</div>
                            <p class="kn-card-en">${w.en}</p>
                        </div>
                    </div>
                    <span class="kn-card-role">${w.role}</span>
                    <p class="kn-card-desc">${w.desc}</p>
                </div>
            `).join('');
        }

        // Encyclopedia
        const encycloGrid = document.getElementById('knEncycloGrid');
        if (encycloGrid) {
            encycloGrid.innerHTML = D.encyclopedia.map(l => `
                <a class="kn-link" href="${l.url}" target="_blank" rel="noopener" style="--kn-color:${l.color}">
                    <div class="kn-link-head">
                        <span class="kn-link-icon">${l.icon}</span>
                        <span class="kn-link-title">${l.name}</span>
                    </div>
                    <p class="kn-link-desc">${l.desc}</p>
                </a>
            `).join('');
        }

        // Science
        const scienceGrid = document.getElementById('knScienceGrid');
        if (scienceGrid) {
            scienceGrid.innerHTML = D.science.map(l => `
                <a class="kn-link" href="${l.url}" target="_blank" rel="noopener" style="--kn-color:${l.color}">
                    <div class="kn-link-head">
                        <span class="kn-link-icon">${l.icon}</span>
                        <span class="kn-link-title">${l.name}</span>
                    </div>
                    <p class="kn-link-desc">${l.desc}</p>
                </a>
            `).join('');
        }

        // Links
        const linksGrid = document.getElementById('knLinksGrid');
        if (linksGrid) {
            linksGrid.innerHTML = D.links.map(l => `
                <a class="kn-link" href="${l.url}" target="_blank" rel="noopener" style="--kn-color:${l.color}">
                    <div class="kn-link-head">
                        <span class="kn-link-icon">${l.icon}</span>
                        <span class="kn-link-title">${l.name}</span>
                    </div>
                    <p class="kn-link-desc">${l.desc}</p>
                </a>
            `).join('');
        }
    }
    renderKnowledge();

    // =========================================================
    // 🎓 EDUCATION MASTER
    // =========================================================
    const education = createPanelController({
        cardSelector: '.lh-cat-card.lh-cat-education',
        overlayId: 'eduPanelOverlay',
        closeId: 'eduClose',
        openClass: 'edu-open',
        navSelector: '.edu-nav-btn',
        bodyId: 'eduBody',
        jumpPrefix: 'edu'
    });

    // Education Data
    const EDU_DATA = {
        primary: [
            { icon: '🏫', name: 'DPE', color: '#16a34a', desc: 'প্রাথমিক শিক্ষা অধিদপ্তর', url: 'http://www.dpe.gov.bd', tag: 'govt' },
            { icon: '📖', name: 'DSHE', color: '#22c55e', desc: 'মাধ্যমিক ও উচ্চ শিক্ষা', url: 'http://www.dshe.gov.bd', tag: 'govt' },
            { icon: '🌟', name: 'a2i', color: '#f59e0b', desc: 'ডিজিটাল শিক্ষা সেবা', url: 'https://a2i.gov.bd', tag: 'govt' }
        ],
        secondary: [
            { icon: '📘', name: 'NCTB', color: '#16a34a', desc: 'পাঠ্যবই বোর্ড', url: 'http://www.nctb.gov.bd', tag: 'free' },
            { icon: '📝', name: 'শিক্ষা বোর্ড', color: '#22c55e', desc: 'SSC পরীক্ষা', url: 'http://www.educationboard.gov.bd', tag: 'govt' },
            { icon: '🎯', name: '১০ মিনিট স্কুল', color: '#ef4444', desc: 'অনলাইন স্কুল', url: 'https://10minuteschool.com', tag: 'paid' }
        ],
        hsc: [
            { icon: '🏛️', name: 'HSC বোর্ড', color: '#22c55e', desc: 'HSC পরীক্ষা', url: 'http://www.educationboard.gov.bd', tag: 'govt' },
            { icon: '🎯', name: 'UGC ভর্তি গাইড', color: '#3b82f6', desc: 'বিশ্ববিদ্যালয় তথ্য', url: 'https://ugc.gov.bd', tag: 'govt' },
            { icon: '💡', name: 'লেকচার পিডিয়া', color: '#ef4444', desc: 'ফ্রি ভিডিও', url: 'https://www.youtube.com', tag: 'free' }
        ],
        university: [
            { icon: '🏛️', name: 'ঢাকা বিশ্ববিদ্যালয়', color: '#3b82f6', desc: 'DU', url: 'https://www.du.ac.bd', tag: 'govt' },
            { icon: '🏛️', name: 'রাজশাহী বিশ্ববিদ্যালয়', color: '#3b82f6', desc: 'RU', url: 'https://www.ru.ac.bd', tag: 'govt' },
            { icon: '🏛️', name: 'চট্টগ্রাম বিশ্ববিদ্যালয়', color: '#3b82f6', desc: 'CU', url: 'https://www.cu.ac.bd', tag: 'govt' },
            { icon: '🏛️', name: 'জাহাঙ্গীরনগর বিশ্ববিদ্যালয়', color: '#3b82f6', desc: 'JU', url: 'https://www.juniv.edu', tag: 'govt' },
            { icon: '🎓', name: 'SUST', color: '#22c55e', desc: 'শাহজালাল', url: 'https://www.sust.edu', tag: 'govt' },
            { icon: '🎓', name: 'HSTU', color: '#22c55e', desc: 'হাজী দানেশ', url: 'https://www.hstu.ac.bd', tag: 'govt' }
        ],
        boards: [
            { icon: '🏛️', name: 'ঢাকা বোর্ড', color: '#3b82f6', desc: 'Dhaka Board', url: 'http://www.dhakaeducationboard.gov.bd', tag: 'govt' },
            { icon: '🏛️', name: 'রাজশাহী বোর্ড', color: '#3b82f6', desc: 'Rajshahi Board', url: 'http://www.rajshahieducationboard.gov.bd', tag: 'govt' },
            { icon: '🏛️', name: 'চট্টগ্রাম বোর্ড', color: '#3b82f6', desc: 'Chattogram Board', url: 'http://www.bise-ctg.gov.bd', tag: 'govt' },
            { icon: '🏛️', name: 'কুমিল্লা বোর্ড', color: '#3b82f6', desc: 'Cumilla Board', url: 'http://www.comillaboard.gov.bd', tag: 'govt' },
            { icon: '🏛️', name: 'যশোর বোর্ড', color: '#3b82f6', desc: 'Jashore Board', url: 'http://www.jessoreboard.gov.bd', tag: 'govt' },
            { icon: '🏛️', name: 'বরিশাল বোর্ড', color: '#3b82f6', desc: 'Barishal Board', url: 'http://www.barisalboard.gov.bd', tag: 'govt' },
            { icon: '🏛️', name: 'সিলেট বোর্ড', color: '#3b82f6', desc: 'Sylhet Board', url: 'http://www.sylhetboard.gov.bd', tag: 'govt' },
            { icon: '🏛️', name: 'দিনাজপুর বোর্ড', color: '#3b82f6', desc: 'Dinajpur Board', url: 'http://www.dinajpureducationboard.gov.bd', tag: 'govt' },
            { icon: '🏛️', name: 'ময়মনসিংহ বোর্ড', color: '#3b82f6', desc: 'Mymensingh Board', url: 'http://www.mymensingheducationboard.gov.bd', tag: 'govt' },
            { icon: '🕌', name: 'মাদ্রাসা বোর্ড', color: '#16a34a', desc: 'BMeb', url: 'http://www.bmeb.gov.bd', tag: 'govt' },
            { icon: '⚙️', name: 'কারিগরি বোর্ড', color: '#8b5cf6', desc: 'BTEB', url: 'http://www.bteb.gov.bd', tag: 'govt' }
        ],
        engineering: [
            { icon: '⚙️', name: 'BUET', color: '#a855f7', desc: 'বাংলাদেশ প্রকৌশল', url: 'https://www.buet.ac.bd', tag: 'engineering' },
            { icon: '⚙️', name: 'CUET', color: '#a855f7', desc: 'চট্টগ্রাম', url: 'https://www.cuet.ac.bd', tag: 'engineering' },
            { icon: '⚙️', name: 'RUET', color: '#a855f7', desc: 'রাজশাহী', url: 'https://www.ruet.ac.bd', tag: 'engineering' },
            { icon: '⚙️', name: 'KUET', color: '#a855f7', desc: 'খুলনা', url: 'https://www.kuet.ac.bd', tag: 'engineering' },
            { icon: '⚙️', name: 'DUET', color: '#a855f7', desc: 'ঢাকা', url: 'https://www.duet.ac.bd', tag: 'engineering' },
            { icon: '⚙️', name: 'IUT', color: '#a855f7', desc: 'OIC ভিত্তিক', url: 'https://www.iutoic-dhaka.edu', tag: 'engineering' },
            { icon: '⚙️', name: 'BUTEX', color: '#a855f7', desc: 'টেক্সটাইল', url: 'https://www.butex.edu.bd', tag: 'engineering' },
            { icon: '⚙️', name: 'MIST', color: '#a855f7', desc: 'সামরিক ইনস্টিটিউট', url: 'https://mist.ac.bd', tag: 'engineering' }
        ],
        medical: [
            { icon: '🏥', name: 'DMC', color: '#ef4444', desc: 'ঢাকা মেডিকেল', url: 'https://www.dmc.gov.bd', tag: 'medical' },
            { icon: '🏥', name: 'SSMC', color: '#ef4444', desc: 'স্যার সলিমুল্লাহ', url: 'https://ssmc.gov.bd', tag: 'medical' },
            { icon: '🏥', name: 'ShSMC', color: '#ef4444', desc: 'শহীদ সোহরাওয়ার্দী', url: 'https://shsmc.gov.bd', tag: 'medical' },
            { icon: '🏥', name: 'CMC', color: '#ef4444', desc: 'চট্টগ্রাম মেডিকেল', url: 'https://www.cmc.gov.bd', tag: 'medical' },
            { icon: '🏥', name: 'RMC', color: '#ef4444', desc: 'রাজশাহী মেডিকেল', url: 'https://www.rmc.gov.bd', tag: 'medical' },
            { icon: '🏥', name: 'MMC', color: '#ef4444', desc: 'ময়মনসিংহ মেডিকেল', url: 'https://www.mmc.gov.bd', tag: 'medical' },
            { icon: '🏥', name: 'SZMC', color: '#ef4444', desc: 'শহীদ জিয়াউর রহমান', url: 'https://www.szmc.edu.bd', tag: 'medical' },
            { icon: '🏥', name: 'KMC', color: '#ef4444', desc: 'খুলনা মেডিকেল', url: 'https://www.kmc.gov.bd', tag: 'medical' }
        ],
        language: [
            { icon: '🇬🇧', name: 'Duolingo', color: '#3b82f6', desc: 'ইংরেজি ও অন্যান্য ভাষা', url: 'https://www.duolingo.com', tag: 'language' },
            { icon: '📖', name: 'BBC Learning English', color: '#ef4444', desc: 'ইংরেজি শেখা', url: 'https://www.bbc.co.uk/learningenglish', tag: 'free' },
            { icon: '🦉', name: 'IELTS Liz', color: '#8b5cf6', desc: 'ফ্রি IELTS প্রস্তুতি', url: 'https://ieltsliz.com', tag: 'free' },
            { icon: '📚', name: 'Madinah Arabic', color: '#22c55e', desc: 'আরবি শেখা', url: 'https://www.madinaharabic.com', tag: 'free' },
            { icon: '🌏', name: 'NHK Easy Japanese', color: '#f59e0b', desc: 'জাপানি শেখা', url: 'https://www3.nhk.or.jp/news/easy', tag: 'free' },
            { icon: '🇰🇷', name: 'Talk To Me In Korean', color: '#ec4899', desc: 'কোরিয়ান শেখা', url: 'https://talktomeinkorean.com', tag: 'free' }
        ],
        human: [
            { icon: '🧠', name: 'Kenhub', color: '#06b6d4', desc: 'মানব অ্যানাটমি', url: 'https://www.kenhub.com', tag: 'science' },
            { icon: '🫀', name: 'InnerBody', color: '#ef4444', desc: 'ইন্টারঅ্যাকটিভ মানবদেহ', url: 'https://www.innerbody.com', tag: 'science' },
            { icon: '🩺', name: 'MedlinePlus', color: '#3b82f6', desc: 'স্বাস্থ্য তথ্য', url: 'https://medlineplus.gov', tag: 'medical' },
            { icon: '❤️', name: 'Visible Body', color: '#f59e0b', desc: '3D অ্যানাটমি', url: 'https://www.visiblebody.com', tag: 'paid' },
            { icon: '🧪', name: 'Khan Biology', color: '#22c55e', desc: 'জীববিজ্ঞান', url: 'https://www.khanacademy.org/science/biology', tag: 'free' }
        ],
        ai: [
            { icon: '🤖', name: 'DeepLearning.AI', color: '#8b5cf6', desc: 'Andrew Ng-এর AI কোর্স', url: 'https://www.deeplearning.ai', tag: 'ai' },
            { icon: '📊', name: 'Kaggle Learn', color: '#3b82f6', desc: 'ডেটা সায়েন্স', url: 'https://www.kaggle.com/learn', tag: 'free' },
            { icon: '🐍', name: 'Python.org', color: '#16a34a', desc: 'Python শেখা', url: 'https://www.python.org', tag: 'free' },
            { icon: '⚙️', name: 'Arduino', color: '#06b6d4', desc: 'রোবোটিক্স', url: 'https://www.arduino.cc', tag: 'free' },
            { icon: '🧬', name: 'TensorFlow', color: '#f97316', desc: 'Google ML', url: 'https://www.tensorflow.org', tag: 'ai' },
            { icon: '🔥', name: 'PyTorch', color: '#ef4444', desc: 'Meta ML', url: 'https://pytorch.org', tag: 'ai' },
            { icon: '💬', name: 'Hugging Face', color: '#f59e0b', desc: 'AI মডেল', url: 'https://huggingface.co', tag: 'ai' },
            { icon: '🎓', name: 'fast.ai', color: '#8b5cf6', desc: 'ফ্রি ডিপ লার্নিং', url: 'https://www.fast.ai', tag: 'free' }
        ],
        science: [
            { icon: '🚀', name: 'NASA', color: '#3b82f6', desc: 'মহাকাশ', url: 'https://www.nasa.gov', tag: 'science' },
            { icon: '🔬', name: 'Nature', color: '#06b6d4', desc: 'বিজ্ঞান জার্নাল', url: 'https://www.nature.com', tag: 'science' },
            { icon: '🧪', name: 'Science.org', color: '#ef4444', desc: 'বিজ্ঞান', url: 'https://www.science.org', tag: 'science' },
            { icon: '📐', name: 'PhET', color: '#22c55e', desc: 'সিমুলেশন', url: 'https://phet.colorado.edu', tag: 'free' },
            { icon: '🌍', name: 'National Geographic', color: '#f59e0b', desc: 'প্রকৃতি', url: 'https://www.nationalgeographic.com', tag: 'free' },
            { icon: '⚛️', name: 'CERN', color: '#8b5cf6', desc: 'পার্টিকেল ফিজিক্স', url: 'https://home.cern', tag: 'science' },
            { icon: '📊', name: 'arXiv', color: '#f97316', desc: 'পেপার আর্কাইভ', url: 'https://arxiv.org', tag: 'free' }
        ],
        business: [
            { icon: '📈', name: 'Coursera Business', color: '#f59e0b', desc: 'ব্যবসা কোর্স', url: 'https://www.coursera.org/business', tag: 'business' },
            { icon: '💰', name: 'Investopedia', color: '#16a34a', desc: 'বিনিয়োগ', url: 'https://www.investopedia.com', tag: 'free' },
            { icon: '📊', name: 'HBR', color: '#ef4444', desc: 'বিজনেস আর্টিকেল', url: 'https://hbr.org', tag: 'paid' },
            { icon: '🎯', name: 'HubSpot Academy', color: '#f97316', desc: 'ফ্রি মার্কেটিং', url: 'https://academy.hubspot.com', tag: 'free' },
            { icon: '🏦', name: 'Khan Finance', color: '#22c55e', desc: 'ফিন্যান্স', url: 'https://www.khanacademy.org/economics-finance-domain', tag: 'free' }
        ],
        design: [
            { icon: '🎨', name: 'Canva Design School', color: '#06b6d4', desc: 'ফ্রি ডিজাইন', url: 'https://www.canva.com/designschool', tag: 'free' },
            { icon: '🖌️', name: 'Adobe Learn', color: '#ef4444', desc: 'Photoshop', url: 'https://helpx.adobe.com/learning.html', tag: 'free' },
            { icon: '✏️', name: 'Figma', color: '#f59e0b', desc: 'UI/UX ডিজাইন', url: 'https://www.figma.com/resource-library', tag: 'free' },
            { icon: '📐', name: 'Dribbble', color: '#ec4899', desc: 'ডিজাইন ইনস্পিরেশন', url: 'https://dribbble.com', tag: 'free' },
            { icon: '🖼️', name: 'Behance', color: '#3b82f6', desc: 'পোর্টফোলিও', url: 'https://www.behance.net', tag: 'free' }
        ],
        online: [
            { icon: '🎓', name: 'Coursera', color: '#3b82f6', desc: 'বিশ্ববিদ্যালয় কোর্স', url: 'https://www.coursera.org', tag: 'free' },
            { icon: '📚', name: 'Khan Academy', color: '#22c55e', desc: 'ফ্রি শিক্ষা', url: 'https://www.khanacademy.org', tag: 'free' },
            { icon: '🎬', name: 'Udemy', color: '#ef4444', desc: '৬০,০০০+ কোর্স', url: 'https://www.udemy.com', tag: 'paid' },
            { icon: '🎯', name: 'edX', color: '#8b5cf6', desc: 'MIT কোর্স', url: 'https://www.edx.org', tag: 'free' },
            { icon: '📡', name: 'NPTEL', color: '#f59e0b', desc: 'IIT কোর্স', url: 'https://nptel.ac.in', tag: 'free' },
            { icon: '🆓', name: 'freeCodeCamp', color: '#16a34a', desc: 'ফ্রি প্রোগ্রামিং', url: 'https://www.freecodecamp.org', tag: 'free' },
            { icon: '🌐', name: 'Alison', color: '#06b6d4', desc: 'ফ্রি কোর্স', url: 'https://alison.com', tag: 'free' },
            { icon: '📘', name: 'FutureLearn', color: '#a855f7', desc: 'ফ্রি কোর্স', url: 'https://www.futurelearn.com', tag: 'free' }
        ],
        virtual: [
            { icon: '🎓', name: 'BOU', color: '#3b82f6', desc: 'উন্মুক্ত বিশ্ববিদ্যালয়', url: 'https://www.bou.ac.bd', tag: 'govt' },
            { icon: '🌐', name: 'edX MicroMasters', color: '#8b5cf6', desc: 'MIT ডিগ্রি', url: 'https://www.edx.org/masters', tag: 'free' },
            { icon: '🎯', name: 'Coursera Degrees', color: '#3b82f6', desc: 'অনলাইন ডিগ্রি', url: 'https://www.coursera.org/degrees', tag: 'paid' },
            { icon: '📚', name: 'OpenLearn', color: '#f59e0b', desc: 'Open University', url: 'https://www.open.edu/openlearn', tag: 'free' },
            { icon: '🎬', name: 'Class Central', color: '#16a34a', desc: 'কোর্স ডিরেক্টরি', url: 'https://www.classcentral.com', tag: 'free' }
        ],
        jobs: [
            { icon: '📝', name: 'BPSC', color: '#ef4444', desc: 'বিসিএস', url: 'http://www.bpsc.gov.bd', tag: 'govt' },
            { icon: '🏦', name: 'ব্যাংক নিয়োগ', color: '#3b82f6', desc: 'বাংলাদেশ ব্যাংক', url: 'https://erecruitment.bb.org.bd', tag: 'govt' },
            { icon: '🎓', name: 'DPE নিয়োগ', color: '#22c55e', desc: 'শিক্ষক নিয়োগ', url: 'http://www.dpe.gov.bd', tag: 'govt' },
            { icon: '👨‍🏫', name: 'NTRCA', color: '#f59e0b', desc: 'শিক্ষক নিবন্ধন', url: 'http://www.ntrca.gov.bd', tag: 'govt' },
            { icon: '📊', name: 'Teletalk', color: '#8b5cf6', desc: 'চাকরির আবেদন', url: 'http://www.teletalk.com.bd', tag: 'govt' },
            { icon: '💼', name: 'BDJobs', color: '#a855f7', desc: 'প্রাইভেট চাকরি', url: 'https://bdjobs.com', tag: 'free' }
        ],
        scholarship: [
            { icon: '🇺🇸', name: 'Fulbright', color: '#3b82f6', desc: 'USA বৃত্তি', url: 'https://bd.usembassy.gov', tag: 'scholarship' },
            { icon: '🇬🇧', name: 'Commonwealth', color: '#ef4444', desc: 'UK বৃত্তি', url: 'https://cscuk.fcdo.gov.uk', tag: 'scholarship' },
            { icon: '🇦🇺', name: 'Australia Awards', color: '#22c55e', desc: 'অস্ট্রেলিয়া', url: 'https://www.dfat.gov.au', tag: 'scholarship' },
            { icon: '🇩🇪', name: 'DAAD', color: '#f59e0b', desc: 'জার্মানি', url: 'https://www.daad.de', tag: 'scholarship' },
            { icon: '🇯🇵', name: 'MEXT', color: '#ef4444', desc: 'জাপান', url: 'https://www.studyinjapan.go.jp', tag: 'scholarship' },
            { icon: '🌍', name: 'Chevening', color: '#8b5cf6', desc: 'UK প্রিমিয়ার', url: 'https://www.chevening.org', tag: 'scholarship' },
            { icon: '🇰🇷', name: 'Korea Scholarship', color: '#06b6d4', desc: 'কোরিয়া', url: 'https://www.studyinkorea.go.kr', tag: 'scholarship' },
            { icon: '🇨🇳', name: 'Chinese Scholarship', color: '#ec4899', desc: 'চীন', url: 'https://www.campuschina.org', tag: 'scholarship' }
        ],
        library: [
            { icon: '📖', name: 'Project Gutenberg', color: '#f59e0b', desc: '৭০,০০০+ ই-বুক', url: 'https://www.gutenberg.org', tag: 'free' },
            { icon: '📚', name: 'Internet Archive', color: '#3b82f6', desc: 'ডিজিটাল লাইব্রেরি', url: 'https://archive.org', tag: 'free' },
            { icon: '🇧🇩', name: 'বাংলাপিডিয়া', color: '#22c55e', desc: 'জাতীয় বিশ্বকোষ', url: 'https://bn.banglapedia.org', tag: 'free' },
            { icon: '📕', name: 'Open Library', color: '#8b5cf6', desc: '৩০ লাখ+ বই', url: 'https://openlibrary.org', tag: 'free' },
            { icon: '📘', name: 'Google Books', color: '#ef4444', desc: 'বই সার্চ', url: 'https://books.google.com', tag: 'free' },
            { icon: '🎧', name: 'LibriVox', color: '#06b6d4', desc: 'অডিওবুক', url: 'https://librivox.org', tag: 'free' }
        ]
    };

    function renderEducation() {
        const map = {
            eduPrimaryGrid: 'primary',
            eduSecondaryGrid: 'secondary',
            eduHscGrid: 'hsc',
            eduGeneralUniGrid: 'university',
            eduBoardsGrid: 'boards',
            eduEngineeringGrid: 'engineering',
            eduMedicalGrid: 'medical',
            eduLanguageGrid: 'language',
            eduHumanGrid: 'human',
            eduAiGrid: 'ai',
            eduScienceGrid: 'science',
            eduBusinessGrid: 'business',
            eduDesignGrid: 'design',
            eduOnlineGrid: 'online',
            eduVirtualGrid: 'virtual',
            eduJobsGrid: 'jobs',
            eduScholarGrid: 'scholarship',
            eduLibraryGrid: 'library'
        };

        Object.entries(map).forEach(([id, key]) => {
            const box = document.getElementById(id);
            if (!box || !EDU_DATA[key]) return;
            box.innerHTML = EDU_DATA[key].map(item => `
                <a class="edu-link" href="${item.url}" target="_blank" rel="noopener" style="--edu-color:${item.color}">
                    <div class="edu-link-head">
                        <span class="edu-link-icon">${item.icon}</span>
                        <span class="edu-link-title">${item.name}</span>
                    </div>
                    <p class="edu-link-desc">${item.desc}</p>
                    <span class="edu-link-url">${item.url.replace(/^https?:\/\//, '').replace(/\/$/, '')}</span>
                    ${item.tag ? `<span class="edu-link-tag ${item.tag}">${
                        item.tag === 'free' ? '🆓 Free' :
                        item.tag === 'paid' ? '💎 Paid' :
                        item.tag === 'govt' ? '🏛️ Govt' :
                        item.tag === 'medical' ? '🏥 Medical' :
                        item.tag === 'engineering' ? '⚙️ Engineering' :
                        item.tag === 'language' ? '🗣️ Language' :
                        item.tag === 'science' ? '🔬 Science' :
                        item.tag === 'business' ? '💼 Business' :
                        item.tag === 'design' ? '🎨 Design' :
                        item.tag === 'ai' ? '🤖 AI' :
                        item.tag === 'jobs' ? '📝 Jobs' :
                        item.tag === 'scholarship' ? '🎯 Scholarship' :
                        item.tag
                    }</span>` : ''}
                </a>
            `).join('');
        });
    }
    renderEducation();

    // =========================================================
    // 🧠 BS~9Q-5F
    // =========================================================
    const bs9q = createPanelController({
        cardSelector: '.lh-cat-card.lh-cat-bs9q',
        overlayId: 'bs9qPanelOverlay',
        closeId: 'bs9qClose',
        openClass: 'bs9q-open',
        navSelector: '.bs9q-nav-btn',
        bodyId: 'bs9qBody',
        jumpPrefix: 'bs9q'
    });

    // BS~9Q Actions
    const bs9qCopy = document.getElementById('bs9qCopyBtn');
    const bs9qDownload = document.getElementById('bs9qDownloadBtn');
    const bs9qShare = document.getElementById('bs9qShareBtn');
    const bs9qFullText = document.getElementById('bs9qFullText');

    bs9qCopy?.addEventListener('click', async () => {
        if (!bs9qFullText) return;
        try {
            await navigator.clipboard.writeText(bs9qFullText.value);
            const label = bs9qCopy.querySelector('span:last-child');
            const orig = label.textContent;
            label.textContent = '✅ কপি হয়েছে!';
            setTimeout(() => label.textContent = orig, 2000);
        } catch {
            bs9qFullText.style.display = 'block';
            bs9qFullText.select();
            document.execCommand('copy');
            bs9qFullText.style.display = 'none';
        }
    });

    bs9qDownload?.addEventListener('click', () => {
        if (!bs9qFullText) return;
        const blob = new Blob([bs9qFullText.value], { type: 'text/plain;charset=utf-8' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = 'BS-9Q-5F-Mindmap-Method.txt';
        a.click();
        URL.revokeObjectURL(a.href);
    });

    bs9qShare?.addEventListener('click', async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'BS~9Q-5F Mindmap Method™',
                    text: 'Universal AI Master Command',
                    url: location.href
                });
            } catch {}
        } else {
            await navigator.clipboard.writeText(location.href);
        }
    });

    // =========================================================
    // ⌨️ SKILLS LAB
    // =========================================================
    const skills = createPanelController({
        cardSelector: '.lh-cat-card.lh-cat-skills',
        overlayId: 'skillsPanelOverlay',
        closeId: 'skillsClose',
        openClass: 'skills-open',
        navSelector: '.skills-nav-btn',
        bodyId: 'skillsBody',
        jumpPrefix: 'skills'
    });

    // =========================================================
    // 🤖 AI WORLD
    // =========================================================
    const aiWorld = createPanelController({
        cardSelector: '.lh-cat-card.lh-cat-ai',
        overlayId: 'aiWorldPanelOverlay',
        closeId: 'aiPanelClose',
        openClass: 'ai-open',
        navSelector: '.ai-nav-btn',
        bodyId: 'aiPanelBody',
        jumpPrefix: 'ai'
    });

    // =========================================================
    // 💻 DEVELOPER LAB
    // =========================================================
    const developer = createPanelController({
        cardSelector: '.lh-cat-card.lh-cat-dev',
        overlayId: 'devPanelOverlay',
        closeId: 'devClose',
        openClass: 'dev-open',
        navSelector: '.dev-nav-btn',
        bodyId: 'devBody',
        jumpPrefix: 'dev'
    });

    // =========================================================
    // 🔬 RESEARCH LAB
    // =========================================================
    const research = createPanelController({
        cardSelector: '.lh-cat-card.lh-cat-research',
        overlayId: 'resPanelOverlay',
        closeId: 'resClose',
        openClass: 'res-open',
        navSelector: '.res-nav-btn',
        bodyId: 'resBody',
        jumpPrefix: 'res'
    });

    // =========================================================
    // 🔍 HUB SEARCH
    // =========================================================
    const hubSearch = document.getElementById('lhSearchInput');
    const hubSearchBtn = document.getElementById('lhSearchBtn');

    hubSearchBtn?.addEventListener('click', () => {
        const q = hubSearch?.value.trim();
        if (!q) return;
        const url = `https://www.google.com/search?q=${encodeURIComponent(q)}`;
        window.open(url, '_blank', 'noopener');
    });

    hubSearch?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') hubSearchBtn?.click();
    });

    // Suggestion buttons
    document.querySelectorAll('.lh-suggest-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const text = btn.textContent.replace('...', '');
            if (hubSearch) {
                hubSearch.value = text + ' ';
                hubSearch.focus();
            }
        });
    });

    // =========================================================
    // 🧪 PUBLIC API
    // =========================================================
    window.OMHub = {
        open: openHub,
        close: closeHub,
        incrementSpin: incrementSpin,
        getSpin: () => spinCount
    };

    window.OMLang = {
        get: () => currentLang,
        set: (lang) => applyLanguage(lang),
        toggle: () => toggleLanguage()
    };

})();/* =========================================================
   🎡 SPIN BUTTON + LEARNING HUB — Controller
   ========================================================= */
(function () {
    'use strict';

    // ---------- SPIN BUTTON ----------
    const spinBtn  = document.getElementById('spinCounterBtn');
    const hubPanel = document.getElementById('learningHubOverlay');
    const closeBtn = document.getElementById('lhClose');
    const spinCountEl = document.getElementById('spinCount');
    const lhSpinCountEl = document.getElementById('lhSpinCount');

    // Safety check
    if (!spinBtn || !hubPanel) {
        console.warn('⚠️ Spin button or hub panel not found in HTML');
        return;
    }

    // ---------- LOAD COUNT FROM LOCALSTORAGE ----------
    const SPIN_KEY = 'om_spin_count';
    let count = parseInt(localStorage.getItem(SPIN_KEY) || '0', 10);

    function updateCount() {
        if (spinCountEl) spinCountEl.textContent = count;
        if (lhSpinCountEl) lhSpinCountEl.textContent = count;
    }
    updateCount();

    // ---------- OPEN HUB ----------
    function openHub() {
        hubPanel.classList.add('lh-open');
        hubPanel.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';

        // Increase count
        count++;
        localStorage.setItem(SPIN_KEY, count);
        updateCount();

        setTimeout(() => closeBtn?.focus(), 100);
    }

    // ---------- CLOSE HUB ----------
    function closeHub() {
        hubPanel.classList.remove('lh-open');
        hubPanel.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        spinBtn.focus();
    }

    // ---------- EVENT LISTENERS ----------
    spinBtn.addEventListener('click', openHub);
    closeBtn?.addEventListener('click', closeHub);

    // Overlay-এ ক্লিক করলে বন্ধ
    hubPanel.addEventListener('click', (e) => {
        if (e.target === hubPanel) closeHub();
    });

    // ESC চাপলে বন্ধ
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && hubPanel.classList.contains('lh-open')) {
            closeHub();
        }
    });

    // ---------- SEARCH ----------
    const searchInput = document.getElementById('lhSearchInput');
    const searchBtn = document.getElementById('lhSearchBtn');

    function doSearch() {
        const q = searchInput?.value.trim();
        if (!q) return;
        window.open('https://www.google.com/search?q=' + encodeURIComponent(q), '_blank', 'noopener');
    }

    searchBtn?.addEventListener('click', doSearch);
    searchInput?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') doSearch();
    });

    // ---------- SUGGESTIONS ----------
    document.querySelectorAll('.lh-suggest-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (searchInput) {
                searchInput.value = btn.textContent.replace('...', '') + ' ';
                searchInput.focus();
            }
        });
    });

})();/* =========================================================
   🎯 LEFT SIDEBAR — BOTTOM TOGGLE
========================================================= */
const libToggle = document.getElementById('libToggle');
const libContent = document.getElementById('libContent');

libToggle?.addEventListener('click', function (e) {
  e.stopPropagation();
  this.classList.toggle('active');
  libContent?.classList.toggle('open');

  // একই সময়ে Right sidebar বন্ধ করে দাও
  ribContent?.classList.remove('open');
  ribToggle?.classList.remove('active');
});

/* =========================================================
   🎯 RIGHT SIDEBAR — BOTTOM TOGGLE
========================================================= */
const ribToggle = document.getElementById('ribToggle');
const ribContent = document.getElementById('ribContent');

ribToggle?.addEventListener('click', function (e) {
  e.stopPropagation();
  this.classList.toggle('active');
  ribContent?.classList.toggle('open');

  // একই সময়ে Left sidebar বন্ধ করে দাও
  libContent?.classList.remove('open');
  libToggle?.classList.remove('active');
});

/* =========================================================
   🔒 বাইরে ক্লিক করলে দুই সাইডবারই বন্ধ
========================================================= */
document.addEventListener('click', function (e) {
  // Left sidebar close
  if (
    libContent?.classList.contains('open') &&
    !libContent.contains(e.target) &&
    e.target !== libToggle
  ) {
    libContent.classList.remove('open');
    libToggle?.classList.remove('active');
  }

  // Right sidebar close
  if (
    ribContent?.classList.contains('open') &&
    !ribContent.contains(e.target) &&
    e.target !== ribToggle
  ) {
    ribContent.classList.remove('open');
    ribToggle?.classList.remove('active');
  }
});

/* =========================================================
   ⌨️ ESC চাপলে দুই সাইডবার বন্ধ
========================================================= */
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') {
    libContent?.classList.remove('open');
    libToggle?.classList.remove('active');
    ribContent?.classList.remove('open');
    ribToggle?.classList.remove('active');
  }
});

/* =========================================================
   ⚡ ভেতরের বাটনগুলোর অ্যাকশন (Left)
========================================================= */
const leftActions = {
  libSearch:    () => alert('🔍 অনুসন্ধান খোলা হচ্ছে...'),
  libLogin:     () => alert('🔐 লগইন পেজ'),
  libRegister:  () => alert('📝 রেজিস্ট্রেশন পেজ'),
  libEmergency: () => alert('🚨 জরুরি নম্বর: ৯৯৯'),
  libHospital:  () => alert('🏥 নিকটস্থ হাসপাতাল'),
  libPolice:    () => alert('👮 পুলিশ: ৯৯৯'),
  libWeather:   () => alert('🌤️ আবহাওয়া আপডেট'),
  libMap:       () => alert('🗺️ ম্যাপ খোলা হচ্ছে...'),
  libContact:   () => alert('📞 যোগাযোগ'),
  libLang:      () => alert('🌐 ভাষা পরিবর্তন: বাংলা ⇄ English'),
  libTheme:     () => alert('🌙 থিম পরিবর্তন'),
};

Object.keys(leftActions).forEach(id => {
  document.getElementById(id)?.addEventListener('click', function (e) {
    e.stopPropagation();
    leftActions[id]();
  });
});

/* =========================================================
   ⚡ ভেতরের বাটনগুলোর অ্যাকশন (Right)
========================================================= */
const rightActions = {
  ribSearch:    () => alert('🔍 অনুসন্ধান (Right)'),
  ribLogin:     () => alert('🔐 লগইন (Right)'),
  ribRegister:  () => alert('📝 রেজিস্ট্রেশন (Right)'),
  ribEmergency: () => alert('🚨 জরুরি (Right): ৯৯৯'),
  ribHospital:  () => alert('🏥 হাসপাতাল (Right)'),
  ribPolice:    () => alert('👮 পুলিশ (Right): ৯৯৯'),
  ribWeather:   () => alert('🌤️ আবহাওয়া (Right)'),
  ribMap:       () => alert('🗺️ ম্যাপ (Right)'),
  ribContact:   () => alert('📞 যোগাযোগ (Right)'),
  ribLang:      () => alert('🌐 ভাষা (Right)'),
  ribTheme:     () => alert('🌙 থিম (Right)'),
};

Object.keys(rightActions).forEach(id => {
  document.getElementById(id)?.addEventListener('click', function (e) {
    e.stopPropagation();
    rightActions[id]();
  });
});

/* =========================================================
   🌐 ভাষা পরিবর্তন (বাংলা ⇄ English) — Optional
========================================================= */
let currentLang = 'bn';

document.getElementById('libLang')?.addEventListener('click', function (e) {
  e.stopPropagation();
  currentLang = currentLang === 'bn' ? 'en' : 'bn';
  const label = document.getElementById('libLangText');
  if (label) label.textContent = currentLang === 'bn' ? 'বাংলা' : 'English';
});

/* =========================================================
   🌙 থিম পরিবর্তন — Optional
========================================================= */
let isDark = true;

document.getElementById('libTheme')?.addEventListener('click', function (e) {
  e.stopPropagation();
  isDark = !isDark;
  const icon = document.getElementById('libThemeIcon');
  if (icon) icon.textContent = isDark ? '🌙' : '☀️';
});

/* =========================================================
   📱 Touch Device — বাইরে ট্যাপে ক্লোজ
========================================================= */
document.addEventListener('touchstart', function (e) {
  if (
    libContent?.classList.contains('open') &&
    !libContent.contains(e.target) &&
    e.target !== libToggle
  ) {
    libContent.classList.remove('open');
    libToggle?.classList.remove('active');
  }

  if (
    ribContent?.classList.contains('open') &&
    !ribContent.contains(e.target) &&
    e.target !== ribToggle
  ) {
    ribContent.classList.remove('open');
    ribToggle?.classList.remove('active');
  }
});(function () {
  'use strict';

  /* ===== 1. MOBILE MENU TOGGLE ===== */
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const mainNav = document.getElementById('mainNav');

  if (mobileBtn && mainNav) {
    mobileBtn.addEventListener('click', function () {
      mobileBtn.classList.toggle('active');
      mainNav.classList.toggle('open');
    });
  }

  /* ===== 2. MEGA MENU — MOBILE TAP ===== */
  const navItems = document.querySelectorAll('.nav-item.has-mega');

  navItems.forEach(function (item) {
    const link = item.querySelector('.nav-link');
    link.addEventListener('click', function (e) {
      if (window.innerWidth <= 960) {
        e.preventDefault();
        navItems.forEach(function (other) {
          if (other !== item) other.classList.remove('mega-open');
        });
        item.classList.toggle('mega-open');
      }
    });
  });

  document.querySelectorAll('.mega-menu a').forEach(function (link) {
    link.addEventListener('click', function () {
      if (window.innerWidth <= 960) {
        if (mainNav) mainNav.classList.remove('open');
        if (mobileBtn) mobileBtn.classList.remove('active');
        navItems.forEach(function (i) { i.classList.remove('mega-open'); });
      }
    });
  });

  document.addEventListener('click', function (e) {
    if (window.innerWidth <= 960) {
      if (!e.target.closest('.nav-item')) {
        navItems.forEach(function (i) { i.classList.remove('mega-open'); });
      }
    }
  });

  /* ===== 3. ACTIVE LINK ON SCROLL ===== */
  const sections = document.querySelectorAll('section[id], div[id], main[id]');
  const allNavLinks = document.querySelectorAll('.nav-link');

  function setActiveLink() {
    let currentId = '';
    const scrollPos = window.scrollY + 120;
    sections.forEach(function (sec) {
      if (sec.offsetTop <= scrollPos) currentId = sec.id;
    });
    allNavLinks.forEach(function (link) {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href && href === '#' + currentId) link.classList.add('active');
    });
  }

  if (sections.length > 0) {
    window.addEventListener('scroll', setActiveLink, { passive: true });
    setActiveLink();
  }

  /* ===== 4. SMOOTH SCROLL ===== */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#' || targetId.length < 2) return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const headerOffset = 70;
        const targetPos = target.getBoundingClientRect().top + window.scrollY - headerOffset;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
      }
    });
  });

  /* ===== 5. RESIZE HANDLER ===== */
  window.addEventListener('resize', function () {
    if (window.innerWidth > 960) {
      if (mainNav) mainNav.classList.remove('open');
      if (mobileBtn) mobileBtn.classList.remove('active');
      navItems.forEach(function (i) { i.classList.remove('mega-open'); });
    }
  });

})();/* ═══════════════════════════════════════════
   🌴 LIVE STATUS BAR — Add-on Script
   (Topbar + Navigation-এর মাঝের bar)
   এই কোড আপনার main.js-এর শেষে যোগ করুন
═══════════════════════════════════════════ */

(function initLiveStatusBarAddon() {
    'use strict';

    /* ─── Helper: get current language ─── */
    const getLang = () => localStorage.getItem('om.lang') || 'bn';
    const isBn = () => getLang() === 'bn';
    const t = (bn, en) => isBn() ? bn : en;

    /* ─── Helper: toast (fallback if not exists) ─── */
    const showToast = window.showToast || function (msg) {
        const temp = document.createElement('div');
        temp.style.cssText = `
            position: fixed; top: 90px; right: 20px;
            background: linear-gradient(135deg, #1B7A4E, #2AB3A6);
            color: #fff; padding: 12px 20px; border-radius: 12px;
            font-family: 'Hind Siliguri', sans-serif; font-size: 14px;
            font-weight: 600; box-shadow: 0 8px 24px rgba(11,61,46,.25);
            z-index: 99999; opacity: 0; transform: translateY(-20px);
            transition: all 0.3s ease; pointer-events: none;
        `;
        temp.textContent = msg;
        document.body.appendChild(temp);
        requestAnimationFrame(() => {
            temp.style.opacity = '1';
            temp.style.transform = 'translateY(0)';
        });
        setTimeout(() => {
            temp.style.opacity = '0';
            temp.style.transform = 'translateY(-20px)';
            setTimeout(() => temp.remove(), 300);
        }, 2400);
    };

    /* ═══ 1. ONLINE / OFFLINE ═══ */
    const onlineEl = document.getElementById('liveOnline');

    function updateOnline() {
        if (!onlineEl) return;
        const online = navigator.onLine;
        onlineEl.setAttribute('data-status', online ? 'online' : 'offline');

        const textEl = onlineEl.querySelector('.live-text');
        if (textEl) {
            textEl.textContent = online
                ? t('অনলাইন', 'Online')
                : t('অফলাইন', 'Offline');
        }
    }

    window.addEventListener('online', updateOnline);
    window.addEventListener('offline', updateOnline);
    updateOnline();

    /* ═══ 2. WEATHER ═══ */
    const weatherEl = document.getElementById('liveWeather');
    const weatherIcon = weatherEl ? weatherEl.querySelector('.live-icon') : null;
    const weatherText = document.getElementById('liveWeatherText');

    function updateWeather() {
        if (!weatherIcon) return;
        const hour = new Date().getHours();
        if (hour >= 6 && hour < 18) {
            weatherIcon.textContent = '🌤️';
        } else if (hour >= 18 && hour < 21) {
            weatherIcon.textContent = '🌆';
        } else {
            weatherIcon.textContent = '🌙';
        }
        if (weatherText && !weatherText.dataset.liveTemp) {
            weatherText.textContent = '—°C';
        }
    }
    updateWeather();
    setInterval(updateWeather, 60000);

    /* ═══ 3. ALERT STATUS ═══ */
    const alertEl = document.getElementById('liveAlert');

    function setAlertLevel(level, customBn, customEn) {
        if (!alertEl) return;
        alertEl.setAttribute('data-level', level);
        const textEl = alertEl.querySelector('.live-text');
        if (!textEl) return;

        let bn, en;
        if (customBn || customEn) {
            bn = customBn;
            en = customEn;
        } else {
            const map = {
                safe:    { bn: 'নিরাপদ',  en: 'Safe' },
                warning: { bn: 'সতর্কতা', en: 'Warning' },
                danger:  { bn: 'বিপদ',    en: 'Danger' }
            };
            const item = map[level] || map.safe;
            bn = item.bn;
            en = item.en;
        }
        textEl.textContent = t(bn, en);
    }

    setAlertLevel('safe');
    // Expose globally for future use
    window.OM_setAlert = setAlertLevel;

    /* ═══ 4. VISITOR COUNTER ═══ */
    const visitorEl = document.getElementById('liveVisitorCount');

    function updateVisitors() {
        if (!visitorEl) return;

        let count = parseInt(localStorage.getItem('om.visits') || '0', 10);

        // Increment once per session
        if (!sessionStorage.getItem('om.counted')) {
            count += 1;
            localStorage.setItem('om.visits', String(count));
            sessionStorage.setItem('om.counted', '1');
        }

        const total = 1240 + count;
        visitorEl.dataset.rawValue = String(total);
        visitorEl.textContent = isBn()
            ? total.toLocaleString('bn-BD')
            : total.toLocaleString('en-US');
    }
    updateVisitors();

    /* ═══ 5. EMERGENCY BUTTON ═══ */
    const emergencyBtn = document.getElementById('liveEmergencyBtn');
    const emergencyModal = document.getElementById('emergency-modal');

    if (emergencyBtn) {
        emergencyBtn.addEventListener('click', () => {
            if (emergencyModal) {
                emergencyModal.removeAttribute('hidden');
                document.body.style.overflow = 'hidden';
                const closeBtn = emergencyModal.querySelector('.modal__close, [data-close]');
                if (closeBtn) setTimeout(() => closeBtn.focus(), 100);
            } else {
                // Fallback — scroll to emergency section
                const section = document.getElementById('emergency');
                if (section) section.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }

    /* ═══ 6. LANGUAGE CHANGE HOOK ═══ */
    // When language toggle happens, re-render this bar
    window.addEventListener('om:language-change', () => {
        updateOnline();
        updateWeather();
        updateVisitors();

        if (alertEl) {
            const currentLevel = alertEl.getAttribute('data-level') || 'safe';
            setAlertLevel(currentLevel);
        }
    });

})();/* ═══════════════════════════════════════════
   🌐 LANGUAGE SWITCH SYSTEM
   Bangla ↔ English
   Reads data-bn / data-en from all elements
═══════════════════════════════════════════ */

(function initLanguageSystem() {
  'use strict';

  const STORAGE_KEY = 'om.lang';
  const DEFAULT_LANG = 'bn';
  const SUPPORTED = ['bn', 'en'];

  /* ─── Get current language ─── */
  function getLang() {
    const saved = localStorage.getItem(STORAGE_KEY);
    return SUPPORTED.includes(saved) ? saved : DEFAULT_LANG;
  }

  /* ─── Apply language to ALL elements ─── */
  function applyLanguage(lang) {
    const isBn = lang === 'bn';

    // Set html attributes
    document.documentElement.lang = lang;
    document.documentElement.setAttribute('data-lang', lang);

    // 1. Text content
    document.querySelectorAll('[data-bn][data-en]').forEach(el => {
      const val = el.getAttribute(isBn ? 'data-bn' : 'data-en');
      if (val !== null && val !== undefined) {
        el.textContent = val;
      }
    });

    // 2. Placeholders
    document.querySelectorAll('[data-bn-placeholder][data-en-placeholder]').forEach(el => {
      const val = el.getAttribute(isBn ? 'data-bn-placeholder' : 'data-en-placeholder');
      if (val) el.placeholder = val;
    });

    // 3. Titles
    document.querySelectorAll('[data-bn-title][data-en-title]').forEach(el => {
      const val = el.getAttribute(isBn ? 'data-bn-title' : 'data-en-title');
      if (val) el.title = val;
    });

    // 4. Aria labels
    document.querySelectorAll('[data-bn-aria][data-en-aria]').forEach(el => {
      const val = el.getAttribute(isBn ? 'data-bn-aria' : 'data-en-aria');
      if (val) el.setAttribute('aria-label', val);
    });

    // 5. Update language toggle button label
    document.querySelectorAll('#topLangText, #language-toggle, .lang-current, #libLangText').forEach(el => {
      el.textContent = isBn ? 'বাংলা' : 'English';
    });

    // 6. Dispatch event for other scripts
    window.dispatchEvent(new CustomEvent('om:language-change', {
      detail: { lang: lang }
    }));

    console.log('[i18n] Language:', lang);
  }

  /* ─── Toggle ─── */
  function toggleLanguage() {
    const current = getLang();
    const next = current === 'bn' ? 'en' : 'bn';
    localStorage.setItem(STORAGE_KEY, next);
    applyLanguage(next);

    // Toast notification
    if (window.showToast) {
      window.showToast(next === 'bn' ? '🌐 ভাষা: বাংলা' : '🌐 Language: English');
    }
  }

  /* ─── Bind all language toggle buttons ─── */
  function bindToggles() {
    const selectors = [
      '#topLangBtn',
      '#language-toggle',
      '#libLang',
      '#ribLang',
      '[data-lang-toggle]',
      '[data-i18n-toggle]'
    ];

    selectors.forEach(sel => {
      document.querySelectorAll(sel).forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          toggleLanguage();
        });
      });
    });

    console.log('[i18n] Bound language toggle buttons');
  }

  /* ─── Init on page load ─── */
  function init() {
    const lang = getLang();
    applyLanguage(lang);
    bindToggles();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose globally
  window.OM_setLanguage = applyLanguage;
  window.OM_getLanguage = getLang;

})();/* ═══════════════════════════════════════════
   🗺️ INTERACTIVE MAP — Matarbari First
═══════════════════════════════════════════ */

(function initMap() {
  'use strict';

  const UNIONS = [
    { id: 'matarbari',          icon: '🏭', x: 22, y: 32, name: { bn: 'মাতারবাড়ী', en: 'Matarbari' },         num: { bn: 'ইউনিয়ন ১', en: 'Union 1' } },
    { id: 'dhalghata',          icon: '🌴', x: 75, y: 25, name: { bn: 'ধলঘাটা', en: 'Dhalghata' },             num: { bn: 'ইউনিয়ন ২', en: 'Union 2' } },
    { id: 'kalarmarchhara',     icon: '🌿', x: 50, y: 42, name: { bn: 'কালারমারছড়া', en: 'Kalarmarchhara' },   num: { bn: 'ইউনিয়ন ৩', en: 'Union 3' } },
    { id: 'shaplapur',          icon: '🌸', x: 35, y: 58, name: { bn: 'শাপলাপুর', en: 'Shaplapur' },             num: { bn: 'ইউনিয়ন ৪', en: 'Union 4' } },
    { id: 'hoanak',             icon: '🌊', x: 65, y: 52, name: { bn: 'হোয়ানক', en: 'Hoanak' },                num: { bn: 'ইউনিয়ন ৫', en: 'Union 5' } },
    { id: 'bara-maheshkhali',   icon: '🏝️', x: 45, y: 18, name: { bn: 'বড় মহেশখালী', en: 'Bara Maheshkhali' }, num: { bn: 'ইউনিয়ন ৬', en: 'Union 6' } },
    { id: 'kutubjom',           icon: '🏖️', x: 28, y: 72, name: { bn: 'কুতুবজোম', en: 'Kutubjom' },            num: { bn: 'ইউনিয়ন ৭', en: 'Union 7' } },
    { id: 'chhota-maheshkhali', icon: '⛰️', x: 72, y: 78, name: { bn: 'ছোট মহেশখালী', en: 'Chhota Maheshkhali' }, num: { bn: 'ইউনিয়ন ৮', en: 'Union 8' } }
  ];

  const overlay  = document.getElementById('map-modal');
  const island   = document.getElementById('map-island');
  const listEl   = document.getElementById('map-list');
  const searchEl = document.getElementById('map-search');

  if (!overlay || !island || !listEl) {
    console.warn('[Map] Missing elements');
    return;
  }

  const getLang = () => localStorage.getItem('om.lang') || 'bn';
  const isBn    = () => getLang() === 'bn';
  const pick    = (obj) => isBn() ? obj.bn : obj.en;

  function renderList() {
    listEl.innerHTML = UNIONS.map(u => `
      <button type="button" class="map-list-item" data-union="${u.id}">
        <span class="map-list-item__icon">${u.icon}</span>
        <span class="map-list-item__content">
          <strong>${pick(u.name)}</strong>
          <small>${pick(u.num)}</small>
        </span>
      </button>
    `).join('');
  }

  function renderMarkers() {
    island.innerHTML = UNIONS.map(u => `
      <div class="map-marker" data-union="${u.id}" style="left:${u.x}%;top:${u.y}%" title="${pick(u.name)}">
        <div class="map-marker__dot"></div>
        <div class="map-marker__label">${pick(u.name)}</div>
      </div>
    `).join('');
  }

  function openGoogleMaps(union) {
    const q = encodeURIComponent(`${union.name.en}, Maheshkhali, Cox's Bazar, Bangladesh`);
    window.open(`https://www.google.com/maps/search/?api=1&query=${q}`, '_blank', 'noopener');
  }

  function initClicks() {
    document.addEventListener('click', (e) => {
      const item = e.target.closest('.map-list-item, .map-marker');
      if (!item || !overlay.contains(item)) return;

      const u = UNIONS.find(x => x.id === item.dataset.union);
      if (!u) return;

      document.querySelectorAll('.map-marker, .map-list-item')
        .forEach(el => el.classList.remove('active'));

      item.classList.add('active');
      openGoogleMaps(u);
    });
  }

  function initSearch() {
    if (!searchEl) return;
    searchEl.addEventListener('input', () => {
      const q = searchEl.value.trim().toLowerCase();
      listEl.querySelectorAll('.map-list-item').forEach(item => {
        item.style.display =
          !q || item.textContent.toLowerCase().includes(q) ? '' : 'none';
      });
    });
  }

  function openMap() {
    overlay.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
    renderList();
    renderMarkers();
  }

  function closeMap() {
    overlay.setAttribute('hidden', '');
    document.body.style.overflow = '';
  }

  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('a[href="#map"], [data-open="map"]');
    if (trigger) {
      e.preventDefault();
      openMap();
      return;
    }
    if (e.target.closest('#map-modal [data-close]')) closeMap();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !overlay.hasAttribute('hidden')) closeMap();
  });

  window.addEventListener('om:language-change', () => {
    if (!overlay.hasAttribute('hidden')) {
      renderList();
      renderMarkers();
    }
  });

  initClicks();
  initSearch();

  console.log('[Map] Ready — Matarbari first, 8 unions');
  window.OM_Map = { open: openMap, close: closeMap };

})();/* =========================================================
   🌴 TOP INFORMATION BAR — SCRIPT
========================================================= */

/* ---------- 1. LIVE DATE / DAY / TIME ---------- */
const DAYS_BN = ['রবিবার','সোমবার','মঙ্গলবার','বুধবার','বৃহস্পতিবার','শুক্রবার','শনিবার'];
const DAYS_EN = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const MONTHS_BN = ['জানুয়ারি','ফেব্রুয়ারি','মার্চ','এপ্রিল','মে','জুন','জুলাই','আগস্ট','সেপ্টেম্বর','অক্টোবর','নভেম্বর','ডিসেম্বর'];
const MONTHS_EN = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

function pad(n) { return n.toString().padStart(2, '0'); }

function updateDateTime() {
    const now = new Date();
    const isEn = document.documentElement.lang === 'en';

    // Day
    const dayEl = document.getElementById('current-day');
    if (dayEl) {
        const bn = DAYS_BN[now.getDay()];
        const en = DAYS_EN[now.getDay()];
        dayEl.setAttribute('data-bn', bn);
        dayEl.setAttribute('data-en', en);
        dayEl.textContent = isEn ? en : bn;
    }

    // Date
    const dateEl = document.getElementById('current-date');
    if (dateEl) {
        const d = pad(now.getDate());
        const m = isEn ? MONTHS_EN[now.getMonth()] : MONTHS_BN[now.getMonth()];
        const y = now.getFullYear();
        dateEl.textContent = `${d} ${m} ${y}`;
    }

    // Time
    const timeEl = document.getElementById('live-time');
    if (timeEl) {
        let h = now.getHours();
        const ampm = h >= 12 ? 'PM' : 'AM';
        h = h % 12 || 12;
        timeEl.textContent = `${pad(h)}:${pad(now.getMinutes())}:${pad(now.getSeconds())} ${ampm}`;
    }
}

updateDateTime();
setInterval(updateDateTime, 1000);

/* ---------- 2. LANGUAGE TOGGLE ---------- */
const topLangBtn  = document.getElementById('topLangBtn');
const topLangText = document.getElementById('topLangText');

topLangBtn?.addEventListener('click', () => {
    const newLang = document.documentElement.lang === 'bn' ? 'en' : 'bn';
    document.documentElement.lang = newLang;

    const targets = document.querySelectorAll('[data-bn][data-en]');
    targets.forEach(el => el.classList.add('swapping'));

    setTimeout(() => {
        targets.forEach(el => {
            el.textContent = el.getAttribute('data-' + newLang);
            el.classList.remove('swapping');
        });
        updateDateTime();
    }, 220);

    localStorage.setItem('lang', newLang);
});

// Restore saved language
(function restoreLang() {
    const saved = localStorage.getItem('lang');
    if (saved === 'en') {
        document.documentElement.lang = 'en';
        document.querySelectorAll('[data-bn][data-en]').forEach(el => {
            el.textContent = el.getAttribute('data-en');
        });
        updateDateTime();
    }
})();

/* ---------- 3. THEME TOGGLE ---------- */
const topThemeBtn = document.getElementById('topThemeBtn');

if (localStorage.getItem('theme') === 'light') {
    document.body.classList.add('light-theme');
    if (topThemeBtn) topThemeBtn.textContent = '☀️';
}

topThemeBtn?.addEventListener('click', () => {
    const isLight = document.body.classList.toggle('light-theme');
    topThemeBtn.textContent = isLight ? '☀️' : '🌙';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
});

/* ---------- 4. LOGIN / LOGOUT ---------- */
const topLoginBtn  = document.getElementById('topLoginBtn');
const topLogoutBtn = document.getElementById('topLogoutBtn');

if (localStorage.getItem('isLoggedIn') === 'true') {
    document.body.classList.add('logged-in');
}

topLoginBtn?.addEventListener('click', () => {
    // TODO: open login modal / redirect
    localStorage.setItem('isLoggedIn', 'true');
    document.body.classList.add('logged-in');
});

topLogoutBtn?.addEventListener('click', () => {
    localStorage.removeItem('isLoggedIn');
    document.body.classList.remove('logged-in');
});

/* ---------- 5. MY LOCATION ---------- */
const topLocationBtn = document.getElementById('topLocationBtn');
topLocationBtn?.addEventListener('click', () => {
    if (!navigator.geolocation) {
        alert('Geolocation is not supported by your browser.');
        return;
    }
    topLocationBtn.disabled = true;
    navigator.geolocation.getCurrentPosition(
        (pos) => {
            const { latitude, longitude } = pos.coords;
            window.open(`https://www.google.com/maps?q=${latitude},${longitude}`, '_blank');
            topLocationBtn.disabled = false;
        },
        () => {
            alert('Location access denied or unavailable.');
            topLocationBtn.disabled = false;
        }
    );
});

/* ---------- 6. NOTIFICATIONS ---------- */
const topNotifBtn = document.getElementById('topNotifBtn');
topNotifBtn?.addEventListener('click', () => {
    // TODO: open notification panel
    console.log('🔔 Notifications opened');
});/* =========================================================
   🏝️ HERO SECTION — SCRIPT
   Our Maheshkhali
========================================================= */

/* ---------- 1. 3D PARALLAX ON MOUSE MOVE ---------- */
const heroSection = document.querySelector('.hero-section');
const heroIsland  = document.getElementById('heroIsland');
const sunEl       = document.querySelector('.ocean-sun');
const sunGlowEl   = document.querySelector('.ocean-sun-glow');
const floatingCards = document.querySelectorAll('.floating-card');

if (heroSection && window.matchMedia('(hover: hover)').matches) {
    heroSection.addEventListener('mousemove', (e) => {
        const rect = heroSection.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width  - 0.5;
        const y = (e.clientY - rect.top)  / rect.height - 0.5;

        if (heroIsland) {
            heroIsland.style.transform =
                `translateX(-50%) translateY(${y * -14}px) rotateX(${y * 6}deg) rotateY(${x * 8}deg)`;
        }
        if (sunEl) {
            sunEl.style.transform = `translate(${x * 20}px, ${y * 20}px)`;
        }
        if (sunGlowEl) {
            sunGlowEl.style.transform = `translate(${x * 30}px, ${y * 30}px)`;
        }
    });

    heroSection.addEventListener('mouseleave', () => {
        if (heroIsland) {
            heroIsland.style.transform = 'translateX(-50%) translateY(0) rotateX(0) rotateY(0)';
        }
        if (sunEl)     sunEl.style.transform = '';
        if (sunGlowEl) sunGlowEl.style.transform = '';
    });
}

/* ---------- 2. FLOATING CARDS 3D TILT (per card) ---------- */
floatingCards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width  - 0.5;
        const y = (e.clientY - rect.top)  / rect.height - 0.5;
        card.style.transform =
            `translateZ(20px) translateY(-4px) rotateX(${y * -10}deg) rotateY(${x * 10}deg) scale(1.05)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

/* ---------- 3. TIME-BASED SKY (DAY / EVENING / NIGHT) ---------- */
(function adaptiveSky() {
    const hour = new Date().getHours();
    const sky = document.querySelector('.ocean-sky');
    if (!sky) return;

    if (hour >= 5 && hour < 12) {
        // Morning
        sky.style.background = 'linear-gradient(180deg, #0b1e3d 0%, #1c3d6e 40%, #ffb88c 100%)';
    } else if (hour >= 12 && hour < 17) {
        // Afternoon
        sky.style.background = 'linear-gradient(180deg, #1b4b8a 0%, #3b86c9 50%, #ffb88c 100%)';
    } else if (hour >= 17 && hour < 19) {
        // Sunset
        sky.style.background = 'linear-gradient(180deg, #0b1e3d 0%, #7a2f5c 45%, #ff8a5c 100%)';
    } else {
        // Night
        sky.style.background = 'linear-gradient(180deg, #030614 0%, #0b1230 60%, #1a1f4a 100%)';
    }
})();

/* ---------- 4. SMOOTH SCROLL FOR HERO BUTTONS ---------- */
document.querySelectorAll('.hero-actions a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});/* =========================================================
   🌴 FOOTER SCRIPT — Our Maheshkhali
========================================================= */

/* ---------- 1. SMOOTH SCROLL FOR FOOTER LINKS ---------- */
document.querySelectorAll('.site-footer a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
        const id = link.getAttribute('href');
        if (id === '#') return;
        const target = document.querySelector(id);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

/* ---------- 2. AUTO YEAR IN COPYRIGHT ---------- */
(function autoYear() {
    const copyright = document.querySelector('.fb-copyright p');
    if (!copyright) return;

    const year = new Date().getFullYear();
    const lang = document.documentElement.lang === 'en' ? 'en' : 'bn';

    const bnDigits = ['০','১','২','৩','৪','৫','৬','৭','৮','৯'];
    const toBn = (n) => n.toString().split('').map(d => bnDigits[+d] ?? d).join('');

    if (lang === 'en') {
        copyright.setAttribute('data-en', `© ${year} OUR MAHESHKHALI. All rights reserved.`);
    } else {
        copyright.setAttribute('data-bn', `© ${toBn(year)} OUR MAHESHKHALI। সর্বস্বত্ব সংরক্ষিত।`);
    }

    const text = copyright.getAttribute('data-' + lang);
    if (text) copyright.textContent = text;
})();

/* ---------- 3. DEV 3D CUBE — MOUSE TILT ---------- */
const devScene = document.querySelector('.dev-3d-scene');
const devCube  = document.querySelector('.dev-3d-cube');

if (devScene && devCube && window.matchMedia('(hover: hover)').matches) {
    devScene.addEventListener('mousemove', (e) => {
        const rect = devScene.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width  - 0.5;
        const y = (e.clientY - rect.top)  / rect.height - 0.5;

        devCube.style.animation = 'none';
        devCube.style.transform =
            `rotateX(${y * -60}deg) rotateY(${x * 60}deg)`;
    });
    devScene.addEventListener('mouseleave', () => {
        devCube.style.transform = '';
        devCube.style.animation = 'cubeRotate3D 12s linear infinite';
    });
}

/* ---------- 4. FLOATING PARTICLES PARALLAX ---------- */
const footer = document.querySelector('.site-footer');
const particles = document.querySelectorAll('.fp');

if (footer && particles.length) {
    footer.addEventListener('mousemove', (e) => {
        const rect = footer.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width  - 0.5;
        const y = (e.clientY - rect.top)  / rect.height - 0.5;

        particles.forEach((p, i) => {
            const depth = ((i % 3) + 1) * 6;
            p.style.marginLeft = `${x * depth}px`;
            p.style.marginTop  = `${y * depth}px`;
        });
    });
}/* =========================================================
   ✨ কাস্টম 3D অ্যানিমেটেড কার্সর — স্ক্রিপ্ট
========================================================= */

(function initCustomCursor() {
    // মোবাইল/ট্যাবে বন্ধ
    const isTouch = window.matchMedia('(hover: none), (pointer: coarse)').matches;
    if (isTouch) return;

    const cursor   = document.getElementById('cursor3D');
    const glow     = document.getElementById('cursorGlow');
    const sparkles = document.getElementById('cursorSparkles');

    if (!cursor || !glow) return;

    let mouseX = window.innerWidth  / 2;
    let mouseY = window.innerHeight / 2;
    let posX   = mouseX;
    let posY   = mouseY;
    let glowX  = mouseX;
    let glowY  = mouseY;

    // মাউস ট্র্যাক
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        spawnSparkle(e.clientX, e.clientY);
    });

    // স্মুথ ফলো
    function animate() {
        posX += (mouseX - posX) * 0.22;
        posY += (mouseY - posY) * 0.22;

        glowX += (mouseX - glowX) * 0.12;
        glowY += (mouseY - glowY) * 0.12;

        cursor.style.transform = `translate3d(${posX}px, ${posY}px, 0)`;
        glow.style.transform   = `translate3d(${glowX}px, ${glowY}px, 0)`;

        requestAnimationFrame(animate);
    }
    animate();

    // হোভার ডিটেকশন
    const hoverTargets = 'a, button, [role="button"], input, textarea, select, .ctrl-btn, .top-action-btn, .button, .fs-btn, .floating-card, .fc-list a';

    document.querySelectorAll(hoverTargets).forEach((el) => {
        el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
    });

    document.addEventListener('mouseover', (e) => {
        if (e.target.closest && e.target.closest(hoverTargets)) {
            cursor.classList.add('cursor-hover');
        }
    });
    document.addEventListener('mouseout', (e) => {
        if (e.target.closest && e.target.closest(hoverTargets)) {
            cursor.classList.remove('cursor-hover');
        }
    });

    // ক্লিক
    document.addEventListener('mousedown', () => cursor.classList.add('cursor-click'));
    document.addEventListener('mouseup',   () => cursor.classList.remove('cursor-click'));

    // স্পার্কল
    let lastSparkleTime = 0;
    function spawnSparkle(x, y) {
        const now = performance.now();
        if (now - lastSparkleTime < 60) return;
        lastSparkleTime = now;

        const s = document.createElement('span');
        s.className = 'sparkle';
        s.style.left = x + 'px';
        s.style.top  = y + 'px';
        s.style.background = Math.random() > 0.5
            ? 'radial-gradient(circle, #fff, #00e0ff)'
            : 'radial-gradient(circle, #fff, #ff2e88)';
        s.style.boxShadow = Math.random() > 0.5
            ? '0 0 10px #00e0ff'
            : '0 0 10px #ff2e88';

        sparkles.appendChild(s);
        setTimeout(() => s.remove(), 900);
    }

    // উইন্ডো ছেড়ে গেলে
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        glow.style.opacity   = '0';
    });
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        glow.style.opacity   = '1';
    });
})();/* =========================================================
   📱 MOBILE NAVIGATION TOGGLE
========================================================= */

(function initMobileNav() {
    const navbar  = document.querySelector('.navbar') || document.querySelector('nav');
    const navMenu = document.querySelector('.nav-menu') || document.querySelector('.navbar-menu');
    if (!navbar || !navMenu) return;

    // Hamburger button তৈরি
    let hamburger = navbar.querySelector('.hamburger');
    if (!hamburger) {
        hamburger = document.createElement('button');
        hamburger.className = 'hamburger';
        hamburger.type = 'button';
        hamburger.setAttribute('aria-label', 'Toggle menu');
        hamburger.setAttribute('aria-expanded', 'false');
        hamburger.innerHTML = `
            <span></span>
            <span></span>
            <span></span>
        `;
        navbar.appendChild(hamburger);
    }

    // Hamburger style inject
    const style = document.createElement('style');
    style.textContent = `
        .hamburger {
            display: none;
            flex-direction: column;
            justify-content: center;
            gap: 5px;
            width: 42px;
            height: 42px;
            padding: 8px;
            background: rgba(255,255,255,0.06);
            border: 1px solid rgba(255,255,255,0.15);
            border-radius: 10px;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        .hamburger span {
            display: block;
            width: 100%;
            height: 2px;
            background: #fff;
            border-radius: 2px;
            transition: all 0.3s ease;
        }
        .hamburger.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        .hamburger.active span:nth-child(3) {
            transform: rotate(-45deg) translate(5px, -5px);
        }
        @media (max-width: 1023px) {
            .hamburger { display: flex !important; }
        }
    `;
    document.head.appendChild(style);

    // Toggle menu
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        const expanded = hamburger.getAttribute('aria-expanded') === 'true';
        hamburger.setAttribute('aria-expanded', !expanded);

        if (!expanded) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // মেনু লিংকে ক্লিক করলে বন্ধ
    navMenu.querySelectorAll('a').forEach((link) => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        });
    });

    // Resize করলে মেনু বন্ধ
    window.addEventListener('resize', () => {
        if (window.innerWidth > 1023) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
})();/* =========================================================
   🎯 MEGA MENU DETAILS MODAL — FULLY FUNCTIONAL
========================================================= */

const MEGA_DATA = {
    '#jobs': {
        icon: '💼', category: 'Career', title: 'Jobs', bnTitle: 'চাকরি',
        descBn: 'মহেশখালী ও কক্সবাজার এলাকার সর্বশেষ চাকরির খবর এক জায়গায়।',
        descEn: 'Latest job circulars from Maheshkhali and Cox\'s Bazar area.',
        points: ['সরকারি চাকরি', 'বেসরকারি চাকরি', 'এনজিও', 'পার্ট-টাইম', 'রিমোট জব'],
        stats: [{ v: '500+', l: 'Live Jobs' }, { v: '50+', l: 'Companies' }]
    },
    '#business': {
        icon: '🏢', category: 'Career', title: 'Business', bnTitle: 'ব্যবসা',
        descBn: 'মহেশখালীর স্থানীয় ব্যবসা, দোকান, হোটেল, রেস্টুরেন্ট সহ সব ডিরেক্টরি।',
        descEn: 'Directory of all local businesses, shops, hotels and restaurants.',
        points: ['ব্যবসা ডিরেক্টরি', 'সরাসরি যোগাযোগ', 'ম্যাপ', 'রিভিউ'],
        stats: [{ v: '300+', l: 'Businesses' }, { v: '8', l: 'Unions' }]
    },
    '#entrepreneurship': {
        icon: '🚀', category: 'Career', title: 'Entrepreneurship', bnTitle: 'উদ্যোক্তা',
        descBn: 'নতুন উদ্যোক্তাদের জন্য গাইড, পরামর্শ, সফলতার গল্প।',
        descEn: 'Guides, mentorship and success stories for new entrepreneurs.',
        points: ['স্টার্টআপ গাইড', 'সফলতার গল্প', 'মেন্টরশিপ', 'বিজনেস প্ল্যান'],
        stats: [{ v: '100+', l: 'Success Stories' }]
    },
    '#freelancing': {
        icon: '💻', category: 'Career', title: 'Freelancing', bnTitle: 'ফ্রিল্যান্সিং',
        descBn: 'ফ্রিল্যান্সিং শেখার গাইড, প্ল্যাটফর্ম, পেমেন্ট মেথড।',
        descEn: 'Learn freelancing with guides, platforms and payment methods.',
        points: ['Fiverr / Upwork', 'পেমেন্ট মেথড', 'পোর্টফোলিও', 'ক্লায়েন্ট হ্যান্ডলিং'],
        stats: [{ v: '200+', l: 'Freelancers' }]
    },
    '#cv-builder': {
        icon: '📄', category: 'Career', title: 'CV Builder', bnTitle: 'CV বিল্ডার',
        descBn: 'সহজে প্রফেশনাল CV তৈরি করুন কয়েক মিনিটে।',
        descEn: 'Create professional CVs in minutes with ready templates.',
        points: ['ফ্রি টেমপ্লেট', 'লাইভ প্রিভিউ', 'PDF ডাউনলোড'],
        stats: [{ v: '10+', l: 'Templates' }, { v: '100%', l: 'Free' }]
    },
    '#scholarships': {
        icon: '🎓', category: 'Education & Growth', title: 'Scholarships', bnTitle: 'বৃত্তি',
        descBn: 'দেশে ও বিদেশে পড়াশোনার জন্য বৃত্তির তথ্য।',
        descEn: 'Scholarships info for studying at home and abroad.',
        points: ['সরকারি বৃত্তি', 'বেসরকারি বৃত্তি', 'বিদেশি বৃত্তি', 'আবেদনের গাইড'],
        stats: [{ v: '80+', l: 'Scholarships' }]
    },
    '#training': {
        icon: '🛠️', category: 'Education & Growth', title: 'Training & Skills', bnTitle: 'প্রশিক্ষণ',
        descBn: 'কম্পিউটার, হস্তশিল্প, কৃষি, মৎস্য সহ সব প্রশিক্ষণ।',
        descEn: 'Computer, handicraft, agriculture, fisheries and all training courses.',
        points: ['কম্পিউটার প্রশিক্ষণ', 'হস্তশিল্প', 'কৃষি ও মৎস্য', 'সেলাই'],
        stats: [{ v: '50+', l: 'Courses' }]
    },
    '#courses': {
        icon: '📚', category: 'Education & Growth', title: 'Courses', bnTitle: 'কোর্স',
        descBn: 'অনলাইন ও অফলাইন কোর্স — স্কিল, ল্যাঙ্গুয়েজ, টেক, ব্যবসা।',
        descEn: 'Online and offline courses — skill, language, tech, business.',
        points: ['অনলাইন কোর্স', 'ল্যাঙ্গুয়েজ', 'টেক কোর্স', 'বিজনেস'],
        stats: [{ v: '120+', l: 'Courses' }]
    },
    '#internships': {
        icon: '🎯', category: 'Education & Growth', title: 'Internships', bnTitle: 'ইন্টার্নশিপ',
        descBn: 'শিক্ষার্থীদের জন্য ইন্টার্নশিপের সুযোগ।',
        descEn: 'Internship opportunities for students.',
        points: ['পেইড ইন্টার্নশিপ', 'রিমোট', 'সার্টিফিকেট', 'রেকমেন্ডেশন'],
        stats: [{ v: '40+', l: 'Open' }]
    },
    '#marketplace': {
        icon: '🛒', category: 'Marketplace', title: 'Marketplace', bnTitle: 'মার্কেটপ্লেস',
        descBn: 'স্থানীয় পণ্য কিনুন ও বিক্রি করুন।',
        descEn: 'Buy and sell local products directly.',
        points: ['পণ্য কিনুন', 'বিক্রি করুন', 'সরাসরি যোগাযোগ', 'কোনো কমিশন নেই'],
        stats: [{ v: '500+', l: 'Products' }, { v: '0%', l: 'Commission' }]
    },
    '#local-products': {
        icon: '🛍️', category: 'Marketplace', title: 'Local Products', bnTitle: 'স্থানীয় পণ্য',
        descBn: 'মহেশখালীর ঐতিহ্যবাহী পণ্য — লবণ, মাছ, শুঁটকি, নারিকেল, সুপারি।',
        descEn: 'Traditional products — salt, fish, dried fish, coconut, betel nut.',
        points: ['লবণ ও মাছ', 'শুঁটকি', 'নারিকেল', 'হস্তশিল্প'],
        stats: [{ v: '100+', l: 'Products' }]
    },
    '#services': {
        icon: '🛠️', category: 'Marketplace', title: 'Services', bnTitle: 'সেবা',
        descBn: 'স্থানীয় সেবা — ইলেকট্রিশিয়ান, প্লাম্বার, ড্রাইভার, টিউটর।',
        descEn: 'Local services — electrician, plumber, driver, tutor.',
        points: ['ইলেকট্রিশিয়ান', 'প্লাম্বার', 'টিউটর', 'ফটোগ্রাফার'],
        stats: [{ v: '200+', l: 'Providers' }]
    },
    '#buy-sell': {
        icon: '💰', category: 'Marketplace', title: 'Buy & Sell', bnTitle: 'ক্রয়-বিক্রয়',
        descBn: 'নতুন ও পুরাতন জিনিস কেনাবেচা করুন।',
        descEn: 'Buy and sell new and used items.',
        points: ['স্মার্টফোন', 'বাইক', 'ফার্নিচার', 'ইলেকট্রনিক্স'],
        stats: [{ v: '300+', l: 'Listings' }]
    },
    '#opportunities': {
        icon: '✨', category: 'Opportunities', title: 'All Opportunities', bnTitle: 'সকল সুযোগ',
        descBn: 'মহেশখালীর সব সুযোগ এক জায়গায়।',
        descEn: 'All kinds of opportunities in one place.',
        points: ['চাকরি', 'বৃত্তি', 'ফান্ডিং', 'প্রতিযোগিতা'],
        stats: [{ v: '1000+', l: 'Opportunities' }]
    },
    '#funding': {
        icon: '💰', category: 'Opportunities', title: 'Funding', bnTitle: 'ফান্ডিং',
        descBn: 'স্টার্টআপ ও ব্যবসার জন্য ফান্ডিং ও ইনভেস্টর।',
        descEn: 'Funding and investor info for startups and businesses.',
        points: ['স্টার্টআপ ফান্ডিং', 'ব্যাংক লোন', 'গ্রামীণ ফান্ড', 'ইনভেস্টর'],
        stats: [{ v: '30+', l: 'Sources' }]
    },
    '#competitions': {
        icon: '🏆', category: 'Opportunities', title: 'Competitions', bnTitle: 'প্রতিযোগিতা',
        descBn: 'কুইজ, রচনা, প্রোগ্রামিং সহ সব প্রতিযোগিতা।',
        descEn: 'Quiz, essay, programming and all competitions.',
        points: ['কুইজ', 'রচনা', 'প্রোগ্রামিং', 'উদ্যোক্তা'],
        stats: [{ v: '20+', l: 'Active' }]
    },
    '#grants': {
        icon: '🎁', category: 'Opportunities', title: 'Grants', bnTitle: 'অনুদান',
        descBn: 'এনজিও, সরকারি ও আন্তর্জাতিক অনুদান।',
        descEn: 'NGO, government and international grants.',
        points: ['এনজিও', 'সরকারি', 'আন্তর্জাতিক'],
        stats: [{ v: '15+', l: 'Active' }]
    }
};

/* ---------- উপাদান ---------- */
const overlay    = document.getElementById('megaDetailsOverlay');
const closeBtn   = document.getElementById('megaDetailsClose');
const cancelBtn  = document.getElementById('megaDetailsCancel');
const iconEl     = document.getElementById('megaDetailsIcon');
const categoryEl = document.getElementById('megaDetailsCategory');
const titleEl    = document.getElementById('megaDetailsTitle');
const bodyEl     = document.getElementById('megaDetailsBody');
const ctaEl      = document.getElementById('megaDetailsCTA');

/* ---------- মডাল খোলা ---------- */
function openMegaDetails(href) {
    const data = MEGA_DATA[href];
    if (!data || !overlay) return;

    const isEn = document.documentElement.lang === 'en';

    iconEl.textContent = data.icon || '📌';
    categoryEl.textContent = data.category || '';
    titleEl.textContent = isEn ? (data.title || '') : (data.bnTitle || data.title || '');

    const desc = isEn ? data.descEn : data.descBn;
    const pointsTitle = isEn ? '✨ Highlights' : '✨ বিশেষত্ব';
    const statsTitle  = isEn ? '📊 Quick Stats' : '📊 এক নজরে';

    let html = `<p>${desc || ''}</p>`;

    if (data.points && data.points.length) {
        html += `<h4>${pointsTitle}</h4><ul>`;
        data.points.forEach(p => html += `<li>${p}</li>`);
        html += `</ul>`;
    }

    if (data.stats && data.stats.length) {
        html += `<h4>${statsTitle}</h4><div class="mega-stats">`;
        data.stats.forEach(s => {
            html += `<div class="mega-stat">
                        <span class="mega-stat-value">${s.v}</span>
                        <span class="mega-stat-label">${s.l}</span>
                     </div>`;
        });
        html += `</div>`;
    }

    bodyEl.innerHTML = html;
    ctaEl.setAttribute('href', href);

    overlay.classList.add('active');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

/* ---------- মডাল বন্ধ ---------- */
function closeMegaDetails() {
    if (!overlay) return;
    overlay.classList.remove('active');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

/* ---------- সব মেগা মেনু লিংকে ক্লিক ---------- */
document.querySelectorAll('.mega-menu a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        const href = link.getAttribute('href');
        if (MEGA_DATA[href]) {
            e.preventDefault();
            openMegaDetails(href);
        }
    });
});

/* ---------- ক্লোজ ইভেন্ট ---------- */
closeBtn?.addEventListener('click', closeMegaDetails);
cancelBtn?.addEventListener('click', closeMegaDetails);

overlay?.addEventListener('click', (e) => {
    if (e.target === overlay) closeMegaDetails();
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay?.classList.contains('active')) {
        closeMegaDetails();
    }
});/* =========================================================
   🎯 COMMUNITY MEGA MENU — DATA + FUNCTIONS
   (আলাদা variable name — conflict এড়াতে)
========================================================= */

/* ---------- COMMUNITY ডাটা ---------- */
const COMMUNITY_DATA = {
    '#community': {
        icon: '👥', category: 'Community', title: 'Our Community', bnTitle: 'আমাদের কমিউনিটি',
        descBn: 'মহেশখালীর মানুষের একটি ডিজিটাল কমিউনিটি প্ল্যাটফর্ম। সংযুক্ত হোন, আলোচনা করুন, একসাথে কাজ করুন।',
        descEn: 'A digital community platform for the people of Maheshkhali.',
        points: ['সদস্য যোগদান', 'আলোচনা ফোরাম', 'কমিউনিটি নোটিশ', 'সহায়তা নেটওয়ার্ক'],
        stats: [{ v: '10K+', l: 'Members' }, { v: '24/7', l: 'Active' }]
    },
    '#members': {
        icon: '👨‍👩‍👧‍👦', category: 'Community', title: 'Members', bnTitle: 'সদস্যবৃন্দ',
        descBn: 'আমাদের কমিউনিটির গর্বিত সদস্যবৃন্দ।',
        descEn: 'Proud members of our community.',
        points: ['স্থানীয় মানুষ', 'শিক্ষার্থী', 'উদ্যোক্তা', 'পেশাজীবী'],
        stats: [{ v: '10K+', l: 'Total' }, { v: '500+', l: 'Active' }]
    },
    '#volunteer': {
        icon: '🤝', category: 'Community', title: 'Volunteer', bnTitle: 'স্বেচ্ছাসেবক',
        descBn: 'স্বেচ্ছাসেবক হয়ে সমাজের উন্নয়নে অংশ নিন।',
        descEn: 'Become a volunteer and contribute to society.',
        points: ['দুর্যোগ সেবা', 'শিক্ষা সহায়তা', 'স্বাস্থ্য ক্যাম্প', 'পরিবেশ সুরক্ষা'],
        stats: [{ v: '200+', l: 'Volunteers' }]
    },
    '#stories': {
        icon: '📖', category: 'Community', title: 'Community Stories', bnTitle: 'কমিউনিটি গল্প',
        descBn: 'মহেশখালীর মানুষের সফলতার গল্প ও অনুপ্রেরণা।',
        descEn: 'Success stories and inspirations.',
        points: ['সফলতার গল্প', 'অনুপ্রেরণা', 'অর্জন', 'স্মৃতি'],
        stats: [{ v: '150+', l: 'Stories' }]
    },
    '#activities': {
        icon: '🎯', category: 'Community', title: 'Activities', bnTitle: 'কার্যক্রম',
        descBn: 'কমিউনিটির চলমান ও পূর্ববর্তী কার্যক্রম।',
        descEn: 'Ongoing and past activities.',
        points: ['সামাজিক উদ্যোগ', 'প্রকল্প', 'ক্যাম্পেইন', 'মিটিং'],
        stats: [{ v: '80+', l: 'Activities' }]
    },
    '#local-services': {
        icon: '🛠️', category: 'Organizations', title: 'Local Services', bnTitle: 'স্থানীয় সেবা',
        descBn: 'স্থানীয় সেবা প্রদানকারী ব্যক্তি ও প্রতিষ্ঠান।',
        descEn: 'Local service providers.',
        points: ['ইলেকট্রিশিয়ান', 'প্লাম্বার', 'মিস্ত্রি', 'ড্রাইভার'],
        stats: [{ v: '300+', l: 'Providers' }]
    },
    '#organizations': {
        icon: '🏢', category: 'Organizations', title: 'Organizations', bnTitle: 'সংগঠন',
        descBn: 'মহেশখালীর সামাজিক, সাংস্কৃতিক ও পেশাজীবী সংগঠন।',
        descEn: 'Social, cultural and professional organizations.',
        points: ['সামাজিক সংগঠন', 'সাংস্কৃতিক', 'পেশাজীবী', 'যুব সংগঠন'],
        stats: [{ v: '50+', l: 'Organizations' }]
    },
    '#ngos': {
        icon: '🤝', category: 'Organizations', title: 'NGOs', bnTitle: 'এনজিও',
        descBn: 'মহেশখালীতে কাজ করা জাতীয় ও আন্তর্জাতিক এনজিও।',
        descEn: 'National and international NGOs.',
        points: ['জাতীয় এনজিও', 'আন্তর্জাতিক', 'উন্নয়ন প্রকল্প', 'সহায়তা'],
        stats: [{ v: '20+', l: 'NGOs' }]
    },
    '#clubs': {
        icon: '🎯', category: 'Organizations', title: 'Clubs', bnTitle: 'ক্লাব',
        descBn: 'খেলাধুলা, সাহিত্য ও সাংস্কৃতিক ক্লাবের তথ্য।',
        descEn: 'Sports, literature and cultural clubs.',
        points: ['স্পোর্টস ক্লাব', 'সাহিত্য ক্লাব', 'সাংস্কৃতিক', 'তরুণ ক্লাব'],
        stats: [{ v: '30+', l: 'Clubs' }]
    },
    '#health': {
        icon: '🏥', category: 'Services', title: 'Health', bnTitle: 'স্বাস্থ্য',
        descBn: 'মহেশখালীর হাসপাতাল, ক্লিনিক, ডাক্তার ও স্বাস্থ্য সেবা।',
        descEn: 'Hospitals, clinics and doctors.',
        points: ['হাসপাতাল', 'ক্লিনিক', 'ডাক্তার তালিকা', 'এম্বুলেন্স'],
        stats: [{ v: '15+', l: 'Health Centers' }, { v: '50+', l: 'Doctors' }]
    },
    '#education': {
        icon: '🎓', category: 'Services', title: 'Education', bnTitle: 'শিক্ষা',
        descBn: 'স্কুল, কলেজ, মাদ্রাসা ও সব শিক্ষা প্রতিষ্ঠান।',
        descEn: 'Schools, colleges, madrasas.',
        points: ['স্কুল', 'কলেজ', 'মাদ্রাসা', 'কোচিং সেন্টার'],
        stats: [{ v: '100+', l: 'Institutes' }]
    },
    '#training': {
        icon: '🛠️', category: 'Services', title: 'Training', bnTitle: 'প্রশিক্ষণ',
        descBn: 'কম্পিউটার, হস্তশিল্প, সেলাই ও কৃষি প্রশিক্ষণ।',
        descEn: 'Computer, handicraft, sewing and agriculture training.',
        points: ['কম্পিউটার', 'হস্তশিল্প', 'সেলাই', 'কৃষি'],
        stats: [{ v: '50+', l: 'Courses' }]
    },
    '#support': {
        icon: '🤝', category: 'Services', title: 'Support', bnTitle: 'সহায়তা',
        descBn: 'আর্থিক, চিকিৎসা, শিক্ষা ও সামাজিক সহায়তা।',
        descEn: 'Financial, medical, education and social support.',
        points: ['আর্থিক সহায়তা', 'চিকিৎসা সহায়তা', 'শিক্ষা সহায়তা', 'বিধবা ভাতা'],
        stats: [{ v: '500+', l: 'Beneficiaries' }]
    },
    '#events': {
        icon: '📅', category: 'Events', title: 'Events Calendar', bnTitle: 'ইভেন্ট ক্যালেন্ডার',
        descBn: 'মহেশখালীর আসন্ন ও চলমান সব ইভেন্ট ও উৎসব।',
        descEn: 'Calendar of events and festivals.',
        points: ['উৎসব', 'মেলা', 'সাংস্কৃতিক অনুষ্ঠান', 'স্পোর্টস'],
        stats: [{ v: '25+', l: 'Upcoming' }]
    },
    '#meetings': {
        icon: '👥', category: 'Events', title: 'Meetings', bnTitle: 'মিটিং',
        descBn: 'কমিউনিটি মিটিং ও ইউনিয়ন পরিষদের সভা।',
        descEn: 'Community meetings and union parishad sessions.',
        points: ['কমিউনিটি মিটিং', 'ইউনিয়ন সভা', 'পরিকল্পনা সভা', 'আলোচনা'],
        stats: [{ v: '40+', l: 'Meetings' }]
    },
    '#emergency': {
        icon: '🚨', category: 'Events', title: 'Emergency', bnTitle: 'জরুরি সেবা',
        descBn: 'দুর্যোগ, দুর্ঘটনা ও জরুরি পরিস্থিতিতে দ্রুত সহায়তা।',
        descEn: 'Quick help during emergency situations.',
        points: ['৯৯৯ হেল্পলাইন', 'এম্বুলেন্স', 'ফায়ার সার্ভিস', 'দুর্যোগ সহায়তা'],
        stats: [{ v: '24/7', l: 'Available' }]
    }
};


/* ---------- COMMUNITY Modal — আলাদা নাম (conflict এড়াতে) ---------- */
(function initCommunityModal() {
    const cOverlay    = document.getElementById('megaDetailsOverlay');
    const cCloseBtn   = document.getElementById('megaDetailsClose');
    const cCancelBtn  = document.getElementById('megaDetailsCancel');
    const cIconEl     = document.getElementById('megaDetailsIcon');
    const cCategoryEl = document.getElementById('megaDetailsCategory');
    const cTitleEl    = document.getElementById('megaDetailsTitle');
    const cBodyEl     = document.getElementById('megaDetailsBody');
    const cCtaEl      = document.getElementById('megaDetailsCTA');

    if (!cOverlay) return;

    function openCommunityModal(href) {
        const data = COMMUNITY_DATA[href];
        if (!data) return;

        const isEn = document.documentElement.lang === 'en';

        cIconEl.textContent = data.icon || '📌';
        cCategoryEl.textContent = data.category || '';
        cTitleEl.textContent = isEn ? (data.title || '') : (data.bnTitle || data.title || '');

        const desc = isEn ? data.descEn : data.descBn;
        const pointsTitle = isEn ? '✨ Highlights' : '✨ বিশেষত্ব';
        const statsTitle  = isEn ? '📊 Quick Stats' : '📊 এক নজরে';

        let html = `<p>${desc || ''}</p>`;

        if (data.points && data.points.length) {
            html += `<h4>${pointsTitle}</h4><ul>`;
            data.points.forEach(p => html += `<li>${p}</li>`);
            html += `</ul>`;
        }

        if (data.stats && data.stats.length) {
            html += `<h4>${statsTitle}</h4><div class="mega-stats">`;
            data.stats.forEach(s => {
                html += `<div class="mega-stat">
                            <span class="mega-stat-value">${s.v}</span>
                            <span class="mega-stat-label">${s.l}</span>
                         </div>`;
            });
            html += `</div>`;
        }

        cBodyEl.innerHTML = html;
        cCtaEl.setAttribute('href', href);

        cOverlay.classList.add('active');
        cOverlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeCommunityModal() {
        cOverlay.classList.remove('active');
        cOverlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    // COMMUNITY menu লিংকে ক্লিক
    document.querySelectorAll('.mega-menu a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (COMMUNITY_DATA[href]) {
                e.preventDefault();
                openCommunityModal(href);
            }
        });
    });

    // Close
    cCloseBtn?.addEventListener('click', closeCommunityModal);
    cCancelBtn?.addEventListener('click', closeCommunityModal);

    cOverlay.addEventListener('click', (e) => {
        if (e.target === cOverlay) closeCommunityModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && cOverlay.classList.contains('active')) {
            closeCommunityModal();
        }
    });
})();/* =========================================================
   🎯 EXPLORE MEGA MENU — DATA + FUNCTIONS
========================================================= */

/* ---------- EXPLORE ডাটা ---------- */
const EXPLORE_DATA = {

    /* ═══ পরিচিতি (About) ═══ */
    '#about': {
        icon: '🌴', category: 'About', title: 'About Maheshkhali', bnTitle: 'মহেশখালী সম্পর্কে',
        descBn: 'মহেশখালী বাংলাদেশের কক্সবাজার জেলার একটি দ্বীপ উপজেলা। বঙ্গোপসাগরের বুকে অবস্থিত এই দ্বীপ প্রাকৃতিক সৌন্দর্য, ঐতিহ্য ও সম্ভাবনায় ভরপুর।',
        descEn: 'Maheshkhali is an island upazila in Cox\'s Bazar district of Bangladesh. Located in the Bay of Bengal, this island is full of natural beauty, heritage and potential.',
        points: ['মোট আয়তন: ৩৬২.১৮ বর্গ কিমি', '৮টি ইউনিয়ন', 'জনসংখ্যা: প্রায় ৩ লক্ষ', 'কক্সবাজার থেকে ১২ কিমি দূরে'],
        stats: [{ v: '362 km²', l: 'Area' }, { v: '8', l: 'Unions' }, { v: '3L+', l: 'People' }]
    },
    '#unions': {
        icon: '🏘️', category: 'About', title: '8 Unions', bnTitle: '৮টি ইউনিয়ন',
        descBn: 'মহেশখালী উপজেলায় মোট ৮টি ইউনিয়ন পরিষদ আছে। প্রতিটি ইউনিয়নের নিজস্ব চেয়ারম্যান, সদস্য ও কর্মকর্তা রয়েছেন।',
        descEn: 'Maheshkhali upazila has 8 union parishads. Each union has its own chairman, members and officials.',
        points: ['১. মাতারবাড়ি', '২. ধলঘাটা', '৩. কালারমারছড়া', '৪. শাপলাপুর', '৫. হোয়ানক', '৬. বড় মহেশখালী', '৭. কুতুবজোম', '৮. ছোট মহেশখালী'],
        stats: [{ v: '8', l: 'Unions' }, { v: '~40', l: 'Wards' }]
    },
    '#villages': {
        icon: '🏡', category: 'About', title: 'Villages', bnTitle: 'গ্রাম',
        descBn: 'মহেশখালীর শতাধিক গ্রাম ছড়িয়ে আছে ৮টি ইউনিয়নের মধ্যে। প্রতিটা গ্রামের নিজস্ব ইতিহাস ও ঐতিহ্য রয়েছে।',
        descEn: 'Hundreds of villages are spread across 8 unions of Maheshkhali. Each village has its own history and tradition.',
        points: ['প্রাকৃতিক সৌন্দর্য', 'কৃষি ও মৎস্য', 'লবণ চাষ', 'শুঁটকি শিল্প'],
        stats: [{ v: '200+', l: 'Villages' }]
    },
    '#wards': {
        icon: '🔢', category: 'About', title: 'Wards', bnTitle: 'ওয়ার্ড',
        descBn: 'প্রতিটি ইউনিয়ন কয়েকটি ওয়ার্ডে বিভক্ত। প্রতিটা ওয়ার্ডে একজন করে সদস্য নির্বাচিত হন।',
        descEn: 'Each union is divided into several wards. Each ward elects one member.',
        points: ['প্রতি ইউনিয়নে ৯টি ওয়ার্ড', 'মোট ~৭২টি ওয়ার্ড', 'স্থানীয় প্রতিনিধি', 'গ্রাম আদালত'],
        stats: [{ v: '~72', l: 'Wards' }]
    },
    '#history': {
        icon: '📜', category: 'About', title: 'History & Heritage', bnTitle: 'ইতিহাস ও ঐতিহ্য',
        descBn: 'মহেশখালীর ইতিহাস হাজার বছরের পুরনো। আরাকান রাজত্ব, মোগল আমল এবং ব্রিটিশ শাসনের সাক্ষী এই দ্বীপ।',
        descEn: 'The history of Maheshkhali is thousands of years old. This island witnessed Arakan rule, Mughal era and British rule.',
        points: ['আদিনাথ মন্দির (১০০০+ বছর)', 'আরাকান রাজত্ব', 'মোগল আমল', 'ব্রিটিশ শাসন', 'লবণ চাষের ইতিহাস'],
        stats: [{ v: '1000+', l: 'Years Old' }]
    },

    /* ═══ পর্যটন (Tourism) ═══ */
    '#tourism': {
        icon: '🌊', category: 'Tourism', title: 'Tourism', bnTitle: 'পর্যটন',
        descBn: 'মহেশখালী পর্যটকদের জন্য এক স্বর্গ। সমুদ্র সৈকত, পাহাড়, দ্বীপ, মন্দির — সব মিলিয়ে এক অনন্য অভিজ্ঞতা।',
        descEn: 'Maheshkhali is a paradise for tourists. Sea beaches, hills, islands and temples offer a unique experience.',
        points: ['সমুদ্র সৈকত', 'পাহাড় ও টিলা', 'দ্বীপ ভ্রমণ', 'ঐতিহাসিক স্থান'],
        stats: [{ v: '50+', l: 'Places' }]
    },
    '#places': {
        icon: '📍', category: 'Tourism', title: 'Places & Attractions', bnTitle: 'দর্শনীয় স্থান',
        descBn: 'মহেশখালীর অন্যতম দর্শনীয় স্থানগুলো — আদিনাথ মন্দির, বাঁকখালী নদী, মহেশখালী চ্যানেল সহ আরো অনেক।',
        descEn: 'Top attractions of Maheshkhali — Adinath Temple, Bankkhali River, Maheshkhali Channel and many more.',
        points: ['আদিনাথ মন্দির', 'বাঁকখালী নদী', 'মহেশখালী চ্যানেল', 'সোনাদিয়া দ্বীপ', 'মাতারবাড়ি'],
        stats: [{ v: '20+', l: 'Attractions' }]
    },
    '#beaches': {
        icon: '🏖️', category: 'Tourism', title: 'Beaches', bnTitle: 'সৈকত',
        descBn: 'মহেশখালীর নির্জন ও সুন্দর সমুদ্র সৈকতগুলো — শান্ত, পরিষ্কার এবং প্রাকৃতিক সৌন্দর্যে ভরপুর।',
        descEn: 'The quiet and beautiful beaches of Maheshkhali — calm, clean and full of natural beauty.',
        points: ['শান্ত পরিবেশ', 'পরিষ্কার পানি', 'সূর্যোদয়-সূর্যাস্ত', 'ক্যাম্পিং'],
        stats: [{ v: '10+', l: 'Beaches' }]
    },
    '#hills': {
        icon: '⛰️', category: 'Tourism', title: 'Hills', bnTitle: 'পাহাড়',
        descBn: 'মহেশখালীর ছোট ছোট পাহাড় ও টিলা — সবুজে ঢাকা, প্রকৃতির সৌন্দর্যে ভরপুর।',
        descEn: 'Small hills and mounds of Maheshkhali — covered in greenery, full of natural beauty.',
        points: ['ট্রেকিং', 'প্যানোরামিক ভিউ', 'সূর্যোদয়', 'প্রকৃতি'],
        stats: [{ v: '15+', l: 'Hills' }]
    },
    '#islands': {
        icon: '🏝️', category: 'Tourism', title: 'Islands', bnTitle: 'দ্বীপ',
        descBn: 'মহেশখালীর আশেপাশে ছোট বড় অনেক দ্বীপ — সোনাদিয়া, কুতুবদিয়া, সেন্ট মার্টিন সহ।',
        descEn: 'Many small and big islands around Maheshkhali — Sonadia, Kutubdia, Saint Martin and more.',
        points: ['সোনাদিয়া দ্বীপ', 'সেন্ট মার্টিন', 'কুতুবদিয়া', 'ছেঁড়া দ্বীপ'],
        stats: [{ v: '8+', l: 'Islands' }]
    },

    /* ═══ সংস্কৃতি (Culture) ═══ */
    '#culture': {
        icon: '🎭', category: 'Culture', title: 'Culture & Tradition', bnTitle: 'সংস্কৃতি ও ঐতিহ্য',
        descBn: 'মহেশখালীর সংস্কৃতি হিন্দু-মুসলিম-বৌদ্ধ সম্প্রদায়ের সহাবস্থানের এক অনন্য উদাহরণ।',
        descEn: 'The culture of Maheshkhali is a unique example of Hindu-Muslim-Buddhist coexistence.',
        points: ['হিন্দু-মুসলিম সম্প্রীতি', 'আদিনাথ মন্দির', 'বৌদ্ধ বিহার', 'মসজিদ', 'লোকসংস্কৃতি'],
        stats: [{ v: '1000+', l: 'Years' }]
    },
    '#dialect': {
        icon: '🗣️', category: 'Culture', title: 'Local Dialect', bnTitle: 'আঞ্চলিক ভাষা',
        descBn: 'মহেশখালীর আঞ্চলিক ভাষা চট্টগ্রামের আঞ্চলিক ভাষার সাথে মিলে। নিজস্ব শব্দভাণ্ডার ও টোন আছে।',
        descEn: 'The local dialect of Maheshkhali resembles the Chittagong dialect. It has its own vocabulary and tone.',
        points: ['চট্টগ্রামের টোন', 'আরাকানি প্রভাব', 'নিজস্ব শব্দ', 'লোকগীতি'],
        stats: [{ v: '500+', l: 'Local Words' }]
    },
    '#food': {
        icon: '🍽️', category: 'Culture', title: 'Local Food', bnTitle: 'স্থানীয় খাবার',
        descBn: 'মহেশখালীর স্থানীয় খাবার — মাছ, শুঁটকি, নারিকেল, লবণ, মিষ্টি ইত্যাদি।',
        descEn: 'Local food of Maheshkhali — fish, dried fish, coconut, salt, sweets etc.',
        points: ['শুঁটকি ভুনা', 'মাছের ঝোল', 'নারিকেলের পিঠা', 'চিংড়ি', 'লবণ'],
        stats: [{ v: '30+', l: 'Dishes' }]
    },
    '#festivals': {
        icon: '🎉', category: 'Culture', title: 'Festivals', bnTitle: 'উৎসব',
        descBn: 'মহেশখালীর উৎসব — ঈদ, পূজা, বৈশাখী মেলা, আদিনাথ মেলা সহ অনেক।',
        descEn: 'Festivals of Maheshkhali — Eid, Puja, Boishakhi Mela, Adinath Mela and many more.',
        points: ['ঈদ-উল-ফিতর', 'ঈদ-উল-আজহা', 'দুর্গা পূজা', 'বৈশাখী মেলা', 'আদিনাথ মেলা'],
        stats: [{ v: '20+', l: 'Festivals' }]
    },

    /* ═══ মিডিয়া (Media) ═══ */
    '#gallery': {
        icon: '📸', category: 'Media', title: 'Photo Gallery', bnTitle: 'ফটো গ্যালারি',
        descBn: 'মহেশখালীর সুন্দর সুন্দর ছবির গ্যালারি — প্রকৃতি, মানুষ, ঐতিহ্য সব।',
        descEn: 'Beautiful photo gallery of Maheshkhali — nature, people and heritage.',
        points: ['প্রাকৃতিক ছবি', 'মানুষের ছবি', 'ঐতিহ্যের ছবি', 'ইভেন্টের ছবি'],
        stats: [{ v: '500+', l: 'Photos' }]
    },
    '#video': {
        icon: '🎥', category: 'Media', title: 'Video Gallery', bnTitle: 'ভিডিও গ্যালারি',
        descBn: 'মহেশখালীর ভিডিও গ্যালারি — ড্রোন শট, ডকুমেন্টারি, ইভেন্ট কভারেজ।',
        descEn: 'Video gallery of Maheshkhali — drone shots, documentaries and event coverage.',
        points: ['ড্রোন শট', 'ডকুমেন্টারি', 'ইভেন্ট কভারেজ', 'ট্রাভেল ভ্লগ'],
        stats: [{ v: '100+', l: 'Videos' }]
    },
    '#map': {
        icon: '🗺️', category: 'Media', title: 'Interactive Map', bnTitle: 'ইন্টারঅ্যাকটিভ ম্যাপ',
        descBn: 'মহেশখালীর ইন্টারঅ্যাকটিভ ম্যাপ — সব স্থান, রাস্তা ও দর্শনীয় স্থান দেখুন।',
        descEn: 'Interactive map of Maheshkhali — see all places, roads and attractions.',
        points: ['সব স্থান', 'রাস্তা', 'দর্শনীয় স্থান', 'হোটেল'],
        stats: [{ v: 'Live', l: 'Map' }]
    },
    '#virtual': {
        icon: '🌐', category: 'Media', title: 'Virtual Tour', bnTitle: 'ভার্চুয়াল ট্যুর',
        descBn: 'ঘরে বসেই মহেশখালী ভ্রমণ করুন — 360° ভিডিও, ভার্চুয়াল রিয়েলিটি ট্যুর।',
        descEn: 'Explore Maheshkhali from home — 360° videos and virtual reality tours.',
        points: ['360° ভিডিও', 'VR ট্যুর', 'ইন্টারঅ্যাকটিভ', 'গাইডেড ট্যুর'],
        stats: [{ v: '10+', l: 'Tours' }]
    }
};


/* ---------- EXPLORE Modal — আলাদা নাম (conflict এড়াতে) ---------- */
(function initExploreModal() {
    const eOverlay    = document.getElementById('megaDetailsOverlay');
    const eCloseBtn   = document.getElementById('megaDetailsClose');
    const eCancelBtn  = document.getElementById('megaDetailsCancel');
    const eIconEl     = document.getElementById('megaDetailsIcon');
    const eCategoryEl = document.getElementById('megaDetailsCategory');
    const eTitleEl    = document.getElementById('megaDetailsTitle');
    const eBodyEl     = document.getElementById('megaDetailsBody');
    const eCtaEl      = document.getElementById('megaDetailsCTA');

    if (!eOverlay) return;

    function openExploreModal(href) {
        const data = EXPLORE_DATA[href];
        if (!data) return;

        const isEn = document.documentElement.lang === 'en';

        eIconEl.textContent = data.icon || '📌';
        eCategoryEl.textContent = data.category || '';
        eTitleEl.textContent = isEn ? (data.title || '') : (data.bnTitle || data.title || '');

        const desc = isEn ? data.descEn : data.descBn;
        const pointsTitle = isEn ? '✨ Highlights' : '✨ বিশেষত্ব';
        const statsTitle  = isEn ? '📊 Quick Stats' : '📊 এক নজরে';

        let html = `<p>${desc || ''}</p>`;

        if (data.points && data.points.length) {
            html += `<h4>${pointsTitle}</h4><ul>`;
            data.points.forEach(p => html += `<li>${p}</li>`);
            html += `</ul>`;
        }

        if (data.stats && data.stats.length) {
            html += `<h4>${statsTitle}</h4><div class="mega-stats">`;
            data.stats.forEach(s => {
                html += `<div class="mega-stat">
                            <span class="mega-stat-value">${s.v}</span>
                            <span class="mega-stat-label">${s.l}</span>
                         </div>`;
            });
            html += `</div>`;
        }

        eBodyEl.innerHTML = html;
        eCtaEl.setAttribute('href', href);

        eOverlay.classList.add('active');
        eOverlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeExploreModal() {
        eOverlay.classList.remove('active');
        eOverlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    document.querySelectorAll('.mega-menu a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (EXPLORE_DATA[href]) {
                e.preventDefault();
                openExploreModal(href);
            }
        });
    });

    eCloseBtn?.addEventListener('click', closeExploreModal);
    eCancelBtn?.addEventListener('click', closeExploreModal);

    eOverlay.addEventListener('click', (e) => {
        if (e.target === eOverlay) closeExploreModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && eOverlay.classList.contains('active')) {
            closeExploreModal();
        }
    });
})();/* =========================================================
   🎯 ABOUT MEGA MENU — DATA + FUNCTIONS
========================================================= */

const ABOUT_DATA = {

    /* ═══ আমাদের মহেশখালী (Our Maheshkhali) ═══ */
    '#about': {
        icon: '🌴', category: 'Our Maheshkhali', title: 'About Maheshkhali', bnTitle: 'মহেশখালী সম্পর্কে',
        descBn: 'মহেশখালী বাংলাদেশের কক্সবাজার জেলার একটি দ্বীপ উপজেলা। বঙ্গোপসাগরের বুকে অবস্থিত এই দ্বীপ প্রাকৃতিক সৌন্দর্য, ঐতিহ্য ও সম্ভাবনায় ভরপুর।',
        descEn: 'Maheshkhali is an island upazila in Cox\'s Bazar district of Bangladesh. Located in the Bay of Bengal, this island is full of natural beauty, heritage and potential.',
        points: ['মোট আয়তন: ৩৬২.১৮ বর্গ কিমি', '৮টি ইউনিয়ন', 'জনসংখ্যা: প্রায় ৩ লক্ষ', 'কক্সবাজার থেকে ১২ কিমি দূরে'],
        stats: [{ v: '362 km²', l: 'Area' }, { v: '8', l: 'Unions' }, { v: '3L+', l: 'People' }]
    },
    '#our-maheshkhali': {
        icon: '🏝️', category: 'Our Maheshkhali', title: 'Our Island', bnTitle: 'আমাদের দ্বীপ',
        descBn: 'আমাদের দ্বীপ মহেশখালী — প্রাকৃতিক সৌন্দর্যে ভরপুর, যেখানে পাহাড়, সমুদ্র, নদী ও সবুজ প্রকৃতি একসাথে মিলেছে।',
        descEn: 'Our island Maheshkhali — full of natural beauty, where hills, sea, rivers and green nature meet together.',
        points: ['প্রাকৃতিক সৌন্দর্য', 'পাহাড় ও সমুদ্র', 'শান্ত পরিবেশ', 'সবুজ প্রকৃতি'],
        stats: [{ v: '100%', l: 'Natural' }]
    },
    '#vision': {
        icon: '🎯', category: 'Our Maheshkhali', title: 'Vision & Mission', bnTitle: 'লক্ষ্য ও উদ্দেশ্য',
        descBn: 'আমাদের লক্ষ্য — মহেশখালীকে একটি ডিজিটাল প্ল্যাটফর্মের মাধ্যমে সবার কাছে পৌঁছে দেওয়া এবং স্থানীয় উন্নয়নে সহায়তা করা।',
        descEn: 'Our vision — to bring Maheshkhali to everyone through a digital platform and help in local development.',
        points: ['ডিজিটাল প্ল্যাটফর্ম', 'স্থানীয় উন্নয়ন', 'কমিউনিটি সংযোগ', 'তথ্য সেবা'],
        stats: [{ v: '2026', l: 'Founded' }]
    },
    '#history': {
        icon: '📜', category: 'Our Maheshkhali', title: 'History', bnTitle: 'ইতিহাস',
        descBn: 'মহেশখালীর ইতিহাস হাজার বছরের পুরনো। আরাকান রাজত্ব, মোগল আমল এবং ব্রিটিশ শাসনের সাক্ষী এই দ্বীপ।',
        descEn: 'The history of Maheshkhali is thousands of years old. This island witnessed Arakan rule, Mughal era and British rule.',
        points: ['আদিনাথ মন্দির (১০০০+ বছর)', 'আরাকান রাজত্ব', 'মোগল আমল', 'ব্রিটিশ শাসন'],
        stats: [{ v: '1000+', l: 'Years Old' }]
    },
    '#geography': {
        icon: '🗺️', category: 'Our Maheshkhali', title: 'Geography', bnTitle: 'ভূগোল',
        descBn: 'মহেশখালী বঙ্গোপসাগরের একটি দ্বীপ। চারদিকে নদী ও সাগর, ভিতরে পাহাড় ও টিলা।',
        descEn: 'Maheshkhali is an island in the Bay of Bengal. Surrounded by rivers and sea, with hills and mounds inside.',
        points: ['বঙ্গোপসাগর', 'বাঁকখালী নদী', 'পাহাড় ও টিলা', 'উপকূলীয় এলাকা'],
        stats: [{ v: '362 km²', l: 'Area' }]
    },

    /* ═══ সম্পর্কে আরও (More About) ═══ */
    '#badsha-solyman': {
        icon: '👨‍💻', category: 'More About', title: 'Badsha Solyman', bnTitle: 'বাদশা সোলাইমান',
        descBn: 'বাদশা সোলাইমান — একজন মার্চেন্ট মেরিনার, প্রতিষ্ঠাতা এবং ওয়েব ডেভেলপার। আমাদের মহেশখালী প্ল্যাটফর্মের প্রতিষ্ঠাতা।',
        descEn: 'Badsha Solyman — a Merchant Mariner, Founder and Web Developer. The founder of Our Maheshkhali platform.',
        points: ['মার্চেন্ট মেরিনার ⚓', 'প্রতিষ্ঠাতা 🚀', 'ওয়েব ডেভেলপার 💻', 'মহেশখালীর সন্তান 🌴'],
        stats: [{ v: 'Merchant', l: 'Mariner' }, { v: 'Founder', l: '& Dev' }]
    },
    '#team': {
        icon: '👥', category: 'More About', title: 'Team Our Maheshkhali', bnTitle: 'টিম আওয়ার মহেশখালী',
        descBn: 'আমাদের টিম — যারা দিন-রাত পরিশ্রম করে এই প্ল্যাটফর্মকে সবার জন্য উপযোগী করে তুলছেন।',
        descEn: 'Our team — who work day and night to make this platform useful for everyone.',
        points: ['ডেভেলপার', 'ডিজাইনার', 'কনটেন্ট রাইটার', 'কমিউনিটি মডারেটর'],
        stats: [{ v: '10+', l: 'Members' }]
    },
    '#contact': {
        icon: '📞', category: 'More About', title: 'Contact', bnTitle: 'যোগাযোগ',
        descBn: 'যেকোনো প্রশ্ন, পরামর্শ বা সহযোগিতার জন্য আমাদের সাথে যোগাযোগ করুন।',
        descEn: 'Contact us for any questions, suggestions or cooperation.',
        points: ['📞 +880 1886-033345', '💬 WhatsApp', '✉️ info@ourmaheshkhali.com', '📍 মহেশখালী, কক্সবাজার'],
        stats: [{ v: '24/7', l: 'Support' }]
    },
    '#faq': {
        icon: '❓', category: 'More About', title: 'FAQ', bnTitle: 'প্রশ্নোত্তর',
        descBn: 'সচরাচর জিজ্ঞাসিত প্রশ্ন ও উত্তর — এই প্ল্যাটফর্ম সম্পর্কে সবকিছু জানুন।',
        descEn: 'Frequently Asked Questions and answers — know everything about this platform.',
        points: ['কীভাবে যোগদান করবেন', 'সদস্য সুবিধা', 'ব্যবসা ডিরেক্টরি', 'যোগাযোগ পদ্ধতি'],
        stats: [{ v: '30+', l: 'Questions' }]
    },

    /* ═══ তথ্য (Information) ═══ */
    '#important-facts': {
        icon: '📌', category: 'Information', title: 'Important Facts', bnTitle: 'গুরুত্বপূর্ণ তথ্য',
        descBn: 'মহেশখালী সম্পর্কে গুরুত্বপূর্ণ সব তথ্য এক জায়গায়।',
        descEn: 'All important facts about Maheshkhali in one place.',
        points: ['মোট আয়তন: ৩৬২.১৮ কিমি²', '৮টি ইউনিয়ন', 'প্রায় ৩ লক্ষ মানুষ', 'কক্সবাজার জেলায় অবস্থিত'],
        stats: [{ v: '50+', l: 'Facts' }]
    },
    '#personalities': {
        icon: '🌟', category: 'Information', title: 'Famous Personalities', bnTitle: 'বিখ্যাত ব্যক্তিত্ব',
        descBn: 'মহেশখালীর গর্বিত সন্তানরা — যারা দেশ ও বিদেশে নাম কামিয়েছেন।',
        descEn: 'Proud sons of Maheshkhali — who earned name at home and abroad.',
        points: ['শিক্ষাবিদ', 'ব্যবসায়ী', 'ক্রীড়াবিদ', 'শিল্পী', 'রাজনীতিবিদ'],
        stats: [{ v: '30+', l: 'Personalities' }]
    },
    '#achievements': {
        icon: '🏆', category: 'Information', title: 'Achievements', bnTitle: 'অর্জন',
        descBn: 'আমাদের মহেশখালী প্ল্যাটফর্মের অর্জন এবং স্বীকৃতি।',
        descEn: 'Achievements and recognition of Our Maheshkhali platform.',
        points: ['১০ হাজার+ সদস্য', '৮টি ইউনিয়ন কভারেজ', 'সব ডিভাইসে কাজ করে', 'সম্পূর্ণ বিনামূল্যে'],
        stats: [{ v: '10K+', l: 'Users' }]
    },
    '#privacy': {
        icon: '🔒', category: 'Information', title: 'Privacy Policy', bnTitle: 'গোপনীয়তা নীতি',
        descBn: 'আপনার ব্যক্তিগত তথ্যের গোপনীয়তা আমাদের সর্বোচ্চ অগ্রাধিকার।',
        descEn: 'Your personal information privacy is our top priority.',
        points: ['তথ্য সুরক্ষা', 'কোনো থার্ড-পার্টি শেয়ার নেই', 'নিরাপদ ডেটা', 'আপনার অধিকার'],
        stats: [{ v: '100%', l: 'Secure' }]
    },
    '#terms': {
        icon: '📄', category: 'Information', title: 'Terms & Conditions', bnTitle: 'শর্তাবলী',
        descBn: 'আমাদের প্ল্যাটফর্ম ব্যবহারের শর্তাবলী — সহজ ভাষায় জানুন।',
        descEn: 'Terms and conditions of using our platform — know in simple language.',
        points: ['ব্যবহারের শর্ত', 'কনটেন্ট নীতি', 'দায়বদ্ধতা', 'পরিবর্তনের অধিকার'],
        stats: [{ v: '2026', l: 'Updated' }]
    }
};


/* ---------- ABOUT Modal — আলাদা নাম (conflict এড়াতে) ---------- */
(function initAboutModal() {
    const aOverlay    = document.getElementById('megaDetailsOverlay');
    const aCloseBtn   = document.getElementById('megaDetailsClose');
    const aCancelBtn  = document.getElementById('megaDetailsCancel');
    const aIconEl     = document.getElementById('megaDetailsIcon');
    const aCategoryEl = document.getElementById('megaDetailsCategory');
    const aTitleEl    = document.getElementById('megaDetailsTitle');
    const aBodyEl     = document.getElementById('megaDetailsBody');
    const aCtaEl      = document.getElementById('megaDetailsCTA');

    if (!aOverlay) return;

    function openAboutModal(href) {
        const data = ABOUT_DATA[href];
        if (!data) return;

        const isEn = document.documentElement.lang === 'en';

        aIconEl.textContent = data.icon || '📌';
        aCategoryEl.textContent = data.category || '';
        aTitleEl.textContent = isEn ? (data.title || '') : (data.bnTitle || data.title || '');

        const desc = isEn ? data.descEn : data.descBn;
        const pointsTitle = isEn ? '✨ Highlights' : '✨ বিশেষত্ব';
        const statsTitle  = isEn ? '📊 Quick Stats' : '📊 এক নজরে';

        let html = `<p>${desc || ''}</p>`;

        if (data.points && data.points.length) {
            html += `<h4>${pointsTitle}</h4><ul>`;
            data.points.forEach(p => html += `<li>${p}</li>`);
            html += `</ul>`;
        }

        if (data.stats && data.stats.length) {
            html += `<h4>${statsTitle}</h4><div class="mega-stats">`;
            data.stats.forEach(s => {
                html += `<div class="mega-stat">
                            <span class="mega-stat-value">${s.v}</span>
                            <span class="mega-stat-label">${s.l}</span>
                         </div>`;
            });
            html += `</div>`;
        }

        aBodyEl.innerHTML = html;
        aCtaEl.setAttribute('href', href);

        aOverlay.classList.add('active');
        aOverlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeAboutModal() {
        aOverlay.classList.remove('active');
        aOverlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    document.querySelectorAll('.mega-menu a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (ABOUT_DATA[href]) {
                e.preventDefault();
                openAboutModal(href);
            }
        });
    });

    aCloseBtn?.addEventListener('click', closeAboutModal);
    aCancelBtn?.addEventListener('click', closeAboutModal);

    aOverlay.addEventListener('click', (e) => {
        if (e.target === aOverlay) closeAboutModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && aOverlay.classList.contains('active')) {
            closeAboutModal();
        }
    });
})();/* =========================================================
   🎯 MORE MEGA MENU — DATA + FUNCTIONS
========================================================= */

const MORE_DATA = {

    /* ═══ টুলস (Tools) ═══ */
    '#search': {
        icon: '🔎', category: 'Tools', title: 'Search', bnTitle: 'অনুসন্ধান',
        descBn: 'মহেশখালীর সব তথ্য এক জায়গায় খুঁজুন — ব্যবসা, সেবা, স্থান, ব্যক্তি সব।',
        descEn: 'Search all information of Maheshkhali in one place — business, services, places, people.',
        points: ['ব্যবসা খুঁজুন', 'সেবা খুঁজুন', 'স্থান খুঁজুন', 'ব্যক্তি খুঁজুন'],
        stats: [{ v: 'Fast', l: 'Search' }, { v: '1000+', l: 'Results' }]
    },
    '#map': {
        icon: '🗺️', category: 'Tools', title: 'Maheshkhali Map', bnTitle: 'মহেশখালী ম্যাপ',
        descBn: 'মহেশখালীর ইন্টারঅ্যাকটিভ ম্যাপ — সব স্থান, রাস্তা ও দর্শনীয় স্থান দেখুন।',
        descEn: 'Interactive map of Maheshkhali — see all places, roads and attractions.',
        points: ['৮টি ইউনিয়ন', 'সব রাস্তা', 'দর্শনীয় স্থান', 'লাইভ লোকেশন'],
        stats: [{ v: 'Live', l: 'Map' }]
    },
    '#nearby': {
        icon: '📍', category: 'Tools', title: 'Find Nearby', bnTitle: 'কাছাকাছি',
        descBn: 'আপনার কাছের সব সেবা খুঁজুন — হাসপাতাল, ব্যাংক, দোকান, হোটেল, মসজিদ।',
        descEn: 'Find all nearby services — hospitals, banks, shops, hotels, mosques.',
        points: ['হাসপাতাল', 'ব্যাংক', 'দোকান', 'হোটেল', 'মসজিদ'],
        stats: [{ v: 'GPS', l: 'Based' }]
    },
    '#govt-services': {
        icon: '🏛️', category: 'Tools', title: 'Government Services', bnTitle: 'সরকারি সেবা',
        descBn: 'সরকারি সেবা ও অফিসের তথ্য — ইউনিয়ন পরিষদ, উপজেলা, থানা, ডাকঘর।',
        descEn: 'Info about government services and offices — union parishad, upazila, thana, post office.',
        points: ['ইউনিয়ন পরিষদ', 'উপজেলা অফিস', 'থানা', 'ডাকঘর'],
        stats: [{ v: '20+', l: 'Offices' }]
    },
    '#utilities': {
        icon: '⚡', category: 'Tools', title: 'Utilities', bnTitle: 'ইউটিলিটি',
        descBn: 'দৈনন্দিন কাজে সহায়ক টুলস — ক্যালকুলেটর, কনভার্টার, সময়সূচি।',
        descEn: 'Useful tools for daily tasks — calculator, converter, time zone.',
        points: ['ক্যালকুলেটর', 'কনভার্টার', 'সময়সূচি', 'ক্যালেন্ডার'],
        stats: [{ v: '10+', l: 'Tools' }]
    },

    /* ═══ যোগাযোগ (Contact) ═══ */
    '#emergency-contacts': {
        icon: '🚨', category: 'Contact', title: 'Emergency Contacts', bnTitle: 'জরুরি যোগাযোগ',
        descBn: 'জরুরি প্রয়োজনে সব হেল্পলাইন নম্বর — ৯৯৯, ফায়ার সার্ভিস, অ্যাম্বুলেন্স।',
        descEn: 'All emergency helpline numbers — 999, fire service, ambulance.',
        points: ['🚨 ৯৯৯', '🚑 অ্যাম্বুলেন্স', '🔥 ফায়ার সার্ভিস', '👮 পুলিশ'],
        stats: [{ v: '24/7', l: 'Available' }]
    },
    '#important-contacts': {
        icon: '☎️', category: 'Contact', title: 'Important Contacts', bnTitle: 'গুরুত্বপূর্ণ নম্বর',
        descBn: 'মহেশখালীর গুরুত্বপূর্ণ সব নম্বর — প্রশাসন, শিক্ষা, স্বাস্থ্য, ব্যবসা।',
        descEn: 'All important numbers of Maheshkhali — administration, education, health, business.',
        points: ['প্রশাসন', 'শিক্ষা অফিস', 'স্বাস্থ্য অফিস', 'ব্যবসা'],
        stats: [{ v: '100+', l: 'Contacts' }]
    },
    '#news': {
        icon: '📰', category: 'Contact', title: 'News & Media', bnTitle: 'সংবাদ ও মিডিয়া',
        descBn: 'মহেশখালীর সর্বশেষ সংবাদ ও মিডিয়া কভারেজ এক জায়গায়।',
        descEn: 'Latest news and media coverage of Maheshkhali in one place.',
        points: ['স্থানীয় সংবাদ', 'জাতীয় সংবাদ', 'মিডিয়া কভারেজ', 'সংবাদপত্র'],
        stats: [{ v: 'Daily', l: 'Updates' }]
    },
    '#events-calendar': {
        icon: '📅', category: 'Contact', title: 'Events Calendar', bnTitle: 'ইভেন্ট ক্যালেন্ডার',
        descBn: 'মহেশখালীর আসন্ন ও চলমান সব ইভেন্ট, উৎসব ও অনুষ্ঠানের ক্যালেন্ডার।',
        descEn: 'Calendar of all upcoming and ongoing events, festivals and programs.',
        points: ['উৎসব', 'মিটিং', 'সাংস্কৃতিক অনুষ্ঠান', 'স্পোর্টস'],
        stats: [{ v: '25+', l: 'Upcoming' }]
    },
    '#feedback': {
        icon: '💬', category: 'Contact', title: 'Feedback', bnTitle: 'মতামত',
        descBn: 'আপনার মতামত আমাদের কাছে গুরুত্বপূর্ণ। পরামর্শ, প্রশংসা বা অভিযোগ জানান।',
        descEn: 'Your feedback is important to us. Share suggestions, praise or complaints.',
        points: ['পরামর্শ', 'প্রশংসা', 'অভিযোগ', 'সার্ভে'],
        stats: [{ v: '500+', l: 'Feedbacks' }]
    },

    /* ═══ অ্যাকাউন্ট (Account) ═══ */
    '#login': {
        icon: '🔐', category: 'Account', title: 'Login', bnTitle: 'লগইন',
        descBn: 'আপনার অ্যাকাউন্টে লগইন করুন — সব সুবিধা পেতে।',
        descEn: 'Login to your account — to get all benefits.',
        points: ['নিরাপদ লগইন', 'সব ফিচার', 'সেভ করা আইটেম', 'কাস্টমাইজড'],
        stats: [{ v: 'Secure', l: 'Login' }]
    },
    '#register': {
        icon: '📝', category: 'Account', title: 'Registration', bnTitle: 'রেজিস্ট্রেশন',
        descBn: 'নতুন অ্যাকাউন্ট তৈরি করুন — সম্পূর্ণ ফ্রি।',
        descEn: 'Create a new account — completely free.',
        points: ['সম্পূর্ণ ফ্রি', 'সহজ রেজিস্ট্রেশন', 'সব সুবিধা', 'তাৎক্ষণিক'],
        stats: [{ v: 'Free', l: 'Signup' }]
    },
    '#profile': {
        icon: '👤', category: 'Account', title: 'My Profile', bnTitle: 'আমার প্রোফাইল',
        descBn: 'আপনার প্রোফাইল দেখা ও এডিট করুন — নাম, ছবি, তথ্য সব।',
        descEn: 'View and edit your profile — name, photo, information everything.',
        points: ['নাম ও ছবি', 'তথ্য এডিট', 'পাসওয়ার্ড পরিবর্তন', 'প্রাইভেসি'],
        stats: [{ v: 'Personal', l: 'Profile' }]
    },
    '#notifications': {
        icon: '🔔', category: 'Account', title: 'Notifications', bnTitle: 'নোটিফিকেশন',
        descBn: 'আপনার সব নোটিফিকেশন — নতুন আপডেট, মেসেজ, ঘোষণা।',
        descEn: 'All your notifications — new updates, messages, announcements.',
        points: ['নতুন আপডেট', 'মেসেজ', 'ঘোষণা', 'ইভেন্ট'],
        stats: [{ v: 'Live', l: 'Alerts' }]
    },
    '#saved': {
        icon: '💾', category: 'Account', title: 'Saved Items', bnTitle: 'সংরক্ষিত',
        descBn: 'আপনার সংরক্ষিত সব আইটেম — পোস্ট, স্থান, ব্যবসা, চাকরি।',
        descEn: 'All your saved items — posts, places, businesses, jobs.',
        points: ['সংরক্ষিত পোস্ট', 'সংরক্ষিত স্থান', 'সংরক্ষিত ব্যবসা', 'সংরক্ষিত চাকরি'],
        stats: [{ v: 'Cloud', l: 'Saved' }]
    },

    /* ═══ সেটিংস (Settings) ═══ */
    '#language': {
        icon: '🌐', category: 'Settings', title: 'Language', bnTitle: 'ভাষা',
        descBn: 'আপনার পছন্দের ভাষা বেছে নিন — বাংলা বা English।',
        descEn: 'Choose your preferred language — Bangla or English.',
        points: ['বাংলা', 'English', 'সব জায়গায় কাজ করে', 'সেভ হয়'],
        stats: [{ v: '2', l: 'Languages' }]
    },
    '#theme': {
        icon: '🌙', category: 'Settings', title: 'Theme', bnTitle: 'থিম',
        descBn: 'ডার্ক বা লাইট থিম বেছে নিন — আপনার চোখের আরামের জন্য।',
        descEn: 'Choose dark or light theme — for your eye comfort.',
        points: ['🌙 ডার্ক', '☀️ লাইট', 'সেভ হয়', 'সব জায়গায় কাজ করে'],
        stats: [{ v: '2', l: 'Themes' }]
    },
    '#accessibility': {
        icon: '♿', category: 'Settings', title: 'Accessibility', bnTitle: 'অ্যাক্সেসিবিলিটি',
        descBn: 'সবাই যেন ব্যবহার করতে পারে — বড় ফন্ট, হাই কনট্রাস্ট, স্ক্রিন রিডার সাপোর্ট।',
        descEn: 'So everyone can use — large fonts, high contrast, screen reader support.',
        points: ['বড় ফন্ট', 'হাই কনট্রাস্ট', 'স্ক্রিন রিডার', 'কীবোর্ড নেভিগেশন'],
        stats: [{ v: '95', l: 'A11y Score' }]
    },
    '#settings': {
        icon: '⚙️', category: 'Settings', title: 'General Settings', bnTitle: 'সাধারণ সেটিংস',
        descBn: 'সব সাধারণ সেটিংস এক জায়গায় — নোটিফিকেশন, প্রাইভেসি, ডেটা।',
        descEn: 'All general settings in one place — notifications, privacy, data.',
        points: ['নোটিফিকেশন', 'প্রাইভেসি', 'ডেটা', 'অ্যাকাউন্ট'],
        stats: [{ v: '10+', l: 'Options' }]
    },
    '#help': {
        icon: '💬', category: 'Settings', title: 'Help Center', bnTitle: 'সহায়তা কেন্দ্র',
        descBn: 'যেকোনো সমস্যায় সাহায্য নিন — গাইড, টিউটোরিয়াল, FAQ।',
        descEn: 'Get help for any problem — guides, tutorials, FAQ.',
        points: ['গাইড', 'টিউটোরিয়াল', 'FAQ', 'যোগাযোগ'],
        stats: [{ v: '50+', l: 'Articles' }]
    }
};


/* ---------- MORE Modal — আলাদা নাম (conflict এড়াতে) ---------- */
(function initMoreModal() {
    const mOverlay    = document.getElementById('megaDetailsOverlay');
    const mCloseBtn   = document.getElementById('megaDetailsClose');
    const mCancelBtn  = document.getElementById('megaDetailsCancel');
    const mIconEl     = document.getElementById('megaDetailsIcon');
    const mCategoryEl = document.getElementById('megaDetailsCategory');
    const mTitleEl    = document.getElementById('megaDetailsTitle');
    const mBodyEl     = document.getElementById('megaDetailsBody');
    const mCtaEl      = document.getElementById('megaDetailsCTA');

    if (!mOverlay) return;

    function openMoreModal(href) {
        const data = MORE_DATA[href];
        if (!data) return;

        const isEn = document.documentElement.lang === 'en';

        mIconEl.textContent = data.icon || '📌';
        mCategoryEl.textContent = data.category || '';
        mTitleEl.textContent = isEn ? (data.title || '') : (data.bnTitle || data.title || '');

        const desc = isEn ? data.descEn : data.descBn;
        const pointsTitle = isEn ? '✨ Highlights' : '✨ বিশেষত্ব';
        const statsTitle  = isEn ? '📊 Quick Stats' : '📊 এক নজরে';

        let html = `<p>${desc || ''}</p>`;

        if (data.points && data.points.length) {
            html += `<h4>${pointsTitle}</h4><ul>`;
            data.points.forEach(p => html += `<li>${p}</li>`);
            html += `</ul>`;
        }

        if (data.stats && data.stats.length) {
            html += `<h4>${statsTitle}</h4><div class="mega-stats">`;
            data.stats.forEach(s => {
                html += `<div class="mega-stat">
                            <span class="mega-stat-value">${s.v}</span>
                            <span class="mega-stat-label">${s.l}</span>
                         </div>`;
            });
            html += `</div>`;
        }

        mBodyEl.innerHTML = html;
        mCtaEl.setAttribute('href', href);

        mOverlay.classList.add('active');
        mOverlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeMoreModal() {
        mOverlay.classList.remove('active');
        mOverlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    document.querySelectorAll('.mega-menu a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (MORE_DATA[href]) {
                e.preventDefault();
                openMoreModal(href);
            }
        });
    });

    mCloseBtn?.addEventListener('click', closeMoreModal);
    mCancelBtn?.addEventListener('click', closeMoreModal);

    mOverlay.addEventListener('click', (e) => {
        if (e.target === mOverlay) closeMoreModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mOverlay.classList.contains('active')) {
            closeMoreModal();
        }
    });
})();/* =========================================================
   🎡 SPIN / LEARNING HUB / PANELS — MAIN SCRIPT
========================================================= */

(function initSpinSystem() {

    /* ---------- উপাদান ---------- */
    const spinBtn       = document.getElementById('spinCounterBtn');
    const spinCountEl   = document.getElementById('spinCount');
    const hubOverlay    = document.getElementById('learningHubOverlay');
    const hubClose      = document.getElementById('lhClose');
    const lhSpinCount   = document.getElementById('lhSpinCount');
    const lhScore       = document.getElementById('lhScore');
    const lhXP          = document.getElementById('lhXP');
    const lhStreak      = document.getElementById('lhStreak');
    const lhLevel       = document.getElementById('lhLevel');

    const knOverlay     = document.getElementById('knPanelOverlay');
    const knClose       = document.getElementById('knClose');
    const eduOverlay    = document.getElementById('eduPanelOverlay');
    const eduClose      = document.getElementById('eduClose');
    const bs9qOverlay   = document.getElementById('bs9qPanelOverlay');
    const bs9qClose     = document.getElementById('bs9qClose');

    /* ---------- State (localStorage) ---------- */
    let state = {
        spin:   parseInt(localStorage.getItem('spinCount')  || '0', 10),
        score:  parseInt(localStorage.getItem('lhScore')    || '0', 10),
        xp:     parseInt(localStorage.getItem('lhXP')       || '0', 10),
        streak: parseInt(localStorage.getItem('lhStreak')   || '0', 10)
    };

    function saveState() {
        localStorage.setItem('spinCount', state.spin);
        localStorage.setItem('lhScore',   state.score);
        localStorage.setItem('lhXP',      state.xp);
        localStorage.setItem('lhStreak',  state.streak);
    }

    function getLevel() {
        const xp = state.xp;
        if (xp >= 1000) return { bn: 'মাস্টার',      en: 'Master'   };
        if (xp >= 500)  return { bn: 'এক্সপার্ট',    en: 'Expert'   };
        if (xp >= 200)  return { bn: 'অ্যাডভান্সড',  en: 'Advanced' };
        if (xp >= 50)   return { bn: 'শিক্ষার্থী',    en: 'Learner'  };
        return              { bn: 'শিক্ষানবিশ',    en: 'Beginner' };
    }

    function updateUI() {
        if (spinCountEl) spinCountEl.textContent = state.spin;
        if (lhSpinCount) lhSpinCount.textContent = state.spin;
        if (lhScore)     lhScore.textContent     = state.score;
        if (lhXP)        lhXP.textContent        = state.xp;
        if (lhStreak)    lhStreak.textContent    = state.streak;
        if (lhLevel) {
            const lvl = getLevel();
            const isEn = document.documentElement.lang === 'en';
            lhLevel.textContent = isEn ? lvl.en : lvl.bn;
            lhLevel.setAttribute('data-bn', lvl.bn);
            lhLevel.setAttribute('data-en', lvl.en);
        }
    }
    updateUI();

    /* ---------- SPIN Button ---------- */
    spinBtn?.addEventListener('click', () => {
        state.spin++;
        state.score += 5;
        state.xp    += 10;
        saveState();
        updateUI();

        openPanel(hubOverlay);

        spinBtn.style.transform = 'scale(1.15)';
        setTimeout(() => { spinBtn.style.transform = ''; }, 200);
    });

    /* ---------- Panel Open / Close ---------- */
    function openPanel(overlay) {
        if (!overlay) return;
        overlay.classList.add('active');
        overlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closePanel(overlay) {
        if (!overlay) return;
        overlay.classList.remove('active');
        overlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    /* ---------- Close Events ---------- */
    hubClose?.addEventListener('click', () => closePanel(hubOverlay));
    knClose?.addEventListener('click', () => closePanel(knOverlay));
    eduClose?.addEventListener('click', () => closePanel(eduOverlay));
    bs9qClose?.addEventListener('click', () => closePanel(bs9qOverlay));

    [hubOverlay, knOverlay, eduOverlay, bs9qOverlay].forEach(o => {
        o?.addEventListener('click', (e) => {
            if (e.target === o) closePanel(o);
        });
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            [hubOverlay, knOverlay, eduOverlay, bs9qOverlay].forEach(o => {
                if (o?.classList.contains('active')) closePanel(o);
            });
        }
    });

    /* ---------- Category Card Click ---------- */
    const categoryMap = {
        'knowledge':      knOverlay,
        'education':      eduOverlay,
        'bs9q':           bs9qOverlay
        // ভবিষ্যতে আরো panel যোগ করা যাবে
    };

    document.querySelectorAll('.lh-cat-card').forEach(card => {
        card.addEventListener('click', () => {
            const cat = card.getAttribute('data-category');
            closePanel(hubOverlay);

            if (categoryMap[cat]) {
                setTimeout(() => openPanel(categoryMap[cat]), 250);
            } else {
                console.log('Category clicked:', cat);
            }
        });

        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.click();
            }
        });
    });

    /* ---------- Nav Tabs (সব panel এ) ---------- */
    function initNavTabs(navSelector, sectionSelector, jumpAttr, sectionAttr) {
        const navBtns  = document.querySelectorAll(navSelector);
        const sections = document.querySelectorAll(sectionSelector);

        navBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const target = btn.getAttribute(jumpAttr);

                navBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                sections.forEach(sec => {
                    if (sec.getAttribute(sectionAttr) === target) {
                        sec.style.display = '';
                    } else {
                        sec.style.display = 'none';
                    }
                });
            });
        });

        sections.forEach((sec, i) => {
            sec.style.display = i === 0 ? '' : 'none';
        });
    }

    initNavTabs('.kn-nav-btn',   '[data-kn-section]',   'data-kn-jump',   'data-kn-section');
    initNavTabs('.edu-nav-btn',  '[data-edu-section]',  'data-edu-jump',  'data-edu-section');
    initNavTabs('.bs9q-nav-btn', '[data-bs9q-section]', 'data-bs9q-jump', 'data-bs9q-section');

    /* ---------- BS9Q Actions ---------- */
    const bs9qFullText    = document.getElementById('bs9qFullText');
    const bs9qCopyBtn     = document.getElementById('bs9qCopyBtn');
    const bs9qDownloadBtn = document.getElementById('bs9qDownloadBtn');
    const bs9qShareBtn    = document.getElementById('bs9qShareBtn');

    /* Copy */
    bs9qCopyBtn?.addEventListener('click', async () => {
        const text = bs9qFullText?.value || '';
        try {
            await navigator.clipboard.writeText(text);
            const label = bs9qCopyBtn.querySelector('span:last-child');
            if (label) {
                const original = label.textContent;
                label.textContent = '✅ Copied!';
                setTimeout(() => { label.textContent = original; }, 2000);
            }
        } catch (err) {
            alert('কপি করা যায়নি');
        }
    });

    /* Download */
    bs9qDownloadBtn?.addEventListener('click', () => {
        const text = bs9qFullText?.value || '';
        const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
        const url  = URL.createObjectURL(blob);
        const a    = document.createElement('a');
        a.href     = url;
        a.download = 'BS-9Q-5F-Mindmap-Method.txt';
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(url);
    });

    /* Share */
    bs9qShareBtn?.addEventListener('click', async () => {
        const text = bs9qFullText?.value || '';
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'BS~9Q-5F Mindmap Method™',
                    text:  text.substring(0, 200) + '...'
                });
            } catch (err) {
                console.log('Share cancelled');
            }
        } else {
            alert('আপনার ব্রাউজারে Share সাপোর্ট নেই');
        }
    });

    /* ---------- Suggest Buttons ---------- */
    const lhSearchInput = document.getElementById('lhSearchInput');
    document.querySelectorAll('.lh-suggest-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            if (lhSearchInput) {
                lhSearchInput.value = btn.textContent.trim();
                lhSearchInput.focus();
            }
        });
    });

    /* ---------- Search Input (Enter চাপলে) ---------- */
    lhSearchInput?.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const q = lhSearchInput.value.trim();
            if (q) {
                // ভবিষ্যতে search functionality যোগ করা যাবে
                console.log('Searching:', q);
            }
        }
    });

})();/* =========================================================
   💻 COMPUTER PANEL — Open / Close / Nav Tabs
========================================================= */

(function initComputerPanel() {

    const compOverlay = document.getElementById('compPanelOverlay');
    const compClose   = document.getElementById('compClose');

    if (!compOverlay) return;

    /* ---------- Open / Close ---------- */
    function openCompPanel() {
        compOverlay.classList.add('active');
        compOverlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeCompPanel() {
        compOverlay.classList.remove('active');
        compOverlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    compClose?.addEventListener('click', closeCompPanel);

    compOverlay.addEventListener('click', (e) => {
        if (e.target === compOverlay) closeCompPanel();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && compOverlay.classList.contains('active')) {
            closeCompPanel();
        }
    });

    /* ---------- Category Card Click → Panel Open ---------- */
    const computerCard = document.querySelector('.lh-cat-card[data-category="computer"]');
    computerCard?.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        const hub = document.getElementById('learningHubOverlay');
        hub?.classList.remove('active');
        hub?.setAttribute('aria-hidden', 'true');

        setTimeout(() => openCompPanel(), 250);
    });

    /* ---------- Nav Tabs ---------- */
    const navBtns  = compOverlay.querySelectorAll('.comp-nav-btn');
    const sections = compOverlay.querySelectorAll('.comp-section');

    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-comp-jump');

            navBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            sections.forEach(sec => {
                sec.style.display = sec.getAttribute('data-comp-section') === target ? '' : 'none';
            });

            const body = compOverlay.querySelector('.comp-body');
            if (body) body.scrollTop = 0;
        });
    });

    // Initially show only first section
    sections.forEach((sec, i) => {
        sec.style.display = i === 0 ? '' : 'none';
    });

})();


/* =========================================================
   🎯 TYPING TEST — Real-time WPM & Accuracy
   Bangla ↔ English Support
   26 English Alphabet Practice
========================================================= */

(function initTypingTest() {

    /* ---------- Practice Texts ----------
       ২৬টি English alphabet সবই এখানে practice করা যাবে
    ---------- */
    const TEXTS = {
        en: [
            // ⭐ ২৬টি alphabet সব একসাথে (সবচেয়ে famous pangram)
            "The quick brown fox jumps over the lazy dog.",
            "Pack my box with five dozen liquor jugs.",
            "How vexingly quick daft zebras jump!",
            "The five boxing wizards jump quickly.",
            "Sphinx of black quartz, judge my vow.",
            "Bright vixens jump; dozy fowl quack.",
            "Jackdaws love my big sphinx of quartz.",
            "Waltz, bad nymph, for quick jigs vex.",
            "Quick zephyrs blow, vexing daft Jim.",
            "Two driven jocks help fax my big quiz.",
            "Crazy Frederick bought many very exquisite opal jewels.",
            "A very bad quack might jinx zippy fowls.",
            "Glib jocks quiz nymph to vex dwarf.",
            "Sixty zippers were quickly picked from the woven jute bag."
        ],
        bn: [
            "দ্রুত বাদামী শিয়াল অলস কুকুরের উপর দিয়ে লাফিয়ে যায়।",
            "আমার সোনার বাংলা আমি তোমায় ভালোবাসি।",
            "চিরদিন তোমার আকাশ তোমার বাতাস আমার প্রাণে বাজায় বাঁশি।",
            "সবাইকে স্বাগতম আমাদের মহেশখালী ডিজিটাল প্ল্যাটফর্মে।",
            "বাংলা টাইপিং অনুশীলন করুন প্রতিদিন।",
            "এখানে শিখুন, বাড়ুন, সফল হোন।"
        ]
    };

    /* ---------- উপাদান ---------- */
    const textDisplay = document.getElementById('ttTextDisplay');
    const input       = document.getElementById('ttInput');
    const timerEl     = document.getElementById('ttTimer');
    const wpmEl       = document.getElementById('ttWpm');
    const accEl       = document.getElementById('ttAccuracy');
    const correctEl   = document.getElementById('ttCorrect');
    const wrongEl     = document.getElementById('ttWrong');
    const startBtn    = document.getElementById('ttStartBtn');
    const resetBtn    = document.getElementById('ttResetBtn');
    const durationSel = document.getElementById('ttDuration');
    const resultBox   = document.getElementById('ttResult');
    const finalWpm    = document.getElementById('ttFinalWpm');
    const finalAcc    = document.getElementById('ttFinalAccuracy');
    const finalCorr   = document.getElementById('ttFinalCorrect');
    const finalWrng   = document.getElementById('ttFinalWrong');

    if (!input || !textDisplay) return;

    let startTime     = null;
    let timerInterval = null;
    let totalTime     = 60;
    let isRunning     = false;
    let currentText   = '';

    /* ---------- বর্তমান ভাষার টেক্সট নিন ---------- */
    function pickText() {
        const lang = document.documentElement.lang === 'en' ? 'en' : 'bn';
        const arr  = TEXTS[lang];
        currentText = arr[Math.floor(Math.random() * arr.length)];
    }

    /* ---------- টেক্সট রেন্ডার ---------- */
    function renderText() {
        pickText();
        textDisplay.innerHTML = '';
        for (let i = 0; i < currentText.length; i++) {
            const span = document.createElement('span');
            span.className = 'tt-char';
            span.textContent = currentText[i];
            textDisplay.appendChild(span);
        }
        highlightCurrent(0);
    }

    /* ---------- বর্তমান ক্যারেক্টার হাইলাইট ---------- */
    function highlightCurrent(index) {
        const chars = textDisplay.querySelectorAll('.tt-char');
        chars.forEach(c => c.classList.remove('current'));
        if (chars[index]) chars[index].classList.add('current');
    }

    /* ---------- ক্যারেক্টার স্টেট আপডেট ---------- */
    function updateChars() {
        const typed = input.value;
        const chars = textDisplay.querySelectorAll('.tt-char');
        let correct = 0, wrong = 0;

        chars.forEach((ch, i) => {
            ch.classList.remove('correct', 'wrong', 'current');

            if (i < typed.length) {
                if (typed[i] === currentText[i]) {
                    ch.classList.add('correct');
                    correct++;
                } else {
                    ch.classList.add('wrong');
                    wrong++;
                }
            } else if (i === typed.length) {
                ch.classList.add('current');
            }
        });

        correctEl.textContent = correct;
        wrongEl.textContent   = wrong;

        const totalTyped = correct + wrong;
        const accuracy = totalTyped > 0 ? Math.round((correct / totalTyped) * 100) : 100;
        accEl.textContent = accuracy + '%';

        if (isRunning && startTime) {
            const elapsedMin = (Date.now() - startTime) / 60000;
            const wordsTyped = correct / 5;
            const wpm = elapsedMin > 0 ? Math.round(wordsTyped / elapsedMin) : 0;
            wpmEl.textContent = wpm;
        }

        return { correct, wrong, accuracy };
    }

    /* ---------- টেস্ট শুরু ---------- */
    function startTest() {
        if (isRunning) return;

        isRunning = true;
        startTime = Date.now();
        totalTime = parseInt(durationSel.value, 10);
        timerEl.textContent = totalTime;

        input.disabled = false;
        input.value    = '';
        input.focus();

        resultBox.style.display = 'none';
        renderText();

        const startLabel = startBtn.querySelector('span');
        if (startLabel) startLabel.textContent = '⏸️ চলছে...';
        startBtn.disabled = true;
        durationSel.disabled = true;

        timerInterval = setInterval(() => {
            const elapsed = Math.floor((Date.now() - startTime) / 1000);
            const remaining = Math.max(0, totalTime - elapsed);
            timerEl.textContent = remaining;
            if (remaining <= 0) endTest();
        }, 250);
    }

    /* ---------- টেস্ট শেষ ---------- */
    function endTest() {
        isRunning = false;
        clearInterval(timerInterval);

        input.disabled = true;

        const startLabel = startBtn.querySelector('span');
        if (startLabel) {
            const isEn = document.documentElement.lang === 'en';
            startLabel.textContent = isEn ? '▶️ Start Again' : '▶️ আবার শুরু';
        }
        startBtn.disabled = false;
        durationSel.disabled = false;

        const stats = updateChars();

        const elapsedMin = (Date.now() - startTime) / 60000;
        const wordsTyped = stats.correct / 5;
        const wpm = elapsedMin > 0 ? Math.round(wordsTyped / elapsedMin) : 0;

        finalWpm.textContent  = wpm;
        finalAcc.textContent  = stats.accuracy + '%';
        finalCorr.textContent = stats.correct;
        finalWrng.textContent = stats.wrong;

        resultBox.style.display = 'block';
    }

    /* ---------- রিসেট ---------- */
    function resetTest() {
        clearInterval(timerInterval);
        isRunning = false;
        startTime = null;

        input.value = '';
        input.disabled = true;

        timerEl.textContent = durationSel.value;
        wpmEl.textContent   = '0';
        accEl.textContent   = '100%';
        correctEl.textContent = '0';
        wrongEl.textContent   = '0';

        const startLabel = startBtn.querySelector('span');
        if (startLabel) {
            const isEn = document.documentElement.lang === 'en';
            startLabel.textContent = isEn ? '▶️ Start' : '▶️ শুরু করুন';
        }
        startBtn.disabled = false;
        durationSel.disabled = false;

        resultBox.style.display = 'none';
        renderText();
    }

    /* ---------- Events ---------- */
    input.addEventListener('input', () => {
        if (!isRunning) return;
        updateChars();
        if (input.value.length >= currentText.length) endTest();
    });

    startBtn?.addEventListener('click', startTest);
    resetBtn?.addEventListener('click', resetTest);

    durationSel?.addEventListener('change', () => {
        if (!isRunning) timerEl.textContent = durationSel.value;
    });

    /* ---------- Init ---------- */
    input.disabled = true;
    renderText();

    /* ---------- Language Change হলে reset ---------- */
    document.addEventListener('click', (e) => {
        if (e.target.closest('#topLangBtn')) {
            setTimeout(() => {
                if (!isRunning) renderText();
            }, 300);
        }
    });

})();/* =========================================================
   🌍 RELIGION PANEL — Open / Close / Nav Tabs
========================================================= */

(function initReligionPanel() {

    const relOverlay = document.getElementById('relPanelOverlay');
    const relClose   = document.getElementById('relClose');

    if (!relOverlay) return;

    /* ---------- Open / Close ---------- */
    function openRelPanel() {
        relOverlay.classList.add('active');
        relOverlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeRelPanel() {
        relOverlay.classList.remove('active');
        relOverlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    relClose?.addEventListener('click', closeRelPanel);

    relOverlay.addEventListener('click', (e) => {
        if (e.target === relOverlay) closeRelPanel();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && relOverlay.classList.contains('active')) {
            closeRelPanel();
        }
    });

    /* ---------- Category Card Click → Panel Open ---------- */
    const religionCard = document.querySelector('.lh-cat-card[data-category="religion"]');
    religionCard?.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        const hub = document.getElementById('learningHubOverlay');
        hub?.classList.remove('active');
        hub?.setAttribute('aria-hidden', 'true');

        setTimeout(() => openRelPanel(), 250);
    });

    /* ---------- Nav Tabs ---------- */
    const navBtns  = relOverlay.querySelectorAll('.rel-nav-btn');
    const sections = relOverlay.querySelectorAll('.rel-section');

    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-rel-jump');

            navBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            sections.forEach(sec => {
                sec.style.display = sec.getAttribute('data-rel-section') === target ? '' : 'none';
            });

            const body = relOverlay.querySelector('.rel-body');
            if (body) body.scrollTop = 0;
        });
    });

    // Initially show only first section
    sections.forEach((sec, i) => {
        sec.style.display = i === 0 ? '' : 'none';
    });

})();/* =========================================================
   🚀 SKILLS LAB PANEL — Open / Close / Nav Tabs
========================================================= */

(function initSkillPanel() {
    const skillOverlay = document.getElementById('skillPanelOverlay');
    const skillClose   = document.getElementById('skillClose');

    if (!skillOverlay) return;

    function openSkillPanel() {
        skillOverlay.classList.add('active');
        skillOverlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeSkillPanel() {
        skillOverlay.classList.remove('active');
        skillOverlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    skillClose?.addEventListener('click', closeSkillPanel);

    skillOverlay.addEventListener('click', (e) => {
        if (e.target === skillOverlay) closeSkillPanel();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && skillOverlay.classList.contains('active')) {
            closeSkillPanel();
        }
    });

    // Card Click to Open Panel
    const skillCard = document.querySelector('.lh-cat-card[data-category="skills"]');
    skillCard?.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        const hub = document.getElementById('learningHubOverlay');
        hub?.classList.remove('active');
        hub?.setAttribute('aria-hidden', 'true');

        setTimeout(() => openSkillPanel(), 250);
    });

    // Nav Tabs
    const navBtns  = skillOverlay.querySelectorAll('.skill-nav-btn');
    const sections = skillOverlay.querySelectorAll('.skill-section');

    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-skill-jump');

            navBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            sections.forEach(sec => {
                sec.style.display = sec.getAttribute('data-skill-section') === target ? '' : 'none';
            });

            const body = skillOverlay.querySelector('.skill-body');
            if (body) body.scrollTop = 0;
        });
    });

    // Initially show only first section
    sections.forEach((sec, i) => {
        sec.style.display = i === 0 ? '' : 'none';
    });

})();/* =========================================================
   🎨 GRAPHIC DESIGN PANEL — Open / Close / Nav Tabs
========================================================= */

(function initDesignPanel() {
    const designOverlay = document.getElementById('designPanelOverlay');
    const designClose   = document.getElementById('designClose');

    if (!designOverlay) return;

    function openDesignPanel() {
        designOverlay.classList.add('active');
        designOverlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeDesignPanel() {
        designOverlay.classList.remove('active');
        designOverlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    designClose?.addEventListener('click', closeDesignPanel);

    designOverlay.addEventListener('click', (e) => {
        if (e.target === designOverlay) closeDesignPanel();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && designOverlay.classList.contains('active')) {
            closeDesignPanel();
        }
    });

    // Card Click to Open Panel
    const designCard = document.querySelector('.lh-cat-card[data-category="graphic-design"]');
    designCard?.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        const hub = document.getElementById('learningHubOverlay');
        hub?.classList.remove('active');
        hub?.setAttribute('aria-hidden', 'true');

        setTimeout(() => openDesignPanel(), 250);
    });

    // Nav Tabs
    const navBtns  = designOverlay.querySelectorAll('.design-nav-btn');
    const sections = designOverlay.querySelectorAll('.design-section');

    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-design-jump');

            navBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            sections.forEach(sec => {
                sec.style.display = sec.getAttribute('data-design-section') === target ? '' : 'none';
            });

            const body = designOverlay.querySelector('.design-body');
            if (body) body.scrollTop = 0;
        });
    });

    // Initially show only first section
    sections.forEach((sec, i) => {
        sec.style.display = i === 0 ? '' : 'none';
    });

})();/* =========================================================
   🤖 AI HUB PANEL — Open / Close / Nav Tabs
========================================================= */

(function initAIPanel() {
    const aiOverlay = document.getElementById('aiPanelOverlay');
    const aiClose   = document.getElementById('aiClose');

    if (!aiOverlay) return;

    function openAIPanel() {
        aiOverlay.classList.add('active');
        aiOverlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeAIPanel() {
        aiOverlay.classList.remove('active');
        aiOverlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    aiClose?.addEventListener('click', closeAIPanel);

    aiOverlay.addEventListener('click', (e) => {
        if (e.target === aiOverlay) closeAIPanel();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && aiOverlay.classList.contains('active')) {
            closeAIPanel();
        }
    });

    // Card Click to Open Panel
    const aiCard = document.querySelector('.lh-cat-card[data-category="ai"]');
    aiCard?.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        const hub = document.getElementById('learningHubOverlay');
        hub?.classList.remove('active');
        hub?.setAttribute('aria-hidden', 'true');

        setTimeout(() => openAIPanel(), 250);
    });

    // Nav Tabs
    const navBtns  = aiOverlay.querySelectorAll('.ai-nav-btn');
    const sections = aiOverlay.querySelectorAll('.ai-section');

    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-ai-jump');

            navBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            sections.forEach(sec => {
                sec.style.display = sec.getAttribute('data-ai-section') === target ? '' : 'none';
            });

            const body = aiOverlay.querySelector('.ai-body');
            if (body) body.scrollTop = 0;
        });
    });

    // Initially show only first section
    sections.forEach((sec, i) => {
        sec.style.display = i === 0 ? '' : 'none';
    });

})();/* =========================================================
   💻 DEVELOPER LAB PANEL — Open / Close / Nav Tabs
========================================================= */

(function initDevPanel() {
    const devOverlay = document.getElementById('devPanelOverlay');
    const devClose   = document.getElementById('devClose');

    if (!devOverlay) return;

    function openDevPanel() {
        devOverlay.classList.add('active');
        devOverlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeDevPanel() {
        devOverlay.classList.remove('active');
        devOverlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    devClose?.addEventListener('click', closeDevPanel);

    devOverlay.addEventListener('click', (e) => {
        if (e.target === devOverlay) closeDevPanel();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && devOverlay.classList.contains('active')) {
            closeDevPanel();
        }
    });

    // Card Click to Open Panel
    const devCard = document.querySelector('.lh-cat-card[data-category="developer"]');
    devCard?.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        const hub = document.getElementById('learningHubOverlay');
        hub?.classList.remove('active');
        hub?.setAttribute('aria-hidden', 'true');

        setTimeout(() => openDevPanel(), 250);
    });

    // Nav Tabs
    const navBtns  = devOverlay.querySelectorAll('.dev-nav-btn');
    const sections = devOverlay.querySelectorAll('.dev-section');

    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-dev-jump');

            navBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            sections.forEach(sec => {
                sec.style.display = sec.getAttribute('data-dev-section') === target ? '' : 'none';
            });

            const body = devOverlay.querySelector('.dev-body');
            if (body) body.scrollTop = 0;
        });
    });

    // Initially show only first section
    sections.forEach((sec, i) => {
        sec.style.display = i === 0 ? '' : 'none';
    });

})();/* =========================================================
   🔬 RESEARCH LAB PANEL — Open / Close / Nav Tabs
========================================================= */

(function initResPanel() {
    const resOverlay = document.getElementById('resPanelOverlay');
    const resClose   = document.getElementById('resClose');

    if (!resOverlay) return;

    function openResPanel() {
        resOverlay.classList.add('active');
        resOverlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeResPanel() {
        resOverlay.classList.remove('active');
        resOverlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    resClose?.addEventListener('click', closeResPanel);

    resOverlay.addEventListener('click', (e) => {
        if (e.target === resOverlay) closeResPanel();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && resOverlay.classList.contains('active')) {
            closeResPanel();
        }
    });

    // Card Click to Open Panel
    const resCard = document.querySelector('.lh-cat-card[data-category="research"]');
    resCard?.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        const hub = document.getElementById('learningHubOverlay');
        hub?.classList.remove('active');
        hub?.setAttribute('aria-hidden', 'true');

        setTimeout(() => openResPanel(), 250);
    });

    // Nav Tabs
    const navBtns  = resOverlay.querySelectorAll('.res-nav-btn');
    const sections = resOverlay.querySelectorAll('.res-section');

    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-res-jump');

            navBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            sections.forEach(sec => {
                sec.style.display = sec.getAttribute('data-res-section') === target ? '' : 'none';
            });

            const body = resOverlay.querySelector('.res-body');
            if (body) body.scrollTop = 0;
        });
    });

    // Initially show only first section
    sections.forEach((sec, i) => {
        sec.style.display = i === 0 ? '' : 'none';
    });

})();/* =========================================================
   💼 BUSINESS & E-COMMERCE PANEL (AGL)
   Open / Close / Nav Tabs
========================================================= */

(function initBusPanel() {
    const busOverlay = document.getElementById('busPanelOverlay');
    const busClose   = document.getElementById('busClose');

    if (!busOverlay) return;

    function openBusPanel() {
        busOverlay.classList.add('active');
        busOverlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeBusPanel() {
        busOverlay.classList.remove('active');
        busOverlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    busClose?.addEventListener('click', closeBusPanel);

    busOverlay.addEventListener('click', (e) => {
        if (e.target === busOverlay) closeBusPanel();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && busOverlay.classList.contains('active')) {
            closeBusPanel();
        }
    });

    const busCard = document.querySelector('.lh-cat-card[data-category="business"]');
    busCard?.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        const hub = document.getElementById('learningHubOverlay');
        hub?.classList.remove('active');
        hub?.setAttribute('aria-hidden', 'true');

        setTimeout(() => openBusPanel(), 250);
    });

    const navBtns  = busOverlay.querySelectorAll('.bus-nav-btn');
    const sections = busOverlay.querySelectorAll('.bus-section');

    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-bus-jump');

            navBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            sections.forEach(sec => {
                sec.style.display = sec.getAttribute('data-bus-section') === target ? '' : 'none';
            });

            const body = busOverlay.querySelector('.bus-body');
            if (body) body.scrollTop = 0;
        });
    });

    sections.forEach((sec, i) => {
        sec.style.display = i === 0 ? '' : 'none';
    });

})();/* =========================================================
   🎬 CREATIVE STUDIO PANEL — Open / Close / Nav Tabs
========================================================= */

(function initCrePanel() {
    const creOverlay = document.getElementById('crePanelOverlay');
    const creClose   = document.getElementById('creClose');

    if (!creOverlay) return;

    function openCrePanel() {
        creOverlay.classList.add('active');
        creOverlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeCrePanel() {
        creOverlay.classList.remove('active');
        creOverlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    creClose?.addEventListener('click', closeCrePanel);

    creOverlay.addEventListener('click', (e) => {
        if (e.target === creOverlay) closeCrePanel();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && creOverlay.classList.contains('active')) {
            closeCrePanel();
        }
    });

    const creCard = document.querySelector('.lh-cat-card[data-category="creative"]');
    creCard?.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        const hub = document.getElementById('learningHubOverlay');
        hub?.classList.remove('active');
        hub?.setAttribute('aria-hidden', 'true');

        setTimeout(() => openCrePanel(), 250);
    });

    const navBtns  = creOverlay.querySelectorAll('.cre-nav-btn');
    const sections = creOverlay.querySelectorAll('.cre-section');

    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-cre-jump');

            navBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            sections.forEach(sec => {
                sec.style.display = sec.getAttribute('data-cre-section') === target ? '' : 'none';
            });

            const body = creOverlay.querySelector('.cre-body');
            if (body) body.scrollTop = 0;
        });
    });

    sections.forEach((sec, i) => {
        sec.style.display = i === 0 ? '' : 'none';
    });

})();/* =========================================================
   🌱 PROJECT LAB PANEL — Open / Close / Nav Tabs
========================================================= */

(function initProjPanel() {
    const projOverlay = document.getElementById('projPanelOverlay');
    const projClose   = document.getElementById('projClose');

    if (!projOverlay) return;

    function openProjPanel() {
        projOverlay.classList.add('active');
        projOverlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeProjPanel() {
        projOverlay.classList.remove('active');
        projOverlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    projClose?.addEventListener('click', closeProjPanel);

    projOverlay.addEventListener('click', (e) => {
        if (e.target === projOverlay) closeProjPanel();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && projOverlay.classList.contains('active')) {
            closeProjPanel();
        }
    });

    const projCard = document.querySelector('.lh-cat-card[data-category="project"]');
    projCard?.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        const hub = document.getElementById('learningHubOverlay');
        hub?.classList.remove('active');
        hub?.setAttribute('aria-hidden', 'true');

        setTimeout(() => openProjPanel(), 250);
    });

    const navBtns  = projOverlay.querySelectorAll('.proj-nav-btn');
    const sections = projOverlay.querySelectorAll('.proj-section');

    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-proj-jump');

            navBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            sections.forEach(sec => {
                sec.style.display = sec.getAttribute('data-proj-section') === target ? '' : 'none';
            });

            const body = projOverlay.querySelector('.proj-body');
            if (body) body.scrollTop = 0;
        });
    });

    sections.forEach((sec, i) => {
        sec.style.display = i === 0 ? '' : 'none';
    });

})();/* =========================================================
   🔗 UNIVERSAL TOOLBOX PANEL — Open / Close / Nav Tabs
========================================================= */

(function initToolPanel() {
    const toolOverlay = document.getElementById('toolPanelOverlay');
    const toolClose   = document.getElementById('toolClose');

    if (!toolOverlay) return;

    function openToolPanel() {
        toolOverlay.classList.add('active');
        toolOverlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeToolPanel() {
        toolOverlay.classList.remove('active');
        toolOverlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    toolClose?.addEventListener('click', closeToolPanel);

    toolOverlay.addEventListener('click', (e) => {
        if (e.target === toolOverlay) closeToolPanel();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && toolOverlay.classList.contains('active')) {
            closeToolPanel();
        }
    });

    const toolCard = document.querySelector('.lh-cat-card[data-category="tools"]');
    toolCard?.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        const hub = document.getElementById('learningHubOverlay');
        hub?.classList.remove('active');
        hub?.setAttribute('aria-hidden', 'true');

        setTimeout(() => openToolPanel(), 250);
    });

    const navBtns  = toolOverlay.querySelectorAll('.tool-nav-btn');
    const sections = toolOverlay.querySelectorAll('.tool-section');

    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-tool-jump');

            navBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            sections.forEach(sec => {
                sec.style.display = sec.getAttribute('data-tool-section') === target ? '' : 'none';
            });

            const body = toolOverlay.querySelector('.tool-body');
            if (body) body.scrollTop = 0;
        });
    });

    sections.forEach((sec, i) => {
        sec.style.display = i === 0 ? '' : 'none';
    });

})();/* =========================================================
   📖 DICTIONARY & LANGUAGE PANEL — Open / Close / Nav Tabs
========================================================= */

(function initDictPanel() {
    const dictOverlay = document.getElementById('dictPanelOverlay');
    const dictClose   = document.getElementById('dictClose');

    if (!dictOverlay) return;

    function openDictPanel() {
        dictOverlay.classList.add('active');
        dictOverlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeDictPanel() {
        dictOverlay.classList.remove('active');
        dictOverlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    dictClose?.addEventListener('click', closeDictPanel);

    dictOverlay.addEventListener('click', (e) => {
        if (e.target === dictOverlay) closeDictPanel();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && dictOverlay.classList.contains('active')) {
            closeDictPanel();
        }
    });

    const dictCard = document.querySelector('.lh-cat-card[data-category="dictionary"]');
    dictCard?.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        const hub = document.getElementById('learningHubOverlay');
        hub?.classList.remove('active');
        hub?.setAttribute('aria-hidden', 'true');

        setTimeout(() => openDictPanel(), 250);
    });

    const navBtns  = dictOverlay.querySelectorAll('.dict-nav-btn');
    const sections = dictOverlay.querySelectorAll('.dict-section');

    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-dict-jump');

            navBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            sections.forEach(sec => {
                sec.style.display = sec.getAttribute('data-dict-section') === target ? '' : 'none';
            });

            const body = dictOverlay.querySelector('.dict-body');
            if (body) body.scrollTop = 0;
        });
    });

    sections.forEach((sec, i) => {
        sec.style.display = i === 0 ? '' : 'none';
    });

})();/* =========================================================
   🎮 BRAIN & EXPLORE PANEL — Open / Close / Nav Tabs
========================================================= */

(function initBrainPanel() {
    const brainOverlay = document.getElementById('brainPanelOverlay');
    const brainClose   = document.getElementById('brainClose');

    if (!brainOverlay) return;

    function openBrainPanel() {
        brainOverlay.classList.add('active');
        brainOverlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeBrainPanel() {
        brainOverlay.classList.remove('active');
        brainOverlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    brainClose?.addEventListener('click', closeBrainPanel);

    brainOverlay.addEventListener('click', (e) => {
        if (e.target === brainOverlay) closeBrainPanel();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && brainOverlay.classList.contains('active')) {
            closeBrainPanel();
        }
    });

    const brainCard = document.querySelector('.lh-cat-card[data-category="games"]');
    brainCard?.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        const hub = document.getElementById('learningHubOverlay');
        hub?.classList.remove('active');
        hub?.setAttribute('aria-hidden', 'true');

        setTimeout(() => openBrainPanel(), 250);
    });

    const navBtns  = brainOverlay.querySelectorAll('.brain-nav-btn');
    const sections = brainOverlay.querySelectorAll('.brain-section');

    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-brain-jump');

            navBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            sections.forEach(sec => {
                sec.style.display = sec.getAttribute('data-brain-section') === target ? '' : 'none';
            });

            const body = brainOverlay.querySelector('.brain-body');
            if (body) body.scrollTop = 0;
        });
    });

    sections.forEach((sec, i) => {
        sec.style.display = i === 0 ? '' : 'none';
    });

})();/* =========================================================
   🎯 CHALLENGE ARENA PANEL — Open / Close / Nav Tabs
========================================================= */

(function initChalPanel() {
    const chalOverlay = document.getElementById('chalPanelOverlay');
    const chalClose   = document.getElementById('chalClose');

    if (!chalOverlay) return;

    function openChalPanel() {
        chalOverlay.classList.add('active');
        chalOverlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeChalPanel() {
        chalOverlay.classList.remove('active');
        chalOverlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    chalClose?.addEventListener('click', closeChalPanel);

    chalOverlay.addEventListener('click', (e) => {
        if (e.target === chalOverlay) closeChalPanel();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && chalOverlay.classList.contains('active')) {
            closeChalPanel();
        }
    });

    const chalCard = document.querySelector('.lh-cat-card[data-category="challenge"]');
    chalCard?.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        const hub = document.getElementById('learningHubOverlay');
        hub?.classList.remove('active');
        hub?.setAttribute('aria-hidden', 'true');

        setTimeout(() => openChalPanel(), 250);
    });

    const navBtns  = chalOverlay.querySelectorAll('.chal-nav-btn');
    const sections = chalOverlay.querySelectorAll('.chal-section');

    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-chal-jump');

            navBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            sections.forEach(sec => {
                sec.style.display = sec.getAttribute('data-chal-section') === target ? '' : 'none';
            });

            const body = chalOverlay.querySelector('.chal-body');
            if (body) body.scrollTop = 0;
        });
    });

    sections.forEach((sec, i) => {
        sec.style.display = i === 0 ? '' : 'none';
    });

})();/* =========================================================
   🌍 WORLD EXPLORER PANEL — Open / Close / Nav Tabs
========================================================= */

(function initWorldPanel() {
    const worldOverlay = document.getElementById('worldPanelOverlay');
    const worldClose   = document.getElementById('worldClose');

    if (!worldOverlay) return;

    function openWorldPanel() {
        worldOverlay.classList.add('active');
        worldOverlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeWorldPanel() {
        worldOverlay.classList.remove('active');
        worldOverlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    worldClose?.addEventListener('click', closeWorldPanel);

    worldOverlay.addEventListener('click', (e) => {
        if (e.target === worldOverlay) closeWorldPanel();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && worldOverlay.classList.contains('active')) {
            closeWorldPanel();
        }
    });

    const worldCard = document.querySelector('.lh-cat-card[data-category="world"]');
    worldCard?.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        const hub = document.getElementById('learningHubOverlay');
        hub?.classList.remove('active');
        hub?.setAttribute('aria-hidden', 'true');

        setTimeout(() => openWorldPanel(), 250);
    });

    const navBtns  = worldOverlay.querySelectorAll('.world-nav-btn');
    const sections = worldOverlay.querySelectorAll('.world-section');

    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-world-jump');

            navBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            sections.forEach(sec => {
                sec.style.display = sec.getAttribute('data-world-section') === target ? '' : 'none';
            });

            const body = worldOverlay.querySelector('.world-body');
            if (body) body.scrollTop = 0;
        });
    });

    sections.forEach((sec, i) => {
        sec.style.display = i === 0 ? '' : 'none';
    });

})();/* =========================================================
   🇧🇩 BANGLADESH HUB PANEL — Open / Close / Nav Tabs
========================================================= */

(function initBdPanel() {
    const bdOverlay = document.getElementById('bdPanelOverlay');
    const bdClose   = document.getElementById('bdClose');

    if (!bdOverlay) return;

    function openBdPanel() {
        bdOverlay.classList.add('active');
        bdOverlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeBdPanel() {
        bdOverlay.classList.remove('active');
        bdOverlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    bdClose?.addEventListener('click', closeBdPanel);

    bdOverlay.addEventListener('click', (e) => {
        if (e.target === bdOverlay) closeBdPanel();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && bdOverlay.classList.contains('active')) {
            closeBdPanel();
        }
    });

    const bdCard = document.querySelector('.lh-cat-card[data-category="bangladesh"]');
    bdCard?.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        const hub = document.getElementById('learningHubOverlay');
        hub?.classList.remove('active');
        hub?.setAttribute('aria-hidden', 'true');

        setTimeout(() => openBdPanel(), 250);
    });

    const navBtns  = bdOverlay.querySelectorAll('.bd-nav-btn');
    const sections = bdOverlay.querySelectorAll('.bd-section');

    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-bd-jump');

            navBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            sections.forEach(sec => {
                sec.style.display = sec.getAttribute('data-bd-section') === target ? '' : 'none';
            });

            const body = bdOverlay.querySelector('.bd-body');
            if (body) body.scrollTop = 0;
        });
    });

    sections.forEach((sec, i) => {
        sec.style.display = i === 0 ? '' : 'none';
    });

})();/* =========================================================
   🏝️ OUR MAHESHKHALI PANEL — Open / Close / Nav Tabs
========================================================= */

(function initMhkPanel() {
    const mhkOverlay = document.getElementById('mhkPanelOverlay');
    const mhkClose   = document.getElementById('mhkClose');

    if (!mhkOverlay) return;

    function openMhkPanel() {
        mhkOverlay.classList.add('active');
        mhkOverlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeMhkPanel() {
        mhkOverlay.classList.remove('active');
        mhkOverlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    mhkClose?.addEventListener('click', closeMhkPanel);

    mhkOverlay.addEventListener('click', (e) => {
        if (e.target === mhkOverlay) closeMhkPanel();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mhkOverlay.classList.contains('active')) {
            closeMhkPanel();
        }
    });

    const mhkCard = document.querySelector('.lh-cat-card[data-category="maheshkhali"]');
    mhkCard?.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        const hub = document.getElementById('learningHubOverlay');
        hub?.classList.remove('active');
        hub?.setAttribute('aria-hidden', 'true');

        setTimeout(() => openMhkPanel(), 250);
    });

    const navBtns  = mhkOverlay.querySelectorAll('.mhk-nav-btn');
    const sections = mhkOverlay.querySelectorAll('.mhk-section');

    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-mhk-jump');

            navBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            sections.forEach(sec => {
                sec.style.display = sec.getAttribute('data-mhk-section') === target ? '' : 'none';
            });

            const body = mhkOverlay.querySelector('.mhk-body');
            if (body) body.scrollTop = 0;
        });
    });

    sections.forEach((sec, i) => {
        sec.style.display = i === 0 ? '' : 'none';
    });

})();/* =========================================================
   👤 MY DASHBOARD PANEL — Open / Close / Nav Tabs / Profile
========================================================= */

(function initDashPanel() {
    const dashOverlay = document.getElementById('dashPanelOverlay');
    const dashClose   = document.getElementById('dashClose');
    const dashUserName = document.getElementById('dashUserName');
    const dashUserEmail = document.getElementById('dashUserEmail');
    const dashEditBtn = document.getElementById('dashEditBtn');
    const dashAvatar = document.getElementById('dashAvatar');
    const dashXP = document.getElementById('dashXP');
    const dashScore = document.getElementById('dashScore');
    const dashLevel = document.getElementById('dashLevel');

    if (!dashOverlay) return;

    /* ---------- User Data Handling ---------- */
    function loadUserData() {
        const savedName = localStorage.getItem('userName') || 'Guest User';
        const savedEmail = localStorage.getItem('userEmail') || 'Not logged in';
        
        if (dashUserName) dashUserName.textContent = savedName;
        if (dashUserEmail) dashUserEmail.textContent = savedEmail;
        
        if (savedName !== 'Guest User') {
            dashAvatar.textContent = savedName.charAt(0).toUpperCase();
        }

        // Load stats from SPIN system
        const spinXP = localStorage.getItem('lhXP') || '0';
        const spinScore = localStorage.getItem('lhScore') || '0';
        const spinLevel = localStorage.getItem('lhLevel') || 'Beginner';
        
        if (dashXP) dashXP.textContent = spinXP;
        if (dashScore) dashScore.textContent = spinScore;
        if (dashLevel) dashLevel.textContent = spinLevel;
    }

    /* ---------- Open / Close ---------- */
    function openDashPanel() {
        loadUserData();
        dashOverlay.classList.add('active');
        dashOverlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeDashPanel() {
        dashOverlay.classList.remove('active');
        dashOverlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    dashClose?.addEventListener('click', closeDashPanel);

    dashOverlay.addEventListener('click', (e) => {
        if (e.target === dashOverlay) closeDashPanel();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && dashOverlay.classList.contains('active')) {
            closeDashPanel();
        }
    });

    /* ---------- Edit Profile ---------- */
    dashEditBtn?.addEventListener('click', () => {
        const currentName = localStorage.getItem('userName') || '';
        const newName = prompt("আপনার নাম লিখুন (Enter your name):", currentName);
        
        if (newName && newName.trim() !== '') {
            localStorage.setItem('userName', newName.trim());
            loadUserData();
            alert('✅ নাম সফলভাবে আপডেট হয়েছে!');
        }
    });

    /* ---------- Card Click to Open Panel ---------- */
    const dashCard = document.querySelector('.lh-cat-card[data-category="my"]');
    dashCard?.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        const hub = document.getElementById('learningHubOverlay');
        hub?.classList.remove('active');
        hub?.setAttribute('aria-hidden', 'true');

        setTimeout(() => openDashPanel(), 250);
    });

    /* ---------- Nav Tabs ---------- */
    const navBtns  = dashOverlay.querySelectorAll('.dash-nav-btn');
    const sections = dashOverlay.querySelectorAll('.dash-section');

    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-dash-jump');

            navBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            sections.forEach(sec => {
                sec.style.display = sec.getAttribute('data-dash-section') === target ? '' : 'none';
            });

            const body = dashOverlay.querySelector('.dash-body');
            if (body) body.scrollTop = 0;
        });
    });

    sections.forEach((sec, i) => {
        sec.style.display = i === 0 ? '' : 'none';
    });

})();/* =========================================================
   🤝 OUR MAHESHKHALI TEAM (OMT) PANEL — Open / Close / Registration
========================================================= */

(function initOmtPanel() {
    const omtOverlay = document.getElementById('omtPanelOverlay');
    const omtClose   = document.getElementById('omtClose');
    const omtForm    = document.getElementById('omtRegForm');
    const omtNameInput = document.getElementById('omtName');
    const omtUnionInput = document.getElementById('omtUnion');
    const membersList = document.getElementById('omtMembersList');

    if (!omtOverlay) return;

    /* ---------- Load & Save Members (LocalStorage) ---------- */
    function loadMembers() {
        const members = JSON.parse(localStorage.getItem('omtMembers') || '[]');
        
        // ফাউন্ডার ডিফল্ট কার্ড
        let html = `
            <div class="omt-member-card">
                <div class="omt-member-avatar">👨‍💻</div>
                <strong>Badsha Solyman</strong>
                <small>Founder • Matarbari</small>
            </div>
        `;
        
        // রেজিস্টার্ড ইউজারদের কার্ড
        members.forEach(m => {
            html += `
                <div class="omt-member-card">
                    <div class="omt-member-avatar">👤</div>
                    <strong>${m.name}</strong>
                    <small>Member • ${m.union}</small>
                </div>
            `;
        });
        
        if (membersList) membersList.innerHTML = html;
    }

    /* ---------- Register Form Submit ---------- */
    omtForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = omtNameInput.value.trim();
        const union = omtUnionInput.value;

        if (name && union) {
            const members = JSON.parse(localStorage.getItem('omtMembers') || '[]');
            
            // ডুপ্লিকেট চেক
            if (members.some(m => m.name.toLowerCase() === name.toLowerCase())) {
                alert('⚠️ এই নামে ইতিমধ্যে রেজিস্ট্রেশন করা হয়েছে!');
                return;
            }

            // নতুন মেম্বার সেভ
            members.push({ name, union });
            localStorage.setItem('omtMembers', JSON.stringify(members));
            
            alert('✅ সফলভাবে OMT-তে রেজিস্ট্রেশন সম্পন্ন হয়েছে! স্বাগতম।');
            omtForm.reset();
            loadMembers(); // লিস্ট রিলোড করুন
            
            // রেজিস্ট্রেশনের পর সোজা মেম্বার ট্যাবে চলে যাওয়া
            const memberTab = document.querySelector('.omt-nav-btn[data-omt-jump="members"]');
            if (memberTab) memberTab.click();
        }
    });

    /* ---------- Open / Close ---------- */
    function openOmtPanel() {
        loadMembers();
        omtOverlay.classList.add('active');
        omtOverlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
    }

    function closeOmtPanel() {
        omtOverlay.classList.remove('active');
        omtOverlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    omtClose?.addEventListener('click', closeOmtPanel);
    omtOverlay.addEventListener('click', (e) => {
        if (e.target === omtOverlay) closeOmtPanel();
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && omtOverlay.classList.contains('active')) {
            closeOmtPanel();
        }
    });

    /* ---------- Card Click to Open Panel ---------- */
    const omtCard = document.querySelector('.lh-cat-card[data-category="community"]');
    omtCard?.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        const hub = document.getElementById('learningHubOverlay');
        hub?.classList.remove('active');
        hub?.setAttribute('aria-hidden', 'true');

        setTimeout(() => openOmtPanel(), 250);
    });

    /* ---------- Nav Tabs ---------- */
    const navBtns  = omtOverlay.querySelectorAll('.omt-nav-btn');
    const sections = omtOverlay.querySelectorAll('.omt-section');

    navBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const target = btn.getAttribute('data-omt-jump');

            navBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            sections.forEach(sec => {
                sec.style.display = sec.getAttribute('data-omt-section') === target ? '' : 'none';
            });

            const body = omtOverlay.querySelector('.omt-body');
            if (body) body.scrollTop = 0;
        });
    });

    // Initialize
    loadMembers();
    sections.forEach((sec, i) => {
        sec.style.display = i === 0 ? '' : 'none';
    });

})();