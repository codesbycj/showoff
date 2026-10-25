/**
 * Everything the seat screen says, so the components stay presentational.
 *
 * **The seats and the summary are one fact.** The reference prints "Selected
 * Seat: B1, C2" above a map where neither of those seats is marked, and
 * "Price of seat: Free" on a business-class booking. Here the chosen seats
 * are read out of the map, and the price is the sum of what those seats cost.
 */

export const copy = {
  brand: 'Rova',
  title: 'Select the seat',
  business: 'Business class',
  economy: 'Economy class',
  selected: 'Selected seats',
  price: 'Price of seats',
  action: 'Confirm seats',
} as const;

type Seat = { id: string; state: 'free' | 'taken' | 'picked'; price: number };

/** Four seats a row, an aisle down the middle, rows numbered. */
function row(n: number, states: Seat['state'][], price: number) {
  const letters = ['A', 'B', 'C', 'D'];
  return {
    n,
    seats: states.map((state, i) => ({ id: letters[i] + n, state, price })),
  };
}

export const cabin = {
  business: [row(1, ['taken', 'free', 'picked', 'free'], 1200)],
  economy: [
    row(2, ['free', 'picked', 'taken', 'free'], 650),
    row(3, ['taken', 'free', 'free', 'taken'], 650),
    row(4, ['free', 'free', 'taken', 'free'], 650),
    row(5, ['taken', 'free', 'free', 'free'], 650),
    row(6, ['free', 'taken', 'free', 'taken'], 650),
  ],
} as const;

const all = [...cabin.business, ...cabin.economy].flatMap((r) => r.seats);
const picked = all.filter((s) => s.state === 'picked');

export const chosen = picked.map((s) => s.id).join(', ');
export const total = '৳' + picked.reduce((sum, s) => sum + s.price, 0).toLocaleString('en-GB');
