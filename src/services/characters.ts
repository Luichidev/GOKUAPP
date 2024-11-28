const API_URL = 'https://dragonball-api.com/api/characters'

export interface Character {
	id: string
	name: string
	ki: number
	maxKi: number
	race: string
	gender: string
	description: string
	affiliation: string
	image: string
}

interface CharacterParams {
	page?: number
	limit?: number
	gender?: string
	race?: string
}

const DEFAULT_PARAMS: CharacterParams = {
	page: 1,
	limit: 10,
	gender: 'Male',
	race: 'Saiyan',
}

export async function getCharacters(params: CharacterParams = DEFAULT_PARAMS) {
	// Convertimos todos los valores a string de forma segura
	const queryParams = new URLSearchParams(
		Object.entries(params).reduce(
			(acc, [key, value]) => ({
				...acc,
				[key]: String(value),
			}),
			{}
		)
	)

	const response = await fetch(`${API_URL}?${queryParams}`)
	const data = await response.json()
	return data as Character[]
}

export async function getCharacterById(id: string) {
	const response = await fetch(`${API_URL}/${id}`)
	const data = await response.json()
	return data as Character
}
