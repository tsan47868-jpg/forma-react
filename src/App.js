import { useEffect, useMemo, useState } from 'react';
import './App.css';

const products = [
  {
    id: 1,
    name: 'The Everyday Trench',
    category: 'Outerwear',
    collection: 'Women',
    price: 198,
    color: 'Warm stone',
    badge: 'BESTSELLER',
    image:
      'https://images.unsplash.com/photo-1548624149-f17aa7d3f27d?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 2,
    name: 'Relaxed Linen Shirt',
    category: 'Tops',
    collection: 'Men',
    price: 88,
    color: 'Soft white',
    badge: '',
    image:
      'https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 3,
    name: 'The Form Knit',
    category: 'Knitwear',
    collection: 'Women',
    price: 124,
    color: 'Oatmeal',
    badge: 'NEW',
    image:
      'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 4,
    name: 'Pleated Wide-Leg Trouser',
    category: 'Bottoms',
    collection: 'Men',
    price: 148,
    color: 'Deep olive',
    badge: '',
    image:
      'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 5,
    name: 'Sculpted Shoulder Bag',
    category: 'Accessories',
    collection: 'Accessories',
    price: 168,
    color: 'Espresso',
    badge: 'LOW STOCK',
    image:
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 6,
    name: 'Cotton Poplin Dress',
    category: 'Dresses',
    collection: 'Women',
    price: 156,
    color: 'Sky stripe',
    badge: '',
    image:
      'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 7,
    name: 'Everyday Crew Tee',
    category: 'Tops',
    collection: 'Men',
    price: 54,
    color: 'Washed black',
    badge: '',
    image:
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=900&q=85',
  },
  {
    id: 8,
    name: 'Soft Structure Blazer',
    category: 'Outerwear',
    collection: 'Women',
    price: 224,
    color: 'Chocolate',
    badge: 'NEW',
    image:
      'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=900&q=85',
  },
];

const filters = ['All pieces', 'Women', 'Men', 'Accessories'];

const productDetails = {
  1: {
    colors: [{ name: 'Warm stone', value: '#b7ad99' }, { name: 'Deep olive', value: '#626653' }, { name: 'Ink', value: '#373a37' }],
    material: 'Cotton blend with a smooth, lightweight lining.',
    fit: 'Relaxed through the body with an adjustable waist.',
    description: 'An easy layer for changing weather, finished with a clean collar and practical pockets.',
  },
  2: {
    colors: [{ name: 'Soft white', value: '#e8e4d8' }, { name: 'Pale blue', value: '#a9bdc2' }, { name: 'Sage', value: '#929681' }],
    material: 'Breathable linen-cotton blend.',
    fit: 'An easy, relaxed fit. Take your usual size.',
    description: 'A naturally breathable everyday shirt with a soft hand and an easy drape.',
  },
  3: {
    colors: [{ name: 'Oatmeal', value: '#c4b9a2' }, { name: 'Espresso', value: '#55483e' }, { name: 'Charcoal', value: '#555651' }],
    material: 'Soft-touch cotton and wool blend.',
    fit: 'Comfortably relaxed, with a lightly shaped hem.',
    description: 'A versatile knit designed for layering, with a considered shape that works on its own, too.',
  },
  4: {
    colors: [{ name: 'Deep olive', value: '#626653' }, { name: 'Sand', value: '#c2b79f' }, { name: 'Ink', value: '#373a37' }],
    material: 'Midweight cotton twill.',
    fit: 'Relaxed through the leg with a clean, tailored waist.',
    description: 'A softly structured trouser with thoughtful pleats and room to move.',
  },
  5: {
    colors: [{ name: 'Espresso', value: '#554239' }, { name: 'Black', value: '#33332f' }, { name: 'Cognac', value: '#9a6849' }],
    material: 'Textured, durable vegan leather with a soft lining.',
    fit: 'One size, with a comfortably adjustable shoulder strap.',
    description: 'A sculptural everyday carryall sized for the things you like to keep close.',
  },
  6: {
    colors: [{ name: 'Sky stripe', value: '#abc1c3' }, { name: 'Soft white', value: '#e8e4d8' }, { name: 'Sage', value: '#929681' }],
    material: 'Lightweight cotton poplin.',
    fit: 'Easy through the waist with a gently flowing skirt.',
    description: 'A light, breathable dress with a clean neckline and an easy-to-wear silhouette.',
  },
  7: {
    colors: [{ name: 'Washed black', value: '#45443f' }, { name: 'Chalk', value: '#e5e1d7' }, { name: 'Sage', value: '#929681' }],
    material: 'Soft, midweight organic cotton jersey.',
    fit: 'A classic straight fit. Take your usual size.',
    description: 'A dependable crew-neck tee with a soft feel and an easy everyday shape.',
  },
  8: {
    colors: [{ name: 'Chocolate', value: '#645045' }, { name: 'Warm stone', value: '#b7ad99' }, { name: 'Ink', value: '#373a37' }],
    material: 'Soft-structured recycled fabric blend.',
    fit: 'Relaxed shoulders with a clean, slightly shaped silhouette.',
    description: 'A versatile layer with considered tailoring that feels at home dressed up or down.',
  },
};

function getSizes(product) {
  if (product.collection === 'Accessories') return ['One size'];
  if (product.category === 'Bottoms') return ['28', '30', '32', '34', '36'];
  return ['XS', 'S', 'M', 'L', 'XL'];
}

function getProductSlug(product) {
  return product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

function getProductFromPath(pathname) {
  const slug = pathname.split('/').filter(Boolean).pop();
  return products.find((product) => getProductSlug(product) === slug) || null;
}

const policies = {
  terms: {
    slug: 'terms-and-conditions',
    title: 'Terms & Conditions',
    intro: 'These terms explain the basic rules for using the Forma website and placing an order. By using this site, you agree to these terms.',
    sections: [
      {
        title: 'Using this website',
        paragraphs: ['Please use this website lawfully and provide accurate information when placing an order. We may update, suspend, or change parts of the site from time to time.'],
      },
      {
        title: 'Products, pricing & availability',
        paragraphs: ['We do our best to show product descriptions, colors, sizes, prices, and availability accurately. Colors may look different depending on your screen. Products are subject to availability, and we may correct an error or cancel an order if a listing contains a material mistake. Prices and any applicable taxes or shipping charges are shown before an order is completed.'],
      },
      {
        title: 'Orders & payment',
        paragraphs: ['An order request is not accepted until you receive an order confirmation. If we cannot fulfill an order, we will contact you and any payment collected for that order will be refunded. Payment methods and checkout terms will be displayed during checkout.'],
      },
      {
        title: 'Shipping & returns',
        paragraphs: ['Delivery dates are estimates and may vary by destination or carrier. Our returns conditions and instructions are explained on the Returns Policy page. Nothing in these terms limits any consumer rights that cannot legally be excluded.'],
      },
      {
        title: 'Content & intellectual property',
        paragraphs: ['The Forma name, original site content, images, and designs belong to Forma or their respective rights holders. You may browse and use the site for personal, non-commercial purposes; you may not copy or reuse site content commercially without permission.'],
      },
      {
        title: 'Liability & changes',
        paragraphs: ['To the extent permitted by law, the website is provided as available. These terms do not exclude liability or consumer protections where exclusion is not permitted. We may revise these terms by publishing an updated version on this page.'],
      },
      {
        title: 'Contact',
        paragraphs: ['Questions about these terms? Contact us at hello@forma.studio. These general terms should be reviewed and adapted to the laws that apply to your business and customers.'],
      },
    ],
  },
  returns: {
    slug: 'returns-policy',
    title: 'Returns Policy',
    intro: 'We want you to feel good about what you keep. If a piece is not right for you, contact us within 30 days of delivery to request a return.',
    sections: [
      {
        title: 'Return conditions',
        paragraphs: ['Items must be unworn, unwashed, and in their original condition with tags attached. Please include the original packaging where possible. Items showing wear, damage, or alterations may not be eligible for a refund, subject to your local consumer rights.'],
      },
      {
        title: 'How to start a return',
        paragraphs: ['Email hello@forma.studio with your order number and the item or items you would like to return. We will reply with instructions before you send anything back. Please do not mail a return without contacting us first.'],
      },
      {
        title: 'Return shipping',
        paragraphs: ['Unless an item is faulty or we sent the wrong item, return postage is the customer’s responsibility. We recommend using a tracked service and keeping your proof of postage. If an item arrives faulty or incorrect, contact us and we will help arrange an appropriate resolution.'],
      },
      {
        title: 'Refunds',
        paragraphs: ['After your return is received and inspected, we will email you with the outcome. Approved refunds are sent to the original payment method; your bank or payment provider may take additional time to post the credit. Original shipping charges are not refundable unless required by law or the return is due to our error.'],
      },
      {
        title: 'Exchanges & order changes',
        paragraphs: ['For a different size or color, contact us and we will help you check availability. Orders cannot always be changed or canceled once they have entered fulfillment, so get in touch as soon as possible.'],
      },
      {
        title: 'Questions',
        paragraphs: ['For help with a return, email hello@forma.studio and include your order number. This policy does not affect any rights you have under applicable consumer law.'],
      },
    ],
  },
};

function getPolicyFromPath(pathname) {
  const slug = pathname.split('/').filter(Boolean).pop();
  return Object.keys(policies).find((key) => policies[key].slug === slug) || null;
}

function PolicyPage({ policy, onBackToShop }) {
  const content = policies[policy];

  return (
    <article className="policy-page">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <button type="button" onClick={onBackToShop}>Home</button>
        <Icon name="arrow" size={13} />
        <span>{content.title}</span>
      </nav>
      <header className="policy-heading">
        <p className="eyebrow">THE FORMA WAY</p>
        <h1>{content.title}</h1>
        <p>{content.intro}</p>
      </header>
      <div className="policy-sections">
        {content.sections.map((section) => (
          <section key={section.title}>
            <h2>{section.title}</h2>
            {section.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph.split('hello@forma.studio').map((part, index, parts) => (
                <span key={`${index}-${part}`}>
                  {part}
                  {index < parts.length - 1 && <a href="mailto:hello@forma.studio">hello@forma.studio</a>}
                </span>
              ))}</p>
            ))}
          </section>
        ))}
      </div>
    </article>
  );
}

function ProductCard({ product, isFavorite, onFavorite, onOpen }) {
  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <button
          className="product-image-button"
          type="button"
          aria-label={`View details for ${product.name}`}
          onClick={() => onOpen(product)}
        >
          <img className="product-image" src={product.image} alt="" loading="lazy" />
        </button>
        {product.badge && <span className="product-badge">{product.badge}</span>}
        <button
          className={`favorite-button${isFavorite ? ' favorited' : ''}`}
          type="button"
          aria-label={`${isFavorite ? 'Remove' : 'Add'} ${product.name} ${isFavorite ? 'from' : 'to'} favorites`}
          aria-pressed={isFavorite}
          onClick={() => onFavorite(product.id)}
        >
          <Icon name="heart" size={19} />
        </button>
        <button className="quick-add" type="button" onClick={() => onOpen(product)}>
          VIEW DETAILS &amp; OPTIONS <span>+</span>
        </button>
      </div>
      <div className="product-info">
        <div>
          <button className="product-name-button" type="button" onClick={() => onOpen(product)}>
            {product.name}
          </button>
          <p>{product.color} <span>·</span> {product.category}</p>
        </div>
        <span className="product-price">${product.price}</span>
      </div>
    </article>
  );
}

function ProductPage({
  product,
  selectedColor,
  selectedSize,
  deliveryPostcode,
  deliveryMessage,
  favorites,
  onColorChange,
  onSizeChange,
  onPostcodeChange,
  onCheckDelivery,
  onAddToBag,
  onFavorite,
  onOpenProduct,
  onBackToShop,
}) {
  const [activeDetailTab, setActiveDetailTab] = useState('Details');
  const details = productDetails[product.id];
  const relatedProducts = products
    .filter((item) => item.id !== product.id)
    .sort((a, b) => {
      const aMatch = a.category === product.category ? 2 : a.collection === product.collection ? 1 : 0;
      const bMatch = b.category === product.category ? 2 : b.collection === product.collection ? 1 : 0;
      return bMatch - aMatch;
    })
    .slice(0, 4);

  return (
    <div className="product-page">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <button type="button" onClick={onBackToShop}>Home</button><Icon name="arrow" size={13} />
        <button type="button" onClick={onBackToShop}>Shop</button><Icon name="arrow" size={13} />
        <span>{product.name}</span>
      </nav>

      <section className="product-page-main">
        <div className="product-gallery">
          <div className="product-page-image">
            <img src={product.image} alt={product.name} />
            {product.badge && <span className="product-badge">{product.badge}</span>}
            <button
              className="gallery-zoom"
              type="button"
              aria-label={`Open a larger view of ${product.name}`}
              onClick={() => window.open(product.image, '_blank', 'noopener,noreferrer')}
            >
              <Icon name="search" size={18} />
            </button>
          </div>
          <div className="gallery-caption">
            <span>01 / 01</span><span>THOUGHTFULLY MADE</span>
          </div>
        </div>

        <div className="product-page-info">
          {product.badge && <span className="product-page-badge">{product.badge}</span>}
          <p className="eyebrow">{product.collection} / {product.category}</p>
          <h1>{product.name}</h1>
          <p className="product-page-price"><strong>${product.price}</strong></p>
          <p className="product-page-description">{details.description}</p>

          <div className="product-page-variant">
            <div className="variant-heading">
              <span>COLOR</span><strong>{selectedColor}</strong>
            </div>
            <div className="color-options">
              {details.colors.map((color) => (
                <button
                  className={`color-option${selectedColor === color.name ? ' selected' : ''}`}
                  key={color.name}
                  type="button"
                  aria-label={color.name}
                  aria-pressed={selectedColor === color.name}
                  title={color.name}
                  onClick={() => onColorChange(color.name)}
                >
                  <span style={{ backgroundColor: color.value }} />
                </button>
              ))}
            </div>
          </div>

          <div className="product-page-variant">
            <div className="variant-heading">
              <span>SIZE</span>
              {product.collection !== 'Accessories' && <span>SIZE GUIDE</span>}
            </div>
            <div className="size-options">
              {getSizes(product).map((size) => (
                <button
                  className={`size-option${selectedSize === size ? ' selected' : ''}`}
                  key={size}
                  type="button"
                  aria-pressed={selectedSize === size}
                  onClick={() => onSizeChange(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <button className="detail-add-button" type="button" onClick={() => onAddToBag(product.id, selectedColor, selectedSize)}>
            <Icon name="bag" size={17} /> ADD TO BAG — ${product.price}
          </button>
          <button
            className={`product-page-favorite${favorites.includes(product.id) ? ' favorited' : ''}`}
            type="button"
            aria-pressed={favorites.includes(product.id)}
            onClick={() => onFavorite(product.id)}
          >
            <Icon name="heart" size={19} />
            {favorites.includes(product.id) ? 'SAVED TO FAVORITES' : 'ADD TO FAVORITES'}
          </button>

          <form className="delivery-check" onSubmit={onCheckDelivery}>
            <label htmlFor="delivery-postcode">CHECK DELIVERY TO YOUR AREA</label>
            <div className="delivery-input-row">
              <input
                id="delivery-postcode"
                aria-label="ZIP or postal code"
                autoComplete="postal-code"
                maxLength={10}
                placeholder="ZIP or postal code"
                value={deliveryPostcode}
                onChange={(event) => onPostcodeChange(event.target.value)}
              />
              <button type="submit">CHECK</button>
            </div>
            <p className={deliveryMessage.startsWith('Enter') ? 'delivery-message error' : 'delivery-message'} role="status">
              {deliveryMessage || 'General estimate: 3–5 business days. Exact rates and availability depend on your destination.'}
            </p>
          </form>

          <div className="purchase-benefits" aria-label="Shopping benefits">
            <div><Icon name="truck" size={17} /><span><strong>Free shipping</strong><small>On orders over $150</small></span></div>
            <div><Icon name="return" size={17} /><span><strong>Easy returns</strong><small>Within 30 days</small></span></div>
            <div><Icon name="shield" size={17} /><span><strong>Secure payment</strong><small>Safe checkout</small></span></div>
          </div>
        </div>
      </section>

      <section className="product-details-panel" aria-label="Product information">
        <div className="product-detail-tabs" role="tablist" aria-label="Product information">
          {['Details', 'Materials', 'Size & Fit', 'Shipping & Returns'].map((tab) => (
            <button
              id={`product-tab-${tab.toLowerCase().replace(/[^a-z]+/g, '-')}`}
              key={tab}
              type="button"
              role="tab"
              aria-selected={activeDetailTab === tab}
              aria-controls="product-tab-panel"
              className={activeDetailTab === tab ? 'active' : ''}
              onClick={() => setActiveDetailTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <div
          className="product-tab-panel"
          id="product-tab-panel"
          role="tabpanel"
          aria-labelledby={`product-tab-${activeDetailTab.toLowerCase().replace(/[^a-z]+/g, '-')}`}
        >
          {activeDetailTab === 'Details' && (
            <>
              <p>{details.description}</p>
              <ul>
                <li>Designed for repeat wear and easy everyday styling.</li>
                <li>Thoughtful details with a versatile silhouette.</li>
                <li>Available in {details.colors.length} considered colors.</li>
              </ul>
            </>
          )}
          {activeDetailTab === 'Materials' && (
            <>
              <p>{details.material}</p>
              <p>For best results, follow the care instructions on the garment label.</p>
            </>
          )}
          {activeDetailTab === 'Size & Fit' && (
            <>
              <p>{details.fit}</p>
              {product.collection !== 'Accessories' ? (
                <div className="size-guide-table">
                  <span>AVAILABLE SIZES</span>
                  {getSizes(product).map((size) => <span key={size}>{size}</span>)}
                </div>
              ) : <p>This accessory is available in one size.</p>}
            </>
          )}
          {activeDetailTab === 'Shipping & Returns' && (
            <>
              <p>Complimentary shipping on orders over $150. Estimated delivery is 3–5 business days; actual availability and rates depend on your destination.</p>
              <p>Contact <a href="mailto:hello@forma.studio">hello@forma.studio</a> within 30 days of delivery to start a return. Items must be unworn, unwashed, and in their original condition with tags attached. See our <a href="/policies/returns-policy">Returns Policy</a> for full details.</p>
            </>
          )}
        </div>
      </section>

      <section className="related-products" aria-labelledby="related-products-title">
        <div className="related-heading">
          <div>
            <p className="eyebrow">KEEP EXPLORING</p>
            <h2 id="related-products-title">You may also like.</h2>
          </div>
          <a href="/#shop">SHOP ALL PIECES <Icon name="arrow" size={15} /></a>
        </div>
        <div className="product-grid">
          {relatedProducts.map((relatedProduct) => (
            <ProductCard
              key={relatedProduct.id}
              product={relatedProduct}
              isFavorite={favorites.includes(relatedProduct.id)}
              onFavorite={onFavorite}
              onOpen={onOpenProduct}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

function Icon({ name, size = 20 }) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    'aria-hidden': true,
  };

  if (name === 'search') {
    return (
      <svg {...common}>
        <circle cx="10.8" cy="10.8" r="6.8" />
        <path d="m16 16 4.2 4.2" />
      </svg>
    );
  }
  if (name === 'bag') {
    return (
      <svg {...common}>
        <path d="M5 8h14l1 12H4L5 8Z" />
        <path d="M9 9V6a3 3 0 0 1 6 0v3" />
      </svg>
    );
  }
  if (name === 'truck') {
    return (
      <svg {...common}>
        <path d="M3 6h11v11H3z" />
        <path d="M14 10h4l3 3v4h-7z" />
        <circle cx="7.5" cy="18" r="1.8" />
        <circle cx="17.5" cy="18" r="1.8" />
        <path d="M17 10v3h4" />
      </svg>
    );
  }
  if (name === 'return') {
    return (
      <svg {...common}>
        <path d="M4 10V5m0 0h5M4 5l4 4a8 8 0 1 1-1 9" />
        <path d="M12 8v4l3 2" />
      </svg>
    );
  }
  if (name === 'shield') {
    return (
      <svg {...common}>
        <path d="M12 3 20 6v5c0 5-3.4 8.3-8 10-4.6-1.7-8-5-8-10V6l8-3Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    );
  }
  if (name === 'heart') {
    return (
      <svg {...common}>
        <path d="M20.8 8.8c0 5.2-8.8 10-8.8 10s-8.8-4.8-8.8-10a4.7 4.7 0 0 1 8.8-2.3 4.7 4.7 0 0 1 8.8 2.3Z" />
      </svg>
    );
  }
  if (name === 'close') {
    return (
      <svg {...common}>
        <path d="m18 6-12 12M6 6l12 12" />
      </svg>
    );
  }
  if (name === 'minus') {
    return (
      <svg {...common}>
        <path d="M5 12h14" />
      </svg>
    );
  }
  if (name === 'plus') {
    return (
      <svg {...common}>
        <path d="M12 5v14M5 12h14" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

function App() {
  const [activeFilter, setActiveFilter] = useState('All pieces');
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('featured');
  const [favorites, setFavorites] = useState([]);
  const [bag, setBag] = useState({});
  const [bagOpen, setBagOpen] = useState(false);
  const initialProduct = getProductFromPath(window.location.pathname);
  const [selectedPolicy, setSelectedPolicy] = useState(() => getPolicyFromPath(window.location.pathname));
  const [selectedProduct, setSelectedProduct] = useState(initialProduct);
  const [selectedColor, setSelectedColor] = useState(
    initialProduct ? productDetails[initialProduct.id].colors[0].name : ''
  );
  const [selectedSize, setSelectedSize] = useState(
    initialProduct ? getSizes(initialProduct)[0] : ''
  );
  const [deliveryPostcode, setDeliveryPostcode] = useState('');
  const [deliveryMessage, setDeliveryMessage] = useState('');

  useEffect(() => {
    function syncProductRoute() {
      const product = getProductFromPath(window.location.pathname);
      setSelectedPolicy(getPolicyFromPath(window.location.pathname));
      setSelectedProduct(product);
      setDeliveryPostcode('');
      setDeliveryMessage('');
      if (product) {
        setSelectedColor(productDetails[product.id].colors[0].name);
        setSelectedSize(getSizes(product)[0]);
      }
    }

    window.addEventListener('popstate', syncProductRoute);
    return () => window.removeEventListener('popstate', syncProductRoute);
  }, []);

  useEffect(() => {
    document.title = selectedProduct
      ? `${selectedProduct.name} | Forma`
      : selectedPolicy
        ? `${policies[selectedPolicy].title} | Forma`
        : 'Forma | Considered everyday clothing';
  }, [selectedProduct, selectedPolicy]);

  const visibleProducts = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    const result = products.filter((product) => {
      const matchesFilter =
        activeFilter === 'All pieces' || product.collection === activeFilter;
      const matchesSearch =
        !query ||
        `${product.name} ${product.category} ${product.color}`
          .toLowerCase()
          .includes(query);
      return matchesFilter && matchesSearch;
    });

    if (sortOrder === 'price-low') result.sort((a, b) => a.price - b.price);
    if (sortOrder === 'price-high') result.sort((a, b) => b.price - a.price);
    if (sortOrder === 'name') result.sort((a, b) => a.name.localeCompare(b.name));
    return result;
  }, [activeFilter, searchQuery, sortOrder]);

  const bagItems = Object.entries(bag).map(([key, item]) => ({
    ...products.find((product) => product.id === item.productId),
    ...item,
    key,
  }));
  const bagCount = bagItems.reduce((total, item) => total + item.quantity, 0);
  const subtotal = bagItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  function openProduct(product) {
    const details = productDetails[product.id];
    window.history.pushState({ productId: product.id }, '', `/products/${getProductSlug(product)}`);
    setSelectedPolicy(null);
    setSelectedProduct(product);
    setSelectedColor(details.colors[0].name);
    setSelectedSize(getSizes(product)[0]);
    setDeliveryPostcode('');
    setDeliveryMessage('');
  }

  function openPolicy(policy) {
    window.history.pushState({ policy }, '', `/policies/${policies[policy].slug}`);
    setSelectedProduct(null);
    setSelectedPolicy(policy);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }

  function closeProductPage() {
    window.history.pushState({}, '', '/');
    setSelectedProduct(null);
    setSelectedPolicy(null);
    setDeliveryPostcode('');
    setDeliveryMessage('');
  }

  function addToBag(productId, color, size) {
    const product = products.find((item) => item.id === productId);
    const details = productDetails[productId];
    const chosenColor = color || details.colors[0].name;
    const chosenSize = size || getSizes(product)[0];
    const itemKey = `${productId}-${chosenColor}-${chosenSize}`;
    setBag((current) => ({
      ...current,
      [itemKey]:       current[itemKey]
        ? { ...current[itemKey], quantity: current[itemKey].quantity + 1 }
        : { productId, color: chosenColor, size: chosenSize, quantity: 1 },
    }));
    setBagOpen(true);
  }

  function updateQuantity(itemKey, amount) {
    setBag((current) => {
      const nextQuantity = (current[itemKey].quantity || 0) + amount;
      if (nextQuantity <= 0) {
        const nextBag = { ...current };
        delete nextBag[itemKey];
        return nextBag;
      }
      return {
        ...current,
        [itemKey]: { ...current[itemKey], quantity: nextQuantity },
      };
    });
  }

  function checkDelivery(event) {
    event.preventDefault();
    const postcode = deliveryPostcode.trim();
    if (!/^[a-z0-9][a-z0-9 -]{1,9}$/i.test(postcode)) {
      setDeliveryMessage('Enter a valid ZIP or postal code to check delivery.');
      return;
    }
    setDeliveryMessage(
      `Estimated delivery to ${postcode.toUpperCase()}: 3–5 business days. This is a general estimate; final rates and availability depend on your destination.`
    );
  }

  function toggleFavorite(productId) {
    setFavorites((current) =>
      current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId]
    );
  }

  return (
    <div className="storefront">
      <div className="announcement">
        <Icon name="truck" size={15} />
        <span className="announcement-message">Complimentary shipping on orders over $150 <span>·</span> Thoughtfully made, always</span>
      </div>

      <header className="site-header">
        <button className="menu-link" type="button" onClick={() => selectedProduct ? closeProductPage() : document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' })}>
          SHOP
        </button>
        <a className="wordmark" href="#top" aria-label="Forma home">
          forma<span>.</span>
        </a>
        <div className="header-actions">
          <button
            className={`icon-button search-toggle${searchOpen ? ' is-active' : ''}`}
            type="button"
            aria-label={searchOpen ? 'Close search' : 'Open search'}
            onClick={() => {
              setSearchOpen((open) => !open);
              setSearchQuery('');
            }}
          >
            <Icon name={searchOpen ? 'close' : 'search'} />
          </button>
          <button
            className="bag-button"
            type="button"
            aria-label={`Shopping bag, ${bagCount} ${bagCount === 1 ? 'item' : 'items'}`}
            onClick={() => setBagOpen(true)}
          >
            <Icon name="bag" size={20} />
            <span className="bag-label">BAG</span>
            <span className="bag-count">{bagCount}</span>
          </button>
        </div>
      </header>

      <main id="top">
        {selectedProduct ? (
          <ProductPage
            key={selectedProduct.id}
            product={selectedProduct}
            selectedColor={selectedColor}
            selectedSize={selectedSize}
            deliveryPostcode={deliveryPostcode}
            deliveryMessage={deliveryMessage}
            favorites={favorites}
            onColorChange={setSelectedColor}
            onSizeChange={setSelectedSize}
            onPostcodeChange={(value) => {
              setDeliveryPostcode(value);
              setDeliveryMessage('');
            }}
            onCheckDelivery={checkDelivery}
            onAddToBag={addToBag}
            onFavorite={toggleFavorite}
            onOpenProduct={openProduct}
            onBackToShop={closeProductPage}
          />
        ) : selectedPolicy ? (
          <PolicyPage policy={selectedPolicy} onBackToShop={closeProductPage} />
        ) : (
          <>
        <section className="hero" aria-label="New season collection">
          <img
            className="hero-image"
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=2000&q=90"
            alt="Friends wearing relaxed, thoughtfully styled everyday clothing"
          />
          <div className="hero-wash" />
          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow">THE NEW SEASON · 2025</p>
            <h1>Less, but<br />better.</h1>
            <p className="hero-description">
              Considered pieces for the way<br className="desktop-break" /> you actually live.
            </p>
            <a className="hero-cta" href="#shop">
              DISCOVER THE COLLECTION <Icon name="arrow" size={17} />
            </a>
          </div>
          <div className="hero-index">01 — 03</div>
        </section>

        <section className="values-strip" aria-label="Our values">
          <span>MADE TO LAST</span><i />
          <span>BETTER MATERIALS</span><i />
          <span>FEWER, FINER THINGS</span>
        </section>

        <section className="shop-section" id="shop">
          <div className="section-heading">
            <div>
              <p className="eyebrow">THE FORMA EDIT</p>
              <h2>Pieces to keep.</h2>
            </div>
            <p className="section-note">A considered wardrobe starts here.</p>
          </div>

          <div className="shop-toolbar">
            <div className="filter-tabs" role="group" aria-label="Filter products">
              {filters.map((filter) => (
                <button
                  className={`filter-tab${activeFilter === filter ? ' selected' : ''}`}
                  key={filter}
                  type="button"
                  aria-pressed={activeFilter === filter}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>
            <div className="toolbar-right">
              {searchOpen && (
                <label className="search-field">
                  <Icon name="search" size={17} />
                  <input
                    autoFocus
                    aria-label="Search products"
                    placeholder="Search the collection"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                  />
                </label>
              )}
              <label className="sort-control">
                <span className="sr-only">Sort products</span>
                <select
                  aria-label="Sort products"
                  value={sortOrder}
                  onChange={(event) => setSortOrder(event.target.value)}
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: low to high</option>
                  <option value="price-high">Price: high to low</option>
                  <option value="name">Name: A to Z</option>
                </select>
              </label>
            </div>
          </div>

          {visibleProducts.length ? (
            <div className="product-grid">
              {visibleProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isFavorite={favorites.includes(product.id)}
                  onFavorite={toggleFavorite}
                  onOpen={openProduct}
                />
              ))}
            </div>
          ) : (
            <div className="empty-results">
              <p>No pieces found.</p>
              <span>Try another search or choose a different collection.</span>
            </div>
          )}
          <p className="product-count">SHOWING {visibleProducts.length} OF {products.length} PIECES</p>
        </section>

        <section className="story-banner">
          <div className="story-photo">
            <img
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=85"
              alt="A calm, light-filled clothing studio"
              loading="lazy"
            />
          </div>
          <div className="story-copy">
            <p className="eyebrow">A DIFFERENT KIND OF EVERYDAY</p>
            <h2>Good clothes.<br />No second thoughts.</h2>
            <p>We make fewer things, more thoughtfully. Natural fabrics, considered details, and shapes that feel like you.</p>
            <a href="#shop">GET TO KNOW FORMA <Icon name="arrow" size={16} /></a>
          </div>
        </section>
          </>
        )}
      </main>

      <footer className="site-footer">
        <div className="footer-main">
          <div className="footer-brand">
            <a className="wordmark footer-wordmark" href="#top">forma<span>.</span></a>
            <p>Good things, made to be lived in.</p>
            <span>Thoughtful everyday clothing, made with care and meant to stay in your wardrobe.</span>
          </div>
          <nav className="footer-column" aria-label="Shop">
            <h2>SHOP</h2>
            <a href="#shop" onClick={() => setActiveFilter('All pieces')}>All pieces</a>
            <a href="#shop" onClick={() => setActiveFilter('Women')}>Women</a>
            <a href="#shop" onClick={() => setActiveFilter('Men')}>Men</a>
            <a href="#shop" onClick={() => setActiveFilter('Accessories')}>Accessories</a>
          </nav>
          <div className="footer-column">
            <h2>THE FORMA WAY</h2>
            <span>Fewer, finer things.</span>
            <span>Natural-feeling materials.</span>
            <span>Easy pieces for real life.</span>
            <a className="footer-text-link" href="#top">Our approach <Icon name="arrow" size={14} /></a>
          </div>
          <div className="footer-column footer-contact">
            <h2>HERE TO HELP</h2>
            <span>Questions about your order?</span>
            <a href="mailto:hello@forma.studio">hello@forma.studio</a>
            <span className="footer-shipping">Complimentary shipping on orders over $150.</span>
            <a href={`/policies/${policies.returns.slug}`} onClick={(event) => {
              event.preventDefault();
              openPolicy('returns');
            }}>Returns policy</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2025 FORMA STUDIO</span>
          <span>MADE FOR THE EVERYDAY</span>
          <div className="footer-legal-links">
            <a href={`/policies/${policies.terms.slug}`} onClick={(event) => {
              event.preventDefault();
              openPolicy('terms');
            }}>TERMS &amp; CONDITIONS</a>
            <a href={`/policies/${policies.returns.slug}`} onClick={(event) => {
              event.preventDefault();
              openPolicy('returns');
            }}>RETURNS POLICY</a>
          </div>
          <a href="#top">BACK TO TOP ↑</a>
        </div>
      </footer>

      {bagOpen && (
        <div className="drawer-backdrop" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setBagOpen(false);
        }}>
          <aside className="bag-drawer" role="dialog" aria-modal="true" aria-labelledby="bag-title">
            <div className="drawer-header">
              <div>
                <p className="eyebrow">YOUR EDIT</p>
                <h2 id="bag-title">Shopping bag <span>({bagCount})</span></h2>
              </div>
              <button className="icon-button" type="button" aria-label="Close shopping bag" onClick={() => setBagOpen(false)}>
                <Icon name="close" />
              </button>
            </div>
            {bagItems.length ? (
              <>
                <div className="bag-items">
                  {bagItems.map((item) => (
                    <div className="bag-item" key={item.key}>
                      <img src={item.image} alt="" />
                      <div className="bag-item-info">
                        <h3>{item.name}</h3>
                        <p>{item.color} · {item.size}</p>
                        <div className="quantity-control">
                          <button type="button" aria-label={`Remove one ${item.name}`} onClick={() => updateQuantity(item.key, -1)}><Icon name="minus" size={14} /></button>
                          <span>{item.quantity}</span>
                          <button type="button" aria-label={`Add one ${item.name}`} onClick={() => updateQuantity(item.key, 1)}><Icon name="plus" size={14} /></button>
                        </div>
                      </div>
                      <span className="bag-item-price">${item.price * item.quantity}</span>
                    </div>
                  ))}
                </div>
                <div className="bag-summary">
                  <div><span>Subtotal</span><strong>${subtotal}</strong></div>
                  <p>Shipping and taxes calculated at checkout.</p>
                  <button className="checkout-button" type="button">CONTINUE TO CHECKOUT <Icon name="arrow" size={17} /></button>
                  <button className="continue-shopping" type="button" onClick={() => setBagOpen(false)}>Continue shopping</button>
                </div>
              </>
            ) : (
              <div className="empty-bag">
                <p>Your bag is taking a breather.</p>
                <span>Find something you'll reach for every day.</span>
                <button type="button" onClick={() => setBagOpen(false)}>EXPLORE THE COLLECTION <Icon name="arrow" size={16} /></button>
              </div>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}

export default App;
