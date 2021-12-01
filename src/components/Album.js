import {Component} from 'react'
import './index.css'
import Thumbnails from './Thumbnails'

class Albums extends Component{

    state = {
        albums:[],
        showThumbnailsOfAlbumId: undefined
    }

    componentDidMount(){
        this.loadAlbums()
    }

    loadAlbums = async () => {
        const {userId} = this.props
        const api = `https://jsonplaceholder.typicode.com/users/${userId}/albums`
        const response = await fetch(api)
        const json = await response.json()
        this.setState({albums:json})
    }

    renderAlbums = () => {
        return <ul className="albums-container">
            {
                this.state.albums.map(album => {
                    const {id, title} = album
                    return <li className="album" key={`album ${id}`} onClick={
                        () => this.setState({showThumbnailsOfAlbumId:id})
                    }>
                        {title}
                    </li>
                })
            }
        </ul>
    }

    getAlbums = async () => {
        const {showThumbnailsOfAlbumId} = this.state
        const api = `https://jsonplaceholder.typicode.com/albums/${showThumbnailsOfAlbumId}/photos`
        const response = await fetch(api)
        const json = await response.json()
        return json
    }

    renderThumbnails = async () => {
        const images = await this.getAlbums()
        console.log(images)
        return <ui className="albums-container">
            {
                images.map(image => {
                    const {id, thumbnailUrl, title, url} = image
                    return <li id={`thumbnail ${id}`}>
                        <img src={thumbnailUrl} alt={title}/>
                    </li>
                })
            }
        </ui>
    }

    render() {
        const {showThumbnailsOfAlbumId} = this.state
        return showThumbnailsOfAlbumId!==undefined?
            <Thumbnails albumId={showThumbnailsOfAlbumId}/>:
            this.renderAlbums()
    }
}

export default Albums