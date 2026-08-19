/**
 * FreshLeaf Market - Blog System (blog.js)
 * Manages Blog Filtering, Search, and Dynamic Article Details
 */

const BLOG_POSTS = [
  {
    id: 'post-1',
    category: 'recipes',
    categoryName: 'Recipes & Culinary',
    badgeClass: 'badge-organic',
    title: '5 Refreshing Summer Salads Using Sun-Ripened Vine Tomatoes & Sweet Basil',
    slug: 'summer-salads',
    excerpt: 'Crisp, hydrating recipes that highlight natural lycopene and cold-pressed olive oil for hot afternoons.',
    readTime: '5 min read',
    date: 'May 18, 2026',
    author: {
      name: 'Chef Priya Kulkarni',
      role: 'Culinary Advisor, FreshLeaf Market',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
      bio: 'Priya is a sustainable gastronomy advocate and culinary consultant helping families reconnect with indigenous seasonal eating.'
    },
    image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?auto=format&fit=crop&w=1200&q=80',
    tags: ['#OrganicTomatoes', '#SummerRecipes', '#CleanEating', '#FarmToTable'],
    content: `
      <p>
        When summer temperatures rise, heavy cooked meals can leave you feeling fatigued. That is when nature offers its most generous gift: <strong>sun-ripened vine tomatoes bursting with natural lycopene</strong>, paired with sweet basil plucked at sunrise.
      </p>

      <blockquote class="p-4 my-4 bg-surface rounded-4 border-start border-success border-4 fst-italic">
        "The secret to a world-class summer salad is not an intricate dressing; it is using produce that was still on the living plant six hours ago."
      </blockquote>

      <h3 class="fw-bold mt-4 mb-3">1. Classic Rustic Caprese with Sweet Basil</h3>
      <p>
        This timeless classic relies entirely on the quality of three core elements: firm vine tomatoes, artisanal fresh mozzarella (or silken tofu for a vegan twist), and freshly torn sweet basil leaves.
      </p>

      <div class="p-4 bg-card rounded-4 border my-4 shadow-sm">
        <h5 class="fw-bold text-success mb-3"><i class="bi bi-egg-fried me-2"></i> Ingredients (Serves 2-3)</h5>
        <div class="row g-2 small">
          <div class="col-sm-6"><i class="bi bi-check2 text-success me-2"></i> 400g FreshLeaf Vine Tomatoes (sliced)</div>
          <div class="col-sm-6"><i class="bi bi-check2 text-success me-2"></i> 1 Handful fresh sweet basil leaves</div>
          <div class="col-sm-6"><i class="bi bi-check2 text-success me-2"></i> 200g Fresh Mozzarella / Paneer</div>
          <div class="col-sm-6"><i class="bi bi-check2 text-success me-2"></i> 2 tbsp Cold-pressed Extra Virgin Olive Oil</div>
          <div class="col-sm-6"><i class="bi bi-check2 text-success me-2"></i> Flaky sea salt & freshly cracked black pepper</div>
          <div class="col-sm-6"><i class="bi bi-check2 text-success me-2"></i> 1 tsp Aged Balsamic Glaze</div>
        </div>
      </div>

      <h3 class="fw-bold mt-4 mb-3">2. Shaved Cucumber & Mountain Carrot Crunch</h3>
      <p>
        Use a standard vegetable peeler to shave thin ribbons of crisp mountain carrots and organic English cucumbers. Toss in chilled lemon-herb vinaigrette with toasted white sesame seeds for an invigorating texture.
      </p>

      <h3 class="fw-bold mt-4 mb-3">3. Hydrating Watermelon & Garden Mint Toss</h3>
      <p>
        Cube cold sweet striped watermelon into bite-sized chunks. Gently combine with crumbled goat feta, roughly chopped garden mint, and a zesty squeeze of fresh lime juice.
      </p>
    `
  },
  {
    id: 'post-2',
    category: 'nutrition',
    categoryName: 'Nutrition & Health',
    badgeClass: 'badge-fresh',
    title: 'The Healing Power of Daily Cold-Pressed Celery & Morning Green Juice',
    slug: 'celery-green-juice-healing',
    excerpt: 'How morning hydration with live plant electrolytes cleanses the liver and delivers natural bio-flavonoids.',
    readTime: '6 min read',
    date: 'May 16, 2026',
    author: {
      name: 'Dr. Rajesh Verma',
      role: 'Clinical Nutritionist & Dietitian',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      bio: 'Dr. Rajesh advises athletes and families on functional superfoods, gut biome restoration, and whole-fruit enzymes.'
    },
    image: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&w=1200&q=80',
    tags: ['#GreenJuice', '#LiverDetox', '#CellularHydration', '#PlantElectrolytes'],
    content: `
      <p>
        Starting your day with freshly extracted, slow-masticated green juice delivers bio-available potassium clusters and organic sodium salts directly to your bloodstream within 15 minutes of consumption.
      </p>

      <blockquote class="p-4 my-4 bg-surface rounded-4 border-start border-success border-4 fst-italic">
        "Cold-pressed green juice gives your digestive system a morning rest while saturating your cells with living chlorophyll."
      </blockquote>

      <h3 class="fw-bold mt-4 mb-3">Why Cold-Pressed Extraction Matters</h3>
      <p>
        Standard high-speed centrifugal juicers generate heat and friction that oxidize delicate enzymes. Slow mastication preserves Vitamin C, live enzymes, and organic trace minerals intact without heat degradation.
      </p>

      <div class="p-4 bg-card rounded-4 border my-4 shadow-sm">
        <h5 class="fw-bold text-success mb-3"><i class="bi bi-cup-straw me-2"></i> The Ideal Morning Green Blend</h5>
        <div class="row g-2 small">
          <div class="col-sm-6"><i class="bi bi-check2 text-success me-2"></i> 1 Head Crisp Organic Celery</div>
          <div class="col-sm-6"><i class="bi bi-check2 text-success me-2"></i> 1 Fresh Farm English Cucumber</div>
          <div class="col-sm-6"><i class="bi bi-check2 text-success me-2"></i> 1 Cup Baby Spinach Leaves</div>
          <div class="col-sm-6"><i class="bi bi-check2 text-success me-2"></i> 1-inch Fresh Ginger Root</div>
          <div class="col-sm-6"><i class="bi bi-check2 text-success me-2"></i> Squeeze of 1/2 fresh lime</div>
          <div class="col-sm-6"><i class="bi bi-check2 text-success me-2"></i> 1/2 Green Apple (optional sweetness)</div>
        </div>
      </div>
    `
  },
  {
    id: 'post-3',
    category: 'farming',
    categoryName: 'Urban Gardening',
    badgeClass: 'badge-organic',
    title: 'Beginner\'s Guide to Growing Coriander, Mint & Basil on a Sunny Balcony',
    slug: 'balcony-herb-garden-guide',
    excerpt: 'Simple pot soil mixes, watering rhythms, and sunlight hacks to harvest kitchen herbs right outside your window.',
    readTime: '5 min read',
    date: 'May 12, 2026',
    author: {
      name: 'Meera Sen',
      role: 'Zero-Waste Kitchen Stylist',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      bio: 'Meera is an urban horticulturist dedicated to teaching households zero-waste storage methods to eliminate food spoilage.'
    },
    image: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?auto=format&fit=crop&w=1200&q=80',
    tags: ['#BalconyGarden', '#HerbGrowing', '#UrbanHarvest', '#HomeGreens'],
    content: `
      <p>
        You do not need acres of farmland to experience the joy of harvesting fragrant herbs. A sunny windowsill or apartment balcony with 4 hours of indirect sunlight is all you need to grow fresh mint, sweet basil, and coriander.
      </p>

      <blockquote class="p-4 my-4 bg-surface rounded-4 border-start border-success border-4 fst-italic">
        "Fresh herbs harvested 30 seconds before tossing into a curry or salad contain 100% of their volatile essential oils."
      </blockquote>

      <h3 class="fw-bold mt-4 mb-3">The Golden 40-40-20 Potting Mix</h3>
      <p>
        Standard garden soil compacts in containers. Use this lightweight, aerated blend for explosive root development:
      </p>
      <ul class="small text-muted ps-3 mb-4">
        <li class="mb-2"><strong>40% Cocopeat:</strong> Retains moisture without waterlogging roots.</li>
        <li class="mb-2"><strong>40% Vermicompost:</strong> Provides rich organic microbes and slow-release nitrogen.</li>
        <li class="mb-2"><strong>20% Perlite or River Sand:</strong> Ensures rapid drainage and root aeration.</li>
      </ul>
    `
  },
  {
    id: 'post-4',
    category: 'recipes',
    categoryName: 'Seasonal Harvest',
    badgeClass: 'badge-fresh',
    title: '7 Nutrient-Dense Farm Root Vegetables to Power Your Family\'s Immunity',
    slug: 'root-vegetables-immunity',
    excerpt: 'From beetroot and sweet potatoes to fresh ginger and turmeric, uncover the healing subterranean roots.',
    readTime: '5 min read',
    date: 'May 09, 2026',
    author: {
      name: 'Dr. Arindam Bose',
      role: 'Soil Microbiologist & Agronomist',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      bio: 'Dr. Arindam specializes in fungal-bacterial root networks and organic microbial regenerative farming practices across Western India.'
    },
    image: 'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=1200&q=80',
    tags: ['#RootVegetables', '#ImmunityBoost', '#SeasonalEating', '#OrganicRoots'],
    content: `
      <p>
        Root vegetables absorb the deepest mineral reserves of the earth. Rich in complex dietary fibers, prebiotic inulin, and vital micronutrients, roots support digestive warmth and stamina.
      </p>

      <blockquote class="p-4 my-4 bg-surface rounded-4 border-start border-success border-4 fst-italic">
        "Subterranean vegetables act as natural energy batteries, storing solar power synthesized in leaves down into mineral-rich taproots."
      </blockquote>

      <h3 class="fw-bold mt-4 mb-3">The Super 7 Roots</h3>
      <div class="row g-3 my-3">
        <div class="col-sm-6">
          <div class="p-3 bg-card rounded-3 border">
            <h6 class="fw-bold text-success mb-1">1. Mountain Carrots</h6>
            <p class="small text-muted mb-0">High beta-carotene for cellular eye health & skin glow.</p>
          </div>
        </div>
        <div class="col-sm-6">
          <div class="p-3 bg-card rounded-3 border">
            <h6 class="fw-bold text-success mb-1">2. Farm Beetroot</h6>
            <p class="small text-muted mb-0">Natural nitrates to boost stamina & arterial blood flow.</p>
          </div>
        </div>
        <div class="col-sm-6">
          <div class="p-3 bg-card rounded-3 border">
            <h6 class="fw-bold text-success mb-1">3. Fresh Wild Ginger</h6>
            <p class="small text-muted mb-0">Gingerols that stimulate digestive fire and soothe joints.</p>
          </div>
        </div>
        <div class="col-sm-6">
          <div class="p-3 bg-card rounded-3 border">
            <h6 class="fw-bold text-success mb-1">4. Raw Turmeric Rhizomes</h6>
            <p class="small text-muted mb-0">Potent curcumin with natural anti-inflammatory power.</p>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 'post-5',
    category: 'storage',
    categoryName: 'Storage Hacks',
    badgeClass: 'badge-fresh',
    title: 'Zero-Waste Kitchen: How to Keep Leafy Greens & Herbs Crisp for 14 Days',
    slug: 'storing-greens',
    excerpt: 'Proven damp cloth wrapping techniques and glass jar water stem hacks to eliminate food spoilage.',
    readTime: '4 min read',
    date: 'May 04, 2026',
    author: {
      name: 'Meera Sen',
      role: 'Zero-Waste Kitchen Stylist',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      bio: 'Meera is an urban horticulturist dedicated to teaching households zero-waste storage methods to eliminate food spoilage.'
    },
    image: 'https://images.unsplash.com/photo-1597362925123-77861d3fbac7?auto=format&fit=crop&w=1200&q=80',
    tags: ['#StorageHacks', '#ZeroWaste', '#LeafyGreens', '#FreshnessGuaranteed'],
    content: `
      <p>
        There is nothing more frustrating than buying a vibrant bunch of organic palak or coriander, only to find a slimy bag of yellowed leaves three days later in your crisper drawer. <strong>Leafy greens are living organisms that need breathability and controlled humidity.</strong>
      </p>

      <blockquote class="p-4 my-4 bg-surface rounded-4 border-start border-success border-4 fst-italic">
        "Rule #1 of vegetable storage: Never wash your leafy greens until the exact moment you are ready to prepare and cook them."
      </blockquote>

      <h3 class="fw-bold mt-4 mb-3">Hack 1: The Floral Stem Mason Jar Method (Coriander, Mint & Basil)</h3>
      <p>
        Treat your fresh herbs like fresh cut flowers! Trim 1/2 cm off the bottom stems, place them upright in a glass jar with 2 inches of filtered water, and cover loosely with a reusable cloth pouch. Store coriander and mint in the fridge door, and keep basil at room temperature away from direct sunlight.
      </p>

      <div class="p-4 bg-card rounded-4 border my-4 shadow-sm">
        <h5 class="fw-bold text-success mb-3"><i class="bi bi-box2-heart me-2"></i> Step-by-Step Spinach Preservation</h5>
        <ol class="small mb-0 ps-3">
          <li class="mb-2">Gently sort through your bundle and remove any bruised or damp outer leaves.</li>
          <li class="mb-2">Wrap the unwashed dry bunch in a slightly dampened muslin or cotton dish cloth.</li>
          <li class="mb-2">Place inside an airtight stainless steel or glass container in the vegetable crisper.</li>
          <li>Re-dampen the cloth once after 5 days. Your spinach will stay crunchy for 14+ days!</li>
        </ol>
      </div>
    `
  },
  {
    id: 'post-6',
    category: 'nutrition',
    categoryName: 'Nutrition & Health',
    badgeClass: 'badge-organic',
    title: 'The Ultimate Guide to Authentic Ratnagiri Alphonso Mango Health Facts',
    slug: 'mango-nutrition',
    excerpt: 'Debunking myths: natural sugars vs. industrial processing, digestion enzymes, and daily immunity perks.',
    readTime: '6 min read',
    date: 'April 28, 2026',
    author: {
      name: 'Dr. Rajesh Verma',
      role: 'Clinical Nutritionist & Dietitian',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      bio: 'Dr. Rajesh advises athletes and families on functional superfoods, gut biome restoration, and whole-fruit enzymes.'
    },
    image: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=1200&q=80',
    tags: ['#AlphonsoMangoes', '#NutritionFacts', '#Superfruits', '#ImmunityBoost'],
    content: `
      <p>
        Often crowned the 'King of Fruits', the GI-tagged <strong>Ratnagiri Alphonso Mango</strong> is renowned for its buttery saffron pulp and saffron-sweet aroma. But is mango healthy for everyday snacking?
      </p>

      <blockquote class="p-4 my-4 bg-surface rounded-4 border-start border-success border-4 fst-italic">
        "Whole tree-ripened mangoes deliver bioactive prebiotic fiber and amylase enzymes that actually aid digestion and balance glycemic impact."
      </blockquote>

      <h3 class="fw-bold mt-4 mb-3">Key Nutritional Highlights per 100g</h3>
      <div class="row g-3 my-3">
        <div class="col-sm-4">
          <div class="p-3 bg-card rounded-3 border text-center">
            <h4 class="fw-bold text-success mb-1">60 kcal</h4>
            <span class="small text-muted">Energy Density</span>
          </div>
        </div>
        <div class="col-sm-4">
          <div class="p-3 bg-card rounded-3 border text-center">
            <h4 class="fw-bold text-success mb-1">67% DV</h4>
            <span class="small text-muted">Vitamin C Immunity</span>
          </div>
        </div>
        <div class="col-sm-4">
          <div class="p-3 bg-card rounded-3 border text-center">
            <h4 class="fw-bold text-success mb-1">10% DV</h4>
            <span class="small text-muted">Vitamin A & Beta-Carotene</span>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 'post-7',
    category: 'farming',
    categoryName: 'Organic Farming',
    badgeClass: 'badge-fresh',
    title: 'Farmer Spotlight: How Ramesh Swapped Chemical Sprays for Bio-Compost',
    slug: 'farmer-spotlight-ramesh',
    excerpt: 'A story of courage, regenerative earth revival, and 30% higher agricultural yields in Nashik.',
    readTime: '5 min read',
    date: 'April 20, 2026',
    author: {
      name: 'Sameer Deshmukh',
      role: 'Head of Farm Partnerships',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
      bio: 'Sameer works directly with 120+ regional certified farming collectives across Maharashtra and Karnataka.'
    },
    image: 'https://images.unsplash.com/photo-1589923188900-85dae523342b?auto=format&fit=crop&w=1200&q=80',
    tags: ['#FarmerSpotlight', '#NaturalFarming', '#EthicalProduce', '#NashikFarms'],
    content: `
      <p>
        Five years ago, Ramesh Jagtap was spending over ₹1,20,000 every season on synthetic chemicals for his 6-acre farm in Dindori, Nashik. His soil had become hard as concrete, and earthworms were nowhere to be found.
      </p>

      <blockquote class="p-4 my-4 bg-surface rounded-4 border-start border-success border-4 fst-italic">
        "When I stopped poisoning my own mother earth, the birds returned, the soil turned dark and spongy, and my cabbage heads grew sweeter than ever."
      </blockquote>

      <h3 class="fw-bold mt-4 mb-3">The 3-Step Organic Transformation</h3>
      <ul class="small text-muted ps-3 mb-4">
        <li class="mb-2"><strong>Jivamrit Microbial Inoculant:</strong> Fermented indigenous cow dung, gram flour, jaggery, and forest virgin soil applied through drip irrigation.</li>
        <li class="mb-2"><strong>Neem & Agniastra Pest Repellers:</strong> Cold decoctions of crushed neem leaves, garlic, and wild chili that repel pests naturally.</li>
        <li class="mb-2"><strong>Companion Cropping:</strong> Inter-planting golden marigolds between tomato and eggplant beds to naturally protect roots.</li>
      </ul>
    `
  },
  {
    id: 'post-8',
    category: 'recipes',
    categoryName: 'Recipes & Culinary',
    badgeClass: 'badge-organic',
    title: 'Creamy Roasted Mountain Carrot & Fresh Ginger Detox Soup',
    slug: 'carrot-ginger-soup',
    excerpt: 'Warm, antioxidant-packed winter soup that boosts digestive fire and soothes seasonal colds.',
    readTime: '4 min read',
    date: 'April 15, 2026',
    author: {
      name: 'Chef Priya Kulkarni',
      role: 'Culinary Advisor, FreshLeaf Market',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80',
      bio: 'Priya is a sustainable gastronomy advocate and culinary consultant helping families reconnect with indigenous seasonal eating.'
    },
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=1200&q=80',
    tags: ['#DetoxSoup', '#CarrotGinger', '#WinterRecipes', '#WarmComfort'],
    content: `
      <p>
        When cool evening breezes roll in, nothing nourishes your body quite like a steaming bowl of <strong>slow-roasted red carrots simmered with freshly grated ginger root and creamy coconut milk</strong>.
      </p>

      <blockquote class="p-4 my-4 bg-surface rounded-4 border-start border-success border-4 fst-italic">
        "Roasting carrots caramelizes their natural sugars before they ever touch the soup pot, creating a silky texture without any added cornstarch or heavy cream."
      </blockquote>
    `
  }
];

document.addEventListener('DOMContentLoaded', () => {
  initBlogListPage();
  initBlogDetailsPage();
});

/**
 * Initialize Blog Listing Page (blog.html)
 */
function initBlogListPage() {
  const blogGrid = document.getElementById('blogGridContainer');
  const blogSearch = document.getElementById('blogSearchInput');
  const catPills = document.querySelectorAll('[data-blog-category]');

  if (!blogGrid) return;

  function renderBlogList() {
    const q = blogSearch ? blogSearch.value.toLowerCase().trim() : '';
    const activeCat = document.querySelector('[data-blog-category].active')?.dataset.blogCategory || 'all';

    const filtered = BLOG_POSTS.filter(post => {
      const matchesCategory = (activeCat === 'all' || post.category === activeCat);
      const matchesSearch = !q || 
        post.title.toLowerCase().includes(q) || 
        post.excerpt.toLowerCase().includes(q) ||
        post.author.name.toLowerCase().includes(q) ||
        post.categoryName.toLowerCase().includes(q);
      return matchesCategory && matchesSearch;
    });

    if (filtered.length === 0) {
      blogGrid.innerHTML = `
        <div class="col-12 text-center py-5">
          <div class="p-5 bg-card rounded-4 border">
            <i class="bi bi-search fs-1 text-muted mb-3 d-block"></i>
            <h4 class="fw-bold">No farm articles found</h4>
            <p class="text-muted mb-3">Try searching for other keywords like "recipes", "tomatoes", or "soil".</p>
            <button class="btn btn-fresh btn-fresh-primary btn-fresh-sm" onclick="document.getElementById('blogSearchInput').value=''; document.querySelector('[data-blog-category=\\'all\\']').click();">Reset Filters</button>
          </div>
        </div>
      `;
      return;
    }

    blogGrid.innerHTML = filtered.map(post => `
      <div class="col-lg-4 col-md-6 blog-card-item" data-category="${post.category}">
        <div class="blog-card h-100 d-flex flex-column">
          <a href="blog-details.html?id=${post.id}" class="blog-thumb">
            <img src="${post.image}" alt="${post.title}" loading="lazy">
          </a>
          <div class="blog-body d-flex flex-column flex-grow-1">
            <div class="blog-meta">
              <span><i class="bi bi-tag-fill text-success me-1"></i> ${post.categoryName}</span>
              <span><i class="bi bi-clock me-1"></i> ${post.readTime}</span>
            </div>
            <h4 class="blog-title">
              <a href="blog-details.html?id=${post.id}">${post.title}</a>
            </h4>
            <p class="blog-excerpt">${post.excerpt}</p>
            <div class="blog-footer mt-auto">
              <div class="blog-author">
                <img src="${post.author.avatar}" alt="${post.author.name}">
                <span>${post.author.name}</span>
              </div>
              <a href="blog-details.html?id=${post.id}" class="text-success fw-bold small">
                Read Story <i class="bi bi-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    `).join('');
  }

  // Initial render
  renderBlogList();

  if (blogSearch) {
    blogSearch.addEventListener('input', renderBlogList);
  }

  catPills.forEach(pill => {
    pill.addEventListener('click', (e) => {
      e.preventDefault();
      catPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      renderBlogList();
    });
  });
}

/**
 * Initialize Blog Details Page (blog-details.html)
 */
function initBlogDetailsPage() {
  const contentEl = document.getElementById('blogDetailContent');
  if (!contentEl) return;

  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get('id') || 'post-1';
  const post = BLOG_POSTS.find(p => p.id === postId) || BLOG_POSTS[0];

  // Set Page Title
  document.title = `${post.title} - FreshLeaf Market`;

  // Breadcrumb
  const breadcrumbEl = document.getElementById('blogDetailBreadcrumb');
  if (breadcrumbEl) breadcrumbEl.textContent = post.title;

  // Category & Meta
  const catEl = document.getElementById('blogDetailCategory');
  if (catEl) {
    catEl.textContent = post.categoryName;
    catEl.className = `badge-pill ${post.badgeClass} me-2`;
  }

  const dateEl = document.getElementById('blogDetailDate');
  if (dateEl) dateEl.innerHTML = `<i class="bi bi-clock me-1"></i> ${post.date} • ${post.readTime}`;

  // Title
  const titleEl = document.getElementById('blogDetailTitle');
  if (titleEl) titleEl.textContent = post.title;

  // Author Info
  const authorImg = document.getElementById('blogDetailAuthorImg');
  if (authorImg) {
    authorImg.src = post.author.avatar;
    authorImg.alt = post.author.name;
  }

  const authorName = document.getElementById('blogDetailAuthorName');
  if (authorName) authorName.textContent = `By ${post.author.name}`;

  const authorRole = document.getElementById('blogDetailAuthorRole');
  if (authorRole) authorRole.textContent = post.author.role;

  // Featured Image
  const heroImg = document.getElementById('blogDetailHeroImg');
  if (heroImg) {
    heroImg.src = post.image;
    heroImg.alt = post.title;
  }

  // Article Content
  contentEl.innerHTML = post.content;

  // Tags
  const tagsEl = document.getElementById('blogDetailTags');
  if (tagsEl) {
    tagsEl.innerHTML = `
      <strong class="small me-2"><i class="bi bi-tags-fill text-success"></i> Tags:</strong>
      ${post.tags.map(t => `<span class="badge bg-surface text-main p-2">${t}</span>`).join(' ')}
    `;
  }

  // Author Bio Section
  const bioImg = document.getElementById('blogDetailBioImg');
  if (bioImg) {
    bioImg.src = post.author.avatar;
    bioImg.alt = post.author.name;
  }

  const bioName = document.getElementById('blogDetailBioName');
  if (bioName) bioName.textContent = `About ${post.author.name}`;

  const bioText = document.getElementById('blogDetailBioText');
  if (bioText) bioText.textContent = post.author.bio;

  // Render Sidebar Recent Posts (excluding active post)
  const recentEl = document.getElementById('blogDetailRecentPosts');
  if (recentEl) {
    const otherPosts = BLOG_POSTS.filter(p => p.id !== post.id).slice(0, 3);
    recentEl.innerHTML = otherPosts.map(p => `
      <div class="d-flex gap-3 mb-3">
        <a href="blog-details.html?id=${p.id}" class="flex-shrink-0">
          <img src="${p.image}" class="rounded-3" width="70" height="70" style="object-fit: cover;" alt="${p.title}">
        </a>
        <div>
          <h6 class="small fw-bold mb-1">
            <a href="blog-details.html?id=${p.id}" class="text-main text-decoration-none">${p.title}</a>
          </h6>
          <small class="text-muted">${p.date}</small>
        </div>
      </div>
    `).join('');
  }
}

