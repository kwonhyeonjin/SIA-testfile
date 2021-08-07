import React, {Component} from "react";
import axios from "axios";

const PhotosEndPoint = "https://jsonplaceholder.typicode.com/photos";

class Photo extends Component {
        constructor(props){
            super(props);
            this.state = {Photo: [] };

        }
        async componentDidMount() {
            let { data: photos } = await axios.get(PhotosEndPoint);
            this.setState({photos});

        } 
        render() {
            const {photos} = this.state;

            if(photos.length > 0){
                return photos.map(photo => {
                    return(
                        <div key = {photos.id}>
                            <img src={photo.thumbnailUrl} alt="img"/>
                            <p>albumId : {photo.albumId}</p>
                            <p>title : {photo.title}</p>
                            <p>url : {photo.url}</p>
                        </div>
                    );
                });
            }else{
               return <h3> No Photos</h3>;
            }
        }   
}
export default Photo;