import {Component} from 'react'
import './App.css';



class App extends Component{
  state = {
    imagesList: []
  }

  

  getAllImages = async () => {
    
    const apiUrl = `https://api.unsplash.com/photos/?client_id=R7iDpKlHA0aL3SM26DcQxl7jiHFlHe_giA3nrzexLaM`

    const res = await fetch(apiUrl)
    const data = await res.json() 
    console.log("yes")

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
