import css from './App.module.css';
// import axios from 'axios';
import { Component } from 'react';
import { getImages } from '../services/images.service.jsx';

import { Searchbar } from './Searchbar/Searchbar.jsx';
import { ImageGallery } from './ImageGallery/ImageGallery.jsx';
import { Button } from './Button/Button.jsx';

// 31754694-dbfcbb04bb6ff6c5ba99a7a93

export class App extends Component {
  state = {
    images: null,
    page: 1,
  };

  async componentDidMount() {
    try {
      const images = await getImages();
      this.setState({
        images: images.hits,
      }); 
    } catch (error) {
      console.log(error.message);
    }
  }

  async componentDidUpdate(_, prevState) {
    const { page } = this.state;

    if (prevState.page !== this.state.page) {
      try {
        const images = await getImages(page);
        // this.setState({
        //   images: images,
        // });
        this.setState(prev => ({
          images: [...prev.images, ...images.hits],
        }));
      } catch (error) {
        console.log(error.message);
      }
    }
  }

  handleSumbit = e => {
    e.preventDefault();
    console.log('Hallo');
  };

  handleChangePage = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };

  render() {
    return (
      <div className={css.App}>
        <Searchbar onSubmit={this.handleSumbit} />
        <ImageGallery images={this.state.images} />
        <Button onClick={this.handleChangePage} />
      </div>
    );
  }
}
