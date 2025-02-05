import createImageUrlBuilder from '@sanity/image-url';
import { dataset, projectId } from '../env'; // Ensure these variables are set in your env file
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

const builder = createImageUrlBuilder({ projectId, dataset });

export const urlFor = (source: SanityImageSource) => {
  // If the source is already a URL, return it directly
  if (typeof source === 'string') {
    return source;
  }
  // Otherwise, generate a URL using the Sanity image builder
  return builder.image(source).url();
};
