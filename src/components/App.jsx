import css from './App.module.css';
import { Component } from 'react';
import { getImages } from '../services/images.service.jsx';

import { Searchbar } from './Searchbar/Searchbar.jsx';
import { ImageGallery } from './ImageGallery/ImageGallery.jsx';
import { Button } from './Button/Button.jsx';
import { Modal } from './Modal/Modal.jsx';

import { Circles } from 'react-loader-spinner';

export class App extends Component {
  state = {
    images: null,
    page: 1,
    value: '',
    submitValue: '',
    isOpenModal: false,
    currentImage: null,
    isLoading: false,
    error: null,
  };

  async componentDidUpdate(_, prevState) {
    const { page, value, submitValue } = this.state;

    if (prevState.page !== page) {
      this.setState({
        isLoading: true,
      });
      try {
        const images = await getImages(page, value);
        this.setState(prev => ({
          images: [...prev.images, ...images.hits],
        }));
      } catch (error) {
        this.setState({
          error,
        });
      } finally {
        this.setState({
          isLoading: false,
        });
      }
    }

    if (prevState.submitValue !== submitValue) {
      this.setState({
        isLoading: true,
      });
      try {
        const images = await getImages(page, value);
        this.setState({
          page: 1,
          images: images.hits,
        });
      } catch (error) {
        this.setState({
          error,
        });
      } finally {
        this.setState({
          isLoading: false,
        });
      }
    }
  }

  handleChangePage = () => {
    this.setState(prev => ({ page: prev.page + 1 }));
  };

  handleChangeValue = e => {
    const { value } = e.target;

    this.setState({
      value,
    });
  };

  handleSubmitInputValue = e => {
    e.preventDefault();
    this.setState({
      submitValue: this.state.value,
    });
  };

  handleToggleModal = image => {
    this.setState(prevState => ({
      isOpenModal: !prevState.isOpenModal,
      currentImage: image,
    }));
  };

  render() {
    const { currentImage, isLoading, error, images } = this.state;

    return (
      <div className={css.App}>
        <Searchbar
          handleChangeValue={this.handleChangeValue}
          onSubmit={this.handleSubmitInputValue}
        />

        <ImageGallery
          onOpenModal={this.handleToggleModal}
          images={this.state.images}
          isLoading={isLoading}
        />
        {isLoading && (
          <Circles
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="circles-loading"
            wrapperStyle={{
              display: 'flex',
              justifyContent: 'center',
            }}
            wrapperClass=""
            visible={true}
          />
        )}
        {error && <h1>Спробуйте перезагрузити сторінку...</h1>}
        {images && <Button onClick={this.handleChangePage} />}
        {this.state.isOpenModal && (
          <Modal onCloseModal={this.handleToggleModal} image={currentImage} />
        )}
      </div>
    );
  }
}
