const popularMultiplayer = ["Counter-Strike 2", "Dota 2", "PUBG: BATTLEGROUNDS", "Apex Legends", "Fortnite", "Call of Duty: Warzone", "Overwatch 2", "Valorant", "League of Legends", "Rocket League", "Minecraft", "Roblox", "Grand Theft Auto Online", "Tom Clancy's Rainbow Six Siege", "Rust", "Dead by Daylight", "Warframe", "Destiny 2", "Marvel Rivals", "Palworld", "Helldivers 2", "Team Fortress 2", "The Finals", "Delta Force", "Battlefield 2042", "Call of Duty: Black Ops 6", "Call of Duty: Modern Warfare III", "Escape from Tarkov", "Hunt: Showdown 1896", "DayZ", "ARK: Survival Ascended", "ARK: Survival Evolved", "Sea of Thieves", "No Man's Sky", "Fall Guys", "Among Us", "Brawlhalla", "Street Fighter 6", "Tekken 8", "Mortal Kombat 1", "EA Sports FC 26", "NBA 2K26", "NBA 2K25", "eFootball", "Forza Horizon 5", "Gran Turismo 7", "The Crew Motorfest", "Need for Speed Unbound", "iRacing", "Assetto Corsa Competizione", "World of Warcraft", "Final Fantasy XIV Online", "The Elder Scrolls Online", "Guild Wars 2", "Lost Ark", "Black Desert", "New World: Aeternum", "Path of Exile", "Path of Exile 2", "Diablo IV", "Monster Hunter Wilds", "Monster Hunter: World", "Monster Hunter Rise", "Genshin Impact", "Honkai: Star Rail", "Wuthering Waves", "Once Human", "Throne and Liberty", "Albion Online", "EVE Online", "Old School RuneScape", "RuneScape", "World of Tanks", "World of Warships", "War Thunder", "Crossout", "Enlisted", "Squad", "Arma 3", "Ready or Not", "Insurgency: Sandstorm", "Chivalry 2", "Mordhau", "Deep Rock Galactic", "Left 4 Dead 2", "Payday 2", "Payday 3", "Phasmophobia", "Lethal Company", "Content Warning", "Project Zomboid", "Don't Starve Together", "Terraria", "Stardew Valley", "Valheim", "Raft", "Grounded", "Sons of the Forest", "7 Days to Die", "Core Keeper"];
    const popularSingleplayer = ["Cyberpunk 2077", "The Witcher 3: Wild Hunt", "Red Dead Redemption 2", "Baldur's Gate 3", "Elden Ring", "Black Myth: Wukong", "Hogwarts Legacy", "God of War Ragnarök", "God of War", "Marvel's Spider-Man 2", "Marvel's Spider-Man Remastered", "Marvel's Spider-Man: Miles Morales", "The Last of Us Part I", "The Last of Us Part II Remastered", "Ghost of Tsushima Director's Cut", "Horizon Forbidden West", "Horizon Zero Dawn Remastered", "Death Stranding Director's Cut", "Days Gone", "Uncharted: Legacy of Thieves Collection", "Resident Evil 4", "Resident Evil Village", "Resident Evil 2", "Resident Evil 3", "Resident Evil 7 Biohazard", "Silent Hill 2", "Alan Wake 2", "Control Ultimate Edition", "Dead Space", "The Callisto Protocol", "Assassin's Creed Shadows", "Assassin's Creed Valhalla", "Assassin's Creed Odyssey", "Assassin's Creed Origins", "Assassin's Creed Mirage", "Far Cry 6", "Far Cry 5", "Star Wars Outlaws", "Star Wars Jedi: Survivor", "Star Wars Jedi: Fallen Order", "Indiana Jones and the Great Circle", "Avowed", "Starfield", "The Elder Scrolls V: Skyrim Special Edition", "Fallout 4", "Fallout: New Vegas", "Mass Effect Legendary Edition", "Dragon Age: The Veilguard", "Dragon Age: Inquisition", "Kingdom Come: Deliverance II", "Kingdom Come: Deliverance", "Mount & Blade II: Bannerlord", "Final Fantasy VII Rebirth", "Final Fantasy VII Remake Intergrade", "Final Fantasy XVI", "Persona 5 Royal", "Persona 3 Reload", "Metaphor: ReFantazio", "Like a Dragon: Infinite Wealth", "Yakuza: Like a Dragon", "NieR: Automata", "Clair Obscur: Expedition 33", "Deathloop", "Dishonored 2", "Prey", "DOOM Eternal", "DOOM", "Wolfenstein II: The New Colossus", "Metro Exodus", "Atomic Heart", "S.T.A.L.K.E.R. 2: Heart of Chornobyl", "Dying Light 2 Stay Human", "Dying Light", "Hitman World of Assassination", "Metal Gear Solid V: The Phantom Pain", "Sekiro: Shadows Die Twice", "Lies of P", "Dark Souls III", "Nioh 2", "Wo Long: Fallen Dynasty", "Remnant II", "Armored Core VI: Fires of Rubicon", "Devil May Cry 5", "Bayonetta", "Hi-Fi Rush", "Hades", "Hades II", "Hollow Knight", "Ori and the Will of the Wisps", "Celeste", "Cuphead", "Dave the Diver", "Balatro", "Vampire Survivors", "Slay the Spire", "Disco Elysium", "Outer Wilds", "Subnautica", "Factorio", "RimWorld"];

    function makeCode(title) {
      return title
        .replace(/[^a-zA-Z0-9а-яА-ЯёЁ ]/g, "")
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 3)
        .map(word => word[0])
        .join("")
        .toUpperCase()
        .slice(0, 4) || "GAME";
    }

    function addPopularGames(titles, category) {
      titles.forEach((title) => {
        const key = normalize(title);
        if (catalog[key]) {
          catalog[key].category = category;
          return;
        }
        catalog[key] = {
          title,
          aliases: [],
          code: makeCode(title),
          category,
          meta: category === "Многопользовательская"
            ? "Популярная многопользовательская игра"
            : "Популярная одиночная игра",
          colors: category === "Многопользовательская"
            ? ["#1c5c72", "#252b54", "#12182e"]
            : ["#714128", "#47305f", "#12182e"],
          cover: "",
          offers: []
        };
      });
    }

    addPopularGames(popularMultiplayer, "Многопользовательская");
    addPopularGames(popularSingleplayer, "Одиночная");

    const form = document.getElementById("searchForm");
    const input = document.getElementById("searchInput");
    const suggestions = document.getElementById("suggestions");
    const offersList = document.getElementById("offersList");
    const gameCard = document.getElementById("gameCard");
    const emptyState = document.getElementById("emptyState");
    const gameTitle = document.getElementById("gameTitle");
    const catalogBadge = document.getElementById("catalogBadge");
    const resultText = document.getElementById("resultText");
    const sortSelect = document.getElementById("sortSelect");
    const platformSelect = document.getElementById("platformSelect");
    const coverCode = document.getElementById("coverCode");
    const coverMeta = document.getElementById("coverMeta");
    const gameCover = document.getElementById("gameCover");

    let currentOffers = [];
    let activeSuggestion = -1;
    let visibleMatches = [];

    function normalize(value) {
      return value.trim().toLowerCase().replace(/\s+/g, " ");
    }

    function formatPrice(value) {
      return value === 0 ? "Бесплатно" : new Intl.NumberFormat("ru-RU").format(value) + " ₽";
    }

    function searchableValues(item) {
      return [item.title, ...(item.aliases || [])].map(normalize);
    }

    function findMatches(query) {
      const q = normalize(query);
      if (!q) return [];
      const all = Object.values(catalog);
      const starts = all.filter(item => searchableValues(item).some(value => value.startsWith(q)));
      const contains = all.filter(item =>
        !starts.includes(item) && searchableValues(item).some(value => value.includes(q))
      );
      return [...starts, ...contains].slice(0, 8);
    }

    function findExactOrFirst(query) {
      const q = normalize(query);
      const exact = Object.values(catalog).find(item =>
        searchableValues(item).some(value => value === q)
      );
      return exact || findMatches(q)[0] || null;
    }

    function renderSuggestions() {
      visibleMatches = findMatches(input.value);
      activeSuggestion = -1;

      if (!input.value.trim() || visibleMatches.length === 0) {
        suggestions.classList.remove("visible");
        suggestions.innerHTML = "";
        return;
      }

      suggestions.innerHTML = visibleMatches.map((item, index) => `
        <button class="suggestion" type="button" data-index="${index}" role="option">
          <span class="suggestion-info">
            <span class="suggestion-name">${item.title}</span>
            <span class="suggestion-category">${item.category || "Игра"}</span>
          </span>
          <span class="suggestion-meta">${item.meta}</span>
        </button>
      `).join("");

      suggestions.classList.add("visible");

      suggestions.querySelectorAll(".suggestion").forEach(button => {
        button.addEventListener("click", () => {
          selectSuggestion(Number(button.dataset.index));
        });
      });
    }

    function updateSuggestionHighlight() {
      suggestions.querySelectorAll(".suggestion").forEach((node, index) => {
        node.classList.toggle("active", index === activeSuggestion);
      });
    }

    function selectSuggestion(index) {
      const item = visibleMatches[index];
      if (!item) return;
      input.value = item.title;
      suggestions.classList.remove("visible");
      showGame(item);
    }

    function refreshPlatformOptions() {
      const stores = [...new Set(currentOffers.map(offer => offer.store))];
      const currentValue = platformSelect.value;
      platformSelect.innerHTML = '<option value="all">Все площадки</option>' +
        stores.map(store => `<option value="${store}">${store}</option>`).join("");
      platformSelect.value = stores.includes(currentValue) ? currentValue : "all";
    }

    function renderOffers() {
      const direction = sortSelect.value;
      const selectedPlatform = platformSelect.value;

      const filtered = currentOffers
        .filter(offer => selectedPlatform === "all" || offer.store === selectedPlatform)
        .sort((a, b) => direction === "asc" ? a.price - b.price : b.price - a.price);

      offersList.innerHTML = filtered.map(offer => `
        <div class="offer">
          <div class="store">
            <span class="store-icon">${offer.icon}</span>
            <span>${offer.store}</span>
          </div>
          <div class="edition">${offer.edition}</div>
          <div class="region">${offer.region}</div>
          <div class="price">
            <strong>${formatPrice(offer.price)}</strong>
            <span>${offer.note}</span>
          </div>
          <button class="buy-btn" onclick="alert('В рабочей версии здесь будет партнёрская ссылка на магазин.')">Перейти</button>
        </div>
      `).join("");

      if (filtered.length === 0) {
        offersList.innerHTML = '<div class="empty" style="display:block">Игра уже есть в поиске, но реальные предложения магазинов для неё пока не подключены.</div>';
      }
    }

    function showGame(item) {
      if (!item) {
        gameCard.style.display = "none";
        emptyState.style.display = "block";
        resultText.textContent = "Ничего не найдено";
        return;
      }

      gameCard.style.display = "grid";
      emptyState.style.display = "none";
      gameTitle.textContent = item.title;
      catalogBadge.textContent = item.category || "Игра";
      coverCode.textContent = item.code;
      coverMeta.textContent = item.meta;
      gameCover.style.backgroundImage = item.cover
        ? `linear-gradient(180deg, rgba(0,0,0,0.04), rgba(0,0,0,0.72)), url("${item.cover}")`
        : `linear-gradient(135deg, ${item.colors[0]}, ${item.colors[1]} 55%, ${item.colors[2]})`;
      currentOffers = item.offers || [];
      refreshPlatformOptions();
      resultText.textContent = currentOffers.length
        ? `Найдено ${currentOffers.length} предложения для ${item.title}`
        : `${item.title} добавлена в каталог. Цены подключим после интеграции магазинов.`;
      renderOffers();
    }

    function runSearch() {
      suggestions.classList.remove("visible");
      showGame(findExactOrFirst(input.value));
    }

    input.addEventListener("input", renderSuggestions);

    input.addEventListener("keydown", (event) => {
      if (!suggestions.classList.contains("visible")) return;

      if (event.key === "ArrowDown") {
        event.preventDefault();
        activeSuggestion = Math.min(activeSuggestion + 1, visibleMatches.length - 1);
        updateSuggestionHighlight();
      } else if (event.key === "ArrowUp") {
        event.preventDefault();
        activeSuggestion = Math.max(activeSuggestion - 1, 0);
        updateSuggestionHighlight();
      } else if (event.key === "Enter" && activeSuggestion >= 0) {
        event.preventDefault();
        selectSuggestion(activeSuggestion);
      } else if (event.key === "Escape") {
        suggestions.classList.remove("visible");
      }
    });

    document.addEventListener("click", (event) => {
      if (!event.target.closest(".search-shell")) {
        suggestions.classList.remove("visible");
      }
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      runSearch();
    });

    sortSelect.addEventListener("change", renderOffers);
    platformSelect.addEventListener("change", renderOffers);

    showGame(catalog["dead by daylight"]);