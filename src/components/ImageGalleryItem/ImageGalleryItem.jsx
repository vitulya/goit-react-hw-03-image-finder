import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ images, onOpenModal }) => {
  console.log(images);

  return (
    <>
      {images?.map(image => {
        return (
          <li key={image.id} className={css.ImageGalleryItem}>
            <img
              onClick={() => onOpenModal(image)}
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
