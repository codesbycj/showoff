import {
  categories,
  collection,
  collectionLine,
  greeting,
  playlist,
  popular,
  songs,
  tabs,
  tracks,
} from '../data/home';
import { BlockProps } from './_home-parts-shared';
import { SectionHead } from './section-head';

export function PlaylistHead({ margin, height }: BlockProps) {
  return <SectionHead margin={margin} height={height} title={playlist.title} more={playlist.more} />;
}
