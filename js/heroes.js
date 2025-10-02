class HeroesPage {
    constructor() {
        this.heroesGrid = document.getElementById('heroesGrid');
        this.searchInput = document.getElementById('heroSearch');
        this.filterButtons = document.querySelectorAll('.attr-btn');
        this.currentFilter = 'all';
        this.searchTerm = '';
        
        this.heroes = [
            
           {
    "name": "Anti-Mage",
    "attribute": "agility",
    "roles": ["Керри", "Пушер"],
    "image": "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/antimage.png",
    "stats": { "attack": 53, "defense": 24, "mobility": 35 },
    "description": "Мобильный керри, специализирующийся на быстром фарме и контроле маны противников.",
    "abilities": ["Mana Break - сжигает ману при атаках", "Blink - мгновенное перемещение", "Counterspell - сопротивление магии", "Mana Void - урон от недостатка маны"]
  },
  {
    "name": "Terrorblade",
    "attribute": "agility",
    "roles": ["Керри", "Пушер"],
    "image": "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/terrorblade.png",
    "stats": { "attack": 52, "defense": 26, "mobility": 30 },
    "description": "Мощный керри с способностью создавать иллюзии и усиливать свою атаку.",
    "abilities": ["Reflection - создает копии врагов", "Conjure Image - создает иллюзии", "Metamorphosis - усиливает форму", "Sunder - обмен здоровья"]
  },
  {
    "name": "Phantom Assassin",
    "attribute": "agility",
    "roles": ["Керри", "Брузер"],
    "image": "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/phantom_assassin.png",
    "stats": { "attack": 58, "defense": 22, "mobility": 32 },
    "description": "Убийца с критическим уроном и уклонением, способная мгновенно убивать цели.",
    "abilities": ["Stifling Dagger - метательный кинжал", "Phantom Strike - рывок к врагу", "Blur - пассивное уклонение", "Coup de Grace - смертельный критический удар"]
  },
  {
    "name": "Axe",
    "attribute": "strength",
    "roles": ["Инициатор", "Танк"],
    "image": "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/axe.png",
    "stats": { "attack": 45, "defense": 32, "mobility": 28 },
    "description": "Мощный танк-инициатор, способный выдерживать огромный урон и контролировать врагов.",
    "abilities": ["Berserker's Call - принудительная атака", "Battle Hunger - наложение голода", "Counter Helix - спин-атака", "Culling Blade - казнь с малым HP"]
  },
  {
    "name": "Mars",
    "attribute": "strength",
    "roles": ["Инициатор", "Дизейблер"],
    "image": "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/mars.png",
    "stats": { "attack": 48, "defense": 30, "mobility": 26 },
    "description": "Бог войны, создающий барьеры и контролирующий поле боя.",
    "abilities": ["Spear of Mars - бросок копья", "God's Rebuke - отталкивание", "Bulwark - защита щитом", "Arena of Blood - арена для битвы"]
  },
  {
    "name": "Tidehunter",
    "attribute": "strength",
    "roles": ["Инициатор", "Танк"],
    "image": "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/tidehunter.png",
    "stats": { "attack": 42, "defense": 34, "mobility": 24 },
    "description": "Морской гигант с мощным массовым оглушением и снижением брони.",
    "abilities": ["Gush - замедление и снижение брони", "Kraken Shell - пассивная защита", "Anchor Smash - урон по области", "Ravage - массовое оглушение"]
  },
  {
    "name": "Crystal Maiden",
    "attribute": "intelligence",
    "roles": ["Саппорт", "Дизейблер"],
    "image": "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/crystal_maiden.png",
    "stats": { "attack": 38, "defense": 18, "mobility": 42 },
    "description": "Саппорт с мощными заклинаниями контроля и аурой регенерации маны для команды.",
    "abilities": ["Crystal Nova - замедление и урон", "Frostbite - обездвиживание", "Arcane Aura - регенерация маны", "Freezing Field - ледяная буря"]
  },
  {
    "name": "Invoker",
    "attribute": "intelligence",
    "roles": ["Керри", "Контроллер"],
    "image": "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/invoker.png",
    "stats": { "attack": 46, "defense": 22, "mobility": 34 },
    "description": "Маг с доступом к 10 различным заклинаниям через комбинации стихий.",
    "abilities": ["Quas - стихия льда", "Wex - стихия молнии", "Exort - стихия огня", "Invoke - призыв заклинания"]
  },
  {
    "name": "Storm Spirit",
    "attribute": "intelligence",
    "roles": ["Ганкер", "Керри"],
    "image": "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/storm_spirit.png",
    "stats": { "attack": 44, "defense": 20, "mobility": 48 },
    "description": "Мобильный маг, перемещающийся по карте с помощью электричества.",
    "abilities": ["Static Remnant - электрический след", "Electric Vortex - притягивание врага", "Overload - усиление атаки", "Ball Lightning - перемещение молнией"]
  },
  {
    "name": "Void Spirit",
    "attribute": "universal",
    "roles": ["Ганкер", "Беггер"],
    "image": "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/void_spirit.png",
    "stats": { "attack": 48, "defense": 26, "mobility": 38 },
    "description": "Универсальный герой с высокой мобильностью и способностью уклоняться от атак.",
    "abilities": ["Aether Remnant - ловушка из эфира", "Dissimilate - уход в другое измерение", "Resonant Pulse - защитный импульс", "Astral Step - телепортация с уроном"]
  },
  {
    "name": "Windranger",
    "attribute": "universal",
    "roles": ["Керри", "Дизейблер"],
    "image": "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/windrunner.png",
    "stats": { "attack": 50, "defense": 24, "mobility": 36 },
    "description": "Универсальный стрелок с способностями контроля и уклонения.",
    "abilities": ["Shackleshot - оглушение о деревья", "Powershot - заряжаемый выстрел", "Windrun - ускорение и уклонение", "Focus Fire - усиленная атака по цели"]
  },
  {
    "name": "Pangolier",
    "attribute": "universal",
    "roles": ["Инициатор", "Ганкер"],
    "image": "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/pangolier.png",
    "stats": { "attack": 46, "defense": 28, "mobility": 40 },
    "description": "Акробатический дуэлянт с способностью кататься по полю боя.",
    "abilities": ["Swashbuckle - рывок с атаками", "Shield Crash - прыжок с защитой", "Lucky Shot - случайные эффекты", "Rolling Thunder - катание в клубке"]
  }
        ];
        
        this.init();
    }
    
    init() {
        this.renderHeroes();
        this.addEventListeners();
    }
    
    addEventListeners() {
        this.filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                this.filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentFilter = btn.dataset.attribute;
                this.renderHeroes();
            });
        });
        this.searchInput.addEventListener('input', (e) => {
            this.searchTerm = e.target.value.toLowerCase();
            this.renderHeroes();
        });
    }
    
    getFilteredHeroes() {
        return this.heroes.filter(hero => {
            const matchesFilter = this.currentFilter === 'all' || hero.attribute === this.currentFilter;
            const matchesSearch = hero.name.toLowerCase().includes(this.searchTerm);
            return matchesFilter && matchesSearch;
        });
    }
    
    renderHeroes() {
        const filteredHeroes = this.getFilteredHeroes();
        
        this.heroesGrid.innerHTML = filteredHeroes.map(hero => `
            <div class="hero-card" data-attribute="${hero.attribute}">
                <img src="${hero.image}" alt="${hero.name}" class="hero-image" loading="lazy">
                <div class="hero-content">
                    <h3 class="hero-name">${hero.name}</h3>
                    <div class="hero-attribute ${hero.attribute}">
                        <span class="attr-icon ${hero.attribute}">${this.getAttributeIcon(hero.attribute)}</span>
                        ${this.getAttributeName(hero.attribute)}
                    </div>
                    <div class="hero-roles">
                        ${hero.roles.map(role => `<span class="role-tag">${role}</span>`).join('')}
                    </div>
                    <div class="hero-stats">
                        <div class="stat">
                            <div class="stat-value">${hero.stats.attack}</div>
                            <div class="stat-label">Атака</div>
                        </div>
                        <div class="stat">
                            <div class="stat-value">${hero.stats.defense}</div>
                            <div class="stat-label">Защита</div>
                        </div>
                        <div class="stat">
                            <div class="stat-value">${hero.stats.mobility}</div>
                            <div class="stat-label">Мобильность</div>
                        </div>
                    </div>
                </div>
                <div class="hero-info">
                    <p class="hero-description">${hero.description}</p>
                    <ul class="hero-abilities">
                        ${hero.abilities.map(ability => `<li>${ability}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `).join('');
    }
    
    getAttributeIcon(attribute) {
        const icons = {
            strength: '💪',
            agility: '⚡',
            intelligence: '🧠',
            universal: '🌟'
        };
        return icons[attribute] || '❓';
    }
    
    getAttributeName(attribute) {
        const names = {
            strength: 'Сила',
            agility: 'Ловкость',
            intelligence: 'Интеллект',
            universal: 'Универсальный'
        };
        return names[attribute] || 'Неизвестно';
    }
}
document.addEventListener('DOMContentLoaded', () => {
    new HeroesPage();
    new ThemeToggle();
});