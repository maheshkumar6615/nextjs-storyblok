const Banner = ( params: any ) => {
  return(
    <div
    className="banner"
    style={{
      backgroundImage: `url(${params.blok.backgroundImage.filename})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      width: '100%',
      height: '400px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      textAlign: 'center',
    }}
  >
    <h3>{params.blok.title}</h3>
    <a
      href={params.blok.button.url}
      className="banner-button"
      style={{
        padding: '10px 20px',
        backgroundColor: '#0070f3',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '5px',
        marginTop: '20px',
      }}
    >
      Explore Recipes
    </a>
  </div>
  )
};

export default Banner;