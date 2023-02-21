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
    value: '',
    submitValue: '',
  };

  // async componentDidMount() {
  //   try {
  //     const images = await getImages();
  //     this.setState({
  //       images: images.hits,
  //     });
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // }

  async componentDidUpdate(_, prevState) {
    const { page, value, submitValue } = this.state;

    if (prevState.page !== page) {
      try {
        const images = await getImages(page, value);
        this.setState(prev => ({
          images: [...prev.images, ...images.hits],
        }));
      } catch (error) {
        console.log(error.message);
      }
    }

    if (prevState.submitValue !== submitValue) {
      try {
        const images = await getImages(page, value);
        this.setState({
          page: 1,
          images: images.hits,
        });
      } catch (error) {
        console.log(error.message);
      }
    }
  }

  handleChangePage = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };

  handleChangeValue=(e)=>{
    const {value}=e.target;

    this.setState({
      value
    })
  }

  handleSubmitInputValue = e => {
    e.preventDefault();
    this.setState({
      submitValue: this.state.value,
    });
  };

  render() {
    return (
      <div className={css.App}>
        <Searchbar handleChangeValue={this.handleChangeValue} onSubmit={this.handleSubmitInputValue} />
        <ImageGallery images={this.state.images} />
        <Button onClick={this.handleChangePage} />
      </div>
    );
  }
}
