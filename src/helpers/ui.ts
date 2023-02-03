import { gsap } from 'gsap';
import { CSSPlugin } from 'gsap/CSSPlugin';
gsap.registerPlugin(CSSPlugin);

export const gsapTL = () => gsap.timeline();