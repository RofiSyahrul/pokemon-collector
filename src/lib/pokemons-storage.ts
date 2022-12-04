export function saveMyPokemons(list: MyPokemon[]): void {
  localStorage.setItem('my-pokemons', JSON.stringify(list))
}

function getListFromStorage<T = unknown>(key: StorageKey): T[] {
  try {
    const list = JSON.parse(localStorage.getItem(key) ?? '[]')
    if (Array.isArray(list)) return list
    return []
  } catch {
    return []
  }
}

export function getMyPokemons(): MyPokemon[] {
  return getListFromStorage('my-pokemons')
}
