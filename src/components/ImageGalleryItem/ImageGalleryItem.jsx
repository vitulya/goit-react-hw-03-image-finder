import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ images }) => {
  console.log(images);

  return (
    <>
      {images?.map(image => {
        return (
          <li key={image.id} className={css.ImageGalleryItem}>
            <img
              className={css.ImageGalleryItemImage}
              src={image.webformatURL}
              alt=""
            />
          </li>
        );
      })}
    </>
  );
};
