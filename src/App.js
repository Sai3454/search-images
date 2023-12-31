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
    itemsPerPage: 15,
    currentPage: 1,
    totalpages: 10,
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

  handleNextPage = () => {
    this.setState((prevState) => ({
      currentPage: prevState.currentPage + 1,
    }), () => this.getAllImages());
  };

  handlePreviousPage = () => {
    this.setState((prevState) => ({
      currentPage: prevState.currentPage - 1,
    }), () => this.getAllImages());
    
  };

  handlePageChange = (pageNum) => {
    this.setState({
      currentPage: pageNum,
    }, () => this.getAllImages());
  };


  getAllImages = async () => {
    const {searchInput, itemsPerPage, currentPage} = this.state
    const apiUrl = `https://api.unsplash.com/photos/?client_id=R7iDpKlHA0aL3SM26DcQxl7jiHFlHe_giA3nrzexLaM&query=${searchInput}&per_page=${itemsPerPage}&page=${currentPage}`

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
    const {searchInput, imagesList, isLoading, currentPage, totalpages} = this.state


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
            <div className='center'>
              <div className='images-container'>
                <button
                  onClick={this.handlePreviousPage}
                  disabled={currentPage === 1}
                  className='key'
                >
                  Previous
                </button>
                {Array.from({ length: Math.ceil(totalpages) }).map(
                  (value, index) => (
                    <button
                      key={index}
                      onClick={() => this.handlePageChange(index + 1)}
                      disabled={currentPage === index + 1}
                      className='key'
                    >
                      {index + 1}
                    </button>
                  )
                )}
                <button
                  onClick={this.handleNextPage}
                  disabled={currentPage === Math.ceil(totalpages)}
                  className='key'
                >
                  Next
                </button>
              </div>
            </div>
          
      </div>
    )
  }
}

export default App;
