/**
 * FreshLeaf Market - Products Catalog & Multi-Category Filtering (products.js)
 * Supports dynamic URL query parsing (?cat=vegetables, ?cat=fruits, etc.),
 * live category counts, price/rating/organic filters, and instant reactive rendering.
 */

const freshProducts = [
  // 1. Vegetables
  {
    id: 'prod-1',
    name: 'Fresh Farm Vine Tomatoes',
    category: 'vegetables',
    categoryName: 'Vegetables',
    price: 45,
    oldPrice: 60,
    unit: '1 kg',
    rating: 4.9,
    reviewsCount: 128,
    isOrganic: true,
    isDeal: true,
    isSeasonal: false,
    inStock: true,
    farmer: 'Anand Bio Farms, Nashik',
    image: 'assets/images/products/vine-tomatoes.jpg',
    description: 'Vine-ripened, naturally grown juicy farm tomatoes packed with antioxidants and rich flavor.'
  },
  {
    id: 'prod-4',
    name: 'Crunchy Orange Carrots',
    category: 'vegetables',
    categoryName: 'Vegetables',
    price: 50,
    oldPrice: 65,
    unit: '1 kg',
    rating: 4.7,
    reviewsCount: 76,
    isOrganic: true,
    isDeal: false,
    isSeasonal: false,
    inStock: true,
    farmer: 'Nilgiri Mountain Farms, Ooty',
    image: 'assets/images/products/carrots.jpg',
    description: 'Sweet, crisp mountain-grown carrots perfect for fresh salads, juices, and stir-fries.'
  },
  {
    id: 'prod-5',
    name: 'Crisp Green Bell Peppers',
    category: 'vegetables',
    categoryName: 'Vegetables',
    price: 60,
    oldPrice: 75,
    unit: '500 g',
    rating: 4.6,
    reviewsCount: 52,
    isOrganic: true,
    isDeal: false,
    isSeasonal: false,
    inStock: true,
    farmer: 'Shekhar Organic Estate, Satara',
    image: 'assets/images/products/bell-peppers.jpg',
    description: 'Glossy, crunchy bell capsicums harvested fresh daily from climate-monitored greenhouses.'
  },
  {
    id: 'prod-11',
    name: 'Golden Farm Baby Potatoes',
    category: 'vegetables',
    categoryName: 'Vegetables',
    price: 35,
    oldPrice: 45,
    unit: '1 kg',
    rating: 4.6,
    reviewsCount: 65,
    isOrganic: false,
    isDeal: false,
    isSeasonal: false,
    inStock: true,
    farmer: 'Indore Fresh Growers',
    image: 'assets/images/products/baby-potatoes.jpg',
    description: 'Tender baby potatoes ideal for roasting, dum aloo, and crispy baked side dishes.'
  },
  {
    id: 'prod-24',
    name: 'Fresh Purple Eggplants (Baingan)',
    category: 'vegetables',
    categoryName: 'Vegetables',
    price: 40,
    oldPrice: 55,
    unit: '500 g',
    rating: 4.8,
    reviewsCount: 42,
    isOrganic: true,
    isDeal: true,
    isSeasonal: false,
    inStock: true,
    farmer: 'Malwa Organic Bio-Farm',
    image: 'assets/images/products/purple-eggplants.jpg',
    description: 'Glossy tender eggplants with delicate seeds and rich flavor for curries and bharta.'
  },
  {
    id: 'prod-25',
    name: 'Farm Fresh Organic Red Onions',
    category: 'vegetables',
    categoryName: 'Vegetables',
    price: 38,
    oldPrice: 50,
    unit: '1 kg',
    rating: 4.9,
    reviewsCount: 115,
    isOrganic: true,
    isDeal: false,
    isSeasonal: false,
    inStock: true,
    farmer: 'Lasalgaon Farm Collective, Nashik',
    image: 'assets/images/products/red-onions.jpg',
    description: 'Pungent, firm red onions dried naturally under farm sunshine for long shelf freshness.'
  },

  // 2. Fruits
  {
    id: 'prod-3',
    name: 'Ratnagiri Alphonso Mangoes',
    category: 'fruits',
    categoryName: 'Fruits',
    price: 650,
    oldPrice: 850,
    unit: '1 Box (6 pcs)',
    rating: 5.0,
    reviewsCount: 310,
    isOrganic: true,
    isDeal: true,
    isSeasonal: true,
    inStock: true,
    farmer: 'Kokana Heritage Orchards, Ratnagiri',
    image: 'assets/images/products/alphonso-mangoes.jpg',
    description: 'GI-tagged authentic Ratnagiri Alphonso mangoes, naturally tree-ripened with intense aroma.'
  },
  {
    id: 'prod-7',
    name: 'Organic Kashmiri Red Apples',
    category: 'fruits',
    categoryName: 'Fruits',
    price: 180,
    oldPrice: 220,
    unit: '1 kg',
    rating: 4.8,
    reviewsCount: 142,
    isOrganic: true,
    isDeal: true,
    isSeasonal: false,
    inStock: true,
    farmer: 'Valley Blossom Orchards, Sopore',
    image: 'assets/images/products/red-apples.jpg',
    description: 'Hand-picked crisp Kashmiri apples with natural sweetness and no artificial wax coating.'
  },
  {
    id: 'prod-9',
    name: 'Fresh Organic Yellow Bananas',
    category: 'fruits',
    categoryName: 'Fruits',
    price: 45,
    oldPrice: 55,
    unit: '1 Dozen',
    rating: 4.7,
    reviewsCount: 110,
    isOrganic: true,
    isDeal: false,
    isSeasonal: false,
    inStock: true,
    farmer: 'Cauvery River Farms, Erode',
    image: 'assets/images/products/yellow-bananas.jpg',
    description: 'Naturally ripened Robusta bananas rich in potassium, fiber, and sustained natural energy.'
  },
  {
    id: 'prod-12',
    name: 'Sweet Striped Watermelon',
    category: 'fruits',
    categoryName: 'Fruits',
    price: 90,
    oldPrice: 120,
    unit: '1 Whole (approx 3kg)',
    rating: 4.8,
    reviewsCount: 89,
    isOrganic: true,
    isDeal: true,
    isSeasonal: true,
    inStock: true,
    farmer: 'Kaveri SunFields, Mysore',
    image: 'assets/images/products/watermelon.jpg',
    description: 'Deep red, sugar-sweet hydrating watermelon harvested at peak maturity.'
  },
  {
    id: 'prod-26',
    name: 'Sweet Ruby Pomegranate (Anar)',
    category: 'fruits',
    categoryName: 'Fruits',
    price: 150,
    oldPrice: 190,
    unit: '1 kg (approx 4 pcs)',
    rating: 4.9,
    reviewsCount: 78,
    isOrganic: true,
    isDeal: false,
    isSeasonal: false,
    inStock: true,
    farmer: 'Solapur Bio Fruit Collective',
    image: 'assets/images/products/pomegranate.jpg',
    description: 'Juicy ruby pearls packed with vital antioxidants, iron, and rich tart sweetness.'
  },

  // 3. Leafy Greens & Hydroponics
  {
    id: 'prod-2',
    name: 'Tender Baby Spinach (Palak)',
    category: 'leafy-greens',
    categoryName: 'Leafy Greens',
    price: 30,
    oldPrice: 40,
    unit: '1 Bunch (250g)',
    rating: 4.8,
    reviewsCount: 94,
    isOrganic: true,
    isDeal: false,
    isSeasonal: true,
    inStock: true,
    farmer: 'GreenValley Hydroponics, Pune',
    image: 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=600&q=80',
    description: 'Crisp, iron-rich tender spinach leaves harvested at daybreak with zero chemical pesticides.'
  },
  {
    id: 'prod-13',
    name: 'Hydroponic Butterhead Lettuce',
    category: 'leafy-greens',
    categoryName: 'Leafy Greens',
    price: 45,
    oldPrice: 60,
    unit: '1 Whole Head',
    rating: 4.9,
    reviewsCount: 63,
    isOrganic: true,
    isDeal: true,
    isSeasonal: false,
    inStock: true,
    farmer: 'UrbanGreens Hydroponics, Pune',
    image: 'https://images.unsplash.com/photo-1556784344-ad913c73cfc4?auto=format&fit=crop&w=600&q=80',
    description: 'Silky, tender sweet lettuce heads grown in nutrient-balanced RO water with 0 soil dirt.'
  },
  {
    id: 'prod-14',
    name: 'Fresh Organic Methi (Fenugreek)',
    category: 'leafy-greens',
    categoryName: 'Leafy Greens',
    price: 25,
    oldPrice: 35,
    unit: '1 Bunch (200g)',
    rating: 4.7,
    reviewsCount: 51,
    isOrganic: true,
    isDeal: false,
    isSeasonal: true,
    inStock: true,
    farmer: 'Baramati Bio Agri Farms',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80',
    description: 'Aromatic tender methi leaves harvested fresh at sunrise for rotis, theplas, and curries.'
  },

  // 4. Kitchen Herbs & Aromatics
  {
    id: 'prod-6',
    name: 'Fresh Italian Sweet Basil',
    category: 'herbs',
    categoryName: 'Herbs & Seasoning',
    price: 35,
    oldPrice: 45,
    unit: '100 g',
    rating: 4.9,
    reviewsCount: 68,
    isOrganic: true,
    isDeal: false,
    isSeasonal: true,
    inStock: true,
    farmer: 'Aroma Herb Fields, Bengaluru',
    image: 'https://images.unsplash.com/photo-1608686207856-001b95cf60ca?auto=format&fit=crop&w=600&q=80',
    description: 'Aromatic, hand-clipped sweet basil leaves bursting with essential oils for pestos & pasta.'
  },
  {
    id: 'prod-16',
    name: 'Fresh Garden Mint (Pudina)',
    category: 'herbs',
    categoryName: 'Herbs & Seasoning',
    price: 20,
    oldPrice: 30,
    unit: '1 Bunch (150g)',
    rating: 4.8,
    reviewsCount: 84,
    isOrganic: true,
    isDeal: false,
    isSeasonal: false,
    inStock: true,
    farmer: 'Mahabaleshwar Green Estates',
    image: 'https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?auto=format&fit=crop&w=600&q=80',
    description: 'Cooling, intensely aromatic mint leaves hand-harvested fresh for chutneys, teas, and mocktails.'
  },
  {
    id: 'prod-17',
    name: 'Organic Ginger & Garlic Combo',
    category: 'herbs',
    categoryName: 'Herbs & Seasoning',
    price: 55,
    oldPrice: 75,
    unit: '250g + 250g',
    rating: 4.9,
    reviewsCount: 119,
    isOrganic: true,
    isDeal: true,
    isSeasonal: false,
    inStock: true,
    farmer: 'Western Ghats Spices Estate',
    image: 'assets/images/products/ginger-garlic.jpg',
    description: 'Pungent, fiber-free fresh mountain ginger paired with heirloom organic garlic cloves.'
  },

  // 5. Dry Fruits & Nuts
  {
    id: 'prod-8',
    name: 'Premium California Almonds (Badam)',
    category: 'dry-fruits',
    categoryName: 'Dry Fruits & Nuts',
    price: 420,
    oldPrice: 500,
    unit: '500 g',
    rating: 4.9,
    reviewsCount: 88,
    isOrganic: true,
    isDeal: false,
    isSeasonal: false,
    inStock: true,
    farmer: 'SunGold Dry Produce Co.',
    image: 'https://images.unsplash.com/photo-1508061253366-f7da158b6d46?auto=format&fit=crop&w=600&q=80',
    description: 'Whole, raw, jumbo California almonds packed with protein, healthy fats, and Vitamin E.'
  },
  {
    id: 'prod-19',
    name: 'Royal Kashmiri Snow Walnuts (Akhrot)',
    category: 'dry-fruits',
    categoryName: 'Dry Fruits & Nuts',
    price: 480,
    oldPrice: 580,
    unit: '500 g Vacuum Pack',
    rating: 5.0,
    reviewsCount: 72,
    isOrganic: true,
    isDeal: true,
    isSeasonal: false,
    inStock: true,
    farmer: 'Sopore Valley Walnut Growers',
    image: 'assets/images/products/kashmiri-walnuts.jpg',
    description: 'Light amber, whole crisp walnut halves rich in plant-based Omega-3 fatty acids.'
  },

  // 6. Value & Family Combos
  {
    id: 'prod-10',
    name: 'Family Weekly Green Basket',
    category: 'combos',
    categoryName: 'Value Combos',
    price: 499,
    oldPrice: 650,
    unit: 'Combo Box (7 kg)',
    rating: 5.0,
    reviewsCount: 240,
    isOrganic: true,
    isDeal: true,
    isSeasonal: true,
    inStock: true,
    farmer: 'FreshLeaf Collective Farmers',
    image: 'https://images.unsplash.com/photo-1610348725531-843dff563e2c?auto=format&fit=crop&w=600&q=80',
    description: 'Assorted seasonal vegetables including tomatoes, potatoes, onions, spinach, carrots & herbs.'
  },
  {
    id: 'prod-22',
    name: 'Daily Salad & Detox Greens Box',
    category: 'combos',
    categoryName: 'Value Combos',
    price: 299,
    oldPrice: 380,
    unit: 'Combo Box (2.5 kg)',
    rating: 4.9,
    reviewsCount: 86,
    isOrganic: true,
    isDeal: true,
    isSeasonal: false,
    inStock: true,
    farmer: 'FreshLeaf Wellness Squad',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=600&q=80',
    description: 'Everything for crunchy diet salads: butterhead lettuce, cucumbers, carrots, baby tomatoes & herbs.'
  },
  {
    id: 'prod-23',
    name: 'Immunity Citrus & Orchard Fruit Box',
    category: 'combos',
    categoryName: 'Value Combos',
    price: 549,
    oldPrice: 690,
    unit: 'Box (4 kg assorted)',
    rating: 5.0,
    reviewsCount: 104,
    isOrganic: true,
    isDeal: true,
    isSeasonal: true,
    inStock: true,
    farmer: 'Orchard Alliance Farmers',
    image: 'https://images.unsplash.com/photo-1619566636858-adf3ef46400b?auto=format&fit=crop&w=600&q=80',
    description: 'Vitamin-C packed fruits: Kashmiri apples, Nagpur oranges, bananas, and sweet pomegranates.'
  }
];

const categoryMeta = {
  'all': {
    title: 'Fresh Farm Produce Catalog',
    breadcrumb: 'All Products',
    badge: '100% Farm-To-Table',
    subtitle: 'Explore our full harvest of certified organic vegetables, sweet orchard fruits, hydroponic greens, and pantry essentials.'
  },
  'vegetables': {
    title: 'Fresh Farm Vegetables',
    breadcrumb: 'Farm Vegetables',
    badge: 'Morning Harvest',
    subtitle: 'Locally grown, crisp vegetables harvested at dawn and delivered within 2 hours of picking.'
  },
  'fruits': {
    title: 'Sweet Orchard Fruits',
    breadcrumb: 'Orchard Fruits',
    badge: 'Naturally Tree-Ripened',
    subtitle: 'Hand-picked GI-tagged mangoes, Kashmiri apples, bananas, and seasonal orchard delights.'
  },
  'leafy-greens': {
    title: 'Hydroponic & Leafy Greens',
    breadcrumb: 'Hydroponic Greens',
    badge: 'Pesticide-Free Greens',
    subtitle: 'Nutrient-rich baby spinach, tender lettuce heads, and microgreens grown in clean RO water.'
  },
  'herbs': {
    title: 'Fresh Kitchen Herbs & Seasoning',
    breadcrumb: 'Kitchen Herbs',
    badge: 'Culinary Aromatics',
    subtitle: 'Fragrant sweet basil, cooling mint, coriander, and mountain ginger for authentic home cuisine.'
  },
  'dry-fruits': {
    title: 'Premium Dry Fruits & Nuts',
    breadcrumb: 'Dry Fruits & Nuts',
    badge: 'Superfood Nutrition',
    subtitle: 'Jumbo California almonds, snow-white Kashmiri walnuts, cashews, and organic energy dates.'
  },
  'combos': {
    title: 'Curated Value & Family Combos',
    breadcrumb: 'Value Combos',
    badge: 'Best Value Baskets',
    subtitle: 'Convenient curated harvest boxes that save up to 25% on weekly family grocery shopping.'
  },
  'organic': {
    title: '100% Certified Organic Harvest',
    breadcrumb: 'Certified Organic',
    badge: 'Zero Chemical Residue',
    subtitle: 'Lab-tested organic produce grown strictly without synthetic fertilizers or chemical sprays.'
  }
};

let activeCategory = 'all';
let maxPrice = 1000;
let onlyOrganic = false;
let onlyInStock = false;
let minRating = 0;
let searchQuery = '';
let sortBy = 'featured';
let currentLayout = 'grid';

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('productsContainer');
  if (container) {
    initProductFilters();
    parseUrlCategory();
    updateCategoryCountBadges();
    renderProducts();
  }

  // Intercept category links across the page if already on products.html
  bindCategoryLinks();
});

// Support Browser Back/Forward buttons without full page reloads
window.addEventListener('popstate', () => {
  const container = document.getElementById('productsContainer');
  if (container) {
    parseUrlCategory();
    renderProducts();
  }
});

function parseUrlCategory() {
  const urlParams = new URLSearchParams(window.location.search);
  const cat = urlParams.get('cat') || urlParams.get('category');
  const organic = urlParams.get('organic');
  const search = urlParams.get('search') || urlParams.get('q');

  if (cat) {
    if (cat === 'organic') {
      onlyOrganic = true;
      activeCategory = 'all';
      const organicCheck = document.getElementById('filterOrganicCheck');
      if (organicCheck) organicCheck.checked = true;
    } else if (categoryMeta[cat]) {
      activeCategory = cat;
    } else {
      activeCategory = 'all';
    }
  } else {
    activeCategory = 'all';
  }

  if (organic === 'true' || organic === '1') {
    onlyOrganic = true;
    const organicCheck = document.getElementById('filterOrganicCheck');
    if (organicCheck) organicCheck.checked = true;
  }

  if (search) {
    searchQuery = search.toLowerCase().trim();
    const searchInput = document.getElementById('productSearchInput');
    if (searchInput) searchInput.value = search;
  }

  applyCategoryUI(activeCategory);
}

function applyCategoryUI(cat) {
  // Update sidebar active classes
  document.querySelectorAll('[data-filter-category]').forEach(btn => {
    if (btn.dataset.filterCategory === cat) {
      btn.classList.add('active', 'fw-bold', 'text-success');
    } else {
      btn.classList.remove('active', 'fw-bold', 'text-success');
    }
  });

  // Update Page Title, Breadcrumb & Subtitle if elements exist
  const meta = categoryMeta[cat] || categoryMeta['all'];
  const titleEl = document.getElementById('productsPageTitle');
  const breadcrumbEl = document.getElementById('productsBreadcrumbCurrent');
  const subtitleEl = document.getElementById('productsPageSubtitle');
  const badgeEl = document.getElementById('productsPageBadge');

  if (titleEl) titleEl.textContent = meta.title;
  if (breadcrumbEl) breadcrumbEl.textContent = meta.breadcrumb;
  if (subtitleEl) subtitleEl.textContent = meta.subtitle;
  if (badgeEl) badgeEl.textContent = meta.badge;
}

function selectCategory(cat, e) {
  if (e) e.preventDefault();
  activeCategory = cat || 'all';

  // Push new state to browser history
  const newUrl = activeCategory === 'all' ? 'products.html' : `products.html?cat=${encodeURIComponent(activeCategory)}`;
  window.history.pushState({ category: activeCategory }, '', newUrl);

  applyCategoryUI(activeCategory);
  renderProducts();

  // Scroll gently up to the product catalog area
  const scrollTarget = document.getElementById('productsCatalogSection') || document.getElementById('productsContainer');
  if (scrollTarget) {
    scrollTarget.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function bindCategoryLinks() {
  // Intercept footer & internal category links
  document.querySelectorAll('a[href*="products.html?cat="], a[href*="products.html?category="]').forEach(link => {
    link.addEventListener('click', (e) => {
      // If we are currently on products.html, switch category dynamically without full reload
      if (window.location.pathname.endsWith('products.html') || window.location.pathname.endsWith('products')) {
        e.preventDefault();
        try {
          const url = new URL(link.href, window.location.origin);
          const targetCat = url.searchParams.get('cat') || url.searchParams.get('category');
          if (targetCat) {
            selectCategory(targetCat, e);
          }
        } catch (err) {
          // fallback to default navigation
        }
      }
    });
  });
}

function updateCategoryCountBadges() {
  const counts = {
    all: freshProducts.length,
    vegetables: 0,
    fruits: 0,
    'leafy-greens': 0,
    herbs: 0,
    'dry-fruits': 0,
    combos: 0
  };

  freshProducts.forEach(p => {
    if (counts[p.category] !== undefined) {
      counts[p.category]++;
    }
  });

  document.querySelectorAll('[data-filter-category]').forEach(btn => {
    const cat = btn.dataset.filterCategory;
    const badge = btn.querySelector('.badge');
    if (badge && counts[cat] !== undefined) {
      badge.textContent = counts[cat];
    }
  });
}

function initProductFilters() {
  // Category Click Listeners in Sidebar
  document.querySelectorAll('[data-filter-category]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const cat = btn.dataset.filterCategory;
      selectCategory(cat, e);
    });
  });

  // Price Slider
  const priceSlider = document.getElementById('priceRangeSlider');
  const priceLabel = document.getElementById('priceRangeVal');
  if (priceSlider && priceLabel) {
    priceSlider.addEventListener('input', (e) => {
      maxPrice = parseInt(e.target.value);
      priceLabel.textContent = `₹${maxPrice}`;
      renderProducts();
    });
  }

  // Organic Toggle
  const organicCheck = document.getElementById('filterOrganicCheck');
  if (organicCheck) {
    organicCheck.addEventListener('change', (e) => {
      onlyOrganic = e.target.checked;
      renderProducts();
    });
  }

  // Stock Toggle
  const stockCheck = document.getElementById('filterStockCheck');
  if (stockCheck) {
    stockCheck.addEventListener('change', (e) => {
      onlyInStock = e.target.checked;
      renderProducts();
    });
  }

  // Rating Filter
  document.querySelectorAll('input[name="ratingFilter"]').forEach(radio => {
    radio.addEventListener('change', (e) => {
      minRating = parseFloat(e.target.value) || 0;
      renderProducts();
    });
  });

  // Live Search Input
  const searchInput = document.getElementById('productSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      renderProducts();
    });
  }

  // Sort Dropdown
  const sortSelect = document.getElementById('productSortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      sortBy = e.target.value;
      renderProducts();
    });
  }

  // Grid / List Switcher
  const btnGrid = document.getElementById('viewGridBtn');
  const btnList = document.getElementById('viewListBtn');
  if (btnGrid && btnList) {
    btnGrid.addEventListener('click', () => {
      btnGrid.classList.add('active');
      btnList.classList.remove('active');
      currentLayout = 'grid';
      renderProducts();
    });
    btnList.addEventListener('click', () => {
      btnList.classList.add('active');
      btnGrid.classList.remove('active');
      currentLayout = 'list';
      renderProducts();
    });
  }
}

function getFilteredProducts() {
  return freshProducts.filter(p => {
    if (activeCategory !== 'all' && p.category !== activeCategory) return false;
    if (p.price > maxPrice) return false;
    if (onlyOrganic && !p.isOrganic) return false;
    if (onlyInStock && !p.inStock) return false;
    if (minRating > 0 && p.rating < minRating) return false;
    if (searchQuery && !p.name.toLowerCase().includes(searchQuery) && !p.categoryName.toLowerCase().includes(searchQuery)) return false;
    return true;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return 0; // featured
  });
}

function renderProducts() {
  const container = document.getElementById('productsContainer');
  const countEl = document.getElementById('productsCountLabel');
  if (!container) return;

  const filtered = getFilteredProducts();

  if (countEl) {
    const meta = categoryMeta[activeCategory] || categoryMeta['all'];
    countEl.innerHTML = `Showing <strong class="text-success">${filtered.length}</strong> of ${freshProducts.length} items ${activeCategory !== 'all' ? `in <span class="badge bg-success-subtle text-success">${meta.breadcrumb}</span>` : ''}`;
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-12 text-center py-5">
        <div class="mb-3 text-muted" style="font-size: 3.5rem;">
          <i class="bi bi-search"></i>
        </div>
        <h4 class="fw-bold">No Fresh Produce Found</h4>
        <p class="text-muted">No produce matches your current filters for <strong>${categoryMeta[activeCategory]?.breadcrumb || 'this category'}</strong>.</p>
        <button class="btn btn-fresh btn-fresh-primary btn-fresh-sm mt-2" onclick="resetFilters()">
          <i class="bi bi-arrow-counterclockwise me-1"></i> Reset Filters & View All
        </button>
      </div>
    `;
    return;
  }

  const isList = currentLayout === 'list';
  const colClass = isList ? 'col-12 mb-4' : 'col-xl-4 col-lg-4 col-md-6 col-sm-6 mb-4';

  container.innerHTML = filtered.map(p => `
    <div class="${colClass}">
      <div class="product-card ${isList ? 'list-view' : ''}">
        <div class="product-thumb">
          <img src="${p.image}" alt="${p.name}" loading="lazy">
          <div class="product-badges">
            ${p.isOrganic ? '<span class="badge-pill badge-organic"><i class="bi bi-patch-check-fill"></i> Organic</span>' : ''}
            ${p.isDeal ? `<span class="badge-pill badge-deal">${Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100)}% OFF</span>` : ''}
            ${p.isSeasonal ? '<span class="badge-pill badge-seasonal"><i class="bi bi-sun-fill"></i> In Season</span>' : ''}
          </div>
          <div class="product-actions">
            <button class="product-action-btn" data-action="wishlist" 
                    data-id="${p.id}" 
                    data-name="${p.name}" 
                    data-price="${p.price}" 
                    data-old-price="${p.oldPrice || ''}" 
                    data-unit="${p.unit}" 
                    data-image="${p.image}" 
                    data-category="${p.categoryName}" 
                    data-farmer="${p.farmer}" 
                    title="Add to Wishlist">
              <i class="bi bi-heart"></i>
            </button>
            <button class="product-action-btn" data-action="quickview" 
                    data-id="${p.id}" 
                    data-name="${p.name}" 
                    data-price="${p.price}" 
                    data-old-price="${p.oldPrice}" 
                    data-unit="${p.unit}" 
                    data-image="${p.image}" 
                    data-category="${p.categoryName}" 
                    data-farmer="${p.farmer}" 
                    data-rating="${p.rating}" 
                    title="Quick View">
              <i class="bi bi-eye"></i>
            </button>
          </div>
        </div>
        <div class="product-body">
          <div class="product-category">${p.categoryName}</div>
          <h5 class="product-title">
            <a href="product-details.html">${p.name}</a>
          </h5>
          <div class="product-rating">
            <span><i class="bi bi-star-fill"></i> ${p.rating}</span>
            <span class="rating-count">(${p.reviewsCount})</span>
          </div>
          ${isList ? `<p class="text-muted small mb-3">${p.description}</p>` : ''}
          <div class="product-footer">
            <div class="product-price">
              <span class="current-price">₹${p.price}</span>
              ${p.oldPrice ? `<span class="original-price">₹${p.oldPrice}</span>` : ''}
              <span class="product-unit-label">/ ${p.unit}</span>
            </div>
            <button class="btn-add-cart" 
                    data-id="${p.id}" 
                    data-name="${p.name}" 
                    data-price="${p.price}" 
                    data-unit="${p.unit}" 
                    data-image="${p.image}" 
                    title="Add to Basket">
              <i class="bi bi-cart-plus"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

function resetFilters() {
  activeCategory = 'all';
  maxPrice = 1000;
  onlyOrganic = false;
  onlyInStock = false;
  minRating = 0;
  searchQuery = '';
  sortBy = 'featured';

  // Clear query string in browser URL
  window.history.pushState({}, '', 'products.html');

  const priceSlider = document.getElementById('priceRangeSlider');
  const priceLabel = document.getElementById('priceRangeVal');
  if (priceSlider && priceLabel) {
    priceSlider.value = 1000;
    priceLabel.textContent = '₹1000';
  }
  const organicCheck = document.getElementById('filterOrganicCheck');
  if (organicCheck) organicCheck.checked = false;
  const stockCheck = document.getElementById('filterStockCheck');
  if (stockCheck) stockCheck.checked = false;
  const searchInput = document.getElementById('productSearchInput');
  if (searchInput) searchInput.value = '';

  const rAll = document.getElementById('rAll');
  if (rAll) rAll.checked = true;

  applyCategoryUI('all');
  renderProducts();
}
