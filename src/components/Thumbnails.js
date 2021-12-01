import { Component } from "react"
import "./index.css"
import Lightbox from "react-image-lightbox"
import "react-image-lightbox/style.css"

class Thumbnails extends Component {
  state = {
    images: [],
    isOpen: false,
    photoIndex: undefined,
  }

  componentDidMount() {
    console.log("thumn")
    this.getAlbums()
  }

  getAlbums = async () => {
    const { albumId } = this.props
    const api = `https://jsonplaceholder.typicode.com/albums/${albumId}/photos`
    const response = await fetch(api)
    const json = await response.json()
    this.setState({ images: json })
  }

  renderThumbnails = () => {
    const { images } = this.state
    return (
      <ui className='albums-container'>
        {images.map((image, index) => {
          const { id, thumbnailUrl, title } = image
          return (
            <li
              id={`thumbnail item ${id}`}
              onClick={() => this.setState({ isOpen: true, photoIndex: index })}
            >
              <img src={thumbnailUrl} alt={title} />
            </li>
          )
        })}
      </ui>
    )
  }

  showImage = () => {
    const { photoIndex, images } = this.state
    const urls = images.map((image) => image.url)
    return (
      <Lightbox
        mainSrc={urls[photoIndex]}
        nextSrc={urls[(photoIndex + 1) % urls.length]}
        prevSrc={urls[(photoIndex + urls.length - 1) % urls.length]}
        onCloseRequest={() => this.setState({ isOpen: false })}
        onMovePrevRequest={() =>
          this.setState({
            photoIndex: (photoIndex + urls.length - 1) % urls.length,
          })
        }
        onMoveNextRequest={() =>
          this.setState({
            photoIndex: (photoIndex + 1) % urls.length,
          })
        }
      />
    )
  }

  render() {
    return this.state.isOpen ? this.showImage() : this.renderThumbnails()
  }
}

export default Thumbnails
