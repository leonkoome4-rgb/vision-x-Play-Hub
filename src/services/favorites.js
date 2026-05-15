// Lightweight favorites service: client-side localStorage primary with best-effort POSTs to /dp.json
export async function loadFavorites(username) {
  if (!username) return []
  try {
    // try fetch from dp.json (if it contains records); filter client-side
    const res = await fetch('/dp.json')
    if (res.ok) {
      const data = await res.json()
      // assume data is an array of records { type:'favorite', user, item }
      if (Array.isArray(data)) {
        return data.filter(r => r.type === 'favorite' && r.user === username).map(r => r.item)
      }
    }
  } catch (e) {
    // ignore
  }

  // fallback to localStorage
  try {
    const saved = localStorage.getItem(`favorites_${username}`)
    return saved ? JSON.parse(saved) : []
  } catch (e) {
    return []
  }
}

export async function createFavorite(username, item) {
  if (!username) return []
  const key = `favorites_${username}`
  let list = []
  try {
    const saved = localStorage.getItem(key)
    list = saved ? JSON.parse(saved) : []
  } catch (e) {
    list = []
  }
  const exists = list.some(f => f.id === item.id && f.type === item.type)
  if (!exists) list.push(item)
  try { localStorage.setItem(key, JSON.stringify(list)) } catch (e) {}
  // best-effort POST to backend
  try {
    fetch('/dp.json', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'favorite', action: 'create', user: username, item })
    }).catch(()=>{})
  } catch(e){}
  return list
}

export async function deleteFavorite(username, item) {
  if (!username) return []
  const key = `favorites_${username}`
  let list = []
  try {
    const saved = localStorage.getItem(key)
    list = saved ? JSON.parse(saved) : []
  } catch (e) {
    list = []
  }
  list = list.filter(f => !(f.id === item.id && f.type === item.type))
  try { localStorage.setItem(key, JSON.stringify(list)) } catch (e) {}
  try {
    fetch('/dp.json', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'favorite', action: 'delete', user: username, item })
    }).catch(()=>{})
  } catch(e){}
  return list
}

export async function replaceFavorites(username, items) {
  if (!username) return []
  try { localStorage.setItem(`favorites_${username}`, JSON.stringify(items || [])) } catch (e) {}
  try {
    fetch('/dp.json', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'favorite', action: 'replace', user: username, items })
    }).catch(()=>{})
  } catch(e){}
  return items
}

export default { loadFavorites, createFavorite, deleteFavorite, replaceFavorites }
