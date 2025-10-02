class ItemsPage {
    constructor() {
        this.itemsGrid = document.getElementById('itemsGrid');
        this.searchInput = document.getElementById('itemSearch');
        this.filterButtons = document.querySelectorAll('.category-btn');
        this.currentFilter = 'all';
        this.searchTerm = '';
        
        this.items = [
            {
                "name": "Blink Dagger",
                "category": "Перемещение",
                "cost": 2250,
                "image": "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/items/blink.png",
                "stats": ["+ Мгновенное перемещение"],
                "description": "Позволяет мгновенно переместиться на короткое расстояние. Незаменим для инициаторов."
            },
            {
                "name": "Black King Bar",
                "category": "Защитные",
                "cost": 4050,
                "image": "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/items/black_king_bar.png",
                "stats": ["+ Сильное фиксированное сопротивление магии", "+ 10 силы", "+ 24 урона"],
                "description": "Дает сильное сопротивление магии и невосприимчивость эффектам. Ключевой предмет против контроля."
            },
            {
                "name": "Divine Rapier",
                "category": "Атакующие",
                "cost": 5950,
                "image": "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/items/rapier.png",
                "stats": ["+ 350 урона", "Все или ничего"],
                "description": "Мощнейший предмет атаки. При смерти выпадает и может быть поднят врагом."
            },
            {
                "name": "Tango",
                "category": "Начальные",
                "cost": 90,
                "image": "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/items/tango.png",
                "stats": ["+ Восстановление здоровья"],
                "description": "Восстанавливает здоровье при использовании на дереве. Базовый предмет для лайна. При использовании на Iron Branch восстанавливает в два раза больше."
            },
            {
                "name": "Magic Wand",
                "category": "Переходные",
                "cost": 450,
                "image": "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/items/magic_wand.png",
                "stats": ["+ Восстановление при зарядах", "+ 3 ко всем атрибутам"],
                "description": "Накопитель зарядов для мгновенного восстановления здоровья и маны. Накапливает заряды вражесскими заклинаниями"
            },
            {
                "name": "Force Staff",
                "category": "Саппортские",
                "cost": 2200,
                "image": "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/items/force_staff.png",
                "stats": ["+ Принудительное перемещение", "+ 10 интеллекта", "+ 2.5 регенерации маны"],
                "description": "Толкает выбраную цель в направлении движения. Универсальный инструмент спасения."
            },
            {
                "name": "Heart of Tarrasque",
                "category": "Защитные",
                "cost": 5200,
                "image": "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/items/heart.png",
                "stats": ["+ 500 здоровья", "+ 40 силы", "+ Регенерация здоровья"],
                "description": "Максимальное увеличение здоровья и регенерации. Идеален для танков."
            },
            {
                "name": "Daedalus",
                "category": "Атакующие",
                "cost": 5100,
                "image": "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/items/greater_crit.png",
                "stats": ["+ 88 урона", "+ Критический удар 225%"],
                "description": "Шанс нанесения критического урона. Увеличивает DPS керри."
            },
            {
                "name": "Boots of Travel",
                "category": "Перемещение",
                "cost": 2500,
                "image": "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/items/travel_boots.png",
                "stats": ["+ Телепортация к союзникам", "+ 100 скорости движения"],
                "description": "Позволяет телепортироваться к союзным юнитам. Максимальная мобильность по карте."
            },
            {
                "name": "Glimmer Cape",
                "category": "Саппортские",
                "cost": 1950,
                "image": "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/items/glimmer_cape.png",
                "stats": ["+ Невидимость для союзников", "+ 20% сопротивления магии"],
                "description": "Делает союзника невидимым и дает сопротивление магии. Отличный предмет для спасения."
            },
            {
                "name": "Power Treads",
                "category": "Переходные",
                "cost": 1400,
                "image": "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/items/power_treads.png",
                "stats": ["+ 45 скорости движения", "+ Переключение атрибутов", "+ 10 выбранного атрибута"],
                "description": "Ботинки с возможностью переключения между атрибутами. Универсальный выбор для керри."
            },
            {
                "name": "Observer Ward",
                "category": "Начальные",
                "cost": 0,
                "image": "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/items/ward_observer.png",
                "stats": ["+ Обзор территории"],
                "description": "Дает обзор вокруг себя для всех союзных юнитов. Бесплатно выдается каждые 3 минуты."
            }
        ];
        
        this.init();
    }
    
    init() {
        this.renderItems();
        this.addEventListeners();
    }
    
    addEventListeners() {
        this.filterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                this.filterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentFilter = btn.dataset.category;
                this.renderItems();
            });
        });
        this.searchInput.addEventListener('input', (e) => {
            this.searchTerm = e.target.value.toLowerCase();
            this.renderItems();
        });
    }
    
    getFilteredItems() {
        return this.items.filter(item => {
            const matchesFilter = this.currentFilter === 'all' || item.category === this.currentFilter;
            const matchesSearch = item.name.toLowerCase().includes(this.searchTerm);
            return matchesFilter && matchesSearch;
        });
    }
    
    renderItems() {
        const filteredItems = this.getFilteredItems();
        
        this.itemsGrid.innerHTML = filteredItems.map(item => `
            <div class="item-card" data-category="${item.category}">
                <div class="item-header">
                    <img src="${item.image}" alt="${item.name}" class="item-image" loading="lazy">
                    <div class="item-cost">${item.cost} золота</div>
                </div>
                <div class="item-content">
                    <h3 class="item-name">${item.name}</h3>
                    <div class="item-category ${item.category.toLowerCase()}">
                        <span class="category-icon">${this.getCategoryIcon(item.category)}</span>
                        ${item.category}
                    </div>
                    <p class="item-description">${item.description}</p>
                    <ul class="item-stats">
                        ${item.stats.map(stat => `<li>${stat}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `).join('');
    }
    
    getCategoryIcon(category) {
        const icons = {
            'Начальные': '🔰',
            'Переходные': '🔄',
            'Атакующие': '⚔️',
            'Защитные': '🛡️',
            'Перемещение': '👟',
            'Саппортские': '💝'
        };
        return icons[category] || '📦';
    }
}
document.addEventListener('DOMContentLoaded', () => {
    new ItemsPage();
    new ThemeToggle();
});