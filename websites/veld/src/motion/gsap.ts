import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);
// Lenis is driven from this ticker, so a frame that arrives late must stay
// late. Smoothing it makes the scroll position and the tween disagree.
gsap.ticker.lagSmoothing(0);

export { gsap, ScrollTrigger, SplitText };
