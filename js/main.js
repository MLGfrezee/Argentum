class Slider {
    constructor() {
        this.slides = document.querySelectorAll('.slide');
        this.dotsContainer = document.querySelector('.slider-dots');
        this.prevBtn = document.querySelector('.prev');
        this.nextBtn = document.querySelector('.next');
        this.sliderContainer = document.querySelector('.slider-container');
        this.currentSlide = 0;
        this.interval = null;
        this.slideInterval = 7000;
        
        this.init();
    }
    
    init() {
        this.createDots();
        this.startAutoSlide();
        this.addEventListeners();
        this.updateSlider(); 
    }
    
    createDots() {
        this.dotsContainer.innerHTML = '';
        this.slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => this.goToSlide(index));
            this.dotsContainer.appendChild(dot);
        });
    }
    
    addEventListeners() {
        this.prevBtn.addEventListener('click', () => {
            this.prevSlide();
            this.resetAutoSlide();
        });
        
        this.nextBtn.addEventListener('click', () => {
            this.nextSlide();
            this.resetAutoSlide();
        });
        
        const slider = document.querySelector('.slider');
        slider.addEventListener('mouseenter', () => {
            clearInterval(this.interval);
        });
        
        slider.addEventListener('mouseleave', () => {
            this.resetAutoSlide();
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.code === 'ArrowLeft') this.prevSlide();
            else if (e.code === 'ArrowRight') this.nextSlide();
            this.resetAutoSlide();
        });
    }
    
    startAutoSlide() {
        this.interval = setInterval(() => {
            this.nextSlide();
        }, this.slideInterval);
    }
    
    resetAutoSlide() {
        clearInterval(this.interval);
        this.startAutoSlide();
    }
    
    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.slides.length;
        this.updateSlider();
    }
    
    prevSlide() {
        this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
        this.updateSlider();
    }
    
    goToSlide(index) {
        this.currentSlide = index;
        this.updateSlider();
        this.resetAutoSlide();
    }
    
    updateSlider() {
        this.sliderContainer.style.transform = `translateX(-${this.currentSlide * 100}%)`;
        document.querySelectorAll('.dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentSlide);
        });
    }
}
class VideoPlayer {
    constructor() {
        this.video = document.getElementById('mainVideo');
        this.playPauseBtn = document.querySelector('.play-pause');
        this.volumeSlider = document.querySelector('.volume-slider');
        this.progressBar = document.querySelector('.progress-bar');
        this.timeDisplay = document.querySelector('.time');
        this.fullscreenBtn = document.querySelector('.fullscreen');
        this.videoPlayer = document.querySelector('.video-player');
        this.twitchContainer = document.getElementById('twitch-player');
        this.streamButtons = document.querySelectorAll('.stream-btn');
        this.videoControls = document.querySelector('.video-controls');
        
        this.currentStream = 'dota2ti';
        this.twitchPlayer = null;
        this.isLocalVideoActive = false;
        
        this.init();
    }
    
    init() {
        this.loadTwitchPlayer();
        this.addEventListeners();
        this.setupStreamSelector();
    }
    
    loadTwitchPlayer() {
    
        if (document.querySelector('script[src="https://embed.twitch.tv/embed/v1.js"]')) {
            this.initializeTwitchPlayer();
            return;
        }
        
        const script = document.createElement('script');
        script.src = 'https://embed.twitch.tv/embed/v1.js';
        script.onload = () => {
            this.initializeTwitchPlayer();
        };
        script.onerror = () => {
            console.error('Ошибка загрузки Twitch API');
            this.twitchContainer.innerHTML = '<p>Не удалось загрузить Twitch плеер</p>';
        };
        document.head.appendChild(script);
    }
    
    initializeTwitchPlayer() {
        try {
            this.twitchPlayer = new Twitch.Embed(this.twitchContainer, {
                width: '100%',
                height: '100%',
                channel: this.currentStream,
                layout: 'video-with-chat',
                autoplay: true,
                muted: false
            });
        } catch (error) {
            console.error('Ошибка инициализации Twitch плеера:', error);
            this.twitchContainer.innerHTML = '<p>Ошибка загрузки трансляции</p>';
        }
    }
    
    setupStreamSelector() {
        this.streamButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                this.streamButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const channel = btn.dataset.channel;
                
                if (channel === 'local') {
                    this.showLocalVideo();
                } else {
                    this.switchTwitchChannel(channel);
                }
            });
        });
    }
    
    switchTwitchChannel(channel) {
        this.currentStream = channel;
        this.isLocalVideoActive = false;
        this.twitchContainer.style.display = 'block';
        this.video.style.display = 'none';
        this.videoControls.style.display = 'none';
        
        if (this.twitchPlayer && Twitch.Embed) {
            try {
                this.twitchPlayer.setChannel(channel);
            } catch (error) {
                console.error('Ошибка смены канала:', error);
                this.loadTwitchPlayer();
            }
        } else {
            this.loadTwitchPlayer();
        }
    }
    
    showLocalVideo() {
        this.isLocalVideoActive = true;
        this.twitchContainer.style.display = 'none';
        this.video.style.display = 'block';
        this.videoControls.style.display = 'flex';

        if (this.video.readyState === 0) {
            this.video.load();
        }
        
        this.updateVideoState();
    }
    
    updateVideoState() {
        if (this.video.paused) {
            this.playPauseBtn.textContent = '▶';
        } else {
            this.playPauseBtn.textContent = '❚❚';
        }
        this.updateTimeDisplay();
    }
    
    addEventListeners() {
 
        this.playPauseBtn.addEventListener('click', () => this.togglePlay());
        this.video.addEventListener('click', () => this.togglePlay());
        
     
        this.volumeSlider.addEventListener('input', () => {
            this.video.volume = parseFloat(this.volumeSlider.value);
        });
        
 
        this.progressBar.addEventListener('input', () => {
            if (this.video.duration) {
                const time = (this.progressBar.value / 100) * this.video.duration;
                this.video.currentTime = time;
            }
        });

        this.video.addEventListener('timeupdate', () => {
            if (this.video.duration) {
                const progress = (this.video.currentTime / this.video.duration) * 100;
                this.progressBar.value = progress;
                this.updateTimeDisplay();
            }
        });
        

        this.fullscreenBtn.addEventListener('click', () => this.toggleFullscreen());
        

        this.video.addEventListener('play', () => {
            this.playPauseBtn.textContent = '❚❚';
        });
        
        this.video.addEventListener('pause', () => {
            this.playPauseBtn.textContent = '▶';
        });
        
        this.video.addEventListener('ended', () => {
            this.playPauseBtn.textContent = '▶';
            this.video.currentTime = 0;
            this.updateTimeDisplay();
        });
        
        this.video.addEventListener('loadedmetadata', () => {
            this.updateTimeDisplay();
        });
        
        this.video.addEventListener('error', (e) => {
            console.error('Ошибка видео:', e);
            alert('Ошибка загрузки видео. Проверьте путь к файлу.');
        });
        
 
    
        document.addEventListener('keydown', (e) => this.handleHotkeys(e));
    }
    
    handleHotkeys(e) {
        if (!this.isLocalVideoActive) return;
        const handledKeys = [' ', 'k', 'K', 'f', 'F', 'm', 'M', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];
        
        if (handledKeys.includes(e.key)) {
            e.preventDefault();
        }
        
        switch(e.key) {
            case ' ':
            case 'k':
            case 'K':
                this.togglePlay();
                break;
                
            case 'f':
            case 'F':
                this.toggleFullscreen();
                break;
                
            case 'm':
            case 'M':
                this.toggleMute();
                break;
                
            case 'ArrowLeft':
                this.seek(-5);
                break;
                
            case 'ArrowRight':
                this.seek(5);
                break;
                
            case 'ArrowUp':
                this.changeVolume(0.1);
                break;
                
            case 'ArrowDown':
                this.changeVolume(-0.1);
                break;
        }
    }
    
    togglePlay() {
        if (!this.isLocalVideoActive) return;
        
        if (this.video.paused || this.video.ended) {
            this.video.play().catch(e => {
                console.log('Ошибка воспроизведения:', e);
            });
        } else {
            this.video.pause();
        }
    }
    
    toggleMute() {
        if (!this.isLocalVideoActive) return;
        
        this.video.muted = !this.video.muted;
        this.volumeSlider.value = this.video.muted ? 0 : this.video.volume;
    }
    
    seek(seconds) {
        if (!this.isLocalVideoActive || !this.video.duration) return;
        
        this.video.currentTime = Math.max(0, Math.min(this.video.duration, this.video.currentTime + seconds));
    }
    
    changeVolume(delta) {
        if (!this.isLocalVideoActive) return;
        
        const newVolume = Math.max(0, Math.min(1, this.video.volume + delta));
        this.video.volume = newVolume;
        this.volumeSlider.value = newVolume;
    }
    
    toggleFullscreen() {
        if (!this.isLocalVideoActive) return;
        
        const element = this.videoPlayer;
        
        if (!document.fullscreenElement) {
            if (element.requestFullscreen) {
                element.requestFullscreen();
            } else if (element.webkitRequestFullscreen) {
                element.webkitRequestFullscreen();
            } else if (element.msRequestFullscreen) {
                element.msRequestFullscreen(); 
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen();
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }
        }
    }
    
    updateTimeDisplay() {
        if (this.video.duration) {
            const currentTime = this.formatTime(this.video.currentTime);
            const duration = this.formatTime(this.video.duration);
            this.timeDisplay.textContent = `${currentTime} / ${duration}`;
        } else {
            this.timeDisplay.textContent = '0:00 / 0:00';
        }
    }
    
    formatTime(seconds) {
        const min = Math.floor(seconds / 60);
        const sec = Math.floor(seconds % 60);
        return `${min}:${sec.toString().padStart(2, '0')}`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Slider();
    new VideoPlayer();
    new FormValidator();
    new ThemeToggle();
});
class FormValidator {
    constructor() {
        this.form = document.getElementById('consultationForm');
        this.submitBtn = document.querySelector('.submit-btn');
        this.fields = {
            name: document.getElementById('name'),
            email: document.getElementById('email'),
            phone: document.getElementById('phone'),
            gender: document.getElementById('gender'),
            message: document.getElementById('message')
        };
        
        this.init();
    }
    
    init() {
        this.addEventListeners();
        this.checkFormValidity();
    }
    
    addEventListeners() {
        Object.values(this.fields).forEach(field => {
            field.addEventListener('input', () => {
                this.validateField(field);
                this.checkFormValidity();
            });
            
            field.addEventListener('blur', () => {
                this.validateField(field);
            });
        });
        
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));
    }
    
    validateField(field) {
        const value = field.value.trim();
        const errorElement = field.parentElement.querySelector('.error-message');
        
        let isValid = true;
        let errorMessage = '';
        
        switch(field.id) {
            case 'name':
                isValid = /^[a-zA-Zа-яА-ЯёЁ\s]{5,}$/.test(value);
                errorMessage = 'Имя должно содержать минимум 5 букв (только русские/латинские буквы и пробелы)';
                break;
                
            case 'email':
                isValid = /^[a-zA-Z0-9]{1,20}@[a-zA-Z0-9]+\.[a-zA-Z]+$/.test(value);
                errorMessage = 'Введите корректный email (только латинские буквы и цифры, до 20 символов до @)';
                break;
                
            case 'phone':
                isValid = /^(\+375-\d{2}-\d{3}-\d{2}-\d{2}|8\(375\)\d{2}-\d{3}-\d{2}-\d{2})$/.test(value);
                errorMessage = 'Формат: +375-xx-xxx-xx-xx или 8(375)xx-xxx-xx-xx';
                break;
                
            case 'gender':
                isValid = value !== '';
                errorMessage = 'Выберите пол';
                break;
                
            case 'message':
                isValid = value.length >= 10;
                errorMessage = 'Сообщение должно содержать минимум 10 символов';
                break;
        }
        
        if (isValid) {
            field.style.borderColor = '#4CAF50';
            errorElement.textContent = '';
        } else {
            field.style.borderColor = '#e94560';
            errorElement.textContent = errorMessage;
        }
        
        return isValid;
    }
    
    checkFormValidity() {
        const allValid = Object.values(this.fields).every(field => 
            this.validateField(field) && field.value.trim() !== ''
        );
        
        this.submitBtn.disabled = !allValid;
    }
    
    handleSubmit(e) {
        e.preventDefault();
        
        if (Object.values(this.fields).every(field => this.validateField(field))) {
            alert('Форма успешно отправлена!');
            this.form.reset();
            this.checkFormValidity();
        }
    }
}
document.addEventListener('DOMContentLoaded', () => {
    new Slider();
    new VideoPlayer();
    new FormValidator();
});
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    
    sections.forEach(section => {
        observer.observe(section);
    });
});
class ThemeToggle {
    constructor() {
        this.toggleBtn = document.getElementById('themeToggle');
        this.currentTheme = localStorage.getItem('theme') || 'dark';
        
        this.init();
    }
    
    init() {
        this.setTheme(this.currentTheme);
        this.toggleBtn.addEventListener('click', () => this.toggleTheme());
    }
    
    toggleTheme() {
        this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.setTheme(this.currentTheme);
    }
    
    setTheme(theme) {
        document.body.className = theme === 'light' ? 'light-theme' : '';
        this.toggleBtn.textContent = theme === 'dark' ? '🌙 Тёмная тема' : '☀️ Светлая тема';
        localStorage.setItem('theme', theme);
    }
}
document.addEventListener('DOMContentLoaded', () => {
    new Slider();
    new VideoPlayer();
    new FormValidator();
    new ThemeToggle(); 
});