class MetaPage {
    constructor() {
        this.tierFilterButtons = document.querySelectorAll('.tier-filter-btn');
        this.currentRoleFilter = 'all';
        this.init();
    }
    init() {
        this.addEventListeners();
        this.filterTierList(); 
    }
    addEventListeners() {
        this.tierFilterButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                this.tierFilterButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.currentRoleFilter = btn.dataset.role;
                this.filterTierList();
            });
        });
    }
    filterTierList() {
        const allTiers = document.querySelectorAll('.tier-tier');
        let hasVisibleTiers = false;
        allTiers.forEach(tier => {
            const heroes = tier.querySelectorAll('.tier-hero');
            let visibleHeroesCount = 0;
            heroes.forEach(hero => {
                if (this.currentRoleFilter === 'all' || hero.dataset.role === this.currentRoleFilter) {
                    hero.style.display = 'flex';
                    visibleHeroesCount++;
                } else {
                    hero.style.display = 'none';
                }
            });
            const existingEmptyMessage = tier.querySelector('.tier-empty');
            if (existingEmptyMessage) {
                existingEmptyMessage.remove();
            }
            if (visibleHeroesCount > 0) {
                tier.style.display = 'block';
                hasVisibleTiers = true;
            } else {
                tier.style.display = 'none';
            }
        });
        this.showEmptyMessage(!hasVisibleTiers);
    }
    
    showEmptyMessage(show) {
        const existingMessage = document.querySelector('.tier-empty-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        if (show) {
            const message = document.createElement('div');
            message.className = 'tier-empty-message tier-empty';
            message.textContent = `Герои с ролью "${this.getRoleName(this.currentRoleFilter)}" не найдены в текущем тир-листе.`;
            message.style.cssText = 'text-align: center; padding: 3rem; color: #888; font-size: 1.1rem;';
            
            const tierLists = document.querySelector('.tier-lists');
            if (tierLists) {
                tierLists.appendChild(message);
            }
        }
    }
    
    getRoleName(role) {
        const roles = {
            'all': 'все',
            'carry': 'керри',
            'mid': 'мид',
            'offlane': 'оффлейн',
            'support': 'саппорт'
        };
        return roles[role] || role;
    }
}
document.addEventListener('DOMContentLoaded', () => {
    new MetaPage();
    if (typeof ThemeToggle !== 'undefined') {
        new ThemeToggle();
    }
});
if (typeof ThemeToggle === 'undefined') {
    class ThemeToggle {
        constructor() {
            this.init();
        }
        
        init() {
            console.log('ThemeToggle fallback initialized');
        }
    }
}