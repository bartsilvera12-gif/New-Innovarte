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
  add(id, name, img) { const c = this.get(); const f = c.find(i => i.id === id); if (f) f.qty++; else c.push({ id, name, img: img || '', qty: 1 }); this.save(c); },
  inc(id) { const c = this.get(); const f = c.find(i => i.id === id); if (f) { f.qty++; this.save(c); } },
  dec(id) { let c = this.get(); const f = c.find(i => i.id === id); if (f) { f.qty--; c = c.filter(i => i.qty > 0); this.save(c); } },
  remove(id) { this.save(this.get().filter(i => i.id !== id)); },
  count() { return this.get().reduce((n, i) => n + i.qty, 0); },
  sub(f) { this.subs.push(f); },
  openCart() { if (this._chan) { try { this._chan.postMessage({ type: 'open' }); } catch (e) {} } },
  onRemote(fn) { if (this._chan) this._chan.addEventListener('message', function (e) { fn(e.data || {}); }); }
};
