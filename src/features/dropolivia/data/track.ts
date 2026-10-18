/** Everything the tracking screen says, kept out of the components. */

export const header = {
  meta: 'Good morning,',
  name: 'Olivia Smith',
} as const;

export const shipment = {
  status: 'Out for delivery',
  chip: 'In transit',
  eta: 'Arrives Today 5:30PM',
  tracking: '34AP123456789',
  trackingLabel: 'Tracking ID',
} as const;

/** The four stages, and how far along this one is. */
export const steps = [
  { key: 'picked', label: 'Picked up' },
  { key: 'transit', label: 'In transit' },
  { key: 'delivery', label: 'Delivery' },
  { key: 'delivered', label: 'Delivered' },
] as const;

export const stepsDone = 2;

export const sections = {
  actions: 'What would you like to do?',
  recent: 'Recent tracking',
  more: 'View all',
} as const;

export const actions = [
  { key: 'send', label: 'Send parcel', icon: 'parcel' },
  { key: 'track', label: 'Track item', icon: 'search' },
  { key: 'location', label: 'location', icon: 'pin' },
  { key: 'services', label: 'services', icon: 'layers' },
] as const;

export const recent = [
  {
    key: 'tshirts',
    item: 'T-shirts!',
    tracking: '34AP123456789',
    chip: 'delivery',
    icon: 'shirt',
    window: { label: 'Delivery:', value: 'Tue 5 – Thu 7 Sep' },
    from: { label: 'from:', value: 'ShopClothing' },
  },
  {
    key: 'headphones',
    item: 'Headphones',
    tracking: '19KB884210773',
    chip: 'packed',
    icon: 'headphones',
    window: { label: 'Delivery:', value: 'Fri 8 – Mon 11 Sep' },
    from: { label: 'from:', value: 'SoundRoom' },
  },
] as const;

export const dock = [
  { key: 'track', label: 'Track', icon: 'target' },
  { key: 'map', icon: 'pin' },
  { key: 'me', icon: 'user' },
  { key: 'more', icon: 'more' },
] as const;

export const selectedDock = 'track';
