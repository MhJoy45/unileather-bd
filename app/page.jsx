"use client";
import React, { useMemo, useState, useEffect } from 'react';
import { ArrowRight, Check, ChevronLeft, ChevronRight, Crown, Gem, Heart, Menu, Play, ShieldCheck, ShoppingCart, Truck, X, Headphones, Instagram, Facebook, Youtube, Minus, Plus, MessageCircle, ExternalLink } from 'lucide-react';
import './globals.css';

// Update these links with your real store details before publishing.
const WA_NUMBER = '8801974446003';
const SITE_URL = typeof window !== 'undefined' ? window.location.href : ''; // Shares the actual deployed page URL
const SOCIAL_LINKS = {
  facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(SITE_URL)}`,
  instagram: 'https://www.instagram.com/',
  youtube: 'https://www.youtube.com/results?search_query=leather+jacket+styling'
};
const photos = {
  hero: '/images/hero-model.jpg', brown: '/images/jacket-chocolate.jpg', black: '/images/jacket-black.jpg',
  shearling: '/images/jacket-shearling.jpg', slim: '/images/jacket-slim.jpg',
  style1: '/images/style-chocolate.jpg', style2: '/images/style-black.jpg',
  style3: '/images/style-hoodie.jpg', detail: '/images/jacket-detail.jpg'
};
const products = [
  { id: 1, name: 'Classic Leather Jacket', price: 5990, old: 7990, image: photos.brown, color: 'Chocolate' },
  { id: 2, name: 'Biker Leather Jacket', price: 6490, old: 8490, image: photos.black, color: 'Black' },
  { id: 3, name: 'Shearling Leather Jacket', price: 7490, old: 9490, image: photos.shearling, color: 'Chocolate' },
  { id: 4, name: 'Slim Fit Leather Jacket', price: 6990, old: 8990, image: photos.slim, color: 'Black' }
];
const reviews = [
  { quote: '“Amazing quality! The chocolate color looks even better in real life.”', name: 'Arif Hasan', initials: 'AH' },
  { quote: '“Super stylish and comfortable. Highly recommended!”', name: 'Tanvir Rahman', initials: 'TR' },
  { quote: '“Best jacket I’ve ever bought. Will shop again!”', name: 'Nusrat Jahan', initials: 'NJ' },
  { quote: '“Great finish and a really comfortable fit. Worth it!”', name: 'Samiha Noor', initials: 'SN' },
  { quote: '“The jacket looks premium and arrived in great condition.”', name: 'Rafi Ahmed', initials: 'RA' }
];
const money = n => `৳ ${n.toLocaleString('en-BD')}`;

function App() {
  const [color, setColor] = useState('Chocolate');
  const [cart, setCart] = useState({});
  const [favorites, setFavorites] = useState([]);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [styleIndex, setStyleIndex] = useState(0);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [notice, setNotice] = useState('');
  const cartItems = useMemo(() => products.filter(p => cart[p.id] > 0).map(p => ({ ...p, qty: cart[p.id] })), [cart]);
  const subtotal = cartItems.reduce((sum, p) => sum + p.price * p.qty, 0);
  const delivery = subtotal ? 80 : 0;
  const total = subtotal + delivery;
  const cartCount = Object.values(cart).reduce((sum, qty) => sum + qty, 0);
  const visibleProducts = products.filter(p => color === 'All' || p.color === color);
  const styles = [
    { image: photos.style1, title: 'The Everyday Classic', text: 'A timeless brown jacket with denim and a clean white tee.' },
    { image: photos.style2, title: 'City After Dark', text: 'Go all black for a confident, effortlessly sharp look.' },
    { image: photos.style3, title: 'Weekend Layers', text: 'Layer up with a hoodie for a relaxed cold-weather fit.' }
  ];
  const shownReviews = [0, 1, 2].map(offset => reviews[(reviewIndex + offset) % reviews.length]);
  const notify = message => { setNotice(message); window.clearTimeout(notify.timer); notify.timer = window.setTimeout(() => setNotice(''), 2000); };
  const addToCart = id => { setCart(current => ({ ...current, [id]: (current[id] || 0) + 1 })); notify('Added to your order'); };
  const updateQty = (id, delta) => setCart(current => { const next = { ...current, [id]: Math.max(0, (current[id] || 0) + delta) }; if (!next[id]) delete next[id]; return next; });
  const toggleFavorite = id => { setFavorites(current => { const exists = current.includes(id); notify(exists ? 'Removed from favorites' : 'Saved to favorites'); return exists ? current.filter(x => x !== id) : [...current, id]; }); };
  const checkout = () => {
    if (!cartItems.length) { notify('Add a jacket to your order first'); return; }
    const lines = cartItems.map(p => `${p.name} (${p.color}) x ${p.qty} — ${money(p.price * p.qty)}`).join('\n');
    const message = `Hello UNILEATHER, I would like to order:\n${lines}\n\nSubtotal: ${money(subtotal)}\nDelivery: ${money(delivery)}\nTotal: ${money(total)}\n\nPlease confirm size, availability and delivery.`;
    window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };
  const openWhatsApp = message => window.open(`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  const scrollTo = id => { setMobileOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }); };
  const navItems = [['Home', 'home'], ['Color Guide', 'color-guide'], ['Style Guide', 'style-guide'], ['About', 'about'], ['Contact', 'contact']];
  useEffect(() => {
    const onKeyDown = event => { if (event.key === 'Escape') { setVideoOpen(false); setSelectedProduct(null); setMobileOpen(false); } };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return <div className="site-shell">
    <header className="topbar">
      <a className="brand" href="#home" onClick={e => { e.preventDefault(); scrollTo('home'); }}><span className="brand-mark">U</span><span>UNILEATHER<small>WEAR CONFIDENCE.</small></span></a>
      <nav className={mobileOpen ? 'nav open' : 'nav'}>{navItems.map(([label, id]) => <a key={id} href={`#${id}`} onClick={e => { e.preventDefault(); scrollTo(id); }}>{label}</a>)}</nav>
      <button className="nav-cta" onClick={() => scrollTo('products')}>Shop Now <ArrowRight size={15}/></button>
      <button className="menu-toggle" aria-label="Toggle navigation" aria-expanded={mobileOpen} onClick={() => setMobileOpen(v => !v)}>{mobileOpen ? <X/> : <Menu/>}</button>
    </header>

    <main>
      <section className="hero" id="home">
        <div className="hero-image" style={{ backgroundImage: `url(${photos.hero})` }} /><div className="hero-shade" />
        <div className="hero-copy"><p className="eyebrow">TIMELESS STYLE. PREMIUM QUALITY.</p><h1>UNI<span>LEATHER</span></h1><h2>Leather Jacket Color Guide</h2>
          <p className="hero-desc">Choose the perfect color — Chocolate or Black<br className="desktop-only"/> for a bold &amp; stylish you.</p>
          <div className="hero-actions"><button className="btn primary" onClick={() => scrollTo('products')}>Explore Jackets <ArrowRight size={17}/></button><button className="btn outline" onClick={() => setVideoOpen(true)}><span className="play-icon"><Play size={12} fill="currentColor"/></span> Watch Video</button></div>
          <div className="hero-perks"><div><ShieldCheck/><span>Premium<br/>Leather</span></div><i/><div><Gem/><span>Timeless<br/>Design</span></div><i/><div><Truck/><span>Fast<br/>Delivery</span></div></div>
        </div><div className="hero-script">Be Bold<br/>Be Unileather<span /></div>
      </section>

      <section className="color-panel" id="color-guide"><div className="section-heading"><h3>Color Guide</h3><p>Two Iconic Colors. Endless Possibilities.</p></div>
        <div className="color-options">
          <button className={`color-option chocolate ${color === 'Chocolate' ? 'selected' : ''}`} onClick={() => { setColor('Chocolate'); scrollTo('products'); }}><img src={photos.brown} alt="Chocolate brown leather jacket"/><span className="swatch brown-swatch"/><span className="color-copy"><b>Chocolate</b><small>Rich, warm and versatile.</small></span>{color === 'Chocolate' && <span className="selected-check"><Check size={15}/></span>}</button>
          <button className={`color-option black ${color === 'Black' ? 'selected' : ''}`} onClick={() => { setColor('Black'); scrollTo('products'); }}><img src={photos.black} alt="Black leather jacket"/><span className="swatch black-swatch"/><span className="color-copy"><b>Black</b><small>Bold, classic and powerful.</small></span>{color === 'Black' && <span className="selected-check"><Check size={15}/></span>}</button>
        </div>
      </section>

      <section className="products-section" id="products"><div className="section-row"><div><h3>Recommended Jackets</h3><p>Premium leather jackets in your favourite color.</p></div><button className="text-link" onClick={() => setColor('All')}>View All Jackets <ArrowRight size={15}/></button></div>
        <div className="product-grid">{visibleProducts.map(p => <article className="product-card" key={p.id} onClick={() => setSelectedProduct(p)}><div className="product-photo" role="button" tabIndex={0} aria-label={`View full image of ${p.name}`} onClick={() => setSelectedProduct(p)} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setSelectedProduct(p); } }}><img src={p.image} alt={p.name}/><span className="image-hint">View full image</span><button className={`heart ${favorites.includes(p.id) ? 'liked' : ''}`} aria-label={favorites.includes(p.id) ? 'Remove from favorites' : 'Add to favorites'} aria-pressed={favorites.includes(p.id)} onClick={e => { e.stopPropagation(); toggleFavorite(p.id); }}><Heart size={19} fill={favorites.includes(p.id) ? 'currentColor' : 'none'}/></button></div><div className="product-info"><h4>{p.name}</h4><div className="price-line"><b>{money(p.price)}</b><del>{money(p.old)}</del></div><button className="add-btn" onClick={e => { e.stopPropagation(); addToCart(p.id); }}><ShoppingCart size={15}/> Add to Cart</button></div></article>)}</div>
        {!visibleProducts.length && <p className="empty-state">No jackets found in this color.</p>}
      </section>

      <section className="style-section" id="style-guide"><div className="style-intro"><p className="eyebrow">FIND YOUR SIGNATURE LOOK</p><h3>Style Guide</h3><p>Get the best look with your leather jacket.</p><ul><li><Check/> Pair with jeans for a classic look</li><li><Check/> Add a hoodie for a casual vibe</li><li><Check/> Wear with boots for a bold style</li></ul><button onClick={() => { setStyleIndex((styleIndex + 1) % styles.length); scrollTo('style-gallery'); }} className="btn primary small">View Style Tips <ArrowRight size={15}/></button></div>
        <div className="style-gallery" id="style-gallery">{styles.map((s, i) => <button key={s.title} className={`style-tile ${styleIndex === i ? 'active' : ''}`} onClick={() => setStyleIndex(i)} aria-pressed={styleIndex === i}><img src={s.image} alt={s.title}/><span>{s.title}</span></button>)}</div>
      </section>
      <div className="style-caption"><b>{styles[styleIndex].title}</b><span>{styles[styleIndex].text}</span></div>

      <section className="benefit-strip" id="about"><div><Crown/><b>Premium Quality</b></div><i/><div><Truck/><b>Fast Delivery</b></div><i/><div><ShieldCheck/><b>Easy Returns</b></div><i/><button className="benefit-support" onClick={() => openWhatsApp('Hello UNILEATHER, I need help with a product/order.')}><Headphones/><b>24/7 Support</b></button></section>

      <section className="reviews-section"><div className="section-heading"><h3>What Our Customers Say</h3><p>Trusted by thousands of leather lovers.</p></div><div className="reviews-grid"><button className="round-arrow" aria-label="Previous reviews" onClick={() => setReviewIndex(i => (i - 1 + reviews.length) % reviews.length)}><ChevronLeft/></button>{shownReviews.map(r => <article className="review-card" key={r.name}><div className="avatar">{r.initials}</div><div><p>{r.quote}</p><small>{r.name}</small><div className="stars">★★★★★</div></div></article>)}<button className="round-arrow" aria-label="Next reviews" onClick={() => setReviewIndex(i => (i + 1) % reviews.length)}><ChevronRight/></button></div><div className="review-dots">{reviews.map((r, i) => <button key={r.name} aria-label={`Show review ${i + 1}`} className={i === reviewIndex ? 'active' : ''} onClick={() => setReviewIndex(i)}/>)}</div></section>

      <section className="order-section" id="contact"><div className="order-background" style={{ backgroundImage: `url(${photos.detail})` }}/><div className="order-copy"><p className="eyebrow">YOUR NEXT SIGNATURE LOOK</p><h3>Ready to Order?</h3><p>Get your favorite UNILEATHER jacket now!</p><ul><li><Check/> Select your jacket &amp; color</li><li><Check/> Add to cart and checkout</li><li><Check/> Confirm via WhatsApp</li></ul><button onClick={() => scrollTo('products')} className="btn primary">Shop Now <ArrowRight size={16}/></button><button className="contact-link" onClick={() => openWhatsApp('Hello UNILEATHER, I have a question about your leather jackets.')}>Need help? Chat with us <MessageCircle size={14}/></button></div>
        <div className="order-card"><div className="order-title"><h4>Your Order</h4><span>{cartCount} item{cartCount === 1 ? '' : 's'}</span></div>{cartItems.length ? cartItems.map(p=><div className="order-item" key={p.id}><img src={p.image} alt={p.name}/><div className="order-item-name"><b>{p.name}</b><small>{p.color} | M</small></div><div className="qty-control"><button aria-label={`Decrease ${p.name}`} onClick={() => updateQty(p.id,-1)}><Minus size={12}/></button><b>{p.qty}</b><button aria-label={`Increase ${p.name}`} onClick={() => updateQty(p.id,1)}><Plus size={12}/></button></div><strong>{money(p.price * p.qty)}</strong></div>) : <p className="cart-empty">Your order is empty. Add a jacket to get started.</p>}
          <div className="totals"><div><span>Subtotal</span><b>{money(subtotal)}</b></div><div><span>Delivery Charge</span><b>{money(delivery)}</b></div><div className="grand-total"><span>Total</span><b>{money(total)}</b></div></div><button className="whatsapp-btn" onClick={checkout} disabled={!cartItems.length}><MessageCircle size={17}/> Checkout via WhatsApp</button></div>
      </section>
    </main>

    <footer className="footer"><a className="brand" href="#home" onClick={e => { e.preventDefault(); scrollTo('home'); }}><span className="brand-mark">U</span><span>UNILEATHER<small>WEAR CONFIDENCE.</small></span></a><nav>{navItems.map(([label, id]) => <a key={id} href={`#${id}`} onClick={e => { e.preventDefault(); scrollTo(id); }}>{label}</a>)}</nav><div className="socials"><a href={SOCIAL_LINKS.facebook} target="_blank" rel="noreferrer" aria-label="Share on Facebook"><Facebook/></a><a href={SOCIAL_LINKS.instagram} target="_blank" rel="noreferrer" aria-label="Open Instagram"><Instagram/></a><a href={SOCIAL_LINKS.youtube} target="_blank" rel="noreferrer" aria-label="Find leather jacket videos on YouTube"><Youtube/></a></div><small className="copyright">© 2026 UNILEATHER. All rights reserved.</small></footer>
    {notice && <div className="toast" role="status"><Check size={16}/>{notice}</div>}
    {videoOpen && <div className="modal-backdrop" role="presentation" onClick={() => setVideoOpen(false)}><div className="video-modal" role="dialog" aria-modal="true" aria-labelledby="video-title" onClick={e => e.stopPropagation()}><button className="modal-close" onClick={() => setVideoOpen(false)} aria-label="Close video options"><X/></button><div className="video-placeholder"><Play size={42} fill="currentColor"/><h3 id="video-title">UNILEATHER — Wear Confidence</h3><p>Explore leather jacket styling inspiration and find your signature look.</p><a className="btn primary" href="https://www.youtube.com/results?search_query=mens+leather+jacket+styling" target="_blank" rel="noreferrer">Watch Styling Videos <ExternalLink size={15}/></a><button className="btn outline" onClick={() => { setVideoOpen(false); scrollTo('style-guide'); }}>Explore Style Guide <ArrowRight size={15}/></button></div></div></div>}
    {selectedProduct && <div className="image-lightbox" role="presentation" onClick={() => setSelectedProduct(null)}><div className="image-lightbox-panel" role="dialog" aria-modal="true" aria-label={`Full image of ${selectedProduct.name}`} onClick={e => e.stopPropagation()}><button className="lightbox-close" onClick={() => setSelectedProduct(null)} aria-label="Close product image"><X/></button><div className="lightbox-image-wrap"><img src={selectedProduct.image} alt={`${selectedProduct.name} — full product view`}/></div><div className="lightbox-details"><div><h3>{selectedProduct.name}</h3><p>{selectedProduct.color} leather jacket</p><strong>{money(selectedProduct.price)}</strong></div><button className="add-btn lightbox-add" onClick={() => { addToCart(selectedProduct.id); setSelectedProduct(null); }}><ShoppingCart size={16}/> Add to Cart</button></div></div></div>}
  </div>;
}

export default App;
