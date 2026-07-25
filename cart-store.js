/* Carrito compartido entre páginas y DCs (localStorage + BroadcastChannel entre realms) */
window.InnovCart = {
  KEY: 'innov_cart_v1',
  subs: [],
  _chan: (typeof BroadcastChannel !== 'undefined') ? new BroadcastChannel('innov-cart') : null,
  get() { try { return JSON.parse(localStorage.getItem(this.KEY)) || []; } catch (e) { return []; } },
  save(c) {
    try { localStorage.setItem(this.KEY, JSON.stringify(c)); } catch (e) {}
    this.subs.forEach(f => { try { f(c); } catch (e) {} });
    if (this._chan) { try { this._chan.postMessage({ type: 'update' }); } catch (e) {} }
  },
  // Clave de línea: mismo producto con distinto aroma = líneas separadas.
  _key(id, aroma) { return String(id) + '|' + (aroma || ''); },
  // add(id, name, img, opts?) — opts: { aroma, slug, cat }. Compatible con la firma vieja.
  add(id, name, img, opts) {
    opts = opts || {};
    const c = this.get();
    const key = this._key(id, opts.aroma);
    const f = c.find(i => (i.key || i.id) === key);
    if (f) { f.qty++; }
    else {
      c.push({ key: key, id: id, slug: opts.slug || id, name: name, img: img || '',
               aroma: opts.aroma || '', cat: opts.cat || '', qty: 1 });
    }
    this.save(c);
  },
  // inc/dec/remove operan por CLAVE de línea (los ítems viejos no tienen key -> se usa id).
  inc(key) { const c = this.get(); const f = c.find(i => (i.key || i.id) === key); if (f) { f.qty++; this.save(c); } },
  dec(key) { let c = this.get(); const f = c.find(i => (i.key || i.id) === key); if (f) { f.qty--; c = c.filter(i => i.qty > 0); this.save(c); } },
  remove(key) { this.save(this.get().filter(i => (i.key || i.id) !== key)); },
  count() { return this.get().reduce((n, i) => n + i.qty, 0); },
  sub(f) { this.subs.push(f); },
  openCart() { if (this._chan) { try { this._chan.postMessage({ type: 'open' }); } catch (e) {} } },
  onRemote(fn) { if (this._chan) this._chan.addEventListener('message', function (e) { fn(e.data || {}); }); }
};
