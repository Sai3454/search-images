import {Component} from 'react'
import { FaSearch } from 'react-icons/fa';
import './App.css';



class App extends Component{
  state = {
    imagesList: [],
    searchInput: "",
  }

  handleChangeSearchInput = (event) => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearch = () => {
    
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
      this.setState({imagesList: data}) 
    }
  }


  componentDidMount = () => {
    this.getAllImages();
  }

  render(){
    const {searchInput, imagesList} = this.state


    return(
      <div className="contaienr">
        <div className='section-1'>
          <div className='search-container'>
            <input className='input' onKeyDown={this.handleKeyPress} type='text' onChange={this.handleChangeSearchInput} value={searchInput} placeholder='Enter your search key' />
            <span className='search' type='button' onClick={this.onClickSearch}><FaSearch /></span>
          </div>
        </div>
        
        
            <div className='center'>
            <ul className='images-container'>
              {imagesList.map(eachImage => {
                const {id, urls, description} = eachImage
                const {small} = urls
                
                return (
                  <li key={eachImage.id}>
                    <img 
                      src={small} 
                      alt="search" 
                      className='image'
                      
                    />
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
