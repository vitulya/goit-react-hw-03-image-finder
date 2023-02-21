import css from './ImageGallery.module.css';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem.jsx';
import { Component } from 'react';

export class ImageGallery extends Component {
 
  render() {
    return (
        <ul className={css.ImageGallery}>
          <ImageGalleryItem images={this.props.images} />
        </ul>

    );
  }
}
