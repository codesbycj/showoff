/**
 * `.shape` — the soft blue mass behind everything, wiped in from the top edge.
 *
 * Worth knowing what it actually is, because it looks more complicated than it
 * is: a flat fill at 80% opacity under a 70px blur, inside a box that grows
 * from 0 to 300vh and clips it. Nothing about the mass moves. The growing box
 * is the whole effect — it uncovers the fill from the top down, and the blur
 * turns the hard clip edge into a front of colour sweeping down the screen.
 *
 * The fill colour was read back off the composite rather than guessed: the
 * reference renders #87c2f7 over a #a7d6ff stage at 0.8 opacity, which puts the
 * mass itself at #7fbdf5. It stays that colour the whole way through — the blue
 * that arrives on screen is the stage behind it changing, not this.
 */
export function Backdrop() {
  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div
        className="absolute inset-x-0 top-0 origin-top overflow-hidden"
        style={{
          height: 'var(--blob-h)',
          transform: 'translateY(var(--blob-y))',
          opacity: 0.8,
          filter: 'blur(70px)',
        }}
      >
        {/*
          Sized in vh, not in percent of the box above it. The mass has to stay
          put while the box grows past it — a percentage height would make it
          grow too, and then the clip never catches up and there is no wipe.
        */}
        <div className="absolute inset-x-[-8%] top-[7vh] h-[86vh] bg-[#7fbdf5]" />

        {/* The lighter lobe. `.top`, the one thing in here that scales: 1 to 3
            as the blue lands, which widens the pale band along the top edge. */}
        <div
          className="absolute inset-x-[12%] top-[-9vh] h-[26vh] origin-top rounded-[50%] bg-[#a8d9fd]"
          style={{ transform: 'scale(var(--blob-scale))' }}
        />
      </div>
    </div>
  );
}
