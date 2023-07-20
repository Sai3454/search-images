import {Component} from 'react'
import { ShimmerUIThumbnail } from "shimmer-ui-effect";
import { Tooltip } from 'react-tooltip';
import { FaSearch } from 'react-icons/fa';
import './App.css';

const searchKeys = ['Animals', 'Mountains', 'Flowers', 'Beaches', 'Cities']

class App extends Component{
  state = {
    imagesList: [],
    isLoading: true,
    searchInput: "",
  }

  handleChangeSearchInput = (event) => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearch = () => {
    this.setState({isLoading: true})
    this.getAllImages()
  }

  handleKeyPress = (event) => {
    if (event.key === "Enter") {
      this.onClickSearch();
    }
  }

  getAllImages = async () => {
    const {searchInput} = this.state
    const apiUrl = `https://api.unsplash.com/photos/?client_id=R7iDpKlHA0aL3SM26DcQxl7jiHFlHe_giA3nrzexLaM&query=${searchInput}`

    const res = await fetch(apiUrl)
    const data = await res.json() 

    if(res.status === 200){
      this.setState({imagesList: data, isLoading: false}) 
    }
  }


  componentDidMount = () => {
    this.getAllImages();
  }

  render(){
    const {searchInput, imagesList, isLoading} = this.state


    return(
      <div className="contaienr">
        <div className='section-1'>
          <div className='search-container'>
            <input className='input' onKeyDown={this.handleKeyPress} type='text' onChange={this.handleChangeSearchInput} value={searchInput} placeholder='Enter your search key' />
            <span className='search' type='button' onClick={this.onClickSearch}><FaSearch /></span>
          </div>
        </div>
        {isLoading ? 
            <>
            <div className='container'>
              <ShimmerUIThumbnail height={200} width={350} rounded />
              <ShimmerUIThumbnail height={200} width={350} rounded />
              <ShimmerUIThumbnail height={200} width={350} rounded />
            </div>
            <div className='container'>
              <ShimmerUIThumbnail height={200} width={350} rounded />
              <ShimmerUIThumbnail height={200} width={350} rounded />
              <ShimmerUIThumbnail height={200} width={350} rounded />
            </div> </>:
        <div className='center'>
        <div className='images-container'>
                {searchKeys.map((eachKey, index) => (
                  <button key={index} className='key' onClick={() => this.setState({searchInput: eachKey}, ()=> this.getAllImages())}>
                    {eachKey}
                  </button>
                ))}
        </div>
        </div>}
        
            <div className='center'>
            <ul className='images-container'>
              {imagesList.map(eachImage => {
                const {id, urls, description} = eachImage
                const {small} = urls
                const tooltipId = `tooltip-${id}`

                return (
                  <li key={eachImage.id}>
                    <img 
                      src={small} 
                      alt="search" 
                      className='image'
                      data-tooltip-id={tooltipId}
                    />
                    <Tooltip
                      place="right" 
                      type="info"
                      effect="solid"
                      id={tooltipId} 
                    >
                      { description !== null && <div className='multi-line'>
                        {description}
                      </div>}
                    </Tooltip>
                  </li>
                
                )
              })}
            </ul>
            
            </div>
          
      </div>
    )
  }
}

export default App;
