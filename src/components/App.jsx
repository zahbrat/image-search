import { Component } from "react";
import Searchbar from "./Searchbar";
import ImageGallery from "./ImageGallery";
import Button from "./Button";
import Loader from "./Loader";
import Modal from "./Modal";

const API_KEY = "49326639-01cc2e057e54105d870ddb0dd";
const PER_PAGE = 12;

export default class App extends Component {
  state = {
    query: "",
    images: [],
    page: 1,
    isLoading: false,
    showModal: false,
    largeImageURL: "",
  };

  fetchImages = async () => {
    const { query, page } = this.state;
    if (!query) return;

    this.setState({ isLoading: true });

    try {
      const res = await fetch(
        `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`
      );
      const data = await res.json();

      this.setState((prev) => ({
        images: [...prev.images, ...data.hits],
      }));
    } catch (error) {
      console.error("Error:", error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleSearchSubmit = (query) => {
    this.setState({ query, page: 1, images: [] }, this.fetchImages);
  };

  handleLoadMore = () => {
    this.setState((prev) => ({ page: prev.page + 1 }), this.fetchImages);
  };

  openModal = (url) => {
    this.setState({ showModal: true, largeImageURL: url });
  };

  closeModal = () => {
    this.setState({ showModal: false, largeImageURL: "" });
  };

  render() {
    const { images, isLoading, showModal, largeImageURL } = this.state;

    return (
      <>
        <Searchbar onSubmit={this.handleSearchSubmit} />
        <ImageGallery images={images} onImageClick={this.openModal} />
        {isLoading && <Loader />}
        {images.length > 0 && !isLoading && (
          <Button onClick={this.handleLoadMore} />
        )}
        {showModal && (
          <Modal largeImageURL={largeImageURL} onClose={this.closeModal} />
        )}
      </>
    );
  }
}
