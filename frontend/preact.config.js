import autoprefixer from 'autoprefixer';
import imageset from 'postcss-image-set-function';

export default function (config, env, helpers) {
  const postcssLoader = helpers.getLoadersByName(config, 'postcss-loader');
  postcssLoader.forEach(({ loader }) => {
    Object.assign(loader.options, {
      plugins: [
        imageset,
        autoprefixer,
      ],
    });
  });
}
